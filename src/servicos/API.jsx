import Cookies from 'js-cookie';

const apiUrl = `http://localhost:5000`;

const token = Cookies.get('token') || '';
const authType = Cookies.get('authType') || undefined;

const definirToken = (tokenString) => {
    Cookies.set('token', tokenString);
}

const definirAuthType = (authTypeString) => {
    Cookies.set('authType', authTypeString)
}

const apiOptions = (apiMethod, apiBody = {}) => {
    const obj = {
        method: apiMethod, // Já informado no início da função
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (token.length > 0) {
        obj.headers['Authorization'] = `Bearer ${token}`;
    }

    if (!['GET', 'DELETE'].includes(apiMethod)) {
        const strippedApiBody = Object.fromEntries(
            Object.entries(apiBody).filter(([key, value]) => value ?? false)
        );
        if (Object.keys(strippedApiBody).length == 0) {
            return null;
        } else {
            obj.body = JSON.stringify(strippedApiBody);
        }
    }
    return obj;
}

const auth = async () => {
    const endpoint = 'tabelas';

    const response = await fetch(`${apiUrl}/${endpoint}`, apiOptions('GET'));
    const responseCode = response.status.toString();

    if (responseCode.charAt(0) == 4) {
        return {
            ok: false,
            error: false,
            mensagem: 'Usuário não autenticado',
        };
    }

    if (responseCode == 200) {
        return {
            ok: true,
            error: false,
            mensagem: 'Usuário autenticado'
        }
    }

    if (responseCode.charAt(0) == 5) {
        return {
            ok: false,
            error: true,
            mensagem: response.mensagem
        }
    }
};

const search = async (tabela, filtrosObj) => {
    const estrutura = {
        coluna: {
            op: 'like',
            valor: 'mundo'
        }
    };

    try {
        const filtrosArray = Object.entries(filtrosObj).map(([coluna, params]) => `${coluna}=${params.op}:${params.valor}`);
        const filtrosUrl = filtrosArray.join('&');

        const completeUrl = `${apiUrl}/${tabela}?${filtrosUrl}`;
        const encodedUrl = encodeURI(completeUrl);

        const response = await fetch(encodedUrl, apiOptions('GET'));
        const data = response.status !== 204 ? await response.json() : {};

        if(response.status == 200){
            return {
                ok: true,
                error: false,
                array: data,
                mensagem: ``,
            };
        }

        if(response.status == 204){
            return {
                ok: false,
                error: false,
                array: [],
                mensagem: ``,
            };
        }

        return {
            ok: false,
            error: true,
            array: [],
            mensagem: data.mensagem
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: true,
            array: [],
            mensagem: error.message
        };
    }
}

export default { apiUrl, token, definirToken, apiOptions, auth, definirAuthType, authType, search };