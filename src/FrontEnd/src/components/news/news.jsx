// News.js
import React, { Component } from 'react';
import './news.css';
import { BASE_API_URL } from "../../constants";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novedades: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 8,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`${BASE_API_URL}/api/clothes/news/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch novedades');
        }
      })
      .then(data => {
        this.setState({ novedades: data, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleCardClick = (id) => {
    window.location.href = `/clothes-details/${id}`;
  }

  nextPage = () => {
    const { currentPage, itemsPerPage, novedades } = this.state;
    if (currentPage < Math.ceil(novedades.length / itemsPerPage)) {
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
    const { novedades, isLoading, error, currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = novedades.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="news">
        <div className="card-list">
          {currentItems.map(novedad => (
            <div className="card" key={novedad.id} onClick={() => this.handleCardClick(novedad.id)}>
              <img src={novedad.imagen_url} alt={novedad.titulo} className="card-image" />
              <div className="card-content">
                <h3>{novedad.marca.nombre}</h3>
                <div>
                  <p className="news-type">{novedad.tipo_prenda}</p>
                  <p className="news-genre">{novedad.genero}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={this.prevPage} disabled={currentPage === 1}>Anterior</button>
          <span>{` Página ${currentPage} de ${Math.ceil(novedades.length / itemsPerPage)} `}</span>
          <button onClick={this.nextPage} disabled={currentPage === Math.ceil(novedades.length / itemsPerPage)}>Siguiente</button>
        </div>
      </div>
    );
  }
}
