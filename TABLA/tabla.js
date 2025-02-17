crearTabla();

// ================================ FUNCIONES ================================

async function crearTabla() {
    try {
        const datos = await fetch(SERVER_URL+'/jugadores', { 
                method: 'GET', 
                headers: {'Content-Type': 'application/json'}
            })
        const jugadores = await datos.json();
        if(!jugadores || !jugadores.length) {
            tabla.innerHTML = "Error cargando jugadores";
            return;
        }
        const jugadoresFiltrados = jugadores.filter(j => j.goles > 0);
        
        const tabla = document.getElementById('tablaGoles');
        for (const jugador of jugadoresFiltrados) {
            const tr=document.createElement('tr');
            const puesto=document.createElement('td');
            puesto.innerHTML = createLinkJugador(jugador.nombre, jugador.puesto);
            const nombre=document.createElement('td');
            nombre.innerHTML = createLinkJugador(jugador.nombre, jugador.nombre);
            const goles=document.createElement('td');
            goles.innerHTML = createLinkJugador(jugador.nombre, jugador.goles);
            const partidos=document.createElement('td');
            partidos.innerHTML = createLinkJugador(jugador.nombre, jugador.partidos);
            tr.appendChild(puesto);
            tr.appendChild(nombre);
            tr.appendChild(goles);
            tr.appendChild(partidos);
            tabla.appendChild(tr);
        }
        const loaders = document.getElementsByClassName('loader');
        for(const loader of loaders) {
            loader.setAttribute('hidden', 'true');
        }

    } catch (e) {
        console.error('No pudo generarse la tabla de goles', e);
    }
}

function createLinkJugador(nombreJugador, contenido) {
    return `<a href="jugador.html?nombre=${nombreJugador}" target="_self"><div class="linkJugador">${contenido}</div></a>`;
}