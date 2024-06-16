import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './filter.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtros: [
        {
          nombre: "TALLA",
          opciones: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        {
          nombre: "MARCA",
          opciones: ["Inalbis", "Les Gars", "Mint Eyes", "Signal", "Horizon Studios",
             "Humpier", "Signal", "Horizon Studios", "Old School", "Shameless Collective",
              "Half Studios", "Stooner", "Esenzia", "Goated"]
        },
        {
          nombre: "COLOR",
          opciones: ["Amarillo", "Azul", "Azul Celeste", "Azul Marino", "Azul Oscuro", "Beige", "Blanco Roto",
            "Gris", "Gris Oscuro", "Lila", "Marrón","Multicolor", "Naranja", "Negro",
            "Oro", "Plata", "Rojo", "Rosa", "Verde", "Verde Oscuro"
          ]
        },
        {
          nombre: "TIPO DE PRODUCTO",
          opciones: ["Sudaderas", "Camisas", "Camisetas", "Polos", "Pantalón", "Top",
            "Faldas", "Vestidos", "Calcetines", "Calzado", "Baño", "Accesorios",]
        },
        {
          nombre: "GÉNERO",
          opciones: ["Hombre", "Mujer", "Niño", "Niña"]
        },
        {
          nombre: "PRECIO",
          opciones: null // Dejamos este campo como null para manejarlo de manera especial
        }
      ],
      filtrosAbiertos: {}, // Para almacenar el estado de cada filtro abierto o cerrado
      precioMin: 0, // Valor mínimo del rango de precio
      precioMax: 100, // Valor máximo del rango de precio
      filtrosSeleccionados: { // Para almacenar los filtros seleccionados
        talla: [],
        marca: [],
        color: [],
        tipo_producto: [],
        genero: [],
        precio: null, // Precio se maneja como un objeto { min, max }
      }
    };
  }

  // Función para alternar la visualización del menú de un filtro
  toggleFiltro = (nombreFiltro) => {
    this.setState(prevState => ({
      filtrosAbiertos: {
        ...prevState.filtrosAbiertos,
        [nombreFiltro]: !prevState.filtrosAbiertos[nombreFiltro]
      }
    }));
  };

  // Función para manejar cambios en el rango de precio
  handlePrecioChange = ([precioMin, precioMax]) => {
    this.setState({ precioMin, precioMax });
  };

  // Función para manejar cambios en las opciones de filtro (checkboxes)
  handleCheckboxChange = (filtroNombre, opcion) => {
    const { filtrosSeleccionados } = this.state;
    const nuevosFiltros = { ...filtrosSeleccionados };

    if (filtroNombre === 'PRECIO') {
      nuevosFiltros.precio = { min: this.state.precioMin, max: this.state.precioMax };
    } else {
      if (!nuevosFiltros[filtroNombre]) {
        nuevosFiltros[filtroNombre] = []; // Aseguramos que siempre sea un array
      }

      if (nuevosFiltros[filtroNombre].includes(opcion)) {
        nuevosFiltros[filtroNombre] = nuevosFiltros[filtroNombre].filter(item => item !== opcion);
      } else {
        nuevosFiltros[filtroNombre] = [...nuevosFiltros[filtroNombre], opcion];
      }
    }

    this.setState({ filtrosSeleccionados: nuevosFiltros });
  };

  // Función para aplicar los filtros y actualizar la lista de prendas
  aplicarFiltros = () => {
    const { filtrosSeleccionados } = this.state;
    this.props.aplicarFiltros(filtrosSeleccionados); // Llama a la función del padre para aplicar los filtros
  };

  render() {
    return (
      <div className="custom-filters-container">
        <div className='custom-filters-title'>Filtros</div>
        {/* Mapea sobre los filtros para mostrarlos */}
        {this.state.filtros.map((filtro, index) => (
          <div key={index} className="custom-filter-section">
            {/* Título del filtro */}
            <div className="custom-filter-title" onClick={() => this.toggleFiltro(filtro.nombre)}>
              {/* Icono para indicar si el menú está abierto o cerrado */}
              {this.state.filtrosAbiertos[filtro.nombre] ? <span>&#9660;</span> : <span>&#9654;</span>}
              {filtro.nombre}
            </div>

            {/* Menú desplegable con opciones */}
            {this.state.filtrosAbiertos[filtro.nombre] && (
              <div className="custom-filter-options">
                {/* Si es el filtro de PRECIO, muestra el selector de rango */}
                {filtro.nombre === "PRECIO" && (
                  <div className="custom-filter-price">
                    <Slider
                      range
                      min={0}
                      max={100}
                      value={[this.state.precioMin, this.state.precioMax]}
                      onChange={this.handlePrecioChange}
                    />
                    <span>{this.state.precioMin} - {this.state.precioMax}</span>
                  </div>
                )}

                {/* Mapea sobre las opciones para mostrarlas */}
                {filtro.opciones && filtro.opciones.map((opcion, opcionIndex) => (
                  <div key={opcionIndex} className="custom-filter-option">
                    <input
                      type="checkbox"
                      id={`filtro-${index}-${opcionIndex}`}
                      onChange={() => this.handleCheckboxChange(filtro.nombre, opcion)}
                      checked={this.state.filtrosSeleccionados[filtro.nombre]?.includes(opcion) || false}
                    />
                    <label htmlFor={`filtro-${index}-${opcionIndex}`}>{opcion}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Botón para aplicar los filtros */}
        <button className="filterbutton">Aplicar Filtros</button>
      </div>
    );
  }
}

export default Filter;
