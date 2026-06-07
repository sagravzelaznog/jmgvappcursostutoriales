// Datos de la Masterclass Sesión 09
const sessionData = {
	meta: {
					titulo: "Auditoría de Hardware y Software",
					subtitulo: "Dominando SYSTEMINFO y WMIC",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Extraer información detallada del sistema para inventario, soporte técnico y diagnóstico."
	},
	modulos: [
					{
									titulo: "1. Introducción: La Biografía del PC",
									tiempo: "5 min",
									contenido: `
													<p>¿Cuándo se instaló Windows exactamente? ¿Cuál es el número de serie de la placa madre? ¿Cuánta RAM reconoce el sistema realmente?</p>
													<p>Responder estas preguntas buscando en ventanas gráficas es lento. Hoy usaremos dos herramientas de auditoría forense:</p>
													<ul>
																	<li><strong>SYSTEMINFO:</strong> El pasaporte general.</li>
																	<li><strong>WMIC:</strong> El escáner de rayos X profundo.</li>
													</ul>
									`
					},
					{
									titulo: "2. SYSTEMINFO: La Vista General",
									tiempo: "10 min",
									contenido: `
													<p>Este comando genera un reporte completo instantáneo. Es ideal para una revisión rápida.</p>
													<div class="cmd-block">C:\\> systeminfo</div>
													
													<div class="spec-card">
																	<span class="spec-title">Datos Críticos a Buscar:</span>
																	<ul>
																					<li><strong>Original Install Date:</strong> La edad real de tu instalación de Windows.</li>
																					<li><strong>System Boot Time:</strong> Cuándo se encendió la PC por última vez.</li>
																					<li><strong>Hotfix(s):</strong> Las actualizaciones de seguridad instaladas.</li>
																	</ul>
													</div>
													<p><em>Truco: Es mucha información. Usa la tubería (|) para filtrar: <code>systeminfo | find "Memory"</code>.</em></p>
									`
					},
					{
									titulo: "3. WMIC: El Lenguaje de los Dioses",
									tiempo: "15 min",
									contenido: `
													<p><strong>WMIC</strong> (Windows Management Instrumentation Command-line) es más que un comando; es una interfaz de gestión. Funciona con una gramática específica:</p>
													
													<div class="syntax-breakdown">
																	<div class="syntax-part syn-cmd">wmic</div>
																	<div class="syntax-part syn-alias">bios</div>
																	<div class="syntax-part syn-verb">get</div>
																	<div class="syntax-part syn-param">serialnumber</div>
													</div>

													<p><strong>Traducción:</strong> "Oye WMIC, ve al objeto BIOS y OBTÉN el dato NÚMERO DE SERIE".</p>
									`
					},
					{
									titulo: "4. Consultas de Hardware Específicas",
									tiempo: "10 min",
									contenido: `
													<p>Vamos a practicar consultas que te harán parecer un mago ante cualquier soporte técnico:</p>
													
													<div class="spec-card">
																	<span class="spec-title">Identificar la Placa Base (Motherboard)</span>
																	<code>wmic baseboard get product,manufacturer,version</code>
													</div>

													<div class="spec-card">
																	<span class="spec-title">Detalles de la CPU</span>
																	<code>wmic cpu get name,numberofcores,maxclockspeed</code>
													</div>

													<div class="spec-card">
																	<span class="spec-title">Estado del Disco Duro</span>
																	<code>wmic diskdrive get model,size,status</code>
																	<br><em>(Si Status dice "OK", respira tranquilo. Si dice "Pred Fail", corre a hacer backup).</em>
													</div>
									`
					},
					{
									titulo: "5. Exportación de Reportes Profesionales",
									tiempo: "5 min",
									contenido: `
													<p>De nada sirve ver los datos si no puedes entregarlos. WMIC puede generar reportes HTML automáticamente.</p>
													
													<div class="cmd-block">
																	wmic /output:reporte.html computersystem get /format:hform
													</div>
													
													<p>Al ejecutar esto, se creará un archivo <code>reporte.html</code> en tu carpeta actual. Al abrirlo, verás una tabla diseñada profesionalmente con los datos del sistema. ¡Ideal para entregar a clientes!</p>
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
