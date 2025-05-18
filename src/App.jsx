// Bibliotecas
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

  const location = useLocation();
  const navigate = useNavigate();
  const filePath = '/' + location.pathname.split('/')[1];

  // useEffect(() => {
  //   // Temporário, até criar tela e funções de login

  //   API.auth()
  //     .then(response => {
  //       try {
  //         const rotaAtual = rotas.find(rota => rota.path == filePath);
  //         console.log(rotaAtual);
  //         console.log(filePath);
  //         if(rotaAtual){
  //           if(response.ok == false && rotaAtual.auth == true){
  //             // navigate(filePath == '/login' ? '/' : '/login');
  //           }
  //         }else{
  //           // navigate('/pagina_inexistente');
  //         }
  //       } catch(error) {
  //         toast("Erro de autenticação, contate o suporte");
  //       }
  //     });
  // },[location.pathname]);

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
