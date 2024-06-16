import React, { Component } from 'react';
import './cloth_type_filter.css';
import { BASE_API_URL } from "../../../constants";

export default class ClothTypeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prendas: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 8,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    // Extraer el tipo de prenda de la URL
    const tipoPrenda = this.extractTipoPrenda(window.location.href);

    // Realizar la solicitud fetch usando el tipo de prenda extraído
    fetch(`${BASE_API_URL}/api/clothes/${tipoPrenda}/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch clothes');
        }
      })
      .then(data => {
        this.setState({ prendas: data, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  extractTipoPrenda(url) {
    const startIndex = url.indexOf('/clothes/') + '/clothes/'.length;
    const endIndex = url.indexOf('/', startIndex) !== -1 ? url.indexOf('/', startIndex) : url.length;
    return url.substring(startIndex, endIndex);
  }
  handleCardClick = (id) => {
    window.location.href = `/clothes-details/${id}`;
  }
  render() {
    const { prendas, isLoading, error, currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prendas.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
      if (currentPage < Math.ceil(prendas.length / itemsPerPage)) {
        this.setState({ currentPage: currentPage + 1 });
      }
    };

    const prevPage = () => {
      if (currentPage > 1) {
        this.setState({ currentPage: currentPage - 1 });
      }
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="MainCardList">
        <div className="card-list">
          {currentItems.map(prenda => (
            <div className="card" key={prenda.id} onClick={() => this.handleCardClick(prenda.id)}>
              <img src={prenda.imagen_url} alt={prenda.nombre} className="card-image" />
              <div className="card-content">
                <div className="card-details">
                  <div><strong>Tipo Prenda:</strong> {prenda.tipo_prenda}</div>
                  <div><strong>Marca:</strong> {prenda.marca.nombre}</div>
                  <div><strong>Género:</strong> {prenda.genero}</div>
                  <div><strong>Precio:</strong> {prenda.precio_original}€</div>
                  {/* Otros detalles de la prenda */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
          <span>{` Página ${currentPage} de ${Math.ceil(prendas.length / itemsPerPage)} `}</span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(prendas.length / itemsPerPage)}>Siguiente</button>
        </div>
      </div>
    );
  }
}
