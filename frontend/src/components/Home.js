import React from 'react';
import './Home.css';
import backimg1 from '../assets/backimg1.jpg';

function Home() {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${backimg1})`,
      }}
    >
      <h1 className="home-title">Welcome to the Jesuo Quiz App!</h1>
      <p className="home-subtitle">Test your knowledge and have fun!</p>
    </div>
  );
}

export default Home;


