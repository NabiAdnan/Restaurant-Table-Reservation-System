import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!username || !password || !mobile) {
      alert("Fill all fields");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username);

    if (user) {
      if (user.password === password) {
        localStorage.setItem("loggedInUser", username);
        localStorage.setItem("loggedInMobile", user.mobile);
        alert("Login successful ✅");
        navigate("/booking");
      } else {
        alert("Wrong password ❌");
      }
    } else {
      users.push({ username, password, mobile });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful ✅ Now login again");
    }
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="page-container">
        <div className="glass-panel animate-zoom-in" style={{ width: '300px', textAlign: 'center' }}>
          <h2 className="glow-text">👤 User Login / Signup</h2>
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
          <input
            className="input-field"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button className="btn-primary" onClick={handleAuth} style={{ marginTop: '15px' }}>
            Login / Signup
          </button>
          <p className="note-text">New user? Just enter details to signup</p>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
