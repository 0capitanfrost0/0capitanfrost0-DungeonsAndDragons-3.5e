import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Filter from "../cloth/filter/filter";

export class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { changeVariable } = this.props;

    return (
      <div>
        <Navbar/>
        <Filter/>
        <h1>Esta es la página principal de la aplicación</h1>

        <button onClick={changeVariable}>
          <Link to="/">Cerrar Sesión</Link>
        </button>
      </div>
    );
  }
}

export default Welcome;
