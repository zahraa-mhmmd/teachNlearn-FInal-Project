import React, { useContext } from 'react';
import './UserProfile.scss';
import SessionHistory from '../SessionHistory/SessionHistory';
import EducationHistory from '../EducationHistory/EducationHistory';
import Bio from '../Bio/Bio';
import Courses from '../Courses/Courses';
import Address from '../Address/Address';
import TeacherInfo from '../TeacherInfo/TeacherInfo';
import Contact from '../Contact/Contact';
import { AuthContext } from '../../../../globalState/index';
import Upcoming from '../Upcoming/Upcoming';

const UserProfile = props => {
  const { user } = useContext(AuthContext);
  console.log(user)

  const teacherProfile = () => {
    return (
      <div className="user-profile-wrapper">
        <div className="panel-left">
          <Bio user={user} />
          <div className="sub-cards">
            <TeacherInfo user={user} />
            <Address user={user} />
            <Contact user={user} />
          </div>
        </div>
        <TeacherInfo user={user} />
        <Upcoming user={user} />
      </div>
    );
  };

  const studentProfile = () => {
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

  const showProfile = () => {
    return user.isTeacher ? teacherProfile() : studentProfile();
  };

  return <React.Fragment>{showProfile()}</React.Fragment>;
};

export default UserProfile;
