// Datos de la Masterclass Sesión 08
const sessionData = {
	meta: {
					titulo: "Control de Procesos y Memoria",
					subtitulo: "Dominando TASKLIST y TASKKILL",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Identificar procesos en ejecución y forzar el cierre de aplicaciones bloqueadas sin usar el ratón."
	},
	modulos: [
					{
									titulo: "1. Introducción: Cirugía de Sistema",
									tiempo: "5 min",
									contenido: `
													<p>Cuando una aplicación se congela ("No responde"), el Administrador de Tareas gráfico a veces ni siquiera abre. Aquí es donde entra la consola.</p>
													<p>Todo programa en Windows es un <strong>Proceso</strong>. Para controlarlos, necesitamos saber dos cosas:</p>
													<ul>
																	<li><strong>Image Name:</strong> El nombre del ejecutable (ej: <code>chrome.exe</code>).</li>
																	<li><strong>PID (Process ID):</strong> El número único de identificación (ej: <code>4520</code>).</li>
													</ul>
									`
					},
					{
									titulo: "2. TASKLIST: Los Signos Vitales",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>tasklist</code> nos muestra todo lo que está consumiendo memoria en tu PC.</p>
													
													<table class="process-table">
																	<thead>
																					<tr><th>Nombre de imagen</th><th>PID</th><th>Nombre de sesión</th><th>Uso de memoria</th></tr>
																	</thead>
																	<tbody>
																					<tr><td>chrome.exe</td><td><span class="pid-badge">1240</span></td><td>Console</td><td>150,200 KB</td></tr>
																					<tr><td>notepad.exe</td><td><span class="pid-badge">5890</span></td><td>Console</td><td>14,500 KB</td></tr>
																					<tr><td>svchost.exe</td><td><span class="pid-badge">890</span></td><td>Services</td><td>5,000 KB</td></tr>
																	</tbody>
													</table>
													<p><small><em>*Ejemplo simplificado de la salida real.</em></small></p>
													<p><strong>Filtros Útiles:</strong></p>
													<div class="cmd-block">tasklist /fi "STATUS eq NOT RESPONDING"</div>
													<p>Este comando mágico te muestra SOLO los programas que se han trabado.</p>
									`
					},
					{
									titulo: "3. TASKKILL: El Método Suave",
									tiempo: "10 min",
									contenido: `
													<p>Para cerrar un programa, usamos <code>taskkill</code>. Por defecto, este comando le "pide por favor" al programa que se cierre (igual que presionar la X).</p>
													
													<strong>Cerrar por Nombre (La Escopeta):</strong>
													<div class="cmd-block">taskkill /im notepad.exe</div>
													<p><em>Esto cerrará TODAS las ventanas del Bloc de Notas abiertas.</em></p>
									`
					},
					{
									titulo: "4. TASKKILL /F /PID: El Método Francotirador",
									tiempo: "15 min",
									contenido: `
													<p>A veces el programa ignora tu petición de cierre. Necesitas forzarlo (Force). Además, si tienes 5 Chrome abiertos y solo quieres cerrar uno específico, usas el PID.</p>
													
													<div class="kill-switch">
																	<div class="kill-icon">☠️</div>
																	<div>
																					<strong>MODO FUERZA BRUTA:</strong><br>
																					<code>taskkill /f /pid 1240</code>
																	</div>
													</div>
													
													<ul>
																	<li><strong>/f</strong> : Force (Forzar). Mata el proceso inmediatamente sin guardar cambios.</li>
																	<li><strong>/pid [número]</strong> : Apunta a un ID específico.</li>
													</ul>
													<p><em>Advertencia: Usar /f puede causar pérdida de datos en el archivo abierto.</em></p>
									`
					},
					{
									titulo: "5. Práctica de Crisis Simulada",
									tiempo: "5 min",
									contenido: `
													<p>Vamos a simular un programa rebelde:</p>
													<ol>
																	<li>Abre el Bloc de Notas (<code>notepad</code>).</li>
																	<li>Ejecuta <code>tasklist</code> y busca el PID de <code>notepad.exe</code> (ej: 3344).</li>
																	<li>Intenta el cierre suave: <code>taskkill /pid 3344</code>.</li>
																	<li>Vuelve a abrirlo y ciérralo forzosamente: <code>taskkill /f /im notepad.exe</code>.</li>
													</ol>
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
