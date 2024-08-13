import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favourite_List.css';
import { BASE_API_URL } from '../../../constants';

export default function FavouriteList() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [favouriteLists, setFavouriteLists] = useState([]);
  const [expandedLists, setExpandedLists] = useState({});
  const [expandedLevels, setExpandedLevels] = useState({});
  const [expandedClasses, setExpandedClasses] = useState({});

  const classMapping = {
    clerigo: "Clr",
    druida: "Drd",
    paladin: "Pal",
    bardo: "Brd",
    hechicero: "Hch",
    mago: "Mag",
    explorador: "Exp"
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('access');

      try {
        const response = await fetch(`${BASE_API_URL}/api/authApp/users/${username}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data = await response.json();
        setUserId(data.id);
        setUserName(data.username);

        fetchFavouriteLists(data.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    const fetchFavouriteLists = async (userId) => {
      const token = localStorage.getItem('access');

      try {
        const response = await fetch(`${BASE_API_URL}/api/combatApp/listas-favoritos/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching favourite lists');
        }

        const data = await response.json();
        const userLists = data.filter(list => list.usuario === userId);

        const listsWithSpells = await Promise.all(
          userLists.map(async (list) => {
            const spellsWithLevels = await fetchSpells(list.hechizos_ids, list.clase);

            // Agrupación de hechizos por nivel y por nombre para eliminar duplicados
            const groupedByLevel = spellsWithLevels.reduce((acc, [level, spell]) => {
              if (!acc[level]) {
                acc[level] = {};
              }
              if (!acc[level][spell.nombre]) {
                acc[level][spell.nombre] = { ...spell, count: 0, initialCount: 0 };
              }
              acc[level][spell.nombre].count += 1;
              acc[level][spell.nombre].initialCount = acc[level][spell.nombre].count;
              return acc;
            }, {});

            return { ...list, groupedByLevel };
          })
        );

        setFavouriteLists(listsWithSpells);
      } catch (error) {
        console.error('Error fetching favourite lists:', error);
      }
    };

    const fetchSpells = async (spellIds, className) => {
      const classAbbreviation = classMapping[className];

      const spells = await Promise.all(
        spellIds.map(async (id) => {
          try {
            const response = await fetch(`${BASE_API_URL}/api/combatApp/spells/id/${id}/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
              }
            });

            if (!response.ok) {
              throw new Error(`Error fetching spell with id ${id}`);
            }

            const spellData = await response.json();
            const classLevel = spellData.clase_nivel[classAbbreviation] ?? 'Personalizado';

            return [classLevel, spellData];
          } catch (error) {
            console.error(`Error fetching spell with id ${id}:`, error);
            return ['Personalizado', { nombre: `Hechizo ${id} no encontrado`, descripcion_corta: 'Descripción no disponible' }];
          }
        })
      );

      return spells;
    };

    fetchUserId();
  }, []);

  const toggleList = (listId) => {
    setExpandedLists((prevExpandedLists) => ({
      ...prevExpandedLists,
      [listId]: !prevExpandedLists[listId]
    }));
  };

  const toggleLevel = (listId, level) => {
    setExpandedLevels((prevExpandedLevels) => ({
      ...prevExpandedLevels,
      [`${listId}-${level}`]: !prevExpandedLevels[`${listId}-${level}`]
    }));
  };

  const toggleClass = (classKey) => {
    setExpandedClasses((prevExpandedClasses) => ({
      ...prevExpandedClasses,
      [classKey]: !prevExpandedClasses[classKey]
    }));
  };

  const handleConsumeSpell = (listId, spellName) => {
    setFavouriteLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              groupedByLevel: Object.keys(list.groupedByLevel).reduce((acc, level) => {
                acc[level] = Object.keys(list.groupedByLevel[level]).reduce((levelAcc, name) => {
                  const spell = list.groupedByLevel[level][name];
                  levelAcc[name] = {
                    ...spell,
                    count: name === spellName ? Math.max(0, spell.count - 1) : spell.count
                  };
                  return levelAcc;
                }, {});
                return acc;
              }, {})
            }
          : list
      )
    );
  };

  const handleResetSpell = (listId, spellName) => {
    setFavouriteLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              groupedByLevel: Object.keys(list.groupedByLevel).reduce((acc, level) => {
                acc[level] = Object.keys(list.groupedByLevel[level]).reduce((levelAcc, name) => {
                  const spell = list.groupedByLevel[level][name];
                  levelAcc[name] = {
                    ...spell,
                    count: name === spellName ? spell.initialCount : spell.count
                  };
                  return levelAcc;
                }, {});
                return acc;
              }, {})
            }
          : list
      )
    );
  };

  return (
    <div className='Favourite_List-Container'>
      <h2>Mis Listas de Hechizos</h2>
      {Object.keys(classMapping).map((classKey) => {
        const classLists = favouriteLists.filter(list => list.clase === classKey);

        if (classLists.length > 0) {
          return (
            <div key={classKey} className="Favourite_List-Section">
              <h3 onClick={() => toggleClass(classKey)} className="class-title">
                {classKey.charAt(0).toUpperCase() + classKey.slice(1)}
              </h3>
              {expandedClasses[classKey] && (
                <ul>
                  {classLists.map((list) => (
                    <li key={list.id}>
                      {list.descripcion && (
                        <div className="tooltip">
                          <h4 onClick={() => toggleList(list.id)} className="list-title">
                            {list.nombre}
                          </h4>
                          <span className="tooltiptext">{list.descripcion}</span>
                        </div>
                      )}
                      {!list.descripcion && (
                        <h4 onClick={() => toggleList(list.id)} className="list-title">
                          {list.nombre}
                        </h4>
                      )}
                      {expandedLists[list.id] && (
                        <div>
                          {Object.keys(list.groupedByLevel).length > 0 ? (
                            Object.entries(list.groupedByLevel).map(([level, spells]) => (
                              <div key={level}>
                                <h5 onClick={() => toggleLevel(list.id, level)} className="level-title">
                                  Nivel {level}
                                </h5>
                                {expandedLevels[`${list.id}-${level}`] && (
                                  <ul>
                                    {Object.entries(spells).map(([spellName, spellData]) => (
                                      <li key={spellName} className="spell-item">
                                        <div className="tooltip">
                                          <Link 
                                            to={`/combat/spells/${classMapping[list.clase]}/${spellData.nombre}`} 
                                            className="SpellName"
                                          >
                                            {spellData.nombre}
                                          </Link>
                                          <span className="tooltiptext">{spellData.descripcion_corta}</span>
                                        </div>
                                        <h5>x{spellData.count}</h5>
                                        <button 
                                          onClick={() => handleConsumeSpell(list.id, spellName)}
                                          disabled={spellData.count <= 0}
                                        >
                                          Usar
                                        </button>
                                        <button 
                                          onClick={() => handleResetSpell(list.id, spellName)}
                                        >
                                          Preparar
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))
                          ) : (
                            <p>No hay hechizos para mostrar.</p>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
