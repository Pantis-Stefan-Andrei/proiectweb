import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './LoginPage';
import Home from './home';
import HomeAdm from './HomeAdmin';

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser);
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const updateUser = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

 
  return (
    <Router>
      <Routes>
        <Route
          path="/adminhome"
          
          
          element={
              <HomeAdm
              
            
              />
            
          }
        />
        <Route
          path="/home"
          element={
             <Home
                
             
              />
           
            
          }
        />
        <Route
          path="/"
          element={
            (
              <Navigate to="/start" replace />
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
