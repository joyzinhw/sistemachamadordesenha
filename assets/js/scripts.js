let senhaAtual = 0;
		let ultimaSenha = 0;
		let senhasAnteriores = [];

		function atualizarSenha() {
			document.getElementById('senhaAtualNumero').innerText = senhaAtual.toString().padStart(2, '0');
			document.getElementById('ultimaSenhaNumero').innerText = ultimaSenha.toString().padStart(2, '0');

			if (senhasAnteriores.length > 3) {
				senhasAnteriores.shift();
			}
			document.getElementById('senhasAnterioresLista').innerText = senhasAnteriores.join(', ');

			var utterance = new SpeechSynthesisUtterance("A senha chamada é " + senhaAtual.toString().padStart(2, '0'));
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
				senhaAtual = parseInt(senhasAnteriores[senhasAnteriores.length - 1]);
				atualizarSenha();
			}
		}

		document.addEventListener('keydown', function(event) {
			if (event.key === "ArrowRight") {
				chamarProximaSenha();
			} else if (event.key === "ArrowLeft") {
				chamarSenhaAnterior();
			}
		});