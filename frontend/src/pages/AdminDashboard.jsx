import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      alert("Login first");
      navigate("/admin-login");
      return;
    }
    loadBookings();
  }, [navigate]);

  const loadBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/bookings`);
      setBookings(res.data || []);
    } catch (err) {
      console.error("Error loading bookings", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete booking?")) return;
    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      loadBookings();
    } catch (err) {
      console.error("Error deleting booking", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <>
      <div className="overlay"></div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid var(--gold)', background: 'rgba(0,0,0,0.8)' }}>
        <h2 className="glow-text" style={{ margin: 0 }}>📊 Admin Dashboard</h2>
        <button className="btn-outline" onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ display: 'flex', padding: '20px 40px' }}>
        <div className="glass-panel animate-fade-in" style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '10px' }}>Total Bookings</h3>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{bookings.length}</p>
        </div>
      </div>

      <div style={{ padding: '20px 40px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 15px rgba(255,215,0,0.2)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ background: 'var(--gold)', color: 'black', padding: '12px' }}>User</th>
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
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#aaa' }}>No bookings</td>
                </tr>
              ) : (
                bookings.map(b => (
                  <tr key={b._id} style={{ transition: '0.3s' }}>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #333' }}>{b.username}</td>
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
                        Delete
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

export default AdminDashboard;
