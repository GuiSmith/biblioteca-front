import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import api from '@servicos/API';
import Cartao from '@componentes/Cartao';

const LivrosLista = () => {

    const endpoint = 'livro';

    const completeUrl = `${api.apiUrl}/livro`;

    const apiOptions = api.apiOptions('GET');

    const [cartoes, setCartoes] = useState('');

    useEffect(() => {
        fetch(completeUrl, apiOptions)
            .then(async response => {
                const data = await response.json();

                if (data.hasOwnProperty('mensagem')) {
                    toast(data.mensagem);
                }

                if (response.status == 204) return;

                setCartoes(
                    <div className='row'>
                        {data.map(livro => (
                            <div key={livro.id} className='col-lg-4'>
                                <Cartao
                                    img={{
                                        src: livro.foto,
                                        alt: `Imagem: ${livro.titulo}`
                                    }}
                                    titulo={livro.titulo}
                                />
                            </div>
                        ))}
                    </div>
                )
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <article>
            <h1>Livros Lista Iniciado</h1>
            <div className='container'>
                {cartoes}
            </div>
            <ToastContainer position='bottom-right' />
        </article>
    )
}

export default LivrosLista;