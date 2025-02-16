crearTabla();

// ================================ FUNCIONES ================================

async function crearTabla() {
    try {
        var tabla = document.getElementById('tablaGoles');
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
        for (const jugador of jugadoresFiltrados) {
            var tr=document.createElement('tr');
            var puesto=document.createElement('td');
            puesto.innerHTML = jugador.puesto;
            var nombre=document.createElement('td');
            nombre.innerHTML = `<a href="jugador.html?nombre=${jugador.nombre}" target="_blank">${jugador.nombre}</a>`;
            var goles=document.createElement('td');
            goles.innerHTML = jugador.goles;
            var partidos=document.createElement('td');
            partidos.innerHTML = jugador.partidos;
            tr.appendChild(puesto);
            tr.appendChild(nombre);
            tr.appendChild(goles);
            tr.appendChild(partidos);
            tabla.appendChild(tr);
        }
    } catch (e) {
        console.error('No pudo generarse la tabla de goles', e);
    }
}
