// Datos de la Masterclass Sesión 04
const sessionData = {
	meta: {
					titulo: "Arquitectura de Directorios",
					subtitulo: "Creación (MKDIR), Eliminación (RMDIR) y Visualización (TREE)",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Diseñar y gestionar estructuras jerárquicas de información complejas."
	},
	secciones: [
					{
									titulo: "1. Introducción: El Arquitecto Digital",
									tiempo: "5 min",
									contenido: `
													<p>Una computadora desordenada es una mente desordenada. Hoy aprenderás a levantar estructuras de carpetas complejas en segundos, algo que con el mouse tomaría minutos.</p>
													<p>Usaremos tres herramientas clave:</p>
													<ul>
																	<li><strong>MKDIR</strong> (Make Directory): Para construir.</li>
																	<li><strong>RMDIR</strong> (Remove Directory): Para demoler.</li>
																	<li><strong>TREE</strong>: Para ver los planos.</li>
													</ul>
									`
					},
					{
									titulo: "2. MKDIR: Construcción Rápida",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>mkdir</code> (o <code>md</code>) crea nuevos directorios.</p>
													
													<strong>Nivel Básico:</strong>
													<div class="cmd-block">C:\\> mkdir Proyecto</div>
													
													<strong>Nivel Pro (Nombres con espacios):</strong>
													<p>Si tu carpeta tiene espacios, <strong>SIEMPRE</strong> usa comillas. De lo contrario, CMD creará tres carpetas distintas.</p>
													<div class="cmd-block">C:\\> mkdir "Curso De Programacion"</div>
													
													<strong>Nivel Dios (Estructuras anidadas):</strong>
													<p>Puedes crear un árbol completo de una sola vez:</p>
													<div class="cmd-block">C:\\> mkdir 2026\\Enero\\Facturas</div>
													<p><em>Esto crea la carpeta 2026, dentro la de Enero y dentro la de Facturas automáticamente.</em></p>
									`
					},
					{
									titulo: "3. TREE: La Vista de Águila",
									tiempo: "10 min",
									contenido: `
													<p>A veces te pierdes en las subcarpetas. <code>tree</code> te da un mapa visual instantáneo.</p>
													
													<div class="folder-structure">
C:.
└───2026
	├───Enero
	│   └───Facturas
	└───Febrero
													</div>

													<p><strong>Comandos Útiles:</strong></p>
													<ul>
																	<li><code>tree</code>: Muestra solo carpetas.</li>
																	<li><code>tree /f</code>: Muestra carpetas Y archivos (Files).</li>
																	<li><code>tree /a</code>: Usa caracteres ASCII (útil si vas a exportar el árbol a un archivo de texto simple).</li>
													</ul>
									`
					},
					{
									titulo: "4. RMDIR: Demolición Controlada",
									tiempo: "15 min",
									contenido: `
													<p>Eliminar carpetas es delicado. El comando es <code>rmdir</code> (o <code>rd</code>).</p>
													
													<strong>Regla de Seguridad #1:</strong>
													<p>Por defecto, <code>rmdir</code> SOLO borra carpetas vacías. Si hay un archivo dentro, CMD te protegerá y dará error.</p>
													
													<strong>Regla de Seguridad #2 (El modo Demolición):</strong>
													<p>Para borrar una carpeta llena (con subcarpetas y archivos), usas el modificador <code>/s</code> (Subdirectorios) y <code>/q</code> (Quiet/Silencioso).</p>
													
													<div class="danger-box">
																	<strong style="text-align:flex-start">¡PELIGRO!</strong><br>
																	<code>rmdir /s /q Proyecto_X</code><br>
																	Este comando borrará "Proyecto_X" y TODO lo que contenga dentro sin pedir confirmación. Úsalo con extrema precaución.
													</div>
									`
					},
					{
									titulo: "5. Práctica de Ingeniería",
									tiempo: "5 min",
									contenido: `
													<p><strong>Desafío Final:</strong></p>
													<ol>
																	<li>Sitúate en el Escritorio.</li>
																	<li>Crea la estructura: <code>mkdir "Empresa\\Depto IT\\Manuales"</code></li>
																	<li>Verifica tu obra con <code>tree</code>.</li>
																	<li>Elimina toda la estructura de la empresa de un solo golpe con <code>rmdir /s</code>.</li>
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
