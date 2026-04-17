import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const UserBookings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  
  // Login form states for viewing bookings
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser") || localStorage.getItem("viewUser");
    if (loggedIn) {
      setUser(loggedIn);
      loadBookings(loggedIn);
    }
  }, []);

  const handleLogin = () => {
    if (!usernameInput || !passwordInput) {
      alert("Fill all fields ❌");
      return;
    }
    const usersStr = localStorage.getItem("users");
    const users = usersStr ? JSON.parse(usersStr) : [];
    const foundUser = users.find(u => u.username === usernameInput);

    if (foundUser) {
      if (foundUser.password === passwordInput) {
        localStorage.setItem("viewUser", usernameInput);
        setUser(usernameInput);
        loadBookings(usernameInput);
      } else {
        alert("Wrong password ❌");
      }
    } else {
      alert("User not found ❌");
    }
  };

  const loadBookings = async (username) => {
    try {
      // original fetched all and filtered by user
      const res = await axios.get(`${API_BASE}/my-bookings/${username}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error("Error loading bookings", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      loadBookings(user);
    } catch (err) {
      console.error("Error deleting booking", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("viewUser");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  if (!user) {
    // Show Login to view bookings
    return (
      <div className="page-container" style={{ background: 'linear-gradient(135deg,#000,#111)' }}>
        <div className="glass-panel animate-fade-in" style={{ width: '320px', textAlign: 'center' }}>
          <h2 className="glow-text">📖 View Your Bookings</h2>
          <input className="input-field" placeholder="Username" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} />
          <input className="input-field" type="password" placeholder="Password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
          <button className="btn-primary" onClick={handleLogin} style={{ marginTop: '10px' }}>Login</button>
        </div>
      </div>
    );
  }

  // Show Bookings
  return (
    <>
      <div className="overlay"></div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid var(--gold)', background: 'rgba(0,0,0,0.8)' }}>
        <h2 className="glow-text" style={{ margin: 0 }}>📖 My Bookings</h2>
        <button className="btn-outline" onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ padding: '20px 40px' }}>
        <div className="glass-panel animate-fade-in" style={{ width: '200px', padding: '20px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '10px', marginTop: 0 }}>Total Bookings</h3>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{bookings.length}</p>
        </div>
      </div>

      <div style={{ padding: '20px 40px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 15px rgba(255,215,0,0.2)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>#</th>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>Name</th>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>Mobile</th>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>Guests</th>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>Date</th>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>Time</th>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>Table</th>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#aaa' }}>No bookings found</td>
                </tr>
              ) : (
                bookings.map((b, i) => (
                  <tr key={b._id} style={{ transition: '0.3s' }}>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>{i + 1}</td>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>{b.name}</td>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>{b.mobile}</td>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>{b.guests}</td>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>{b.date}</td>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>{b.time}</td>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>{b.tableNumber}</td>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>
                      <button 
                        style={{ background: 'red', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                        onClick={() => handleDelete(b._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserBookings;
