// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

//Serviços
import API from '@servicos/API';

// Componentes
import BotaoLink from '@componentes/BotaoLink';

const CategoriaLista = () => {

    const [categorias, setCategorias] = useState([]);

    const colunas = {
        id: 'ID',
        nome: 'Nome',
    };

    const navigate = useNavigate();

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

    return (
        <section className="container">
            <h1 className="text-center">Categorias</h1>
            <div className="d-flex flex-wrap justify-content-start gap-2 mb-3 mt-3">
                <BotaoLink label='Novo' to='/categoria/form/novo' className='btn-primary' />
            </div>
            <article className="table-container">
                {!categorias
                    ? <p className="text-center">Carregando...</p>
                    : (
                        <table className="table table-stripped table-dark">
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