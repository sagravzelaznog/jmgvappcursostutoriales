# Documentación del Curso: CMD Básico e Intermedio

## Resumen Ejecutivo

El curso "CMD Básico e Intermedio" es una plataforma educativa web diseñada para enseñar el uso efectivo del Símbolo del Sistema de Windows (Command Prompt). Está estructurado como un curso progresivo de 4 semanas con 16 sesiones que abarca desde conceptos fundamentales hasta técnicas avanzadas de automatización mediante scripts batch.

## Arquitectura del Sistema

### Patrón Arquitectónico

- **Tipo**: Aplicación Web Estática Educativa
- **Arquitectura**: Frontend-only con contenido estructurado
- **Patrón**: Curso lineal progresivo con navegación secuencial

### Componentes Principales

```text
cmd-curso-basico/
├── index.html          # Página principal con índice del curso
├── index.css           # Estilos centralizados
├── sesion01.html       # Introducción al CMD
├── sesion02.html       # Navegación en sistema de archivos
├── sesion03.html       # Gestión de archivos I
├── sesion04.html       # Gestión de archivos II
├── sesion05.html       # Visualización y redirección
├── sesion06.html       # Diagnóstico del sistema
├── sesion07.html       # Diagnóstico de red
├── sesion08.html       # Utilidades intermedias
├── sesion09.html       # Scripts Batch I
├── sesion10.html       # Scripts Batch II
├── sesion11.html       # Scripts Batch III
├── sesion12.html       # Scripts Batch IV
├── sesion13.html       # Administración de discos
├── sesion14.html       # Administración de redes
├── sesion15.html       # Tareas programadas
└── sesion16.html       # Repaso final
```

## Estructura del Curso

### Semana 1: Fundamentos y Gestión de Archivos

**Objetivo**: Establecer bases sólidas en el uso del CMD y manejo básico de archivos.

#### Sesión 1: Introducción al Símbolo del Sistema (CMD)

- **Conceptos**: Qué es CMD, acceso y configuración
- **Comandos**: `HELP`, `/?`, `CLS`, `VER`, `TITLE`
- **Ejercicios**: Configuración inicial y primeros comandos

#### Sesión 2: Navegación en el Sistema de Archivos

- **Conceptos**: Rutas absolutas vs relativas
- **Comandos**: `CD`, `CHDIR`, `DIR` con parámetros
- **Ejercicios**: Navegación avanzada y filtrado

#### Sesión 3: Gestión de Archivos y Directorios I

- **Conceptos**: Creación y eliminación de elementos
- **Comandos**: `MD`, `RD`, `DEL`, `RMDIR`
- **Ejercicios**: Manejo seguro de archivos

#### Sesión 4: Gestión de Archivos y Directorios II

- **Conceptos**: Movimiento, copia y renombrado
- **Comandos**: `MOVE`, `COPY`, `REN`, `XCOPY`
- **Ejercicios**: Operaciones avanzadas de archivos

### Semana 2: Diagnóstico y Control

**Objetivo**: Desarrollar habilidades de diagnóstico y control del sistema.

#### Sesión 5: Comandos de Visualización y Redirección

- **Conceptos**: Redirección de entrada/salida
- **Comandos**: `TYPE`, `MORE`, `FIND`, `SORT`
- **Ejercicios**: Manipulación de texto y datos

#### Sesión 6: Diagnóstico Básico del Sistema

- **Conceptos**: Monitoreo de procesos y sistema
- **Comandos**: `TASKLIST`, `TASKKILL`, `SYSTEMINFO`
- **Ejercicios**: Análisis de rendimiento

#### Sesión 7: Diagnóstico Básico de Red

- **Conceptos**: Conectividad y configuración de red
- **Comandos**: `IPCONFIG`, `PING`, `TRACERT`, `NETSTAT`
- **Ejercicios**: Troubleshooting de red

#### Sesión 8: Comandos de Soporte y Utilidades Intermedias

- **Conceptos**: Herramientas avanzadas de sistema
- **Comandos**: `ROBOCOPY`, `ATTRIB`, `FC`, `COMP`
- **Ejercicios**: Automatización básica

### Semana 3: Nivel Intermedio I - Automatización (Scripts Batch)

