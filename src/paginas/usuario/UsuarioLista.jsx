// Bibliotecas
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Serviços
import API from "@servicos/API";
import usuarioService from '@servicos/usuario';

// Componentes | UI
import BotaoLink from "@componentes/BotaoLink";

const UsuarioLista = () => {
    
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    // Usuários
    useEffect(() => {
        // Usuários
        API.listar('usuario')
            .then(responseUsuario => {
                if (responseUsuario.ok) {
                    setUsuarios(responseUsuario.array);
                    return;
                }
                if (responseUsuario.error) {
                    toast.error('Erro ao listar usuários');
                    return;
                }
                if (responseUsuario.ok === false && responseUsuario.error === false) {
                    toast.warning(responseUsuario.mensagem);
                    return;
                }
            })
            .catch(error => toast.error('Erro ao listar usuários'));
    }, []);

    return (
        <article className='container-fluid'>
            <h1>Lista de Usuários</h1>
            <div className='d-flex flex-wrap justify-content-start gap-2 mb-3 mt-3'>
                <BotaoLink label='Novo' to='/usuario/form/novo' className='btn-primary' />
            </div>
            <article className='table-container'>
                {!usuarios.length
                    ? <p className="text-center">Carregando...</p>
                    : (
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    {Object.values(usuarioService.colunas).map((coluna, index) => (
                                        <th key={index}>{coluna}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id} onClick={() => navigate(`/usuario/view/${usuario.id}`)}>
                                        {Object.keys(usuarioService.colunas).map((coluna, index) => (
                                            <td key={index}>
                                                {usuarioService.formatCell(coluna, usuario[coluna])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </article>
            <ToastContainer />
        </article>
    );
}

export default UsuarioLista;