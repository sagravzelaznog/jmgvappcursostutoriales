document.addEventListener('DOMContentLoaded', () => {
    // Set Year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==================== AUTHENTICATION LOGIC ====================
    const loginScreen = document.getElementById('login-screen');
    const app = document.getElementById('app');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const emailDisplay = document.getElementById('user-email-display');

    // Check if user is already logged in
    const currentUser = localStorage.getItem('academia_user');
    if (currentUser) {
        showApp(currentUser);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;

        if (email && password.length >= 4) { // Basic validation
            localStorage.setItem('academia_user', email);
            showApp(email);
        } else {
            loginError.hidden = false;
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('academia_user');
        app.hidden = true;
        loginScreen.style.display = 'flex';
        document.getElementById('email-input').value = '';
        document.getElementById('password-input').value = '';
        loginError.hidden = true;
    });

    function showApp(email) {
        loginScreen.style.display = 'none';
        app.hidden = false;
        emailDisplay.textContent = email;
    }

    // ==================== NAVIGATION LOGIC ====================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Remove active classes
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class
            link.classList.add('active');
            const targetElement = document.getElementById(targetId);
            if(targetElement) targetElement.classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ==================== QUIZ ENGINE ====================
    const quizzes = {
        1: [
            { q: "¿Qué significa HTML?", options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language", "Hyper Tool Multi Language"], answer: 0 },
            { q: "¿Cuál es la etiqueta correcta para el título más grande?", options: ["<heading>", "<h1>", "<h6>", "<head>"], answer: 1 },
            { q: "¿Qué etiqueta se usa para insertar una imagen?", options: ["<image>", "<pic>", "<img>", "<src>"], answer: 2 }
        ],
        2: [
            { q: "¿Para qué sirve el atributo 'action' en un <form>?", options: ["Dar estilo al formulario", "Indicar a dónde enviar los datos", "Crear un botón", "Validar el correo"], answer: 1 },
            { q: "¿Qué input usamos para contraseñas ocultas?", options: ["type='hidden'", "type='secret'", "type='password'", "type='text'"], answer: 2 }
        ],
        3: [
            { q: "¿Cómo seleccionas un elemento con id='titulo' en CSS?", options: [".titulo", "titulo", "*titulo", "#titulo"], answer: 3 },
            { q: "¿Qué propiedad cambia el color de fondo?", options: ["color", "background-color", "bgcolor", "back-color"], answer: 1 }
        ],
        4: [
            { q: "¿Para usar Flexbox, qué propiedad aplicamos al contenedor?", options: ["display: flex;", "float: left;", "position: flex;", "align: flex;"], answer: 0 },
            { q: "El modelo de caja (Box Model) incluye: margins, borders, padding y...", options: ["colors", "content", "shadows", "flex"], answer: 1 }
        ],
        5: [
            { q: "¿Cómo declaras una variable que no va a cambiar?", options: ["let", "var", "const", "static"], answer: 2 },
            { q: "Si let vidas = 0; ¿Qué imprimirá if(vidas > 0)?", options: ["Nada/Else", "Error", "Verdadero", "Infinito"], answer: 0 }
        ],
        6: [
            { q: "¿Qué hace document.getElementById()?", options: ["Borra un elemento", "Selecciona un elemento de HTML por su ID", "Cambia el color", "Crea un elemento nuevo"], answer: 1 },
            { q: "¿Cómo agregas un evento de clic a un botón?", options: ["boton.onClick()", "boton.click()", "boton.addEventListener('click', ...)", "boton.listenClick()"], answer: 2 }
        ]
    };

    // Initialize quizzes
    for (let i = 1; i <= 6; i++) {
        const container = document.getElementById(`quiz-container-${i}`);
        if (container) {
            renderQuizStart(container, i);
        }
    }

    function renderQuizStart(container, quizId) {
        container.innerHTML = `
            <h3>🧠 ¡Hora del Desafío!</h3>
            <p>Demuestra lo que aprendiste en esta Masterclass.</p>
            <button class="btn-start-quiz" onclick="startQuiz(${quizId})">
                <i class="fas fa-play-circle"></i> Iniciar Quiz Kahoot
            </button>
        `;
    }

    // Attach to window so onclick works
    window.startQuiz = function(quizId) {
        const container = document.getElementById(`quiz-container-${quizId}`);
        const questions = quizzes[quizId];
        let currentQ = 0;
        let score = 0;

        function escapeHTML(str) {
            return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }

        function renderQuestion() {
            if (currentQ >= questions.length) {
                // End Quiz
                const percent = Math.round((score / questions.length) * 100);
                let msg = percent >= 60 ? "¡Excelente trabajo! 🎉" : "Sigue practicando 💻";
                container.innerHTML = `
                    <h3>Quiz Finalizado</h3>
                    <div class="quiz-score" style="font-size:2rem; margin:20px 0; color:var(--accent-blue);">Puntuación: ${score}/${questions.length}</div>
                    <p>${msg}</p>
                    <button class="btn-start-quiz" style="margin-top:20px;" onclick="renderQuizStart(document.getElementById('quiz-container-${quizId}'), ${quizId})">Volver a intentar</button>
                `;
                return;
            }

            const qData = questions[currentQ];
            container.innerHTML = `
                <div class="quiz-header">
                    <span>Pregunta ${currentQ + 1} de ${questions.length}</span>
                    <span class="quiz-score">Puntos: ${score}</span>
                </div>
                <div class="quiz-question">${escapeHTML(qData.q)}</div>
                <div class="quiz-options">
                    ${qData.options.map((opt, index) => `
                        <button class="quiz-btn" onclick="checkAnswer(${quizId}, ${index}, ${qData.answer})">${escapeHTML(opt)}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="feedback-${quizId}"></div>
            `;
        }

        window.checkAnswer = function(qId, selectedIdx, correctIdx) {
            const container = document.getElementById(`quiz-container-${qId}`);
            const buttons = container.querySelectorAll('.quiz-btn');
            const feedback = document.getElementById(`feedback-${qId}`);

            // Disable all buttons
            buttons.forEach(btn => btn.disabled = true);

            if (selectedIdx === correctIdx) {
                buttons[selectedIdx].classList.add('correct');
                feedback.textContent = "¡Correcto! +1 🚀";
                feedback.className = "quiz-feedback success";
                score++;
            } else {
                buttons[selectedIdx].classList.add('wrong');
                buttons[correctIdx].classList.add('correct');
                feedback.textContent = "¡Incorrecto! 😥";
                feedback.className = "quiz-feedback error";
            }

            // Next question after delay
            setTimeout(() => {
                currentQ++;
                renderQuestion();
            }, 2000);
        };

        renderQuestion();
    };
});
