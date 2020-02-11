import React, { Component } from 'react';
import styles from './Calendar.module.css'; 
import Day from "./Day/Day";

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDays: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        let workingDate = null;
        if(state.month && state.year) { // if already mounted
            workingDate = {
                year: state.year,
                month: state.month,
                day: 15
            };
        } else {    // on init
            workingDate = props.data.startDate;
        }
        let newState = Calendar.getVisibleDays(workingDate, props.data.availableDates);
    
        newState.days = newState.days.map(day => {
            if(state.selectedDays.find(key => key === day.key)) {
                day.selected = true;
            } else {
                day.selected = false;
            }
            return day;
        });        

        return newState;
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
        return { 
            days: days,
            year: workingDate.year,
            month: workingDate.month
        };
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.monthDown}>&lt;</button>
                    {this.state.month + " - " + this.state.year}
                    <button onClick={this.monthUp}>&gt;</button>
                </div>
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
            </React.Fragment>
        );
    }

    monthUp = event => {
        const newState = {...this.state};
        newState.days = [...this.state.days];
        newState.selectedDays = [...this.state.selectedDays];

        if(newState.month === 12) {
            newState.month = 1;
            newState.year++;
        } else {
            newState.month++;
        }
        this.setState(newState);
    }

    monthDown = event => {
        const newState = {...this.state};
        newState.days = [...this.state.days];
        newState.selectedDays = [...this.state.selectedDays];

        if(newState.month === 1) {
            newState.month = 12;
            newState.year--;
        } else {
            newState.month--;
        }
        this.setState(newState);
    }

    toggleSelect = key => {
        if(this.state.days.find(day => day.key === key && !day.forbidden && day.currentMonth)) {
            const newState = {...this.state};
            newState.days = [...this.state.days];
            newState.selectedDays = [...this.state.selectedDays];

            const indexSel = newState.selectedDays.findIndex(selKey => selKey === key);

            if(indexSel !== -1) {
                newState.selectedDays.splice(indexSel, 1);
            } else {
                newState.selectedDays.push(key);
            }

            this.setState(newState);
        }
    }
}

export default Calendar;