function actualizarTiempo() {
    // Obtener la hora local
    let horaLocal = new Date();

    let horaBiel = new Date();
    horaBiel.setHours(horaBiel.getHours() + 1);
    
    // Calcular el tiempo en beats con centésimas
    let beats = ((horaBiel.getUTCHours() * 3600 + horaBiel.getUTCMinutes() * 60 + horaBiel.getUTCSeconds() + horaBiel.getUTCMilliseconds() / 1000) / 86.4).toFixed(2);

    // Mostrar el tiempo en beats y en tiempo local
    document.getElementById('beatTime').innerHTML = '@' + beats;
    document.getElementById('localTime').innerHTML = horaLocal.toLocaleTimeString(); // Formato de hora local
}

// Actualizar el tiempo cada décima de segundo
setInterval(actualizarTiempo, 100);

// Llamar a la función por primera vez para mostrar el tiempo inicial
actualizarTiempo();

document.getElementById("convertirALocal").addEventListener("click", convertirALocal);
document.getElementById("convertirABeat").addEventListener("click", convertirABeat);

function convertirALocal() {
    let beat = document.getElementById('inputHoraLocal').value;

    if (beat) {
        let segundosTotales = beat * 86.4;

        // Calcular horas, minutos y segundos
        let horas = Math.floor(segundosTotales / 3600);
        let minutos = Math.floor((segundosTotales % 3600) / 60);
        let segundos = Math.floor(segundosTotales % 60);

        // Crear un objeto de fecha con la hora local
        let horaLocal = new Date();

        horaLocal.setHours(horas - 1 - (horaLocal.getTimezoneOffset()/60));
        horaLocal.setMinutes(minutos);
        horaLocal.setSeconds(segundos);

        document.getElementById('resultadoConversion').innerHTML = 'Hora Local: ' + horaLocal.toLocaleTimeString();
    } else {
        document.getElementById('resultadoConversion').innerHTML = 'Por favor, ingresa una hora local.';
    }
}

function convertirABeat() {
    let entradaHoraLocal = document.getElementById('inputHoraLocal').value;

    if (entradaHoraLocal) {
        let horaBiel = new Date();
        
        let partesHora = entradaHoraLocal.split(':');
        
        horaBiel.setHours(partesHora[0]);
        horaBiel.setMinutes(partesHora[1]);
        horaBiel.setSeconds(partesHora[2] || 0);

        horaBiel.setHours(horaBiel.getHours() + 1);
    
        // Calcular el tiempo en beats con centésimas
        let beats = ((horaBiel.getUTCHours() * 3600 + horaBiel.getUTCMinutes() * 60 + horaBiel.getUTCSeconds() + horaBiel.getUTCMilliseconds() / 1000) / 86.4).toFixed(2);

        document.getElementById('resultadoConversion').innerHTML = 'Swatch Beat: ' + beats;
    } else {
        document.getElementById('resultadoConversion').innerHTML = 'Por favor, ingresa una hora local.';
    }
}