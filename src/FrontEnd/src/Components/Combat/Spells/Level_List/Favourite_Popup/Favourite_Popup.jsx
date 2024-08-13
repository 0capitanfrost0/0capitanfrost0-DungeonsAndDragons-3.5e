import React, { useState, useEffect } from "react";
import "./Favourite_Popup.css";
import { BASE_API_URL } from "../../../../constants";

export default function FavouritePopup({ spell, onClose, className }) {
  const [selectedList, setSelectedList] = useState('');
  const [creatingList, setCreatingList] = useState(false);
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState(''); // Estado para descripción
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [classLists, setClassLists] = useState([]); // Lista de listas de la clase actual
  const [viewMode, setViewMode] = useState('general'); // Para alternar entre listas generales y de clase

  // Función para obtener el ID del usuario
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

      // Fetch lists once we have the userId
      fetchLists(data.id);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  // Función para obtener las listas del usuario
  const fetchLists = async (userId) => {
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
        throw new Error('Error fetching lists');
      }

      const data = await response.json();
      setLists(data.filter(list => list.usuario === userId));
      setClassLists(data.filter(list => list.clase === className)); // Filtrar listas por clase
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  // Función para manejar la creación de la lista
  const handleCreateList = async () => {
    if (listName.trim() && userId) {
      setLoading(true);

      const newList = {
        nombre: listName,
        descripcion: listDescription, // Incluye la descripción
        usuario: userId,
        clase: className, // Marca la lista con la clase actual
        hechizos_ids: []  // Lista de hechizos inicializada como vacía
      };

      try {
        const response = await fetch(`${BASE_API_URL}/api/combatApp/listas-favoritos/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          },
          body: JSON.stringify(newList)
        });

        if (!response.ok) {
          throw new Error('Error creating list');
        }

        const data = await response.json();
        setLists([...lists, data]); // Añadir la nueva lista a las listas generales
        setClassLists([...classLists, data]); // También añadir a las listas de la clase actual

        setCreatingList(false);
        setListName('');
        setListDescription(''); // Limpiar el campo de descripción
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para agregar el hechizo a la lista seleccionada
  const handleAddToList = async () => {
    if (selectedList) {
      setLoading(true);

      try {
        // Fetch the selected list
        const listResponse = await fetch(`${BASE_API_URL}/api/combatApp/listas-favoritos/${selectedList}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          }
        });

        if (!listResponse.ok) {
          throw new Error('Error fetching list');
        }

        const listData = await listResponse.json();
        
        // Add the spell ID to the list's hechizos_ids
        const updatedList = {
          ...listData,
          hechizos_ids: [...listData.hechizos_ids, spell.id]
        };

        // Update the list with the new spell
        const updateResponse = await fetch(`${BASE_API_URL}/api/combatApp/listas-favoritos/${selectedList}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          },
          body: JSON.stringify(updatedList)
        });

        if (!updateResponse.ok) {
          throw new Error('Error updating list');
        }

        onClose(); // Cierra el popup después de añadir a la lista
      } catch (error) {
        console.error('Error adding spell to list:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>X</button>
        <h2>
          {creatingList
            ? "Crear Nueva Lista"
            : `Agregar a Favoritos: ${spell.nombre}`}
        </h2>
        {creatingList ? (
          <div className="popup-create-list">
            <input
              type="text"
              placeholder="Nombre de la nueva lista"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripción de la lista"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
            />
            <div className="popup-notes">
              <p><strong>Nota:</strong> La lista creada desde esta sección quedará marcada como perteneciente a la clase de la sección actual para su correcta ordenación.</p>
            </div>
            <div className="popup-buttons-container">
              <button
                className="create-list-btn"
                onClick={handleCreateList}
                disabled={loading}
              >
                Crear Lista
              </button>
              <button
                className="cancel-btn"
                onClick={() => setCreatingList(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="popup-select-list">
            <p><strong>Filtrar listas por:</strong></p>
            <div className="popup-view-mode">
              <button
                onClick={() => setViewMode('class')}
                className={viewMode === 'class' ? 'active' : ''}
              >
                Listas de {className}
              </button>
              <button
                onClick={() => setViewMode('general')}
                className={viewMode === 'general' ? 'active' : ''}
              >
                Todas mis listas
              </button>

            </div>
            <select
              onChange={(e) => setSelectedList(e.target.value)}
              value={selectedList}
              className="list-select"
            >
              <option value="">Seleccionar Lista</option>
              {(viewMode === 'general' ? lists : classLists).map(list => (
                <option key={list.id} value={list.id}>
                  {list.nombre} ({list.clase.charAt(0).toUpperCase() + list.clase.slice(1)}) {/* Mostrar nombre y clase */}
                </option>
              ))}
            </select>
            <div className="popup-notes">
              <p><strong>Nota:</strong> Los hechizos serán agrupados por nivel teniendo en cuenta la clase de la lista a la que se añade.</p>
            </div>
            <div className="popup-buttons-container">
              <button
                className="add-to-list-btn"
                onClick={handleAddToList}
                disabled={!selectedList}
              >
                Añadir a la lista
              </button>
              <button
                className="create-new-list-btn"
                onClick={() => setCreatingList(true)}
              >
                Crear Nueva Lista
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
