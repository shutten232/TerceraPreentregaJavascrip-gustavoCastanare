document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioLoadout');
    const selectorMision = document.getElementById('mision');
    const salida = document.getElementById('salidaLoadout');
    const mensajeError = document.getElementById('mensajeError');
    let puntosMaximos = 100;
    let puntosActuales = 0;

    const misiones = {
        facil: {nombre: "Patrulla", enemigo: "Bichos", puntos: 100},
        medio: {nombre: "Asalto", enemigo: "Ciborgs", puntos: 150},
        dificil: {nombre: "Asedio", enemigo: "Iluminados", puntos: 200}
    };

    selectorMision.addEventListener('change', (event) => {
        const misionSeleccionada = event.target.value;
        if (misiones[misionSeleccionada]) {
            puntosMaximos = misiones[misionSeleccionada].puntos;
        } else {
            puntosMaximos = 100;
        }
    });

    function calcularPuntos(arma, armadura, beneficio) {
        let puntos = 0;

        switch (arma) {
            case "Liberador":
                puntos += 20;
                break;
            case "Justiciero":
                puntos += 30;
                break;
            case "Defensor":
                puntos += 40;
                break;
        }

        switch (armadura) {
            case "Estándar":
                puntos += 20;
                break;
            case "Pesada":
                puntos += 40;
                break;
            case "Sigilo":
                puntos += 30;
                break;
        }

        switch (beneficio) {
            case "Munición Extra":
                puntos += 10;
                break;
            case "Recarga Rápida":
                puntos += 15;
                break;
            case "Salud Aumentada":
                puntos += 25;
                break;
        }

        return puntos;
    }

    const loadoutGuardado = localStorage.getItem('helldiverLoadout');
    if (loadoutGuardado) {
        mostrarLoadout(JSON.parse(loadoutGuardado));
    }

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const arma = document.getElementById('arma').value;
        const armadura = document.getElementById('armadura').value;
        const beneficio = document.getElementById('beneficio').value;

        puntosActuales = calcularPuntos(arma, armadura, beneficio);

        if (puntosActuales > puntosMaximos) {
            mensajeError.textContent = `¡Excediste los puntos permitidos! Actualmente: ${puntosActuales}, Máximo: ${puntosMaximos}.`;
            return;
        }

        if (arma === "" || armadura === "" || beneficio === "") {
            mensajeError.textContent = "Por favor, asegúrate de seleccionar un arma, armadura y beneficio.";
            return;
        }

        mensajeError.textContent = "";

        const loadout = {
            arma,
            armadura,
            beneficio,
            puntosUsados: puntosActuales,
            mision: misiones[selectorMision.value] ? misiones[selectorMision.value].nombre : "Sin misión",
            guardadoEn: new Date().toLocaleString()
        };

        localStorage.setItem('helldiverLoadout', JSON.stringify(loadout));

        mostrarLoadout(loadout);
    });

    function mostrarLoadout(loadout) {
        salida.innerHTML = `
            <h3>Loadout Guardado</h3>
            <p><strong>Misión:</strong> ${loadout.mision}</p>
            <p><strong>Arma:</strong> ${loadout.arma}</p>
            <p><strong>Armadura:</strong> ${loadout.armadura}</p>
            <p><strong>Beneficio:</strong> ${loadout.beneficio}</p>
            <p><strong>Puntos Usados:</strong> ${loadout.puntosUsados}/${puntosMaximos}</p>
            <p><small>Guardado el: ${loadout.guardadoEn}</small></p>
        `;

        salida.classList.add('highlight');
        setTimeout(() => {
            salida.classList.remove('highlight');
        }, 1000);
    }
});
