import { parseISO, isValid, format } from 'date-fns';

/**
 * Verifica se uma string fornecida é uma data válida no formato ISO 8601.
 *
 * @param {string} dateString - A string a ser verificada como data.
 * @return {boolean} Retorna `true` se a string for uma data válida no formato ISO 8601, caso contrário `false`.
 * @description Esta função valida se a string de entrada é uma data válida ao analisá-la usando `parseISO` 
 * and checking its format against ISO 8601 patterns (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss).
 */
const isDate = (dateString) => {

    if(typeof(dateString) !== 'string') return false;

    const parsedDate = parseISO(dateString);
    return (
        isValid(parsedDate) &&
        (/^\d{4}-\d{2}-\d{2}$/.test(dateString) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dateString))
    );
}

/**
 * Formata uma string de data para o formato 'dd/MM/yyyy'.
 *
 * @param {string} dateString - A string representando uma data no formato ISO.
 * @return {string|null} A data formatada no formato 'dd/MM/yyyy', ou null se a data for inválida.
 * @description Esta função recebe uma string de data no formato ISO, valida a data e a formata no padrão brasileiro 'dd/MM/yyyy'.
 */
const formatDate = (dateString) => {

    if(!isDate(dateString)) return dateString;

    const parsedDate = parseISO(dateString);
    if (!isValid(parsedDate)) return null;
    return format(parsedDate, 'dd/MM/yyyy');
}

/**
 * Formata uma string de data e hora em um formato legível.
 *
 * @param {string} dateString - A string representando a data e hora a ser formatada.
 * @return {string|null} Retorna a data formatada no formato 'dd/MM/yyyy HH:mm:ss' 
 * ou null se a data fornecida for inválida.
 * @description Esta função recebe uma string de data, valida e formata 
 * para o padrão brasileiro de data e hora.
 */
const formatDatetime = (dateString) => {

    if(!isDate(dateString)) return dateString;
    
    const parsedDate = parseISO(dateString);
    if (!isValid(parsedDate)) return null;
    return format(parsedDate, 'dd/MM/yyyy HH:mm:ss');
}

// Formatador de CNPJ
const formatCNPJ = (cnpj) => {
    if (!cnpj) return '';
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export { isDate, formatDate, formatDatetime, formatCNPJ };