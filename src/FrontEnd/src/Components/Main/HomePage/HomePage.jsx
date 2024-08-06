import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className='Main-container'>
      <h1>Welcome to D&D Application</h1>
      <p>This is the main page of the application.</p>
      <Link to="/calculator/spells">Test Spells Component</Link>
    </div>
  );
}
