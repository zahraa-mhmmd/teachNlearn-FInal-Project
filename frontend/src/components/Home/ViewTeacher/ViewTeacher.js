import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { viewTeacher } from '../../AxiosTest/userRoutes';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import Bio from '../../Main/Profile/Bio/Bio';
import TeacherInfo from '../../Main/Profile/TeacherInfo/TeacherInfo';
import Contact from '../../Main/Profile/Contact/Contact';
import Upcoming from '../../Main/Profile/Upcoming/Upcoming';

const ViewTeacher = () => {
  const location = useLocation(); // Use the useLocation hook
  const { id } = useParams(); // Use useParams if id is part of the route
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (location.state) {
      // If state exists, set the teacher from location.state
      setTeacher(location.state);
      return;
    }

    // Fetch teacher details if state is not passed
    const getTeacher = async () => {
      try {
        const response = await viewTeacher(id);
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    getTeacher();
  }, [location.state, id]);

  const teacherProfile = () => {
    return (
      <div className="user-profile-wrapper">
        <div className="panel-left">
          <Bio user={teacher} />
          <div className="sub-cards">
            <Contact user={teacher} />
            <Upcoming user={teacher} />
          </div>
        </div>
        <TeacherInfo user={teacher} />
      </div>
    );
  };

  return <div>{teacher ? teacherProfile() : <LoadingSpinner />}</div>;
};

export default ViewTeacher;
