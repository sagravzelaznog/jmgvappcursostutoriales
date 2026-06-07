// Datos de la Masterclass Sesión 06
const sessionData = {
	meta: {
					titulo: "Fundamentos de Red: Conectividad y Diagnóstico",
					subtitulo: "Dominando IPCONFIG y PING",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Entender tu identidad en la red y diagnosticar problemas de conexión básicos."
	},
	modulos: [
					{
									titulo: "1. Introducción: ¿Quién soy en la Matrix?",
									tiempo: "5 min",
									contenido: `
													<p>Para enviar una carta, necesitas saber tu propia dirección y dónde está el buzón de correos. En redes pasa lo mismo.</p>
													<p>Tu computadora tiene un identificador único en la red local. Si no sabes cuál es, estás digitalmente incomunicado. Hoy aprenderemos a leer nuestra "cédula de identidad digital".</p>
									`
					},
					{
									titulo: "2. IPCONFIG: Tu Identidad de Red",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>ipconfig</code> muestra la configuración actual del protocolo TCP/IP. Es el primer paso en cualquier diagnóstico.</p>
													<div class="cmd-block">C:\\> ipconfig</div>
													<p>La salida puede abrumar, pero solo nos importan 3 líneas clave en tu adaptador principal (Wi-Fi o Ethernet):</p>
													<ul>
																	<li><strong>Dirección IPv4:</strong> Tu DNI personal en la red.</li>
																	<li><strong>Máscara de subred:</strong> Define el tamaño de tu "vecindario" local.</li>
																	<li><strong>Puerta de enlace predeterminada (Gateway):</strong> La dirección de tu Router (la salida a Internet).</li>
													</ul>
									`
					},
					{
									titulo: "3. Decodificando la IPv4",
									tiempo: "5 min",
									contenido: `
													<p>Una dirección IP (v4) son cuatro números separados por puntos. Visualízalo así:</p>
													
													<div class="ip-visualizer">
																	<div class="ip-octet">192</div><div class="ip-separator">.</div>
																	<div class="ip-octet">168</div><div class="ip-separator">.</div>
																	<div class="ip-octet">1</div><div class="ip-separator">.</div>
																	<div class="ip-octet">55</div>
													</div>
													
													<p>Normalmente, los primeros tres bloques (192.168.1) identifican a la <strong>Red/Familia</strong>, y el último número (55) te identifica a <strong>Ti</strong> específicamente dentro de esa familia.</p>
									`
					},
					{
									titulo: "4. PING: El Sonar Digital",
									tiempo: "15 min",
									contenido: `
													<p><div class="ping-pulse"></div> <code>ping</code> es como el sonar de un submarino. Envía un pequeño paquete de datos a un destino y espera el eco de regreso.</p>
													
													<strong>Usos Vitales:</strong>
													<ol>
																	<li><strong>¿Estás vivo?</strong>: Verifica si un servidor remoto está encendido y responde.</li>
																	<li><strong>¿Qué tan lejos estás?</strong>: Mide el tiempo que tarda el viaje (Latencia/Lag).</li>
													</ol>
													
													<div class="cmd-block">
C:\\> ping google.com<br><br>
Haciendo ping a google.com [142.250.189.206] con 32 bytes de datos:<br>
Respuesta desde 142.250.189.206: bytes=32 tiempo=15ms TTL=116<br>
Respuesta desde 142.250.189.206: bytes=32 tiempo=16ms TTL=116<br>
...
													</div>
									`
					},
					{
									titulo: "5. Interpretando el Ping (Diagnóstico)",
									tiempo: "10 min",
									contenido: `
													<p>No basta con lanzar el ping, hay que saber leerlo:</p>
													<ul>
																	<li><strong>Tiempo=XXms:</strong> Es el "Lag". Menos de 50ms es excelente. Más de 200ms notarás lentitud.</li>
																	<li><strong>Tiempo de espera agotado:</strong> El paquete se perdió en el camino o el destino lo bloqueó (Firewall).</li>
																	<li><strong>Paquetes perdidos > 0%:</strong> Mala señal. Tu conexión es inestable (posiblemente mala señal Wi-Fi o cable dañado).</li>
													</ul>
													<p><strong>Tip Pro:</strong> Usa <code>ping -t [destino]</code> para un ping infinito que solo se detiene con Ctrl+C. Ideal para monitorear la red mientras mueves la antena Wi-Fi.</p>
									`
					}
	]
};

// Renderizado del DOM


// --- RENDERIZADOR ACTUALIZADO PARA GAMIFICACIÓN Y UI MODERNIZADA ---
const container = document.getElementById('masterclass-content');
const dataObj = typeof masterclassData !== 'undefined' ? masterclassData : (typeof sessionData !== 'undefined' ? sessionData : null);

if (container && dataObj) {
    // 1. Renderizar Header
    const header = document.createElement('header');
    header.className = 'masterclass-header animate-fade';
    header.style.marginBottom = '20px';
    header.innerHTML = `
        <h1>${dataObj.meta.titulo}</h1>
        <p class="subtitle"><strong>Instructor:</strong> ${dataObj.meta.instructor} | <strong>Duración:</strong> ${dataObj.meta.duracion} | <span class="badge intermedio">${dataObj.meta.nivel || 'Básico'}</span></p>
    `;
    container.appendChild(header);

    // 2. Renderizar Secciones
    const arrayContenido = dataObj.secciones || dataObj.modulos || [];
    arrayContenido.forEach((seccion, index) => {
        const sectionBlock = document.createElement('div');
        sectionBlock.className = 'session-card animate-fade';
        sectionBlock.style.animationDelay = `${(index + 1) * 0.1}s`;
        
        // Comprobar si hay un ejercicio interactivo oculto en la sección (para gamificación opcional)
        let ejercicioHtml = '';
        if (seccion.comandoInteractivo) {
            const exerciseId = 'ejercicio_' + index;
            const feedbackId = 'feedback_' + index;
            ejercicioHtml = `
            <div class="ejercicio-interactivo">
                <h4>🎮 Reto Interactivo (+10 pts)</h4>
                <p>Escribe el comando correcto:</p>
                <div class="input-comando">
                    <span class="prompt">C:\\></span>
                    <input type="text" id="${exerciseId}" placeholder="Escribe tu comando...">
                    <button class="btn-success" onclick="window.validarComando('${exerciseId}', '${seccion.comandoInteractivo}', '${feedbackId}')">Verificar</button>
                </div>
                <div id="${feedbackId}" class="feedback-msg"></div>
            </div>`;
        }

        sectionBlock.innerHTML = `
            <div class="session-header" style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="margin:0;">${seccion.titulo}</h2>
                <span class="badge basico">${seccion.tiempo || '5 min'}</span>
            </div>
            <div class="content-body" style="margin-top: 15px;">
                ${seccion.contenido}
                ${ejercicioHtml}
            </div>
        `;
        container.appendChild(sectionBlock);
    });
    
    // Reiniciar clipboard hooks para el nuevo contenido renderizado
    if (typeof initClipboard === 'function') {
        setTimeout(initClipboard, 200);
    }
}
