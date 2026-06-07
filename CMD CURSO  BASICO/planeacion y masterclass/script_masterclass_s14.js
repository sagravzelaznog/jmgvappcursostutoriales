// Datos de la Masterclass Sesión 14
const sessionData = {
	meta: {
					titulo: "Automatización Masiva: El Comando FOR",
					subtitulo: "Procesamiento en Lote y Bucles Repetitivos",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Ejecutar una misma acción sobre cientos de archivos o valores con una sola línea de código."
	},
	modulos: [
					{
									titulo: "1. Introducción: La Cinta Transportadora",
									tiempo: "5 min",
									contenido: `
													<p>Imagina que tienes 100 cajas (archivos) y debes poner una etiqueta en cada una. Hacerlo a mano es lento y propenso a errores.</p>
													<p>El comando <strong>FOR</strong> es un robot industrial. Tú le dices: <em>"Por cada caja que pase por aquí, ponle una etiqueta"</em>. Y el robot lo repetirá hasta que se acaben las cajas.</p>
									`
					},
					{
									titulo: "2. Anatomía de un Bucle",
									tiempo: "15 min",
									contenido: `
													<p>La sintaxis asusta, pero vamos a diseccionarla pieza por pieza:</p>
													
													<div class="anatomy-box">
																	<div class="part part-key">FOR</div>
																	<div class="part part-var">%%A</div>
																	<div class="part part-key">IN</div>
																	<div class="part part-set">(Conjunto)</div>
																	<div class="part part-key">DO</div>
																	<div class="part part-cmd">echo %%A</div>
													</div>

													<ul>
																	<li><strong>%%A:</strong> Es la "Garra del Robot". Sostiene el objeto actual temporalmente.</li>
																	<li><strong>(Conjunto):</strong> Es la lista de cosas a procesar (ej: *.txt).</li>
																	<li><strong>DO:</strong> Es la acción a realizar (ej: borrar, copiar, imprimir).</li>
													</ul>

													<div class="syntax-warning">
																	⚠️ <strong>REGLA DE ORO:</strong><br>
																	En la ventana negra (CMD directo) usa un solo porcentaje: <code>%A</code><br>
																	Dentro de un archivo (.bat) usa doble porcentaje: <code>%%A</code>
													</div>
									`
					},
					{
									titulo: "3. FOR /L : El Contador Numérico",
									tiempo: "10 min",
									contenido: `
													<p>El modificador <strong>/L</strong> (Loop) sirve para contar números. Es ideal para crear carpetas seriadas.</p>
													<p><strong>Sintaxis:</strong> (Inicio, Paso, Fin)</p>
													
													<div class="cmd-block">
																	FOR /L %%i IN (1, 1, 5) DO echo Numero %%i
													</div>
													
													<p><em>Traducción: "Empieza en 1, avanza de 1 en 1, y detente al llegar a 5".</em></p>
													<p>Esto imprimirá: 1, 2, 3, 4, 5.</p>
									`
					},
					{
									titulo: "4. Iterando Archivos (El Poder Real)",
									tiempo: "10 min",
									contenido: `
													<p>Aquí es donde el SysAdmin brilla. Vamos a hacer algo a TODOS los archivos de texto de una carpeta.</p>
													
													<div class="code-editor">
<span class="syn-key">FOR</span> %%f <span class="syn-key">IN</span> (*.txt) <span class="syn-key">DO</span> (<br>
	echo Procesando archivo: %%f<br>
	type %%f >> reporte_completo.txt<br>
)
													</div>
													
													<p><strong>Explicación:</strong> Este script toma cada archivo .txt individual, muestra su nombre y luego "vuelca" su contenido dentro de un solo archivo maestro llamado <em>reporte_completo.txt</em>. ¡Magia!</p>
									`
					},
					{
									titulo: "5. Proyecto: Creador de Carpetas Masivo",
									tiempo: "5 min",
									contenido: `
													<p><strong>Reto Final:</strong> Tu jefe necesita 12 carpetas para los meses del año (Mes_1, Mes_2...). Tienes 30 segundos.</p>
													
													<div class="code-editor">
@echo off
echo Generando estructura anual...
<span class="syn-key">FOR</span> /L %%x <span class="syn-key">IN</span> (1, 1, 12) <span class="syn-key">DO</span> (<br>
	mkdir "Mes_%%x"<br>
)
pause
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
