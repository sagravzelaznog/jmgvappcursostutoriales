const QUIZ_DATA = {
    1: [
        { question: "¿Qué significa CMD?", answers: [{text: "Command Prompt (Símbolo del sistema)", correct: true}, {text: "Computer Mode Disk", correct: false}, {text: "Central Management Directory", correct: false}, {text: "Command Multiple Data", correct: false}] },
        { question: "¿Cómo se abre la consola CMD en Windows?", answers: [{text: "Win + R y escribir 'cmd'", correct: true}, {text: "Presionando Ctrl + C", correct: false}, {text: "Escribiendo 'consola' en el navegador", correct: false}, {text: "Con Alt + F4", correct: false}] },
        { question: "¿Qué comando te muestra la versión de Windows?", answers: [{text: "windows", correct: false}, {text: "version", correct: false}, {text: "ver", correct: true}, {text: "winver /c", correct: false}] },
        { question: "¿Para qué sirve el comando 'cls'?", answers: [{text: "Cerrar el sistema", correct: false}, {text: "Limpiar la pantalla de la consola", correct: true}, {text: "Crear un acceso directo", correct: false}, {text: "Cambiar la letra del disco", correct: false}] },
        { question: "¿Qué comando muestra la fecha actual?", answers: [{text: "time", correct: false}, {text: "today", correct: false}, {text: "now", correct: false}, {text: "date", correct: true}] }
    ],
    2: [
        { question: "¿Qué comando lista el contenido de un directorio?", answers: [{text: "ls", correct: false}, {text: "dir", correct: true}, {text: "list", correct: false}, {text: "show", correct: false}] },
        { question: "¿Para qué sirve 'cd'?", answers: [{text: "Copiar directorios", correct: false}, {text: "Cambiar de directorio", correct: true}, {text: "Crear directorios", correct: false}, {text: "Comprimir archivos", correct: false}] },
        { question: "¿Qué comando crea una nueva carpeta?", answers: [{text: "md o mkdir", correct: true}, {text: "new", correct: false}, {text: "create", correct: false}, {text: "folder", correct: false}] },
        { question: "¿Cómo regresas al directorio padre (subir un nivel)?", answers: [{text: "cd up", correct: false}, {text: "cd /", correct: false}, {text: "cd ..", correct: true}, {text: "cd parent", correct: false}] },
        { question: "¿Qué comando elimina una carpeta (directorio)?", answers: [{text: "del", correct: false}, {text: "rm", correct: false}, {text: "rd o rmdir", correct: true}, {text: "erase", correct: false}] }
    ],
    3: [
        { question: "¿Qué comando se usa para copiar un archivo?", answers: [{text: "xcopy", correct: false}, {text: "clone", correct: false}, {text: "copy", correct: true}, {text: "move", correct: false}] },
        { question: "¿Para qué sirve el comando 'move'?", answers: [{text: "Para ver videos", correct: false}, {text: "Para mover archivos o renombrar carpetas", correct: true}, {text: "Para copiar más rápido", correct: false}, {text: "Para borrar archivos", correct: false}] },
        { question: "¿Cómo se elimina un archivo específico?", answers: [{text: "remove", correct: false}, {text: "del o erase", correct: true}, {text: "rd", correct: false}, {text: "kill", correct: false}] },
        { question: "¿Qué comando renombra un archivo?", answers: [{text: "name", correct: false}, {text: "ren o rename", correct: true}, {text: "change", correct: false}, {text: "mv", correct: false}] },
        { question: "¿Qué hace 'xcopy'?", answers: [{text: "Copia archivos de Xbox", correct: false}, {text: "Elimina recursivamente", correct: false}, {text: "Copia directorios y subdirectorios", correct: true}, {text: "Mueve archivos ocultos", correct: false}] }
    ],
    4: [
        { question: "¿Qué comodín representa 'uno o varios caracteres' en CMD?", answers: [{text: "?", correct: false}, {text: "*", correct: true}, {text: "%", correct: false}, {text: "$", correct: false}] },
        { question: "¿Qué comodín representa 'un solo carácter exacto'?", answers: [{text: "*", correct: false}, {text: "?", correct: true}, {text: "!", correct: false}, {text: "&", correct: false}] },
        { question: "Si escribo 'del *.txt', ¿qué ocurre?", answers: [{text: "Borra el archivo 'asterisco.txt'", correct: false}, {text: "Borra todos los archivos con extensión .txt", correct: true}, {text: "Mueve todos los txt a la papelera", correct: false}, {text: "Crea un archivo txt", correct: false}] },
        { question: "Si escribo 'dir doc?.*', ¿cuál archivo NO coincidirá?", answers: [{text: "doc1.txt", correct: false}, {text: "doc2.pdf", correct: false}, {text: "documento.doc", correct: true}, {text: "docX.png", correct: false}] },
        { question: "¿Para qué se usan principalmente los comodines?", answers: [{text: "Para jugar naipes en consola", correct: false}, {text: "Para hackear WiFi", correct: false}, {text: "Para realizar acciones masivas o búsquedas difusas", correct: true}, {text: "Para cambiar el color del texto", correct: false}] }
    ],
    5: [
        { question: "¿Qué comando muestra la configuración IP de tu equipo?", answers: [{text: "ifconfig", correct: false}, {text: "ipconfig", correct: true}, {text: "netstat", correct: false}, {text: "ping", correct: false}] },
        { question: "¿Qué verifica el comando 'ping'?", answers: [{text: "La conectividad con otro equipo en red", correct: true}, {text: "La velocidad de tu disco duro", correct: false}, {text: "El número de archivos", correct: false}, {text: "El uso de la RAM", correct: false}] },
        { question: "¿Qué comando rastrea la ruta que siguen los paquetes?", answers: [{text: "route", correct: false}, {text: "trace", correct: false}, {text: "tracert", correct: true}, {text: "path", correct: false}] },
        { question: "¿Para qué sirve 'ipconfig /flushdns'?", answers: [{text: "Para reiniciar el router", correct: false}, {text: "Para apagar el adaptador WiFi", correct: false}, {text: "Para limpiar la caché DNS", correct: true}, {text: "Para borrar el historial web", correct: false}] },
        { question: "¿Qué muestra el comando 'netstat'?", answers: [{text: "Las redes WiFi cercanas", correct: false}, {text: "Las estadísticas de disco", correct: false}, {text: "Las conexiones de red activas", correct: true}, {text: "La cuota mensual de internet", correct: false}] }
    ],
    6: [
        { question: "¿Qué hace el operador de redirección '>'?", answers: [{text: "Pasa salida a otro comando", correct: false}, {text: "Envía la salida a un archivo sobrescribiéndolo", correct: true}, {text: "Inicia un proceso", correct: false}, {text: "Añade texto al final del archivo", correct: false}] },
        { question: "¿Qué hace el operador '>>'?", answers: [{text: "Sobrescribe un archivo", correct: false}, {text: "Cierra el archivo", correct: false}, {text: "Añade la salida al final del archivo (Append)", correct: true}, {text: "Compara dos archivos", correct: false}] },
        { question: "¿Para qué sirve la tubería (Pipe) '|'?", answers: [{text: "Para borrar archivos", correct: false}, {text: "Para pasar la salida de un comando como entrada de otro", correct: true}, {text: "Para pausar el sistema", correct: false}, {text: "Para crear gráficos de barras", correct: false}] },
        { question: "¿Qué comando se usa junto con Pipes para filtrar texto (ej. dir | ...)?", answers: [{text: "search", correct: false}, {text: "find", correct: true}, {text: "filter", correct: false}, {text: "sort", correct: false}] },
        { question: "Si escribes 'echo Hola > hola.txt', ¿qué hace?", answers: [{text: "Saluda por los parlantes", correct: false}, {text: "Crea un archivo llamado hola.txt con el texto 'Hola'", correct: true}, {text: "Abre el archivo hola.txt", correct: false}, {text: "No hace nada", correct: false}] }
    ],
    7: [
        { question: "¿Qué comando cambia los atributos de un archivo (oculto, solo lectura)?", answers: [{text: "attrib", correct: true}, {text: "props", correct: false}, {text: "chmod", correct: false}, {text: "set", correct: false}] },
        { question: "¿Qué flag se usa en attrib para Ocultar un archivo?", answers: [{text: "+h", correct: true}, {text: "+o", correct: false}, {text: "-h", correct: false}, {text: "/hide", correct: false}] },
        { question: "¿Qué hace 'attrib +r archivo.txt'?", answers: [{text: "Lo hace de Solo Lectura", correct: true}, {text: "Lo hace Recuperable", correct: false}, {text: "Lo Renombra", correct: false}, {text: "Lo borra", correct: false}] },
        { question: "¿Para qué sirve el comando 'tree'?", answers: [{text: "Para ver imágenes de árboles", correct: false}, {text: "Para visualizar gráficamente la estructura de directorios", correct: true}, {text: "Para plantar memoria RAM", correct: false}, {text: "Para organizar alfabéticamente", correct: false}] },
        { question: "¿Qué significa el atributo 'S' (+s) en CMD?", answers: [{text: "Secret (Secreto)", correct: false}, {text: "System (Archivo de Sistema)", correct: true}, {text: "Secure (Seguro)", correct: false}, {text: "Small (Pequeño)", correct: false}] }
    ],
    8: [
        { question: "¿Qué comando lista los procesos actuales corriendo en Windows?", answers: [{text: "listproc", correct: false}, {text: "top", correct: false}, {text: "tasklist", correct: true}, {text: "showtask", correct: false}] },
        { question: "¿Qué comando detiene o mata un proceso forzosamente?", answers: [{text: "killproc", correct: false}, {text: "taskkill", correct: true}, {text: "stop", correct: false}, {text: "end", correct: false}] },
        { question: "¿Qué parámetro en taskkill fuerza el cierre (/F)?", answers: [{text: "Finish", correct: false}, {text: "Force", correct: true}, {text: "Fast", correct: false}, {text: "Find", correct: false}] },
        { question: "¿Qué identificador único tiene cada proceso en tasklist?", answers: [{text: "MAC", correct: false}, {text: "PID (Process ID)", correct: true}, {text: "UUID", correct: false}, {text: "IP", correct: false}] },
        { question: "¿Se puede usar taskkill por nombre de imagen en vez de PID?", answers: [{text: "Sí, usando el flag /IM", correct: true}, {text: "No, solo con PID", correct: false}, {text: "Solo en modo seguro", correct: false}, {text: "Solo si eres administrador local", correct: false}] }
    ],
    9: [
        { question: "¿Qué extensión tienen los scripts de comandos en Windows?", answers: [{text: ".txt o .log", correct: false}, {text: ".sh o .bash", correct: false}, {text: ".bat o .cmd", correct: true}, {text: ".exe", correct: false}] },
        { question: "¿Para qué se usa '@echo off' en un script .bat?", answers: [{text: "Para apagar la computadora al terminar", correct: false}, {text: "Para ocultar los comandos y solo mostrar su resultado", correct: true}, {text: "Para reproducir sonido", correct: false}, {text: "Para acelerar la ejecución", correct: false}] },
        { question: "¿Cómo haces que el script se pause y espere a que el usuario presione una tecla?", answers: [{text: "wait", correct: false}, {text: "stop", correct: false}, {text: "pause", correct: true}, {text: "hold", correct: false}] },
        { question: "¿Qué comando permite agregar comentarios al código en CMD?", answers: [{text: "// o /*", correct: false}, {text: "rem o ::", correct: true}, {text: "#", correct: false}, {text: "<!--", correct: false}] },
        { question: "¿Qué significa 'BAT'?", answers: [{text: "Batch (Lote)", correct: true}, {text: "Basic Automator Text", correct: false}, {text: "Background App Task", correct: false}, {text: "Binary Archive Type", correct: false}] }
    ],
    10: [
        { question: "¿Cómo declaras una variable en CMD?", answers: [{text: "var nombre=valor", correct: false}, {text: "set nombre=valor", correct: true}, {text: "$nombre=valor", correct: false}, {text: "let nombre=valor", correct: false}] },
        { question: "¿Cómo imprimes (o usas) el valor de una variable llamada 'edad'?", answers: [{text: "echo $edad", correct: false}, {text: "echo %edad%", correct: true}, {text: "echo {edad}", correct: false}, {text: "echo &edad", correct: false}] },
        { question: "¿Qué flag de SET permite realizar operaciones aritméticas?", answers: [{text: "set /a", correct: true}, {text: "set /m", correct: false}, {text: "set /c", correct: false}, {text: "set /p", correct: false}] },
        { question: "¿Qué flag de SET pide al usuario que ingrese texto por teclado?", answers: [{text: "set /i", correct: false}, {text: "set /a", correct: false}, {text: "set /p", correct: true}, {text: "set /user", correct: false}] },
        { question: "¿Qué variable de entorno contiene el usuario actual logueado?", answers: [{text: "%USERNAME%", correct: true}, {text: "%USER%", correct: false}, {text: "%ADMIN%", correct: false}, {text: "%ME%", correct: false}] }
    ],
    11: [
        { question: "¿Cómo se escribe un condicional en un script BAT?", answers: [{text: "if [condición] (acción)", correct: true}, {text: "si [condición] entonces", correct: false}, {text: "when [condición] do", correct: false}, {text: "check [condición] run", correct: false}] },
        { question: "¿Qué significa el operador 'EQU' en un IF de CMD?", answers: [{text: "Equal (Igual a)", correct: true}, {text: "Equivalent (Equivalente tipo)", correct: false}, {text: "Error Query", correct: false}, {text: "Equation", correct: false}] },
        { question: "¿Qué comando repite acciones cíclicamente (bucle)?", answers: [{text: "while", correct: false}, {text: "for", correct: true}, {text: "loop", correct: false}, {text: "repeat", correct: false}] },
        { question: "¿Cómo compruebas si un archivo EXISTE en un IF?", answers: [{text: "if exists archivo.txt", correct: false}, {text: "if exist archivo.txt", correct: true}, {text: "if find archivo.txt", correct: false}, {text: "if has archivo.txt", correct: false}] },
        { question: "¿Qué comando sirve para saltar a otra parte del script?", answers: [{text: "jump", correct: false}, {text: "skip", correct: false}, {text: "goto", correct: true}, {text: "move", correct: false}] }
    ],
    12: [
        { question: "¿Qué comando revisa y repara errores lógicos en el disco duro?", answers: [{text: "scandisk", correct: false}, {text: "chkdsk (Check Disk)", correct: true}, {text: "fixhdd", correct: false}, {text: "repair", correct: false}] },
        { question: "¿Qué hace 'sfc /scannow'?", answers: [{text: "Escanea la red en busca de virus", correct: false}, {text: "Verifica e intenta reparar archivos corruptos de Windows", correct: true}, {text: "Limpia la papelera", correct: false}, {text: "Formatea el disco C", correct: false}] },
        { question: "¿Qué comando muestra el hardware físico y memoria instalada?", answers: [{text: "systeminfo", correct: true}, {text: "hwinfo", correct: false}, {text: "pcstats", correct: false}, {text: "showspecs", correct: false}] },
        { question: "¿Qué comando sirve para apagar el equipo desde consola?", answers: [{text: "turnoff", correct: false}, {text: "halt", correct: false}, {text: "shutdown", correct: true}, {text: "poweroff", correct: false}] },
        { question: "En el comando shutdown, ¿qué significa el parámetro '-r'?", answers: [{text: "Remove (Borrar)", correct: false}, {text: "Restart (Reiniciar)", correct: true}, {text: "Run (Correr)", correct: false}, {text: "Ready (Listo)", correct: false}] }
    ],
    13: [
        { question: "¿Qué herramienta poderosa reemplazó a muchas funciones de CMD?", answers: [{text: "Bash", correct: false}, {text: "PowerShell", correct: true}, {text: "Terminal", correct: false}, {text: "Git", correct: false}] },
        { question: "¿Cómo puedes ejecutar un comando PowerShell estando en CMD?", answers: [{text: "powershell -Command \"comando\"", correct: true}, {text: "runps \"comando\"", correct: false}, {text: "ps \"comando\"", correct: false}, {text: "exec ps \"comando\"", correct: false}] },
        { question: "En PowerShell los comandos tienen un formato estricto, ¿cuál es?", answers: [{text: "Nombre-Parametro", correct: false}, {text: "Verbo-Sustantivo (Ej: Get-Process)", correct: true}, {text: "Objeto.Metodo", correct: false}, {text: "CamelCase()", correct: false}] },
        { question: "¿Cuál es el equivalente de 'dir' en PowerShell puro?", answers: [{text: "Get-Dir", correct: false}, {text: "Get-ChildItem", correct: true}, {text: "Show-Files", correct: false}, {text: "List-Folder", correct: false}] },
        { question: "¿Por qué a veces un archivo .ps1 no corre por defecto?", answers: [{text: "Falta memoria", correct: false}, {text: "Políticas de ejecución (ExecutionPolicy) lo bloquean por seguridad", correct: true}, {text: "El código no está compilado", correct: false}, {text: "Falta internet", correct: false}] }
    ],
    14: [
        { question: "¿Qué comando de red permite ver y modificar la tabla de rutas IP?", answers: [{text: "route", correct: true}, {text: "iproute", correct: false}, {text: "path", correct: false}, {text: "way", correct: false}] },
        { question: "¿Qué comando permite gestionar recursos compartidos de Windows?", answers: [{text: "net share / net use", correct: true}, {text: "share network", correct: false}, {text: "folder share", correct: false}, {text: "smbconfig", correct: false}] },
        { question: "¿Para qué sirve el comando 'arp'?", answers: [{text: "Para hacer arp-spoofing", correct: false}, {text: "Para ver la tabla de resolución de IP a direcciones físicas MAC", correct: true}, {text: "Para reiniciar el modem", correct: false}, {text: "Para crear un túnel VPN", correct: false}] },
        { question: "¿Qué comando usas para ver todos los usuarios locales?", answers: [{text: "show users", correct: false}, {text: "net user", correct: true}, {text: "whoami", correct: false}, {text: "list accounts", correct: false}] },
        { question: "Si haces un ping a 127.0.0.1, ¿qué estás probando?", answers: [{text: "El router", correct: false}, {text: "El adaptador de red de tu propia máquina (loopback)", correct: true}, {text: "El DNS de Google", correct: false}, {text: "La impresora", correct: false}] }
    ],
    15: [
        { question: "¿Qué comando avanzado de CMD permite gestionar discos, particiones y volúmenes?", answers: [{text: "fdisk", correct: false}, {text: "diskpart", correct: true}, {text: "format", correct: false}, {text: "hddmanager", correct: false}] },
        { question: "¿Por qué diskpart es peligroso?", answers: [{text: "Consume mucha RAM", correct: false}, {text: "Puede borrar particiones enteras y datos permanentemente con un error", correct: true}, {text: "Rompe la CPU", correct: false}, {text: "Instala virus", correct: false}] },
        { question: "¿Qué comando de diskpart borra todo el disco seleccionado?", answers: [{text: "clean", correct: true}, {text: "delete all", correct: false}, {text: "format", correct: false}, {text: "erase", correct: false}] },
        { question: "¿Qué hace el comando 'format c:'?", answers: [{text: "Borra la consola", correct: false}, {text: "Limpia y da formato al disco local C (borrando su contenido)", correct: true}, {text: "Centra el texto en C", correct: false}, {text: "Reinstala Windows", correct: false}] },
        { question: "¿Para qué sirve el gestor 'bcdedit'?", answers: [{text: "Para editar textos en BCD", correct: false}, {text: "Para gestionar el almacén de configuración de arranque de Windows (Boot)", correct: true}, {text: "Para compilar C++", correct: false}, {text: "Para editar variables de entorno globales", correct: false}] }
    ],
    16: [
        { question: "¿Cuál es la regla de oro al hacer scripts automatizados destructivos?", answers: [{text: "Poner colores atractivos", correct: false}, {text: "Hacer pruebas en entornos seguros/máquinas virtuales antes de producción", correct: true}, {text: "Nunca usar comentarios", correct: false}, {text: "Usar siempre mayúsculas", correct: false}] },
        { question: "¿Qué comando usamos en el curso para programar tareas desde CMD?", answers: [{text: "schtasks", correct: true}, {text: "cron", correct: false}, {text: "taskplanner", correct: false}, {text: "timejob", correct: false}] },
        { question: "¿Cómo se llama el nuevo terminal unificado de Microsoft?", answers: [{text: "Windows PowerShell", correct: false}, {text: "Windows Terminal", correct: true}, {text: "Command Hub", correct: false}, {text: "DOS v2", correct: false}] },
        { question: "¿Qué comando te permite copiar archivos a través de la red con mucha robustez y recuperación?", answers: [{text: "xcopy", correct: false}, {text: "robocopy", correct: true}, {text: "netcopy", correct: false}, {text: "supercopy", correct: false}] },
        { question: "¿Es CMD case-sensitive (distingue mayúsculas y minúsculas) en sus comandos por defecto?", answers: [{text: "No", correct: true}, {text: "Sí", correct: false}, {text: "Solo en Windows 11", correct: false}, {text: "Solo si se activa el flag /C", correct: false}] }
    ]
};
