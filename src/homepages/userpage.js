import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userpage.css';
import { useNavigate } from 'react-router-dom';

function UserPage({ email }) {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    password: '',
    account_type: '',
    username: '',
    anstudiu: 0 // Initialize with default value
  });

  useEffect(() => {
    // Fetch user data from the server when component mounts
    fetchUserData();
  }, [email]);

  const fetchUserData = async () => {
    try {
      const response = await axios.post('https://server-9ib4.onrender.com/api/email', { email });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { password, account_type, username, anstudiu } = formData;
      const updatedUserData = { ...user, password, account_type, username, anstudiu };
      await axios.post('https://server-9ib4.onrender.com/api/schimbadate', updatedUserData);
      // Refresh user data after updating
      fetchUserData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
     
      await axios.delete(`https://server-9ib4.onrender.com/api/users/${user.id}`);
      setUser({});
      
   
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.clear();
        sessionStorage.clear();
        document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
       
      
    navigate('/');
  
    
     

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='bodyuser'>
      <ul>
        <h2>Date Cont:</h2>
        <li>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Tipul de Cont: {user.account_type}</p>
          <p>Anul de studiu: {user.anstudiu}</p>
          <button onClick={handleDelete}>Delete Account</button>
        </li>
      </ul>
      <h2>Modifica cont:</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="account_type" placeholder="Account Type" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="number" name="anstudiu" placeholder="Study Year" onChange={handleChange} required />
        <button type="submit">Modifica User</button>
      </form>
    </div>
  );
}

export default UserPage;
