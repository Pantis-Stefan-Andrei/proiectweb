import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [account_type, setType] = useState('');
  const [anstudii, setYears] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {

  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleusenameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleanstudiiChange = (event) => {
    setYears(event.target.value);
  };
  
  const handleaccountTypeChange = (event) => {
    setType(event.target.value);
  };
  
  const handleSignup = async () => {
    console.log(   email,username,password,account_type,anstudii);
    try {
      const response = await axios.post('https://sundbserver.azurewebsites.net/api/signup', {
        email, 
      username,
        password,
        account_type,
        anstudii
      });
      if (response && response.data) {
        setIsLoggedIn(true);

        localStorage.setItem('user', JSON.stringify({  email, username, password, account_type ,anstudii}));
      } else {
        console.error('Signup failed: Response data is undefined');
      }
    } catch (error) {
      console.error('Signup failed', error.message);
    }
  };

  const navigate = useNavigate();

  if (isLoggedIn) {
 
    navigate('/home', {
      state: {
        username,
        email,
        account_type,
        isLoggedIn
      }
      });
    }
  

  return (
    <div id="signup-tab-content" class="tabcontent" >
       <form className="signup-form"  onSubmit={handleSignup}>
        <input type="text" className="input" id="user_email" autoComplete="off" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <input type="text" className="input"  id="user_name" autoComplete="off" placeholder="Username" value={username} onChange={handleusenameChange}/>
        <input type="password" className="input"  id="user_pass" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <input type="text" className="input" id="user_ype" autoComplete="off" placeholder="Account Type" value={account_type} onChange={handleaccountTypeChange}/>
        <input type="text" className="input"  id="user_year" autoComplete="off" placeholder="Study Year" value={anstudii} onChange={handleanstudiiChange}/>
        <input type="submit" className="button"  value="Sign Up" />
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
