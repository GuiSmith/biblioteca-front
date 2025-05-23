import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import API from '@servicos/API';
import Cartao from '@componentes/Cartao';
import BotaoLink from '@componentes/BotaoLink';
import BotaoAcao from '@componentes/BotaoAcao';
import { useFetcher } from 'react-router-dom';

const LivroLista = () => {

    const endpoint = 'livro';
    const completeUrl = `${API.apiUrl}/livro`;
    const apiOptions = API.apiOptions('GET');

    const [cartoes, setCartoes] = useState('');
    const [categorias, setCategorias] = useState([]);

    // Categorias
    useEffect(() => {
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

        fetch(completeUrl, apiOptions)
            .then(async response => {
                const data = await response.json();

                if (response.status !== 200) {
                    toast.error(data.mensagem);
                    return;
                }

                setCartoes(
                    <div className='d-flex flex-wrap justify-content-center gap-3'>
                        {data.map(async livro => {

                            if (categorias.length > 0) {
                                const categoria = categorias.find(categoria => livro.id_categoria = categoria.id);

                                livro.categoria = categoria.nome ?? '';
                            }else{
                                livro.categoria = 'Carregando...';
                            }

                            const botoes = [
                                <BotaoLink to={`/livro/view/${livro.id}`} label='Detalhes' className='btn-primary' />,
                                <BotaoLink label='Emprestar' className='btn-success' />
                            ];

                            return (
                                <div key={livro.id}>
                                    <Cartao img={{ src: livro.foto, alt: `Imagem: ${livro.titulo}` }} titulo={livro.titulo} botoes={botoes} className='mb-3'>
                                        <p className='text-muted'>
                                            {livro.ativo ? <span className='text-dark'>Ativo</span> : <span className='text-muted'>Inativo</span>}
                                            <br />
                                            {livro.categoria}
                                        </p>
                                    </Cartao>
                                </div>
                            )
                        })}
                    </div>
                )
            })
            .catch(error => {
                toast.error('Erro ao buscar dados');
                console.error('Error fetching data:', error);
            });
    }, [categorias]);

    return (
        <article>
            <div className='container-fluid'>
                <div className='d-flex flex-wrap gap-3 justify-content-center'>
                    <BotaoLink to='/livro/form/novo' label='Novo' className='btn-success' />
                    <BotaoAcao label='Fazer algo' />
                    <BotaoAcao label='Fazer algo' />
                    <BotaoAcao label='Fazer algo' />
                </div>
                <div className='mt-3'>
                    {cartoes}
                </div>
            </div>
            <ToastContainer position='bottom-right' />
        </article>
    )
}

export default LivroLista;