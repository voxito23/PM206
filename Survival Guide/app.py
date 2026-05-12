from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

def pin(name):
    return '<img src="/static/img/emotes/' + name + '.gif" class="brawl-pin" alt="' + name + '" />'

SECTIONS = [
    {
        "id": "rules",
        "title": "La Cámara de las Reglas",
        "icon": pin("book"),
        "color": "gold",
        "story": "Bienvenido, aventurero. Has entrado a La Cámara de las Reglas, donde se guardan los decretos sagrados que gobiernan esta tierra. Domínalos... o perece en el intento.",
        "content": [
            {"icon": pin("sun"), "title": "Asistencia y Puntualidad", "desc": "80% de asistencia obligatoria para evaluación parcial y 10 minutos de tolerancia."},
            {"icon": pin("neutral"), "title": "Justificantes y Faltas", "desc": "Faltas justificadas por correo institucional del tutor en máximo 24 horas. Solo se aceptan recetas médicas y citatorios jurídicos presentados físicamente al tutor."},
            {"icon": pin("spongebob"), "title": "Entregas y Classroom", "desc": "Tareas y trabajos individuales en Google Classroom con correo institucional. No se aceptan entregas extemporáneas salvo justificante validado por el Profesor."},
            {"icon": pin("solar"), "title": "Honestidad Académica", "desc": "Plagio o copia = condicionado a reprobar la asignatura y reporte al área correspondiente. Deshonestidad académica = reprobar parcial sin derecho a examen final."},
            {"icon": pin("bruce"), "title": "Conducta en Clase", "desc": "Respeto obligatorio hacia docentes, administrativos y compañeros. Dispositivos solo para actividades académicas. Prohibido audífonos, alimentos y líquidos. 3 incidencias = sin derecho a examen."},
            {"icon": pin("special3"), "title": "Seguimiento Académico", "desc": "Conducto regular: docente, tutor, coordinación, dirección. Asistencia obligatoria en entrega de calificaciones para retroalimentación."},
        ],
    },
    {
        "id": "grades",
        "title": "El Oráculo de las Notas",
        "icon": pin("bill"),
        "color": "purple",
        "story": "El Oráculo revela los misterios de cómo serás juzgado. Cada porcentaje es una pieza del rompecabezas de tu destino académico.",
        "content": [
            {"name": "Evidencia de Conocimiento", "pct": 40, "detail": "1P: 40% | 2P: 40% | 3P: 10%", "gradient": "linear-gradient(90deg,#f59e0b,#ef4444)"},
            {"name": "Evidencia de Producto", "pct": 30, "detail": "1P: 30% | 2P: 30% | 3P: 30%", "gradient": "linear-gradient(90deg,#8b5cf6,#ec4899)"},
            {"name": "Evidencia de Desempeño", "pct": 20, "detail": "1P: 20% | 2P: 20% | 3P: 10%", "gradient": "linear-gradient(90deg,#06b6d4,#3b82f6)"},
            {"name": "Proyecto Integrador", "pct": 50, "detail": "1P: 10% | 2P: 10% | 3P: 50%", "gradient": "linear-gradient(90deg,#10b981,#06b6d4)"},
        ],
        "dates": "1er Parcial: 02-06-26 | 2do Parcial: 07-07-26 | 3er Parcial: 11-08-26 | Final: 17-08-26",
    },
    {
        "id": "skills",
        "title": "Skills a Desbloquear",
        "icon": pin("pirate"),
        "color": "green",
        "story": "Cada habilidad que domines te acercará más a la victoria. Tu misión: convertirte en un desarrollador móvil completo.",
        "objective": "Diseñar y desarrollar aplicaciones para dispositivos móviles utilizando frameworks modernos, implementando buenas prácticas de programación y diseño de interfaces.",
        "content": [
            {"icon": pin("plankton"), "name": "Arquitectura Móvil", "desc": "Comprender la arquitectura de aplicaciones móviles (Android/iOS)"},
            {"icon": pin("grafiti"), "name": "Diseño de Interfaces", "desc": "Diseñar interfaces de usuario intuitivas y responsivas"},
            {"icon": pin("ultra"), "name": "Navegación y Estados", "desc": "Implementar navegación entre pantallas y gestión de estados"},
            {"icon": pin("ninja"), "name": "Integración de APIs", "desc": "Conectar aplicaciones con APIs REST y servicios web"},
            {"icon": pin("megabox"), "name": "Almacenamiento", "desc": "Manejar almacenamiento local y bases de datos en el dispositivo"},
            {"icon": pin("gems"), "name": "Publicación", "desc": "Publicar aplicaciones en APKs"},
        ],
    },
    {
        "id": "timeline",
        "title": "La Línea del Tiempo",
        "icon": pin("glitch"),
        "color": "blue",
        "story": "El reloj del destino marca los momentos cruciales de tu travesía. Conoce cada fecha clave para sobrevivir este cuatrimestre.",
        "content": [
            {"week": "Semana 1-4", "title": "Introducción y Fundamentos", "desc": "Setup del entorno, conceptos básicos de desarrollo móvil, layouts y widgets"},
            {"week": "02-06-26", "title": "1er Examen Parcial", "desc": "Evaluación de fundamentos, interfaces y componentes básicos"},
            {"week": "Semana 5-8", "title": "Navegación, Estados y APIs", "desc": "Rutas, gestión de estado, consumo de APIs REST y servicios web"},
            {"week": "07-07-26", "title": "2do Examen Parcial", "desc": "Evaluación de navegación, estados e integración de APIs"},
            {"week": "Semana 9-12", "title": "Proyecto Integrador", "desc": "Desarrollo intensivo de la aplicación móvil final"},
            {"week": "11-08-26", "title": "3er Examen Parcial", "desc": "Evaluación final y entrega del proyecto integrador"},
            {"week": "17-08-26", "title": "Examen Final / Extraordinarios", "desc": "Última oportunidad para aprobar la materia"},
        ],
    },
]

