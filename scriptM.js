function calcularPuntaje() {
    // Suma de los puntajes de las dimensiones
    var puntajeTotal = 0;

    // Dimensión 1: Analfabetismo
    puntajeTotal += parseInt(document.querySelector('input[name="leerEscribir"]:checked').value);

    // Dimensión 2: Asistencia Escolar (Nivel Educativo)
    puntajeTotal += parseInt(document.querySelector('input[name="nivelEducativo"]:checked').value);

    // Dimensión 3: Asistencia Escolar (Hijos)
    puntajeTotal += parseInt(document.querySelector('input[name="asistenEscuela"]:checked').value);

    // Dimensión 4: Rezago Escolar
    puntajeTotal += parseInt(document.querySelector('input[name="nivelRezago"]:checked').value);

    // Dimensión 5: Acceso a Servicios para el Cuidado de la Primera Infancia
    var dim5Puntos = 0;
    var dim5a = parseInt(document.querySelector('input[name="dim5a"]:checked').value);
    var dim5b = parseInt(document.querySelector('input[name="dim5b"]:checked').value);
    var dim5c = parseInt(document.querySelector('input[name="dim5c"]:checked').value);
    var dim5d = parseInt(document.querySelector('input[name="dim5d"]:checked').value);

    if (dim5a === 1 || dim5b === 1 || dim5c === 1 || dim5d === 1) {
        dim5Puntos = 1;
    }
    puntajeTotal += dim5Puntos;

    // Validación especial para la pregunta b
    if (dim5a === 1 && dim5b === 1) {
        dim5Puntos = 0;
    }

    // Validación de la pregunta c
    if (dim5Puntos === 0 && dim5c === 1) {
        dim5Puntos = 1;
    }

    // Validación de la pregunta d
    if (dim5Puntos === 0 && dim5d === 1) {
        dim5Puntos = 1;
    }

    puntajeTotal += dim5Puntos;

    // Dimensión 6: Trabajo Infantil
    puntajeTotal += parseInt(document.querySelector('input[name="trabajoInfantil"]:checked').value);

    // Dimensión 7: Ocupación Informal
    var dim7Puntos = 0;
    var numPersonasLaboran = parseInt(document.getElementById("numPersonasLaboran").value);
    var numPersonasPension = parseInt(document.getElementById("numPersonasPension").value);
    var aportesEmpresa = parseInt(document.querySelector('input[name="aportesEmpresa"]:checked').value);
    var aportesFondoPension = parseInt(document.querySelector('input[name="aportesFondoPension"]:checked').value);

    if (numPersonasPension < numPersonasLaboran) {
        dim7Puntos = 1;
    } else if (numPersonasPension !== numPersonasLaboran || aportesEmpresa !== 0 || aportesFondoPension !== 0) {
        dim7Puntos = 1;
    }

    // Agrega la alerta si el número de afiliaciones es mayor que el número de personas laborando
    if (numPersonasPension > numPersonasLaboran) {
        alert("No puede ingresar un número mayor de afiliaciones si no hay ese número de personas laborando.");
        return; // Salir de la función para evitar que se continúe el proceso de cálculo
    }

    puntajeTotal += dim7Puntos;

    // Dimensión 8: Desempleo de larga duración
    puntajeTotal += parseInt(document.getElementById("tiempoBuscandoEmpleo").value);

    // Dimensión 9: Aseguramiento en salud
    puntajeTotal += parseInt(document.querySelector('input[name="aseguramientoSalud"]:checked').value);

    // Dimensión 10: Acceso a servicio de salud dada una necesidad
    var dim10Puntos = 0;
    var problemaSalud = parseInt(document.querySelector('input[name="problemaSalud"]:checked').value);
    var acudioMedico = parseInt(document.querySelector('input[name="acudioMedico"]:checked').value);

    if (problemaSalud === 1 || acudioMedico === 1) {
        dim10Puntos = 1;
    }
    puntajeTotal += dim10Puntos;

    // Dimensión 11: Acceso a fuente de agua mejorada
    puntajeTotal += parseInt(document.querySelector('input[name="accesoAguaMejorada"]:checked').value);

    // Dimensión 12: Eliminación de excretas
    puntajeTotal += parseInt(document.querySelector('input[name="alcantarillado"]:checked').value);

    // Dimensión 13: Hacinamiento crítico
    puntajeTotal += parseInt(document.querySelector('input[name="hacinamiento"]:checked').value);

    // Dimensión 14: Pisos inadecuados
    puntajeTotal += parseInt(document.querySelector('input[name="materialPisos"]:checked').value);

    // Dimensión 15: Paredes exteriores inadecuadas
    puntajeTotal += parseInt(document.querySelector('input[name="materialParedes"]:checked').value);

    // Determinar el resultado basado en el puntaje total
    var resultado = "";
    if (puntajeTotal >= 5) {
        resultado = "¡Eres pobre multidimensional!";
        window.location.href = "PobreMultidimencional.html";
    } else if (puntajeTotal === 4) {
        resultado = "No eres pobre multidimensional, pero eres propenso a serlo.";
        window.location.href = "P_Oculta.html";
    } else {
        resultado = "No eres pobre multidimensional.";
        window.location.href = "P_Oculta.html";
    }

    // No es necesario mostrar el resultado en la página, ya que se redirige a otra página
}

// Función para verificar el número de afiliaciones cuando se cambia la selección
function verificarAfiliaciones() {
    var numPersonasLaboran = parseInt(document.getElementById("numPersonasLaboran").value);
    var numPersonasPension = parseInt(document.getElementById("numPersonasPension").value);

    if (numPersonasPension > numPersonasLaboran) {
        alert("No puede ingresar un número mayor de afiliaciones si no hay ese número de personas laborando.");
    }
}

// Agregar evento onchange a los campos de número de personas afiliadas y laborando
document.getElementById("numPersonasPension").onchange = verificarAfiliaciones;
document.getElementById("numPersonasLaboran").onchange = verificarAfiliaciones;
