// Datos de la Masterclass detallada
const masterclassData = {
	meta: {
					titulo: "Fundamentos y Entorno del Símbolo del Sistema",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					nivel: "Iniciación Técnica"
	},
	secciones: [
					{
									titulo: "1. Introducción: ¿Por qué la Pantalla Negra?",
									tiempo: "5 min",
									contenido: `
													<p>Bienvenido. La mayoría de los usuarios viven en la <strong>GUI</strong> (Interfaz Gráfica de Usuario), donde todo es "clic y arrastrar". Pero tú estás aquí para aprender la <strong>CLI</strong> (Interfaz de Línea de Comandos).</p>
													<div class="note-box">
																	<strong>Analogía Andragógica:</strong> La GUI es como manejar un coche automático: fácil, pero limitado. La CLI es como abrir el capó y ajustar el motor manualmente. Tienes control total.
													</div>
													<p>En esta sesión, perderemos el miedo a la terminal y configuraremos nuestro entorno de trabajo profesional.</p>
									`
					},
					{
									titulo: "2. Acceso y Privilegios: Usuario vs. Admin",
									tiempo: "10 min",
									contenido: `
													<p>No todos los comandos son iguales. Existen dos modos de ejecución:</p>
													<ul>
																	<li><span class="key-concept">Modo Usuario:</span> Restringido a tus carpetas personales. Seguro para practicar.</li>
																	<li><span class="key-concept">Modo Administrador:</span> Acceso total al sistema (System32). Necesario para configuraciones avanzadas.</li>
													</ul>
													<p><strong>Paso a Paso:</strong></p>
													<ol>
																	<li>Presiona la tecla <span class="step-badge">Windows + R</span>.</li>
																	<li>Escribe <code>cmd</code>.</li>
																	<li>Para modo Admin: Presiona <span class="step-badge">Ctrl + Shift + Enter</span>.</li>
													</ol>
									`
					},
					{
									titulo: "3. Anatomía del Prompt",
									tiempo: "10 min",
									contenido: `
													<p>Antes de escribir, debemos leer. El texto que parpadea se llama <strong>Prompt</strong>.</p>
													<div class="cmd-block">C:\\Users\\JMGV>_</div>
													<p>Desglose:</p>
													<ul>
																	<li><code>C:</code> = La unidad de disco actual.</li>
																	<li><code>\\Users\\JMGV</code> = La ruta (path) o carpeta donde estás "parado" actualmente.</li>
																	<li><code>></code> = El separador que espera tu orden.</li>
													</ul>
									`
					},
					{
									titulo: "4. Personalización del Entorno (Hacking Visual)",
									tiempo: "15 min",
									contenido: `
													<p>Un profesional trabaja en un entorno limpio. Vamos a usar los comandos <code>color</code> y <code>title</code>.</p>
													
													<p><strong>Comando COLOR:</strong></p>
													<p>Sintaxis: <code>color [fondo][texto]</code> (Valores hexadecimales 0-F).</p>
													<div class="cmd-block">
																	C:\\> color 0A <br>
																	(Fondo Negro, Texto Verde - Estilo Matrix)<br><br>
																	C:\\> color f0 <br>
																	(Fondo Blanco, Texto Negro - Estilo Documento)
													</div>

													<p><strong>Comando TITLE:</strong></p>
													<p>Sirve para nombrar tu ventana y organizar tus tareas.</p>
													<div class="cmd-block">C:\\> title Consola de Control JMGV-PTEL</div>
									`
					},
					{
									titulo: "5. Práctica Final de Cierre",
									tiempo: "5 min",
									contenido: `
													<p>Para completar esta sesión, ejecuta la siguiente secuencia de comandos y observa el resultado:</p>
													<div class="cmd-block">
																	cd \<br>
																	title Masterclass Sesion 01<br>
																	color 0e<br>
																	cls<br>
																	ver<br>
																	echo ¡Entorno Configurado Exitosamente!
													</div>
													<p><em>Felicidades. Has dado tu primer paso hacia el dominio del sistema.</em></p>
									`
					}
	]
};


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
