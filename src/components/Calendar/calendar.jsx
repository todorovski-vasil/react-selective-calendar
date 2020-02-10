import React, { Component } from 'react';
import styles from './Calendar.module.css'; 
import Day from "./Day/Day";

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        let days = Calendar.getVisibleDays(props.data.startDate, props.data.availableDates);
    
        if(state.days) {
            days = days.map(day => {
                let foundDay = state.days.find(d => day.key === d.key);
                if(foundDay) {
                    day.selected = foundDay.selected;
                }
                return day;
            });
        }

        return { days: days };
    }

    static getVisibleDays = (workingDate, availableDates) => {
        const date = new Date(workingDate.year + "-" + workingDate.month + "-" + workingDate.day)
        const month = date.getMonth();
        date.setDate(date.getDate() - (date.getDate() - 1));
        date.setDate(date.getDate() - (date.getDay() - 1));
        
        const days = [];
        for(let i=42; i!==0; i--) {
            const available = typeof availableDates === "undefined" || availableDates.some(avDate => {
                return (avDate.day === date.getDate() && 
                    avDate.month === (date.getMonth() + 1) &&
                    avDate.year === date.getUTCFullYear());
            });

            days.push({
                key: date.getTime(),
                day: date.getDate(),
                forbidden: !available,
                selected: false,
                currentMonth: date.getMonth() === month
            });
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    render() {
        return (
            <div className={styles.Calendar}>
                {this.state.days.map(day => <Day
                    key={day.key}
                    day={day.day} 
                    forbidden={day.forbidden} 
                    selected={day.selected}
                    currentMonth={day.currentMonth}
                    onClick={event => {
                        event.stopPropagation();
                        this.toggleSelect(day.key);
                    }}
                />)}
            </div>
        );
    }

    toggleSelect = key => {
        const days = this.state.days.map(day => {
            if(day.key === key) {
                if(!day.forbidden && day.currentMonth) {
                    day.selected = !day.selected;
                }
            }
            return day;
        });

        this.setState({ days: days });
    }
}

export default Calendar;