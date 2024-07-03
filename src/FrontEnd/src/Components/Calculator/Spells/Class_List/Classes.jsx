import React from 'react';
import './Classes.css';

const classes = [
  { name: 'Bardo', img: '/Classes_Logo/Bardo.png', link: '/calculator/spells/bardo' },
  { name: 'Clerigo', img: '/Classes_Logo/Clerigo.png', link: '/calculator/spells/clerigo' },
  { name: 'Druida', img: '/Classes_Logo/Druida.png', link: '/calculator/spells/druida' },
  { name: 'Hechicero', img: '/Classes_Logo/Hechicero.png', link: '/calculator/spells/hechicero' },
  { name: 'Mago', img: '/Classes_Logo/Mago.png', link: '/calculator/spells/mago' },
  { name: 'Paladin', img: '/Classes_Logo/Paladin.png', link: '/calculator/spells/paladin' },
  { name: 'Explorador', img: '/Classes_Logo/Explorador.png', link: '/calculator/spells/explorador' },
  { name: 'Brujo', img: '/Classes_Logo/Brujo.png', link: '/calculator/spells/brujo' },
];

const ClassCard = ({ name, img, link }) => (
  <div className="class-card">
    <a href={link}>
      <img src={img} alt={name} />
    </a>
  </div>
);

const ClassesGrid = () => (
  <div className="ClassesGrid-container">
    {classes.map((dndClass) => (
      <ClassCard key={dndClass.name} {...dndClass} />
    ))}
  </div>
);

export default ClassesGrid;
