document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});


document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.checkValidity() === false) {
            // Reinicia a animação
            input.style.animation = 'none';
            // Força a reativação da animação
            setTimeout(() => {
                input.style.animation = '';
            }, 0);
        }
    });
});

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

document.querySelectorAll('input[name="tecnologias"]').forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        const erroDiv = document.getElementById("erro");
        const algumMarcado = document.querySelectorAll('input[name="tecnologias"]:checked').length > 0;

        if (algumMarcado) {
            erroDiv.textContent = ""; // Remove a mensagem de erro
        } else {
            erroDiv.textContent = "Por favor, selecione pelo menos uma tecnologia:"; // Mostra a mensagem de erro
        }
    });
});

