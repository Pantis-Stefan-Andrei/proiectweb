import React, { useState ,useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingBag, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from './homepages/Navbar';
import LoginPage from './LoginPage';
import Home from './homepages/start';
import UserPage from './homepages/userpage'; // Corrected import name
import Students from './homepages/Students';
import Cart from './homepages/cart';
import Contact from './homepages/contact';
import Studentesses from './homepages/Studentesses';
import './styles/scss/styles.scss';
import './home.css';
import { useNavigate } from 'react-router-dom';

const App = ({ }) => { // Destructure props
  const [currentPage, setCurrentPage] = useState('HOME');

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [account_type, setAccountType] = useState('');
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log(storedUser);
      setUsername(storedUser.username); // Change to setUsername
      setEmail(storedUser.email); // Change to setEmail
      setAccountType(storedUser.accountType); // Change to setAccountType
   
    }
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
   
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

   
  
navigate('/');
  };

  return (
    <div className="app">
      <Navbar handlePageChange={handlePageChange} handleLogout={handleLogout} /> {/* Pass handleLogout function to Navbar */}

      <div className="content">
    
        {currentPage === 'HOME' && <Home />}
        {currentPage === 'USER' && <UserPage   email={email} />} {/* Corrected component name and passed props */}
        {currentPage === 'STUDENTI' && <Students email={email}/>}
        {currentPage === 'STUDENTE' && <Studentesses email={email}/>}
        {currentPage === 'CONTACT' && <Contact />}
        {currentPage === 'CART' && <Cart email={email} />}
      </div>
    </div>
  );
};

export default App;
