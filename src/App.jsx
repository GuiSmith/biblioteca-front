// Bibliotecas
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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

  useEffect(() => {
    const rotaAtual = rotas.find(rota => {
      // Converte o path da rota em uma expressão regular para lidar com parâmetros
      const regexPath = new RegExp(`^${rota.path.replace(/:\w+/g, '[^/]+')}$`);
      return regexPath.test(location.pathname);
    });
    if(rotaAtual && rotaAtual.auth){
      API.auth()
        .then(isAuth => {
          if(!isAuth){
            toast.warn('Faça login para continuar!');
            navigate('/login');
          }else{
            console.log(isAuth, rotaAtual);
          }
        })
        .catch(error => {
          toast.error('Erro ao checar autenticação');
          console.error('Erro ao checar autenticação: ',error);
        })
    }
  },[location.pathname]);

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
