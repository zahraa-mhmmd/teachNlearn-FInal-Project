import React, { useState, useEffect } from 'react';
import { viewProfile } from '../../components/AxiosTest/userRoutes';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  // First time user
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); ///Tracks whether the authentication state is still being loaded.

  // // handles fist page load with a valid user that has a jwt
  useEffect(() => {
    const jwt = localStorage.getItem('teachnlearnJWT');
    //login with active jwt
    if (user === null && jwt) {
      const getUser = async () => {
        try {
          const response = await viewProfile();
          setUser(response.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        } catch (error) {
          setTimeout(() => {
            setIsLoading(false);
            console.log(error);
          }, 2000);
        }
      };
      getUser();
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [user]);

  // // Student Generator

  // useEffect(() => {
  //   const generateUser = async () => {
  //     await signUpStudent(setUser);
  //     // await signUpTeacher(setUser);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   };
  //   generateUser();
  // }, []);

  const authState = {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
