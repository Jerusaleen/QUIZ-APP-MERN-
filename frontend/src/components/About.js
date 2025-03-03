import React, { useState, useEffect } from 'react';
import './About.css';

function About() {
  const images = [
    '/assets/slider1.png',
    '/assets/slider2.webp',
    '/assets/slider3.jpg',
    '/assets/slider7.jpg',
    '/assets/slider6.jpg',
   
  ]; 

  const [currentIndex, setCurrentIndex] = useState(0);

  //Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      <h1 className="about-title">About Our Quiz </h1>
      <p className="about-text">
        Welcome to the <span className="highlight">Jesuo Quiz App</span>! This platform is designed 
        to test your knowledge and help you learn in an <span className="animated-text">interactive and fun</span> way.
        Challenge yourself, compete with friends, and improve your skills!
      </p>

      <div className="slider">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image"
        />
      </div>
    </div>
  );
}

export default About;
