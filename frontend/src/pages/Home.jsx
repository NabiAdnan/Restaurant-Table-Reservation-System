import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="overlay"></div>
      <div className="page-container" style={{ flexDirection: 'column', textAlign: 'center' }}>
        <h1 className="glow-text" style={{ fontSize: '60px', marginBottom: '10px' }}>
          Luxury Restaurant
        </h1>
        <p className="subtitle">Reserve your table in seconds 🍽️</p>
        
        <p className="note-text" style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '10px 15px',
          borderRadius: '8px',
          border: '1px solid rgba(255,215,0,0.3)',
          boxShadow: '0 0 10px rgba(255,215,0,0.2)',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>
          Forgot your username or password? <br />
          📧 Mail us at <b>luxuryresturant@gmail.com</b><br />
          We will send you new login credentials.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '250px' }}>
          <Link to="/user-login" className="btn-primary" style={{ textDecoration: 'none' }}>
            👤 User Login
          </Link>
          <Link to="/admin-login" className="btn-primary" style={{ textDecoration: 'none' }}>
            🔐 Admin Login
          </Link>
          <Link to="/my-bookings" className="btn-primary" style={{ textDecoration: 'none' }}>
            📋 My Bookings
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
