import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Day.module.css'; 

class Day extends PureComponent {
    render() {
        let daySelectorClasses = styles.DaySelector;
        if(this.props.forbidden) {
            daySelectorClasses += " " + styles.DayForbidden;
        } else if(this.props.selected) {
            daySelectorClasses += " " + styles.DaySelected;
        }

        let dayStyleClasses = styles.DayTile;
        if(!this.props.currentMonth) {
            dayStyleClasses += " " + styles.OtherMonth;
        }

        return (
            <div className={dayStyleClasses} onClick={this.props.onClick}>
                <div className={daySelectorClasses}>
                    {this.props.day}
                </div>
            </div>
        );
    }
}

Day.propTypes = {

};

export default Day;