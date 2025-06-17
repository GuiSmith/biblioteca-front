// Bibliotecas
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Contextos
import { useAuth } from '@contextos/AuthContexto';

// Serviços
import API from '@servicos/API';

// Estilos
import './App.css'
import './index.css';

// Rotas | UI
import BarraDeNavegacao from '@ui/BarraDeNavegacao';
import PaginaInexistente from '@ui/PaginaInexistente';
import rotas from './rotas.jsx';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {

    if (isLoading) return;
    const rotaAtual = rotas.find(rota => {
      // Comparação direta se não tiver números
      if (!/\d/.test(location.pathname)) return rota.path === location.pathname;

      // Verificação com parâmetros tipo :id
      const pathParts = rota.path.split('/');
      const locParts = location.pathname.split('/');

      // Tamanhos diferentes? Já era
      if (pathParts.length !== locParts.length) return false;

      // Checa cada segmento
      return pathParts.every((segment, i) =>
        segment.startsWith(':') || segment === locParts[i]
      ) ? rota : false;
    });

    if (rotaAtual && rotaAtual.auth && !isAuthenticated) {
      toast.warn('Faça login para continuar!');
      navigate('/login');
    }

  }, [location.pathname, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <h1 className='text-center'>Autenticando...</h1>
    )
  }

  return (
    <section className='app-container'>
      <BarraDeNavegacao />
      <div className='page-wrapper'>
        <Routes>
          {rotas.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          <Route key={'inexistente'} path='*' element={<PaginaInexistente />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  )
}

export default App;
