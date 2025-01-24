import axios from 'axios';
import { faker } from '@faker-js/faker';


const email = () => faker.internet.email();
const newEmailStudent = email();
const newEmailTeacher = email();

export const url = 'http://localhost:8000';

export const request = axios.create({
  baseURL: `${url}/api/`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: localStorage.getItem('teachnlearnJWT'),
  },
});

export const JWTHeader = {
  headers: {
    Authorization: localStorage.getItem('teachnlearnJWT'),
  },
};

export const JSONHeader = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

const link = faker.image.url();

export const newUserStudent = {
  profileImage: link,
  firstName: 'Harry',
  lastName: 'Buisman',
  title: 'Sir',
  sex: 'male',
  dateOfBirth: '05/11/1999',
  phoneNumber: '04104820594',
  email: newEmailStudent,
  password: '123456789',
  confirmPassword: '123456789',
  isTeacher: 'false',
  address: {
    number: '4',
    street: 'Beamish Street',
    city: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    postcode: '2149',
  },
  teacherInfo: {
    specialtyField: 'Computer Science',
    subSpecialtyField: 'Software Engineering',
    education: ['Stanford University'],
    yearsExperience: 5,
    tags: ['JavaScript', 'Node.js', 'React'],
    languagesSpoken: ['English'],
    rating: 4.7,
  },
  studentInfo: {
    education: [
      {
        name: 'Stanford University',
        department: 'Computer Science',
        gradeLevel: "11th Grade",
        notes: "Excellent in physics and chemistry."

      }
    ],
    courses: [
      {
        courseName: 'Introduction to Programming',
        courseCode: 'CS101',
        notes: "Loves practical experiments."
      }
    ],
    academicLevel: 'undergraduate',
  },
};

export const newUserTeacher = {
  profileImage: link,
  firstName: 'Lisa',
  lastName: 'asdfsdf',
  title: 'Dr',
  sex: 'female',
  dateOfBirth: '05/11/1999',
  phoneNumber: '0410734821',
  email: newEmailTeacher,
  password: '123456789',
  confirmPassword: '123456789',
  isTeacher: true,
  address: {
    number: '4',
    street: 'Beamish Street',
    city: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    postcode: '2149',
  },
  teacherInfo: {
    availability: {
      availableFrom: '2025-01-01T08:00:00+00:00',
      availableTo: '2025-01-01T17:00:00+00:00',
      lunchBreakStart: '2025-01-01T12:00:00+00:00',
      lunchBreakEnd: '2025-01-01T13:00:00+00:00',
      unavailableDateTimes: [
        {
          startDateTime: '2025-01-01T15:00:00+00:00',
          endDateTime: '2025-01-01T16:00:00+00:00',
          modifier: 'Personal appointment',
        },
      ],
    },
    licence: 'MIT',
    accreditations: ['USyd', 'UNSW'],
    specialtyField: 'Mathematics',
    subSpecialtyField: 'Calculus',
    education: ['University of Oxford', 'Harvard University'],
    yearsExperience: 12,
    tags: ['Algebra', 'Geometry', 'Trigonometry'],
    languagesSpoken: ['English', 'French'],
    rating: 4.8,
  },
};
