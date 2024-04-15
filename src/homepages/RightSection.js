import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const RightSection = () => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };

  const toggleCartPopup = () => {
    setShowCartPopup(!showCartPopup);
  };

  return (
    <div className="right-section">
      {/* Iconița pentru utilizator */}
      <FontAwesomeIcon icon={faUser} onClick={toggleUserPopup} />

      {/* Iconița pentru coșul de cumpărături */}
      <FontAwesomeIcon icon={faShoppingCart} onClick={toggleCartPopup} />

      {/* Pop-up pentru utilizator */}
      {showUserPopup && (
        <div className="popup-overlay" onClick={toggleUserPopup}>
          <div className="popup">
            Informații despre utilizator
          </div>
        </div>
      )}

      {/* Pop-up pentru coșul de cumpărături */}
      {showCartPopup && (
        <div className="popup-overlay" onClick={toggleCartPopup}>
          <div className="popup">
            Informații despre coșul de cumpărături
          </div>
        </div>
      )}

      {/* Alte componente sau funcționalități */}
    </div>
  );
}

export default RightSection;
