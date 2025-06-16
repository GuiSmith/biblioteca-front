// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Contextos
import { useAuth } from '@contextos/AuthContexto';

// Serviços
import API from '@servicos/API';

// Componentes | UI
import BotaoLink from '@componentes/BotaoLink';
import LivroCartao from '@ui/LivroCartao';

const EditoraView = () => {

    const { id } = useParams();

    if (!id) useNavigate('/editoras');

    const endpoint = 'editora';
    const navigate = useNavigate();
    const { isAuthenticated, contextAuthType } = useAuth();

    const [editora, setEditora] = useState({});
    const [livros, setLivros] = useState(null);

    // Selecionando editora
    useEffect(() => {
        API.selecionar(endpoint, id)
            .then(response => {
                // Error
                if (response.error) {
                    toast.error('Erro ao selecionar editora');
                    return;
                }

                // Aviso
                if (!response.ok && !response.error) {
                    toast.warning(response.warning);
                }

                // OK
                if (response.ok) {
                    setEditora(response.data);
                }
            })
    }, []);

    // Buscar livros
    useEffect(() => {
        if (!editora.id) return;

        const completeUrl = `${API.apiUrl}/editora/${editora.id}/livros`;

        fetch(completeUrl, API.apiOptions('GET'))
            .then(async response => {
                if (response.status == 500) {
                    toast.error('Erro interno de servidor ao listar livros');
                    return;
                }

                if (response.status == 204) {
                    setLivros([]);
                    return;
                }

                const data = await response.json();

                if (response.status == 200) {
                    setLivros(data);
                    console.log(data);
                }
            })
            .catch(error => {
                toast.error('Erro ao listar livros');
                console.error('Erro ao listar livros', error);
            })

    }, [editora]);

    const handleDelete = async () => {
        try {
            if (!id) return;

            if (!confirm("Deseja mesmo excluir este registro?")) {
                return;
            }

            const responseDelete = await API.deletar(endpoint, id);

            //Erro
            if (responseDelete.error) {
                toast.error("Erro ao deletar editora");
                return;
            }

            // Sem sucesso
            if (!responseDelete.error && !responseDelete.ok) {
                toast.warning(responseDelete.mensagem);
                return;
            }

            // OK
            if (responseDelete.ok) {
                toast.success('Editora deletada com sucesso!');
                navigate('/categorias');
            }

        } catch (error) {
            console.error(error);
            toast.error('Erro ao deletar editora');
        }
    }

    const botoes = [
        {
            auth: true,
            jsx: <BotaoLink key='botao-novo' label='Novo' to='/editora/form/novo' className='btn-primary' />,
        },
        {
            auth: true,
            jsx: <BotaoLink key='botao-editar' label='Editar' to={`/editora/form/${id}`} className='btn-dark' />
        },
        {
            auth: false,
            jsx: <BotaoLink key='botao-listar' label='Listar' to='/editoras' className='btn-secondary' />
        },
        {
            auth: true,
            jsx: <button key='botao-deletar' type="button" className="btn btn-danger" onClick={handleDelete}>Deletar</button>
        }
    ];

    if (!editora.id) {
        return <h1 className="text-center">Carregando...</h1>;
    }

    return (
        <article className="container">
            <div className="alert alert-primary text-dark p-3">
                <h1 className="text-center">{editora.nome}</h1>
                <p>CNPJ: {editora.cnpj}</p>
                {/* Botões */}
                <div className="d-flex flex-wrap justify-content-start gap-2">
                    {botoes && (
                        botoes.map((botao, index) => (!botao.auth || (botao.auth && isAuthenticated && contextAuthType == 'funcionario')) ? <span key={index}>{botao.jsx}</span> : '')
                    )}
                    {/* {botoes.map(botao => botao.jsx)} */}
                </div>
            </div>
            {/* Livros */}
            <div className="">
                <h2 className="text-center">Livros</h2>
                <div className="d-flex flex-wrap justify-content-start gap-3">
                    {livros == null
                        ? <p>Carregando...</p>
                        : livros.length === 0
                            ? <p>Nenhum exemplar cadastrado para esta editora</p>
                            : livros.map((livro) => <LivroCartao key={livro.id} livro={livro} />)
                    }
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </article>
    )
};

export default EditoraView;