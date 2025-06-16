import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUsers, FaHome, FaInfoCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ darkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg sticky-top ${scrolled ? 'scrolled' : ''} ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setExpanded(false)}>
          <FaUsers className="me-2" /> User Manager
        </Link>
        <button className="navbar-toggler" type="button" onClick={() => setExpanded(!expanded)} aria-label="Toggle navigation">
          <span className={`navbar-toggler-icon ${expanded ? 'open' : ''}`}></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={() => setExpanded(false)}>
                <FaHome className="me-1" /> Accueil
              </NavLink>
            </li>
            <li className="nav-item">
  <NavLink to="/about" className="nav-link" onClick={() => setExpanded(false)}>
    <FaInfoCircle className="me-1" /> À propos
  </NavLink>
</li>
<li className="nav-item">
  <NavLink to="/users" className="nav-link" onClick={() => setExpanded(false)}>
    Utilisateurs
  </NavLink>
</li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
