/* HOPE Panamá V3 — contenido editable del sitio.
   Los perfiles y credenciales médicas son demostrativos y deben sustituirse
   por información verificada antes de publicar. */

window.HOPE_DATA = {
  doctors: [
    {
      id: "gabriel-chen",
      name: "Dr.1",
      specialty: "Hematología y Medicina Interna",
      image: "images/doctor-1.png",
      position: "50% 25%",
      intro: "Acompañamiento clínico enfocado en trastornos de la sangre, diagnóstico oportuno y seguimiento integral.",
      bio: "El Dr. Gabriel Chen integra la evaluación clínica, la interpretación de estudios especializados y un plan de seguimiento claro para cada paciente. Su consulta se apoya en la comunicación cercana y en decisiones compartidas con la familia.",
      areas: ["Anemias y alteraciones sanguíneas", "Trastornos de coagulación", "Evaluación de médula ósea", "Seguimiento hematológico"],
      education: ["Especialidad en Hematología — información demostrativa", "Medicina Interna — información demostrativa", "Actualización continua en diagnóstico hematológico"],
      languages: "Español · Inglés",
      experience: "12+ años",
      quote: "Entender el diagnóstico es el primer paso para transitar el tratamiento con mayor seguridad."
    },
    {
      id: "andres-mendoza",
      name: "Dr. Erik Araúz",
      specialty: "Oncología Médica",
      image: "images/doctor-2.png",
      position: "50% 24%",
      intro: "Atención oncológica personalizada, con evaluación multidisciplinaria y seguimiento durante cada etapa del tratamiento.",
      bio: "El Dr. Andrés Mendoza trabaja en la planificación de tratamientos oncológicos personalizados, coordinando estudios, terapias y controles para que cada paciente tenga una ruta de atención comprensible y organizada.",
      areas: ["Oncología médica", "Terapias sistémicas", "Segundas opiniones", "Seguimiento postratamiento"],
      education: ["Especialidad en Oncología Médica — información demostrativa", "Medicina Interna — información demostrativa", "Formación en terapias oncológicas de precisión"],
      languages: "Español · Inglés",
      experience: "14+ años",
      quote: "Cada caso merece una estrategia clínica tan individual como la persona que la recibe."
    },
    {
      id: "mariana-lopez",
      name: "Dra. 3",
      specialty: "Hematología Clínica",
      image: "images/doctor-3.png",
      position: "50% 24%",
      intro: "Evaluación de enfermedades hematológicas benignas y malignas con una visión integral del bienestar del paciente.",
      bio: "La Dra. Mariana López se enfoca en convertir información clínica compleja en pasos concretos. Su práctica combina evaluación especializada, educación al paciente y coordinación con otras disciplinas cuando el caso lo requiere.",
      areas: ["Hematología clínica", "Leucemias y linfomas", "Anemias complejas", "Monitoreo de tratamientos"],
      education: ["Especialidad en Hematología — información demostrativa", "Medicina Interna — información demostrativa", "Entrenamiento en enfermedades hematológicas"],
      languages: "Español · Inglés",
      experience: "10+ años",
      quote: "La claridad y la escucha también forman parte de una atención de alta calidad."
    },
    {
      id: "sofia-herrera",
      name: "Dra. 4",
      specialty: "Oncología y Cuidado Integral",
      image: "images/doctor-4.png",
      position: "50% 20%",
      intro: "Tratamiento oncológico con énfasis en calidad de vida, prevención de efectos secundarios y continuidad del cuidado.",
      bio: "La Dra. Sofía Herrera acompaña a sus pacientes desde la evaluación inicial hasta el seguimiento, integrando las necesidades médicas y personales en un plan que prioriza seguridad, calidad de vida y comunicación continua.",
      areas: ["Oncología de tumores sólidos", "Cuidado integral", "Manejo de síntomas", "Supervivencia oncológica"],
      education: ["Especialidad en Oncología — información demostrativa", "Medicina Interna — información demostrativa", "Formación en cuidado integral del paciente"],
      languages: "Español · Inglés",
      experience: "11+ años",
      quote: "Tratamos una enfermedad, pero cuidamos a una persona completa."
    },
    {
      id: "daniel-castillo",
      name: "Dr. 5",
      specialty: "Hemato-Oncología",
      image: "images/doctor-5.png",
      position: "50% 22%",
      intro: "Diagnóstico y tratamiento coordinado para condiciones que requieren experiencia conjunta en hematología y oncología.",
      bio: "El Dr. Daniel Castillo aborda casos hemato-oncológicos desde una perspectiva multidisciplinaria, integrando pruebas diagnósticas, terapias ambulatorias y seguimiento para mantener una visión completa de la evolución clínica.",
      areas: ["Hemato-oncología", "Linfomas y mieloma", "Terapias ambulatorias", "Evaluación diagnóstica"],
      education: ["Especialidad en Hemato-Oncología — información demostrativa", "Medicina Interna — información demostrativa", "Actualización en terapias dirigidas"],
      languages: "Español · Inglés",
      experience: "13+ años",
      quote: "Un buen plan clínico debe ser riguroso, comprensible y posible de recorrer."
    },
    {
      id: "valeria-torres",
      name: "Dra. 6",
      specialty: "Psicooncología",
      image: "images/doctor-6.png",
      position: "50% 20%",
      intro: "Apoyo emocional especializado para pacientes y familiares durante el diagnóstico, tratamiento y recuperación.",
      bio: "La Dra. Valeria Torres acompaña el impacto emocional del proceso oncológico. Su trabajo ayuda a desarrollar recursos para manejar la ansiedad, comunicar necesidades y fortalecer la red de apoyo del paciente y su familia.",
      areas: ["Psicooncología", "Acompañamiento familiar", "Manejo de ansiedad", "Adaptación al tratamiento"],
      education: ["Formación en Psicooncología — información demostrativa", "Psicología Clínica — información demostrativa", "Intervención emocional en salud"],
      languages: "Español · Inglés",
      experience: "9+ años",
      quote: "Cuidar la salud emocional permite atravesar el proceso con más herramientas y compañía."
    }
  ],

  services: [
    {
      id: "consulta-externa",
      number: "01",
      title: "Consulta Externa",
      category: "Evaluación",
      icon: "images/service-1.png",
      short: "Primera valoración, segunda opinión y controles especializados en hematología y oncología.",
      intro: "Una consulta organizada para comprender tus antecedentes, revisar estudios y definir los siguientes pasos con claridad.",
      duration: "45–60 min",
      setting: "Consultorio",
      forWho: "Adultos",
      includes: ["Revisión de historia clínica y síntomas", "Evaluación de laboratorios e imágenes", "Explicación de hallazgos y alternativas", "Plan diagnóstico o terapéutico personalizado"],
      steps: ["Registro y antecedentes", "Valoración especializada", "Explicación del caso", "Plan y seguimiento"],
      preparation: ["Lleva resultados de laboratorios e imágenes recientes.", "Prepara una lista de medicamentos y dosis.", "Anota tus preguntas principales y antecedentes familiares."],
      faq: [
        ["¿Necesito referencia médica?", "Depende de tu aseguradora. Nuestro equipo administrativo puede orientarte antes de la cita."],
        ["¿Puedo solicitar una segunda opinión?", "Sí. Lleva los informes, estudios y tratamientos recibidos para realizar una revisión completa."],
        ["¿Cuándo recibiré el plan?", "En muchos casos se define durante la consulta; si se requieren estudios adicionales, se completa en el control." ]
      ]
    },
    {
      id: "quimioterapia-ambulatoria",
      number: "02",
      title: "Quimioterapia Ambulatoria",
      category: "Tratamiento",
      icon: "images/service-3.png",
      short: "Administración de tratamientos oncológicos en un entorno controlado, cómodo y acompañado.",
      intro: "Cada sesión sigue un protocolo individual y controles de seguridad antes, durante y después de la aplicación.",
      duration: "Según protocolo",
      setting: "Sala ambulatoria",
      forWho: "Pacientes con indicación médica",
      includes: ["Verificación del esquema y dosis", "Control previo de signos y laboratorios", "Administración por personal entrenado", "Orientación sobre cuidados posteriores"],
      steps: ["Confirmación clínica", "Preparación", "Administración", "Observación y alta"],
      preparation: ["Sigue las indicaciones de alimentación e hidratación entregadas por tu médico.", "Informa cualquier síntoma nuevo antes de la sesión.", "Utiliza ropa cómoda y organiza acompañamiento si fue indicado."],
      faq: [
        ["¿Cuánto dura una sesión?", "La duración cambia según el medicamento y el protocolo indicado. El equipo te informará el tiempo estimado."],
        ["¿Puedo comer antes?", "En la mayoría de los casos sí, pero debes seguir las instrucciones específicas de tu tratamiento."],
        ["¿Qué debo reportar?", "Fiebre, infección, vómitos persistentes o cualquier cambio importante debe comunicarse antes de asistir." ]
      ]
    },
    {
      id: "quimioterapia-intratecal",
      number: "03",
      title: "Quimioterapia Intratecal",
      category: "Tratamiento",
      icon: "images/service-3.png",
      short: "Administración especializada de medicamentos en el líquido cefalorraquídeo bajo indicación médica.",
      intro: "Un procedimiento realizado con protocolo de seguridad, preparación previa y vigilancia posterior por personal especializado.",
      duration: "Variable",
      setting: "Área de procedimientos",
      forWho: "Pacientes seleccionados",
      includes: ["Confirmación de indicación y estudios", "Preparación del área y técnica estéril", "Administración del medicamento", "Observación y recomendaciones de alta"],
      steps: ["Evaluación previa", "Preparación segura", "Procedimiento", "Recuperación breve"],
      preparation: ["Confirma con el equipo si debes suspender algún medicamento.", "Presenta los laboratorios solicitados.", "Coordina acompañamiento para regresar a casa."],
      faq: [
        ["¿Por qué se utiliza esta vía?", "Permite que el medicamento alcance directamente el líquido que rodea el cerebro y la médula espinal."],
        ["¿Requiere observación?", "Sí. Después del procedimiento se mantiene un periodo de vigilancia según la indicación clínica."],
        ["¿Qué molestias pueden aparecer?", "El equipo explicará los síntomas esperables y las señales por las que debes comunicarte de inmediato." ]
      ]
    },
    {
      id: "cuidado-cateteres",
      number: "04",
      title: "Cuidado de Catéteres Venosos Centrales",
      category: "Soporte",
      icon: "images/service-2.png",
      short: "Mantenimiento, curación y vigilancia del acceso venoso para reducir riesgos y conservar su funcionamiento.",
      intro: "El cuidado periódico ayuda a prevenir infecciones, obstrucciones y complicaciones durante el tratamiento.",
      duration: "20–40 min",
      setting: "Área ambulatoria",
      forWho: "Pacientes con catéter",
      includes: ["Inspección del sitio de inserción", "Curación con técnica estéril", "Lavado y verificación de permeabilidad", "Educación para el cuidado en casa"],
      steps: ["Inspección", "Limpieza", "Mantenimiento", "Recomendaciones"],
      preparation: ["Mantén el apósito limpio y seco.", "Informa dolor, enrojecimiento, secreción o fiebre.", "Lleva el registro de la última curación si fue realizada en otro centro."],
      faq: [
        ["¿Cada cuánto se realiza?", "La frecuencia depende del tipo de catéter y del uso. Sigue el calendario indicado por tu equipo."],
        ["¿Puedo bañarme?", "Sí, protegiendo el área según las instrucciones para evitar que el apósito se moje."],
        ["¿Cuándo debo llamar?", "Si observas fiebre, dolor, inflamación, secreción o dificultad durante el uso del catéter." ]
      ]
    },
    {
      id: "factores-crecimiento",
      number: "05",
      title: "Factores de Crecimiento Hematopoyético",
      category: "Soporte",
      icon: "images/service-6.png",
      short: "Medicamentos de soporte que estimulan la producción de células sanguíneas cuando existe indicación clínica.",
      intro: "Se utilizan para apoyar la recuperación de ciertos componentes de la sangre y reducir riesgos durante algunos tratamientos.",
      duration: "Aplicación breve",
      setting: "Área ambulatoria",
      forWho: "Según indicación médica",
      includes: ["Revisión de laboratorios", "Confirmación de dosis y calendario", "Administración del medicamento", "Seguimiento de respuesta y síntomas"],
      steps: ["Control de laboratorio", "Validación", "Aplicación", "Seguimiento"],
      preparation: ["Realiza los laboratorios solicitados en la fecha indicada.", "Comunica síntomas nuevos o reacciones previas.", "No modifiques el calendario sin consultar al equipo."],
      faq: [
        ["¿Para qué sirven?", "Ayudan a estimular la producción de determinadas células sanguíneas, según la necesidad clínica."],
        ["¿Se aplican siempre con quimioterapia?", "No. La indicación depende del tratamiento, los laboratorios y el riesgo individual."],
        ["¿Necesitan seguimiento?", "Sí. Se controlan los valores sanguíneos y la respuesta para ajustar el plan cuando sea necesario." ]
      ]
    },
    {
      id: "aspirado-medula",
      number: "06",
      title: "Aspirado de Médula Ósea",
      category: "Diagnóstico",
      icon: "images/service-1.png",
      short: "Obtención de una muestra de médula ósea para estudiar la producción y características de las células sanguíneas.",
      intro: "Este estudio aporta información clave para diagnosticar o dar seguimiento a diferentes enfermedades hematológicas.",
      duration: "30–45 min",
      setting: "Área de procedimientos",
      forWho: "Según evaluación médica",
      includes: ["Revisión clínica y consentimiento", "Anestesia local", "Obtención de la muestra", "Cuidados del sitio y envío al laboratorio"],
      steps: ["Preparación", "Anestesia local", "Toma de muestra", "Recuperación"],
      preparation: ["Informa si utilizas anticoagulantes o tienes alergias.", "Sigue las indicaciones sobre alimentación.", "Coordina acompañamiento si el equipo lo recomienda."],
      faq: [
        ["¿Dónde se toma la muestra?", "Con frecuencia se obtiene del hueso de la pelvis, aunque la decisión depende del caso."],
        ["¿Duele?", "Se utiliza anestesia local. Puede sentirse presión o una molestia breve durante la aspiración."],
        ["¿Cuándo están los resultados?", "Depende de los análisis solicitados. El equipo te indicará el tiempo estimado y la cita de revisión." ]
      ]
    },
    {
      id: "biopsia-hueso",
      number: "07",
      title: "Biopsia de Hueso",
      category: "Diagnóstico",
      icon: "images/service-5.png",
      short: "Procedimiento para obtener una pequeña muestra de tejido óseo y estudiarla en el laboratorio.",
      intro: "La muestra permite analizar la estructura del tejido y complementar la evaluación de determinadas condiciones.",
      duration: "30–60 min",
      setting: "Área de procedimientos",
      forWho: "Según indicación médica",
      includes: ["Evaluación previa y consentimiento", "Preparación estéril y anestesia local", "Obtención controlada de la muestra", "Cuidados posteriores y seguimiento"],
      steps: ["Evaluación", "Preparación", "Biopsia", "Observación"],
      preparation: ["Presenta los estudios solicitados.", "Informa medicamentos, anticoagulantes y alergias.", "Sigue las indicaciones sobre ayuno y acompañamiento."],
      faq: [
        ["¿Es igual al aspirado de médula?", "No exactamente. Pueden complementarse, pero cada uno obtiene un tipo de muestra diferente."],
        ["¿Requiere reposo?", "Se indican cuidados del sitio y actividad limitada por un periodo breve, según el procedimiento."],
        ["¿Quién explica el resultado?", "El especialista revisará el informe y lo integrará con tus otros estudios para orientar los siguientes pasos." ]
      ]
    },
    {
      id: "psicooncologia",
      number: "08",
      title: "Psicooncología",
      category: "Bienestar",
      icon: "images/service-4.png",
      short: "Acompañamiento emocional para pacientes y familiares durante las distintas etapas del proceso oncológico.",
      intro: "Un espacio profesional para trabajar ansiedad, cambios emocionales, comunicación familiar y adaptación al tratamiento.",
      duration: "45–60 min",
      setting: "Consulta privada",
      forWho: "Pacientes y familiares",
      includes: ["Evaluación de necesidades emocionales", "Herramientas para ansiedad y estrés", "Apoyo en comunicación familiar", "Acompañamiento durante tratamiento y recuperación"],
      steps: ["Primera conversación", "Objetivos", "Herramientas", "Seguimiento"],
      preparation: ["No necesitas preparación especial.", "Puedes asistir de manera individual o con un familiar, según se acuerde.", "Anota las situaciones o preocupaciones que deseas abordar."],
      faq: [
        ["¿Es solo para pacientes?", "No. Los familiares y cuidadores también pueden recibir orientación y apoyo."],
        ["¿Cuándo conviene solicitarla?", "En cualquier momento: diagnóstico, tratamiento, recaída, recuperación o adaptación posterior."],
        ["¿Cuántas sesiones se necesitan?", "Se define según tus objetivos, necesidades y evolución; no existe un número único para todos." ]
      ]
    }
  ],

  insurers: [
    "images/insurer-3.png",
    "images/insurer-4.png",
    "images/insurer-5.png",
    "images/insurer-6.png",
    "images/insurer-7.png",
    "images/insurer-8.png"
  ]
};
