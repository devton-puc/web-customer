

// Render customers in the table
const renderCustomers = () => {
    elements.customerTableBody.innerHTML = customers.map((customer, index) => `
        <tr>
            <td>${(currentPage - 1) * customersPerPage + index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
             <td>${customer.age}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="loadCustomerEdit(${customer.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        </tr>
    `).join('');
};

// Render pagination controls
const renderPagination = (total, page) => {
    const totalPages = Math.ceil(total / customersPerPage);
    const createPageLink = (label, active = false, disabled = false, onClick = null) => `
        <li class="page-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}">
            <a class="page-link" href="#" ${onClick ? `onclick="${onClick}"` : ''}>${label}</a>
        </li>
    `;

    elements.paginationElement.innerHTML = `
        ${createPageLink('&laquo;', false, page === 1, `fetchAndRenderCustomers(${page - 1})`)}
        ${Array.from({ length: totalPages }, (_, i) => createPageLink(i + 1, i + 1 === page, false, `fetchAndRenderCustomers(${i + 1})`)).join('')}
        ${createPageLink('&raquo;', false, page === totalPages, `fetchAndRenderCustomers(${page + 1})`)}
    `;
};

// Fetch and render customers
window.fetchAndRenderCustomers = (page = 1, name = '') => {
    filterCustomer(page, name, customersPerPage)
        .then(data => {
            customers = data.customers;
            renderCustomers();
            renderPagination(data.total, data.page);
        })                
        .catch(error => {
            showAlert('Erro ao consultar o cliente: ' + error.data.message);       
        });
};

// Handle form submission (add/edit customer)
const handleFormSubmit = event => {
    event.preventDefault();
    const customerData = mapCustomerElements(elements);

    if (editMode) {
        updateCustomer(elements.customerIdField.value, customerData)
            .then(() => {
                fetchAndRenderCustomers(currentPage);
                showAlert('Cliente atualizado com sucesso!');
            })
            .catch(error => {
                showAlert('Erro ao atualizar o cliente: ' +error.data.message);           
            });

        editMode = false;
    } else {
        createCustomer(customerData)
            .then(() => {
                fetchAndRenderCustomers(currentPage);
                showAlert('Cliente criado com sucesso!');
            })
            .catch(error => {
                showAlert('Erro ao criar o cliente: ' +error.data.message);         
            });                
    }

    $('#customerModal').modal('hide');
    elements.customerForm.reset();
};

// Edit customer
window.loadCustomerEdit = id => {
    getCustomerById(id).then(customer => {
        mapElementsCustomer(elements, customer); 
        elements.customerModalLabel.textContent = "Edit Customer";
        editMode = true;
        $('#customerModal').modal('show');
    })            
    .catch(error => {
        showAlert('Erro ao buscar o cliente: ' + error.data.message);          
    });
};

// Delete customer
window.deleteCustomer = id => {
    showConfirm('Tem certeza de que deseja excluir este cliente?', () => {
        deleteCustomerById(id)
            .then(() => {
                showAlert('Cliente excluído com sucesso!');
                fetchAndRenderCustomers(currentPage);
            })
            .catch(error => {                
                showAlert('Erro ao excluir o cliente: ' + error.data.message);                  
            });
    });
};

window.findAddressByZipCode = zicodeData =>{
    getAddressByZipcode(zicodeData)
        .then(data =>{
            mapElementsAddress(elements, data);
    
        })
        .catch(error => {
            console.log(JSON.stringify(error));
            if (error instanceof MessageError)
                showAlert('Erro ao buscar o Cep: ' + error.message.message); 
            else{
                console.log(`Erro ao buscar o Cep: ${error}`)
            }             
        });
}