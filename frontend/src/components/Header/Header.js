import React, { useContext, useState, useEffect } from 'react';
import Search from '../Search/Search';
import './Header.scss';
import { AuthContext, NavbarContext } from '../../globalState/index';
import { motion } from 'framer-motion';

const Header = ({
  location,
  variants,
  initialAnimation,
  inAnimation,
  outAnimation,
  transition,
}) => {
  const { user } = useContext(AuthContext);
  const { isOpen, setIsOpen } = useContext(NavbarContext);

  function getPathName() {
    if (location.pathname === '/' && user) {
      return `Welcome ${user.firstName}`;
    }

    if (location.pathname === '/' && !user) {
      return `Home`;
    }

    if (location.pathname === '/profile' && user) {
      return `Your Profile`;
    }

    if (location.pathname.includes('teachers')) {
      return `Teachers`;
    }
    if (location.pathname.includes('students')) {
      return `Students`;
    }

    if (location.pathname.includes('appointment')) {
      return `Appointments`;
    }
    if (location.pathname.includes('settings')) {
      return `Settings`;
    }
    if (location.pathname.includes('messaging')) {
      return `Messages`;
    }

    if (location.state !== null) {
      let viewLocation = location.pathname.replace(/[^a-z]/g, '');
      return viewLocation.charAt(0).toUpperCase() + viewLocation.slice(1);
    }
  }

  return (
    <motion.header
      className="header-wrapper"
      variants={variants}
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
    >
      <h1>{getPathName()}</h1>
      <Search />
    </motion.header>
  );
};

export default Header;
