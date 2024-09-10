const API_BASE_URL = 'http://localhost:5000';

//filtra pelo nome
async function filterCustomer(page = 1, name = '', perPage = 10) {
    const response = await fetch(`${API_BASE_URL}/customer/list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, name, per_page: perPage })
    });
    return await response.json();
}

// Cria um novo cliente
async function createCustomer(customerData) {
    const response = await fetch(`${API_BASE_URL}/customer/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
    return await response.json();
}

// Atualiza o Cliente
async function updateCustomer(id, customerData) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
    return await response.json();
}

// Obtém o cliente pelo ID
async function getCustomerById(id) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'GET'
    });
    return await response.json();
}

// Exclui o Cliente pelo ID
async function deleteCustomerById(id) {
    const response = await fetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}



// Retorna os dados de endereço pelo CEP
async function getAddressByZipcode(zipcode) {
    const response = await fetch(`${API_BASE_URL}/customer/zipcode/${zipcode}`,{
            method: 'GET'
    });
    return await response.json();
}
