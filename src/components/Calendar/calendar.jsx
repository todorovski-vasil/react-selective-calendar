import React, { Component } from 'react';
import styles from './Calendar.module.css'; 
import Day from "./Day/Day";

class Calendar extends Component {
    constructor() {
        super();

        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let dayOfWeek = (date.getDay() + 6) % 7;
        let removeDays = day + (dayOfWeek - (day % 7));
        date.setDate(date.getDate() - removeDays);

        let days = [];
        for(let i=42; i!==0; i--) {
            days.push({
                key: date.getTime(),
                day: date.getDate(),
                forbidden: (Math.random() * 3 > 2),
                selected: (Math.random() * 10 > 5),
                currentMonth: date.getMonth() === month
            });
            date.setDate(date.getDate() + 1);
        }

        this.state = {
            days: days
        };
    }

    render() {
        return (
            <div className={styles.Calendar} onClick={e => alert("click Calendar")}>
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
        let days = [...this.state.days];
        let clickedDay = days.find(day => day.key === key);

        if(!clickedDay.forbidden) {
            clickedDay.selected = !clickedDay.selected;
        }

        this.setState({ days });
    }
}

export default Calendar;