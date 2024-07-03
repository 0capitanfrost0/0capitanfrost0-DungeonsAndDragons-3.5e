import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Levels.css';
import { BASE_API_URL } from "../../../constants";

// Función para eliminar acentos y convertir a minúsculas
const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1); // Capitaliza la primera letra y concatena el resto del string
};

const SpellLevels = () => {
  const { className } = useParams(); // Obtén el nombre de la clase desde los parámetros de la URL
  const [spellLevels, setSpellLevels] = useState({}); // Estado para almacenar los hechizos agrupados por nivel
  const [expandedLevel, setExpandedLevel] = useState(null); // Estado para controlar la sección desplegada

  // Función para obtener los hechizos desde el backend
  const fetchSpells = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/calculator/spells/`);
      if (!response.ok) {
        throw new Error('Failed to fetch spells');
      }
      const data = await response.json();

      // Filtrar hechizos por la clase específica
      const filteredSpells = data.filter(spell => {
        if (spell.clase) {
          // Convertir las clases del hechizo a minúsculas y sin acentos
          const spellClasses = spell.clase.split(',').map(cls => normalizeString(cls.trim()));
          const normalizedClassName = normalizeString(className);
          return spellClasses.includes(normalizedClassName);
        }
        return false;
      });

      // Agrupar los hechizos por nivel
      const groupedSpells = {};
      filteredSpells.forEach(spell => {
        if (groupedSpells.hasOwnProperty(spell.nivel)) {
          groupedSpells[spell.nivel].push(spell);
        } else {
          groupedSpells[spell.nivel] = [spell];
        }
      });

      setSpellLevels(groupedSpells); // Almacenar los datos agrupados en el estado de los hechizos por nivel
    } catch (error) {
      console.error('Error fetching spells:', error);
    }
  };

  useEffect(() => {
    fetchSpells(); // Llamar a la función fetchSpells() cuando el componente se monte
  }, [className]); // Ejecutar useEffect cada vez que className cambie

  const toggleLevel = (level) => {
    if (expandedLevel === level) {
      setExpandedLevel(null); // Si ya está abierto, ciérralo
    } else {
      setExpandedLevel(level); // Si está cerrado, ábrelo
    }
  };

  return (
    <div className="SpellLevels-container">
      <h1>Conjuros de {capitalize(className)}</h1>
      {Object.keys(spellLevels).map((level) => (
        <div key={level} className="level-section">
          <button className="level-header" onClick={() => toggleLevel(level)}>
            Nivel {level}
          </button>
          {expandedLevel === level && (
            <div className="spell-list">
              <ul>
                {/* Mostrar los nombres de los hechizos como enlaces a la vista de detalle */}
                {spellLevels[level].map((spell) => (
                  <li key={spell.id}>
                    <Link to={`/calculator/spells/${className}/${spell.nombre}`}>{spell.nombre}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SpellLevels;
