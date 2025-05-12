import API from '@servicos/API';

const endpoint = 'livro_autor';

const listarAutores = async (id_livro) => {

    const completeUrl = `${API.apiUrl}/${endpoint}/autores/${id_livro}`;

    const response = await fetch(completeUrl,API.apiOptions('GET'));

    const data = await response.json();

    if(response.status == 200){
        return data.autores;
    }

    return [];
    
};

export { listarAutores };