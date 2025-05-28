// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

//Serviços
import API from '@servicos/API';

// Componentes
import BotaoLink from '@componentes/BotaoLink';

const CategoriaLista = () => {

    const auth = API.auth();

    const [categorias, setCategorias] = useState([]);

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

    return (
        <section className="container-fluid">
            <h1 className="text-center">Categorias</h1>
            <div className="d-flex flex-wrap justify-content-start gap-2 mb-3 mt-3">
                {auth === true
                    ? <BotaoLink label='Novo' to='/categoria/form/novo' className='btn-primary' />
                    : ''}
            </div>
            <article className="d-flex flex-wrap justify-content-start gap-2">
                {categorias && (
                    categorias.map(categoria => (
                        <div key={categoria.id} id={categoria.id} className="card">
                            <div className="card-body">
                                <h5 className='card-title'>{categoria.nome}</h5>
                                <p className="card-text">
                                    {categoria.descricao ? (categoria.descricao.slice(0, 37) + '...') : ''}
                                </p>
                                <div className="d-flex flex-wrap justify-content-start gap-2">
                                    <BotaoLink label='Detalhes' to={`/categoria/view/${categoria.id}`} className='btn-dark' />
                                    <BotaoLink label='Livros' to={`/categoria/view/${categoria.id}#livros`} className='btn-success' />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </article>
        </section>
    )
};

export default CategoriaLista;