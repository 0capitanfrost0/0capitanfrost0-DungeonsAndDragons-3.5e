import React, { Component } from "react";
import "./aboutUs.css";

export default class AboutUs extends Component {
  render() {
    return (
      <div className="aboutus-page-container">
        <div className="aboutus-image-container">
          <img src="/aboutUs/1.png" alt="About Us 1" className="aboutus-image"/>
        </div>
        <div className="aboutus-text-container">
          <div className="aboutus-text-block">
            <h1>LA MODA COMO FORMA DE EXPRESIÓN</h1>
            <p>
              <strong>
                ¿Cansado de vestir con las mismas marcas de siempre? ¿No te
                gustaría vestir de una manera única?
              </strong>
            </p>
            <p>
              En ClothInfs creemos en la singularidad de las personas. Queremos que
              vistas de una manera única, de una manera diferente al resto.
            </p>
            <p>
              En esta plataforma solo encontrarás prendas exclusivas y muy
              limitadas. En ClothInfs está presente la mejor moda emergente urbana.
              Reunimos las mejores prendas de tendencia y calidad.
            </p>
            <p>
              Actuamos como un filtro, hacemos el trabajo por ti, te damos la
              garantía de que ClothInfs te ofrecerá en todo momento lo que
              realmente está de moda.
            </p>
          </div>
        </div>
        <div className="aboutus-image-row">
          <img src="/aboutUs/2.1.png" alt="About Us 2.1" className="aboutus-row-image"/>
          <img src="/aboutUs/2.2.png" alt="About Us 2.2" className="aboutus-row-image"/>
          <img src="/aboutUs/2.3.png" alt="About Us 2.3" className="aboutus-row-image"/>
        </div>
        <div className="aboutus-text-block-history">
          <h1>NUESTRA HISTORIA</h1>
          <p>
            Mucho antes de que naciera ClothInfs, el emprendedor Álvaro Pérez,
            un joven de Sevilla, apasionado por el streetwear y la moda, 
            pensó un modelo de negocio que podría funcionar perfectamente
            por la falta de visualización en las marcas de ropa menos influyentes.{" "}
          </p>
          <p>
            Con el paso de los años, se dio cuenta de que existían dos problemas
            muy grandes en la sociedad:
          </p>
          <ol>
            <li>
              Muchos factores impiden a las nuevas marcas crecer. El sector de
              la moda es muy competitivo y a las marcas emergentes (de reciente
              creación), les cuesta mucho ganar visibilidad y ventas. Nos
              encontramos a muchas marcas con un alto potencial, pero sin
              embargo no disponen de las herramientas para poder crecer.
            </li>
            <li>
              Los jóvenes están cansados de vestir con las mismas marcas de
              siempre. Buscan una manera de diferenciarse del resto, a través de
              prendas únicas que sigan las tendencias del momento. Se quieren
              alejar de las marcas fast-fashion y de lo tradicional. Las marcas
              emergentes que aportan esta singularidad y exclusividad están muy
              escondidas y cuesta mucho encontrarlas.
            </li>
          </ol>
          <p>
            Aquí comienza un camino donde ClothInfs encuentra su razón de ser,
            ayudando a consolidar los mejores proyectos de moda, y con la
            intención de presentar el mejor streetwear al mundo, contando con la
            moda emergente como elemento imprescindible para sentar las bases de
            la moda del futuro.
          </p>
        </div>
        <div className="aboutus-image-row">
          <img src="/aboutUs/3.1.png" alt="About Us 3.1" className="aboutus-row-image"/>
          <img src="/aboutUs/3.2.png" alt="About Us 3.2" className="aboutus-row-image"/>
          <img src="/aboutUs/3.3.png" alt="About Us 3.3" className="aboutus-row-image"/>
        </div>
        <div className="aboutus-text-container">
          <div className="aboutus-text-block">
            <p>
              <strong>Estamos en constante actualización, ¿Para qué?</strong>
            </p>
            <p>
              Para ofrecerte las últimas tendencias y novedades de la moda
              streetwear.
            </p>
            <p>
              En ClothInfs no encontrarás moda convencional ni fast fashion, sino
              prendas de última tendencia y de muy alta calidad creadas en España;
              cuidadosamente seleccionadas por nuestro equipo de expertos en moda.
            </p>
            <p>
              <strong>Estamos en constante actualización, ¿Para qué?</strong>
            </p>
            <p>
              Para ofrecerte las últimas tendencias y novedades de la moda
              streetwear.
            </p>
            <p>
              En ClothInfs no encontrarás moda convencional ni fast fashion, sino
              prendas de última tendencia y de muy alta calidad creadas en España;
              cuidadosamente seleccionadas por nuestro equipo de expertos en moda.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
