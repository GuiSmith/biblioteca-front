import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import api from '@servicos/API';
import Cartao from '@componentes/Cartao';
import BotaoLink from '@componentes/BotaoLink';
import BotaoAcao from '@componentes/BotaoAcao';

const LivroLista = () => {

    const endpoint = 'livro';
    const completeUrl = `${api.apiUrl}/livro`;
    const apiOptions = api.apiOptions('GET');

    const [cartoes, setCartoes] = useState('');

    useEffect(() => {
        fetch(completeUrl, apiOptions)
            .then(async response => {
                const data = await response.json();

                if (response.status !== 200) {
                    toast.error(data.mensagem);
                    return;
                }

                console.log(data);

                setCartoes(
                    <div className='d-flex flex-wrap justify-content-center gap-3'>
                        {data.map(async livro => {
                            const botoes = [
                                <BotaoLink to={`/livro/view/${livro.id}`} label = 'Detalhes' className = 'btn-primary' />,
                                <BotaoLink label = 'Emprestar' className = 'btn-success' />
                            ];

                            return (
                                <div key={livro.id}>
                                    <Cartao img={{ src: livro.foto, alt: `Imagem: ${livro.titulo}` }} titulo={livro.titulo} botoes={botoes} className = 'mb-3'>
                                        {/* <p>{`Autores: ${nomeAutores}`}</p> */}
                                        {/* <p>{`Sinopse: ${livro.sinopse}`}</p> */}
                                        {/* <p>5 exemplares</p> */}
                                        <p>{livro.ativo ? 'Ativo' : 'Inativo'}</p>
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
    }, []);

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