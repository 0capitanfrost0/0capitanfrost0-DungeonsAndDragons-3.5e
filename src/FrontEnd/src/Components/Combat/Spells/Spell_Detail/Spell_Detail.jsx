import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  // Función para filtrar atributos vacíos o que solo contienen "-"
  const filterAttributes = (value) => {
    return value && value !== '-' ? value : null;
  };

  // Función para formatear clase_nivel
  const formatClassLevel = (claseNivel) => {
    if (!claseNivel || typeof claseNivel !== 'object') return '';

    return Object.entries(claseNivel).map(([clase, niveles]) => {
      // Asegurarse de que niveles sea una matriz antes de usar join
      const nivelesText = Array.isArray(niveles) ? niveles.join(', ') : niveles;
      return `${clase}: ${nivelesText}`;
    }).join(', ');
  };

  return (
    <div className="SpellDetail-container">
      <div className='SpellDetail-text'>
        <h1>{spell.nombre}</h1>
        {filterAttributes(spell.escuela) && <p><strong>Escuela:</strong> {spell.escuela}</p>}
        {filterAttributes(spell.clase_nivel) && (
          <p><strong>Clase/Nivel:</strong> {formatClassLevel(spell.clase_nivel)}</p>
        )}
        {filterAttributes(spell.componentes) && <p><strong>Componentes:</strong> {spell.componentes}</p>}
        {filterAttributes(spell.tiempo_de_lanzamiento) && <p><strong>Tiempo de Lanzamiento:</strong> {spell.tiempo_de_lanzamiento}</p>}
        {filterAttributes(spell.rango) && <p><strong>Rango:</strong> {spell.rango}</p>}
        {filterAttributes(spell.objetivo) && <p><strong>Objetivo:</strong> {spell.objetivo}</p>}
        {filterAttributes(spell.efecto) && <p><strong>Efecto:</strong> {spell.efecto}</p>}
        {filterAttributes(spell.duracion) && <p><strong>Duración:</strong> {spell.duracion}</p>}
        {filterAttributes(spell.tirada_de_salvacion) && <p><strong>Tirada de Salvación:</strong> {spell.tirada_de_salvacion}</p>}
        {filterAttributes(spell.resistencia_de_hechizos) && <p><strong>Resistencia de Hechizos:</strong> {spell.resistencia_de_hechizos}</p>}
        {filterAttributes(spell.descripcion_corta) && <p><strong>Descripción Corta:</strong> {spell.descripcion_corta}</p>}
        {filterAttributes(spell.descripcion_completa) && <p><strong>Descripción Completa:</strong> {spell.descripcion_completa}</p>}
      </div>
    </div>
  );
};

export default SpellLevels;
