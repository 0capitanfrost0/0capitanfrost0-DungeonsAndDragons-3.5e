// Article_details.js
import React, { Component } from 'react';
import './article_details.css';
import { BASE_API_URL } from "../../../constants";

export default class Article_details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    const id = this.extractId(window.location.href);

    fetch(`${BASE_API_URL}/api/news/${id}/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch article details');
        }
      })
      .then(data => {
        this.setState({ article: data, isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }

  extractId(url) {
    const startIndex = url.lastIndexOf('/') + 1;
    const endIndex = url.indexOf('/', startIndex) !== -1 ? url.indexOf('/', startIndex) : url.length;
    return url.substring(startIndex, endIndex);
  }

  render() {
    const { article, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!article) {
      return <div>No data found</div>;
    }

    return (
      <div className="article-details-container">
        <div className="article-details-header">
          <h1 className="article-details-title">{article.titulo}</h1>
          <p className="article-details-meta">
            <span className="article-details-author">Escrito por: {article.autor}</span>
            <span className="article-details-date">{new Date(article.fecha).toLocaleDateString()}</span>
            <span className="article-details-time">Tiempo de lectura: {article.tiempo_lectura} min</span>
          </p>
          <img src={article.imagen_url} alt={article.titulo} className="article-details-image" />
        </div>
        <div className="article-details-content" dangerouslySetInnerHTML={{ __html: article.contenido }} />
      </div>
    );
  }
}
