// Bibliotecas
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

//Serviços
import API from '@servicos/API';

// Componentes | UI
import BotaoLink from '@componentes/BotaoLink';
import LivroCartao from '@ui/LivroCartao';

const LivroLista = () => {

    const [categorias, setCategorias] = useState([]);
    const [livros, setLivros] = useState([]);

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

    return (
        <article className='container-fluid'>
            <h1 className='text-center'>Livros</h1>
            <div className='d-flex flex-wrap justify-content-start gap-3'>
                <BotaoLink to='/livro/form/novo' label='Novo' className='btn-primary' />
            </div>
            <article className='mt-3 d-flex flex-wrap justify-content-start gap-2'>
                {livros && (
                    livros.map(livro => {
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