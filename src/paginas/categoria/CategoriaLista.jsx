// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Contextos
import { useAuth } from '@contextos/AuthContexto';

//Serviços
import API from '@servicos/API';

// Componentes
import BotaoLink from '@componentes/BotaoLink';

const CategoriaLista = () => {

    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated, contextAuthType } = useAuth();

    const colunas = {
        id: 'ID',
        nome: 'Nome',
    };

    useEffect(() => {

        // Listando categorias
        API.listar('categoria')
            .then(responseCategoria => {
                if (responseCategoria.ok) {
                    setCategorias(responseCategoria.array);
                    return;
                }
                if (responseCategoria.error) {
                    toast.error('Erro ao listar categorias');
                    return;
                }
                if (responseCategoria.ok === false && responseCategoria.error === false) {
                    toast.warning(responseCategoria.mensagem);
                    return;
                }
            })
            .catch(error => toast.error('Erro ao listar categorias'));
    }, []);

    const botoes = [
        {
            auth: true,
            jsx: <BotaoLink label='Novo' to='/categoria/form/novo' className='btn-primary' />
        },
    ];

    return (
        <section className="container-fluid">
            <h2 className="text-center">Categorias</h2>
            <div className="d-flex flex-wrap justify-content-start gap-2 mb-3 mt-3">
                {botoes && (
                    botoes.map((botao,index) => (!botao.auth || (botao.auth && isAuthenticated && contextAuthType == 'funcionario')) ? <span key={index}>{botao.jsx}</span> : '')
                )}
            </div>
            <article className="table-container table-responsive">
                {!categorias
                    ? <p className="text-center">Carregando...</p>
                    : (
                        <table className="table table-striped table-dark table-hover">
                            <thead>
                                <tr>
                                    {Object.values(colunas).map((coluna,index) => <th key={index}>{coluna}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map(categoria => (
                                    <tr key={categoria.id} className="cursor-pointer" onClick={() => navigate(`/categoria/view/${categoria.id}`)} >
                                        {Object.keys(colunas).map((coluna,index) => <td key={index}>{categoria[coluna]}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </article>
            <ToastContainer position="bottom-right" />
        </section>
    )
};

export default CategoriaLista;