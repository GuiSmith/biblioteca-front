import API from '@servicos/API';

const endpoint = 'categoria';

const listarCategorias = async () => {

    const completeUrl = `${API.apiUrl}/${endpoint}`;
    const response = await fetch(completeUrl,API.apiOptions('GET'));
    const data = response.status == 200 ? await response.json() : [];

    return data;
    
};

export { listarCategorias };