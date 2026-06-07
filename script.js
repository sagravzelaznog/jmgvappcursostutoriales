document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const logoutBtn = document.getElementById('logout-btn');
    const coursesContainer = document.getElementById('courses-container');

    // Lista de cursos disponibles en la carpeta
    const courses = [
        {
            folder: "CMD CURSO  BASICO",
            name: "CMD Básico",
            desc: "Aprende los comandos esenciales de la línea de comandos de Windows.",
            icon: "fa-terminal"
        },
        {
            folder: "TUTORIALES DE INFO",
            name: "Tutoriales de Info",
            desc: "Material de apoyo y tutoriales generales de informática.",
            icon: "fa-desktop"
        },
        {
            folder: "TUTORICALS DE INFO",
            name: "Tutorials de Info (Alt)",
            desc: "Directorio alternativo de tutoriales de informática.",
            icon: "fa-book-open"
        },
        {
            folder: "curso Cisco Paket Tracer",
            name: "Cisco Packet Tracer",
            desc: "Simulación de redes, configuración de routers y switches.",
            icon: "fa-network-wired"
        },
        {
            folder: "curso GeoGebra",
            name: "GeoGebra",
            desc: "Matemáticas dinámicas, geometría, álgebra y cálculo.",
            icon: "fa-calculator"
        },
        {
            folder: "curso-javascript",
            name: "JavaScript",
            desc: "Desarrollo web interactivo, lógica de programación y PWA.",
            icon: "fa-js"
        },
        {
            folder: "cursofernandarubi",
            name: "Curso Fernanda Rubi",
            desc: "Materiales y lecciones específicas del curso.",
            icon: "fa-chalkboard-user"
        },
        {
            folder: "ia manuel curso",
            name: "Curso IA Manuel",
            desc: "Inteligencia Artificial y sus aplicaciones prácticas.",
            icon: "fa-robot"
        }
    ];

    // Verificar si ya hay una sesión activa
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
    }

    // Manejar el submit del login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validar credenciales (admin@correo.com / 1234)
        if (email === 'admin@correo.com' && password === '1234') {
            errorMessage.classList.add('hidden');
            localStorage.setItem('isLoggedIn', 'true');
            showDashboard();
            // Limpiar formulario
            emailInput.value = '';
            passwordInput.value = '';
        } else {
            // Mostrar error con pequeña animación
            errorMessage.classList.remove('hidden');
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    });

    // Manejar cierre de sesión
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        showLogin();
    });

    // Función para mostrar dashboard y renderizar cursos
    function showDashboard() {
        loginScreen.classList.remove('active-screen');
        loginScreen.classList.add('hidden-screen');
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            dashboardScreen.style.display = 'block';
            dashboardScreen.classList.remove('hidden-screen');
            dashboardScreen.classList.add('active-screen');
            
            renderCourses();
        }, 300); // Esperar que termine la animación
    }

    // Función para mostrar login
    function showLogin() {
        dashboardScreen.classList.remove('active-screen');
        dashboardScreen.classList.add('hidden-screen');
        
        setTimeout(() => {
            dashboardScreen.style.display = 'none';
            loginScreen.style.display = 'block';
            loginScreen.classList.remove('hidden-screen');
            loginScreen.classList.add('active-screen');
        }, 300);
    }

    // Función para renderizar las tarjetas de los cursos
    function renderCourses() {
        coursesContainer.innerHTML = '';
        
        courses.forEach((course, index) => {
            const card = document.createElement('a');
            // La ruta apunta al directorio. El navegador cargará index.html automáticamente o mostrará el índice de archivos
            card.href = encodeURIComponent(course.folder) + "/"; 
            card.className = 'course-card';
            
            // Añadir un pequeño retraso de animación en cascada
            card.style.animation = `fadeUp 0.5s ease-out ${index * 0.1}s forwards`;
            card.style.opacity = '0';
            
            card.innerHTML = `
                <div class="course-icon">
                    <i class="fa-solid ${course.icon}"></i>
                </div>
                <h3>${course.name}</h3>
                <p>${course.desc}</p>
                <div class="course-action">
                    Entrar al curso <i class="fa-solid fa-arrow-right"></i>
                </div>
            `;
            
            coursesContainer.appendChild(card);
        });
    }
});

// Estilo para la animación de shake (error de login)
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
`;
document.head.appendChild(style);
