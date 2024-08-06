import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate,Outlet } from 'react-router-dom';
import './App.css';

import ClassesGrid from './Components/Combat/Spells/Class_List/Classes';
import SpellLevels from './Components/Combat/Spells/Level_List/Levels'; 
import SpellDetail from './Components/Combat/Spells/Spell_Detail/Spell_Detail';
import NotFound from './Components/Error/NotFound';
import HomePage from './Components/Main/HomePage/HomePage';
import InitialPage from './Components/Main/InitialPage/InitialPage';
import Combat from './Components/Combat/Combat';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Navbar from './Components/Main/Navbar/Navbar';

import { v4 as uuidv4 } from 'uuid'; // Importa uuid para generar identificadores únicos


function Logout(){
  localStorage.clear()
  return <Navigate to="/"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

const ProtectedLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet /> {/* Rutas que incluyen Navbar */}
    </div>
  );
};


function App() {
  const [preparedSpells, setPreparedSpells] = useState({});

  const prepareSpell = (spell) => {
    const spellWithId = { ...spell, instanceId: uuidv4() };
    setPreparedSpells((prevSpells) => {
      const level = spell.nivel;
      const newLevelSpells = prevSpells[level] ? [...prevSpells[level], spellWithId] : [spellWithId];
      return { ...prevSpells, [level]: newLevelSpells };
    });
  };

  const unprepareSpell = (spellInstanceId, level) => {
    setPreparedSpells((prevSpells) => {
      const newLevelSpells = prevSpells[level]?.filter(spell => spell.instanceId !== spellInstanceId) || [];
      if (newLevelSpells.length === 0) {
        const { [level]: _, ...rest } = prevSpells;
        return rest;
      } else {
        return { ...prevSpells, [level]: newLevelSpells };
      }
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />

        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/combat" element={<ProtectedRoute><Combat /></ProtectedRoute>} />
          <Route path="/combat/spells" element={<ProtectedRoute><ClassesGrid /></ProtectedRoute>} />
          <Route path="/combat/spells/:className" element={<ProtectedRoute><SpellLevels prepareSpell={prepareSpell} unprepareSpell={unprepareSpell} preparedSpells={preparedSpells} /></ProtectedRoute>} />
          <Route path="/combat/spells/:className/:name" element={<ProtectedRoute><SpellDetail /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;