/* HOPE Panamá V3 — navegación, contenido dinámico e interacciones */

const { doctors = [], services = [], insurers = [] } = window.HOPE_DATA || {};
const page = document.body.dataset.page || "inicio";

function serviceLinks() {
  return services.map((service) => `<a href="servicio.html?id=${service.id}"><span>${service.number}</span>${service.title}</a>`).join("");
}

function injectLayout() {
  const header = document.querySelector("#siteHeader");
  const footer = document.querySelector("#siteFooter");

  if (header) {
    header.innerHTML = `
      <div class="topbar">
        <div class="shell topbar-inner">
          <a href="https://maps.google.com/?q=Pacifica+Salud+Punta+Pacifica+Panama" target="_blank" rel="noopener">Pacífica Salud · Piso 8 · Punta Pacífica</a>
          <div><a href="mailto:atclientes@hopepanama.com">atclientes@hopepanama.com</a><a href="tel:+5073863086">386-3086 / 386-3588 / 386-3488</a></div>
        </div>
      </div>
      <header class="site-header" id="siteNav">
        <div class="shell nav-shell">
          <a class="brand" href="index.html" aria-label="HOPE Panamá, inicio"><img src="images/logo.png" alt="HOPE Panamá"></a>
          <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="mainNav"><span></span><span></span><span></span><b>Menú</b></button>
          <nav class="main-nav" id="mainNav" aria-label="Navegación principal">
            <a class="${page === "inicio" ? "active" : ""}" href="index.html">Inicio</a>
            <a class="${page === "nosotros" ? "active" : ""}" href="nosotros.html">Quiénes somos</a>
            <a class="${page === "equipo" ? "active" : ""}" href="equipo.html">Equipo médico</a>
            <div class="nav-services">
              <button class="${page === "servicios" ? "active" : ""}" id="servicesToggle" aria-expanded="false">Servicios <span>⌄</span></button>
              <div class="mega-menu" id="megaMenu"><div class="mega-intro"><small>Atención integral</small><strong>Explora nuestros servicios especializados.</strong><a href="servicios.html">Ver todos <span>↗</span></a></div><div class="mega-links">${serviceLinks()}</div></div>
            </div>
            <a href="index.html#aseguradoras">Aseguradoras</a>
            <div class="language-switch" role="group" aria-label="Cambiar idioma">
              <button type="button" data-language="es" aria-pressed="true">ES</button>
              <button type="button" data-language="en" aria-pressed="false">EN</button>
            </div>
            <a class="nav-contact ${page === "contacto" ? "active" : ""}" href="contacto.html">Contacto <span>↗</span></a>
          </nav>
        </div>
      </header>`;
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="footer">
        <div class="shell footer-top">
          <div class="footer-main"><img src="images/logo.png" alt="HOPE Panamá"><p>Centro de Hematología Oncología de Panamá Especializada.</p><a href="https://www.instagram.com/hope_puntapacifica/" target="_blank" rel="noopener">@hope_puntapacifica <span>↗</span></a></div>
          <div><small>Navegación</small><a href="nosotros.html">Quiénes somos</a><a href="equipo.html">Equipo médico</a><a href="servicios.html">Servicios</a><a href="contacto.html">Contacto</a></div>
          <div><small>Servicios</small><a href="servicio.html?id=consulta-externa">Consulta externa</a><a href="servicio.html?id=quimioterapia-ambulatoria">Quimioterapia ambulatoria</a><a href="servicio.html?id=aspirado-medula">Aspirado de médula</a><a href="servicio.html?id=psicooncologia">Psicooncología</a></div>
          <div><small>Contacto</small><p>Pacífica Salud, Piso 8<br>Punta Pacífica, Panamá</p><a href="tel:+5073863086">386-3086 / 386-3588</a><a href="mailto:atclientes@hopepanama.com">atclientes@hopepanama.com</a></div>
        </div>
        <div class="shell footer-bottom"><span>© 2026 HOPE Panamá. Todos los derechos reservados.</span><span>Atención especializada con ciencia y humanidad.</span></div>
      </footer>
      <a class="whatsapp-button" href="https://wa.me/5073863086" target="_blank" rel="noopener" aria-label="Contactar a HOPE Panamá por WhatsApp"><span>WA</span><b>Escríbenos</b></a>`;
  }
}

function setupNavigation() {
  const menuToggle = document.querySelector("#menuToggle");
  const mainNav = document.querySelector("#mainNav");
  const servicesToggle = document.querySelector("#servicesToggle");
  const megaMenu = document.querySelector("#megaMenu");
  const siteNav = document.querySelector("#siteNav");

  menuToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  servicesToggle?.addEventListener("click", () => {
    const open = megaMenu.classList.toggle("open");
    servicesToggle.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-services")) {
      megaMenu?.classList.remove("open");
      servicesToggle?.setAttribute("aria-expanded", "false");
    }
  });

  mainNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const updateHeader = () => siteNav?.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function doctorCard(doctor, index) {
  return `
    <article class="doctor-card" data-category="${doctor.specialty}" data-reveal>
      <a class="doctor-profile-link" href="doctor.html?id=${doctor.id}">
        <div class="doctor-photo"><img src="${doctor.image}" alt="${doctor.name}" style="object-position:${doctor.position}"><span>${String(index + 1).padStart(2, "0")}</span><b>Ver perfil ↗</b></div>
        <div class="doctor-info"><small>Perfil del especialista</small><h3>${doctor.name}</h3><p>${doctor.specialty}</p></div>
      </a>
      <div class="doctor-social-row">
        <a href="doctor.html?id=${doctor.id}">Conocer perfil</a>
        <a class="instagram-link" href="${doctor.instagram}" target="_blank" rel="noopener" aria-label="Instagram de ${doctor.name}">Instagram <span>↗</span></a>
      </div>
    </article>`;
}

function serviceCard(service) {
  return `
    <a class="service-card" href="servicio.html?id=${service.id}" data-category="${service.category}" data-reveal>
      <div class="service-card-top"><span>${service.number}</span><img src="${service.icon}" alt=""></div>
      <div><small>${service.category}</small><h3>${service.title}</h3><p>${service.short}</p></div>
      <b class="card-arrow">↗</b>
    </a>`;
}

function renderGrids() {
  document.querySelectorAll("[data-doctor-grid]").forEach((grid) => {
    const limit = Number(grid.dataset.limit || doctors.length);
    grid.innerHTML = doctors.slice(0, limit).map(doctorCard).join("");
  });

  document.querySelectorAll("[data-service-grid]").forEach((grid) => {
    const limit = Number(grid.dataset.limit || services.length);
    grid.innerHTML = services.slice(0, limit).map(serviceCard).join("");
  });

  document.querySelectorAll("[data-insurance-grid]").forEach((grid) => {
    grid.innerHTML = insurers.map((image, index) => `<div class="insurance-card" data-reveal><img src="${image}" alt="Aseguradora asociada ${index + 1}"></div>`).join("");
  });
}

function setupFilters() {
  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll(".directory-grid .service-card"));
  buttons.forEach((button) => button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    cards.forEach((card) => {
      const visible = button.dataset.filter === "all" || card.dataset.category === button.dataset.filter;
      card.hidden = !visible;
    });
  }));
}

function renderDoctorDetail() {
  const target = document.querySelector("#doctorDetail");
  if (!target) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const doctor = doctors.find((item) => item.id === id) || doctors[0];
  const others = doctors.filter((item) => item.id !== doctor.id).slice(0, 3);
  document.title = `${doctor.name} | HOPE Panamá`;
  target.innerHTML = `
    <section class="profile-hero">
      <div class="profile-orbit"></div>
      <div class="shell profile-grid">
        <div class="profile-copy" data-reveal><a class="breadcrumb" href="equipo.html">← Equipo médico</a><span class="demo-badge">Perfil demostrativo</span><p class="kicker light"><span></span> ${doctor.specialty}</p><h1>${doctor.name}</h1><p>${doctor.intro}</p><div class="profile-actions"><a class="button button-gold" href="contacto.html">Solicitar orientación <span>↗</span></a><a class="button button-dark-ghost" href="tel:+5073863086">Llamar al centro</a><a class="button button-instagram" href="${doctor.instagram}" target="_blank" rel="noopener">Instagram <span>↗</span></a></div></div>
        <div class="profile-photo-wrap" data-reveal><div class="profile-photo"><img src="${doctor.image}" alt="${doctor.name}" style="object-position:${doctor.position}"></div><div class="profile-fact"><small>Experiencia</small><strong>${doctor.experience}</strong><span>Información demostrativa</span></div></div>
      </div>
    </section>
    <section class="profile-content section-space"><div class="shell profile-content-grid">
      <article data-reveal><p class="kicker"><span></span> Sobre el especialista</p><h2>Atención rigurosa, explicada con claridad.</h2><p>${doctor.bio}</p><blockquote>“${doctor.quote}”</blockquote></article>
      <aside class="expertise-card" data-reveal><small>Áreas de atención</small><h3>Enfoque clínico</h3><ul>${doctor.areas.map((area) => `<li><span>✓</span>${area}</li>`).join("")}</ul><div class="language"><span>Idiomas</span><strong>${doctor.languages}</strong></div></aside>
    </div></section>
    <section class="credentials section-space soft-section"><div class="shell credentials-grid"><div data-reveal><p class="kicker"><span></span> Trayectoria</p><h2>Formación y actualización profesional.</h2><p class="demo-note">Los siguientes datos son de demostración y deben reemplazarse por credenciales verificadas.</p></div><ol data-reveal>${doctor.education.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></li>`).join("")}</ol></div></section>
    <section class="related-section section-space"><div class="shell"><div class="split-heading compact" data-reveal><div><p class="kicker"><span></span> Más especialistas</p><h2>Conoce al resto del equipo.</h2></div><a class="text-link" href="equipo.html">Ver equipo completo <span>↗</span></a></div><div class="doctor-grid related-grid">${others.map((item) => doctorCard(item, doctors.indexOf(item))).join("")}</div></div></section>`;
}

function renderServiceDetail() {
  const target = document.querySelector("#serviceDetail");
  if (!target) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const service = services.find((item) => item.id === id) || services[0];
  const related = services.filter((item) => item.id !== service.id).slice(0, 3);
  document.title = `${service.title} | HOPE Panamá`;
  target.innerHTML = `
    <section class="service-detail-hero"><div class="service-number-bg">${service.number}</div><div class="shell service-detail-grid">
      <div data-reveal><a class="breadcrumb" href="servicios.html">← Todos los servicios</a><p class="kicker light"><span></span> ${service.category}</p><h1>${service.title}</h1><p>${service.intro}</p><a class="button button-gold" href="contacto.html">Solicitar orientación <span>↗</span></a></div>
      <div class="service-symbol" data-reveal><img src="${service.icon}" alt=""><span>${service.number}</span><small>HOPE Panamá</small></div>
    </div></section>
    <section class="quick-facts"><div class="shell"><div><small>Duración estimada</small><strong>${service.duration}</strong></div><div><small>Modalidad</small><strong>${service.setting}</strong></div><div><small>Dirigido a</small><strong>${service.forWho}</strong></div><a href="contacto.html">Consultar disponibilidad <span>↗</span></a></div></section>
    <section class="service-overview section-space"><div class="shell overview-grid"><div data-reveal><p class="kicker"><span></span> Sobre el servicio</p><h2>Qué incluye tu atención.</h2><p>${service.short}</p></div><ul class="include-list" data-reveal>${service.includes.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></li>`).join("")}</ul></div></section>
    <section class="what-to-expect section-space dark-section"><div class="shell"><div class="split-heading" data-reveal><div><p class="kicker light"><span></span> Qué esperar</p><h2>Un proceso organizado de principio a fin.</h2></div><p>Cada caso puede requerir ajustes. El equipo confirmará las indicaciones específicas antes de tu atención.</p></div><div class="steps-grid" data-reveal>${service.steps.map((step, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><div></div><h3>${step}</h3></article>`).join("")}</div></div></section>
    <section class="preparation section-space"><div class="shell prep-grid"><div data-reveal><p class="kicker"><span></span> Preparación</p><h2>Antes de tu cita.</h2><p>Sigue siempre las instrucciones entregadas por tu especialista, ya que pueden variar según tu condición y tratamiento.</p></div><div class="prep-list" data-reveal>${service.preparation.map((item) => `<div><span>✓</span><p>${item}</p></div>`).join("")}</div></div></section>
    <section class="faq-section section-space soft-section"><div class="shell faq-layout"><div data-reveal><p class="kicker"><span></span> Preguntas frecuentes</p><h2>Resolvemos dudas comunes.</h2></div><div class="faq-stack" data-reveal>${service.faq.map(([question, answer]) => `<details><summary>${question}<span>+</span></summary><p>${answer}</p></details>`).join("")}</div></div></section>
    <section class="related-section section-space"><div class="shell"><div class="split-heading compact" data-reveal><div><p class="kicker"><span></span> También puede interesarte</p><h2>Otros servicios de HOPE.</h2></div><a class="text-link" href="servicios.html">Ver todos <span>↗</span></a></div><div class="service-grid related-grid">${related.map(serviceCard).join("")}</div></div></section>`;
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const subject = encodeURIComponent(`Consulta HOPE Panamá — ${values.get("reason")}`);
    const body = encodeURIComponent(`Nombre: ${values.get("name")}\nTeléfono: ${values.get("phone")}\nCorreo: ${values.get("email")}\nMotivo: ${values.get("reason")}\n\nMensaje:\n${values.get("message") || "Sin mensaje adicional"}`);
    status.textContent = document.documentElement.lang === "en" ? "Opening your email application…" : "Abriendo tu aplicación de correo…";
    window.location.href = `mailto:atclientes@hopepanama.com?subject=${subject}&body=${body}`;
  });
}

function setupReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12, rootMargin: "0px 0px -35px" });
  items.forEach((item) => observer.observe(item));
}

