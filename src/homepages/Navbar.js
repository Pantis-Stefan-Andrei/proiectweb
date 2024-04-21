import React, { useState } from 'react';
import Logo from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ handlePageChange, handleLogout }) => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
    handlePageChange('USER');
  };

  const toggleCartPopup = () => {
    setShowCartPopup(!showCartPopup);
    handlePageChange('CART');
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Logo />
      </div>
      <div style={{ fontStyle: 'italic', fontSize: '20px', fontFamily: 'cursive', fontWeight: 'bold', textDecoration: 'underline' }}>Noi N-AVEM!</div>
      <div className="options">
        <button className="nav-button" onClick={() => handlePageChange('HOME')}>HOME</button>
        <button className="nav-button" onClick={() => handlePageChange('STUDENTI')}>STUDENTI</button>
        <button className="nav-button" onClick={() => handlePageChange('STUDENTE')}>STUDENTE</button>
        <button className="nav-button" onClick={() => handlePageChange('CONTACT')}>CONTACT</button>
      </div>
      <div className="right-section">
        {/* Icon for logout */}
        <button className="icon-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faUser} onClick={toggleUserPopup} />
            LogOut
        </button>
        {/* Icon for user */}
        <FontAwesomeIcon className="icon" icon={faUser} onClick={toggleUserPopup} />
        {/* Icon for cart */}
        <FontAwesomeIcon className="icon" icon={faShoppingCart} onClick={toggleCartPopup} />
      </div>
    </div>
  );
};

export default Navbar;