**Objetivo**: Introducir la programación básica mediante scripts batch.

#### Sesión 9: Scripts Batch I - Introducción y ECHO

- **Conceptos**: Qué son los archivos .bat
- **Comandos**: `ECHO`, `@ECHO OFF`, `REM`, `PAUSE`
- **Ejercicios**: Primeros scripts básicos

#### Sesión 10: Scripts Batch II - Variables y Parámetros

- **Conceptos**: Variables de sistema y usuario
- **Comandos**: `SET`, `%VARIABLE%`, parámetros posicionales
- **Ejercicios**: Scripts dinámicos

#### Sesión 11: Scripts Batch III - Control de Flujo Básico

- **Conceptos**: Lógica condicional y saltos
- **Comandos**: `IF`, `GOTO`, `EXIST`, operadores lógicos
- **Ejercicios**: Scripts con decisiones

#### Sesión 12: Scripts Batch IV - Sentencias Avanzadas

- **Conceptos**: Bucles y operadores avanzados
- **Comandos**: `FOR`, `&&`, `||`, `CALL`
- **Ejercicios**: Automatización compleja

### Semana 4: Nivel Intermedio II - Administración y Repaso Final

**Objetivo**: Consolidar conocimientos y aplicar técnicas avanzadas.

#### Sesión 13: Administración de Discos y Sistema

- **Conceptos**: Mantenimiento del sistema
- **Comandos**: `CHKDSK`, `SFC`, `DISKPART`, `DEFRAG`
- **Ejercicios**: Diagnóstico y reparación

#### Sesión 14: Administración de Redes Avanzada

- **Conceptos**: Gestión avanzada de red
- **Comandos**: `NETSTAT`, `NSLOOKUP`, `GETMAC`, `ARP`
- **Ejercicios**: Análisis de red profundo

#### Sesión 15: Técnicas Intermedias y Tareas Programadas

- **Conceptos**: Automatización del sistema
- **Comandos**: `SCHTASKS`, `AT`, `WMIC`, `REG`
- **Ejercicios**: Programación de tareas

#### Sesión 16: Repaso General y Práctica Final Integradora

- **Conceptos**: Integración de conocimientos
- **Proyecto**: Script de mantenimiento completo
- **Evaluación**: Aplicación práctica final

## Especificación Técnica

### Tecnologías Utilizadas

- **HTML5**: Estructura semántica de las sesiones
- **CSS3**: Estilos responsivos y diseño educativo
- **JavaScript**: Navegación entre sesiones (básico)

### Estructura de Archivos

- **Página Principal**: `index.html` - Índice navegable del curso
- **Estilos**: `index.css` - Diseño consistente
- **Sesiones**: `sesion01.html` a `sesion16.html` - Contenido educativo

### Diseño y UX

- **Layout**: Responsivo con contenedor centrado
- **Colores**: Paleta profesional (azul, verde, gris)
- **Tipografía**: Arial para legibilidad
- **Navegación**: Enlaces secuenciales entre sesiones

## Contenido Educativo

### Metodología

- **Enfoque**: Práctico y progresivo
- **Estructura**: Teoría → Ejemplos → Ejercicios
- **Duración**: 15 minutos por sesión
- **Evaluación**: Ejercicios prácticos integrados

### Elementos de Aprendizaje

- **Objetivos claros**: Definidos en cada sesión
- **Ejemplos paso a paso**: Código comentado
- **Ejercicios prácticos**: Aplicación inmediata
- **Imágenes de apoyo**: Capturas de pantalla
- **Navegación intuitiva**: Enlaces secuenciales

### Comandos Cubiertos por Categoría

#### Navegación y Archivos

- `CD`, `DIR`, `MD`, `RD`, `DEL`, `COPY`, `MOVE`, `REN`

#### Diagnóstico

- `IPCONFIG`, `PING`, `TRACERT`, `TASKLIST`, `SYSTEMINFO`

#### Scripting

- `ECHO`, `SET`, `IF`, `GOTO`, `FOR`, `CALL`

#### Administración

- `CHKDSK`, `SFC`, `SCHTASKS`, `ROBOCOPY`, `ATTRIB`

## Funcionalidades del Sistema

### Navegación

