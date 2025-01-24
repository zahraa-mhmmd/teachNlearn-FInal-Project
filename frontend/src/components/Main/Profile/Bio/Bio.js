import React from 'react';
import Card from '../../../Card/Card';
import moment from 'moment';
import placeholder from '../../../../assets/placeholder.jpg';

const Bio = ({ user }) => {
  const age = moment().diff(moment(user.dateOfBirth), 'years');

  return (
    <Card>
      <div className="user-profile-container">
        <div className="user-header-wrapper">
          {user && user.profileImage ? (
            <img className="avatar" src={user.profileImage} alt="" />
          ) : (
            <img className="avatar" src={placeholder} alt="" />
          )}
          <div className="name">
            {user.isTeacher && 'Dr.'} {user.firstName}
            <br />
            {user.lastName}
          </div>
        </div>
        <div className="user-details-wrapper">
          <div className="grid-item">
            <div className="user-info">
              <span>First Name</span>
              <span>{user.firstName}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Last Name</span>
              <span>{user.lastName}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Age</span>
              <span>{age}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>Sex</span>
              <span>{user.sex === 'male' ? 'M' : 'F'}</span>
            </div>
          </div>
          <div className="grid-item">
            <div className="user-info">
              <span>DOB</span>
              <span>{moment(user.dateOfBirth).format('DD/MM/YYYY')}</span>
            </div>
          </div>
          {user.studentInfo ? (
            <>
              {user.studentInfo.academicLevel && (
                <div className="grid-item">
                  <div className="user-info">
                    <span>Blood Type</span>
                    <span>{user.studentInfo.academicLevel}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Bio;
