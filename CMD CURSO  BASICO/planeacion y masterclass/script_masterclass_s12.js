// Datos de la Masterclass Sesión 12
const sessionData = {
	meta: {
					titulo: "Introducción al Batch Scripting",
					subtitulo: "Variables, Echo y Estructura Básica (.bat)",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Crear archivos ejecutables que almacenen datos y automaticen tareas secuenciales."
	},
	modulos: [
					{
									titulo: "1. ¿Qué es un archivo Batch (.bat)?",
									tiempo: "5 min",
									contenido: `
													<p>Hasta ahora, has sido un pianista tocando nota por nota. Un archivo <strong>Batch</strong> es una partitura completa. Escribes las notas una vez, y la computadora las toca sola todas las veces que quieras.</p>
													<p>Un archivo <code>.bat</code> es simplemente un archivo de texto plano con extensión cambiada, que Windows ejecuta línea por línea.</p>
									`
					},
					{
									titulo: "2. La Estructura Sagrada: @echo off",
									tiempo: "10 min",
									contenido: `
													<p>Todo buen script profesional comienza igual. Si no usas este comando, Windows repetirá ("hará eco") cada comando antes de ejecutarlo, ensuciando la pantalla.</p>
													
													<div class="code-editor">
																	<span class="line-num">1</span><span class="syn-cmd">@echo off</span> <span class="syn-comment">:: Silencia el ruido del sistema</span><br>
																	<span class="line-num">2</span><span class="syn-cmd">title</span> <span class="syn-str">Mi Primer Script</span><br>
																	<span class="line-num">3</span><span class="syn-cmd">echo</span> <span class="syn-str">Hola Mundo, soy un programador.</span><br>
																	<span class="line-num">4</span><span class="syn-cmd">pause</span> <span class="syn-comment">:: Evita que la ventana se cierre sola</span>
													</div>
													
													<p><strong>Explicación:</strong> <code>pause</code> es vital. Sin él, el script se ejecutará en 0.01 segundos y la ventana se cerrará antes de que puedas leer nada.</p>
									`
					},
					{
									titulo: "3. Variables (SET): Las Cajas de Memoria",
									tiempo: "15 min",
									contenido: `
													<p>En programación, una variable es una caja con una etiqueta donde guardas información. En Batch, la caja se crea con <code>set</code>.</p>
													
													<div class="concept-card">
																	<strong>Sintaxis:</strong> set nombre_caja=valor
													</div>

													<p>Para <strong>GUARDAR</strong> usas <code>set</code>. Para <strong>LEER</strong> lo que hay dentro, usas signos de porcentaje <code>%</code> alrededor del nombre.</p>

													<div class="code-editor">
																	<span class="line-num">1</span><span class="syn-cmd">set</span> <span class="syn-var">fruta</span><span class="syn-op">=</span><span class="syn-str">Manzana</span><br>
																	<span class="line-num">2</span><span class="syn-cmd">echo</span> <span class="syn-str">Me gusta comer</span> <span class="syn-per">%fruta%</span>
													</div>
													<p><em>La consola imprimirá: "Me gusta comer Manzana".</em></p>
									`
					},
					{
									titulo: "4. Interactividad: Preguntando al Usuario",
									tiempo: "10 min",
									contenido: `
													<p>¿Quieres que tu script hable con el humano? Usamos el modificador <code>/p</code> (Prompt).</p>
													
													<div class="code-editor">
																	<span class="line-num">1</span><span class="syn-cmd">set</span> <span class="syn-op">/p</span> <span class="syn-var">nombre</span><span class="syn-op">=</span><span class="syn-str">Escribe tu nombre: </span><br>
																	<span class="line-num">2</span><span class="syn-cmd">echo</span> <span class="syn-str">Bienvenido al sistema,</span> <span class="syn-per">%nombre%</span><span class="syn-str">.</span>
													</div>
													
													<p>Aquí, el script se detendrá y esperará a que el usuario escriba algo y presione Enter. Lo que escriba se guardará en la caja <code>nombre</code>.</p>
									`
					},
					{
									titulo: "5. Proyecto: La Calculadora Simple",
									tiempo: "5 min",
									contenido: `
													<p>Vamos a usar el modificador <code>/a</code> (Aritmética) para sumar.</p>
													
													<div class="code-editor">
																	<span class="line-num">1</span><span class="syn-cmd">@echo off</span><br>
																	<span class="line-num">2</span><span class="syn-cmd">set</span> <span class="syn-op">/a</span> <span class="syn-var">suma</span><span class="syn-op">=</span><span class="syn-str">5 + 5</span><br>
																	<span class="line-num">3</span><span class="syn-cmd">echo</span> <span class="syn-str">El resultado de 5 mas 5 es:</span> <span class="syn-per">%suma%</span><br>
																	<span class="line-num">4</span><span class="syn-cmd">pause</span>
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
