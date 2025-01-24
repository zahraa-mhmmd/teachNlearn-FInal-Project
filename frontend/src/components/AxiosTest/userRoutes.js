import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import faker from 'faker';
import {
  url,
  request,
  JSONHeader,
  newUserStudent,
  newUserTeacher,
} from './config.js';

// const { user, setUser } = useContext(AuthContext);

// User Routes

// Hardcoded ? -- START
// Route in production
export const SignUpUser = async (
  user,
  setUserCallback,
  redirect,
  errorHandler,
  navigate
) => {
  // const navigate = useNavigate();
  await axios
    .post(`${url}/api/users/signup`, user, JSONHeader)
    .then(res => {
      localStorage.setItem('teachnlearnJWT', res.data.token);
      setUserCallback(res.data.user);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
      errorHandler(err);
    });
};

// Testing routes
export const signUpStudent = async setUserCallback => {
  console.log(newUserStudent);
  await axios
    .post(`${url}/api/users/signup`, newUserStudent, JSONHeader)
    .then(res => {
      console.log(res);
      localStorage.setItem('teachnlearnJWT', res.data.token);
      setUserCallback(res.data.user);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signUpTeacher = async setUserCallback => {
  console.log(newUserTeacher);
  await axios
    .post(`${url}/api/users/signup`, newUserTeacher, JSONHeader)
    .then(res => {
      console.log(res);
      localStorage.setItem('teachnlearnJWT', res.data.token);
      setUserCallback(res.data.user);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signInStudent = async setUserCallback => {
  await request
    .post('users/signin', {
      email: newUserStudent.email,
      password: newUserStudent.password,
    })
    .then(res => {
      console.log(res);
      localStorage.setItem('teachnlearnJWT', res.data.token);
      setUserCallback(res.data.user);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signInTeacher = async setUserCallback => {
  await request
    .post('users/signin', {
      email: newUserTeacher.email,
      password: newUserTeacher.password,
    })
    .then(res => {
      console.log(res);
      localStorage.setItem('teachnlearnJWT', res.data.token);
      setUserCallback(res.data.user);
    })
    .catch(err => {
      console.log(err);
    });
};
// Hardcoded ? -- END

export const signInUser = async signInObj => {
  return await request.post('users/signin', signInObj); // emaill & password
  // .then(res => {
  //   console.log(res);
  //   localStorage.setItem('teachnlearnJWT', res.data.token);
  //   // setUserCallback(res.data.user);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  // return response;
};

export const SignOut = async (setUserCallback, redirect) => {
  const navigate = useNavigate();
  await request
    .patch('users/signout')
    .then(res => {
      console.log(res);
      localStorage.removeItem('teachnlearnJWT');
      setUserCallback(null);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
    });
};

export const SignOutAll = async (setUserCallback, redirect) => {
  const navigate = useNavigate();
  await request
    .patch('users/signoutall')
    .then(res => {
      console.log(res);
      localStorage.removeItem('teachnlearnJWT');
      setUserCallback(null);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewProfile = async () => {
  const response = await request
    .get('users/profile')
    // .then(res => {
    //   console.log(res);
    // })
    .catch(err => {
      console.log(err);
    });

  return response;
};

export const updateProfile = async updateParamsObj => {
  const response = await request
    .patch('users/profile', updateParamsObj)
    // .then(res => {
    //   console.log(res);
    //   setUserCallback(res.data);
    // })
    .catch(err => {
      console.log(err);
    });

  return response;
};

//test update
export const updateProfileTesting = async (callback, updateParamsObj) => {
  await request
    .patch('users/profile', updateParamsObj)
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const DeleteProfile = async (setUserCallback, redirect) => {
  const navigate = useNavigate();
  await request
    .delete('users/profile')
    .then(res => {
      console.log(res);
      localStorage.removeItem('teachnlearnJWT');
      setUserCallback(null);
      navigate(redirect);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewStudents = async () => {
  const response = await request
    .get('users/students')
    // .then(res => {
    //   console.log(res);
    // })
    .catch(err => {
      console.log(err);
    });

  return response;
};

export const viewStudent = async studentID => {
  await request
    .get(`users/students/${studentID}`, {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const viewTeachers = async () => {
  const response = await request
    .get('users')
    // .then(res => {
    //   console.log(res);
    // })
    .catch(err => {
      console.log(err);
    });

  return response;
};

export const viewTeacher = async teacherID => {
  await request
    .get(`users/${teacherID}`, {})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
