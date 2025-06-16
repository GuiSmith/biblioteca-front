// Bibliotecas
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Serviços
import API from "@servicos/API";

// Componentes | UI
import BotaoLink from "@componentes/BotaoLink";

// Utilitários
import { formatCNPJ } from "@utils/formatadores";

const EditoraLista = () => {

    const [editoras, setEditoras] = useState([]);
    const navigate = useNavigate();

    const colunas = {
        id: 'ID',
        nome: 'Nome',
        cnpj: 'CNPJ',
    };

    const formatCell = (key, valor) => {
        if(key == 'cnpj') {
            return formatCNPJ(valor);
        }

        return valor;
    };

    // Editoras
    useEffect(() => {
        // Editoras
        API.listar('editora')
            .then(responseEditora => {
                if (responseEditora.ok) {
                    setEditoras(responseEditora.array);
                    return;
                }
                if (responseEditora.error) {
                    toast.error('Erro ao listar editoras');
                    return;
                }
                if (responseEditora.ok === false && responseEditora.error === false) {
                    toast.warning(responseEditora.mensagem);
                    return;
                }
            })
            .catch(error => toast.error('Erro ao listar editoras'));
    }, []);

    return (
        <article className='container-fluid'>
            <h2 className="text-center">Editoras</h2>
            <div className='d-flex flex-wrap justify-content-start gap-2 mb-3 mt-3'>
                <BotaoLink label='Nova' to='/editora/form/novo' className='btn-primary' />
            </div>
            <article className='table-container table-responsive'>
                {!editoras.length
                    ? <p className="text-center">Carregando...</p>
                    : (
                        <table className="table table-striped table-dark table-hover">
                            <thead>
                                <tr>
                                    {Object.keys(colunas).map((coluna, index) => (
                                        <th key={index}>{colunas[coluna]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {editoras.map(editora => (
                                    <tr key={editora.id} onClick={() => navigate(`/editora/view/${editora.id}`)}>
                                        {Object.keys(colunas).map((coluna, index) => (
                                            <td key={index}>
                                                {formatCell(coluna, editora[coluna])}
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

export default EditoraLista;