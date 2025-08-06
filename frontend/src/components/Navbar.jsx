import React, { useState, useRef, useEffect } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useAuth } from '../context/AuthContext'; // Make sure this is the correct path

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Get auth state
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Toggle hamburger menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close the menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="brand">Minders</span>
        </div>

        <div className="navbar-right">
          {/* Show this block only if NOT authenticated */}
          {!isAuthenticated && (
            <>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                ABOUT
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                FEATURES
              </a>
              <a href="#">REVIEWS</a>
              <a href="#">SUPPORT</a>
              <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                LOGIN
              </a>
            </>
          )}

          {/* Show hamburger menu only if authenticated */}
          {isAuthenticated && (
            <div className="hamburger" onClick={toggleMenu} ref={hamburgerRef}>
              <FaBars />
            </div>
          )}
        </div>
      </nav>

      {/* Slide-out menu — only rendered when logged in */}
      {isAuthenticated && (
        <div className={`slide-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="slide-header">
            <span>Menu</span>
            <IoMdClose onClick={toggleMenu} className="close-icon" />
          </div>

          <a onClick={() => navigate('/account')} style={{ cursor: 'pointer' }}>
            🧑‍💼 My Account
          </a>
          <a onClick={() => navigate('/setting')} style={{ cursor: 'pointer' }}>
            ⚙️ Settings
          </a>
          <a
            onClick={() => {
              logout();
setTimeout(() => {
  navigate('/');
}, 0);

            }}
            style={{ cursor: 'pointer' }}
          >
            🚪 Logout
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
