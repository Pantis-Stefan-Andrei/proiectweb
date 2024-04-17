import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './LoginPage';
import Home from './home';
import HomeAdm from './HomeAdmin';

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const updateUser = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/adminhome"
          element={
            userData ? (
              <HomeAdm
                name={userData.username}
                email={userData.email}
                accountType={userData.accountType}
                logout={logout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/home"
          element={
            userData ? (
              <Home
                name={userData.username}
                email={userData.email}
                accountType={userData.accountType}
                logout={logout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            userData ? (
              <Navigate to="/home" replace />
            ) : (
              <Login updateUser={updateUser} />
            )
          }
        />
                 <Route path="/start" element={
          <Login/>    
        } />
      </Routes>
    </Router>
  );
};

export default App;
