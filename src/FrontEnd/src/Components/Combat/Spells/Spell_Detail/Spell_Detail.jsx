import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import './Spell_Details.css';
import { BASE_API_URL } from "../../../constants";

const SpellLevels = () => {
  const { className, name } = useParams();
  const [spell, setSpell] = useState(null);

  useEffect(() => {
    const fetchSpellDetail = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/combatApp/spells/${name}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch spell');
        }
        const data = await response.json();
        setSpell(data);
      } catch (error) {
        console.error('Error fetching spell:', error);
      }
    };  
    fetchSpellDetail();
  }, [name]);

  if (!spell) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="SpellDetail-container">
      <h1>{spell.nombre}</h1>
      <p><strong>Escuela:</strong> {spell.escuela}</p>
      <p><strong>Nivel:</strong> {spell.nivel}</p>
      <p><strong>Clase:</strong> {spell.clase}</p>
      <p><strong>Componentes:</strong> {spell.componentes}</p>
      <p><strong>Tiempo de Lanzamiento:</strong> {spell.tiempo_de_lanzamiento}</p>
      <p><strong>Rango:</strong> {spell.rango}</p>
      <p><strong>Objetivo:</strong> {spell.objetivo}</p>
      <p><strong>Efecto:</strong> {spell.efecto}</p>
      <p><strong>Duración:</strong> {spell.duracion}</p>
      <p><strong>Tirada de Salvación:</strong> {spell.tirada_de_salvacion}</p>
      <p><strong>Resistencia de Hechizos:</strong> {spell.resistencia_de_hechizos}</p>
      <p><strong>Descripción Corta:</strong> {spell.descripcion_corta}</p>
      <p><strong>Descripción Completa:</strong> {spell.descripcion_completa}</p>
    </div>
  );
};

export default SpellLevels;
