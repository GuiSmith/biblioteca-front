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

        const response = await fetch(completeUrl, API.apiOptions('POST'));

        const data = await response.json();

        if(response.status == 201){
            return {
                ok: true,
                error: false,
            }
        }
    } catch (error) {

    }
}

export { listarAutores };