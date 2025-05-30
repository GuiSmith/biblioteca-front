// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Serviços
import API from '@servicos/API';

// Componentes
import BotaoLink from '@componentes/BotaoLink';

const CategoriaView = () => {

    const { id } = useParams();

    if (!id) {
        useNavigate('/categorias');
    }

    const endpoint = `categoria`;

    const [categoria, setCategoria] = useState({});
    const [livros, setLivros] = useState([]);

    const botoes = [
        {
            auth: true,
            jsx: <BotaoLink label='Novo' to='/categoria/form/novo' className='btn-primary' />,
        },
        {
            auth: true,
            jsx: <BotaoLink label='Editar' to={`/categoria/form/${id}`} className='btn-dark' />
        },
        {
            auth: false,
            jsx: <BotaoLink label='Listar' to='/categorias' className='btn-secondary' />
        },
        {
            auth: true,
            jsx: <button type="button" className="btn btn-danger">Deletar</button>
        }
    ];

    // Buscar Categorias e livros
    useEffect(() => {
        API.selecionar(endpoint, id)
            .then(response => {
                // Erro
                if (response.error) {
                    toast.error('Erro ao listar categorias e livros');
                    return;
                }

                // Aviso
                if (!response.ok && !response.error) {
                    toast.warning(response.mensagem);
                }

                // OK
                if (response.ok) {
                    setCategoria(response.data);
                }
            })
    }, []);

    return (
        <article className="container">
            <div className="alert alert-primary text-dark p-3">
                <h1 className="text-center">
                    {categoria ? categoria.nome : 'Carregando...'}
                </h1>
                <p style={{ textAlign: 'justify', textIndent: '1rem' }}>{categoria.descricao}</p>
                <div className="d-flex flex-wrap justify-content-start gap-2">
                    {botoes.map(botao => botao.jsx)}
                </div>
            </div>
            {/* Livros */}
            <div className="">
                <h2 className="text-center">Livros</h2>
                
            </div>
        </article>
    )
};

export default CategoriaView;