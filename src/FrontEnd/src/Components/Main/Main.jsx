import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
export default function Main() {
  return (
    <div className='Main-container'>
      <h1>Welcome to D&D Application</h1>
      <p>This is the main page of the application.</p>
      <Link to="/calculator/spells">Test Spells Component</Link>
    </div>
  );
}
