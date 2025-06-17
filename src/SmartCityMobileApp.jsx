import React, { useState, useEffect } from "react";

export default function SmartCityMobileApp() {
  const [login, setLogin] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [cameraSimulated, setCameraSimulated] = useState(false);
  const [loading, setLoading] = useState(false);
    const [validatedUsers, setValidatedUsers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("validatedUsers") || "[]");
    setValidatedUsers(stored);
    if (adminAuthenticated) {
      const interval = setInterval(() => {
        const updated = JSON.parse(localStorage.getItem("validatedUsers") || "[]");
        setValidatedUsers(updated);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [adminAuthenticated]);

  const saveUserLocally = (name) => {
    const existing = JSON.parse(localStorage.getItem("validatedUsers") || "[]");
    const updated = [...existing, { username: name, timestamp: new Date().toISOString() }];
    localStorage.setItem("validatedUsers", JSON.stringify(updated));
  };

  const handleValidation = () => {
    setShowValidationPopup(false);
    setCameraSimulated(true);
    saveUserLocally(username);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }, 30000);
  };

  const handleClosePopup = () => {
    setShowValidationPopup(false);
  };

  const resetAll = () => {
    setLogin("");
    setIsAdmin(false);
    setAdminPassword("");
    setAdminAuthenticated(false);
    setUsername("");
    setShowValidationPopup(false);
    setCameraSimulated(false);
    setLoading(false);
    setRedirected(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/smartcity.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'monospace'
      }}
    >
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        padding: '2rem',
        borderRadius: '10px',
        textAlign: 'center',
        color: 'white',
        width: '100%',
        maxWidth: '400px'
      }}>
        {!cameraSimulated && !adminAuthenticated && (
          <>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Login</h1>
            <input
              placeholder="Enter 'user' or 'admin'"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value.toLowerCase());
                setIsAdmin(e.target.value.toLowerCase() === "admin");
              }}
              style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
            />
            {login === "user" && (
              <input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
              />
            )}
            {login === "user" && username && (
              <button
                onClick={() => setShowValidationPopup(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  backgroundColor: '#ff00ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Start
              </button>
            )}
            {isAdmin && (
              <input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
              />
            )}
            {isAdmin && (
              <button
                onClick={() => {
                  if (adminPassword === "Lexawaxel") {
                    setAdminAuthenticated(true);
                  } else {
                    alert("Wrong password");
                  }
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  backgroundColor: '#00bfff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            )}
          </>
        )}

        {showValidationPopup && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999
          }}>
            <div style={{
              backgroundColor: 'black',
              padding: '2rem',
              borderRadius: '10px',
              textAlign: 'center',
              position: 'relative',
              width: '80%',
              maxWidth: '300px'
            }}>
              <button onClick={handleClosePopup} style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.75rem',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.25rem',
                cursor: 'pointer'
              }}>×</button>
              <p style={{ marginBottom: '1.5rem' }}>You must validate to go further</p>
              <button onClick={handleValidation} style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#00ff99',
                border: 'none',
                borderRadius: '4px',
                color: 'black',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>Validate</button>
            </div>
          </div>
        )}

        {loading && (
          <div>
            <h2>Simulating camera access...</h2>
            <div className="spinner" style={{
              margin: '2rem auto',
              border: '6px solid #f3f3f3',
              borderTop: '6px solid #ff00ff',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 2s linear infinite'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {adminAuthenticated && (
          <div>
            <h2>Admin Panel</h2>
            <ul style={{ textAlign: 'left', fontSize: '0.9rem', padding: 0 }}>
              {validatedUsers.map((u, i) => (
                <li key={i}>👤 {u.username} – {new Date(u.timestamp).toLocaleTimeString()}</li>
              ))}
            </ul>
            <button onClick={resetAll} style={{
              marginTop: '2rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#ff4444',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer'
            }}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
