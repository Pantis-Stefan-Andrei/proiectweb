import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingBag, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from './homepages/Navbar';
import LoginPage from './LoginPage';
import Home from './homepages/start';
import UserPage from './homepages/userpage';
import Students from './homepages/Students';
import Cart from './homepages/cart';
import Contact from './homepages/contact';
import Studentesses from './homepages/Studentesses';
import HelperPage from './homepages/HelperPage.js'
import './styles/scss/styles.scss';
import './home.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [account_type, setAccountType] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.username);
      setEmail(storedUser.email);
      setAccountType(storedUser.accountType);
    }
  }, []);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if (page === 'STUDENTI' )
    setType('Masculin');
    if (page === 'STUDENTE' )
    setType('Feminin');
    if (page === 'STUDENTI' || page === 'STUDENTE')
    setCurrentPage(page === currentPage ? 'DEFAULT' : page);
  else
  setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = 'cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/start');
  };

  return (
    <div className="app">
      <Navbar handlePageChange={handlePageChange} handleLogout={handleLogout} />
      <div className="content">
        {currentPage === 'HOME' && <Home />}
        {currentPage === 'USER' && <UserPage email={email} />}
        {currentPage === 'STUDENTI' && <Students email={email} />}
        {currentPage === 'STUDENTE' && <Studentesses email={email} />}
        {currentPage === 'DEFAULT' && <HelperPage email={email} type={type}/>}
        {currentPage === 'CONTACT' && <Contact />}
        {currentPage === 'CART' && <Cart email={email} />}
      </div>
    </div>
  );
};

export default App;