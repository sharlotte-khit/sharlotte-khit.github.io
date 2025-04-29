import React from 'react';
import './About.css';
import aboutImg from '../../images/about-img.jpg';

const About = () => {
  return (
    <section className="about-page">
      <div className="container">
        <div className="about-content">
          <div className="about-text-content">
            <h1 className="about-title fw-600 fs-36 mb-2">About BookVault</h1>

            <p className="about-text fw-400 fs-18 mb-2">
              Welcome to <i><strong>BookVault</strong></i>, your gateway to a world of endless stories.
            </p>

            <p className="about-text fw-400 fs-18 mb-4">
              BookVault was created to make book discovery simple, fast, and enjoyable.  
              Whether you're looking for your next favorite novel, exploring by genre,  
              or learning more about your favorite authors — BookVault connects you to the books you love.
            </p>

            <h2 className="about-subtitle fw-500 fs-24 mb-1">Features:</h2>
            <ul className="about-list">
              <li>Search for books by title, author, or genre</li>
              <li>Explore detailed book information and cover images</li>
              <li>View author biographies and their body of work</li>
              <li>Sort results by relevance, publication year, ratings, or title</li>
              <li>Mobile-friendly and responsive design</li>
            </ul>
          </div>
          
          <div className="about-image-container">
            <img src={aboutImg} alt="BookVault library" className="about-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
