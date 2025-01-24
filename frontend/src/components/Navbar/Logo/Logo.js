import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';
import LogoFramer from './LogoFramer';

const Logo = ({ isOpen }) => {
  return (
    <Link to="/">
      <div className="logo-wrapper">
        <LogoFramer isOpen={isOpen}  />
      </div>
    </Link>
  );
};

export default Logo;
