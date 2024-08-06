import React from 'react';
import { Link } from 'react-router-dom';
import './Combat.css';

export default function Combat() {
  return (
    <div className='Combat-Container'>
      <h1>Combat Page</h1>
      <div className='Combat-Options'>
        <Link to="" className='Combat-Link'>Combate Físico</Link>
        <Link to="/combat/spells" className='Combat-Link'>Combate Mágico</Link>
      </div>
    </div>
  );
}
