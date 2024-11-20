document.getElementById("formulario").addEventListener("submit", function (event) {
    const checkboxes = document.querySelectorAll('input[name="tecnologias"]');
    const erroDiv = document.getElementById("erro");
    let algumMarcado = false;

    // Verifica se pelo menos um checkbox está marcado
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            algumMarcado = true;
        }
    });

    if (!algumMarcado) {
        event.preventDefault(); // Impede o envio do formulário
        erroDiv.textContent = "Por favor, selecione pelo menos uma tecnologia:";
    } else {
        erroDiv.textContent = ""; // Limpa a mensagem de erro
    }
});