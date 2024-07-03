import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClassesGrid from './Components/Calculator/Spells/Class_List/Classes';
import SpellLevels from './Components/Calculator/Spells/Level_List/Levels'; 
import SpellDetail from './Components/Calculator/Spells/Spell_Detail/Spell_Detail';
import NotFound from './Components/Error/NotFound';
import Main from './Components/Main/Main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/calculator/spells" element={<ClassesGrid />} />
        <Route path="/calculator/spells/:className" element={<SpellLevels />} />
        <Route path="/calculator/spells/:className/:name" element={<SpellDetail/>} />
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
