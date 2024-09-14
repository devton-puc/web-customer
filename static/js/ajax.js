const API_BASE_URL = 'http://localhost:5000';

const filterCustomer = async (page = 1, name = '', perPage = 10) => {
    const response = await interceptorFetch(`${API_BASE_URL}/customer/list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, name, per_page: perPage })
    });
    return handleResponse(response);

 }

const createCustomer = async (customerData) => {
    const response = await interceptorFetch(`${API_BASE_URL}/customer/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
    return handleResponse(response);
}

const updateCustomer = async (id, customerData) => {
    const response = await interceptorFetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
    return handleResponse(response);
}

const getCustomerById = async (id) => {
    const response = await interceptorFetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'GET'
    });
    return handleResponse(response);
}

const deleteCustomerById = async (id) => {
    const response = await interceptorFetch(`${API_BASE_URL}/customer/${id}`, {
        method: 'DELETE'
    });
    return handleResponse(response);
}

const getAddressByZipcode = async (zipcode) => {
    const response = await interceptorFetch(`${API_BASE_URL}/customer/zipcode/${zipcode}`,{
            method: 'GET'
    });
    return handleResponse(response);
}

const handleResponse = async (response) => {
    try{
        if (response.status > 300) {            
            const errorBody = await response.json();
            console.log(errorBody)
            throw new MessageError(errorBody,response.status);
        }
        return await response.json();
    }catch(error){
        throw new MessageError(error.message, response.status);
    }finally{
        hideSpinner();
    }
}



class MessageError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}