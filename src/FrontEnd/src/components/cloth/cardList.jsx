import React, { Component } from 'react';
import './cardList.css';
import { BASE_API_URL } from "../../constants";

export default class CardList extends Component {
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

  handleCardClick = (id) => {
    window.location.href = `/clothes-details/${id}`;
  }

  componentDidMount() {
    this.fetchPrendas(); // Cargar las prendas al montar el componente
  }

  componentDidUpdate(prevProps, prevState) {
    // Si los filtros seleccionados cambian, volver a cargar las prendas
    if (prevProps.filtrosSeleccionados !== this.props.filtrosSeleccionados) {
      this.fetchPrendas();
    }
  }

  fetchPrendas = () => {
    this.setState({ isLoading: true });
    const { filtrosSeleccionados } = this.props;

    let apiUrl = `${BASE_API_URL}/api/clothes/`;

    // Aplicar filtros si hay alguno seleccionado
    if (filtrosSeleccionados && Object.keys(filtrosSeleccionados).length > 0) {
      apiUrl += `?`;
      for (const filtro in filtrosSeleccionados) {
        if (filtrosSeleccionados[filtro].length > 0) {
          apiUrl += `${filtro}=${filtrosSeleccionados[filtro].join(",")}&`;
        }
      }
      apiUrl = apiUrl.slice(0, -1); // Eliminar el último "&"
    }

    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch prendas');
        }
      })
      .then(data => {
        if (Array.isArray(data)) {
          this.setState({ prendas: data, isLoading: false });
        } else {
          throw new Error('Data fetched is not an array');
        }
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const { prendas, isLoading, error, currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prendas.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className='main-card-list'>
        <div className="card-list">
          {currentItems.map(prenda => (
            <div className="card" key={prenda.id} onClick={() => this.handleCardClick(prenda.id)}>
              <img src={prenda.imagen_url} alt={prenda.nombre} className="card-image" />
              <div className="card-content">
                <div className="card-details">
                  <div className="card-title">{prenda.nombre}</div>
                  <div><strong>Tipo Prenda:</strong> {prenda.tipo_prenda}</div>
                  <div><strong>Marca:</strong> {prenda.marca.nombre}</div>
                  <div><strong>Género:</strong> {prenda.genero}</div>
                  <div className="card-price"><strong>Precio:</strong> {prenda.precio_original}€</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="paginationcard">
          <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
          <span>{` Página ${currentPage} de ${Math.ceil(prendas.length / itemsPerPage)} `}</span>
          <button onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(prendas.length / itemsPerPage)}>Siguiente</button>
        </div>
        <br />
      </div>
    );
  }
}
