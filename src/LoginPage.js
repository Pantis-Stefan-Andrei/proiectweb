

import React from "react";

import Signup from "./logincomponents/Signup";
import Login from "./logincomponents/Login";
import './styles.css'
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
  return (
    <div class="first-page">
      <h1>Sun's Inventory</h1>
      <div className="form-wrap">
        <div class="tabs">
        <h3 class="login-tab">
        
          <a class="tablink active" onClick={(e) => openTab(e, "login-tab-content")}>
              Login
            </a>
          </h3>
        
          <h3 class="signup-tab">
            <a class="tablink" onClick={(e) => openTab(e, "signup-tab-content")}>
              Sign Up
            </a>
          </h3>
        </div>

        <div class="tabs-content">
          
          <Signup />
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
