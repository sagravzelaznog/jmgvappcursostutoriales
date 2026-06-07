// Datos de la Masterclass Sesión 05
const sessionData = {
	meta: {
					titulo: "Operaciones Encubiertas: Atributos y Búsqueda",
					subtitulo: "Dominando ATTRIB y FIND",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Manipular la visibilidad de archivos y extraer información específica dentro de documentos."
	},
	modulos: [
					{
									titulo: "1. Introducción: Lo que Windows no te muestra",
									tiempo: "5 min",
									contenido: `
													<p>¿Sabías que hay archivos en tu USB que no puedes ver? Windows utiliza "etiquetas" invisibles llamadas <strong>Atributos</strong> para proteger el sistema.</p>
													<p>Hoy aprenderemos a:</p>
													<ul>
																	<li>Ver lo invisible.</li>
																	<li>Crear carpetas "fantasmas".</li>
																	<li>Buscar una palabra clave entre miles de líneas de texto.</li>
													</ul>
									`
					},
					{
									titulo: "2. Los 4 Guardianes (ATTRIB)",
									tiempo: "15 min",
									contenido: `
													<p>El comando <code>attrib</code> gestiona las propiedades del archivo. Existen 4 letras clave:</p>
													
													<div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:15px;">
																	<div style="flex:1; min-width:120px; text-align:center;"><span class="attribute-badge attr-r">R</span><br><strong>Read-Only</strong><br>Solo Lectura (No se puede borrar/editar)</div>
																	<div style="flex:1; min-width:120px; text-align:center;"><span class="attribute-badge attr-h">H</span><br><strong>Hidden</strong><br>Oculto (Invisible al usuario normal)</div>
																	<div style="flex:1; min-width:120px; text-align:center;"><span class="attribute-badge attr-s">S</span><br><strong>System</strong><br>Sistema (Crítico para el OS)</div>
																	<div style="flex:1; min-width:120px; text-align:center;"><span class="attribute-badge attr-a">A</span><br><strong>Archive</strong><br>Archivo (Listo para respaldo)</div>
													</div>

													<p><strong>La Fórmula Mágica (+/-):</strong></p>
													<p>Usamos <code>+</code> para agregar un atributo y <code>-</code> para quitarlo.</p>
													
													<div class="matrix-box">
																	C:\\> attrib +h +r secreto.txt <br>
																	(El archivo se vuelve oculto y de solo lectura)<br><br>
																	C:\\> attrib -h secreto.txt <br>
																	(El archivo vuelve a ser visible)
													</div>
									`
					},
					{
									titulo: "3. FIND: El Detective de Texto",
									tiempo: "10 min",
									contenido: `
													<p>Imagina que tienes un archivo de registro (log) con 5,000 líneas y buscas un error específico. No uses los ojos, usa <code>find</code>.</p>
													
													<p><strong>Sintaxis Básica:</strong></p>
													<div class="cmd-block">find "texto a buscar" nombre_archivo</div>
													
													<p><strong>Ejemplo Real:</strong></p>
													<p>Buscar la palabra "Error" en el archivo <em>sistema.log</em>:</p>
													<div class="cmd-block">C:\\> find "Error" sistema.log</div>
													<p><em>Nota: Las comillas son obligatorias en este comando.</em></p>
									`
					},
					{
									titulo: "4. Potenciando FIND (Filtros Avanzados)",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>find</code> tiene trucos bajo la manga para usuarios avanzados:</p>
													
													<ul>
																	<li><strong>/v</strong> (Inverso): Muestra todas las líneas que <em>NO</em> tienen la palabra.</li>
																	<li><strong>/c</strong> (Contador): Solo te dice <em>cuántas veces</em> aparece la palabra (ideal para estadísticas).</li>
																	<li><strong>/i</strong> (Insensible): Ignora mayúsculas y minúsculas (busca "Error" igual que "error").</li>
													</ul>

													<div class="matrix-box">
																	C:\\> find /c /i "fail" reporte.txt <br>
																	---------- REPORTE.TXT: 42 <br>
																	(Se encontraron 42 fallos)
													</div>
									`
					},
					{
									titulo: "5. Misión Final: El Archivo Fantasma",
									tiempo: "5 min",
									contenido: `
													<p><strong>Objetivo:</strong> Crear un archivo, ocultarlo y luego encontrarlo por su contenido.</p>
													<ol>
																	<li>Crea un archivo: <code>echo La clave es 1234 > clave.txt</code></li>
																	<li>Hazlo invisible y de sistema: <code>attrib +h +s clave.txt</code></li>
																	<li>Intenta verlo con <code>dir</code> (No aparecerá).</li>
																	<li>Verifícalo con <code>dir /a:h</code> (Mostrar ocultos).</li>
																	<li>Busca el contenido: <code>find "1234" clave.txt</code></li>
																	<li>Restaura la visibilidad: <code>attrib -h -s clave.txt</code></li>
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
