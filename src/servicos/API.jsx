import Cookies from 'js-cookie';

const apiUrl = `http://localhost:5000`;

const token = Cookies.get('token') || '';

const definirToken = (tokenString) => {
    Cookies.set('token', tokenString);
}

const apiOptions = (apiMethod, apiBody = {}) => {
    const obj = {
        method: apiMethod, // Já informado no início da função
        headers: {
            'Content-Type': 'application/json',
        }
    }
    
    if(token.length > 0){
        obj.headers['Authorization'] = `Bearer ${token}`;
    }   

    if(!['GET','DELETE'].includes(apiMethod)){
        const strippedApiBody = Object.fromEntries(
            Object.entries(apiBody).filter(([key,value]) => value ?? false)
        );
        if(Object.keys(strippedApiBody).length == 0){
            return null;
        }else{
            obj.body = JSON.stringify(strippedApiBody);
        }
    }
    return obj;
}

export default { apiUrl, token, definirToken, apiOptions };