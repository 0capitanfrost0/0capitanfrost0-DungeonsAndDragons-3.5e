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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [newListClass, setNewListClass] = useState('clerigo'); // Clase por defecto

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
    const list = favouriteLists.find(list => list.id === listId);
    if (list && Object.keys(list.groupedByLevel).length > 0) {
      setExpandedLists((prevExpandedLists) => ({
        ...prevExpandedLists,
        [listId]: !prevExpandedLists[listId]
      }));
    }
  };

  const toggleLevel = (listId, level) => {
    const list = favouriteLists.find(list => list.id === listId);
    if (list && list.groupedByLevel[level] && Object.keys(list.groupedByLevel[level]).length > 0) {
      setExpandedLevels((prevExpandedLevels) => ({
        ...prevExpandedLevels,
        [`${listId}-${level}`]: !prevExpandedLevels[`${listId}-${level}`]
      }));
    }
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

  const handleDeleteList = async (listId) => {
    const token = localStorage.getItem('access');

    try {
      const response = await fetch(`${BASE_API_URL}/api/combatApp/listas-favoritos/${listId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error deleting list with id ${listId}`);
      }

      setFavouriteLists((prevLists) => prevLists.filter(list => list.id !== listId));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleDeleteSpell = async (listId, spellName) => {
    const token = localStorage.getItem('access');
  
    try {
      // Find the list that needs to be updated
      const listToUpdate = favouriteLists.find(list => list.id === listId);
  
      if (listToUpdate) {
        // Create a new list of spell IDs excluding the ones that match the spellName
        const updatedSpellIds = await Promise.all(
          Object.entries(listToUpdate.groupedByLevel).flatMap(([level, spells]) =>
            Object.entries(spells)
              .filter(([name]) => name !== spellName)
              .map(([, spellData]) => spellData.id)
          )
        );
  
        // Make a PUT request to update the list with the new set of spell IDs
        const response = await fetch(`${BASE_API_URL}/api/combatApp/listas-favoritos/${listId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...listToUpdate,
            hechizos_ids: updatedSpellIds, // Update the spell IDs for the list
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error updating list with id ${listId}`);
        }
  
        // Update the state to reflect the changes in the UI
        setFavouriteLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  groupedByLevel: Object.keys(list.groupedByLevel).reduce((acc, level) => {
                    acc[level] = Object.keys(list.groupedByLevel[level]).reduce((levelAcc, name) => {
                      if (name !== spellName) {
                        levelAcc[name] = list.groupedByLevel[level][name];
                      }
                      return levelAcc;
                    }, {});
                    return acc;
                  }, {}),
                }
              : list
          )
        );
      }
    } catch (error) {
      console.error('Error deleting spell:', error);
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();

    if (!newListName || !userId) {
      return;
    }

    const token = localStorage.getItem('access');

    try {
      const response = await fetch(`${BASE_API_URL}/api/combatApp/listas-favoritos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: newListName,
          descripcion: newListDescription,
          clase: newListClass,
          usuario: userId,
          hechizos_ids: [] // Lista vacía
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating new list');
      }

      const newList = await response.json();
      setFavouriteLists((prevLists) => [...prevLists, newList]);
      setNewListName('');
      setNewListDescription('');
      setNewListClass('clerigo');
      setShowCreateForm(false); // Ocultar el formulario después de crear la lista
    } catch (error) {
      console.error('Error creating new list:', error);
    }
  };

  return (
    <div className='Favourite_List-Container'>
      <h2>Mis Listas de Hechizos</h2>

      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Cancelar' : 'Crear Nueva Lista'}
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreateList} className="create-list-form">
          <label>
            Nombre de la lista:
            <input 
              type="text" 
              value={newListName} 
              onChange={(e) => setNewListName(e.target.value)} 
              required 
            />
          </label>
          <label>
            Descripción (opcional):
            <input 
              type="text" 
              value={newListDescription} 
              onChange={(e) => setNewListDescription(e.target.value)} 
            />
          </label>
          <label>
            Clase:
            <select 
              value={newListClass} 
              onChange={(e) => setNewListClass(e.target.value)} 
              required
            >
              {Object.keys(classMapping).map((classKey) => (
                <option key={classKey} value={classKey}>
                  {classKey.charAt(0).toUpperCase() + classKey.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Crear Lista</button>
        </form>
      )}

      {favouriteLists.length === 0 ? (
        <p>Aún no hay listas creadas</p>
      ) : (
        Object.keys(classMapping).map((classKey) => {
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
                        <div className="list-title-container">
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
                          <button className="delete-list-button" onClick={() => handleDeleteList(list.id)}>
                            Eliminar Lista
                          </button>
                        </div>
                        {expandedLists[list.id] && (
                          <div>
                            {Object.keys(list.groupedByLevel).length > 0 ? (
                              Object.entries(list.groupedByLevel).map(([level, spells]) => (
                                <div key={level}>
                                  <h5 onClick={() => toggleLevel(list.id, level)} className="level-title">
                                    Nivel {level}
                                  </h5>
                                  {expandedLevels[`${list.id}-${level}`] && (
                                    <ul className='level-spell-container'>
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
                                          <div className="button-container">
                                            <button className='use-button'
                                              onClick={() => handleConsumeSpell(list.id, spellName)}
                                              disabled={spellData.count <= 0}
                                            >
                                              Usar
                                            </button>
                                            <button 
                                              className='reset-button'
                                              onClick={() => handleResetSpell(list.id, spellName)}
                                            >
                                              Preparar
                                            </button>
                                            <button 
                                              className='delete-spell-button'
                                              onClick={() => handleDeleteSpell(list.id, spellName)}
                                            >
                                              Eliminar
                                            </button>
                                          </div>
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
        })
      )}
    </div>
  );
}
