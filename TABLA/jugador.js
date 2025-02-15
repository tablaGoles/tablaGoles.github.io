document.addEventListener("DOMContentLoaded", async function() {
    const main = document.getElementById('perfil');
    const loadingPlaceholder = document.createElement('p');
    loadingPlaceholder.innerHTML = "Cargando...";
    main.appendChild(loadingPlaceholder);
    try {
        const datos = await fetch(`${SERVER_URL}/jugador${window.location.search}`, { 
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const jugador = await datos.json();
        if(!datos.ok) {
            alert(datos.statusText + ': \n' + jugador.message);
            return;
        }
        const title = document.createElement('h2');
        title.innerHTML = jugador.nombre;
        const info = document.createElement('table');
        const filaInfo = document.createElement('tr');
        filaInfo.innerHTML = '<th>Goles totales</th> <th>Partidos jugados</th> <th>Nacimiento</th> <th>Característica</th> <th>Curiosidad</th>'
        info.appendChild(filaInfo);
        const filaDatosJugador = document.createElement('tr');
        filaDatosJugador.innerHTML = `<th>${jugador.goles}</th> <th>${jugador.partidos}</th> <th>${jugador.nacimiento}</th> <th>${jugador.caracteristica}</th> <th>${jugador.curiosidad}</th>`
        info.appendChild(filaDatosJugador);
    
        const table = document.createElement('table');
        const entradas = document.createElement('tr');
        entradas.innerHTML = '<th>Fecha</th><th>Goles</th>'
        table.appendChild(entradas);
        for(partido of jugador.detallePartidos) {
            const fila = document.createElement('tr');
            const fecha = document.createElement('th');
            fecha.innerHTML = partido.fecha;
            const goles = document.createElement('th');
            goles.innerHTML = partido.goles;
            fila.appendChild(fecha);
            fila.appendChild(goles);
            table.appendChild(fila);
        }
    
        main.appendChild(title);
        main.appendChild(info);
        main.appendChild(document.createElement('br'));
        main.appendChild(table);
        main.removeChild(loadingPlaceholder);
    } catch (e) {
        loadingPlaceholder.innerHTML = e;
    }
});