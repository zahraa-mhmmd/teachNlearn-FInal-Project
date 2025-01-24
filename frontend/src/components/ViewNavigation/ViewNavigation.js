import React from 'react';
import './ViewNavigation.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const ViewNavigation = ({ location }) => {
  const showNavigationControls = () => {
    const studentListRegex = /students\/\d*/;
    // e.g students/123223
    if (studentListRegex.test(location.pathname)) {
      // if (location.pathname === '/students/3') {
      return (
        <div className="view-navigation-wrapper">
          <Link to="/students">
            <Button
              action="Back to student list"
              color="navy"
              icon="arrowLeft"
            />
          </Link>
        </div>
      );
    }

    return null;
  };

  return <div>{showNavigationControls()}</div>;
};

export default ViewNavigation;
