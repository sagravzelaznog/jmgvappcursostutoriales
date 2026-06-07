// Datos de la Masterclass Sesión 13
const sessionData = {
	meta: {
					titulo: "Automatización y Toma de Decisiones",
					subtitulo: "Control de Flujo con IF y GOTO",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Crear scripts inteligentes que respondan a condiciones y permitan la navegación no lineal."
	},
	modulos: [
					{
									titulo: "1. Introducción: Rompiendo la Línea Recta",
									tiempo: "5 min",
									contenido: `
													<p>Hasta ahora, tus scripts leían la línea 1, luego la 2, luego la 3... ¿Qué pasa si quieres saltar de la 1 a la 10? ¿O si quieres ejecutar la línea 5 <em>solo si</em> el usuario dice que sí?</p>
													<p>Necesitas dos herramientas:</p>
													<ul>
																	<li><strong>GOTO:</strong> El teletransportador.</li>
																	<li><strong>IF:</strong> El guardia de seguridad.</li>
													</ul>
									`
					},
					{
									titulo: "2. GOTO y las Etiquetas (:Label)",
									tiempo: "10 min",
									contenido: `
													<p>Para saltar, primero necesitas marcar el destino. Usamos los dos puntos <code>:</code> para crear una etiqueta.</p>
													
													<div class="code-editor">
<span class="syn-key">goto</span> <span class="syn-label">:saludo</span>
echo Esto nunca se verá porque lo saltamos.

<span class="syn-label">:saludo</span>
echo ¡Hola desde el futuro!
													</div>
													
													<p><em>Explicación: El script lee la primera línea y salta inmediatamente a <code>:saludo</code>, ignorando todo lo que hay en medio.</em></p>
									`
					},
					{
									titulo: "3. La Sentencia IF (Si... entonces...)",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>if</code> evalúa una condición. Si es VERDADERA, ejecuta el comando siguiente. Si es FALSA, lo ignora.</p>
													
													<div class="flow-node">
																	<div class="diamond"><span>?</span></div>
																	<div><strong>Condición:</strong> ¿Existe el archivo "clave.txt"?</div>
													</div>

													<div class="code-editor">
<span class="syn-key">if exist</span> clave.txt (
	echo ¡Archivo encontrado!
) <span class="syn-key">else</span> (
	echo Archivo no encontrado.
)
													</div>
									`
					},
					{
									titulo: "4. Comparación de Variables (EQU, NEQ)",
									tiempo: "10 min",
									contenido: `
													<p>No usamos símbolos matemáticos comunes (como > o <) porque CMD los confunde con redirecciones. Usamos códigos de 3 letras:</p>
													<ul>
																	<li><code>EQU</code> : Igual a (Equal)</li>
																	<li><code>NEQ</code> : No igual a (Not Equal)</li>
																	<li><code>LSS</code> : Menor que (Less Than)</li>
																	<li><code>GTR</code> : Mayor que (Greater Than)</li>
													</ul>

													<div class="code-editor">
<span class="syn-key">if</span> <span class="syn-var">%edad%</span> <span class="syn-op">GEQ</span> 18 echo Eres mayor de edad.
													</div>
									`
					},
					{
									titulo: "5. Proyecto: Menú de Opciones",
									tiempo: "10 min",
									contenido: `
													<p>Vamos a combinar todo para crear un menú profesional crea un archivo verip.txt.</p>
													<p>escribe el codigo en el archivo verip.txt</p>
													<div class="code-editor">
:inicio
cls
echo 1. Ver IP
echo 2. Salir
<span class="syn-key">set</span> /p <span class="syn-var">opcion</span>=Elige: 

<span class="syn-key">if</span> <span class="syn-var">%opcion%</span> <span class="syn-op">EQU</span> 1 <span class="syn-key">goto</span> :verip
<span class="syn-key">if</span> <span class="syn-var">%opcion%</span> <span class="syn-op">EQU</span> 2 <span class="syn-key">goto</span> :fin
echo Opcion invalida & <span class="syn-key">goto</span> :inicio

:verip
ipconfig
pause
<span class="syn-key">goto</span> :inicio

:fin
exit
													</div>
													<p>Guarda el archivo y cambia la extension a .bat para ejecutarlo.</p>
													<p><em>Este script crea un ciclo infinito (bucle de menú) que solo se rompe si el usuario elige salir.</em></p>
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
