import Cookies from 'js-cookie';

const ip = window.location.hostname;

const apiUrl = `http://${ip}:5000`;

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

/**
 * Realiza uma busca na API com base nos filtros fornecidos.
 * 
 * @function
 * @async
 * @param {string} tabela - Nome da tabela (endpoint) a ser consultada.
 * @param {Object.<string, {op: string, valor: string|number|boolean}>} filtrosObj - Objeto contendo os filtros no formato:
 *   {
 *     coluna: {
 *       op: 'operador',
 *       valor: 'valor'
 *     },
 *     ...
 *   }
 * Exemplo:
 *   {
 *     nome: { op: 'like', valor: 'mundo' },
 *     ativo: { op: '=', valor: true }
 *   }
 *
 * @returns {Promise<Object>} Um objeto com os seguintes campos:
 * @property {boolean} ok - Indica se a busca retornou dados com sucesso (status 200).
 * @property {boolean} error - Indica se houve erro na requisição.
 * @property {Array} array - Os dados retornados da API.
 * @property {string} mensagem - Mensagem de erro ou status, se aplicável.
 */
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

        if (response.status == 200) {
            return {
                ok: true,
                error: false,
                array: data,
                mensagem: ``,
            };
        }

        if (response.status == 204) {
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
};

export default { apiUrl, token, definirToken, apiOptions, auth, definirAuthType, authType, search };