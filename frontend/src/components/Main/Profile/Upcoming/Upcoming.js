import React, { useEffect, useState } from 'react';
import Card from '../../../Card/Card';
import moment from 'moment';
import _ from 'lodash';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { renderUnavailabilities } from '../../Appointments/Appointments';
// import { handleEventStyle } from '../../Appointments/MainCalendar/MainCalendar';
import '../../Appointments/Appointments.scss';

const localizer = momentLocalizer(moment);

const Upcoming = ({ user }) => {
  const [unavailabilities, setUnavailabilities] = useState([]);

  useEffect(() => {
    if (
      user.isTeacher &&
      _.has(user.teacherInfo.availability, 'availableFrom') &&
      _.has(user.teacherInfo.availability, 'availableTo') &&
      _.has(user.teacherInfo.availability, 'lunchBreakStart') &&
      _.has(user.teacherInfo.availability, 'lunchBreakEnd') &&
      user.teacherInfo.availability.unavailableDateTimes.length >= 0
    ) {
      renderUnavailabilities(user.teacherInfo.availability, setUnavailabilities);
    }
  }, [user]);

  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Availability</h2>
        </div>
        <div className="user-details-wrapper">
          <div className="user-info">
            <span>Openning Time </span>
            <span>
              {moment(user.teacherInfo.availability.openingTime).format(
                'hh:mm A'
              )}
            </span>
          </div>
          <div className="user-info">
            <span>Closing Time </span>
            <span>
              {moment(user.teacherInfo.availability.closingTime).format(
                'hh:mm A'
              )}
            </span>
          </div>
        </div>
        
      </div>
    </Card>
  );
};

export default Upcoming;
