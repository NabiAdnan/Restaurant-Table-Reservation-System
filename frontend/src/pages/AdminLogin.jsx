import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Fill all fields ❌");
      return;
    }

    if (username === "admin" && password === "1234") {
      localStorage.setItem("admin", "true");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="page-container" style={{ background: 'linear-gradient(135deg,#000,#111)' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '300px', textAlign: 'center' }}>
        <h2 className="glow-text">🔐 Admin Login</h2>
        <input
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-primary" onClick={handleLogin} style={{ marginTop: '10px' }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
