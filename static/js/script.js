let customers = [];
let editMode = false;
let currentPage = 1;
const customersPerPage = 5;

const elements = mapElementsByInputs();

const init = () => {
    elements.customerForm.addEventListener('submit', handleFormSubmit);
    
    elements.searchInput.addEventListener('input', () => {
        filterCustomeByName(1, elements.searchInput.value);
    });

    document.querySelectorAll('#customerModal [data-bs-dismiss="modal"]').forEach(button => {
        button.addEventListener('click', () => {
            hideAddressCard();
            elements.customerForm.reset();
        });
    });
 
    document.getElementById('addCustomerBtn').addEventListener('click', () => {
        elements.customerModalLabel.textContent = "Add Customer";
        elements.customerForm.reset();
        editMode = false;
    });

    document.getElementById('loadAddressBtn').addEventListener('click', () => {
        findAddressByZipCode(removeZipCodeMask(elements.customerZipCodeField.value));
    });

    document.getElementById('customerPhone').addEventListener('input', function(event) {
        this.value = applyPhoneMask(event.target.value);
    });

    document.getElementById('customerZipCode').addEventListener('input', function(event) {
        this.value = applyZipCodeMask(event.target.value);
    });
    filterCustomeByName();
};

init();
