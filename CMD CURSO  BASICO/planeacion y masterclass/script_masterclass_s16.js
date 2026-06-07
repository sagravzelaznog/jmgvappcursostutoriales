// Datos de la Masterclass Sesión 16
const sessionData = {
	meta: {
					titulo: "Proyecto Final: Automatización Total",
					subtitulo: "Creación del Sistema de Respaldo 'JMGV-AutoBack'",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Integrar todos los conocimientos (Variables, IF, Redirección, Robocopy) en una solución profesional de backup."
	},
	modulos: [
					{
									titulo: "1. El Desafío Final",
									tiempo: "5 min",
									contenido: `
													<p>Has llegado al final. Hoy dejarás de ejecutar comandos y empezarás a crear herramientas.</p>
													<p><strong>La Misión:</strong> Crear un script que, con doble clic:</p>
													<ul class="deployment-list">
																	<li>Genere una carpeta con la fecha de hoy.</li>
																	<li>Verifique si hay conexión al servidor.</li>
																	<li>Respalde tus documentos críticos.</li>
																	<li>Genere un reporte (Log) de lo sucedido.</li>
													</ul>
									`
					},
					{
									titulo: "2. ROBOCOPY: El Arma Secreta",
									tiempo: "10 min",
									contenido: `
													<p>Olvida <code>copy</code> y <code>xcopy</code>. Los profesionales usan <strong>ROBOCOPY</strong> (Robust File Copy).</p>
													<p><strong>¿Por qué?</strong></p>
													<ul>
																	<li>Si se corta internet, Robocopy pausa y reanuda.</li>
																	<li>Copia permisos de seguridad (ACL) y fechas originales.</li>
																	<li>Es multihilo (más rápido).</li>
													</ul>
													<div class="cmd-block">robocopy Origen Destino /MIR /R:0 /W:0</div>
													<small>* /MIR: Espejo (Borra en destino lo que no esté en origen). /R: Reintentos.</small>
									`
					},
					{
									titulo: "3. La Estructura del Script (Arquitectura)",
									tiempo: "10 min",
									contenido: `
													<p>Antes de codificar, diseñamos. Nuestro script usará <strong>Variables Dinámicas</strong> de tiempo.</p>
													<div class="code-editor">
<span class="hl-cmd">set</span> <span class="hl-var">dia</span>=%date:~0,2%
<span class="hl-cmd">set</span> <span class="hl-var">mes</span>=%date:~3,2%
<span class="hl-cmd">set</span> <span class="hl-var">anio</span>=%date:~6,4%
<span class="hl-cmd">set</span> <span class="hl-var">carpeta_destino</span>=D:\Backups\Respaldo_%anio%-%mes%-%dia%
													</div>
													<p><em>Esto asegura que cada respaldo tenga su propia carpeta ordenada por fecha.</em></p>
									`
					},
					{
									titulo: "4. CODIFICACIÓN: El Script Maestro",
									tiempo: "15 min",
									contenido: `
													<p>Copia y analiza este código. Es la síntesis de tus 16 sesiones.</p>
													
													<div class="master-script">
<span class="hl-cmd">@echo off</span>
<span class="hl-cmd">title</span> Sistema de Respaldo JMGV-PTEL v1.0
<span class="hl-cmd">color</span> 0A
<span class="hl-cmd">cls</span>

<span class="hl-rem">:: 1. Definir Variables</span>
<span class="hl-cmd">set</span> <span class="hl-var">origen</span>="C:\Users\Alumno\Documentos"
<span class="hl-cmd">set</span> <span class="hl-var">destino</span>="D:\Respaldo_Diario"
<span class="hl-cmd">set</span> <span class="hl-var">log</span>="C:\Logs\reporte_backup.txt"

<span class="hl-cmd">echo</span> Iniciando proceso... > <span class="hl-var">%log%</span>
<span class="hl-cmd">date</span> /t >> <span class="hl-var">%log%</span>

<span class="hl-rem">:: 2. Verificación de Red (Ping)</span>
<span class="hl-cmd">ping</span> 8.8.8.8 -n 1 > nul
<span class="hl-cmd">if</span> <span class="hl-var">%errorlevel%</span> <span class="hl-cmd">NEQ</span> 0 (
	<span class="hl-cmd">echo</span> [ERROR] No hay internet. Abortando. >> <span class="hl-var">%log%</span>
	<span class="hl-cmd">color</span> 0C
	<span class="hl-cmd">pause</span>
	<span class="hl-cmd">exit</span>
)

<span class="hl-rem">:: 3. Ejecución del Respaldo (Robocopy)</span>
<span class="hl-cmd">echo</span> Respaldando archivos...
<span class="hl-cmd">robocopy</span> <span class="hl-var">%origen%</span> <span class="hl-var">%destino%</span> /MIR /NP /R:1 /W:1 /LOG+:<span class="hl-var">%log%</span>

<span class="hl-cmd">echo</span> ¡Operacion Finalizada con Exito!
<span class="hl-cmd">pause</span>
													</div>
									`
					},
					{
									titulo: "5. Automatización Final (Task Scheduler)",
									tiempo: "5 min",
									contenido: `
													<p>El último paso para ser un Administrador Senior: <strong>Que se ejecute solo.</strong></p>
													<p>No necesitas CMD para esto. Buscas en Windows "Programador de Tareas" > "Crear Tarea Básica".</p>
													<ul>
																	<li><strong>Desencadenador:</strong> Diariamente a las 17:00 hrs.</li>
																	<li><strong>Acción:</strong> Iniciar programa -> Seleccionas tu archivo <em>respaldo.bat</em>.</li>
													</ul>
													<p>¡Felicidades! Has automatizado tu trabajo.</p>
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
