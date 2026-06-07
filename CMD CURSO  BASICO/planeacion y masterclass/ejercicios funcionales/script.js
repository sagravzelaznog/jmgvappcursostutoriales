// ==========================================
// LÓGICA DEL MODO PROFESOR (PEDAGOGÍA)
// ==========================================
function unlockTeacherMode() {
	const password = prompt("Ingrese el código de acceso para ver las notas del profesor:");
	if (password === "1983") {
					const tips = document.querySelectorAll('.teacher-tip');
					tips.forEach(tip => {
									tip.classList.add('visible');
					});
					alert("Modo Maestro Desbloqueado. Las notas pedagógicas ahora son visibles.");
					document.getElementById('btn-profesor').style.display = 'none';
	} else if (password !== null) {
					alert("Código incorrecto.");
	}
}

// ==========================================
// LÓGICA DEL QUIZ ESTILO KAHOOT
// ==========================================
const questions = [
	{
					question: "¿Qué significan las siglas CMD?",
					answers: [
									{ text: "Control Mac Directory", correct: false },
									{ text: "Command Prompt", correct: true },
									{ text: "Computer Management Disk", correct: false },
									{ text: "Copy Move Delete", correct: false }
					]
	},
	{
					question: "¿Qué comando usamos en el ejercicio para crear una carpeta?",
					answers: [
									{ text: "create", correct: false },
									{ text: "makefolder", correct: false },
									{ text: "mkdir", correct: true },
									{ text: "dir", correct: false }
					]
	},
	{
					question: "¿Para qué sirve el comando 'move'?",
					answers: [
									{ text: "Para borrar archivos", correct: false },
									{ text: "Para copiar un archivo dejando el original", correct: false },
									{ text: "Para trasladar un archivo de un lugar a otro", correct: true },
									{ text: "Para renombrar la consola", correct: false }
					]
	},
	{
					question: "¿Qué hace el comodín '*.*' en nuestro código?",
					answers: [
									{ text: "Selecciona todos los archivos de cualquier tipo", correct: true },
									{ text: "Borra todo el disco duro", correct: false },
									{ text: "Selecciona solo carpetas ocultas", correct: false },
									{ text: "Multiplica el tamaño de los archivos", correct: false }
					]
	},
	{
					question: "¿Qué extrae el modificador '%~xi' de un archivo llamado 'foto.png'?",
					answers: [
									{ text: "foto", correct: false },
									{ text: "png", correct: false },
									{ text: ".png", correct: true },
									{ text: "La ruta completa", correct: false }
					]
	},
	{
					question: "¿Qué función cumple el símbolo '&' en la línea de comandos CMD?",
					answers: [
									{ text: "Cierra la terminal de comandos", correct: false },
									{ text: "Ejecuta un segundo comando justo después del primero", correct: true },
									{ text: "Crea un acceso directo", correct: false },
									{ text: "Busca palabras clave", correct: false }
					]
	},
	{
					question: "¿Por qué automatizamos la clasificación de archivos?",
					answers: [
									{ text: "Para que el ordenador se caliente menos", correct: false },
									{ text: "Para ahorrar tiempo y evitar errores manuales", correct: true },
									{ text: "Porque Windows no permite hacerlo con el ratón", correct: false },
									{ text: "Para consumir más memoria RAM", correct: false }
					]
	},
	{
					question: "Si el código intenta crear una carpeta que YA existe con 'mkdir', ¿qué pasa?",
					answers: [
									{ text: "Muestra un mensaje de error inofensivo y continúa", correct: true },
									{ text: "La computadora se reinicia", correct: false },
									{ text: "Borra la carpeta existente", correct: false },
									{ text: "El archivo original se corrompe", correct: false }
					]
	},
	{
					question: "En un archivo .bat, ¿cómo debemos escribir la variable '%i'?",
					answers: [
									{ text: "$i", correct: false },
									{ text: "%%i", correct: true },
									{ text: "var i", correct: false },
									{ text: "i%", correct: false }
					]
	},
	{
					question: "¿Cuál es el atajo de teclado para abrir la ventana de 'Ejecutar' y escribir cmd?",
					answers: [
									{ text: "Ctrl + Alt + Supr", correct: false },
									{ text: "Shift + C", correct: false },
									{ text: "Alt + F4", correct: false },
									{ text: "Tecla Windows + R", correct: true }
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
	if (score === 10) mensaje = "¡Genio Absoluto de la Terminal! 🏆";
	else if (score >= 7) mensaje = "¡Excelente Trabajo! 🌟";
	else if (score >= 5) mensaje = "Vas por buen camino, repasa la lección. 📚";
	else mensaje = "No te rindas, el CMD requiere práctica. ¡Inténtalo de nuevo! 💻";

	finalScoreElement.innerHTML = `Acertaste ${score} de ${questions.length} preguntas.<br><br>${mensaje}`;
}

// Iniciar el quiz al cargar la página
document.addEventListener('DOMContentLoaded', startQuiz);