import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Levels.css';
import { BASE_API_URL } from "../../../constants";

const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SpellLevels = () => {
  const { className } = useParams();
  const [spellLevels, setSpellLevels] = useState({});
  const [preparedSpells, setPreparedSpells] = useState({});
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [expandedPreparedSpell, setExpandedPreparedSpell] = useState(null);

  const fetchSpells = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/combatApp/spells/`);
      if (!response.ok) {
        throw new Error('Failed to fetch spells');
      }
      const data = await response.json();
      const filteredSpells = data.filter(spell => {
        if (spell.clase) {
          const spellClasses = spell.clase.split(',').map(cls => normalizeString(cls.trim()));
          const normalizedClassName = normalizeString(className);
          return spellClasses.includes(normalizedClassName);
        }
        return false;
      });
      const groupedSpells = {};
      filteredSpells.forEach(spell => {
        if (groupedSpells.hasOwnProperty(spell.nivel)) {
          groupedSpells[spell.nivel].push(spell);
        } else {
          groupedSpells[spell.nivel] = [spell];
        }
      });
      setSpellLevels(groupedSpells);
    } catch (error) {
      console.error('Error fetching spells:', error);
    }
  };

  useEffect(() => {
    fetchSpells();
  }, [className]);

  const prepareSpell = (spell) => {
    const instanceId = Date.now(); // Genera un ID único para la instancia del hechizo
    const newSpell = { ...spell, instanceId };

    setPreparedSpells(prev => {
      const updatedPreparedSpells = { ...prev };

      if (!updatedPreparedSpells[spell.nivel]) {
        updatedPreparedSpells[spell.nivel] = [];
      }

      // Verifica si la instancia del hechizo ya está en la lista de preparados
      if (!updatedPreparedSpells[spell.nivel].some(existingSpell => existingSpell.id === spell.id && existingSpell.instanceId === instanceId)) {
        updatedPreparedSpells[spell.nivel].push(newSpell);
      }

      return updatedPreparedSpells;
    });
  };

  const unprepareSpell = (instanceId, level) => {
    setPreparedSpells(prev => {
      const updatedPreparedSpells = { ...prev };

      if (updatedPreparedSpells[level]) {
        const index = updatedPreparedSpells[level].findIndex(spell => spell.instanceId === instanceId);
        if (index !== -1) {
          updatedPreparedSpells[level].splice(index, 1);
          if (updatedPreparedSpells[level].length === 0) {
            delete updatedPreparedSpells[level];
          }
        }
      }

      return updatedPreparedSpells;
    });
  };

  const toggleLevel = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const togglePreparedSpell = (instanceId) => {
    setExpandedPreparedSpell(expandedPreparedSpell === instanceId ? null : instanceId);
  };

  return (
    <div className="SpellLevels-container">
      <h1>Conjuros de {capitalize(className)}</h1>
      <div className="spells-wrapper">
        <div className="spells-list">
          {Object.keys(spellLevels).map((level) => (
            <div key={level} className="level-section">
              <button className="level-header" onClick={() => toggleLevel(level)}>
                Nivel {level}
              </button>
              {expandedLevel === level && (
                <div className="spell-list">
                  <ul>
                    {spellLevels[level].map((spell) => (
                      <li key={spell.id}>
                        <Link to={`/combat/spells/${className}/${spell.nombre}`}>{spell.nombre}</Link>
                        <button onClick={() => prepareSpell(spell)}>Preparar</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="prepared-spells">
          <h2>Hechizos Preparados</h2>
          {Object.keys(preparedSpells).map((level) => (
            <div key={level} className="prepared-level-section">
              <h3>Nivel {level}</h3>
              <ul>
                {Array.isArray(preparedSpells[level]) && preparedSpells[level].map((spell) => (
                  <li key={spell.instanceId}>
                    {spell.nombre}
                    <button onClick={() => togglePreparedSpell(spell.instanceId)}>Descripción</button>
                    {expandedPreparedSpell === spell.instanceId && (
                      <div className="spell-description">
                        {spell.descripcion_corta}
                      </div>
                    )}
                    <button onClick={() => unprepareSpell(spell.instanceId, level)}>Desaprender</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpellLevels;
