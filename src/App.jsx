import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import axios from 'axios';
import Footer from './components/Footer';
import SingleProduct from './pages/SingleProduct';
import CategoryProduct from './pages/CategoryProduct';
import { useCart } from './context/CartContext';
import ProtectedRouts from './components/ProtectedRouts';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const [location, setLocation] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { cartItem, setCartItem } = useCart();
  const { user } = useAuth();

  const getLocation = async () => {
    try {
      // Check if we have cached location data
      const cachedLocation = localStorage.getItem('userLocation');
      if (cachedLocation) {
        setLocation(JSON.parse(cachedLocation));
      }

      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      
      const response = await axios.get(url);
      const exactLocation = response.data.address;
      
      // Cache the location data
      localStorage.setItem('userLocation', JSON.stringify(exactLocation));
      setLocation(exactLocation);
      setOpenDropdown(false);
    } catch (error) {
      console.log('Location error:', error);
      // Use cached location if available when offline
      const cachedLocation = localStorage.getItem('userLocation');
      if (cachedLocation) {
        setLocation(JSON.parse(cachedLocation));
      }
    }
  };

  // Only get location when user interacts with location feature
  useEffect(() => {
    // Check for cached location on mount
    const cachedLocation = localStorage.getItem('userLocation');
    if (cachedLocation) {
      setLocation(JSON.parse(cachedLocation));
    }
  }, []);

  useEffect(() => {
    // Only load from 'cart' key
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) setCartItem(parsed);
        else setCartItem([]);
      } catch {
        setCartItem([]);
      }
    } else {
      setCartItem([]);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/category/:category' element={<CategoryProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<ProtectedRouts><Cart location={location} getLocation={getLocation} /></ProtectedRouts>} />
        <Route path='/orders' element={<ProtectedRouts><Orders /></ProtectedRouts>} />
        <Route path='/profile' element={<ProtectedRouts><Profile /></ProtectedRouts>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin-dashboard' element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to='/' replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;