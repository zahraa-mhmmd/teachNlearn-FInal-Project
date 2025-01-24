import React, { useEffect, useState } from 'react';
import StudentListItem from '../StudentListItem/StudentListItem';
import Card from '../../../Card/Card';
import './StudentList.scss';
import { viewStudents } from '../../../AxiosTest/userRoutes';
import { v4 as uuidv4 } from 'uuid';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewStudents();
        setStudents(response.data);
      } catch (err) {
        console.log(err);
        setStudents(['Something went wrong, bad request']);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="student-list-wrapper">
      <Card>
        <ul>
          {students.map(user => (
            <li key={uuidv4()}>
              <StudentListItem
                name={`${user.firstName} ${user.lastName}`}
                id={user._id}
                state={user}
                image={''}
              />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default StudentList;
