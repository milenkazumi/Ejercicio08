 (function(){
    const form = document.getElementById('imcForm');
    const nombreInput = document.getElementById('nombre');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const resultadoDiv = document.getElementById('resultado');

    const nombreError = document.getElementById('nombreError');
    const pesoError = document.getElementById('pesoError');
    const alturaError = document.getElementById('alturaError');

    function validarNombre(value) {
      // At least 3 characters, letters and spaces
      return /^[a-zA-ZÀ-ÿ\s]{3,}$/.test(value.trim());
    }
    function validarPeso(value) {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    }
    function validarAltura(value) {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    }

    function clasificarIMC(imc) {
      if (imc < 18.5) return "Bajo peso";
      if (imc < 25) return "Normal";
      if (imc < 30) return "Sobrepeso";
      return "Obesidad";
    }

    form.addEventListener('submit', function(event){
      event.preventDefault();

      // Reset errors
      nombreError.textContent = "";
      pesoError.textContent = "";
      alturaError.textContent = "";
      resultadoDiv.textContent = "";

      let valid = true;

      if (!validarNombre(nombreInput.value)) {
        nombreError.textContent = "Ingrese un nombre válido (solo letras y espacios, mínimo 3 caracteres).";
        valid = false;
      }
      if (!validarPeso(pesoInput.value)) {
        pesoError.textContent = "Ingrese un peso válido mayor a 0.";
        valid = false;
      }
      if (!validarAltura(alturaInput.value)) {
        alturaError.textContent = "Ingrese una altura válida mayor a 0.";
        valid = false;
      }

      if (!valid) return;

      const peso = parseFloat(pesoInput.value);
      const altura = parseFloat(alturaInput.value);

      const imc = peso / (altura * altura);
      const clasificacion = clasificarIMC(imc);

      resultadoDiv.textContent = `IMC: ${imc.toFixed(2)} - Clasificación: ${clasificacion}`;
    });
  })();