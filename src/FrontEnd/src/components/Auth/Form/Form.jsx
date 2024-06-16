import React, { useState } from "react";
import tokenApi from "../js/tokenApi";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME } from "../../../constants";
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
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response ? error.response.data : "Ha ocurrido un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="visually-hidden">{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de Usuario"
        required
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button className="form-button" type="submit" disabled={loading}>
        {name}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default Form;
