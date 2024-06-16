import React from 'react';
import Form from "../Form/Form";
import "./Register.css"; // Importa los estilos CSS del RegisterPage

function Register() {
    return (
        <div className="RegisterPage-Container">
            <h1 className="titulo">Regístrate</h1>
            <p>Por favor introduce tu nuevo usuario y contraseña: </p>
            <Form route="/api/user/register/" method="register" />
            <p className="registro-link">¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a></p>
        </div>
    );
}

export default Register;
