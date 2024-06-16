import React, { Component } from 'react';
import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>Enlaces útiles</h5>
              <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/about-us">Sobre nosotros</a></li>
                <li><a href="/contact">Contacto</a></li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Contacto</h5>
              <p>Dirección: 43 Calle Esquimo, Sevilla</p>
              <p>Teléfono: +610879535</p>
              <p>Email: clothinfscoremain@outlook.es</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
