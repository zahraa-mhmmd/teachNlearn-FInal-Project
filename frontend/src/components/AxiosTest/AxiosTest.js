import React, { useContext } from 'react';
import Button from '../Button/Button';
import { AuthContext } from '../../globalState/index';
import './AxiosTest.scss';
import {
  signUpStudent,
  signUpTeacher,
  signInStudent,
  signInTeacher,
  signOut,
  signOutAll,
  viewProfile,
  deleteProfile,
  viewStudent,
  viewStudents,
  viewTeachers,
  viewTeacher,
  updateProfileTesting,
} from './userRoutes';

import {
  viewSessions,
  createSessions,
  deleteSession,
  bookSession,
  updateSession,
  cancelSession,
} from './sessionRoutes';

const AxiosTest = () => {
  const { setUser } = useContext(AuthContext);

  const studentID = null;
  const teacherID = '678e25e9b0b81dcf8be7464b';
  const sessionID = null;
  const sessions = [];
  const updateSessionParams = {};

  // useEffect(() => {}, []);

  return (
    <div>
      <div>
        <div className="response">
          <h1>Route Tests</h1>
        </div>
        <div className="actions">
          <div className="route-wrapper">
            <Button
              action="sign up student"
              onClick={() => signUpStudent(setUser)}
              color="pink"
              icon="check"
            />
          </div>
          <Button
            action="sign up teacher"
            onClick={() => signUpTeacher(setUser)}
            color="pink"
            icon="check"
          />
          <Button
            action="sign in student"
            onClick={() => signInStudent(setUser)}
            color="pink"
            icon="check"
          />
          <Button
            action="sign in teacher"
            onClick={() => signInTeacher(setUser)}
            color="pink"
            icon="check"
          />
          <Button
            action="sign out user"
            onClick={() => signOut(setUser)}
            color="pink"
            icon="check"
          />
          <Button
            action="sign out all users"
            onClick={() => signOutAll(setUser)}
            color="pink"
            icon="check"
          />
          <Button
            action="view profile"
            onClick={viewProfile}
            color="pink"
            icon="check"
          />
          <Button
            action="update profile"
            onClick={() => updateProfileTesting(setUser, { firstName: 'Duke' })}
            color="pink"
            icon="check"
          />
          <Button
            action="delete profile"
            onClick={() => deleteProfile(setUser)}
            color="pink"
            icon="check"
          />
          <Button
            action="view students"
            onClick={viewStudents}
            color="pink"
            icon="check"
          />
          <Button
            action="view student"
            onClick={() => viewStudent(studentID)}
            color="pink"
            icon="check"
          />
          <Button
            action="view teachers"
            onClick={() => viewTeacher(teacherID)}
            color="pink"
            icon="check"
          />
          <Button
            action="view teachers"
            onClick={viewTeachers}
            color="pink"
            icon="check"
          />
          <Button
            action="view sessions"
            onClick={viewSessions}
            color="pink"
            icon="check"
          />
          <Button
            action="create sessions"
            onClick={() => createSessions(sessions)}
            color="pink"
            icon="check"
          />
          <Button
            action="delete session"
            onClick={() => deleteSession(sessionID)}
            color="pink"
            icon="check"
          />
          <Button
            action="book sessions"
            onClick={() => bookSession(sessionID)}
            color="pink"
            icon="check"
          />
          <Button
            action="update sessions"
            onClick={() => updateSession(sessionID, updateSessionParams)}
            color="pink"
            icon="check"
          />
          <Button
            action="cancel sessions"
            onClick={() => cancelSession(sessionID)}
            color="pink"
            icon="check"
          />
        </div>
      </div>
    </div>
  );
};

export default AxiosTest;
