import React, { useState } from "react";
import "./Favourite_Popup.css";

export default function FavouritePopup({ spell, onClose, onCreateList, onAddToList }) {
  const [selectedList, setSelectedList] = useState('');
  const [creatingList, setCreatingList] = useState(false);
  const [listName, setListName] = useState('');

  const handleCreateList = () => {
    if (listName.trim()) {
      onCreateList(listName);
    }
  };

  const handleAddToList = () => {
    if (selectedList) {
      onAddToList(selectedList);
    }
  };

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
            <div className="popup-buttons-container">
              <button className="create-list-btn" onClick={handleCreateList}>
                Crear Lista
              </button>
              <button className="cancel-btn" onClick={() => setCreatingList(false)}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="popup-select-list">
            <select
              onChange={(e) => setSelectedList(e.target.value)}
              value={selectedList}
              className="list-select"
            >
              <option value="">Seleccionar Lista</option>
              {/* Example options; replace with dynamic list data */}
              <option value="1">Lista 1</option>
              <option value="2">Lista 2</option>
            </select>
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
