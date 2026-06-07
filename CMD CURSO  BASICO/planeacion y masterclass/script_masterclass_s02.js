// Datos de la Masterclass Sesión 02
const sessionData = {
	meta: {
					titulo: "Navegación y Exploración de Directorios",
					subtitulo: "Dominando los comandos CD y DIR",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					nivel: "Fundamentos Técnicos"
	},
	secciones: [
					{
									titulo: "1. Concepto: El Árbol de Directorios",
									tiempo: "5 min",
									contenido: `
													<p>Imagina tu disco duro como un árbol invertido. La raíz (Root) está arriba, y las ramas (carpetas) crecen hacia abajo. Sin el Explorador de Archivos, estás a ciegas. </p>
													<div class="tree-diagram">
C:\\ (Raíz)
├── Windows
├── Archivos de Programa
└── Users
	└── JMGV (Tú estás aquí)
					├── Documentos
					└── Escritorio
													</div>
													<p>Para moverte necesitas dos cosas: <strong>Ojos</strong> (Comando <code>DIR</code>) y <strong>Piernas</strong> (Comando <code>CD</code>).</p>`
					},
					{
									titulo: "2. Tus Ojos: El comando DIR",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>dir</code> lista el contenido de la ubicación actual. Pero un profesional usa <em>modificadores</em> (flags) para filtrar la información.</p>
													
													<strong>Comandos Esenciales:</strong>
													<ul>
																	<li><code>dir</code> : Listado estándar (muestra fecha, hora, tamaño).</li>
																	<li><code>dir /w</code> : Formato ancho (Wide). Elimina detalles, muestra más archivos en pantalla.</li>
																	<li><code>dir /p</code> : Pausa (Page). Ideal cuando hay cientos de archivos; te pide presionar una tecla para avanzar.</li>
													</ul>
													<div class="cmd-block">C:\\Users\\JMGV> dir /w /p</div>
													<div class="pro-tip">💡 <strong>Tip Pro:</strong> Los archivos que terminan en <code>.exe</code>, <code>.bat</code> o <code>.com</code> son ejecutables. Los directorios se marcan como <code>&lt;DIR&gt;</code>.</div>`
					},
					{
									titulo: "3. Tus Piernas: El comando CD",
									tiempo: "15 min",
									contenido: `
													<p><code>cd</code> significa <em>Change Directory</em>. Es tu herramienta de teletransportación.</p>
													
													<strong>Movimientos Básicos:</strong>
													<ol>
																	<li><strong>Entrar a una carpeta:</strong> <code>cd [nombre]</code>
																					<br>Ej: <code>cd Desktop</code> (Entras al escritorio).</li>
																	<li><strong>Regresar un nivel (Atrás):</strong> <code>cd ..</code>
																					<br>Ej: Si estás en <em>Escritorio</em>, <code>cd ..</code> te regresa a <em>JMGV</em>.</li>
																	<li><strong>Ir a la Raíz:</strong> <code>cd \\</code>
																					<br>Te lleva directo a <code>C:\\</code> sin importar cuán profundo estés.</li>
													</ol>
													<div class="cmd-block">
C:\\Users\\JMGV> cd Desktop<br>
C:\\Users\\JMGV\\Desktop> cd ..<br>
C:\\Users\\JMGV> _
													</div>`
					},
					{
									titulo: "4. Rutas Absolutas vs. Relativas",
									tiempo: "10 min",
									contenido: `
													<p>Este es el concepto que separa a los novatos de los expertos.</p>
													<ul>
																	<li><strong>Ruta Relativa (El vecino):</strong> Depende de dónde estás parado.
																					<br><em>"Ve a la carpeta Fotos"</em> (Solo funciona si tienes la carpeta enfrente).</li>
																	<li><strong>Ruta Absoluta (El GPS):</strong> Funciona desde cualquier lugar.
																					<br><em>"Ve a C:\\Users\\JMGV\\Fotos"</em> (Funciona aunque estés en Windows\\System32).</li>
													</ul>
													<div class="note-box">
																	<strong>Ejercicio Mental:</strong> Si estás perdido en el sistema, usa siempre rutas absolutas para llegar a un lugar seguro.
													</div>`
					},
					{
									titulo: "5. Práctica de Navegación",
									tiempo: "5 min",
									contenido: `
													<p>Realiza la siguiente secuencia sin usar el mouse:</p>
													<ol>
																	<li>Abre CMD.</li>
																	<li>Ve a la raíz del disco: <code>cd \\</code></li>
																	<li>Entra a la carpeta de Windows: <code>cd Windows</code></li>
																	<li>Lista los archivos en modo pausa: <code>dir /p</code></li>
																	<li>Regresa a tu carpeta de usuario usando una ruta absoluta (ej: <code>cd C:\\Users\\TuNombre</code>).</li>
													</ol>`
					}
	]
};

// Lógica de Renderizado (Optimizada para reutilización)


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
