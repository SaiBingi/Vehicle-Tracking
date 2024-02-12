import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <h1 className='landing-page'>Vehicle Tracking App</h1>
      <Link to="/about" className="landing-page-link">About Us</Link>
      <Link to="/contact" className="landing-page-link">Contact Us</Link>
      <Link to="/map" className="landing-page-link">Vehicle Tracking</Link>
    </div>
  );
};

export default LandingPage;
