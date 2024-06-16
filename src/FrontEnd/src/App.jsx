import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation,Navigate } from "react-router-dom";
import './App.css';
import Welcome from './components/welcome/welcome';

import AboutUs from './components/about_us/aboutUs';
import Contact from './components/contact/contact';
import Brand from './components/brand/brand';
import Navbar from './components/navbar/navbar';
import CardList from './components/cloth/cardList';
import Footer from './components/footer/footer';
import Blog from './components/blog/blog';
import Sales from './components/sales/sales';
import News from './components/news/news';
import Cloth_type_filter from './components/cloth/cloth_type_filter/cloth_type_filter';
import BrandClothes from './components/brand/brandClothes/brandClothes';
import Cloth_details from './components/cloth/cloth_details/cloth_details';
import Article_details from './components/blog/article_details/article_details';
import Search_bar from './components/search_bar/search_bar';
import Filter from "./components/cloth/filter/filter";
import NotFound from "./components/Auth/Error/NotFound";
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';




function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register/>
}

const App = () => {
  return (
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <MainContent />
          <Footer />
        </div>
      </BrowserRouter>
  );
};

const MainContent = () => {
  const location = useLocation();
  const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({}); // Estado para almacenar filtros seleccionados

  // Función para aplicar filtros desde el componente Filter
  const aplicarFiltros = (filtros) => {
    setFiltrosSeleccionados(filtros);
  };

  // Determina si se muestra el sidebar
  const showSidebar =
    location.pathname === "/" ||
    location.pathname.startsWith("/clothes") ||
    location.pathname === "/sales" ||
    location.pathname === "/news";

  return (
    <div className="main-content">
      {showSidebar && <Filter aplicarFiltros={aplicarFiltros} />} {/* Renderiza el componente Filter y le pasa la función aplicarFiltros */}
      <div className={`content ${showSidebar ? 'with-sidebar' : 'without-sidebar'}`}>
        <Routes>
          {/* Componentes renderizados según las rutas */}
          <Route path="/" element={<CardList filtrosSeleccionados={filtrosSeleccionados} />} /> {/* Pasa filtrosSeleccionados como prop a CardList */}
          <Route path="/clothes/:tipo_prenda/" element={<Cloth_type_filter />} />
          <Route path="/clothes-details/:id/" element={<Cloth_details />} />

          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />

          <Route path="/home" element={<Welcome />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/brands" element={<Brand />} />
          <Route path="/brands/:marca/" element={<BrandClothes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id/" element={<Article_details />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/news" element={<News />} />
          <Route path="/search" element={<Search_bar />} />
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
