function applyZipCodeMask(value) {
    return value
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen
        .substring(0, 9); // Limita o tamanho da string
}

function removeZipCodeMask(value) {
    return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
}

function applyPhoneMask(value) {
    return value
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen
        .substring(0, 15); // Limita o tamanho da string
}

function removePhoneMask(value) {
    return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
}

function formatPhone(value) {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres que não são números
    if (value.length > 11) {
        value = value.substring(0, 11); // Limita a quantidade de dígitos a 11
    }
    if (value.length > 6) {
        return `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
    } else if (value.length > 2) {
        return `(${value.substring(0, 2)}) ${value.substring(2, 7)}`;
    } else {
        return `(${value}`; // Parênteses abertos se for menor que 3 dígitos
    }
}

// Função para formatar CEP no padrão XXXXX-XXX
function formatZipCode(value) {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres que não são números
    if (value.length > 8) {
        value = value.substring(0, 8); // Limita a quantidade de dígitos a 8
    }
    if (value.length > 5) {
        return `${value.substring(0, 5)}-${value.substring(5, 8)}`;
    } else {
        return value; // Caso o valor tenha menos de 6 dígitos
    }
}
