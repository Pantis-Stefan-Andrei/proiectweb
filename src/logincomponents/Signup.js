import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sign.css';

function Signup() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    account_type: 'student',
    username: '',
    anstudiu: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, account_type, username, anstudiu } = newUser;
    if (email !== '' && username !== '' && password !== '' && account_type !== '' && anstudiu !== 0) {
      try {
        await axios.post('https://server-9ib4.onrender.com/api/users', newUser);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        setNewUser({
          email: '',
          password: '',
          account_type: '',
          username: '',
          anstudiu: 0
        });
      } catch (error) {
        console.error('Signup failed', error.message);
        setLoginError('Signup failed: ' + error.message);
      }
    } else {
      setLoginError('Please fill in all fields.');
    }
  };

  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/home', {
      state: {
        username: newUser.username,
        email: newUser.email,
        account_type: newUser.account_type
      }
    });
  }

  return (
    <div id="signup2" className="tabcontent2">
      <form className="signup-form2" onSubmit={handleSignup}>
        <input type="email" className="input" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} required />
        <input type="text" className="input" name="username" autoComplete="off" placeholder="Username" value={newUser.username} onChange={handleChange} required />
        <input type="password" className="input" name="password" autoComplete="off" placeholder="Password" value={newUser.password} onChange={handleChange} required />
        <select name="anstudiu" value={newUser.anstudiu} onChange={handleChange} required>
          <option value="0">Select Year</option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
        </select>
        <input type="submit" className="button" value="Sign Up" />
        {loginError && <div className="error-message">{loginError}</div>}
      </form>
      <div className="help-text">
        <p>
          <label>Orice studentă este rezolvată aici!</label><br></br>
        </p>
      </div>
    </div>
  );
}

export default Signup;
