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

    let expresionNumber = /[0-9.]/;
    let expresionDobleDot = /[:]/;

    if (expresionNumber.test(beat) && !expresionDobleDot.test(beat)) {
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

        document.getElementById('resultadoConversion').innerHTML =  horaLocal.toLocaleTimeString();
    } else if (!beat) {
        document.getElementById('resultadoConversion').innerHTML = '';
    } else {
        document.getElementById('resultadoConversion').innerHTML = 'invalid';
    }
}

function convertirABeat() {
    let entradaHoraLocal = document.getElementById('inputHoraLocal').value;

    let expresionNumber = /[0-9]/;
    let expresionDobleDot = /[:]/;

    if (expresionNumber.test(entradaHoraLocal) && expresionDobleDot.test(entradaHoraLocal)) {
        let horaBiel = new Date();
        
        let partesHora = entradaHoraLocal.split(':');
        
        horaBiel.setHours(partesHora[0]);
        horaBiel.setMinutes(partesHora[1]);
        horaBiel.setSeconds(partesHora[2] || 0);

        horaBiel.setHours(horaBiel.getHours() + 1);
    
        // Calcular el tiempo en beats con centésimas
        let beats = ((horaBiel.getUTCHours() * 3600 + horaBiel.getUTCMinutes() * 60 + horaBiel.getUTCSeconds() + horaBiel.getUTCMilliseconds() / 1000) / 86.4).toFixed(2);

        document.getElementById('resultadoConversion').innerHTML =  "@" + beats;
    } else if (!entradaHoraLocal) {
        document.getElementById('resultadoConversion').innerHTML = '';
    } else {
        document.getElementById('resultadoConversion').innerHTML = 'invalid';
    }
}

document.getElementById("label-container").addEventListener("click", openPanel);

const panel = document.getElementById("panel");
const label = document.querySelector("label");
const span = document.querySelector("span");

function openPanel() {
    label.classList.toggle("open");
    panel.classList.toggle("open");
    span.classList.toggle("open");
}

async function fetchData() {
        const url = 'https://concerts-artists-events-tracker.p.rapidapi.com/location?name=CDMX&minDate=2023-10-01&maxDate=2024-11-01&page=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '03ed9ab9admsh860665e38d41091p1d6d81jsn055440558dda',
            'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchData();