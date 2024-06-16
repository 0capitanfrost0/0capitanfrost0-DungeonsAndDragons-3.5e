import React, { Component } from 'react';
import './cloth_details.css';
import { BASE_API_URL } from "../../../constants"; // Asegúrate de que la ruta de importación es correcta

class Cloth_details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prenda: null,
      isLoading: true,
      error: null,
      showModal: false,
      address: '',
      country: '',
      city: '',
      email: '',
      contactNumber: '',
    };
  }

  componentDidMount() {
    const id = this.extractId(window.location.href);

    fetch(`${BASE_API_URL}/api/clothes-details/${id}/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch prenda details');
        }
      })
      .then(data => {
        this.setState({ prenda: data, isLoading: false });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  extractId(url) {
    const startIndex = url.indexOf('/clothes-details/') + '/clothes-details/'.length;
    const endIndex = url.indexOf('/', startIndex) !== -1 ? url.indexOf('/', startIndex) : url.length;
    return url.substring(startIndex, endIndex);
  }

  handleBuyClick = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { address, country, city, email, contactNumber, prenda } = this.state;

    const message = `
      --------Envío--------
      Dirección: ${address}
      País: ${country}
      Ciudad: ${city}
      Correo Electrónico: ${email}
      Número de Contacto: ${contactNumber}

      --------Pedido--------
      Tipo de Prenda: ${prenda.tipo_prenda}
      Marca: ${prenda.marca.nombre}
      Precio: ${prenda.precio_rebajado > 0 ? prenda.precio_rebajado : prenda.precio_original}€
      Descripción: ${prenda.descripcion}
      Talla: ${prenda.talla}
      Color: ${prenda.color}
      Cantidad en Stock: ${prenda.cantidad_stock}
      Material: ${prenda.material}
      Género: ${prenda.genero}
    `;

    try {
      const response = await fetch(`${BASE_API_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asunto: "Detalles de la Compra",
          mensaje: message,
        }),
      });

      if (response.ok) {
        alert("Correo Enviado con Éxito");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Error al enviar el correo");
      }
    } catch (error) {
      console.error(error);
      alert("Error al enviar el correo");
    }

    // Cerrar el modal después de enviar
    this.setState({ showModal: false });
  };

  render() {
    const { prenda, isLoading, error, showModal, address, country, city, email, contactNumber } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!prenda) {
      return <div>No data found</div>;
    }

    return (
      <div className="cloth-details-container">
        <div className="cloth-details-content">
          <div className="cloth-images">
            <img src={prenda.imagen_url} alt={prenda.descripcion} className="cloth-main-image" />
            <div className="cloth-thumbnails">
              <img src={prenda.imagen_url} alt={prenda.descripcion} className="cloth-thumbnail" />
            </div>
          </div>
          <div className="cloth-info">
            <h1 className="cloth-title">{prenda.tipo_prenda} - {prenda.marca.nombre}</h1>
            <p className="cloth-price"><strong>Precio:</strong> {prenda.precio_rebajado > 0 ? prenda.precio_rebajado : prenda.precio_original}€</p>
            {prenda.precio_rebajado > 0 && <p className="cloth-original-price"><strong>Precio Original:</strong> {prenda.precio_original}€</p>}
            <p><strong>Descripción:</strong> {prenda.descripcion}</p>
            <p><strong>Talla:</strong> {prenda.talla}</p>
            <p><strong>Color:</strong> {prenda.color}</p>
            <p><strong>Cantidad en Stock:</strong> {prenda.cantidad_stock}</p>
            <p><strong>Material:</strong> {prenda.material}</p>
            <p><strong>Género:</strong> {prenda.genero}</p>
            <button className="add-to-cart-button" onClick={this.handleBuyClick}>Comprar</button>
          </div>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={this.handleCloseModal}>&times;</span>
              <h2>Datos de Envío</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>País:</label>
                  <input type="text" name="country" value={country} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                  <label>Ciudad:</label>
                  <input type="text" name="city" value={city} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                  <label>Dirección:</label>
                  <input type="text" name="address" value={address} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico:</label>
                  <input type="email" name="email" value={email} onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                  <label>Número de Contacto:</label>
                  <input type="text" name="contactNumber" value={contactNumber} onChange={this.handleChange} required />
                </div>
                <div className='note'>
                  <p>El producto se enviará una vez se confirme la transferencia a la cuenta: 
                      <p>ES6000491500051234567892</p>
                  </p>
                </div>
                <button type="submit" className="confirm-button">Confirmar Compra</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Cloth_details;
