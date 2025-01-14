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

// Função para forçar a revalidação
function forceValidation(input) {
    const regex = /^[A-Za-zÀ-ÿ\s'-]*$/; // Mesmo pattern do HTML
    if (!regex.test(input.value)) {
        input.setCustomValidity("Insira apenas letras, espaços, apóstrofos ou hifens.");
    } else {
        input.setCustomValidity(""); // Campo válido
    }
    input.reportValidity(); // Exibe a mensagem de erro personalizada (se houver)
}



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


document.addEventListener("input", (event) => {
    const form = document.getElementById("formulario");
    const button = document.querySelector(".form-button");
    const textarea = document.getElementById("experiencia");

    // Verifica se o evento de input ocorreu no campo <textarea>
    if (event.target === textarea) {
        const text = textarea.value;

        // Ajusta a primeira letra para maiúscula sem interferir na validação
        if (text.length > 0) {
            const caretPosition = textarea.selectionStart; // Salva a posição do cursor
            const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
            textarea.value = formattedText;

            // Restaura a posição do cursor para evitar problemas ao digitar
            textarea.setSelectionRange(caretPosition, caretPosition);
        }
    }

    // Verifica se o formulário é válido e se pelo menos uma tecnologia foi selecionada
    const tecnologiasSelecionadas = Array.from(
        form.querySelectorAll("input[name='tecnologias']:checked")
    ).length > 0;

    const isValid =
        form.checkValidity() &&
        tecnologiasSelecionadas &&
        textarea.value.length >= parseInt(textarea.getAttribute("minlength"), 10);

    // Alterna a visibilidade do botão
    button.style.opacity = isValid ? "1" : "0.2";
    button.style.pointerEvents = isValid ? "auto" : "none";
});