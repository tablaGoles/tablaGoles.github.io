crearTabla();

// ================================ FUNCIONES ================================

async function crearTabla() {
    try {
        var tabla = document.getElementById('tablaGoles');
        const datos = await fetch(SERVER_URL+'/jugadores', { 
                method: 'GET', 
                headers: {'Content-Type': 'application/json'}
            })
        const jugadores = await datos.json()
        for (const jugador of jugadores) {
            var tr=document.createElement('tr');
            var puesto=document.createElement('td');
            puesto.innerHTML = jugador.puesto;
            var nombre=document.createElement('td');
            nombre.innerHTML = jugador.nombre;
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
