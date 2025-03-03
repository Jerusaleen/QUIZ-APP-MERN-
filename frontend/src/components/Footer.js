import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Footer.css';

function Footer() {
  // Get the current location (URL)
  const location = useLocation();

  // this coding initiate the footer is not coming in the homepage
  if (location.pathname === '/') {
    return null; 
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Quiz App</h3>
          <p>
            The Jesuo Quiz is a platform designed to test and enhance your knowledge in a fun and interactive way. 
            Join us and challenge yourself!
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/quiz">Start Quiz</Link></li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@jesuoquizapp.com</p>
          <p>Phone: +1 (123) 657-7850</p>
          <p>Location: 123 KK nagar, Adayaar, Chennai</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()}Jesuo Quiz App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
