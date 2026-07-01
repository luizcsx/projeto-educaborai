        const launchDate = new Date('July 10, 2026 15:10:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const difference = launchDate - now;

            if (difference <= 0) {
                clearInterval(countdownInterval);
                
                document.getElementById('countdownTitle').innerText = "Estamos preparando algumas coisas!";
                document.getElementById('timerDisplay').innerHTML = "<strong style='font-size: 1.3rem; color: #e67817;'>Aguarde um momento.</strong>";
                return;
            }

            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = d.toString().padStart(2, '0');
            document.getElementById('hours').innerText = h.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
        }

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();

        document.getElementById('launchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const form = event.target;
            const emailInput = document.getElementById('emailInput');
            const feedbackDiv = document.getElementById('formFeedback');
            const submitBtn = document.getElementById('submitBtn');
            const emailValue = emailInput.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            feedbackDiv.className = "form-message";
            feedbackDiv.innerText = "";

            if (!emailRegex.test(emailValue)) {
                feedbackDiv.innerText = "Este e-mail não é válido.";
                feedbackDiv.className = "form-message error";
                return;
            }

            submitBtn.innerText = "Enviando...";
            submitBtn.disabled = true;

            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    feedbackDiv.innerText = "Ótimo! Você será avisado assim que lançarmos.";
                    feedbackDiv.className = "form-message success";
                    form.reset();
                } else {
                    feedbackDiv.innerText = "Ocorreu um erro nos nossos servidores. Tente novamente mais tarde.";
                    feedbackDiv.className = "form-message error";
                }
            })
            .catch(error => {
                feedbackDiv.innerText = "Erro de conexão. Verifique sua internet.";
                feedbackDiv.className = "form-message error";
            })
            .finally(() => {
                submitBtn.innerText = "Enviar";
                submitBtn.disabled = false;
            });
        });
