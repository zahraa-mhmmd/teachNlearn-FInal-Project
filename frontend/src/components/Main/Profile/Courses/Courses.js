import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';

const Courses = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Courses</h2>
        </div>

        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>Course Name</span>
              {user.studentInfo.courses.map(el => (
                <span key={uuidv4()}>{el.courseName}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Course Code</span>
              {user.studentInfo.courses.map(el => (
                <span key={uuidv4()}>{el.courseCode}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Notes</span>
              {user.studentInfo.courses.map(el => (
                <span key={uuidv4()}>{el.notes}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Courses;
