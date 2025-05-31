  const form = document.getElementById('loanForm');
    const montoInput = document.getElementById('monto');
    const tasaInput = document.getElementById('tasa');
    const plazoInput = document.getElementById('plazo');
    const resultsDiv = document.getElementById('results');

    const montoError = document.getElementById('montoError');
    const tasaError = document.getElementById('tasaError');
    const plazoError = document.getElementById('plazoError');

    function validatePositiveNumber(value) {
      return !isNaN(value) && Number(value) > 0;
    }

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      // Clear errors and results
      montoError.textContent = '';
      tasaError.textContent = '';
      plazoError.textContent = '';
      resultsDiv.textContent = '';

      const monto = parseFloat(montoInput.value);
      const tasa = parseFloat(tasaInput.value);
      const plazo = parseInt(plazoInput.value, 10);

      let valid = true;

      if (!validatePositiveNumber(monto)) {
        montoError.textContent = 'Por favor ingrese un monto válido y positivo.';
        valid = false;
      }
      if (!validatePositiveNumber(tasa)) {
        tasaError.textContent = 'Por favor ingrese una tasa de interés positiva.';
        valid = false;
      }
      if (!validatePositiveNumber(plazo) || !Number.isInteger(plazo)) {
        plazoError.textContent = 'Por favor ingrese un plazo en años válido y positivo.';
        valid = false;
      }

      if (!valid) {
        resultsDiv.textContent = '';
        return;
      }

      // Calculate interest and total payment
      const interes = (monto * tasa * plazo) / 100;
      const total = monto + interes;

      // Format results as currency in Spanish locale
      const formatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      });

      resultsDiv.innerHTML = 
        `<p>Interés a pagar: <strong>${formatter.format(interes)}</strong></p>` +
        `<p>Monto total a pagar: <strong>${formatter.format(total)}</strong></p>`;
    });