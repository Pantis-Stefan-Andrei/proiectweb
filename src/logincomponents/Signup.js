import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sign.css'

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [account_type, setType] = useState('');
  const [anstudii, setYears] = useState(0);
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(0); 
  const [loginError, setLoginError] = useState(null); // State variable to track login error


 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setType('student');
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
  
  function validateForm() {
    var email = document.getElementById("email").value;
    if (!email.includes("@")) {
      alert("Please enter a valid email address!");
      return false;
    }
    return true;
  }
  
  
  const handleSignup = async () => {
    console.log(  email,username,password,account_type,anstudii);
    if (email!='' && username!='' && password!='' && account_type!='' && anstudii!=0 ) {
    try {
      const response = await axios.post('https://server-9ib4.onrender.com/api/signup', {
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
        setLoginError('Signup failed: Response data is undefined');
      }
    } catch (error) {
      console.error('Signup failed', error.message);
      setLoginError('Signup failed: ' + error.message);
    }}
    else
    {
      setLoginError('Signup failed: Response data is undefined');
    }
  };

  const navigate = useNavigate();

  if (isLoggedIn) {
 
    navigate('/home', {
      state: {
        username,
        email,
        account_type,
       
      }
      });
    }
  

  return (
    <div id="signup2" class="tabcontent2" >
       <form className="signup-form2" >
      
       <input type="email" className="input"  placeholder="Email"  value={email} onChange={handleEmailChange}/>
       
        <input type="text" className="input"  id="user_name" autoComplete="off" placeholder="Username" value={username} onChange={handleusenameChange}/>
        <input type="password" className="input"  id="user_pass" autoComplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
          <select id="number" name="select"  value={anstudii} onChange={handleanstudiiChange}>
    <option value="1">I</option>
    <option value="2">II</option>
    <option value="3">III</option>
    <option value="4">IV</option>
  </select>
        <input type="submit2"  onClick={handleSignup} className="button"  value="sign Up"/>
        {loginError && <div className="error-message">{loginError}</div>} {/* Render error message if loginError is not null */}
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
