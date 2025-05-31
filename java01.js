 (function(){
            const form = document.getElementById('salaryForm');
            const dniInput = document.getElementById('dni');
            const nombreInput = document.getElementById('nombre');
            const cargoSelect = document.getElementById('cargo');
            const descuentoInput = document.getElementById('descuento');
            const sueldoBrutoDiv = document.getElementById('sueldoBruto');
            const resultadoDiv = document.getElementById('resultado');

            const dniError = document.getElementById('dniError');
            const nombreError = document.getElementById('nombreError');
            const cargoError = document.getElementById('cargoError');
            const descuentoError = document.getElementById('descuentoError');

            // Define gross salary by cargo
            const sueldosBrutos = {
                administrativo: 2500,
                operativo: 1800,
                gerente: 4000,
                director: 6000
            };

            function validarDNI(value) {
                return /^\d{7,8}$/.test(value);
            }
            function validarNombre(value) {
                // Accept letters and spaces (including accented characters)
                return /^[a-zA-ZÀ-ÿ\s]{3,}$/.test(value.trim());
            }
            function validarDescuento(value) {
                const num = parseFloat(value);
                return !isNaN(num) && num >= 0 && num <= 100;
            }

            function mostrarSueldoBruto(cargo) {
                if (cargo && sueldosBrutos[cargo] !== undefined) {
                    sueldoBrutoDiv.textContent = "$ " + sueldosBrutos[cargo].toFixed(2);
                } else {
                    sueldoBrutoDiv.textContent = '-';
                }
            }

            cargoSelect.addEventListener('change', function() {
                mostrarSueldoBruto(this.value);
                resultadoDiv.textContent = "";
            });

            form.addEventListener('submit', function(event){
                event.preventDefault();

                // Reset errors
                dniError.textContent = "";
                nombreError.textContent = "";
                cargoError.textContent = "";
                descuentoError.textContent = "";
                resultadoDiv.textContent = "";

                let valid = true;

                if (!validarDNI(dniInput.value)) {
                    dniError.textContent = "Debe ingresar un DNI válido (7 u 8 dígitos numéricos).";
                    valid = false;
                }
                if (!validarNombre(nombreInput.value)) {
                    nombreError.textContent = "El nombre debe tener al menos 3 letras y solo caracteres alfabéticos.";
                    valid = false;
                }
                if (!cargoSelect.value) {
                    cargoError.textContent = "Debe seleccionar un cargo.";
                    valid = false;
                }
                if (!validarDescuento(descuentoInput.value)) {
                    descuentoError.textContent = "Ingrese un porcentaje válido entre 0 y 100.";
                    valid = false;
                }

                if (!valid) return;

                const bruto = sueldosBrutos[cargoSelect.value];
                const descuento = parseFloat(descuentoInput.value);

                const neto = bruto - (bruto * descuento / 100);

                resultadoDiv.textContent = `Sueldo Neto de ${nombreInput.value.trim()} (DNI: ${dniInput.value}) es: $${neto.toFixed(2)}`;
            });

        })();