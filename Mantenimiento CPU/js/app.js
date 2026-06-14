document.addEventListener('DOMContentLoaded', () => {
    // Configuración de Firebase
    const firebaseConfig = {
        apiKey: window.ENV ? window.ENV.FIREBASE_API_KEY : "",
        authDomain: "acceso-a-cursos-4a314.firebaseapp.com",
        projectId: "acceso-a-cursos-4a314",
        storageBucket: "acceso-a-cursos-4a314.firebasestorage.app",
        messagingSenderId: "851856735092",
        appId: "1:851856735092:web:04290714cb63e4244c4a21"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Referencias DOM
    const loader = document.getElementById('loader');
    const mainLayout = document.getElementById('main-layout');
    const userEmailSpan = document.getElementById('user-email');
    const btnBack = document.getElementById('btn-back');
    const lessonsList = document.getElementById('lessons-list');
    const lessonBody = document.getElementById('lesson-body');
    const currentLessonBadge = document.getElementById('current-lesson-badge');

    // Estado local
    let lessons = [];

    // Middleware de Autenticación
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            // Usuario no autenticado, redirigir al portal
            window.location.href = '../index.html';
        } else {
            // Usuario autenticado
            userEmailSpan.textContent = user.email;
            await initializeCourse();
            hideLoader();
        }
    });

    // Botón volver
    btnBack.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // Ocultar Loader
    function hideLoader() {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainLayout.classList.remove('hidden');
        }, 500);
    }

    // Inicializar Curso (Fetch lecciones)
    async function initializeCourse() {
        try {
            const snapshot = await db.collection('courses')
                                     .doc('Mantenimiento CPU')
                                     .collection('lessons')
                                     .orderBy('order')
                                     .get();
            
            lessons = [];
            snapshot.forEach(doc => {
                lessons.push({ id: doc.id, ...doc.data() });
            });

            renderSidebar();
        } catch (error) {
            console.error("Error al obtener lecciones:", error);
            lessonsList.innerHTML = '<li style="color: #ff007a; padding: 1rem; text-align:center;">Error de sincronización con base de datos.</li>';
        }
    }

    // Renderizar Menú Lateral
    function renderSidebar() {
        lessonsList.innerHTML = ''; // Limpiar skeletons
        
        if(lessons.length === 0) {
            lessonsList.innerHTML = '<li style="color: var(--text-muted); padding: 1rem; text-align:center;">No hay lecciones cargadas.</li>';
            return;
        }

        lessons.forEach((lesson, index) => {
            const li = document.createElement('li');
            li.className = 'lesson-item';
            li.dataset.index = index;
            
            // Limpiar título de asteriscos u otros caracteres sucios del TXT
            const cleanTitle = lesson.title.replace(/=/g, '').trim();

            li.innerHTML = `
                <div class="lesson-number">M${lesson.order}</div>
                <div class="lesson-title-text">${cleanTitle}</div>
            `;

            li.addEventListener('click', () => loadLessonContent(index));
            lessonsList.appendChild(li);
        });
    }

    // Cargar contenido de la lección
    function loadLessonContent(index) {
        // Actualizar visualmente la clase activa en el sidebar
        const items = lessonsList.querySelectorAll('.lesson-item');
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');

        const lesson = lessons[index];
        const cleanTitle = lesson.title.replace(/=/g, '').trim();
        
        currentLessonBadge.textContent = cleanTitle;

        // Parsear el texto plano a un formato HTML amigable
        const htmlContent = parsePlainTextToHTML(lesson.content);

        // Animación de entrada
        lessonBody.style.opacity = '0';
        lessonBody.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            lessonBody.innerHTML = htmlContent;
            // Destacar bloques de código si hay
            formatCommandBlocks();
            
            lessonBody.style.transition = 'all 0.4s ease';
            lessonBody.style.opacity = '1';
            lessonBody.style.transform = 'translateY(0)';
            
            // Volver al top
            document.querySelector('.lesson-content-wrapper').scrollTop = 0;
        }, 200);
    }

    // Parseador rudimentario de TXT a HTML para mejorar la legibilidad
    function parsePlainTextToHTML(text) {
        if (!text) return '';
        
        let lines = text.split('\\n');
        let html = '';
        let inCodeBlock = false;
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            
            // Ignorar separadores de igual o guiones largos
            if (/^={10,}$/.test(line) || /^-{10,}$/.test(line)) continue;
            
            // Títulos H1 (MÓDULO X: ...)
            if (line.toUpperCase().startsWith('MÓDULO') || line.toUpperCase().includes('INTRODUCCIÓN ANDRAGÓGICA') || line.toUpperCase().includes('EL DESAFÍO')) {
                html += `<h2>${line}</h2>`;
                continue;
            }
            
            // Comandos detectados (Suelen empezar con > o listados)
            if (line.startsWith('>')) {
                html += `<pre class="code-block"><code>${line.substring(1).trim()}</code></pre>`;
                continue;
            }

            // Listas o viñetas
            if (line.startsWith('*') || line.startsWith('-')) {
                // Pequeño hack: Envolver en negrilla si hay dos puntos
                let liText = line.substring(1).trim();
                if(liText.includes(':')) {
                    const parts = liText.split(':');
                    liText = `<strong>${parts[0]}:</strong>${parts.slice(1).join(':')}`;
                }
                html += `<ul><li>${liText}</li></ul>`;
                continue;
            }

            // Párrafos normales
            if (line.length > 0) {
                html += `<p>${line}</p>`;
            } else {
                // Líneas en blanco añaden separación
                html += `<div style="height: 10px;"></div>`;
            }
        }
        
        return html;
    }

    // Función adicional para envolver ciertos comandos en el texto
    function formatCommandBlocks() {
        // Podríamos aplicar librerías como PrismJS aquí en un futuro
    }
});
