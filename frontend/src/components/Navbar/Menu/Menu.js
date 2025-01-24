import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Menu.scss';
import { User, Clipboard, MessageSquare, Calendar, Settings } from 'react-feather';


const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={({ isActive }) => (isActive ? 'active' : 'inactive')}
    >
      {children}
    </Link>
  );
  

const Menu = ({ isOpen, user }) => {
  const iconSize = 20;
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
        ease: 'easeInOut',
      },
    },
    hidden: {
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: '50%', transition: { ease: 'easeInOut' } },
    show: { opacity: 1, x: '0%', transition: { ease: 'easeInOut' } },
  };

  const isDisabledStyle = {
    color: user ? '#212429' : '#dde2e5',
    cursor: user ? 'pointer' : 'not-allowed',
  };

  const HandleDisabledRoute = (e, disabled) => {
    e.preventDefault();
    const navigate = useNavigate();
    if (disabled) {
      // Navigate to authentication page if the route is disabled
      navigate('/authentication', { replace: true });
    } else {
      // Navigate to the href attribute of the link if it is not disabled
      navigate(e.currentTarget.href, { replace: true });
    }
  };


  const hideStudentsLink = () => {
    if (!user || user.isTeacher) {
      return true;
    }

    if (!user.isTeacher) {
      // hide student link
      return false;
    }
  };

  // console.log(user);

  return (
    <div className="menu-wrapper">
      <motion.ul
        variants={container}
        initial="hidden"
        animate={isOpen ? 'show' : 'hidden'}
      >
        <li>
          <NavLink
            to="profile"
            disabled={user ? false : true}
            onClick={HandleDisabledRoute}
          >
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <User size={iconSize} color={user ? '#212429' : '#dde2e5'} />
              <motion.span variants={item} style={isDisabledStyle}>
                Profile
              </motion.span>
            </div>
          </NavLink>
        </li>
        {hideStudentsLink() && (
          <li>
            <NavLink
              to="students"
              disabled={user ? false : true}
              onClick={HandleDisabledRoute}
            >
              <div className="menu-item" style={isDisabledStyle}>
                <div className="tab" />
                <Clipboard
                  size={iconSize}
                  color={user ? '#212429' : '#dde2e5'}
                />
                <motion.span variants={item} style={isDisabledStyle}>
                  Students
                </motion.span>
              </div>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="messaging"
            disabled={user ? false : true}
            onClick={HandleDisabledRoute}
          >
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <MessageSquare
                size={iconSize}
                color={user ? '#212429' : '#dde2e5'}
              />
              <motion.span variants={item} style={isDisabledStyle}>
                Messaging
              </motion.span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="appointments"
            disabled={user ? false : true}
            onClick={HandleDisabledRoute}
          >
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <Calendar size={iconSize} color={user ? '#212429' : '#dde2e5'} />
              <motion.span variants={item} style={isDisabledStyle}>
                Appointments
              </motion.span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="settings"
            disabled={user ? false : true}
            onClick={HandleDisabledRoute}
          >
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <Settings size={iconSize} color={user ? '#212429' : '#dde2e5'} />
              <motion.span variants={item} style={isDisabledStyle}>
                Settings
              </motion.span>
            </div>
          </NavLink>
        </li>
      </motion.ul>
    </div>
  );
};

export default Menu;
