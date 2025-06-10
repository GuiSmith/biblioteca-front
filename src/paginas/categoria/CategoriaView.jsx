// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Serviços
import API from '@servicos/API';

// Componentes | UI
import BotaoLink from '@componentes/BotaoLink';
import LivroCartao from '@ui/LivroCartao';

const CategoriaView = () => {

    const { id } = useParams();

    if (!id) {
        useNavigate('/categorias');
    }

    const endpoint = `categoria`;
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState({});
    const [livros, setLivros] = useState([]);

    // Buscar Categoria
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

    // Buscar livro
    useEffect(() => {
        if (!categoria) return;

        API.listar(`categoria/${id}/livros`)
            .then(responseLivro => {

                if (responseLivro.ok) {
                    setLivros(responseLivro.array);
                    return;
                }

                if (responseLivro.error) {
                    toast.error('Erro ao listar livros');
                    return;
                }

                if (!responseLivro.ok && !responseLivro.error) {
                    toast.warning(`Livro: ${responseLivro.mensagem}`);
                }
            })
            .catch(error => {
                toast.error('Erro ao listar livros');
                console.error(error);
            })
    }, [categoria]);

    const handleDelete = async () => {
        try {
            if (!id) return;

            if (!confirm("Deseja mesmo excluir este registro?")) {
                return;
            }

            const responseDelete = await API.deletar(endpoint, id);

            //Erro
            if (responseDelete.error) {
                toast.error("Erro ao deletar categoria");
                return;
            }

            // Sem sucesso
            if (!responseDelete.error && !responseDelete.ok) {
                toast.warning(responseDelete.mensagem);
                return;
            }

            // OK
            if (responseDelete.ok) {
                toast.success('Categoria deletada com sucesso!');
                navigate('/categorias');
            }

        } catch (error) {
            console.error(error);
            toast.error('Erro ao deletar categoria');
        }
    }

    const botoes = [
        {
            auth: true,
            jsx: <BotaoLink key='botao-novo' label='Novo' to='/categoria/form/novo' className='btn-primary' />,
        },
        {
            auth: true,
            jsx: <BotaoLink key='botao-editar' label='Editar' to={`/categoria/form/${id}`} className='btn-dark' />
        },
        {
            auth: false,
            jsx: <BotaoLink key='botao-listar' label='Listar' to='/categorias' className='btn-secondary' />
        },
        {
            auth: true,
            jsx: <button key='botao-deletar' type="button" className="btn btn-danger" onClick={handleDelete}>Deletar</button>
        }
    ];

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
                <div className="d-flex flex-wrap justify-content-start gap-3">
                    {/* {livros.map((livro) => <LivroCartao livro={livro} nomeCategoria={categoria.nome} />)} */}
                   {livros ? console.log(typeof livros.livros) : ''}
                   {livros ? console.log(livros.livros) : ''}
                </div>
                
            </div>
            <ToastContainer position="bottom-right" />
        </article>
    )
};

export default CategoriaView;