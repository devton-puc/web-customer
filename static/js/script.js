let customers = [];
let editMode = false;
let currentPage = 1;
const customersPerPage = 3;

const elements = mapElementsByInputs();

const init = () => {
    elements.customerForm.addEventListener('submit', handleFormSubmit);
    elements.searchInput.addEventListener('input', () => fetchAndRenderCustomers(1, elements.searchInput.value));
    document.getElementById('addCustomerBtn').addEventListener('click', () => {
        elements.customerModalLabel.textContent = "Add Customer";
        elements.customerForm.reset();
        editMode = false;
    });
    document.getElementById('loadAddressBtn').addEventListener('click', () => {
        findAddressByZipCode(elements.zipCodeField.value);
    });
    fetchAndRenderCustomers();
};

init();
