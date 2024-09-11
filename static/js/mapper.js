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
        customerGenderField: document.getElementById('customerGender'),
        customerAgeField: document.getElementById('customerAge'),
        customerZipCodeField: document.getElementById('customerZipCode'),
        customerAddressField: document.getElementById('customerAddress'),
        customerNumberField: document.getElementById('customerNumber'),
        customerNeighborhoodField: document.getElementById('customerNeighborhood'),
        customerCityField: document.getElementById('customerCity'),
        customerStateField: document.getElementById('customerState'),
    };
}

const mapElementsCustomer = (elements, customer) => {
    elements.customerIdField.value = customer.id;
    elements.customerNameField.value = customer.name;
    elements.customerEmailField.value = customer.email;
    elements.customerPhoneField.value = formatPhone(customer.phone);
    elements.customerGenderField.value = customer.gender;
    elements.customerAgeField.value = customer.age;
    elements.customerAddressField.value = customer.address.address;
    elements.customerCityField.value = customer.address.city;
    elements.customerNeighborhoodField.value = customer.address.neighborhood;
    elements.customerNumberField.value = customer.address.number;
    elements.customerStateField.value = customer.address.state;
    elements.customerZipCodeField.value = formatZipCode(customer.address.zipcode);
}

const mapElementsAddress = (elements, address) => {
    elements.customerAddressField.value = address.address;
    elements.customerCityField.value = address.city;
    elements.customerNeighborhoodField.value = address.neighborhood;
    elements.customerStateField.value = address.state;
}

const mapCustomerElements = (elements) => {
    return {
        name: elements.customerNameField.value,
        email: elements.customerEmailField.value,
        phone: removePhoneMask(elements.customerPhoneField.value),
        gender: elements.customerGenderField.value,
        age: elements.customerAgeField.value,
        address: {
            address: elements.customerAddressField.value,
            city: elements.customerCityField.value,
            neighborhood: elements.customerNeighborhoodField.value,
            number: elements.customerNumberField.value,
            state: elements.customerStateField.value,
            zipcode: removeZipCodeMask(elements.customerZipCodeField.value)
        }
    };
}