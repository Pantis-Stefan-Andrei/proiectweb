import React, { useState } from "react";
import Signup from "./logincomponents/Signup";
import Login from "./logincomponents/Login";
import "./styles.css";

function App() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="first-page">
      <h1>Sun's Inventory</h1>
      <div className="form-wrap">
        <div className="tabs">
          <h3 className={`tablink ${activeTab === "login" ? "active" : ""}`}>
            <a onClick={() => handleTabClick("login")}>Login</a>
          </h3>
          <h3 className={`tablink ${activeTab === "signup" ? "active" : ""}`}>
            <a onClick={() => handleTabClick("signup")}>Sign Up</a>
          </h3>
        </div>

        <div className="tabs-content">
          {activeTab === "login" && <Login />}
          {activeTab === "signup" && <Signup />}
        </div>
      </div>
    </div>
  );
}

export default App;
