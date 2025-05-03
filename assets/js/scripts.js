// let senhaAtual = 0;
// let ultimaSenha = 0;
// let senhasAnteriores = [];
// let toqueInicio = 0;

// function atualizarSenha() {
//     document.getElementById('senhaAtualNumero').innerText = senhaAtual.toString().padStart(2, '0');
//     document.getElementById('ultimaSenhaNumero').innerText = ultimaSenha.toString().padStart(2, '0');

//     if (senhasAnteriores.length > 3) {
//         senhasAnteriores.shift();
//     }

//     document.getElementById('senhasAnterioresLista').innerText = senhasAnteriores.join(', ');

//     const utterance = new SpeechSynthesisUtterance("A senha chamada é " + senhaAtual.toString().padStart(2, '0'));
//     utterance.lang = "pt-BR";
//     speechSynthesis.speak(utterance);
// }

// function chamarProximaSenha() {
//     ultimaSenha = senhaAtual;
//     senhaAtual++;
//     senhasAnteriores.push(senhaAtual.toString().padStart(2, '0'));
//     atualizarSenha();
// }

// function chamarSenhaAnterior() {
//     if (senhasAnteriores.length > 1) {
//         senhasAnteriores.pop();
//         senhaAtual = parseInt(senhasAnteriores[senhasAnteriores.length - 1]) || 0;
//         atualizarSenha();
//     }
// }

// function chamarComToque() {
//     document.body.addEventListener('touchstart', () => {
//         toqueInicio = Date.now();
//     });

//     document.body.addEventListener('touchend', () => {
//         const duracao = Date.now() - toqueInicio;
//         if (duracao > 1000) {
//             chamarSenhaAnterior();
//         } else {
//             chamarProximaSenha();
//         }
//     });

//     document.body.addEventListener('mousedown', () => {
//         toqueInicio = Date.now();
//     });

//     document.body.addEventListener('mouseup', () => {
//         const duracao = Date.now() - toqueInicio;
//         if (duracao > 1000) {
//             chamarSenhaAnterior();
//         } else {
//             chamarProximaSenha();
//         }
//     });
// }

// // Ativa os controles ao iniciar
// document.addEventListener('DOMContentLoaded', () => {
//     chamarComToque();
// });


let senhaAtual = 0;
let ultimaSenha = 0;
let senhaPrioritariaAtual = 0;
let senhasAnteriores = [];

function atualizarSenha(mensagem = null) {
    document.getElementById('senhaAtualNumero').innerText = senhaAtual.toString().padStart(2, '0');
    document.getElementById('ultimaSenhaNumero').innerText = ultimaSenha.toString().padStart(2, '0');

    if (senhasAnteriores.length > 3) {
        senhasAnteriores.shift();
    }

    document.getElementById('senhasAnterioresLista').innerText = senhasAnteriores.join(', ');

    const texto = mensagem || "A senha chamada é " + senhaAtual.toString().padStart(2, '0');
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    speechSynthesis.speak(utterance);
}

function chamarProximaSenha() {
    ultimaSenha = senhaAtual;
    senhaAtual++;
    senhasAnteriores.push(senhaAtual.toString().padStart(2, '0'));
    atualizarSenha();
}

function chamarSenhaAnterior() {
    if (senhasAnteriores.length > 1) {
        senhasAnteriores.pop();
        senhaAtual = parseInt(senhasAnteriores[senhasAnteriores.length - 1]) || 0;
        atualizarSenha();
    }
}

function chamarSenhaPrioritaria() {
    senhaPrioritariaAtual++;
    const senha = "P" + senhaPrioritariaAtual.toString().padStart(2, '0');
    atualizarSenha("A senha prioritária chamada é " + senha);
}

function chamarComCliqueMouse() {
    document.body.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
            // Botão esquerdo - próxima senha
            chamarProximaSenha();
        } else if (event.button === 2) {
            // Botão direito - senha anterior
            chamarSenhaAnterior();
        }
    });

    document.body.addEventListener('dblclick', (event) => {
        if (event.button === 0) {
            // Clique duplo com botão esquerdo - senha prioritária
            chamarSenhaPrioritaria();
        }
    });

    // Previne o menu de contexto ao clicar com o botão direito
    document.body.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
}

// Ativa os controles ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    chamarComCliqueMouse();
});
