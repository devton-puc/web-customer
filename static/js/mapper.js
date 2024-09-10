const mapElementsByInputs = () => {
    return {
        customerTableBody: document.getElementById('customerTableBody'),
        customerForm: document.getElementById('customerForm'),
        customerModalLabel: document.getElementById('customerModalLabel'),
        searchInput: document.getElementById('searchCustomer'),
        paginationElement: document.getElementById('pagination'),
        customerIdField: document.getElementById('customerId'),
        customerNameField: document.getElementById('customerName'),
        customerEmailField: document.getElementById('customerEmail'),
        customerPhoneField: document.getElementById('customerPhone'),
        customerAgeField: document.getElementById('customerAge'),
        zipCodeField: document.getElementById('zipcode'),
        addressField: document.getElementById('address'),
        numberField: document.getElementById('number'),
        neighborhoodField: document.getElementById('neighborhood'),
        cityField: document.getElementById('city'),
        stateField: document.getElementById('state'),
    };
}

const mapElementsCustomer = (elements, customer) => {
    elements.customerIdField.value = customer.id;
    elements.customerNameField.value = customer.name;
    elements.customerEmailField.value = customer.email;
    elements.customerPhoneField.value = customer.phone;
    elements.customerAgeField.value = customer.age;
    elements.addressField.value = customer.address.address;
    elements.cityField.value = customer.address.city;
    elements.neighborhoodField.value = customer.address.neighborhood;
    elements.numberField.value = customer.address.number;
    elements.stateField.value = customer.address.state;
    elements.zipCodeField.value = customer.address.zipcode;
}

const mapElementsAddress = (elements, address) => {
    elements.addressField.value = address.address;
    elements.cityField.value = address.city;
    elements.neighborhoodField.value = address.neighborhood;
    elements.stateField.value = address.state;
}

const mapCustomerElements = (elements) => {
    return {
        name: elements.customerNameField.value,
        email: elements.customerEmailField.value,
        phone: elements.customerPhoneField.value,
        age: elements.customerAgeField.value,
        address: {
            address: elements.addressField.value,
            city: elements.cityField.value,
            neighborhood: elements.neighborhoodField.value,
            number: elements.numberField.value,
            state: elements.stateField.value,
            zipcode: elements.zipCodeField.value
        }
    };
}