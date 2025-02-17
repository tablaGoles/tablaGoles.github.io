let token = '';

function generateHeader() {
    return {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+token,
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const formAcceso = document.getElementById('formAcceso');
    formAcceso.addEventListener('submit', async function(event) {
        event.preventDefault();

        const password = document.getElementById('passwordAcceso').value;

        if (!password) {
            alert("Error procesando el formulario");
            return;
        }

        try {
            const response = await fetch(SERVER_URL+'/login', { 
                method: 'POST', 
                headers: generateHeader(),
                body: JSON.stringify({ password }),
            })
            const data = await response.json()
            if(!response.ok) {
                alert(response.statusText + ': \n' + data.message);
                return;
            }
            token = data.token;
        } catch(e) {
            console.log(e);
            return;
        }

        const divAcceso = document.getElementById('acceso');
        divAcceso.setAttribute('hidden', true);
        const divOpciones = document.getElementById('opciones');
        divOpciones.removeAttribute('hidden');
    });

    const formCrearJugador = document.getElementById('formCrearJugador');
    formCrearJugador.addEventListener('submit', async function(event) {
        event.preventDefault();

        const jugador = {
            nombre : document.getElementById('nombreCrearJugador').value,
            nacimiento : document.getElementById('nacimientoCrearJugador').value,
            caracteristica : document.getElementById('caracteristicaCrearJugador').value,
            curiosidad : document.getElementById('curiosidadCrearJugador').value,
        };

        if (!jugador.nombre) {
            alert("Error procesando el formulario. Se requiere un nombre");
            return;
        }

        try {
            const response = await fetch(SERVER_URL+'/jugadores', { 
                method: 'POST', 
                headers: generateHeader(),
                body: JSON.stringify(jugador),
            })
            const data = await response.json()
            if(!response.ok) {
                alert(response.statusText + ': \n' + data.message);
                return;
            }
            alert(data.message);
        } catch(e) {
            console.log(e);
        }
    });

    const formCrearPartido = document.getElementById('formCrearPartido');
    formCrearPartido.addEventListener('submit', async function(event) {
        event.preventDefault();

        const partido = {
            fecha : document.getElementById('fechaCrearPartido').value,
            lugar : document.getElementById('lugarCrearPartido').value,
        };

        if (!partido.fecha) {
            alert("Error procesando el formulario. Se requiere una fecha");
            return;
        }

        try {
            const response = await fetch(SERVER_URL+'/partidos', { 
                method: 'POST', 
                headers: generateHeader(),
                body: JSON.stringify(partido),
            })
            const data = await response.json()
            if(!response.ok) {
                alert(response.statusText + ': \n' + data.message);
                return;
            }
            alert(data.message);
        } catch(e) {
            console.log(e);
        }
    });

    const formCargarGoles = document.getElementById('formCargarGoles');
    formCargarGoles.addEventListener('submit', async function(event) {
        event.preventDefault();

        const goles = {
            goles : document.getElementById('golesCargarGoles').value,
            nombre : document.getElementById('nombreCargarGoles').value,
            fecha : document.getElementById('fechaCargarGoles').value,
        };

        if (!goles.goles || !goles.nombre || !goles.fecha) {
            alert("Error procesando el formulario");
            return;
        }

        try {
            const response = await fetch(SERVER_URL+'/jugadores/goles', { 
                method: 'PUT', 
                headers: generateHeader(),
                body: JSON.stringify(goles),
            })
            const data = await response.json()
            if(!response.ok) {
                alert(response.statusText + ': \n' + data.message);
                return;
            }
            alert(data.message);
        } catch(e) {
            console.log(e);
        }
    });

    const formEliminarGoles = document.getElementById('formEliminarGoles');
    formEliminarGoles.addEventListener('submit', async function(event) {
        event.preventDefault();

        const jugador = {
            nombre : document.getElementById('nombreEliminarGoles').value,
            fecha : document.getElementById('fechaEliminarGoles').value,
        };

        if (!jugador.nombre || !jugador.fecha) {
            alert("Error procesando el formulario");
            return;
        }

        try {
            const response = await fetch(SERVER_URL+'/jugadores/goles', { 
                method: 'DELETE', 
                headers: generateHeader(),
                body: JSON.stringify(jugador),
            })
            const data = await response.json()
            if(!response.ok) {
                alert(response.statusText + ': \n' + data.message);
                return;
            }
            alert(data.message);
        } catch(e) {
            console.log(e);
        }
    });

    const formEditarJugador = document.getElementById('formEditarJugador');
    formEditarJugador.addEventListener('submit', async function(event) {
        event.preventDefault();

        const jugador = {
            nombre : document.getElementById('nombreEditarJugador').value,
            nacimiento : document.getElementById('nacimientoEditarJugador').value,
            caracteristica : document.getElementById('caracteristicaEditarJugador').value,
            curiosidad : document.getElementById('curiosidadEditarJugador').value,
        };

        if (!jugador.nombre) {
            alert("Error procesando el formulario. Se requiere un nombre");
            return;
        }

        try {
            const response = await fetch(SERVER_URL+'/jugadores', { 
                method: 'PUT', 
                headers: generateHeader(),
                body: JSON.stringify(jugador),
            })
            const data = await response.json()
            if(!response.ok) {
                alert(response.statusText + ': \n' + data.message);
                return;
            }
            alert(data.message);
        } catch(e) {
            console.log(e);
        }
    });
});