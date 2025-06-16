import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './Footer.css';

const socialLinks = [
  { href: 'https://facebook.com', icon: <FaFacebookF />, label: 'Facebook' },
  { href: 'https://twitter.com', icon: <FaTwitter />, label: 'Twitter' },
  { href: 'https://linkedin.com', icon: <FaLinkedinIn />, label: 'LinkedIn' },
  { href: 'https://github.com', icon: <FaGithub />, label: 'GitHub' },
];

function Footer({ darkMode }) {
  return (
    <footer className={`footer ${darkMode ? 'footer-dark' : 'footer-light'}`}>
      <div className="container d-flex justify-content-center gap-4 py-3">
        {socialLinks.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="social-icon"
          >
            {icon}
          </a>
        ))}
      </div>
      <div className="text-center pb-3" style={{ fontSize: '0.9rem' }}>
        Phina DIOUF &copy; {new Date().getFullYear()} User Manager. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
