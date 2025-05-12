import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import './index.css';

// Rotas | UI
import BarraDeNavegacao from '@ui/BarraDeNavegacao';
import rotas from './rotas.jsx';

// Utilitários
import API from '@servicos/API';

function App() {

  // Temporário, até criar tela e funções de login
  API.definirToken('1b1d0428eec47d23b851d589f25db5f9d8b4b99e8e631fc8780dbfa4357a824a339a73b32e7c7571bfe0519bf0bbdde20722abb1b44ad635cfad5624a52b6279');

  return (
    <section className = 'app-container'>
      <Router basename='/biblioteca-front'>
        <BarraDeNavegacao />
        <div className='page-wrapper'>
          <Routes>
          {rotas.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          </Routes>
        </div>
      </Router>
    </section>
  )
}

export default App;
