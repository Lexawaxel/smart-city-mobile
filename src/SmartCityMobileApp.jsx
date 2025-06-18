import React, { useState, useEffect } from "react";
import "./App.css";

export default function SmartCityMobileApp() {
  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);  const [showCameraPopup, setShowCameraPopup] = useState(false);

  useEffect(() => {
    let timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setRedirected(true);
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      }, 30000);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  const handleLogin = () => {
    if (login === "admin" && password === "Lexawaxel") {
      setIsAdmin(true);
      setAuthenticated(true);
    } else if (login === "user") {
      setIsAdmin(false);
      setAuthenticated(true);
    }
  };

  const handleValidation = () => {
    setValidated(true);
    setShowCameraPopup(true);
  };

  const authorizeCamera = () => {
    setCameraAuthorized(true);
    setShowCameraPopup(false);
    setUsers((prev) => [...prev, username]);
    setLoading(true);
  };

  const denyCamera = () => {
    setShowCameraPopup(false);
    setValidated(false);
  };

  const resetAll = () => {
    setLogin("");
    setUsername("");
    setAuthenticated(false);
    setIsAdmin(false);
    setPassword("");
    setValidated(false);
    setCameraAuthorized(false);
    setUsers([]);
    setLoading(false);
    setRedirected(false);
    setShowCameraPopup(false);
  };

  return (
    <div className="app" style={{
      backgroundImage: "url('/smartcity.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      padding: "2rem",
      color: "#fff"
    }}>
      {!authenticated ? (
        <div>
          <h1>Smart City Access</h1>
          <input
            placeholder="Enter 'user' or 'admin'"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          {login === "admin" && (
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          {login === "user" && (
            <input
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : isAdmin ? (
        <div>
          <h1>Admin Panel</h1>
          <ul>
            {users.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
          <button onClick={resetAll}>Logout</button>
        </div>
      ) : !validated ? (
        <div>
          <p>You must validate to continue</p>
          <button onClick={handleValidation}>Validate</button>
        </div>
      ) : showCameraPopup ? (
        <div className="popup" style={{
          background: "rgba(0,0,0,0.8)",
          padding: "2rem",
          borderRadius: "1rem",
          textAlign: "center"
        }}>
          <h2>Allow camera access?</h2>
          <button onClick={authorizeCamera}>Allow</button>
          <button onClick={denyCamera}>Deny</button>
        </div>
      ) : loading ? (
        <div>
          <div className="loader"></div>
          <div>
            <div className="spinner" style={{
              margin: '2rem auto',
              border: '6px solid #f3f3f3',
              borderTop: '6px solid #ff00ff',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 2s linear infinite'
            }}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
