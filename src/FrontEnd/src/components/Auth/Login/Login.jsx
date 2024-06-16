import React, { useState } from "react";
import Form from "../Form/Form";
import "./Login.css"; // Asegúrate de importar tus estilos CSS aquí

function Login() {
  const [error, setError] = useState("");

  const handleFormSubmit = async (formData) => {
    const { username, password } = formData;

    try {
      // Aquí puedes realizar la lógica para enviar los datos al backend y gestionar el inicio de sesión
      console.log("Username:", username);
      console.log("Password:", password);

      // Ejemplo de manejo de errores
      // Simulamos un error al intentar iniciar sesión
      setError("Usuario o contraseña incorrectos");
    } catch (error) {
      console.error("Error:", error);
      setError("Error al intentar iniciar sesión");
    }
  };

  return (
    <div className="LoginPage-Container">
      <h3 className="titulo">Iniciar Sesión</h3>
      <p className="instrucciones">Por favor introduce tu usuario y contraseña:</p>

      <Form route="/api/token/" method="login" onSubmit={handleFormSubmit} />

      {error && <p className="error">{error}</p>}

      <div className="registro-link">
        ¿No tienes una cuenta? <a href="/register">Regístrate</a>
      </div>
    </div>
  );
}

export default Login;
