import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [account_type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null); // State variable to track login error

  useEffect(() => {}, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://server-9ib4.onrender.com/api/login', {
        email,
        password,
      });
      console.log('Login response:', response);
      if (response && response.data) {
        const { name, email, account_type } = response.data.user;
        console.log('User data:', { name, email, account_type });
        setUsername(name);
        setEmail(email);
        setType(account_type);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify({ name, email, account_type }));
      } else {
        console.error('Login failed: Response data is undefined');
        setLoginError('Login failed: user sau parola este incorecta'); // Set login error message
      }
    } catch (error) {
      console.error('Login failed', error.message);
      setLoginError('Login failed: user sau parola este incorecta'); // Set login error message
    }
  };

  const handleguest = async () => {
    setType('guest');
  };

  const navigate = useNavigate();

  if (account_type === 'guest') {
    navigate('/home');
  }

  if (isLoggedIn) {
    if (account_type === 'admin') {
      navigate('/adminhome', {
        state: {
          username,
          email,
          account_type,
        },
      });
    } else {
      navigate('/home', {
        state: {
          username,
          email,
          account_type,
          isLoggedIn,
        },
      });
    }
  }

  return (
    <div id="login" className="tabcontent" style={{ display: 'block' }}>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" className="input" autoComplete="off" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input type="password" className="input" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <input type="submit" className="button" value="Login" />
      </form>
      {loginError && <div className="error-message">{loginError}</div>} {/* Render error message if loginError is not null */}
      <div className="help-text">
        <form className="login-form" onSubmit={handleguest}>
          <input type="submit" className="button" value="Enter as a guest" />
        </form>
        <p>
          <label>Orice studentă este rezolvată aici!</label>
         
         
        </p>
      </div>
    </div>
  );
}

export default Login;
