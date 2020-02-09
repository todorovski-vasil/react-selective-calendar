import React, { Component } from 'react';
import styles from './Calendar.module.css'; 
import Day from "./Day/Day";

class Calendar extends Component {
    render() {
        // date.setDate(date.getDate() + 10);
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

        return (
            <div className={styles.Calendar}>
                {days.map(day => <Day 
                    key={day.key} 
                    day={day.day} 
                    forbidden={day.forbidden} 
                    selected={day.selected}
                    currentMonth={day.currentMonth}
                />)}
            </div>
        );
    }
}

export default Calendar;