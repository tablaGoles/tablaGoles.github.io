const IMG_PATH="./imagenes"

document.addEventListener("DOMContentLoaded", async function() {
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

        const imagenes = document.getElementsByClassName("image");
        for(const image of imagenes) {
            image.setAttribute("src", `${IMG_PATH}/${jugador.nombre}.jpg`);
        }
        const nombre = document.getElementById("nombre");
        nombre.innerHTML = jugador.nombre;
        const goles = document.getElementById("goles");
        goles.innerHTML = jugador.goles || "ERROR CALCULANDO GOLES";
        const partidos = document.getElementById("partidos");
        partidos.innerHTML = jugador.partidos || "ERROR CALCULANDO PARTIDOS";
        const nacimiento = document.getElementById("nacimiento");
        nacimiento.innerHTML = jugador.nacimiento? formatDate(jugador.nacimiento, false, true) : "?";
        const promedio = document.getElementById("promedio");
        const promedioCalculado = jugador.goles/jugador.partidos || "ERROR";
        const promedioRedondeado = Math.round((promedioCalculado + Number.EPSILON) * 100) / 100
        promedio.innerHTML = promedioRedondeado + " GxP";
        const caracteristica = document.getElementById("caracteristica");
        caracteristica.innerHTML = jugador.caracteristica || "?";
        const curiosidad = document.getElementById("curiosidad");
        curiosidad.innerHTML = jugador.curiosidad || "?";

        const table = document.getElementById('tablaPartidos');
        const tbody = document.createElement('tbody');
        for(partido of jugador.detallePartidos) {
            const fila = document.createElement('tr');
            const fecha = document.createElement('td');
            fecha.classList.add("fecha");
            fecha.innerHTML = formatDate(partido.fecha, true);
            const goles = document.createElement('td');
            goles.innerHTML = partido.goles;
            fila.appendChild(fecha);
            fila.appendChild(goles);
            tbody.appendChild(fila);
        }
        table.appendChild(tbody);
    } catch (e) {
        alert ("Error generando perfil del jugador");
    }

    const collapsibles = document.getElementsByClassName("collapsible");
    for (const coll of collapsibles) {
        coll.addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
});