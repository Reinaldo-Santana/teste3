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


// Função para capitalizar palavras
function capitalizeWords(input) {
    input.value = input.value.replace(/\b(\p{L})(\p{L}*)/gu, (match, firstLetter, restOfWord) => {
        return firstLetter.toUpperCase() + restOfWord.toLowerCase();
    });
}

// Função para forçar a revalidação
function forceValidation(input) {
    const regex = /^[A-Za-zÀ-ÿ\s'-]*$/; // Mesmo pattern do HTML
    if (!regex.test(input.value)) {
        input.setCustomValidity("Insira apenas letras, espaços, apóstrofos ou hifens.");
    } else {
        input.setCustomValidity(""); // Campo válido
    }
}

// Seleciona os campos
const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');

// Aplica a capitalização e força a validação durante a digitação
[nomeInput, sobrenomeInput].forEach(input => {
    input.addEventListener('input', () => {
        capitalizeWords(input);
        forceValidation(input);
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


document.addEventListener("input", () => {
    const form = document.getElementById("formulario");
    const button = document.querySelector(".btn");
    
    // Verifica se o formulário é válido e se pelo menos uma tecnologia foi selecionada
    const tecnologiasSelecionadas = Array.from(form.querySelectorAll("input[name='tecnologias']:checked")).length > 0;
    const isValid = form.checkValidity() && tecnologiasSelecionadas;

    // Alterna a visibilidade do botão
    button.style.opacity = isValid ? "1" : "0.2";
    button.style.pointerEvents = isValid ? "auto" : "none";
});