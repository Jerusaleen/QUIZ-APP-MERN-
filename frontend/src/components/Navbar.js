import React from 'react';
import './Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('You have been logged out!');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Jesuo Quiz App</h1>
      <ul className="navbar-links">
      
        <li><a href="/about">About</a></li>
        {!isLoggedIn && (
          <>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Login</a></li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li><a href="/quiz">Quiz</a></li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;





