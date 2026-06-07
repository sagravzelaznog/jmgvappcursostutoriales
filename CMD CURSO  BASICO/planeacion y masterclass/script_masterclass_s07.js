// Datos de la Masterclass Sesión 07
const sessionData = {
	meta: {
					titulo: "Rastreo de Rutas y Resolución DNS",
					subtitulo: "Dominando TRACERT y NSLOOKUP",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Visualizar el camino físico de los datos y entender la traducción de nombres de dominio."
	},
	modulos: [
					{
									titulo: "1. Introducción: El Detective de Redes",
									tiempo: "5 min",
									contenido: `
													<p>Si <code>ping</code> te dice <em>"si llegaste"</em>, <code>tracert</code> te dice <em>"por dónde pasaste"</em>.</p>
													<p>Imagina enviar un paquete desde México a Japón. No viaja directo; pasa por Houston, Los Ángeles, Hawái, etc. Si el paquete se pierde, necesitas saber <strong>en qué ciudad se quedó</strong>. Eso hace Tracert.</p>
									`
					},
					{
									titulo: "2. TRACERT: El Mapa del Viaje",
									tiempo: "15 min",
									contenido: `
													<p>El comando <code>tracert</code> (Trace Route) muestra cada "salto" (hop) que da tu conexión entre routers.</p>
													
													<div class="cmd-block">C:\\> tracert google.com</div>
													
													<p><strong>Visualización del Viaje:</strong></p>
													<div class="route-map">
																	<div class="route-step"><strong>Salto 1 (Tu Router):</strong> 192.168.1.1 <br><small>Es la puerta de tu casa.</small></div>
																	<div class="route-step"><strong>Salto 2 (Tu ISP):</strong> 10.20.0.1 <br><small>La central de tu proveedor de internet.</small></div>
																	<div class="route-step"><strong>Salto 3-8 (Internet):</strong> Direcciones Públicas <br><small>Cables submarinos, fibra óptica intercontinental.</small></div>
																	<div class="route-step"><strong>Salto Final (Destino):</strong> 142.250.x.x <br><small>El servidor de Google.</small></div>
													</div>
									`
					},
					{
									titulo: "3. Interpretando los Errores de Ruta",
									tiempo: "10 min",
									contenido: `
													<p>¿Qué pasa cuando ves asteriscos?</p>
													<div class="cmd-block">  4    * * * Tiempo de espera agotado.</div>
													
													<p>Esto no siempre significa que internet "se cayó". Puede significar:</p>
													<ul>
																	<li><strong>Firewall:</strong> Ese router específico es "tímido" y está configurado para no responder a extraños, pero deja pasar tus datos al siguiente salto.</li>
																	<li><strong>Cuello de Botella:</strong> Si los tiempos (ms) suben de 20ms a 300ms en un salto específico, has encontrado al culpable de tu lentitud.</li>
													</ul>
									`
					},
					{
									titulo: "4. NSLOOKUP: La Guía Telefónica (DNS)",
									tiempo: "10 min",
									contenido: `
													<p>Las computadoras no hablan "español" ni "inglés", hablan "números". Cuando escribes <em>facebook.com</em>, tu PC necesita preguntar: <em>"¿Qué número IP es ese?"</em>.</p>
													<p>Ese servicio de traducción se llama <strong>DNS</strong> (Domain Name System).</p>
													
													<div class="dns-card">
																	<strong>Consulta:</strong> nslookup facebook.com<br>
																	<strong>Respuesta:</strong><br>
																	Nombre:  facebook.com<br>
																	Addresses:  2a03:2880:f12c:83:face:b00c:0:25de (IPv6)<br>
																	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;157.240.229.35 (IPv4)
													</div>
									`
					},
					{
									titulo: "5. Diagnóstico Avanzado de DNS",
									tiempo: "5 min",
									contenido: `
													<p>Si puedes entrar a internet usando la IP de Google (8.8.8.8) pero no escribiendo "google.com", tienes un problema de DNS.</p>
													<p><strong>Truco de Hacker:</strong> Puedes forzar a <code>nslookup</code> a usar un servidor diferente para probar.</p>
													<div class="cmd-block">nslookup twitter.com 1.1.1.1</div>
													<p><em>(Aquí le estamos preguntando al servidor de Cloudflare dónde está Twitter, ignorando a nuestro proveedor de internet).</em></p>
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
