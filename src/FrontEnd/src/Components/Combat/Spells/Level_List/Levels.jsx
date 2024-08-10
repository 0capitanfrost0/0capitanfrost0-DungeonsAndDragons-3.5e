import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Levels.css';
import { BASE_API_URL } from "../../../constants";
import preparedIcon from '/Combat/Spells/prepared-icon.png'; // Importa la imagen
import preparedIconCrossed from '/Combat/Spells/prepared-icon-crossed.png'; // Importa la imagen

export default function SpellLevels() {
  const { className } = useParams();
  const [spells, setSpells] = useState([]);
  const [groupedSpells, setGroupedSpells] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openTabs, setOpenTabs] = useState({});
  const [preparedSpells, setPreparedSpells] = useState({});
  const [preparedTabs, setPreparedTabs] = useState({});

  const classMapping = {
    clerigo: "Clr",
    druida: "Drd",
    paladin: "Pal",
    bardo: "Brd",
    hechicero: "Hch",
    mago: "Mag",
    explorador: "Exp"
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/combatApp/spells/`);
        if (!response.ok) {
          throw new Error('Error fetching spells');
        }
        const data = await response.json();

        const classKey = classMapping[className];
        const filtered = data.filter(spell => spell.clase_nivel && spell.clase_nivel.hasOwnProperty(classKey));

        const grouped = filtered.reduce((acc, spell) => {
          const level = spell.clase_nivel[classKey];
          if (!acc[level]) {
            acc[level] = [];
          }
          acc[level].push(spell);
          return acc;
        }, {});

        setSpells(filtered);
        setGroupedSpells(grouped);
        setLoading(false);

        // Initialize preparedTabs to open all levels
        const initialTabs = Object.keys(grouped).reduce((tabs, level) => {
          tabs[level] = true; // Set all levels to open by default
          return tabs;
        }, {});
        setPreparedTabs(initialTabs);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSpells();
  }, [className]);

  const toggleTab = (level) => {
    setOpenTabs((prevTabs) => ({
      ...prevTabs,
      [level]: !prevTabs[level]
    }));
  };

  const togglePreparedTab = (level) => {
    setPreparedTabs((prevTabs) => ({
      ...prevTabs,
      [level]: !prevTabs[level]
    }));
  };

  const handlePrepareSpell = (spell) => {
    setPreparedSpells((prevPrepared) => {
      const level = spell.clase_nivel[classMapping[className]];
      const newPrepared = { ...prevPrepared };
      if (!newPrepared[level]) {
        newPrepared[level] = [];
      }
      const existingSpellIndex = newPrepared[level].findIndex(prepared => prepared.spell.id === spell.id);
      if (existingSpellIndex !== -1) {
        newPrepared[level][existingSpellIndex].count += 1;
      } else {
        newPrepared[level].push({ spell, count: 1 });
      }
      return newPrepared;
    });
  };

  const handleRemovePreparedSpell = (spell) => {
    setPreparedSpells((prevPrepared) => {
      const level = spell.clase_nivel[classMapping[className]];
      const newPrepared = { ...prevPrepared };
      if (newPrepared[level]) {
        const existingSpellIndex = newPrepared[level].findIndex(prepared => prepared.spell.id === spell.id);
        if (existingSpellIndex !== -1) {
          if (newPrepared[level][existingSpellIndex].count > 1) {
            newPrepared[level][existingSpellIndex].count -= 1;
          } else {
            newPrepared[level].splice(existingSpellIndex, 1);
            if (newPrepared[level].length === 0) {
              delete newPrepared[level];
            }
          }
        }
      }
      return newPrepared;
    });
  };

  if (loading) {
    return <div className='SpellLevels-Container'>Loading...</div>;
  }

  if (error) {
    return <div className='SpellLevels-Container'>Error: {error}</div>;
  }

  return (
    <div className='SpellLevels-Container'>
      <h1>Hechizos de {capitalizeFirstLetter(className)}</h1>
      <div className='SpellLevels-PreparedSpell'> 
        <div className="SpellLevels-List">
          <div className='spell-h3'>
            <h3>Lista de Conjuros</h3>
          </div>
          {Object.keys(groupedSpells).map(level => (
            <div key={level} className="SpellLevel">
              <div 
                className="SpellLevel-Header"
                onClick={() => toggleTab(level)}
              >
                Nivel {level}
              </div>
              {openTabs[level] && (
                <ul className="SpellLevel-Content">
                  {groupedSpells[level].map(spell => (
                    <li key={spell.id} className="SpellItem">
                      <Link 
                        to={`/combat/spells/${className}/${spell.nombre}`} 
                        className="SpellName">
                        {spell.nombre}
                      </Link>
                      <button className="PreparedButton" onClick={() => handlePrepareSpell(spell)}>
                        <img src={preparedIcon} alt="Prepared Icon" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="PreparedSpell-List">
          <div className='spell-h3'>
            <h3>Preparados</h3>
          </div>          
          {Object.keys(preparedSpells).map(level => (
            <div key={level} className="SpellLevel">
              <div 
                className="SpellLevel-Header"
                onClick={() => togglePreparedTab(level)}
              >
                Nivel {level}
              </div>
              {preparedTabs[level] && (
                <ul className="SpellLevel-Content">
                  {preparedSpells[level].map(prepared => (
                    <li key={prepared.spell.id} className="SpellItem">
                      <Link 
                        to={`/combat/spells/${className}/${prepared.spell.nombre}`} 
                        className="SpellName">
                        {prepared.spell.nombre} (x{prepared.count})
                      </Link>
                      <button className="PreparedButton" onClick={() => handleRemovePreparedSpell(prepared.spell)}>
                        <img src={preparedIconCrossed} alt="Prepared Icon" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
