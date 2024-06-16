import React, { Component } from 'react';
import './sales.css';
import { BASE_API_URL } from "../../constants";

export default class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      filteredSales: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 8,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`${BASE_API_URL}/api/clothes/sales/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch sales');
        }
      })
      .then(data => {
        // Filtrar las prendas con precio_rebajado > 0.00€
        const filteredSales = data.filter(sale => parseFloat(sale.precio_rebajado) > 0.00);
        this.setState({ sales: data, filteredSales: filteredSales, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }  

  handleCardClick = (id) => {
    window.location.href = `/clothes-details/${id}`;
  };

  nextPage = () => {
    const { currentPage, itemsPerPage, filteredSales } = this.state;
    if (currentPage < Math.ceil(filteredSales.length / itemsPerPage)) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  prevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  render() {
    const { filteredSales, isLoading, error, currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="sales">
        <div className="card-list">
          {currentItems.map(sale => (
            <div className="card" key={sale.id} onClick={() => this.handleCardClick(sale.id)}>
              <img src={sale.imagen_url} alt={sale.descripcion} className="card-image" />
              <div className="card-content">
                <h3>{sale.descripcion}</h3>
                <div>
                  <span style={{ color: 'orange' }}>Oferta: {sale.precio_rebajado}€</span>
                  <span style={{ textDecoration: 'line-through', color: 'black', marginLeft: '10px' }}>Antes: {sale.precio_original}€</span>
                </div>
                {/* Otros detalles de la oferta */}
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={this.prevPage} disabled={currentPage === 1}>Anterior</button>
          <span>{` Página ${currentPage} de ${Math.ceil(filteredSales.length / itemsPerPage)} `}</span>
          <button onClick={this.nextPage} disabled={currentPage === Math.ceil(filteredSales.length / itemsPerPage)}>Siguiente</button>
        </div>
      </div>
    );
  }
}
