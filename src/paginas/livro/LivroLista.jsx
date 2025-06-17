// Bibliotecas
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

// Contextos
import { useAuth } from '@contextos/AuthContexto';

//Serviços
import API from '@servicos/API';

// Componentes | UI
import BotaoLink from '@componentes/BotaoLink';
import LivroCartao from '@ui/LivroCartao';

const LivroLista = () => {

    const [categorias, setCategorias] = useState([]);
    const [livros, setLivros] = useState([]);
    const [livrosFiltrados, setLivrosFiltrados] = useState([]);
    const [idCategoriaSelecionada, setIdCategoriaSelecionada] = useState(0);
    const { isAuthenticated, contextAuthType } = useAuth();

    // Categorias
    useEffect(() => {
        // Categorias
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

    // Livros
    useEffect(() => {
        // Livros
        API.listar('livro')
            .then(responseLivro => {
                if (responseLivro.ok) {
                    setLivros(responseLivro.array);
                    setLivrosFiltrados(responseLivro.array);
                    return;
                }
                if (responseLivro.error) {
                    toast.error('Erro ao listar livros');
                    return;
                }
                if (responseLivro.ok === false && responseLivro.error === false) {
                    toast.warning(responseLivro.mensagem);
                    return;
                }
            })
            .catch(error => toast.error('Erro ao listar livros'));
    }, [categorias]);

    // Filtrar livros
    useEffect(() => {
        try {
            setLivrosFiltrados(idCategoriaSelecionada == 0 ? livros : livros.filter(livro => livro.id_categoria == idCategoriaSelecionada));
        } catch (error) {
            let mensagemErro = 'Erro ao filtrar categorias';
            console.log(mensagemErro);
            console.error(error);
            toast.error(mensagemErro);
        }
    }, [idCategoriaSelecionada]);

    const handleSelecionarCategoria = async (categoria) => {
        try {
            if (categoria.id > 0) {
                if (categoria.id == idCategoriaSelecionada) {
                    setIdCategoriaSelecionada(0);
                } else {
                    setIdCategoriaSelecionada(categoria.id);
                }
            }
        } catch (error) {
            let mensagemErro = 'Erro ao selecionar categoria';
            console.log(mensagemErro);
            console.error(error);
            toast.error(mensagemErro);
        }
    }

    const botoes = [
        {
            auth: true,
            jsx: <BotaoLink to='/livro/form/novo' label='Novo' className='btn-primary' />
        }
    ];

    return (
        <article className='container-fluid'>
            <h2 className='text-center'>Livros</h2>
            {/* Ações */}
            <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                {botoes && (
                    botoes.map((botao,index) => (!botao.auth || (botao.auth && isAuthenticated && contextAuthType == 'funcionario')) ? <span key={index}>{botao.jsx}</span> : '')
                )}
            </div>
            {/* Filtros */}
            <div className='mb-3 d-flex flex-wrap justify-content-center gap-2'>
                {categorias.map(categoria => (
                    <button key={categoria.id} type='button' className={`btn btn-dark ${(categoria.id == idCategoriaSelecionada || idCategoriaSelecionada == 0) ? 'opacity-100' : 'opacity-75'}`} onClick={() => handleSelecionarCategoria(categoria)}>{categoria.nome}</button>
                ))}
            </div>
            <article className='mt-3 d-flex flex-wrap justify-content-start gap-2'>
                {livrosFiltrados && (
                    livrosFiltrados.map(livro => {
                        // const categoria = categorias.find(categoria => categoria.id == livro.id_categoria);
                        const nomeCategoria = categorias.find(categoria => categoria.id == livro.id_categoria)['nome'] ?? '';
                        return (<LivroCartao key={livro.id} livro={livro} nomeCategoria={nomeCategoria} />)
                    })
                )}
            </article>
            <ToastContainer position='bottom-right' />
        </article>
    )
}

export default LivroLista;