import React from 'react';
import logo from '../logo.jpg';
import './Logo.css'; // Import the CSS file for styling

function Logo() {
  return <img className="logo" src={logo} alt="Logo" />;
}

export default Logo;