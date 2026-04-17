import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';
import UserBookings from './pages/UserBookings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/my-bookings" element={<UserBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
