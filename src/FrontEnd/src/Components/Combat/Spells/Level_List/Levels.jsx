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
  const [domainGroupedSpells, setDomainGroupedSpells] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openTabs, setOpenTabs] = useState({});
  const [preparedSpells, setPreparedSpells] = useState({});
  const [preparedTabs, setPreparedTabs] = useState({});
  const [openDomains, setOpenDomains] = useState({});

  const classMapping = {
    clerigo: "Clr",
    druida: "Drd",
    paladin: "Pal",
    bardo: "Brd",
    hechicero: "Hch",
    mago: "Mag",
    explorador: "Exp"
  };

  const domainKeys = [
    "Aire", "Animal", "Caos", "Muerte", "Destrucción", "Tierra", "Mal", "Fuego",
    "Bien", "Curación", "Saber", "Ley", "Suerte", "Magia", "Vegetal", 
    "Protección", "Fuerza", "Sol", "Viaje", "Guerra", "Agua", "Superchería"
  ];

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

        if (className === "clerigo") {
          const domainGrouped = domainKeys.reduce((acc, domain) => {
            const domainSpells = data.filter(spell => spell.clase_nivel && spell.clase_nivel[domain]);

            domainSpells.forEach(spell => {
              const level = spell.clase_nivel[domain];
              if (!acc[domain]) {
                acc[domain] = [];
              }
              acc[domain].push({ ...spell, domainLevel: level }); // Añade el nivel de dominio al hechizo
            });

            return acc;
          }, {});

          setDomainGroupedSpells(domainGrouped);
        }

        setLoading(false);

        const initialTabs = Object.keys(grouped).reduce((tabs, level) => {
          tabs[level] = true; 
          return tabs;
        }, {});
        setPreparedTabs(initialTabs);

        const initialDomains = Object.keys(domainGroupedSpells).reduce((domains, domain) => {
          domains[domain] = false; 
          return domains;
        }, {});
        setOpenDomains(initialDomains);

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

  const toggleDomain = (domain) => {
    setOpenDomains((prevDomains) => ({
      ...prevDomains,
      [domain]: !prevDomains[domain]
    }));
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
                      <div className="tooltip">
                        <Link 
                          to={`/combat/spells/${className}/${spell.nombre}`} 
                          className="SpellName"
                        >
                          {spell.nombre}
                        </Link>
                        <span className="tooltiptext">{spell.descripcion_corta}</span>
                      </div>
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

        {className === "clerigo" && Object.keys(domainGroupedSpells).length > 0 && (
          <div className="SpellLevels-List">
            <div className='spell-h3'>
              <h3>Hechizos de Dominio</h3>
            </div>
            {Object.keys(domainGroupedSpells).map(domain => (
              <div key={domain} className="SpellDomain">
                <div 
                  className="SpellDomain-Header"
                  onClick={() => toggleDomain(domain)}
                >
                  {domain}
                </div>
                {openDomains[domain] && (
                  <ul className="SpellLevel-Content">
                    {domainGroupedSpells[domain].map(spell => (
                      <li key={spell.id} className="SpellItem">
                        <div className="tooltip">
                          <Link 
                            to={`/combat/spells/${className}/${spell.nombre}`} 
                            className="SpellName"
                          >
                            <strong>{spell.domainLevel}.</strong> {spell.nombre}
                          </Link>
                          <span className="tooltiptext">{spell.descripcion_corta}</span>
                        </div>
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
        )}

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
                      <div className="tooltip">
                        <Link 
                          to={`/combat/spells/${className}/${prepared.spell.nombre}`} 
                          className="SpellName"
                        >
                          {prepared.spell.nombre} ({prepared.count})
                        </Link>
                        <span className="tooltiptext">{prepared.spell.descripcion_corta}</span>
                      </div>
                      <button className="PreparedButton" onClick={() => handleRemovePreparedSpell(prepared.spell)}>
                        <img src={preparedIconCrossed} alt="Remove Prepared Icon" />
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
