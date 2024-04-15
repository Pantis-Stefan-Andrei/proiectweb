import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './LoginPage';
import Home from './home';
import HomeAdm from './HomeAdmin';

const App = () => {
  // State to manage user information
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('');
  const [user, setUser] = useState('');

  // Effect to fetch user information from localStorage when the component mounts
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
   //   console.log(storedUser);
      setUsername(storedUser.username); // Change to setUsername
      setEmail(storedUser.email); // Change to setEmail
      setAccountType(storedUser.accountType); // Change to setAccountType
      setUser(storedUser.user); // Change to setUser
    }
  }, []);
  

  // Effect to save user information to localStorage whenever it changes
  useEffect(() => {
    // Save user data to localStorage
    localStorage.setItem(
      'user',
      JSON.stringify({ username, email, accountType, user })
    );
  }, [username, email, accountType, user]);

  return (
    <Router>
      <Routes>
        <Route path="/adminhome" element={
          <HomeAdm
            name={username}
            email={email}
            accountType={accountType}
          />
        } />
        <Route path="/home" element={
          <Home
            name={username}
            email={email}
            accountType={accountType}
          
          />
        } />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
