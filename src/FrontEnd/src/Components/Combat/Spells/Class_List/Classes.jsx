import React from 'react';
import './Classes.css';

const classes = [
  { name: 'Bardo', img: '/Classes_Logo/Bardo.png', link: '/combat/spells/bardo' },
  { name: 'Clerigo', img: '/Classes_Logo/Clerigo.png', link: '/combat/spells/clerigo' },
  { name: 'Druida', img: '/Classes_Logo/Druida.png', link: '/combat/spells/druida' },
  { name: 'Hechicero', img: '/Classes_Logo/Hechicero.png', link: '/combat/spells/hechicero' },
  { name: 'Mago', img: '/Classes_Logo/Mago.png', link: '/combat/spells/mago' },
  { name: 'Paladin', img: '/Classes_Logo/Paladin.png', link: '/combat/spells/paladin' },
  { name: 'Explorador', img: '/Classes_Logo/Explorador.png', link: '/combat/spells/explorador' },
  { name: 'Brujo', img: '/Classes_Logo/Brujo.png', link: '/combat/spells/brujo' },
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
