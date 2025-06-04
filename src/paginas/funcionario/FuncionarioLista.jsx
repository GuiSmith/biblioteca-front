// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Serviços
import API from "@servicos/API";
import funcionarioService from '@servicos/funcionario';

// Componentes | UI
import BotaoLink from "@componentes/BotaoLink";

const FuncionarioLista = () => {

    const [funcionarios, setFuncionarios] = useState([]);
    const navigate = useNavigate();

    // Funcionários
    useEffect(() => {
        // Funcionários
        API.listar('funcionario')
            .then(responseFuncionario => {
                if (responseFuncionario.ok) {
                    setFuncionarios(responseFuncionario.array);
                    return;
                }
                if (responseFuncionario.error) {
                    toast.error('Erro ao listar funcionários');
                    return;
                }
                if (responseFuncionario.ok === false && responseFuncionario.error === false) {
                    toast.warning(responseFuncionario.mensagem);
                    return;
                }
            })
            .catch(error => toast.error('Erro ao listar funcionários'));
    }, []);

    return (
        <article className='container-fluid'>
            <h1>Lista de Funcionários</h1>
            <div className='d-flex flex-wrap justify-content-start gap-2 mb-3 mt-3'>
                <BotaoLink label='Novo' to='/funcionario/form/novo' className='btn-primary' />
            </div>
            <article className='table-container'>
                {!funcionarios.length
                    ? <p className="text-center">Carregando...</p>
                    : (
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    {Object.keys(funcionarioService.colunas).map((coluna, index) => (
                                        <th key={index}>{funcionarioService.colunas[coluna]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {funcionarios.map(funcionario => (
                                    <tr key={funcionario.id} onClick={() => navigate(`/funcionario/form/${funcionario.id}`)}>
                                        {Object.keys(funcionarioService.colunas).map((coluna, index) => (
                                            <td key={index}>
                                                {funcionarioService.formatCell(coluna, funcionario[coluna])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </article>
            <ToastContainer />
        </article>
    );
}

export default FuncionarioLista;