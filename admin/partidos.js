document.addEventListener("DOMContentLoaded", async function() {
    const main = document.getElementById("partidos");
    const loadingPlaceholder = document.createElement('p');
    loadingPlaceholder.innerHTML = "Cargando...";
    main.appendChild(loadingPlaceholder);
    try {
        const datos = await fetch(SERVER_URL+'/partidos', { 
                method: 'GET', 
                headers: {'Content-Type': 'application/json'}
        })
        const partidos = await datos.json();
        if(!datos.ok) {
            alert(datos.statusText + ': \n' + partidos.message);
            return;
        }
        for (const partido of partidos) {
            const div = document.createElement('div');
            
            const title = document.createElement('h2');
            title.innerHTML = partido.fecha + ' - ' + partido.lugar;
            if(partido.descripcion) {
                title.innerHTML += ` (${partido.descripcion})`;
            }
            const jugadores = document.createElement('table');
            const filaInfo = document.createElement('tr');
            filaInfo.innerHTML = '<th>Jugadores</th> <th>Goles</th>'
            jugadores.appendChild(filaInfo);
            for (const jugador of partido.jugadores) {
                const filaJugador = document.createElement('tr');
                const celdaJugador = document.createElement('th');
                celdaJugador.innerHTML = jugador.jugador;
                const celdaGoles = document.createElement('th');
                celdaGoles.innerHTML = jugador.goles;
                filaJugador.appendChild(celdaJugador);
                filaJugador.appendChild(celdaGoles);
                jugadores.appendChild(filaJugador);
            }

            div.appendChild(title);
            div.appendChild(jugadores);
            div.appendChild(document.createElement('br'));
            main.appendChild(div);
        }
        main.removeChild(loadingPlaceholder);
    } catch (e) {
        console.error('No pudo generarse la información de partidos', e);
    }
});