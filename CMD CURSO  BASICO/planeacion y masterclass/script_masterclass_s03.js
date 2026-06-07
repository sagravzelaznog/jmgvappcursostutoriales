// Datos de la Masterclass Sesión 03
const sessionData = {
	meta: {
					titulo: "Gestión Integral de Archivos",
					subtitulo: "Dominando COPY, MOVE, DEL y el uso de Comodines",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Aprender a manipular la información sin depender del explorador de archivos."
	},
	modulos: [
					{
									titulo: "1. Introducción: Cirugía de Datos",
									tiempo: "5 min",
									contenido: `
													<p>En esta sesión dejaremos de "mirar" y empezaremos a "tocar". La gestión de archivos en CMD es más rápida que usar el mouse, pero requiere precisión.</p>
													<p>Regla de oro: <strong>Siempre verifica la ruta antes de presionar Enter.</strong></p>
									`
					},
					{
									titulo: "2. COPY: El Arte de Clonar",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>copy</code> crea un duplicado exacto. El original permanece intacto.</p>
													<div class="syntax-box">Sintaxis: copy [origen] [destino]</div>
													
													<p><strong>Ejemplos Prácticos:</strong></p>
													<ul>
																	<li>Copiar un archivo a otra carpeta:
																					<br><code>copy reporte.txt C:\\Backup\\</code></li>
																	<li>Copiar y renombrar al mismo tiempo:
																					<br><code>copy reporte.txt reporte_final.txt</code></li>
													</ul>
									`
					},
					{
									titulo: "3. MOVE: Teletransportación y Renombramiento",
									tiempo: "10 min",
									contenido: `
													<p>A diferencia de copy, <code>move</code> traslada el archivo. El original desaparece de la ubicación inicial.</p>
													<p><strong>Dato Curioso:</strong> En CMD, no existe un comando "renombrar" exclusivo (aunque existe <code>ren</code>). Los profesionales usan <code>move</code> para cambiar nombres.</p>
													<div class="cmd-block">
																	C:\\> move archivo_viejo.txt archivo_nuevo.txt<br>
																	1 archivos movidos.
													</div>
													<p>Esto no mueve el archivo de carpeta, solo cambia su "etiqueta" (nombre).</p>
									`
					},
					{
									titulo: "4. DEL: Eliminación Sin Retorno",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>del</code> (delete) es definitivo. En la consola, <strong>NO EXISTE LA PAPELERA DE RECICLAJE</strong> por defecto.</p>
													
													<div class="danger-zone">
																	¡ADVERTENCIA! Una vez ejecutado 'del', los archivos son eliminados permanentemente del sistema de archivos visible.
													</div>

													<p><strong>Modificadores de Seguridad:</strong></p>
													<ul>
																	<li><code>del /p</code> : Pide confirmación antes de borrar cada archivo (Recomendado para novatos).</li>
																	<li><code>del /f</code> : Fuerza la eliminación de archivos de solo lectura.</li>
													</ul>
									`
					},
					{
									titulo: "5. El Poder de los Comodines (*)",
									tiempo: "10 min",
									contenido: `
													<p>El asterisco <code>*</code> representa "todo" o "cualquier cosa". Es la herramienta más potente para automatización masiva.</p>
													
													<div class="wildcard-viz">
Archivos en carpeta:
foto1.jpg
foto2.jpg
texto.txt
script.bat

Comando: del *.jpg
Resultado: Elimina foto1 y foto2. Mantiene texto y script.
													</div>
													
													<p><strong>Ejercicio Mental:</strong> <code>copy *.doc F:\\Backup</code> copiaría todos los documentos de Word a tu memoria USB en un solo segundo.</p>
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
