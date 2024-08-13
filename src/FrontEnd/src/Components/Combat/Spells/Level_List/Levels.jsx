import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Levels.css';
import { BASE_API_URL } from "../../../constants";
import quickPreparedOn from '/Combat/Spells/quick-prepared-on.png'; 
import preparedIconOn from '/Combat/Spells/prepared-icon-on.png'; 
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
                      <button 
                          className="PreparedButton"
                          onClick={() => openPopup(spell)}
                        >
                          <div className="icon-tooltip">
                            <img src={preparedIconOn} alt="Prepared Icon" />
                            <span className="icon-tooltiptext">Agregar a una lista</span>
                          </div>
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
                        <button 
                          className="PreparedButton"
                          onClick={() => openPopup(spell)}
                        >
                          <div className="icon-tooltip">
                            <img src={preparedIconOn} alt="Prepared Icon" />
                            <span className="icon-tooltiptext">Agregar a una lista</span>
                          </div>
                        </button>
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
