import React, { Component } from 'react';
import './brand.css';
import { BASE_API_URL } from "../../constants";

export default class Brand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marcas: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`${BASE_API_URL}/api/brands/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch marcas');
        }
      })
      .then(data => {
        this.setState({ marcas: data, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleCardClick = (nombre) => {
    window.location.href = `/brands/${nombre}`;
  }

  render() {
    const { marcas, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="brand">
        <div className="card-list">
          {marcas.map((marca, index) => (
            <div
              className="card"
              key={index}
              onClick={() => this.handleCardClick(marca.nombre)}
            >
              <img src={marca.imagen_url} alt={marca.nombre} className="card-image" />
              <div className="card-content">
                <h3>{marca.nombre}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