QUIZZES = [
    {
        "required": 2,
        "questions": [
            {"text": "¿Cuál es el porcentaje mínimo de asistencia requerido?", "options": ["70%", "80%", "90%", "100%"], "correct": 1},
            {"text": "¿Cuántos minutos de tolerancia hay para llegar a clase?", "options": ["5 minutos", "10 minutos", "15 minutos", "20 minutos"], "correct": 1},
            {"text": "¿Qué consecuencia tiene el plagio o copia de trabajos?", "options": ["Advertencia verbal", "Se reduce medio punto", "Condicionado a reprobar la asignatura", "No pasa nada"], "correct": 2},
        ],
    },
    {
        "required": 2,
        "questions": [
            {"text": "¿Qué porcentaje tiene la Evidencia de Conocimiento en el 1er Parcial?", "options": ["20%", "30%", "40%", "50%"], "correct": 2},
            {"text": "¿Qué porcentaje tiene el Proyecto Integrador en el 3er Parcial?", "options": ["10%", "30%", "40%", "50%"], "correct": 3},
            {"text": "¿Cuándo es la 1ra Evidencia de Conocimiento?", "options": ["02-05-26", "02-06-26", "07-07-26", "11-08-26"], "correct": 1},
        ],
    },
    {
        "required": 2,
        "questions": [
            {"text": "¿Cuál es el objetivo general de Programación Móvil?", "options": ["Diseñar bases de datos", "Desarrollar apps móviles funcionales con frameworks modernos", "Programar videojuegos 3D", "Administrar servidores"], "correct": 1},
            {"text": "¿Cuál NO es un objetivo particular de la materia?", "options": ["Implementar interfaces responsivas", "Integrar APIs REST", "Diseñar compiladores", "Publicar apps en tiendas"], "correct": 2},
        ],
    },
    {
        "required": 2,
        "questions": [
            {"text": "¿Cuándo es el examen final?", "options": ["11-08-26", "14-08-26", "17-08-26", "20-08-26"], "correct": 2},
            {"text": "¿Cuántos parciales hay en el cuatrimestre?", "options": ["2", "3", "4", "5"], "correct": 1},
        ],
    },
]


@app.route("/")
def index():
    return render_template("index.html", sections=SECTIONS, quizzes=QUIZZES)


@app.route("/api/validate", methods=["POST"])
def validate():
    data = request.json
    section_idx = data.get("section", 0)
    answers = data.get("answers", {})
    quiz = QUIZZES[section_idx]
    correct = 0
    results = {}
    for qi, q in enumerate(quiz["questions"]):
        chosen = answers.get(str(qi))
        is_correct = chosen == q["correct"]
        if is_correct:
            correct += 1
        results[qi] = {"correct": q["correct"], "chosen": chosen, "is_correct": is_correct}
    passed = correct >= quiz["required"]
    return jsonify({"passed": passed, "correct": correct, "total": len(quiz["questions"]), "required": quiz["required"], "results": results})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
