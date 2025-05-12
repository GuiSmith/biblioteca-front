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
  API.definirToken('62c6f125a1d127ca2efce7cac77a2a35aeaaef7e09a8b12782221a9e503873b205f88bf75a624fa1653243a1101a39d0b614992c5882e0a9ec881bdc23e54f62');

  return (
    <section className = 'app-container'>
      <Router basename='/biblioteca-front'>
        <BarraDeNavegacao />
        <div className='page-wrapper'>
          <Routes>
          {rotas.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          }
          </Routes>
        </div>
      </Router>
    </section>
  )
}

export default App;
