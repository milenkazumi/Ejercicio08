 (function(){
            const form = document.getElementById('loanForm');
            const montoInput = document.getElementById('monto');
            const tasaInput = document.getElementById('tasa');
            const plazoInput = document.getElementById('plazo');
            const resultadoDiv = document.getElementById('resultado');

            form.addEventListener('submit', function(event){
                event.preventDefault();

                // Reset result
                resultadoDiv.textContent = "";

                const monto = parseFloat(montoInput.value);
                const tasa = parseFloat(tasaInput.value);
                const plazo = parseFloat(plazoInput.value);

                // Validate inputs
                if (monto <= 0 || tasa <= 0 || plazo <= 0) {
                    resultadoDiv.textContent = "Todos los campos deben ser números positivos.";
                    return;
                }

                // Calculate interest and total amount
                const interes = (monto * tasa * plazo) / 100;
                const total = monto + interes;

                resultadoDiv.textContent = `Interés: $${interes.toFixed(2)}, Monto Total: $${total.toFixed(2)}`;
            });

        })();