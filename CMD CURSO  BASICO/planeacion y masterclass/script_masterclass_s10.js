// Datos de la Masterclass Sesión 10
const sessionData = {
	meta: {
					titulo: "Mantenimiento Crítico de Discos",
					subtitulo: "Dominando CHKDSK y DISKPART",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Reparar errores lógicos/físicos en unidades de almacenamiento y gestionar particiones de forma segura."
	},
	modulos: [
					{
									titulo: "1. Introducción: Anatomía del Almacenamiento",
									tiempo: "5 min",
									contenido: `
													<p>El disco duro no es una caja negra mágica. Está dividido en millones de pequeños casilleros llamados <strong>Sectores</strong>. Si un casillero se daña, el archivo guardado allí se corrompe.</p>
													<p>Hoy aprenderemos a:</p>
													<ul>
																	<li>Sanar los sectores dañados (CHKDSK).</li>
																	<li>Entender cómo se divide el pastel del almacenamiento (DISKPART).</li>
													</ul>
									`
					},
					{
									titulo: "2. CHKDSK: El Médico del Disco",
									tiempo: "10 min",
									contenido: `
													<p>El comando <code>chkdsk</code> (Check Disk) analiza la integridad del sistema de archivos. Tiene dos "medicinas" principales:</p>
													<ul>
																	<li><strong>/f (Fix):</strong> Corrige errores lógicos (índices perdidos, archivos cruzados). Es rápido.</li>
																	<li><strong>/r (Repair):</strong> Localiza sectores físicos dañados y recupera la información legible. Tarda mucho más.</li>
													</ul>
													<div class="cmd-block">chkdsk C: /f /r</div>
													<p><em>Nota: Si intentas reparar el disco C: (donde está Windows), te pedirá reiniciar para hacerlo antes de arrancar.</em></p>
									`
					},
					{
									titulo: "3. Visualizando la Reparación",
									tiempo: "5 min",
									contenido: `
													<p>Imagina tu disco así. <code>chkdsk /r</code> marca los sectores rojos para que Windows no vuelva a escribir en ellos jamás.</p>
													
													<div class="sector-map">
																	<div class="sector"></div><div class="sector"></div><div class="sector"></div>
																	<div class="sector bad" title="Sector Dañado"></div>
																	<div class="sector"></div><div class="sector recovering" title="Recuperando..."></div>
																	<div class="sector"></div><div class="sector"></div><div class="sector"></div>
																	<div class="sector bad"></div><div class="sector"></div><div class="sector"></div>
													</div>
													<small>*Verde: Sano | Rojo: Dañado (Aislado) | Naranja: En recuperación</small>
									`
					},
					{
									titulo: "4. DISKPART: El Cirujano Mayor",
									tiempo: "15 min",
									contenido: `
													<div class="warning-stripe"></div>
													<p><strong>DISKPART</strong> no es un comando simple; es una sub-consola dentro de CMD. Al escribirlo, el prompt cambia de <code>C:\\></code> a <code>DISKPART></code>.</p>
													
													<p><strong>La Regla de Oro: EL FOCO (Select)</strong></p>
													<p>En Diskpart, nada sucede si no seleccionas primero a la "víctima". El error más común es borrar el disco incorrecto.</p>
													
													<div class="diskpart-console">
																	DISKPART> list disk<br>
																	<br>
																	Núm Disco  Estado      Tamaño   Libre    Din  Gpt<br>
																	---------- ----------  -------  -------  ---  ---<br>
																	Disco 0    En línea    465 GB   0 B           *<br>
																	Disco 1    En línea    14 GB    0 B<br>
																	<br>
																	DISKPART> select disk 1<br>
																	El disco 1 es ahora el disco seleccionado.
													</div>
													<p><em>En este ejemplo, seleccionamos el Disco 1 (una USB de 14GB) para trabajar de forma segura, dejando el Disco 0 (Windows) intacto.</em></p>
									`
					},
					{
									titulo: "5. Comandos Vitales de Diskpart",
									tiempo: "10 min",
									contenido: `
													<p>Una vez seleccionado el disco (FOCUS), puedes operar:</p>
													<ul>
																	<li><code>detail disk</code>: Muestra información técnica y volúmenes (letras) dentro del disco.</li>
																	<li class="danger-box"><code>clean</code>: <strong>¡PELIGRO!</strong> Borra TODA la estructura de particiones del disco seleccionado en 1 segundo. Sin preguntas.</li>
																	<li><code>create partition primary</code>: Crea un nuevo espacio de almacenamiento en un disco limpio.</li>
													</ul>
													<p><strong>Ejercicio Teórico de Seguridad:</strong> Siempre ejecuta <code>list disk</code> tres veces antes de escribir <code>clean</code>.</p>
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
