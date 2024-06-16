// Blog.js
import React, { Component } from 'react';
import './blog.css';
import { BASE_API_URL } from "../../constants";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticias: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`${BASE_API_URL}/api/news/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch noticias');
        }
      })
      .then(data => {
        this.setState({ noticias: data, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleCardClick = (id) => {
    window.location.href = `/blog/${id}`;
  }

  render() {
    const { noticias, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="blog-container">
        <h1>Noticias y Novedades</h1>
        <div className="blog-card-list">
          {noticias.map(noticia => (
            <div className="blog-card" key={noticia.id} onClick={() => this.handleCardClick(noticia.id)}>
              <img src={noticia.imagen_url} alt={noticia.titulo} className="blog-card-image" />
              <div className="blog-card-content">
                <h3 className="blog-card-title">{noticia.titulo}</h3>
                <p className="blog-card-description">{noticia.descripcion_corta}</p>
                <a href={`/blog/${noticia.id}`} className="blog-card-readmore">Leer más</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
