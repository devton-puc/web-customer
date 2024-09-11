const API_BASE_URL = 'http://localhost:5000';

//filtra pelo nome
async function filterCustomer(page = 1, name = '', perPage = 10) {
    const response = await fetch(`${API_BASE_URL}/customer/list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, name, per_page: perPage })
    });
    return handleErrors(response);
}

// Cria um novo cliente
async function createCustomer(customerData) {
    const response = await fetch(`${API_BASE_URL}/customer/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
    return handleErrors(response);
}

// Atualiza o Cliente
async function updateCustomer(id, customerData) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
    return handleErrors(response);
}

// Obtém o cliente pelo ID
async function getCustomerById(id) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'GET'
    });
    return handleErrors(response);
}

// Exclui o Cliente pelo ID
async function deleteCustomerById(id) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'DELETE'
    });
    return handleErrors(response);
}



// Retorna os dados de endereço pelo CEP
async function getAddressByZipcode(zipcode) {
    const response = await fetch(`${API_BASE_URL}/customer/zipcode/${zipcode}`,{
            method: 'GET'
    });
    return handleErrors(response);
}

//handler para tratamentos de erros, para forçar cair no metodo catch. 
async function handleErrors(response) {
    try{
        if (response.status > 300) {            
            const errorBody = await response.json();
            console.log(errorBody)
            throw new MessageError(errorBody,response.status);
        }
        return await response.json();
    }catch(error){
        throw new MessageError(error.message, response.status);
    }
}


class MessageError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}