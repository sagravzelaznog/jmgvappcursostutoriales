// Datos de la Masterclass Sesión 11
const sessionData = {
	meta: {
					titulo: "Redirección de Datos y Tuberías",
					subtitulo: "Dominando >, >> y el Pipe (|)",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Capturar resultados de comandos en archivos y encadenar procesos para automatización."
	},
	modulos: [
					{
									titulo: "1. Introducción: Atrapando la Información",
									tiempo: "5 min",
									contenido: `
													<p>Hasta ahora, todo lo que hacemos en CMD se muestra en la pantalla y desaparece al cerrar la ventana. Eso es "información volátil".</p>
													<p>Para guardar esa información (persistir), necesitamos redirigir el flujo de datos. Imagina que en lugar de que el agua salga al suelo (pantalla), conectamos una manguera hacia una cubeta (archivo).</p>
									`
					},
					{
									titulo: "2. El Operador Mayor Que (>)",
									tiempo: "10 min",
									contenido: `
													<p>Este símbolo <span class="op-badge">></span> toma la salida de un comando y la guarda en un archivo de texto.</p>
													
													<div class="flow-diagram">
																	<div class="flow-box">Comando<br>(DIR)</div>
																	<div class="flow-arrow">➔ > ➔</div>
																	<div class="flow-file flow-box">Archivo<br>(lista.txt)</div>
													</div>

													<p><strong>Regla de Oro (Sobrescritura):</strong></p>
													<p>Si el archivo ya existe, <code>></code> <strong>BORRARÁ</strong> todo su contenido anterior y escribirá lo nuevo. Es destructivo.</p>
													<div class="cmd-block">dir > inventario.txt</div>
									`
					},
					{
									titulo: "3. El Operador Doble Mayor Que (>>)",
									tiempo: "10 min",
									contenido: `
													<p>¿Qué pasa si quieres guardar un historial sin borrar lo anterior? Usas <span class="op-badge">>></span>.</p>
													<p>Este operador "Añade" (Append) la información al final del archivo existente, respetando lo que ya estaba escrito.</p>
													
													<p><strong>Caso de Uso Real (Log de Red):</strong></p>
													<div class="cmd-block">
																	echo --- Prueba de Red --- >> log_red.txt<br>
																	ping google.com >> log_red.txt<br>
																	ipconfig >> log_red.txt
													</div>
													<p><em>Resultado: Un solo archivo que contiene título, ping y configuración IP, uno tras otro.</em></p>
									`
					},
					{
									titulo: "4. La Tubería o Pipe (|)",
									tiempo: "15 min",
									contenido: `
													<p>El símbolo <span class="op-badge">|</span> (Barra vertical, generalmente en la tecla del 1 o a la izquierda del Z) es mágico. Conecta la <em>Salida</em> del comando A con la <em>Entrada</em> del comando B.</p>
													
													<div class="flow-diagram">
																	<div class="flow-box">Comando A<br>(Genera datos)</div>
																	<div class="flow-arrow">➔ | ➔</div>
																	<div class="flow-box">Comando B<br>(Filtra/Procesa)</div>
													</div>

													<p><strong>El Combo Clásico (Listar y Filtrar):</strong></p>
													<p>Imagina que <code>tasklist</code> te da 100 procesos, pero solo quieres ver Chrome.</p>
													<div class="cmd-block">tasklist | find "chrome"</div>
													<p><em>Explicación: Tasklist genera la lista, se la pasa por el tubo a Find, y Find busca el texto "chrome".</em></p>
									`
					},
					{
									titulo: "5. Práctica de Fontanería Avanzada",
									tiempo: "5 min",
									contenido: `
													<p><strong>Desafío Final:</strong> Crear un inventario filtrado.</p>
													<ol>
																	<li>Vamos a listar todos los archivos del sistema (C:\\Windows).</li>
																	<li>Vamos a filtrar solo los ejecutables (.exe).</li>
																	<li>Vamos a guardar el resultado en un archivo en tu escritorio.</li>
													</ol>
													<div class="cmd-block">
																	dir C:\\Windows /b | find ".exe" > %UserProfile%\\Desktop\\ejecutables.txt
													</div>
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
