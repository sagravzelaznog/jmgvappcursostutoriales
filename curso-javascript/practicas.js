document.addEventListener('DOMContentLoaded', () => {
    // Navegación entre prácticas
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.practice-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const practiceId = btn.getAttribute('data-practice');
            
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`practice-${practiceId}`).classList.add('active');
        });
    });
});

// Función central para ejecutar código e imprimir resultados
function executePractice(outputId, callback) {
    const outputDiv = document.getElementById(outputId);
    outputDiv.innerHTML = '';
    
    // Sobrescribir console.log para mostrarlo en pantalla
    const originalLog = console.log;
    console.log = function(...args) {
        originalLog.apply(console, args);
        const msg = args.map(a => {
            if (typeof a === 'object') return JSON.stringify(a);
            return String(a);
        }).join(' ');
        outputDiv.innerHTML += msg + '<br>';
    };
    
    try {
        callback();
    } catch(e) {
        outputDiv.innerHTML += `<span style="color:var(--danger)">Error: ${e.message}</span>`;
    }
    
    // Restaurar console.log
    console.log = originalLog;
}

// ==================== DEFINICIÓN DE PRÁCTICAS ====================

window.runPractice1 = () => executePractice('output-1', () => {
    console.log("¡Hola Mundo!");
    let nombre = "Carlos";
    let edad = 17;
    console.log(`Mi nombre es ${nombre} y tengo ${edad} años`);
});

window.runPractice1b = () => executePractice('output-1b', () => {
    const PI = 3.14159;
    let radio = 5;
    let area = PI * radio * radio;
    console.log(`El área del círculo es: ${area}`);
});

window.runPractice2 = () => executePractice('output-2', () => {
    let texto = "Hola";
    let numero = 42;
    let esEstudiante = true;
    let sinValor;
    let vacio = null;
    
    console.log(typeof texto);
    console.log(typeof numero);
    console.log(typeof esEstudiante);
    console.log(typeof sinValor);
});

window.runPractice3a = () => executePractice('output-3a', () => {
    let suma = 10 + 5;
    let resta = 10 - 3;
    let multi = 4 * 3;
    let division = 20 / 4;
    let residuo = 10 % 3;
    let potencia = 2 ** 3;
    console.log(suma, resta, multi, division, residuo, potencia);
});

window.runPractice3b = () => executePractice('output-3b', () => {
    console.log(5 === 5);
    console.log(5 === "5");
    console.log(5 == "5");
    console.log(5 !== "5");
    console.log(10 > 5);
    console.log(3 < 1);
    console.log(5 >= 5);
    console.log(4 <= 3);
});

window.runPractice3c = () => executePractice('output-3c', () => {
    let edad2 = 20; 
    let tieneCredencial = true;
    if (edad2 >= 18 && tieneCredencial) { 
      console.log("Puede votar"); 
    }
    let esFinDeSemana = false; 
    let esVacaciones = true; 
    if (esFinDeSemana || esVacaciones) { 
      console.log("¡No hay clases!"); 
    }
    let lloviendo = false; 
    if (!lloviendo) { 
      console.log("Podemos salir al patio"); 
    }
});

window.runPractice4a = () => executePractice('output-4a', () => {
    let edad = 16;
    if (edad >= 18) {
      console.log("Eres mayor de edad");
    } else {
      console.log("Eres menor de edad");
    }
});

window.runPractice4b = () => executePractice('output-4b', () => {
    let calificacion = 85;
    if (calificacion >= 90) {
      console.log("Calificación: A — Excelente");
    } else if (calificacion >= 80) {
      console.log("Calificación: B — Bueno");
    } else if (calificacion >= 70) {
      console.log("Calificación: C — Regular");
    } else {
      console.log("Calificación: F — Reprobado");
    }
});

window.runPractice4c = () => executePractice('output-4c', () => {
    let dia = 3;
    switch (dia) {
      case 1: console.log("Lunes"); break;
      case 2: console.log("Martes"); break;
      case 3: console.log("Miércoles"); break;
      case 4: console.log("Jueves"); break;
      case 5: console.log("Viernes"); break;
      default: console.log("Fin de semana");
    }
});

window.runPractice5a = () => executePractice('output-5a', () => {
    for (let i = 1; i <= 5; i++) {
      console.log(`Vuelta número: ${i}`);
    }
});

window.runPractice5b = () => executePractice('output-5b', () => {
    let contador = 0;
    while (contador < 3) {
      console.log(`Contador: ${contador}`);
      contador++;
    }
});

window.runPractice6a = () => executePractice('output-6a', () => {
    let frutas = ["Manzana", "Plátano", "Naranja", "Uva"];
    console.log(frutas[0]);
    console.log(frutas[2]);
    console.log(frutas.length);
    frutas.push("Fresa");
    frutas.pop();
    console.log(frutas);
});

window.runPractice6b = () => executePractice('output-6b', () => {
    let estudiantes = ["Ana", "Luis", "María", "Pedro"];
    for (let i = 0; i < estudiantes.length; i++) {
      console.log(`${i + 1}. ${estudiantes[i]}`);
    }
});

window.runPractice6c = () => executePractice('output-6c', () => {
    let cal1 = 92; 
    let cal2 = 92; 
    let cal3 = 78; 
    let promedio = (cal1 + cal2 + cal3) / 3; 
    console.log(`El promedio es: ${promedio.toFixed(2)}`);
});
