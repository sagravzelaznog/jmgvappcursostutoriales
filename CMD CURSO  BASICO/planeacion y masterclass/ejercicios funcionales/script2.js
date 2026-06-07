// ==========================================
// SEGURIDAD MODO PROFESOR
// ==========================================
function unlockTeacherMode() {
	const password = prompt("Ingrese el PIN de acceso maestro:");
	if (password === "1983") {
					const tips = document.querySelectorAll('.teacher-tip');
					tips.forEach(tip => tip.classList.add('visible'));
					alert("Modo Maestro Desbloqueado. Las notas pedagógicas están visibles.");
					document.getElementById('btn-profesor').style.display = 'none';
	} else if (password !== null) {
					alert("PIN incorrecto. Acceso denegado.");
	}
}

// ==========================================
// LÓGICA DEL QUIZ (10 PREGUNTAS)
// ==========================================
const questions = [
	{
					question: "¿Qué comando de CMD utilizamos para trasladar archivos de un lugar a otro?",
					answers: [
									{ text: "copy", correct: false },
									{ text: "move", correct: true },
									{ text: "traslate", correct: false },
									{ text: "mkdir", correct: false }
					]
	},
	{
					question: "¿Qué función cumple el asterisco (*) en el comando 'move *.pdf'?",
					answers: [
									{ text: "Borra todos los archivos", correct: false },
									{ text: "Es un comodín que significa 'todos los archivos'", correct: true },
									{ text: "Multiplica el tamaño del archivo", correct: false },
									{ text: "Es un error de sintaxis", correct: false }
					]
	},
	{
					question: "Si quiero mover todas mis imágenes JPEG, ¿qué escribo?",
					answers: [
									{ text: "move todas.jpg", correct: false },
									{ text: "move /jpg", correct: false },
									{ text: "move *.jpg", correct: true },
									{ text: "move imagenes.*", correct: false }
					]
	},
	{
					question: "¿Por qué debemos poner entre comillas el nombre de la carpeta de destino como \"Mis Tareas\"?",
					answers: [
									{ text: "Porque tiene un espacio y CMD lo leería como dos instrucciones separadas", correct: true },
									{ text: "Por estética visual", correct: false },
									{ text: "Porque es obligatorio para todas las carpetas", correct: false },
									{ text: "Para ocultar la carpeta", correct: false }
					]
	},
	{
					question: "¿Qué significa el parámetro /Y en el comando move?",
					answers: [
									{ text: "Cancela la operación", correct: false },
									{ text: "Sobreescribe los archivos en el destino sin preguntar", correct: true },
									{ text: "Pide confirmación Yes/No para cada archivo", correct: false },
									{ text: "Comprime el archivo", correct: false }
					]
	},
	{
					question: "Si escribes 'move *.* Backup', ¿qué sucederá?",
					answers: [
									{ text: "Moverá solo los archivos ocultos", correct: false },
									{ text: "Dará un error del sistema", correct: false },
									{ text: "Moverá absolutamente todos los archivos de la carpeta actual a Backup", correct: true },
									{ text: "Creará una copia de seguridad en la nube", correct: false }
					]
	},
	{
					question: "¿Qué atajo de teclado abre la ventana 'Ejecutar' para poder escribir 'cmd'?",
					answers: [
									{ text: "Ctrl + C", correct: false },
									{ text: "Windows + R", correct: true },
									{ text: "Alt + Tab", correct: false },
									{ text: "Shift + Enter", correct: false }
					]
	},
	{
					question: "Si quiero mover archivos que empiezan con la palabra 'foto', ¿qué comodín uso?",
					answers: [
									{ text: "foto_*.jpg", correct: true },
									{ text: "*foto.jpg", correct: false },
									{ text: "*.foto.*", correct: false },
									{ text: "foto.*.jpg", correct: false }
					]
	},
	{
					question: "¿Importa si escribes 'MOVE' en mayúsculas o 'move' en minúsculas en Windows?",
					answers: [
									{ text: "Sí, CMD distingue entre mayúsculas y minúsculas", correct: false },
									{ text: "No, en Windows los comandos no son sensibles a mayúsculas", correct: true },
									{ text: "MOVE solo funciona para carpetas enteras", correct: false },
									{ text: "move en minúsculas borra los archivos", correct: false }
					]
	},
	{
					question: "Antes de hacer un 'move *.docx Tareas', ¿qué es recomendable hacer?",
					answers: [
									{ text: "Apagar el internet", correct: false },
									{ text: "Asegurarse de que la carpeta 'Tareas' ya exista (o crearla con mkdir)", correct: true },
									{ text: "Cambiar la hora del sistema", correct: false },
									{ text: "Formatear el disco duro", correct: false }
					]
	}
];

const questionElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const questionCounterElement = document.getElementById("question-counter");
const scoreContainer = document.getElementById("score-container");
const finalScoreElement = document.getElementById("final-score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	scoreContainer.classList.add("hidden");
	answerButtonsElement.classList.remove("hidden");
	questionElement.classList.remove("hidden");
	document.getElementById("question-header").classList.remove("hidden");
	setNextQuestion();
}

function setNextQuestion() {
	resetState();
	showQuestion(questions[currentQuestionIndex]);
	questionCounterElement.innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
}

function showQuestion(question) {
	questionElement.innerText = question.question;
	question.answers.forEach(answer => {
					const button = document.createElement("button");
					button.innerText = answer.text;
					button.classList.add("btn");
					if (answer.correct) {
									button.dataset.correct = answer.correct;
					}
					button.addEventListener("click", selectAnswer);
					answerButtonsElement.appendChild(button);
	});
}

function resetState() {
	while (answerButtonsElement.firstChild) {
					answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct === "true";
	
	if (correct) {
					score++;
	}

	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
					setNextQuestion();
	} else {
					showScore();
	}
}

function showScore() {
	resetState();
	questionElement.classList.add("hidden");
	document.getElementById("question-header").classList.add("hidden");
	answerButtonsElement.classList.add("hidden");
	scoreContainer.classList.remove("hidden");
	
	let mensaje = "";
	if (score === 10) mensaje = "¡Puntuación Perfecta! Eres un Hacker de CMD. 👨‍💻";
	else if (score >= 7) mensaje = "¡Muy bien hecho! Tienes dominada la consola. 🚀";
	else if (score >= 5) mensaje = "Aprobado, pero repasa los comandos un poco más. 📘";
	else mensaje = "La consola requiere práctica. ¡Revisa la teoría e inténtalo de nuevo! 🔁";

	finalScoreElement.innerHTML = `Puntuación: ${score} / ${questions.length}<br><br>${mensaje}`;
}

// Inicia automáticamente al cargar el DOM
document.addEventListener('DOMContentLoaded', startQuiz);