// Bibliotecas
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Estilos
import './App.css'
import './index.css';

// Rotas | UI
import BarraDeNavegacao from '@ui/BarraDeNavegacao';
import PaginaInexistente from '@ui/PaginaInexistente';
import rotas from './rotas.jsx';

// Utilitários
import API from '@servicos/API';

function App() {

  return (
    <section className = 'app-container'>
      <BarraDeNavegacao />
      <div className='page-wrapper'>
        <Routes>
        {rotas.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
        <Route key={'inexistente'} path='*' element ={<PaginaInexistente />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  )
}

export default App;
