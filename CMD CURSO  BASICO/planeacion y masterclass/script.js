// JMGV-PTEL Gamification & Global Script

const GAMIFICATION_KEY = 'cmd_masterclass_progress';

// Inicializar el progreso
let userProgress = {
	puntos: 0,
	nivel: 'Principiante',
	logros: []
};

// Cargar desde localStorage
function cargarProgreso() {
    try {
        const guardado = localStorage.getItem(GAMIFICATION_KEY);
        if (guardado) {
            userProgress = JSON.parse(guardado);
        }
    } catch (e) {
        console.warn('Gamificación local no disponible en modo archivo:', e);
    }
    actualizarUI();
}

// Guardar en localStorage
function guardarProgreso() {
    try {
        localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(userProgress));
    } catch (e) {
        // Ignorar error de CORS en file:///
    }
}

// Actualizar la interfaz (si los elementos existen en el HTML actual)
function actualizarUI() {
	const puntosEl = document.getElementById('user-points');
	const nivelEl = document.getElementById('user-level');
	
	if (puntosEl) puntosEl.innerText = userProgress.puntos;
	if (nivelEl) nivelEl.innerText = userProgress.nivel;
}

// Agregar puntos y subir nivel
function agregarPuntos(cantidad) {
	userProgress.puntos += cantidad;
	
	// Lógica de niveles
	if (userProgress.puntos >= 200) userProgress.nivel = 'Experto';
	else if (userProgress.puntos >= 100) userProgress.nivel = 'Avanzado';
	else if (userProgress.puntos >= 50) userProgress.nivel = 'Intermedio';
	
	guardarProgreso();
	actualizarUI();
	
	// Feedback visual
	mostrarNotificacion(`+${cantidad} Puntos Obtenidos!`, 'success');
}

// Notificaciones temporales (Toast)
function mostrarNotificacion(mensaje, tipo = 'info') {
	let toast = document.getElementById('toast-notification');
	if (!toast) {
		toast = document.createElement('div');
		toast.id = 'toast-notification';
		toast.style.cssText = `
			position: fixed;
			bottom: 20px;
			right: 20px;
			padding: 15px 25px;
			border-radius: 8px;
			color: white;
			font-weight: bold;
			z-index: 9999;
			transition: opacity 0.3s ease;
			box-shadow: 0 4px 12px rgba(0,0,0,0.3);
		`;
		document.body.appendChild(toast);
	}
	
	toast.style.backgroundColor = tipo === 'success' ? '#10b981' : (tipo === 'error' ? '#ef4444' : '#3b82f6');
	toast.innerText = mensaje;
	toast.style.opacity = '1';
	
	setTimeout(() => {
		toast.style.opacity = '0';
	}, 3000);
}

// Sistema de validación de comandos interactivo (usado en las sesiones)
window.validarComando = function(idEjercicio, respuestaCorrecta, divResultadoId) {
	const input = document.getElementById(idEjercicio);
	const resultado = document.getElementById(divResultadoId);
	
	if (!input || !resultado) return;
	
	const comando = input.value.toLowerCase().trim();
	
	if (comando === respuestaCorrecta.toLowerCase()) {
		resultado.className = 'feedback-msg success';
		resultado.innerHTML = '✅ ¡Comando correcto! Sistema actualizado.';
		agregarPuntos(10);
		input.disabled = true; // Evitar farmear puntos
	} else {
		resultado.className = 'feedback-msg error';
		resultado.innerHTML = '❌ Comando incorrecto o incompleto. Revisa la sintaxis.';
	}
};

// Funcionalidad global de copiado
function initClipboard() {
	const codeBlocks = document.querySelectorAll('.cmd-block, code');
	
	codeBlocks.forEach(block => {
		if(block.tagName === 'CODE' && block.parentNode.tagName === 'PRE') return; // Saltar si está dentro de pre
		
		// Si tiene botón de copiar ya definido, no añadir el evento de clic a todo el bloque
		if(block.querySelector('.copy-btn')) return;

		block.style.cursor = 'pointer';
		block.title = 'Haz clic para copiar';

		block.addEventListener('click', (e) => {
			if(e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
			
			const textToCopy = block.innerText.replace('C:\\>','').replace('CMD','').trim();
			
			navigator.clipboard.writeText(textToCopy).then(() => {
				const originalBg = block.style.backgroundColor;
				block.style.backgroundColor = 'rgba(16, 185, 129, 0.3)'; // Verde éxito temporal
				
				mostrarNotificacion('Comando copiado al portapapeles', 'success');
				
				setTimeout(() => {
					block.style.backgroundColor = originalBg;
				}, 500);
			});
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	cargarProgreso();
	initClipboard();
	console.log("%c JMGV-PTEL SYSTEM READY - GAMIFICATION ACTIVE ", "background: #000; color: #10b981; font-size: 16px; padding: 10px; border-radius: 5px;");
});
