import React from 'react';
import Card from '../../../Card/Card';
import { v4 as uuidv4 } from 'uuid';

const EducationHistory = ({ user }) => {
  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          <h2>Education</h2>
        </div>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>School Name</span>
              {user.studentInfo.education.map(el => (
                <span key={uuidv4()}>{el.name}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Department</span>
              {user.studentInfo.education.map(el => (
                <span key={uuidv4()}>{el.department}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Grade Level</span>
              {user.studentInfo.education.map(el => (
                <span key={uuidv4()}>{el.gradeLevel}</span>
              ))}
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Notes</span>
              {user.studentInfo.education.map(el => (
                <span key={uuidv4()}>{el.notes}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EducationHistory;
