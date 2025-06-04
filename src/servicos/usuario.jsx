import { format } from 'date-fns';

const colunas = {
    id: 'ID',
    ativo: 'Ativo',
    nome: 'Nome',
    cpf: 'CPF',
    email: 'E-mail',
    data_nascimento: 'Data Nascimento',
};

const formatCell = (key, value) => {
    if (key === 'data_nascimento') {
        return value ? format(new Date(value), 'dd/MM/yyyy') : '';
    }
    if (key === 'ativo') {
        return value ? 'Sim' : 'Não';
    }
    return value;
};

export default { colunas, formatCell };