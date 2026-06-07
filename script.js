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

    const btnRegister = document.getElementById('btn-register');

    // Escuchar el estado de autenticación en tiempo real
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            showDashboard();
            // Mostrar correo del usuario en el header opcionalmente
            const h2 = document.querySelector('.dashboard-header h2');
            h2.textContent = `Mis Cursos (${user.email})`;
        } else {
            showLogin();
        }
    });
    // Manejar el submit del login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            errorMessage.classList.add('hidden');
            await firebase.auth().signInWithEmailAndPassword(email, password);
            // Firebase onAuthStateChanged se encargará de mostrar el dashboard
            emailInput.value = '';
            passwordInput.value = '';
        } catch (error) {
            let msg = "Credenciales incorrectas.";
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                msg = "Correo o contraseña incorrectos.";
            } else if (error.code === 'auth/too-many-requests') {
                msg = "Demasiados intentos fallidos. Intenta más tarde.";
            } else {
                msg = error.message;
            }
            
            errorMessage.textContent = msg;
            errorMessage.classList.remove('hidden');
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    });

    // Manejar registro
    btnRegister.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            errorMessage.textContent = "Por favor ingresa correo y contraseña para registrarte.";
            errorMessage.classList.remove('hidden');
            return;
        }

        try {
            errorMessage.classList.add('hidden');
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            // Firebase onAuthStateChanged se encargará de mostrar el dashboard
            emailInput.value = '';
            passwordInput.value = '';
        } catch (error) {
            let msg = "Error al registrar.";
            if (error.code === 'auth/email-already-in-use') {
                msg = "El correo ya está registrado en otra cuenta.";
            } else if (error.code === 'auth/weak-password') {
                msg = "La contraseña debe tener al menos 6 caracteres.";
            } else {
                msg = error.message;
            }
            
            errorMessage.textContent = msg;
            errorMessage.classList.remove('hidden');
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    });

    // Manejar cierre de sesión
    logoutBtn.addEventListener('click', () => {
        firebase.auth().signOut();
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
