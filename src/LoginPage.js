import React, { useState, useEffect } from "react";
import Signup from "./logincomponents/Signup";
import Login from "./logincomponents/Login";
import "./styles.css";

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="first-page">
      <h1>Sun's Inventory</h1>
      <div className="form-wrap">
        <div className="tabs">
          <h3 className="login-tab">
            <a
              className={`tablink ${isLoggedIn ? "active" : ""}`}
              onClick={(e) => {
                openTab(e, "login-tab-content");
                handleLogout();
              }}
            >
              Login
            </a>
          </h3>

          <h3 className="signup-tab">
            <a
              className={`tablink ${!isLoggedIn ? "active" : ""}`}
              onClick={(e) => {
                openTab(e, "signup-tab-content");
              }}
            >
              Sign Up
            </a>
          </h3>
        </div>

        <div className="tabs-content">
          { <Signup />}
          { <Login  />}
        </div>
      </div>
    </div>
  );
}

export default App;
