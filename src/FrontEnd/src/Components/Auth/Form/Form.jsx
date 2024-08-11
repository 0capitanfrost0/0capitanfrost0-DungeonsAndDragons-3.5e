import React, { useState } from "react";
import tokenApi from "../js/tokenApi";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME } from "../../constants";
import "./Form.css"; // Importa los estilos CSS del formulario

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const name = method === "login" ? "Iniciar Sesión" : "Registrarse";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const data = { username, password };
      
      const res = await tokenApi.post(route, data);
      
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem(USERNAME, username);
        navigate("/home"); // Cambia la redirección a la ruta deseada
      } else {
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response && error.response.data 
        ? error.response.data.detail || "Ha ocurrido un error" 
        : "Ha ocurrido un error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de Usuario"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit" disabled={loading}>
        {name}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default Form;
