import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import Home from './Home';
import About from './About';
import Welcome from './components/Welcome';
import Product from './components/Product';
import { useNavigate } from 'react-router-dom';
import List from './components/List';
import Register from './Register';
import EditProfile from './components/EditProfile';
import Cards from './components/Cards';
import CardsDetails from './components/CardsDetails';
function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate("/login");
  };

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/cards/:id" element={<CardsDetails />} />
        {user ? (
          <Route path="/product" element={<Product />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        {user ? (
          <Route path="/welcome" element={<Welcome user={user} onLogout={handleLogout} />} />
        ) : (
          <Route path="/login" element={<Login setUser={setUser} />} />
        )}
        {user ? (
          <Route path="/list" element={<List />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        {user ? (
        <Route path="/crud" element={<UserList />} /> ) : (
        <Route path="/*" element={<Home />} />
        )}
      </Routes>
    </div >
  );
}

export default App;
