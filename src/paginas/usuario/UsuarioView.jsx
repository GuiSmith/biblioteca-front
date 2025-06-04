// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Serviços
import API from "@servicos/API";
import usuarioService from '@servicos/usuario';

// Componentes
import BotaoLink from "@componentes/BotaoLink";

const UsuarioView = () => {
    const { id } = useParams();

    if (!id) {
        useNavigate('/usuarios');
    }

    const endpoint = `usuario`;
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({});

    // Buscar Usuário
    useEffect(() => {
        API.selecionar(endpoint, id)
            .then(response => {
                // Erro
                if (response.error) {
                    toast.error('Erro ao listar usuário');
                    return;
                }

                // Aviso
                if (!response.ok && !response.error) {
                    toast.warning(response.mensagem);
                }

                // OK
                if (response.ok) {
                    setUsuario(response.data);
                }
            });
    }, [id]);

    const handleDelete = () => {
        API.deletar(endpoint, id)
            .then(response => {
                // Erro
                if (response.error) {
                    toast.error('Erro ao deletar usuário');
                    return;
                }
                // Aviso
                if (!response.ok && !response.error) {
                    toast.warning(response.mensagem);
                    return;
                }
                // OK
                if (response.ok) {
                    toast.success('Usuário deletado com sucesso');
                    navigate('/usuarios');
                }
            }
            )
            .catch(error => {
                toast.error('Erro ao deletar usuário');
            });
    };

    const botoes = [
        {
            auth: true,
            jsx: <BotaoLink key='botao-novo' label='Novo' to='/usuario/form/novo' className='btn-primary' />,
        },
        {
            auth: true,
            jsx: <BotaoLink key='botao-editar' label='Editar' to={`/usuario/form/${id}`} className='btn-dark' />
        },
        {
            auth: false,
            jsx: <BotaoLink key='botao-listar' label='Listar' to='/usuarios' className='btn-secondary' />
        },
    ];

    return (
        <article className="container">
            <div className="alert alert-success text-dark p-3">
                <h1 className="text-center">
                    {usuario ? usuario.nome : 'Carregando...'}
                </h1>
                {/* Dados */}
                {usuario && (
                    <ul>
                        {Object.entries(usuarioService.colunas).map(([coluna, nomeFormatado]) => (
                            <li key={coluna}>
                                <strong>{nomeFormatado}:</strong> {usuario[coluna]}
                            </li>
                        ))}
                    </ul>
                )}
                {/* Botões */}
                <div className="d-flex flex-wrap justify-content-start gap-2 mb-3 mt-3">
                    {botoes.map(botao => botao.jsx)}
                </div>

            </div>
        </article>
    )

};

export default UsuarioView;