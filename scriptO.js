document.getElementById('pobreza-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener respuestas del formulario
  const form = event.target;
  const respuestas = {
    salarioMinimo: parseFloat(form.elements.salarioMinimo.value.replace(/\./g, '').replace(',', '.')),
    ingresoMensual: parseFloat(form.elements.ingresoMensual.value.replace(/\./g, '').replace(',', '.')),
    numPersonas: parseInt(form.elements.numPersonas.value.replace(/\./g, '').replace(',', '.')),
    fuenteIngresos: parseInt(form.elements.fuenteIngresos.value),
    calidadEmpleo: parseInt(form.elements.calidadEmpleo.value),
    preguntaA: parseInt(form.elements.preguntaA.value),
    preguntaB: parseInt(form.elements.preguntaB.value),
    preguntaC: parseInt(form.elements.preguntaC.value),
    cuidadoPersonas: parseInt(form.elements.cuidadoPersonas.value),
    ingresos2: parseFloat(form.elements.ingresos2.value.replace(/\./g, '').replace(',', '.')),
    planificacionAhorros: parseInt(form.elements.planificacionAhorros.value),
    inseguridadAlimentaria: parseInt(form.elements.inseguridadAlimentaria.value),
    personasVivienda: parseInt(form.elements.personasVivienda.value.replace(/\./g, '').replace(',', '.')),
    deficitHabitacional: parseInt(form.elements.deficitHabitacional.value)
  };

  // Calcular el valor de referencia (x) basado en el salario mínimo actual ingresado por el usuario
  const valorReferencia = respuestas.salarioMinimo * 0.3253746;

  // Calcular el ingreso total para todas las personas y compararlo con el valor de referencia (x)
  const ingresoTotalPorPersona = (respuestas.ingresoMensual + valorReferencia) / respuestas.numPersonas;

  // Validar si el ingreso total por persona es menor o igual al valor de referencia (x)
  if (ingresoTotalPorPersona <= valorReferencia) {
    window.location.href = "PobreOculto.html";
    return;
  }

  // Determinar si hay al menos 1 punto en la dimensión 1
  if (respuestas.ingresoMensual <= valorReferencia) {
    alert('Usted tiene pobreza oculta debido a la dimensión 1');
    return;
  }

  // Calcular porcentaje del salario mínimo actual
  const porcentajeSalarioMinimo = 0.3253746 * respuestas.salarioMinimo;

  // Calcular el ingreso per cápita
  const ingresoPerCapita = respuestas.ingresoMensual / respuestas.numPersonas;

  // Calcular puntos acumulados en cada subdimensión
  const puntos = {
    ingresosMonetarios: (ingresoPerCapita <= porcentajeSalarioMinimo) ? 1 : 0,
    personaMayorSinIngresos: (respuestas.fuenteIngresos === 0) ? 1 : 0,
    calidadEmpleo: (respuestas.calidadEmpleo === 1 && (respuestas.preguntaA + respuestas.preguntaB > 0)) ? 1 : (respuestas.calidadEmpleo === 0 && respuestas.preguntaC > 0) ? 1 : 0,
    cuidadoPersonasHogar: respuestas.cuidadoPersonas,
    planificacionAhorros: (respuestas.ingresos2 < 500000 || respuestas.planificacionAhorros === 1) ? 1 : 0,
    inseguridadAlimentaria: (respuestas.inseguridadAlimentaria === 1) ? 0 : respuestas.preguntaA > 0 ? 1 : 0,
    deficitHabitacional: (respuestas.personasVivienda > 3 || respuestas.deficitHabitacional === 1) ? 1 : 0
  };

  // Sumar puntos acumulados en todas las subdimensiones
  const totalPuntos = Object.values(puntos).reduce((total, puntos) => total + puntos, 0);

  // Determinar tipo de pobreza oculta
  let tipoPobreza = '';
  if (totalPuntos >= 4) {
    window.location.href = "PobreOculto.html";
  } else {
    window.location.href = "SinPoculto.html";
  }

});

function mostrarPreguntasCalidadEmpleo(select) {
  const divPreguntasCalidadEmpleo = document.getElementById('preguntas-calidad-empleo');
  const divPreguntasSiCalidadEmpleo = document.getElementById('preguntas-si-calidad-empleo');
  const divPreguntasNoCalidadEmpleo = document.getElementById('preguntas-no-calidad-empleo');
  if (select.value === '1') {
    divPreguntasCalidadEmpleo.style.display = 'block';
    divPreguntasSiCalidadEmpleo.style.display = 'block';
    divPreguntasNoCalidadEmpleo.style.display = 'none';
  } else if (select.value === '0') {
    divPreguntasCalidadEmpleo.style.display = 'block';
    divPreguntasSiCalidadEmpleo.style.display = 'none';
    divPreguntasNoCalidadEmpleo.style.display = 'block';
  } else {
    divPreguntasCalidadEmpleo.style.display = 'none';
    divPreguntasSiCalidadEmpleo.style.display = 'none';
    divPreguntasNoCalidadEmpleo.style.display = 'none';
  }
}

function mostrarPreguntasInseguridadAlimentaria(select) {
  const divPreguntasInseguridadAlimentaria = document.getElementById('preguntas-inseguridad-alimentaria');
  if (select.value === '1') {
    divPreguntasInseguridadAlimentaria.style.display = 'block';
  } else {
    divPreguntasInseguridadAlimentaria.style.display = 'none';
  }
}

// Formatear valores numéricos con puntos como separadores de miles
const inputsNumerico = document.querySelectorAll('input[type="text"]');
inputsNumerico.forEach(input => {
  input.addEventListener('input', function() {
    // Eliminar puntos y comas existentes
    let valor = this.value.replace(/\./g, '').replace(/,/g, '');
    // Formatear valor con puntos como separadores de miles
    valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Asignar valor formateado al campo
    this.value = valor;
  });
});
