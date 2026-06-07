/**
 * Motor del Quiz Interactivo (Estilo Kahoot) - Curso CMD
 * Integrado con PDF y Firebase Auth
 */

document.addEventListener('DOMContentLoaded', () => {
    // Extraer número de sesión de la URL (ej. masterclass_sesion01.html -> 1)
    const match = window.location.pathname.match(/sesion(\d+)/);
    if (match && match[1]) {
        const sessionNum = parseInt(match[1], 10);
        if (typeof QUIZ_DATA !== 'undefined' && QUIZ_DATA[sessionNum]) {
            initQuiz(sessionNum);
        }
    }
});

let currentQuizData = [];
let currentQuestionIndex = 0;
let score = 0;
let userResponses = [];
let currentSessionNum = 1;

const BTN_COLORS = ['btn-red', 'btn-blue', 'btn-yellow', 'btn-green'];
const SHAPES = [
    '<div class="shape-triangle"></div>',
    '<div class="shape-diamond"></div>',
    '<div class="shape-circle"></div>',
    '<div class="shape-square"></div>'
];

function initQuiz(sessionNum) {
    currentSessionNum = sessionNum;
    currentQuizData = QUIZ_DATA[sessionNum] || [];
    if (currentQuizData.length === 0) return;

    let container = document.getElementById('quiz-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'quiz-container';
        container.className = 'container mt-5 mb-5';
        document.body.appendChild(container); // O añadir al final del <main>
    }

    container.innerHTML = `
        <div class="card shadow-sm" style="border-color: #007bff;">
            <div class="card-header bg-dark text-white text-center py-3">
                <h3 class="mb-0">Evaluación de la Sesión ${sessionNum}</h3>
                <p class="mb-0 text-white-50">Demuestra lo aprendido sobre CMD</p>
            </div>
            <div class="card-body p-4" id="quiz-body">
                <div class="text-center">
                    <button id="start-quiz-btn" class="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold" style="font-size: 1.2rem;">
                        ▶ Comenzar Evaluación
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('start-quiz-btn').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        userResponses = [];
        loadQuestion();
    });
}

function loadQuestion() {
    const quizBody = document.getElementById('quiz-body');
    const questionData = currentQuizData[currentQuestionIndex];

    let html = `
        <div class="quiz-header text-center mb-4">
            <span class="badge bg-secondary mb-2" style="font-size: 1rem;">Pregunta ${currentQuestionIndex + 1} de ${currentQuizData.length}</span>
            <h3 class="fw-bold" style="font-family: Consolas, monospace; background: #1e1e1e; color: #00ff00; padding: 15px; border-radius: 5px;">C:\\> ${questionData.question}</h3>
        </div>
        <div class="btn-grid">
    `;

    questionData.answers.forEach((answer, index) => {
        html += `
            <button class="btn-kahoot ${BTN_COLORS[index]}" onclick="selectAnswer(${index})">
                <span class="shape-container">${SHAPES[index]}</span>
                <span class="answer-text">${answer.text}</span>
            </button>
        `;
    });

    html += `</div>`;
    quizBody.innerHTML = html;
}

window.selectAnswer = (selectedIndex) => {
    const questionData = currentQuizData[currentQuestionIndex];
    const isCorrect = questionData.answers[selectedIndex].correct;
    
    userResponses.push({
        question: questionData.question,
        selected: questionData.answers[selectedIndex].text,
        correctText: questionData.answers.find(a => a.correct).text,
        isCorrect: isCorrect
    });

    if (isCorrect) score++;

    const buttons = document.querySelectorAll('.btn-kahoot');
    buttons.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 500);
};

function showResults() {
    const quizBody = document.getElementById('quiz-body');
    const percentage = Math.round((score / currentQuizData.length) * 100);
    let message = percentage >= 80 ? '¡Excelente trabajo, hacker!' : 'Sigue practicando, no te rindas.';
    let textColor = percentage >= 80 ? 'color: #28a745;' : 'color: #ffc107;';

    quizBody.innerHTML = `
        <div class="text-center animate-fade-in">
            <h2 class="mt-3">Resultados Finales</h2>
            <p class="lead">${message}</p>
            <div class="display-4 fw-bold mb-4" style="${textColor}">${score} / ${currentQuizData.length}</div>
            <p>Porcentaje de acierto: <strong>${percentage}%</strong></p>
            
            <button id="download-pdf-btn" class="btn btn-danger btn-lg mt-3 me-2">
                Descargar Constancia PDF
            </button>
            <button class="btn btn-outline-primary btn-lg mt-3" onclick="initQuiz(currentSessionNum)">
                Repetir Evaluación
            </button>
        </div>
    `;

    document.getElementById('download-pdf-btn').addEventListener('click', generatePDF);

    if (typeof window.saveResultToDatabase === 'function') {
        const user = firebase.auth().currentUser;
        const studentName = user ? (user.displayName || user.email) : 'Anónimo';
        
        window.saveResultToDatabase(studentName, `CMD Sesión ${currentSessionNum}`, score, currentQuizData.length, userResponses);
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const user = firebase.auth().currentUser;
    const studentName = user ? (user.displayName || user.email) : 'Estudiante';
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text("Reporte de Evaluación - Curso CMD", 14, 25);
    
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text(`Sesión: ${currentSessionNum}`, 14, 35);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Alumno: ${studentName}`, 14, 45);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 52);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Puntuación Final: ${score} de ${currentQuizData.length}`, 14, 62);
    
    const tableData = userResponses.map((r, i) => [
        i + 1,
        r.question,
        r.selected,
        r.correctText,
        r.isCorrect ? "Correcto" : "Incorrecto"
    ]);

    doc.autoTable({
        startY: 70,
        head: [['#', 'Pregunta', 'Tu Respuesta', 'Respuesta Correcta', 'Estado']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [40, 40, 40] },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 60 },
            2: { cellWidth: 45 },
            3: { cellWidth: 45 },
            4: { cellWidth: 25 }
        },
        didParseCell: function(data) {
            if (data.section === 'body' && data.column.index === 4) {
                if (data.cell.raw === 'Correcto') {
                    data.cell.styles.textColor = [40, 167, 69];
                    data.cell.styles.fontStyle = 'bold';
                } else {
                    data.cell.styles.textColor = [220, 53, 69];
                    data.cell.styles.fontStyle = 'bold';
                }
            }
        }
    });
    
    doc.save(`CMD_Reporte_S${currentSessionNum}_${studentName.replace(/\\s+/g, '_')}.pdf`);
}
