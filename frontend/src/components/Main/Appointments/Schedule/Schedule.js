import React, { useEffect, useContext } from 'react';
import './Schedule.scss';
import Button from '../../../Button/Button';
import moment from 'moment';
import { request } from '../../../AxiosTest/config'; // config.js
import { v4 as uuidv4 } from 'uuid';
import { MessageContext } from '../../../../globalState/index';

const Schedule = ({ user, sessions, setSessions }) => {
  const { setFlashMessage } = useContext(MessageContext);
  const handleAccept = async (sessionId) => { 
    try {
      const response = await request.patch(`/sessions/${sessionId}/accept`); 
      // Assuming response.data contains the updated session object
      const updatedSession = response.data; 
  
      // Update the sessions state in the React component
      setSessions(prevSessions => 
        prevSessions.map(session => (session._id === sessionId ? updatedSession : session))
      ); 
  
    } catch (error) {
      console.error('Error accepting session:', error);
      // Handle error appropriately, e.g., display error message to user
      setFlashMessage({
        message: 'Error accepting session.',
        type: 'error',
        icon: 'alert',
      });
    }
  };

  const handleDecline = async () => {
    // try {
    // } catch (e) {}
  };

  useEffect(() => {
    if (sessions.length === 0) {
      const getSessions = async () => {
        try {
          const response = await request.get('sessions');
          const sorted = response.data.sort((a, b) =>
            moment(a.createDate).isBefore(moment(b.createDate)) ? 1 : -1
          );
          setSessions(sorted);
        } catch (e) {
          if (e.response.status === 404) {
            return null;
          } else {
            setFlashMessage({
              message: `Something went wrong - ${e.response.data.error}`,
              type: 'error',
              icon: 'alert',
            });
            return null;
          }
        }
      };
      getSessions();
    }
  }, []);

  const TeacherSchedule = () => {
    return (
      <div className="schedule-wrapper">
        <ul>
          {sessions.length > 0 ? (
            sessions.map(session => {
              return (
                <li key={uuidv4()}>
                  <div className="session-container">
                    <div className="status">
                      <span>{session.status}</span>
                    </div>
                    <div className="student-wrapper">
                      <div className="student">
                        <img
                          className="avatar"
                          src={session.user.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="middle">
                        <div className="name">{`${session.user.firstName} ${session.user.lastName}`}</div>
                        <div className="booking">
                          {`${moment(session.startTime).format(
                            'ddd Do MMM hh:mm'
                          )} - ${moment(session.endTime).format('hh:mm A')}`}
                        </div>
                      </div>
                      <div className="process">
                        <Button
                          action="accept"
                          color="pink"
                          onClick={() => handleAccept(session._id)}
                        />
                        <Button
                          action="decline"
                          color="dark"
                          onClick={() => handleDecline(session._id)}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="session-container">
              <h3 className="no-appointments">No appointments scheduled</h3>
            </div>
          )}
        </ul>
      </div>
    );
  };

  const StudentSchedule = () => {
    return (
      <div className="schedule-wrapper">
        <ul>
          {sessions.length > 0 ? (
            sessions.map(session => {
              return (
                <li key={uuidv4()}>
                  <div className="session-container">
                    <div className="status">
                      <span>{session.status}</span>
                    </div>
                    <div className="student-wrapper">
                      <div className="student">
                        <img
                          className="avatar"
                          src={session.user.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="middle">
                        <div className="name">{`Dr. ${session.user.firstName} ${session.user.lastName}`}</div>
                        <div className="booking">
                          {`${moment(session.startTime).format(
                            'ddd Do MMM hh:mm'
                          )} - ${moment(session.endTime).format('hh:mm A')}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="session-container">
              <h3 className="no-appointments">No appointments scheduled</h3>
            </div>
          )}
        </ul>
      </div>
    );
  };

  const showSchedule = () => {
    return user.isTeacher ? TeacherSchedule() : StudentSchedule();
  };
  return showSchedule();
};

export default Schedule;
