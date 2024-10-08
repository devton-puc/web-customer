// Função para exibir o modal de alerta
const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));

function showAlert(message) {
    document.getElementById('alertModalMessage').textContent = message;    
    alertModal.show();
}

// Função para exibir o modal de confirmação
function showConfirm(message, onConfirm) {
    document.getElementById('confirmModalMessage').textContent = message;
    const confirmButton = document.getElementById('confirmModalYesButton');    

    // Remover qualquer evento de clique anterior
    confirmButton.onclick = null;

    // Adicionar evento de clique para confirmar a ação
    confirmButton.onclick = () => {        
        confirmModal.hide();
        onConfirm();
    };

    confirmModal.show();
}
