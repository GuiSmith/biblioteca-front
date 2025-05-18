import API from '@servicos/API';

const endpoint = 'livro';

const selecionarLivro = async (id = undefined) => {

    if (id === undefined) {
        console.error('ID não informado ao selecionar livro!');
        return {};
    }

    const completeUrl = `${API.apiUrl}/${endpoint}/${id}`;
    const response = await fetch(completeUrl, API.apiOptions('GET'));
    const data = await response.json();

    if (response.status == 200) {
        return data;
    }

    return {};

};

const deletarLivro = async (id) => {
    try {
        if (!id) return;

        const response = await fetch(`${API.apiUrl}/${endpoint}/${id}`, API.apiOptions('DELETE'));
        const data = await response.json();

        if (response.status == 200) {
            return {
                ok: true,
                error: false,
                mensagem: ''
            };
        }

        return {
            ok: false,
            error: false,
            mensagem: data.mensagem
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: true,
            mensagem: error.message
        };
    }
};

export { selecionarLivro, deletarLivro };