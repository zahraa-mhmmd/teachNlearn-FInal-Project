import React from 'react';
import './StudentListItem.scss';
import { Link } from 'react-router-dom';
const StudentListItem = ({ name, id, state }) => {
  return (
    <Link to={`${id}`} state={state}>
      <div className="patient-list-item-wrapper">
        <div className="patient-list-item-container">
          <div className="profile">
            <div className="avatar" />
            <div>{name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentListItem;
