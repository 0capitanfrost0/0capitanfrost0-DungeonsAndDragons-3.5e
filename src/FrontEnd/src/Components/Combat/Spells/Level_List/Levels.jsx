import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Levels.css';
import { BASE_API_URL } from "../../../constants";
import preparedIconOn from '/Combat/Spells/prepared-icon-on.png'; 
import quickPreparedIconOn from '/Combat/Spells/quick-prepared-on.png'; 
import quickPreparedIconOff from '/Combat/Spells/quick-prepared-off.png'; 
import FavouritePopup from './Favourite_Popup/Favourite_Popup'; 

export default function SpellLevels() {
  const { className } = useParams();
  const [spells, setSpells] = useState([]);
  const [groupedSpells, setGroupedSpells] = useState({});
  const [domainGroupedSpells, setDomainGroupedSpells] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openTabs, setOpenTabs] = useState({});
  const [openDomains, setOpenDomains] = useState({});
  const [popup, setPopup] = useState({ visible: false, spell: null });
  const [showConjuroList, setShowConjuroList] = useState(true);
  const [showDominioList, setShowDominioList] = useState(true);
  const [preparedSpells, setPreparedSpells] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    conjuros: true, // Cambiado a "conjuros"
    dominios: true, // Cambiado a "dominios"
    preparedSpells: true // Sin cambios, ya estaba correcto
  });
  
  const [expandedLevels, setExpandedLevels] = useState({});
  const [expandedConjuroLevels, setExpandedConjuroLevels] = useState({});
  const [expandedPreparedLevels, setExpandedPreparedLevels] = useState({});

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
  
  const toggleConjuroLevel = (level) => {
    setExpandedConjuroLevels((prevLevels) => {
      const newLevels = { ...prevLevels };
      // Cerrar todos los niveles excepto el seleccionado
      Object.keys(newLevels).forEach(lvl => {
        if (lvl !== level) {
          newLevels[lvl] = false;
        }
      });
      // Alternar el estado del nivel seleccionado
      newLevels[level] = !newLevels[level];
      return newLevels;
    });
  };
  
  const togglePreparedLevel = (level) => {
    setExpandedPreparedLevels((prevLevels) => {
      const newLevels = { ...prevLevels };
      // Cerrar todos los niveles excepto el seleccionado
      Object.keys(newLevels).forEach(lvl => {
        if (lvl !== level) {
          newLevels[lvl] = false;
        }
      });
      // Alternar el estado del nivel seleccionado
      newLevels[level] = !newLevels[level];
      return newLevels;
    });
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
              acc[domain].push({ ...spell, domainLevel: level });
            });

            return acc;
          }, {});

          setDomainGroupedSpells(domainGrouped);
        }

        setLoading(false);

        const initialTabs = Object.keys(grouped).reduce((tabs, level) => {
          tabs[level] = false; 
          return tabs;
        }, {});
        setOpenTabs(initialTabs);

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

  const toggleDomain = (domain) => {
    setOpenDomains((prevDomains) => ({
      ...prevDomains,
      [domain]: !prevDomains[domain]
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section]
    }));
  };

  const toggleLevel = (level) => {
    setExpandedLevels((prevLevels) => ({
      ...prevLevels,
      [level]: !prevLevels[level]
    }));
  };

  const openPopup = (spell) => {
    setPopup({ visible: true, spell });
  };
  
  const closePopup = () => {
    setPopup({ visible: false, spell: null });
  };

  // Cierra el popup si el usuario hace clic fuera de él
  const handleClickOutside = (event) => {
    if (popup.visible && !event.target.closest('.popup-content')) {
      closePopup();
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popup.visible]);

  const handleQuickPrepare = (spell) => {
    setPreparedSpells((prevPreparedSpells) => {
      const level = spell.clase_nivel[classMapping[className]];
      const updated = { ...prevPreparedSpells };
      if (!updated[level]) {
        updated[level] = {};
      }
      if (updated[level][spell.id]) {
        updated[level][spell.id] += 1;
      } else {
        updated[level][spell.id] = 1;
      }
      return updated;
    });
  };

  const handleRemovePrepare = (spell) => {
    setPreparedSpells((prevPreparedSpells) => {
      const level = spell.clase_nivel[classMapping[className]];
      const updated = { ...prevPreparedSpells };
      if (updated[level] && updated[level][spell.id]) {
        if (updated[level][spell.id] > 1) {
          updated[level][spell.id] -= 1;
        } else {
          delete updated[level][spell.id];
        }
        if (Object.keys(updated[level]).length === 0) {
          delete updated[level];
        }
      }
      return updated;
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
      
      <div className='SpellLevels-Container-Title'>
        <h1>Hechizos de {capitalizeFirstLetter(className)}</h1>
      </div>

      <div className='SpellLevels-PreparedSpell'> 
        <div className='SpellLevels-List'>
          <div className='spell-h3' onClick={() => toggleSection('conjuros')}>
            <h3>Lista de Conjuros</h3>
          </div>
          {expandedSections['conjuros'] && showConjuroList && Object.keys(groupedSpells).map(level => (
            <div key={level} className="SpellLevel">
              <div className="SpellLevel-Header" onClick={() => toggleConjuroLevel(level)}>Nivel {level}</div>
              {expandedConjuroLevels[level] && (
                <ul className="SpellLevel-Content">
                  {groupedSpells[level].map(spell => (
                    <li key={spell.id} className="SpellItem">
                      <div className="tooltip">
                        <Link 
                          to={`/combat/spells/${className}/${spell.nombre}`} 
                          className="SpellName"
                        >
                          {spell.nombre} <small className="small-text">({spell.componentes})</small>
                        </Link>
                        <span className="tooltiptext">{spell.descripcion_corta}</span>
                      </div>
                      <div className="spells-buttons">
                        <button 
                          className="PreparedButton"
                          onClick={() => openPopup(spell)}
                        >
                          <div className="icon-tooltip">
                            <img src={preparedIconOn} alt="Prepared Icon" />
                            <span className="icon-tooltiptext">Agregar a una lista</span>
                          </div>
                        </button>
                        <button 
                          className="QuickPreparedButton"
                          onClick={() => handleQuickPrepare(spell)}
                        >
                          <div className="icon-tooltip">
                            <img src={quickPreparedIconOn} alt="Quick Prepared Icon" />
                            <span className="icon-tooltiptext">Preparación Rápida</span>
                          </div>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className='SpellLevels-PreparedSpell'> 
          <div className='SpellLevels-List'>
            <div className='spell-h3' onClick={() => toggleSection('preparedSpells')}>
              <h3>Preparación Rápida</h3>
            </div>
            {expandedSections['preparedSpells'] ? (
              Object.keys(preparedSpells).length > 0 ? (
                Object.keys(preparedSpells).map(level => (
                  <div key={level} className="SpellLevel">
                    <div className="SpellLevel-Header" onClick={() => togglePreparedLevel(level)}>
                      Nivel {level}
                    </div>
                    {expandedPreparedLevels[level] && (
                      <ul className="SpellLevel-Content">
                        {Object.keys(preparedSpells[level] || {}).map(spellId => {
                          const spell = spells.find(s => s.id === parseInt(spellId));
                          return (
                            <li key={spellId} className="SpellItem">
                              <div className="tooltip">
                                <Link to={`/combat/spells/${className}/${spell.nombre}`} className="SpellName">
                                  {spell.nombre} <small className="small-text">({spell.componentes})</small>
                                </Link>
                                <span className="tooltiptext">{spell.descripcion_corta}</span>
                              </div>
                              <div className="spells-buttons">
                                <span className="prepared-count">x{preparedSpells[level][spellId]}</span>
                                <button className="PreparedButton" onClick={() => openPopup(spell)}>
                                  <div className="icon-tooltip">
                                    <img src={preparedIconOn} alt="Prepared Icon" />
                                    <span className="icon-tooltiptext">Agregar a una lista</span>
                                  </div>
                                </button>
                                <button className="QuickPreparedButton" onClick={() => handleRemovePrepare(spell)}>
                                  <div className="icon-tooltip">
                                    <img src={quickPreparedIconOff} alt="Quick Prepared Icon" />
                                    <span className="icon-tooltiptext">Preparación Rápida</span>
                                  </div>
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-prepared-spells-message">
                  No tienes hechizos preparados aún
                </div>
              )
            ) : null}
          </div>
        </div>

        {className === "clerigo" && Object.keys(domainGroupedSpells).length > 0 && (
          <div className="SpellLevels-List">
            <div className='spell-h3' onClick={() => toggleSection('dominios')}>
              <h3>Hechizos de Dominio</h3>
            </div>
            {expandedSections['dominios'] && showDominioList && Object.keys(domainGroupedSpells).map(domain => (
              <div key={domain} className="SpellLevel">
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
                            <strong>{spell.domainLevel}.</strong>{spell.nombre} <small className="small-text">({spell.componentes})</small>
                          </Link>
                          <span className="tooltiptext">{spell.descripcion_corta}</span>
                        </div>
                        <div className="spells-buttons">
                          <button 
                            className="PreparedButton"
                            onClick={() => openPopup(spell)}
                          >
                            <div className="icon-tooltip">
                              <img src={preparedIconOn} alt="Prepared Icon" />
                              <span className="icon-tooltiptext">Agregar a una lista</span>
                            </div>
                          </button>
                          <button 
                            className="QuickPreparedButton"
                            onClick={() => handleQuickPrepare(spell)}
                          >
                            <div className="icon-tooltip">
                              <img src={quickPreparedIconOn} alt="Quick Prepared Icon" />
                              <span className="icon-tooltiptext">Preparación Rápida</span>
                            </div>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Popup Component */}
      {popup.visible && (
        <FavouritePopup 
          spell={popup.spell} 
          onClose={closePopup}
          className={className}
        />
      )}
    </div>
  );
}
