import React from 'react';
import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ContextProvider from './globalState/state.js';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';
import LoadingWrapper from './components/LoadingWrapper/LoadingWrapper.js';
import FlashMessage from './components/FlashMessage/FlashMessage';
import Header from './components/Header/Header';
import MotionContainer from './components/MotionContainer/MotionContainer';
import Home from './components/Home/Home';
import ViewNavigation from './components/ViewNavigation/ViewNavigation';
import ViewTeacher from './components/Home/ViewTeacher/ViewTeacher';
import Profile from './components/Main/Profile/Profile';
import Messaging from './components/Main/Messaging/Messaging';
import Appointments from './components/Main/Appointments/Appointments';
import Authentication from './components/Main/Authentication/Authentication';
import FourOhFour from './components/FourOhFour/FourOhFour';
import Students from './components/Main/Students/Students.js';
import AccountSettings from './components/Main/AccountSettings/AccountSettings';
import StudentList from './components/Main/Students/StudentList/StudentList.js';
import StudentProfile from './components/Main/Students/StudentProfile/StudentProfile.js';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PrivateTeacherRoute from './components/PrivateTeacherRoute/PrivateTeacherRoute.js';

function App() {
  const location = useLocation();
  
  const routeVariants = {
    initial: {
      opacity: 0,
      x: '-10vw',
      scale: 0.96,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: '10vw',
      scale: 0.96,
    },
  };

  const headerVariants = {
    initial: {
      opacity: 1,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 1,
    },
  };

  const routeTransition = {
    duration: 0.9,
    type: 'tween',
    ease: 'easeInOut',
  };

  return (
    <ContextProvider>
      <div className="App">
        <Layout>
          <Navbar location={location} />
          <LoadingWrapper>
            <Main>
              <FlashMessage />
              <AnimatePresence mode="wait">
                <Header
                  location={location}
                  key={location.key}
                  variants={headerVariants}
                  initialAnimation={'initial'}
                  inAnimation={'in'}
                  outAnimation={'out'}
                  transition={routeTransition}
                />
              </AnimatePresence>
              <AnimatePresence mode='wait' initial={false}>
                <MotionContainer
                  location={location}
                  variants={routeVariants}
                  initialAnimation={'initial'}
                  inAnimation={'in'}
                  outAnimation={'out'}
                  transition={routeTransition}
                  key={location.key}
                >
                  <ViewNavigation location={location} />
                  <Routes location={location} key={location.key}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                    <Route path="/appointments" element={<PrivateRoute component={Appointments} />} />
                     <Route path="/teachers/:id" element={<ViewTeacher />} />
                    
                    <Route path="/students" element={<PrivateTeacherRoute component={Students} />}>
                      <Route index element={<StudentList />} />
                      <Route path=":id" element={<StudentProfile />} />
                    </Route>
                    <Route path="/messaging" element={<PrivateRoute component={Messaging} />} /> 
                    <Route path="/settings" element={<PrivateRoute component={AccountSettings} />} />
                    <Route path="/authentication" element={<Authentication location={location} />} />
                    <Route path="*" element={<FourOhFour />} />
                  </Routes>
                </MotionContainer>
              </AnimatePresence>
            </Main>
          </LoadingWrapper>
        </Layout>
      </div>
    </ContextProvider>
  );
}

export default App;