injectLayout();
setupNavigation();
renderGrids();
renderDoctorDetail();
renderServiceDetail();
setupFilters();
setupContactForm();
setupReveal();
(function () {
  "use strict";

  const STORAGE_KEY = "hope-language";
  const supportedLanguages = ["es", "en"];
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalTitle = document.title;

  const en = {
    /* Navegación y pie */
    "Pacífica Salud · Piso 8 · Punta Pacífica": "Pacífica Salud · 8th Floor · Punta Pacífica",
    "Inicio": "Home",
    "Quiénes somos": "About us",
    "Equipo médico": "Medical team",
    "Servicios": "Services",
    "Aseguradoras": "Insurance",
    "Contacto": "Contact",
    "Menú": "Menu",
    "Atención integral": "Comprehensive care",
    "Explora nuestros servicios especializados.": "Explore our specialized services.",
    "Ver todos": "View all",
    "Centro de Hematología Oncología de Panamá Especializada.": "Specialized Hematology and Oncology Center of Panama.",
    "Navegación": "Navigation",
    "Consulta externa": "Outpatient consultation",
    "Quimioterapia ambulatoria": "Outpatient chemotherapy",
    "Aspirado de médula": "Bone marrow aspiration",
    "Psicooncología": "Psycho-oncology",
    "Pacífica Salud, Piso 8": "Pacífica Salud, 8th Floor",
    "Punta Pacífica, Panamá": "Punta Pacífica, Panama",
    "© 2026 HOPE Panamá. Todos los derechos reservados.": "© 2026 HOPE Panama. All rights reserved.",
    "Atención especializada con ciencia y humanidad.": "Specialized care with science and humanity.",
    "Escríbenos": "Message us",

    /* Inicio */
    "Hematología · Oncología · Panamá": "Hematology · Oncology · Panama",
    "Ciencia que cuida.": "Science that cares.",
    "Humanidad que acompaña.": "Humanity that stands by you.",
    "Atención especializada, diagnóstico preciso y acompañamiento integral en cada etapa del proceso.": "Specialized care, precise diagnosis, and comprehensive support at every stage of the process.",
    "Solicitar orientación": "Request guidance",
    "Explorar servicios": "Explore services",
    "Atención en": "Care available at",
    "Pacífica Salud · Piso 8": "Pacífica Salud · 8th Floor",
    "Conoce al equipo": "Meet the team",
    "Atención multidisciplinaria": "Multidisciplinary care",
    "Tratamientos ambulatorios": "Outpatient treatments",
    "Acompañamiento humano": "Compassionate support",
    "Enfoque personalizado": "Personalized approach",
    "Nuestra manera de cuidar": "Our approach to care",
    "Un centro pensado alrededor de la persona, no solo del diagnóstico.": "A center designed around the person, not only the diagnosis.",
    "Integramos hematología, oncología y soporte emocional para ofrecer una experiencia de atención clara, coordinada y cercana.": "We bring together hematology, oncology, and emotional support to provide clear, coordinated, and compassionate care.",
    "Diagnóstico": "Diagnosis",
    "Evaluación especializada y decisiones basadas en evidencia.": "Specialized evaluation and evidence-based decisions.",
    "Tratamiento": "Treatment",
    "Protocolos personalizados y seguimiento continuo.": "Personalized protocols and continuous follow-up.",
    "Acompañamiento": "Support",
    "Orientación para pacientes, familias y cuidadores.": "Guidance for patients, families, and caregivers.",
    "Descubre quiénes somos": "Discover who we are",
    "Cuidado integral": "Comprehensive care",
    "Servicios para cada etapa del proceso.": "Services for every stage of the process.",
    "Desde la primera valoración hasta el tratamiento y el seguimiento, reunimos la atención que necesitas en un mismo lugar.": "From your first evaluation through treatment and follow-up, we bring the care you need together in one place.",
    "Ver todos los servicios": "View all services",
    "Tu ruta de atención": "Your care journey",
    "Un proceso más claro desde el primer contacto.": "A clearer process from the first contact.",
    "Coordinamos cada paso para que sepas qué esperar y quién te acompaña.": "We coordinate every step so you know what to expect and who will support you.",
    "Orientación inicial": "Initial guidance",
    "Escuchamos tu necesidad y te guiamos hacia la atención adecuada.": "We listen to your needs and guide you to the right care.",
    "Evaluación médica": "Medical evaluation",
    "Revisamos tu historia, estudios y opciones con claridad.": "We clearly review your history, tests, and options.",
    "Plan personalizado": "Personalized plan",
    "Definimos una ruta de diagnóstico, tratamiento o seguimiento.": "We define a path for diagnosis, treatment, or follow-up.",
    "Mantenemos seguimiento clínico y orientación continua.": "We provide continuous clinical follow-up and guidance.",
    "Especialistas": "Specialists",
    "Experiencia clínica. Atención cercana.": "Clinical expertise. Compassionate care.",
    "Conoce a los profesionales que acompañan cada decisión de tu cuidado.": "Meet the professionals who support every care decision.",
    "Ver equipo completo": "View full team",
    "Respaldo y cobertura": "Support and coverage",
    "Coordinamos tu atención con diferentes aseguradoras.": "We coordinate your care with different insurance providers.",
    "Nuestro equipo administrativo te orienta sobre autorizaciones, documentación y los pasos previos a tu atención.": "Our administrative team guides you through authorizations, documentation, and the steps required before your care.",
    "Consultar cobertura": "Check coverage",
    "Estamos para orientarte": "We are here to guide you",
    "Tu atención comienza con una conversación.": "Your care begins with a conversation.",
    "Conversemos sobre tu cita, tus estudios o el servicio que necesitas.": "Let’s talk about your appointment, tests, or the service you need.",
    "Llamar al 386-3086": "Call 386-3086",
    "Ver contacto": "View contact",

    /* Equipo */
    "Nuestro equipo": "Our team",
    "Especialistas que combinan experiencia y cercanía.": "Specialists who combine expertise and compassion.",
    "Un enfoque multidisciplinario para comprender tu caso, coordinar decisiones y acompañarte de forma continua.": "A multidisciplinary approach to understand your case, coordinate decisions, and support you continuously.",
    "06 perfiles profesionales": "06 professional profiles",
    "Selecciona un perfil para conocer su enfoque, áreas de atención y trayectoria demostrativa.": "Select a profile to learn about their approach, areas of care, and sample background.",
    "Información de perfiles utilizada como demostración de diseño.": "Profile information is included for design demonstration purposes.",
    "Cómo trabajamos": "How we work",
    "Distintas especialidades, una sola ruta de cuidado.": "Different specialties, one coordinated care journey.",
    "Discusión clínica": "Clinical review",
    "Los casos que lo requieren se revisan desde distintas perspectivas para enriquecer las decisiones.": "Cases are reviewed from different perspectives when needed to support better decisions.",
    "Comunicación clara": "Clear communication",
    "Explicamos hallazgos, opciones y próximos pasos con un lenguaje comprensible.": "We explain findings, options, and next steps in clear language.",
    "Seguimiento continuo": "Continuous follow-up",
    "Mantenemos una visión completa de la evolución y de las necesidades de cada paciente.": "We maintain a complete view of each patient’s progress and needs.",
    "Agenda una valoración": "Schedule an evaluation",
    "Encuentra el especialista adecuado para tu caso.": "Find the right specialist for your case.",
    "Nuestro equipo puede orientarte antes de coordinar la cita.": "Our team can guide you before scheduling an appointment.",
    "Ver servicios": "View services",
    "Perfil demostrativo": "Sample profile",
    "Ver perfil ↗": "View profile ↗",

    /* Servicios */
    "Servicios médicos": "Medical services",
    "Atención especializada en cada etapa.": "Specialized care at every stage.",
    "Evaluación, diagnóstico, tratamiento y soporte reunidos en una experiencia coordinada.": "Evaluation, diagnosis, treatment, and support brought together in one coordinated experience.",
    "08 servicios especializados": "08 specialized services",
    "Explora la atención": "Explore our care",
    "Conoce cada procedimiento antes de tu visita.": "Learn about each procedure before your visit.",
    "Todos": "All",
    "Evaluación": "Evaluation",
    "Soporte": "Support",
    "Bienestar": "Well-being",
    "Antes de tu atención": "Before your care",
    "Te ayudamos a llegar preparado.": "We help you arrive prepared.",
    "La preparación puede variar según el servicio, el tratamiento y tus antecedentes. Confirma siempre las indicaciones específicas con nuestro equipo.": "Preparation may vary according to the service, treatment, and your medical history. Always confirm specific instructions with our team.",
    "Consultar requisitos": "Check requirements",
    "Confirma tu cita y cobertura": "Confirm your appointment and coverage",
    "Reúne estudios y medicamentos": "Gather your tests and medications",
    "Sigue las indicaciones previas": "Follow pre-visit instructions",
    "Comunica cualquier cambio": "Report any changes",
    "Preguntas frecuentes": "Frequently asked questions",
    "Información útil antes de comenzar.": "Useful information before you begin.",
    "¿Cómo sé qué servicio necesito?": "How do I know which service I need?",
    "La consulta inicial permite revisar tu caso y definir si necesitas estudios, un procedimiento o tratamiento.": "The initial consultation allows us to review your case and determine whether you need tests, a procedure, or treatment.",
    "¿Trabajan con aseguradoras?": "Do you work with insurance providers?",
    "Sí. La cobertura depende de la póliza y del servicio; nuestro equipo puede orientarte con la documentación.": "Yes. Coverage depends on your policy and the service; our team can guide you with the documentation.",
    "¿Puedo llevar estudios realizados en otro centro?": "Can I bring tests performed at another center?",
    "Sí. Lleva informes, imágenes y laboratorios disponibles para que el especialista pueda revisarlos.": "Yes. Bring available reports, images, and lab results for the specialist to review.",

    /* Nosotros */
    "Un centro especializado con una visión profundamente humana.": "A specialized center with a deeply human approach.",
    "HOPE reúne experiencia clínica, coordinación y acompañamiento para ofrecer una atención integral.": "HOPE brings together clinical expertise, coordination, and support to provide comprehensive care.",
    "Hematología · Oncología · Bienestar": "Hematology · Oncology · Well-being",
    "Nuestra esencia": "Our essence",
    "Más claridad, coordinación y cercanía en momentos importantes.": "More clarity, coordination, and compassion during important moments.",
    "Las enfermedades de la sangre y el cáncer requieren decisiones oportunas y una atención que conecte todas las partes del proceso. Por eso trabajamos con una visión multidisciplinaria y centrada en la persona.": "Blood disorders and cancer require timely decisions and care that connects every part of the process. That is why we work with a multidisciplinary, person-centered approach.",
    "Nuestras instalaciones están preparadas para consultas, procedimientos y terapias ambulatorias, con un equipo que acompaña tanto las necesidades clínicas como las emocionales.": "Our facilities are prepared for consultations, procedures, and outpatient therapies, with a team that supports both clinical and emotional needs.",
    "Conocer al equipo": "Meet the team",
    "Lo que nos guía": "What guides us",
    "Una experiencia de atención diseñada con intención.": "A care experience designed with purpose.",
    "Rigor clínico": "Clinical rigor",
    "Evaluación especializada, protocolos seguros y seguimiento de cada decisión.": "Specialized evaluation, safe protocols, and follow-up for every decision.",
    "Trato humano": "Compassionate care",
    "Escucha, respeto y acompañamiento para pacientes y familias.": "Listening, respect, and support for patients and families.",
    "Trabajo coordinado": "Coordinated teamwork",
    "Profesionales y servicios conectados alrededor de un mismo plan.": "Professionals and services connected around one plan.",
    "Información clara": "Clear information",
    "Explicaciones útiles para participar activamente en el proceso.": "Useful explanations so you can actively participate in the process.",
    "Nuestro espacio": "Our facilities",
    "Diseñado para recibirte con calma y seguridad.": "Designed to welcome you with comfort and safety.",
    "Estamos ubicados en Pacífica Salud, Piso 8, con espacios para consulta, procedimientos y tratamiento ambulatorio.": "We are located at Pacífica Salud, 8th Floor, with spaces for consultations, procedures, and outpatient treatment.",
    "Atención en un mismo centro": "Care in one center",
    "Equipo clínico especializado": "Specialized clinical team",
    "Coordinación administrativa": "Administrative coordination",
    "Ubicación accesible en Punta Pacífica": "Convenient Punta Pacífica location",
    "Cómo llegar": "Get directions",

    /* Contacto */
    "Estamos cerca cuando necesitas orientación.": "We are here when you need guidance.",
    "Cuéntanos si deseas coordinar una cita, consultar un servicio o verificar documentación para tu aseguradora.": "Tell us if you would like to schedule an appointment, ask about a service, or verify insurance documentation.",
    "Teléfonos": "Phone numbers",
    "Correo": "Email",
    "Ubicación": "Location",
    "Panamá": "Panama",
    "Horario": "Hours",
    "Lunes a viernes": "Monday to Friday",
    "Hasta las 5:30 p. m.": "Until 5:30 p.m.",
    "¿Cómo podemos ayudarte?": "How can we help you?",
    "Completa tus datos y prepararemos tu mensaje para enviarlo al centro.": "Complete your details and we will prepare your message to send to the center.",
    "Nombre completo": "Full name",
    "Teléfono": "Phone",
    "Motivo": "Reason",
    "Mensaje": "Message",
    "Coordinar una cita": "Schedule an appointment",
    "Consultar un servicio": "Ask about a service",
    "Verificar aseguradora": "Verify insurance",
    "Solicitar segunda opinión": "Request a second opinion",
    "Otra consulta": "Other inquiry",
    "Preparar mensaje": "Prepare message",
    "Este formulario abre tu aplicación de correo; no almacena información.": "This form opens your email application; it does not store information.",
    "Visítanos": "Visit us",
    "San Francisco, Boulevard Pacífica Salud Vía Punta Darién.": "San Francisco, Pacífica Salud Boulevard, Vía Punta Darién.",
    "Consultorios Pacífica Salud, Piso 8.": "Pacífica Salud Medical Offices, 8th Floor.",
    "Abrir en Google Maps": "Open in Google Maps",

    /* Perfiles y servicios dinámicos */
    "← Equipo médico": "← Medical team",
    "Sobre el especialista": "About the specialist",
    "Atención rigurosa, explicada con claridad.": "Rigorous care, clearly explained.",
    "Áreas de atención": "Areas of care",
    "Enfoque clínico": "Clinical focus",
    "Idiomas": "Languages",
    "Trayectoria": "Background",
    "Formación y actualización profesional.": "Education and professional development.",
    "Los siguientes datos son de demostración y deben reemplazarse por credenciales verificadas.": "The following information is for demonstration and must be replaced with verified credentials.",
    "Más especialistas": "More specialists",
    "Conoce al resto del equipo.": "Meet the rest of the team.",
    "← Todos los servicios": "← All services",
    "Duración estimada": "Estimated duration",
    "Modalidad": "Setting",
    "Dirigido a": "For",
    "Consultar disponibilidad": "Check availability",
    "Sobre el servicio": "About the service",
    "Qué incluye tu atención.": "What your care includes.",
    "Qué esperar": "What to expect",
    "Un proceso organizado de principio a fin.": "An organized process from start to finish.",
    "Cada caso puede requerir ajustes. El equipo confirmará las indicaciones específicas antes de tu atención.": "Each case may require adjustments. The team will confirm specific instructions before your care.",
    "Preparación": "Preparation",
    "Antes de tu cita.": "Before your appointment.",
    "Sigue siempre las instrucciones entregadas por tu especialista, ya que pueden variar según tu condición y tratamiento.": "Always follow the instructions provided by your specialist, as they may vary according to your condition and treatment.",
    "Resolvemos dudas comunes.": "Answers to common questions.",
    "También puede interesarte": "You may also be interested in",
    "Otros servicios de HOPE.": "Other HOPE services.",
    "Experiencia": "Experience",
    "Información demostrativa": "Sample information",

    /* Nombres de servicios, categorías y especialidades */
    "Consulta Externa": "Outpatient Consultation",
    "Quimioterapia Ambulatoria": "Outpatient Chemotherapy",
    "Quimioterapia Intratecal": "Intrathecal Chemotherapy",
    "Cuidado de Catéteres Venosos Centrales": "Central Venous Catheter Care",
    "Factores de Crecimiento Hematopoyético": "Hematopoietic Growth Factors",
    "Aspirado de Médula Ósea": "Bone Marrow Aspiration",
    "Biopsia de Hueso": "Bone Biopsy",
    "Hematología y Medicina Interna": "Hematology and Internal Medicine",
    "Oncología Médica": "Medical Oncology",
    "Hematología Clínica": "Clinical Hematology",
    "Oncología y Cuidado Integral": "Oncology and Comprehensive Care",
    "Hemato-Oncología": "Hemato-Oncology",
    "Consultorio": "Medical office",
    "Adultos": "Adults",
    "Área ambulatoria": "Outpatient area",
    "Área de procedimientos": "Procedure area",
    "Consulta privada": "Private consultation",
    "Pacientes y familiares": "Patients and families",
    "Pacientes seleccionados": "Selected patients",
    "Según indicación médica": "As medically indicated",
    "Perfil del especialista": "Specialist profile",
    "Conocer perfil": "View profile",
    "Hematóloga": "Hematologist",
    "Hematólogo": "Hematologist",
    "Oncólogo": "Oncologist",
    "Especialista en PsicoOncología": "Psycho-Oncology Specialist",
    "Español · Inglés": "Spanish · English",
    "12+ años": "12+ years",
    "14+ años": "14+ years",
    "10+ años": "10+ years",
    "11+ años": "11+ years",
    "13+ años": "13+ years",
    "9+ años": "9+ years",

    "Acompañamiento clínico enfocado en trastornos de la sangre, diagnóstico oportuno y seguimiento integral.": "Clinical care focused on blood disorders, timely diagnosis, and comprehensive follow-up.",
    "La Dra. Natalie Buitrón integra la evaluación clínica, la interpretación de estudios especializados y un plan de seguimiento claro para cada paciente. Su consulta se apoya en la comunicación cercana y en decisiones compartidas con la familia.": "Dr. Natalie Buitrón combines clinical evaluation, interpretation of specialized studies, and a clear follow-up plan for each patient. Her consultations are grounded in close communication and shared decisions with the family.",
    "Anemias y alteraciones sanguíneas": "Anemias and blood disorders",
    "Trastornos de coagulación": "Coagulation disorders",
    "Evaluación de médula ósea": "Bone marrow evaluation",
    "Seguimiento hematológico": "Hematology follow-up",
    "Especialidad en Hematología — información demostrativa": "Hematology specialty — sample information",
    "Medicina Interna — información demostrativa": "Internal Medicine — sample information",
    "Actualización continua en diagnóstico hematológico": "Continuing education in hematologic diagnosis",
    "Entender el diagnóstico es el primer paso para transitar el tratamiento con mayor seguridad.": "Understanding the diagnosis is the first step toward navigating treatment with greater confidence.",

    "Atención oncológica personalizada, con evaluación multidisciplinaria y seguimiento durante cada etapa del tratamiento.": "Personalized oncology care, with multidisciplinary evaluation and follow-up throughout every stage of treatment.",
    "El Dr. Erik Araúz trabaja en la planificación de tratamientos oncológicos personalizados, coordinando estudios, terapias y controles para que cada paciente tenga una ruta de atención comprensible y organizada.": "Dr. Erik Araúz plans personalized oncology treatments, coordinating tests, therapies, and follow-up so each patient has a clear and organized care path.",
    "Oncología médica": "Medical oncology",
    "Terapias sistémicas": "Systemic therapies",
    "Segundas opiniones": "Second opinions",
    "Seguimiento postratamiento": "Post-treatment follow-up",
    "Especialidad en Oncología Médica — información demostrativa": "Medical Oncology specialty — sample information",
    "Formación en terapias oncológicas de precisión": "Training in precision oncology therapies",
    "Cada caso merece una estrategia clínica tan individual como la persona que la recibe.": "Every case deserves a clinical strategy as individual as the person receiving it.",

    "Evaluación y tratamiento oncológico con una visión integral del bienestar y las necesidades de cada paciente.": "Oncology evaluation and treatment with a comprehensive view of each patient’s well-being and needs.",
    "El Dr. Ignacio Véliz se enfoca en convertir información clínica compleja en pasos concretos. Su práctica combina evaluación especializada, educación al paciente y coordinación con otras disciplinas cuando el caso lo requiere.": "Dr. Ignacio Véliz focuses on turning complex clinical information into concrete steps. His practice combines specialized evaluation, patient education, and coordination with other disciplines when needed.",
    "Tumores sólidos": "Solid tumors",
    "Monitoreo de tratamientos": "Treatment monitoring",
    "Especialidad en Oncología — información demostrativa": "Oncology specialty — sample information",
    "Entrenamiento en tratamientos oncológicos": "Training in oncology treatments",
    "La claridad y la escucha también forman parte de una atención de alta calidad.": "Clarity and listening are also part of high-quality care.",

    "Tratamiento oncológico con énfasis en calidad de vida, prevención de efectos secundarios y continuidad del cuidado.": "Oncology treatment focused on quality of life, prevention of side effects, and continuity of care.",
    "El Dr. Yong Loo acompaña a sus pacientes desde la evaluación inicial hasta el seguimiento, integrando las necesidades médicas y personales en un plan que prioriza seguridad, calidad de vida y comunicación continua.": "Dr. Yong Loo supports his patients from initial evaluation through follow-up, integrating medical and personal needs into a plan that prioritizes safety, quality of life, and continuous communication.",
    "Oncología de tumores sólidos": "Solid tumor oncology",
    "Cuidado integral": "Comprehensive care",
    "Manejo de síntomas": "Symptom management",
    "Supervivencia oncológica": "Cancer survivorship",
    "Formación en cuidado integral del paciente": "Training in comprehensive patient care",
    "Tratamos una enfermedad, pero cuidamos a una persona completa.": "We treat a disease, but care for the whole person.",

    "Diagnóstico, tratamiento y seguimiento especializado de enfermedades de la sangre desde una perspectiva multidisciplinaria.": "Specialized diagnosis, treatment, and follow-up of blood disorders from a multidisciplinary perspective.",
    "El Dr. Al Ávila aborda condiciones hematológicas desde una perspectiva multidisciplinaria, integrando pruebas diagnósticas, terapias ambulatorias y seguimiento para mantener una visión completa de la evolución clínica.": "Dr. Al Ávila addresses hematologic conditions through a multidisciplinary approach, integrating diagnostic tests, outpatient therapies, and follow-up to maintain a complete view of clinical progress.",
    "Hematología clínica": "Clinical hematology",
    "Linfomas y mieloma": "Lymphomas and myeloma",
    "Terapias ambulatorias": "Outpatient therapies",
    "Evaluación diagnóstica": "Diagnostic evaluation",
    "Actualización en terapias dirigidas": "Continuing education in targeted therapies",
    "Un buen plan clínico debe ser riguroso, comprensible y posible de recorrer.": "A good clinical plan should be rigorous, understandable, and manageable.",

    "Apoyo emocional especializado para pacientes y familiares durante el diagnóstico, tratamiento y recuperación.": "Specialized emotional support for patients and families during diagnosis, treatment, and recovery.",
    "Mgter. Lidia Luna acompaña el impacto emocional del proceso oncológico. Su trabajo ayuda a desarrollar recursos para manejar la ansiedad, comunicar necesidades y fortalecer la red de apoyo del paciente y su familia.": "Lidia Luna supports patients and families through the emotional impact of the cancer journey. Her work helps develop tools to manage anxiety, communicate needs, and strengthen support networks.",
    "Acompañamiento familiar": "Family support",
    "Manejo de ansiedad": "Anxiety management",
    "Adaptación al tratamiento": "Adjustment to treatment",
    "Formación en Psicooncología — información demostrativa": "Psycho-Oncology training — sample information",
    "Psicología Clínica — información demostrativa": "Clinical Psychology — sample information",
    "Intervención emocional en salud": "Emotional health intervention",
    "Cuidar la salud emocional permite atravesar el proceso con más herramientas y compañía.": "Caring for emotional health provides more tools and support throughout the process.",

    "Tratamiento": "Treatment",
    "Diagnóstico": "Diagnosis",
    "Soporte": "Support",
    "Bienestar": "Well-being",
    "Sala ambulatoria": "Outpatient treatment room",
    "Pacientes con indicación médica": "Patients with a medical indication",
    "Pacientes con catéter": "Patients with a catheter",
    "Según evaluación médica": "As medically evaluated",
    "Según protocolo": "According to protocol",
    "Variable": "Variable",
    "Aplicación breve": "Brief administration",
    "45–60 min": "45–60 min",
    "20–40 min": "20–40 min",
    "30–45 min": "30–45 min",
    "30–60 min": "30–60 min",

    "Primera valoración, segunda opinión y controles especializados en hematología y oncología.": "Initial evaluation, second opinions, and specialized hematology and oncology follow-up.",
    "Una consulta organizada para comprender tus antecedentes, revisar estudios y definir los siguientes pasos con claridad.": "An organized consultation to understand your history, review tests, and clearly define the next steps.",
    "Revisión de historia clínica y síntomas": "Review of medical history and symptoms",
    "Evaluación de laboratorios e imágenes": "Review of laboratory and imaging studies",
    "Explicación de hallazgos y alternativas": "Explanation of findings and options",
    "Plan diagnóstico o terapéutico personalizado": "Personalized diagnostic or treatment plan",
    "Registro y antecedentes": "Registration and medical history",
    "Valoración especializada": "Specialist evaluation",
    "Explicación del caso": "Case explanation",
    "Plan y seguimiento": "Plan and follow-up",
    "Lleva resultados de laboratorios e imágenes recientes.": "Bring recent laboratory and imaging results.",
    "Prepara una lista de medicamentos y dosis.": "Prepare a list of medications and doses.",
    "Anota tus preguntas principales y antecedentes familiares.": "Write down your main questions and family history.",
    "¿Necesito referencia médica?": "Do I need a medical referral?",
    "Depende de tu aseguradora. Nuestro equipo administrativo puede orientarte antes de la cita.": "It depends on your insurance provider. Our administrative team can guide you before your appointment.",
    "¿Puedo solicitar una segunda opinión?": "Can I request a second opinion?",
    "Sí. Lleva los informes, estudios y tratamientos recibidos para realizar una revisión completa.": "Yes. Bring all reports, studies, and treatments received for a complete review.",
    "¿Cuándo recibiré el plan?": "When will I receive the plan?",
    "En muchos casos se define durante la consulta; si se requieren estudios adicionales, se completa en el control.": "In many cases it is defined during the consultation; if additional studies are needed, it is completed at follow-up.",

    "Administración de tratamientos oncológicos en un entorno controlado, cómodo y acompañado.": "Administration of oncology treatments in a controlled, comfortable, and supportive environment.",
    "Cada sesión sigue un protocolo individual y controles de seguridad antes, durante y después de la aplicación.": "Each session follows an individualized protocol and safety checks before, during, and after administration.",
    "Verificación del esquema y dosis": "Verification of treatment plan and dose",
    "Control previo de signos y laboratorios": "Pre-treatment vital signs and laboratory review",
    "Administración por personal entrenado": "Administration by trained staff",
    "Orientación sobre cuidados posteriores": "Guidance on aftercare",
    "Confirmación clínica": "Clinical confirmation",
    "Administración": "Administration",
    "Observación y alta": "Observation and discharge",
    "Sigue las indicaciones de alimentación e hidratación entregadas por tu médico.": "Follow the food and hydration instructions provided by your physician.",
    "Informa cualquier síntoma nuevo antes de la sesión.": "Report any new symptoms before the session.",
    "Utiliza ropa cómoda y organiza acompañamiento si fue indicado.": "Wear comfortable clothing and arrange for someone to accompany you if indicated.",
    "¿Cuánto dura una sesión?": "How long does a session last?",
    "La duración cambia según el medicamento y el protocolo indicado. El equipo te informará el tiempo estimado.": "Duration varies according to the medication and prescribed protocol. The team will tell you the estimated time.",
    "¿Puedo comer antes?": "Can I eat beforehand?",
    "En la mayoría de los casos sí, pero debes seguir las instrucciones específicas de tu tratamiento.": "In most cases, yes, but you must follow the specific instructions for your treatment.",
    "¿Qué debo reportar?": "What should I report?",
    "Fiebre, infección, vómitos persistentes o cualquier cambio importante debe comunicarse antes de asistir.": "Fever, infection, persistent vomiting, or any important change should be reported before attending.",

    "Administración especializada de medicamentos en el líquido cefalorraquídeo bajo indicación médica.": "Specialized administration of medication into the cerebrospinal fluid when medically indicated.",
    "Un procedimiento realizado con protocolo de seguridad, preparación previa y vigilancia posterior por personal especializado.": "A procedure performed with a safety protocol, prior preparation, and post-procedure monitoring by specialized staff.",
    "Confirmación de indicación y estudios": "Confirmation of indication and studies",
    "Preparación del área y técnica estéril": "Site preparation and sterile technique",
    "Administración del medicamento": "Medication administration",
    "Observación y recomendaciones de alta": "Observation and discharge instructions",
    "Evaluación previa": "Pre-procedure evaluation",
    "Preparación segura": "Safe preparation",
    "Procedimiento": "Procedure",
    "Recuperación breve": "Brief recovery",
    "Confirma con el equipo si debes suspender algún medicamento.": "Confirm with the team whether you should stop any medication.",
    "Presenta los laboratorios solicitados.": "Bring the requested laboratory results.",
    "Coordina acompañamiento para regresar a casa.": "Arrange for someone to accompany you home.",
    "¿Por qué se utiliza esta vía?": "Why is this route used?",
    "Permite que el medicamento alcance directamente el líquido que rodea el cerebro y la médula espinal.": "It allows the medication to directly reach the fluid surrounding the brain and spinal cord.",
    "¿Requiere observación?": "Does it require observation?",
    "Sí. Después del procedimiento se mantiene un periodo de vigilancia según la indicación clínica.": "Yes. A monitoring period is maintained after the procedure according to clinical indication.",
    "¿Qué molestias pueden aparecer?": "What discomfort may occur?",
    "El equipo explicará los síntomas esperables y las señales por las que debes comunicarte de inmediato.": "The team will explain expected symptoms and the warning signs that require immediate contact.",

    "Mantenimiento, curación y vigilancia del acceso venoso para reducir riesgos y conservar su funcionamiento.": "Maintenance, dressing changes, and monitoring of venous access to reduce risks and preserve its function.",
    "El cuidado periódico ayuda a prevenir infecciones, obstrucciones y complicaciones durante el tratamiento.": "Regular care helps prevent infections, blockages, and complications during treatment.",
    "Inspección del sitio de inserción": "Inspection of the insertion site",
    "Curación con técnica estéril": "Dressing change using sterile technique",
    "Lavado y verificación de permeabilidad": "Flushing and patency check",
    "Educación para el cuidado en casa": "Education for home care",
    "Inspección": "Inspection",
    "Limpieza": "Cleaning",
    "Mantenimiento": "Maintenance",
    "Recomendaciones": "Recommendations",
    "Mantén el apósito limpio y seco.": "Keep the dressing clean and dry.",
    "Informa dolor, enrojecimiento, secreción o fiebre.": "Report pain, redness, discharge, or fever.",
    "Lleva el registro de la última curación si fue realizada en otro centro.": "Bring a record of the last dressing change if it was performed at another center.",
    "¿Cada cuánto se realiza?": "How often is it performed?",
    "La frecuencia depende del tipo de catéter y del uso. Sigue el calendario indicado por tu equipo.": "Frequency depends on the type of catheter and its use. Follow the schedule provided by your team.",
    "¿Puedo bañarme?": "Can I bathe?",
    "Sí, protegiendo el área según las instrucciones para evitar que el apósito se moje.": "Yes, while protecting the area as instructed to prevent the dressing from getting wet.",
    "¿Cuándo debo llamar?": "When should I call?",
    "Si observas fiebre, dolor, inflamación, secreción o dificultad durante el uso del catéter.": "If you notice fever, pain, swelling, discharge, or difficulty while using the catheter.",

    "Medicamentos de soporte que estimulan la producción de células sanguíneas cuando existe indicación clínica.": "Supportive medications that stimulate blood cell production when clinically indicated.",
    "Se utilizan para apoyar la recuperación de ciertos componentes de la sangre y reducir riesgos durante algunos tratamientos.": "They are used to support recovery of certain blood components and reduce risks during some treatments.",
    "Revisión de laboratorios": "Laboratory review",
    "Confirmación de dosis y calendario": "Confirmation of dose and schedule",
    "Seguimiento de respuesta y síntomas": "Monitoring of response and symptoms",
    "Control de laboratorio": "Laboratory monitoring",
    "Validación": "Validation",
    "Aplicación": "Administration",
    "Seguimiento": "Follow-up",
    "Realiza los laboratorios solicitados en la fecha indicada.": "Complete the requested laboratory tests on the indicated date.",
    "Comunica síntomas nuevos o reacciones previas.": "Report new symptoms or previous reactions.",
    "No modifiques el calendario sin consultar al equipo.": "Do not change the schedule without consulting the team.",
    "¿Para qué sirven?": "What are they used for?",
    "Ayudan a estimular la producción de determinadas células sanguíneas, según la necesidad clínica.": "They help stimulate the production of specific blood cells according to clinical need.",
    "¿Se aplican siempre con quimioterapia?": "Are they always administered with chemotherapy?",
    "No. La indicación depende del tratamiento, los laboratorios y el riesgo individual.": "No. The indication depends on the treatment, laboratory results, and individual risk.",
    "¿Necesitan seguimiento?": "Do they require follow-up?",
    "Sí. Se controlan los valores sanguíneos y la respuesta para ajustar el plan cuando sea necesario.": "Yes. Blood values and response are monitored so the plan can be adjusted when needed.",

    "Obtención de una muestra de médula ósea para estudiar la producción y características de las células sanguíneas.": "Collection of a bone marrow sample to study the production and characteristics of blood cells.",
    "Este estudio aporta información clave para diagnosticar o dar seguimiento a diferentes enfermedades hematológicas.": "This test provides key information to diagnose or monitor different hematologic diseases.",
    "Revisión clínica y consentimiento": "Clinical review and consent",
    "Anestesia local": "Local anesthesia",
    "Obtención de la muestra": "Sample collection",
    "Cuidados del sitio y envío al laboratorio": "Site care and delivery to the laboratory",
    "Preparación": "Preparation",
    "Toma de muestra": "Sample collection",
    "Recuperación": "Recovery",
    "Informa si utilizas anticoagulantes o tienes alergias.": "Tell us if you use blood thinners or have allergies.",
    "Sigue las indicaciones sobre alimentación.": "Follow the instructions regarding food intake.",
    "Coordina acompañamiento si el equipo lo recomienda.": "Arrange for someone to accompany you if the team recommends it.",
    "¿Dónde se toma la muestra?": "Where is the sample taken?",
    "Con frecuencia se obtiene del hueso de la pelvis, aunque la decisión depende del caso.": "It is often taken from the pelvic bone, although the decision depends on the case.",
    "¿Duele?": "Does it hurt?",
    "Se utiliza anestesia local. Puede sentirse presión o una molestia breve durante la aspiración.": "Local anesthesia is used. You may feel pressure or brief discomfort during aspiration.",
    "¿Cuándo están los resultados?": "When will the results be ready?",
    "Depende de los análisis solicitados. El equipo te indicará el tiempo estimado y la cita de revisión.": "It depends on the analyses requested. The team will provide the estimated time and review appointment.",

    "Procedimiento para obtener una pequeña muestra de tejido óseo y estudiarla en el laboratorio.": "Procedure to obtain a small bone tissue sample for laboratory analysis.",
    "La muestra permite analizar la estructura del tejido y complementar la evaluación de determinadas condiciones.": "The sample makes it possible to analyze tissue structure and complement the evaluation of certain conditions.",
    "Evaluación previa y consentimiento": "Prior evaluation and consent",
    "Preparación estéril y anestesia local": "Sterile preparation and local anesthesia",
    "Obtención controlada de la muestra": "Controlled sample collection",
    "Cuidados posteriores y seguimiento": "Aftercare and follow-up",
    "Evaluación": "Evaluation",
    "Biopsia": "Biopsy",
    "Observación": "Observation",
    "Presenta los estudios solicitados.": "Bring the requested studies.",
    "Informa medicamentos, anticoagulantes y alergias.": "Report medications, blood thinners, and allergies.",
    "Sigue las indicaciones sobre ayuno y acompañamiento.": "Follow instructions about fasting and accompaniment.",
    "¿Es igual al aspirado de médula?": "Is it the same as a bone marrow aspiration?",
    "No exactamente. Pueden complementarse, pero cada uno obtiene un tipo de muestra diferente.": "Not exactly. They can complement each other, but each obtains a different type of sample.",
    "¿Requiere reposo?": "Does it require rest?",
    "Se indican cuidados del sitio y actividad limitada por un periodo breve, según el procedimiento.": "Site care and limited activity are recommended for a short period, depending on the procedure.",
    "¿Quién explica el resultado?": "Who explains the result?",
    "El especialista revisará el informe y lo integrará con tus otros estudios para orientar los siguientes pasos.": "The specialist will review the report and integrate it with your other studies to guide the next steps.",

    "Acompañamiento emocional para pacientes y familiares durante las distintas etapas del proceso oncológico.": "Emotional support for patients and families throughout the different stages of the cancer journey.",
    "Un espacio profesional para trabajar ansiedad, cambios emocionales, comunicación familiar y adaptación al tratamiento.": "A professional space to address anxiety, emotional changes, family communication, and adjustment to treatment.",
    "Evaluación de necesidades emocionales": "Assessment of emotional needs",
    "Herramientas para ansiedad y estrés": "Tools for anxiety and stress",
    "Apoyo en comunicación familiar": "Support for family communication",
    "Acompañamiento durante tratamiento y recuperación": "Support during treatment and recovery",
    "Primera conversación": "Initial conversation",
    "Objetivos": "Goals",
    "Herramientas": "Tools",
    "No necesitas preparación especial.": "No special preparation is required.",
    "Puedes asistir de manera individual o con un familiar, según se acuerde.": "You may attend individually or with a family member, as agreed.",
    "Anota las situaciones o preocupaciones que deseas abordar.": "Write down the situations or concerns you would like to address.",
    "¿Es solo para pacientes?": "Is it only for patients?",
    "No. Los familiares y cuidadores también pueden recibir orientación y apoyo.": "No. Family members and caregivers can also receive guidance and support.",
    "¿Cuándo conviene solicitarla?": "When is it helpful to request it?",
    "En cualquier momento: diagnóstico, tratamiento, recaída, recuperación o adaptación posterior.": "At any time: diagnosis, treatment, recurrence, recovery, or later adjustment.",
    "¿Cuántas sesiones se necesitan?": "How many sessions are needed?",
    "Se define según tus objetivos, necesidades y evolución; no existe un número único para todos.": "It is determined by your goals, needs, and progress; there is no single number for everyone."
  };

  const titles = {
    "HOPE Panamá | Hematología y Oncología Especializada": "HOPE Panama | Specialized Hematology and Oncology",
    "Equipo médico | HOPE Panamá": "Medical Team | HOPE Panama",
    "Servicios médicos | HOPE Panamá": "Medical Services | HOPE Panama",
    "Quiénes somos | HOPE Panamá": "About Us | HOPE Panama",
    "Contacto | HOPE Panamá": "Contact | HOPE Panama",
    "Perfil médico | HOPE Panamá": "Medical Profile | HOPE Panama",
    "Servicio médico | HOPE Panamá": "Medical Service | HOPE Panama"
  };

  const attributeTranslations = {
    "Abrir menú": "Open menu",
    "Navegación principal": "Main navigation",
    "Cambiar idioma": "Change language",
    "Tu nombre": "Your name",
    "nombre@correo.com": "name@email.com",
    "Cuéntanos brevemente qué necesitas": "Briefly tell us what you need",
    "Contactar a HOPE Panamá por WhatsApp": "Contact HOPE Panama on WhatsApp"
  };

  function preserveSpacing(original, translated) {
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  }

  function translateTextNodes(root, language) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const key = source.trim();
      node.nodeValue = language === "en" && en[key] ? preserveSpacing(source, en[key]) : source;
    });
  }

  function translateAttributes(root, language) {
    const elements = root.querySelectorAll("[placeholder], [aria-label], [title]");
    elements.forEach((element) => {
      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, {
          placeholder: element.getAttribute("placeholder"),
          ariaLabel: element.getAttribute("aria-label"),
          title: element.getAttribute("title")
        });
      }
      const originals = originalAttributes.get(element);
      [["placeholder", originals.placeholder], ["aria-label", originals.ariaLabel], ["title", originals.title]].forEach(([attribute, value]) => {
        if (value === null) return;
        let translated = language === "en" && attributeTranslations[value] ? attributeTranslations[value] : value;
        if (language === "en" && attribute === "aria-label" && value.startsWith("Instagram de ")) {
          translated = value.replace("Instagram de ", "Instagram of ");
        }
        if (language === "en" && attribute === "aria-label" && value.startsWith("Aseguradora asociada ")) {
          translated = value.replace("Aseguradora asociada ", "Insurance partner ");
        }
        element.setAttribute(attribute, translated);
      });
    });
  }

  function updateSwitch(language) {
    const switchElement = document.querySelector(".language-switch");
    if (!switchElement) return;
    switchElement.dataset.currentLanguage = language;
    switchElement.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
  }

  function applyLanguage(language, persist = true) {
    const selected = supportedLanguages.includes(language) ? language : "es";
    document.documentElement.lang = selected;
    document.body.dataset.language = selected;
    translateTextNodes(document.body, selected);
    translateAttributes(document.body, selected);
    document.title = selected === "en" ? (titles[originalTitle] || originalTitle.replace("Panamá", "Panama")) : originalTitle;
    updateSwitch(selected);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, selected); } catch (error) { /* El modo file:// puede restringir almacenamiento. */ }
    }
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  let savedLanguage = null;
  try { savedLanguage = localStorage.getItem(STORAGE_KEY); } catch (error) { /* Se mantiene el idioma del navegador. */ }
  applyLanguage(savedLanguage || "es", Boolean(savedLanguage));

  window.HOPE_LANGUAGE = { set: applyLanguage, get: () => document.documentElement.lang };
})();
