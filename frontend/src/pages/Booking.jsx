import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const Booking = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedTable, setSelectedTable] = useState('');
  const [bookedTables, setBookedTables] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '', mobile: '', guests: '', date: '', time: ''
  });
  
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("Login required!");
      navigate("/user-login");
    } else {
      setUser(loggedInUser);
      // pre-fill mobile if available
      const mobile = localStorage.getItem("loggedInMobile");
      setFormData(prev => ({ ...prev, mobile: mobile || '' }));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInMobile");
    navigate("/");
  };

  const checkAvailability = async (date, time) => {
    if (!date || !time) return;
    try {
      const res = await axios.get(`${API_BASE}/booked?date=${date}&time=${time}`);
      setBookedTables(res.data || []);
      // If selected table is now booked, deselect it
      if (res.data.includes(selectedTable)) {
        setSelectedTable('');
      }
    } catch (err) {
      console.error("Error fetching booked tables", err);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [id]: value };
      if (id === 'date' || id === 'time') {
        checkAvailability(id === 'date' ? value : updated.date, id === 'time' ? value : updated.time);
      }
      return updated;
    });
  };

  const handleTableClick = (tableId) => {
    if (bookedTables.includes(tableId)) {
      alert("Already booked");
      return;
    }
    setSelectedTable(tableId);
  };

  const handleReserve = async () => {
    if (!selectedTable) {
      alert("Select table");
      return;
    }
    if (!formData.name || !formData.date || !formData.time) {
      alert("Please fill name, date, and time");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/book`, {
        username: user,
        name: formData.name,
        mobile: formData.mobile,
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        tableNumber: selectedTable
      });

      if (res.data.success) {
        setShowPopup(true);
        checkAvailability(formData.date, formData.time);
      } else {
        alert("Already booked ❌");
      }
    } catch (err) {
      alert("Error booking table");
    }
  };

  const getTableClass = (id, type) => {
    let classes = `restaurant-table table-${type} `;
    if (selectedTable === id) classes += 'selected ';
    if (bookedTables.includes(id)) classes += 'booked ';
    return classes.trim();
  };

  // Time options calculation
  const times = [];
  for (let h = 10; h <= 23; h++) {
    let hour = h > 12 ? h - 12 : h;
    let ampm = h >= 12 ? "PM" : "AM";
    times.push({ value: `${h}:00`, label: `${hour}:00 ${ampm}` });
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="overlay"></div>
      
      <div className="booking-header">
        <h2 className="glow-text" style={{ margin: 0 }}>Reserve Your Table</h2>
        <button className="btn-outline" onClick={handleLogout}>Logout</button>
      </div>

      <div className="layout-container">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="section">
            <h3>❤️ Couple</h3>
            <div className="tables-grid">
              {['C1','C2','C3','C4'].map(t => (
                <div key={t} className={getTableClass(t, 'couple')} onClick={() => handleTableClick(t)}>{t}</div>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>🪟 Window</h3>
            <div className="tables-grid">
              {['W1','W2','W3','W4'].map(t => (
                <div key={t} className={getTableClass(t, 'window')} onClick={() => handleTableClick(t)}>{t}</div>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>👨‍👩‍👧 Family</h3>
            <div className="tables-grid">
              {['F1','F2','F3','F4'].map(t => (
                <div key={t} className={getTableClass(t, 'family')} onClick={() => handleTableClick(t)}>{t}</div>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>⭐ VIP</h3>
            <div className="tables-grid">
              {['V1','V2','V3','V4'].map(t => (
                <div key={t} className={getTableClass(t, 'vip')} onClick={() => handleTableClick(t)}>{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="glass-panel animate-fade-in">
            <h2 className="glow-text">Book Table</h2>
            
            <input id="name" className="input-field" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <input id="mobile" className="input-field" placeholder="Mobile Number" value={formData.mobile} onChange={handleInputChange} />
            <input id="guests" className="input-field" placeholder="Guests" type="number" value={formData.guests} onChange={handleInputChange} />
            
            <input id="date" className="input-field" type="date" min={today} value={formData.date} onChange={handleInputChange} />
            
            <select id="time" className="input-field" value={formData.time} onChange={handleInputChange}>
              <option value="">Select Time</option>
              {times.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>

            <button className="btn-primary" onClick={handleReserve} style={{ marginTop: '20px' }}>
              Reserve
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="glass-panel animate-zoom-in" style={{ textAlign: 'center' }}>
            <h2 className="glow-text">✅ Booking Confirmed</h2>
            <p style={{ margin: '20px 0' }}>Table {selectedTable} booked successfully!</p>
            <button className="btn-primary" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
