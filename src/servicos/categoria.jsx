import API from '@servicos/API';

const endpoint = 'categoria';

const listarCategorias = async () => {

    const completeUrl = `${API.apiUrl}/${endpoint}`;
    const response = await fetch(completeUrl,API.apiOptions('GET'));
    const data = await response.json();

    if(response.status == 200){
        return data;
    }

    return [];
    
};

export { listarCategorias };