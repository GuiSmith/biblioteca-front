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
      // Converte o path da rota em uma expressão regular para lidar com parâmetros
      const regexPath = new RegExp(`^${rota.path.replace(/:\w+/g, '[^/]+')}$`);
      return regexPath.test(location.pathname);
    });

    if (rotaAtual && rotaAtual.auth && !isAuthenticated) {
      toast.warn('Faça login para continuar!');
      navigate('/login');
    }

  }, [location.pathname,isAuthenticated, isLoading]);

  if(isLoading){
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
