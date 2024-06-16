import React, { Component } from "react";
import "./contact.css";
import { BASE_API_URL } from "../../constants";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asunto: "",
      mensaje: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { asunto, mensaje } = this.state;

    try {
      const response = await fetch(`${BASE_API_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ asunto, mensaje }),
      });

      if (response.ok) {
        alert("Correo Enviado con Éxito");
        // Aquí puedes redirigir o hacer cualquier otra acción después de enviar el correo
      } else {
        const data = await response.json();
        throw new Error(data.message || "Error al enviar el correo");
      }
    } catch (error) {
      console.error(error);
      alert("Error al enviar el correo");
    }
  }

  render() {
    const { asunto, mensaje } = this.state;

    return (
      <div className="contact-page-container">
        <div className="contact-form-title">
          <h2>Formulario de Contacto</h2>
        </div>
        <div className="contact-form-container">
          <p className="contact-description">
            Si tienes alguna duda, queja, sugerencia o simplemente deseas
            cambiar o devolver alguna prenda de ClothInfs, puedes enviar un
            correo electrónico a{" "}
            <a href="mailto:clothinfscoremain@outlook.es">
              clothinfscoremain@outlook.es
            </a>{" "}
            o rellenando el siguiente formulario.
            <br />
            <br />
            Si tienes una marca y deseas colaborar con nosotros, contáctanos en
            este correo electrónico:{" "}
            <a href="mailto:clothinfscoremain@outlook.es">
              clothinfscoremain@outlook.es
            </a>
            .
            <br />
            <br />
            Nos pondremos en contacto contigo en un plazo de 24 a 72 horas
            laborables.
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="contact-form-group">
              <label htmlFor="asunto">
                <span>Asunto:</span>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={asunto}
                  onChange={this.handleChange}
                  className="contact-input"
                />
              </label>
            </div>
            <div className="contact-form-group">
              <label htmlFor="mensaje">
                <span>Mensaje:</span>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={mensaje}
                  onChange={this.handleChange}
                  className="contact-input"
                ></textarea>
              </label>
            </div>
            <div className="contact-button-container">
              <button type="submit" className="contact-button">
                ENVIAR MENSAJE
              </button>
            </div>
          </form>
        </div>
        <div className="contact-info">
          <h3>¿Qué es ClothInfs?</h3>
          <p>
            ClothInfs es el primer Marketplace Online donde puedes encontrar las
            mejores marcas independientes de streetwear.
            <br />
            <br />
            Seleccionamos cuidadosamente las marcas emergentes con mayor
            potencial y las acercamos a todos esos jóvenes que están cansados de
            vestir con marcas convencionales.
          </p>
        </div>
      </div>
    );
  }
}
