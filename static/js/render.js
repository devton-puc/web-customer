
const customerModal = new bootstrap.Modal(document.getElementById('customerModal'));

const renderCustomers = () => {
    elements.customerTableBody.innerHTML = customers.map((customer, index) => `
        <tr>
            <td>${(currentPage - 1) * customersPerPage + index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${formatPhone(customer.phone)}</td>
             <td>${customer.age}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="loadCustomerEdit(${customer.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        </tr>
    `).join('');
};

const renderClearCustomers = () => {
    elements.customerTableBody.innerHTML =  `
        <tr>
            <td colspan='6'>Sem dados para consulta.</td>
        </tr>
    `;
    elements.paginationElement.innerHTML = '';
};

const renderPagination = (total, page) => {
    const totalPages = Math.ceil(total / customersPerPage);
    const createPageLink = (label, active = false, disabled = false, onClick = null) => `
        <li class="page-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}">
            <a class="page-link" href="#" ${onClick ? `onclick="${onClick}"` : ''}>${label}</a>
        </li>
    `;

    elements.paginationElement.innerHTML = `
        ${createPageLink('&laquo;', false, page === 1, `filterCustomeByName(${page - 1})`)}
        ${Array.from({ length: totalPages }, (_, i) => createPageLink(i + 1, i + 1 === page, false, `filterCustomeByName(${i + 1})`)).join('')}
        ${createPageLink('&raquo;', false, page === totalPages, `filterCustomeByName(${page + 1})`)}
    `;
};

window.filterCustomeByName = (page = 1, name = '') => {
    filterCustomer(page, name, customersPerPage)
        .then(data => {
            customers = data.customers;
            renderCustomers();
            renderPagination(data.total, data.page);
        })                
        .catch(error => {
            if (error.statusCode === 204){
                renderClearCustomers();
            }else{
                showAlert(`Erro ao consultar o cliente: ${error.message.message}`);
            }               
            
        });
};

const handleFormSubmit = event => {
    event.preventDefault();
    const customerData = mapCustomerElements(elements);

    if (editMode) {
        updateCustomer(elements.customerIdField.value, customerData)
            .then(() => {
                filterCustomeByName(currentPage);
                showAlert('Cliente atualizado com sucesso.');
            })
            .catch(error => {
                showAlert(`Erro ao atualizar o cliente: ${error.message.message}`);
            });        
        editMode = false;
    } else {
        createCustomer(customerData)
            .then(() => {
                filterCustomeByName(currentPage);
                showAlert('Cliente criado com sucesso.');
            })
            .catch(error => {
                showAlert(`Erro ao criar o cliente: ${error.message.message}`); 
            });                
    }
    
    hideCustomerModal();
    elements.customerForm.reset();


};

const showCustomerModal = () => {    
    customerModal.show();
}

const hideCustomerModal = () => {
    hideAddressCard();
    customerModal.hide();
}

const showAddressCard = () => {
    const addressCard = document.getElementById('addressCard');
    addressCard.classList.remove('d-none');
}

const hideAddressCard = () => {
    const addressCard = document.getElementById('addressCard');
    addressCard.classList.add('d-none');
}

window.loadCustomerEdit = id => {
    getCustomerById(id).then(customer => {
        mapElementsCustomer(elements, customer); 
        showAddressCard();
        elements.customerModalLabel.textContent = "Edit Customer";
        editMode = true;
        showCustomerModal();
    })            
    .catch(error => {
        showAlert(`Erro ao buscar o cliente: ${error.message.message}`);    
    });
};

window.deleteCustomer = id => {
    showConfirm('Tem certeza de que deseja excluir este cliente?', () => {
        deleteCustomerById(id)
            .then(() => {
                showAlert('Cliente excluído com sucesso!');
                filterCustomeByName(currentPage);
            })
            .catch(error => {                
                showAlert(`Erro ao excluir o cliente: ${error.message.message}`);                  
            });
    });
};

window.findAddressByZipCode = zicodeData =>{
    getAddressByZipcode(zicodeData)
        .then(data =>{
            mapElementsAddress(elements, data);
            showAddressCard();
    
        })
        .catch(error => {
            showAlert(`Erro ao buscar o Cep: ${error.message.message}`);         
        });
}