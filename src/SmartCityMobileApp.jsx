import React, { useState, useEffect } from "react";
import "./App.css";

function SmartCityMobileApp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [showCameraPopup, setShowCameraPopup] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let interval;
    if (isAdmin) {
      interval = setInterval(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isAdmin]);

  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showLoading]);

  const handleLogin = () => {
    if (login === "user") {
      setShowStart(true);
    } else if (login === "admin") {
      if (password === "Lexawaxel") {
        setIsAdmin(true);
      }
    }
  };

  const handleStart = () => {
    setShowValidationPopup(true);
  };

  const handleValidation = () => {
    setShowValidationPopup(false);
    setShowCameraPopup(true);
  };

  const handleCameraAccess = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    storedUsers.push(username);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    setShowCameraPopup(false);
    setShowLoading(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setLogin("");
    setPassword("");
    setUsername("");
    setSubmitted(false);
    setShowStart(false);
    setShowValidationPopup(false);
    setShowCameraPopup(false);
    setShowLoading(false);
  };

  return (
    <div className="app">
      {!isAdmin && !submitted && (
        <div className="login-container">
          <input
            type="text"
            placeholder="Enter user or admin"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          {login === "admin" && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          {login === "user" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {showStart && !submitted && (
        <div className="start-container">
          <button onClick={handleStart}>Start</button>
        </div>
      )}

      {showValidationPopup && (
        <div className="popup">
          <p>Il vous faudra valider pour aller plus loin</p>
          <button onClick={handleValidation}>Valider</button>
          <button onClick={() => setShowValidationPopup(false)}>✖</button>
        </div>
      )}

      {showCameraPopup && (
        <div className="popup">
          <p>L'application souhaite accéder à la caméra.</p>
          <button onClick={handleCameraAccess}>Autoriser</button>
        </div>
      )}

      {showLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      )}

      {isAdmin && (
        <div className="admin-panel">
          <h2>Utilisateurs ayant validé l'accès caméra :</h2>
          <ul>
            {users.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default SmartCityMobileApp;
