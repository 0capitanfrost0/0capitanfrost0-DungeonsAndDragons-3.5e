import React, { useState, useEffect } from "react";
import "./navbar.css";
import PersonIcon from "../../assets/PersonIcon";
import { USERNAME } from "../../constants"; // Ajusta esta ruta según la ubicación real de constants.js

const navbarDesplegable = "/navbarDesplegable.png";
const logo = "/logo.png";

const Navbar = () => {
  const [ropaOpen, setRopaOpen] = useState(false);
  const [marcasOpen, setMarcasOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú desplegable
  const [username, setUsername] = useState(""); // Estado para el username
  const [logoutOpen, setLogoutOpen] = useState(false); // Estado para el menú de logout

  useEffect(() => {
    const storedUsername = localStorage.getItem(USERNAME);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleMouseEnterRopa = () => {
    setRopaOpen(true);
  };

  const handleMouseLeaveRopa = () => {
    setRopaOpen(false);
  };

  const handleMouseEnterMarcas = () => {
    setMarcasOpen(true);
  };

  const handleMouseLeaveMarcas = () => {
    setMarcasOpen(false);
  };

  const handleRopaItemClick = (tipoPrenda) => {
    window.location.href = `/clothes/${tipoPrenda}`;
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem(USERNAME);
    setUsername(""); // Limpiamos el username en el estado local
    setLogoutOpen(false); // Cerramos el menú de logout
    // Redireccionar a la página de inicio o cualquier otra acción necesaria
    window.location.href = "/"; // Ejemplo de redireccionamiento a la página de inicio
  };

  return (
    <div className="navbar">
      <div className="navbar-collapse-toggle" onClick={handleMenuToggle}>
        <img src={navbarDesplegable} alt="Menu" />
      </div>
      <div className="navbar-sections">
        <div
          className="navbar-section ropanavbar"
          onMouseEnter={handleMouseEnterRopa}
          onMouseLeave={handleMouseLeaveRopa}
        >
          <a href="/">ROPA</a>
          {ropaOpen && (
            <div className="ropa-menu">
              <a onClick={() => handleRopaItemClick("Sudaderas")}>Sudaderas</a>
              <a onClick={() => handleRopaItemClick("Camisetas")}>Camisetas</a>
              <a onClick={() => handleRopaItemClick("Camisas")}>Camisas</a>
              <a onClick={() => handleRopaItemClick("Polos")}>Polos</a>
              <a onClick={() => handleRopaItemClick("Pantalón")}>Pantalones</a>
              <a onClick={() => handleRopaItemClick("Faldas")}>Faldas</a>
              <a onClick={() => handleRopaItemClick("Top")}>Tops</a>
              <a onClick={() => handleRopaItemClick("Vestidos")}>Vestidos</a>
              <a onClick={() => handleRopaItemClick("Calcetines")}>Calcetines</a>
              <a onClick={() => handleRopaItemClick("Calzado")}>Calzado</a>
              <a onClick={() => handleRopaItemClick("Baño")}>Ropa de Baño</a>
              <a onClick={() => handleRopaItemClick("Accesorios")}>Accesorios</a>
            </div>
          )}
        </div>
        <div className="navbar-section">
          <a href="/sales">REBAJADO</a>
        </div>
        <div className="navbar-section">
          <a href="/news">NOVEDADES</a>
        </div>
        <div className="navbar-section">
          <a href="/brands">MARCAS</a>
        </div>
        <div className="navbar-section">
          <a href="/blog">BLOG</a>
        </div>
        <div className="navbar-section">
          <a href="/about-us">SOBRE CLOTHINFS</a>
        </div>
        <div className="navbar-section">
          <a href="/contact">CONTACTA</a>
        </div>
      </div>
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className={`navbar-dropdown ${menuOpen ? "show" : ""}`}>
        {menuOpen && (
          <React.Fragment>
            <div className="navbar-section">
              <a href="/sales">REBAJADO</a>
            </div>
            <div className="navbar-section">
              <a href="/news">NOVEDADES</a>
            </div>
            <div className="navbar-section">
              <a href="/brands">MARCAS</a>
            </div>
            <div className="navbar-section">
              <a href="/blog">BLOG</a>
            </div>
            <div className="navbar-section">
              <a href="/about-us">SOBRE NERETY</a>
            </div>
            <div className="navbar-section">
              <a href="/contact">CONTACTA</a>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="navbar-profile">
       { username ? (
          <React.Fragment>
            <div className="username-container">
              <p onClick={() => setLogoutOpen(!logoutOpen)}>{username}</p>
              {logoutOpen && (
                <div className="logout-menu">
                  <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </React.Fragment>
        ) : (
          <a href="/login">
            <PersonIcon />
            </a>
        )}

      </div>
    </div>
  );
};

export default Navbar;