- **Índice principal**: Acceso directo a todas las sesiones
- **Navegación secuencial**: Enlaces anterior/siguiente
- **Breadcrumbs**: Ubicación actual en el curso

### Contenido Interactivo

- **Ejemplos de código**: Sintaxis resaltada
- **Ejercicios prácticos**: Casos de uso reales
- **Imágenes de apoyo**: Capturas de pantalla
- **Comentarios**: Explicaciones detalladas

### Experiencia de Usuario

- **Diseño limpio**: Interfaz sin distracciones
- **Responsive**: Compatible con múltiples dispositivos
- **Accesible**: Navegación por teclado
- **Profesional**: Apariencia corporativa

## Casos de Uso

### 1. Aprendizaje Individual

1. Usuario accede al índice principal
2. Selecciona sesión según nivel
3. Estudia contenido teórico
4. Practica con ejercicios
5. Progresa secuencialmente

### 2. Capacitación Corporativa

1. Instructor guía sesiones grupales
2. Estudiantes practican comandos
3. Ejercicios colaborativos
4. Evaluación práctica
5. Certificación de conocimientos

### 3. Referencia Técnica

1. Consulta rápida de comandos
2. Búsqueda de ejemplos específicos
3. Solución de problemas
4. Automatización de tareas
5. Mejora continua de habilidades

## Beneficios del Curso

### Para Estudiantes

- **Fundamentos sólidos**: Base técnica completa
- **Aplicación práctica**: Ejercicios reales
- **Progresión lógica**: Aprendizaje estructurado
- **Autonomía**: Estudio autodirigido

### Para Instructores

- **Contenido estructurado**: Material listo para usar
- **Flexibilidad**: Adaptable a diferentes ritmos
- **Evaluación integrada**: Ejercicios de práctica
- **Profesionalismo**: Diseño corporativo

### Para Organizaciones

- **Capacitación eficiente**: Curso completo en 4 semanas
- **Costos reducidos**: Plataforma web sin licencias
- **Escalabilidad**: Múltiples usuarios simultáneos
- **ROI**: Mejora inmediata de productividad

## Requisitos del Sistema

### Técnicos

- **Navegador**: Chrome, Firefox, Edge, Safari
- **Sistema**: Windows 10/11 (para práctica de comandos)
- **Conexión**: Internet para acceso inicial
- **Permisos**: Administrador para comandos avanzados

### Educativos

- **Nivel**: Principiante a intermedio
- **Tiempo**: 1 hora por semana (4 semanas total)
- **Práctica**: Acceso a computadora Windows
- **Motivación**: Interés en automatización

## Mantenimiento y Actualización

### Contenido

- **Revisión periódica**: Comandos y ejemplos
- **Actualización**: Nuevas versiones de Windows
- **Mejoras**: Feedback de usuarios
- **Expansión**: Nuevas sesiones avanzadas

### Técnico

- **Compatibilidad**: Navegadores modernos
- **Rendimiento**: Optimización de carga
- **Seguridad**: Validación de entrada
- **Backup**: Respaldo regular del contenido

## Extensibilidad

### Nuevas Funcionalidades

- **Sistema de usuarios**: Registro y progreso
- **Certificación**: Evaluación final automatizada
- **Foro**: Comunidad de aprendizaje
- **Mobile app**: Versión móvil nativa

### Integraciones

- **LMS**: Integración con plataformas educativas
- **API**: Acceso programático al contenido
- **Analytics**: Métricas de uso y aprendizaje
- **Cloud**: Almacenamiento en la nube

## Conclusión

El curso "CMD Básico e Intermedio" proporciona una plataforma educativa completa y bien estructurada para el aprendizaje del Símbolo del Sistema de Windows. Su diseño progresivo, contenido práctico y enfoque en la aplicación real lo convierten en una herramienta valiosa para estudiantes, instructores y organizaciones que buscan desarrollar habilidades técnicas en línea de comandos.

La documentación presentada sirve como guía completa para entender, implementar, mantener y extender la funcionalidad del curso, facilitando su adopción en diferentes contextos educativos y profesionales.

---

**Versión**: 1.0  
**Fecha**: 2025  
**Autor**: JGMV-PTEL  
**Licencia**: Todos los derechos reservados
