// Datos de la Masterclass Sesión 15
const sessionData = {
	meta: {
					titulo: "Seguridad, Usuarios y Permisos (ACL)",
					subtitulo: "Dominando NET USER e ICACLS",
					instructor: "JMGV-PTEL",
					duracion: "45 Minutos",
					objetivo: "Gestionar cuentas de usuario y controlar el acceso a archivos mediante listas de control de acceso (ACL)."
	},
	modulos: [
					{
									titulo: "1. Introducción: El Portero Digital",
									tiempo: "5 min",
									contenido: `
													<p>En Windows, la seguridad tiene dos capas:</p>
													<ol>
																	<li><strong>Autenticación:</strong> ¿Quién eres? (Usuario y Contraseña) -> Controlado por <code>net user</code>.</li>
																	<li><strong>Autorización:</strong> ¿Qué puedes tocar? (Lectura/Escritura) -> Controlado por <code>icacls</code>.</li>
													</ol>
													<p>Hoy aprenderás a ser el portero que decide quién entra y quién se queda fuera.</p>
									`
					},
					{
									titulo: "2. NET USER: Gestión de Identidades",
									tiempo: "10 min",
									contenido: `
													<p>Este comando crea, modifica y elimina cuentas. Es vital ejecutar CMD como <strong>Administrador</strong>.</p>
													
													<div class="user-id-card">
																	<div class="user-avatar">👤</div>
																	<div>
																					<strong>Crear Usuario Nuevo:</strong><br>
																					<code>net user JMGV 12345 /add</code><br>
																					<small>Crea el usuario "JMGV" con contraseña "12345".</small>
																	</div>
													</div>

													<div class="user-id-card" style="border-left-color: #c0392b;">
																	<div class="user-avatar" style="color: #c0392b;">🗑️</div>
																	<div>
																					<strong>Eliminar Usuario:</strong><br>
																					<code>net user JMGV /delete</code>
																	</div>
													</div>
									`
					},
					{
									titulo: "3. Grupos: El Poder del Administrador",
									tiempo: "5 min",
									contenido: `
													<p>Un usuario nuevo es "estándar" (limitado). Para darle poder total, debes agregarlo al grupo de Administradores.</p>
													<div class="cmd-block">net localgroup Administradores JMGV /add</div>
													<p><em>Ahora "JMGV" puede instalar programas y cambiar configuraciones del sistema.</em></p>
									`
					},
					{
									titulo: "4. ICACLS: El Guardián de los Archivos",
									tiempo: "15 min",
									contenido: `
													<p>Cada archivo tiene una lista invisible (ACL) que dice quién puede tocarlo. <code>icacls</code> es la herramienta para editar esa lista.</p>
													
													<p><strong>Decodificando los Permisos:</strong></p>
													<table class="perm-table">
																	<tr><th>Código</th><th>Significado</th><th>Descripción</th></tr>
																	<tr><td><span class="perm-code">F</span></td><td>Full Control</td><td>Control Total (Dios)</td></tr>
																	<tr><td><span class="perm-code">M</span></td><td>Modify</td><td>Modificar (Editar/Borrar)</td></tr>
																	<tr><td><span class="perm-code">RX</span></td><td>Read & Execute</td><td>Leer y Ejecutar</td></tr>
																	<tr><td><span class="perm-code">R</span></td><td>Read</td><td>Solo Lectura (Ver pero no tocar)</td></tr>
													</table>
									`
					},
					{
									titulo: "5. Práctica: El Candado Digital",
									tiempo: "10 min",
									contenido: `
													<p>Vamos a denegar el acceso a una carpeta para que nadie (excepto tú) pueda verla.</p>
													
													<div class="cmd-block">
																	icacls "C:\\Secreto" /deny Invitado:(F)
													</div>
													<span class="access-badge denied">⛔ ACCESO DENEGADO</span>
													
													<p><strong>Explicación:</strong></p>
													<ul>
																	<li><code>/deny</code>: Prohibir explícitamente.</li>
																	<li><code>Invitado</code>: El usuario afectado.</li>
																	<li><code>(F)</code>: Control total (Se le prohíbe TODO).</li>
													</ul>
													<p>Para restaurar el acceso: <code>icacls "C:\\Secreto" /remove:d Invitado</code>.</p>
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
