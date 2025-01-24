import React from 'react';
import './Messaging.scss';
import Feed from './Feed/Feed';
import Notes from './Notes/Notes';

const Messaging = () => {
  return (
    <div className="messaging-wrapper">
      <div>
        <Notes />
      </div>
      <Feed />
    </div>
  );
};

export default Messaging;
