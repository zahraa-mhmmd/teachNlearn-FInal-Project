import React from 'react';
import '../../Profile/UserProfile/UserProfile.scss';
import Courses from '../../Profile/Courses/Courses';
import EducationHistory from '../../Profile/EducationHistory/EducationHistory';
import Contact from '../../Profile/Contact/Contact';
import Address from '../../Profile/Address/Address';
import SessionHistory from '../../Profile/SessionHistory/SessionHistory';
import Bio from '../../Profile/Bio/Bio';

const StudentProfile = props => {
  //user object passed from reach router link
  const user = props.location.state;

  console.log(user);
  return (
    <div className="user-profile-wrapper">
      <div className="panel-left">
        <Bio user={user} />
        <div className="sub-cards">
          <Contact user={user} />
          <Address user={user} />
        </div>
      </div>
      <div>
        <EducationHistory user={user} />
        <Courses user={user} />
        <SessionHistory user={user} />
      </div>
    </div>
  );
};

export default StudentProfile;
