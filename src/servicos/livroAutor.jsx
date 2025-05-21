import API from '@servicos/API';

const endpoint = 'livro_autor';

const listarAutores = async (id_livro) => {

    const completeUrl = `${API.apiUrl}/${endpoint}/autores/${id_livro}`;

    const response = await fetch(completeUrl, API.apiOptions('GET'));

    const data = await response.json();

    if (response.status == 200) {
        return data.autores;
    }

    return [];

};

const inserirLivroAutor = async ({ id_livro, id_autor }) => {
    try {
        const completeUrl = `${API.apiUrl}/${endpoint}`;

        const response = await fetch(completeUrl, API.apiOptions('POST', { id_livro, id_autor }));

        const data = await response.json();

        // Se deu certo
        if (response.status == 201) {
            return {
                ok: true,
                error: false,
                mensagem: ``
            };
        }

        // Se deu erro
        if (response.status == 500) {
            return {
                ok: false,
                error: true,
                mensagem: data.mensagem
            };
        }

        // Se não foi inserido
        return {
            ok: false,
            error: false,
            mensagem: data.mensagem
        }
    } catch (error) {
        console.error(`Erro ao inserir livroAutor`, error);
        return {
            ok: false,
            error: true,
            mensagem: error.message
        };
    }
};

const excluirlivroAutor = async ({ id_livro, id_autor }) => {
    try {

        // Buscando registro de livroAutor
        const buscarLivroAutorResponse = await API.search(endpoint,{
            id_livro: { op: 'eq', valor: id_livro },
            id_autor: { op: 'eq', valor: id_autor },
        });

        // Se houve erro na busca
        if(buscarLivroAutorResponse.error === true){
            return {
                ok: false,
                error: true,
                mensagem: ''
            };
        }

        // Se não houve erro, mas não encontrou
        if(buscarLivroAutorResponse.error === false && buscarLivroAutorResponse.ok === false){
            return {
                ok: false,
                error: false,
                mensagem: buscarLivroAutorResponse.mensagem
            };
        }

        // Se deu tudo certo
        const registroLivroAutor = buscarLivroAutorResponse.array[0];

        const completeUrl = `${API.apiUrl}/${endpoint}/${registroLivroAutor.id}`;

        const excluirlivroAutorResponse = await fetch(completeUrl,API.apiOptions('DELETE'));

        const excluirlivroAutorData = excluirlivroAutorResponse.json();

        // Se houve erro
        if(excluirlivroAutorResponse.status === 500){
            return {
                ok: false,
                error: true,
                mensagem: excluirlivroAutorData.mensagem,
            };
        }
        
        // Se deu tudo certo
        if(excluirlivroAutorResponse.status == 200){
            return {
                ok: true,
                error: false,
                mensagem: ''
            }
        }

        // Se não houve erro, mas não deu certo
        return {
            ok: false,
            error: false,
            mensagem: excluirlivroAutorData.mensagem
        };
    } catch (error) {
        console.error('Erro ao excluir livroAutor', error);
        return {
            ok: false,
            error: true,
            mensagem: error.message
        }
    }
}

export { listarAutores, inserirLivroAutor, excluirlivroAutor };