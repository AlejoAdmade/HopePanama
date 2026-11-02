/* HOPE Panamá V8 — navegación, contenido dinámico e interacciones */

const {
  config = {},
  doctors = [],
  services = [],
  conditions = [],
  insurers = []
} = window.HOPE_DATA || {};
const page = document.body.dataset.page || "inicio";
const SITE_URL = config.siteUrl || "https://alejoadmade.github.io/HopePanama/";
const WHATSAPP_NUMBER = config.whatsappNumber || "5073863086";

function doctorFile(id) {
  return `doctor-${id}.html`;
}

function serviceFile(id) {
  return `servicio-${id}.html`;
}

function conditionFile(id) {
  return `condicion-${id}.html`;
}

function currentLanguage() {
  return document.documentElement.lang === "en" ? "en" : "es";
}

function whatsappMessage(type = "general", label = "", language = currentLanguage()) {
  const messages = {
    es: {
      general: "Hola, deseo agendar una cita en HOPE Panamá. ¿Me pueden orientar sobre disponibilidad y requisitos?",
      doctor: `Hola, deseo agendar una cita con ${label} en HOPE Panamá. ¿Me pueden indicar disponibilidad y requisitos?`,
      service: `Hola, deseo consultar disponibilidad para ${label} en HOPE Panamá. ¿Me pueden orientar?`,
      condition: `Hola, deseo agendar una valoración relacionada con ${label} en HOPE Panamá. ¿Me pueden orientar?`
    },
    en: {
      general: "Hello, I would like to schedule an appointment at HOPE Panama. Could you guide me regarding availability and requirements?",
      doctor: `Hello, I would like to schedule an appointment with ${label} at HOPE Panama. Could you share availability and requirements?`,
      service: `Hello, I would like to ask about availability for ${label} at HOPE Panama. Could you guide me?`,
      condition: `Hello, I would like to schedule an evaluation related to ${label} at HOPE Panama. Could you guide me?`
    }
  };
  return messages[language]?.[type] || messages.es.general;
}

function whatsappUrl(type = "general", label = "", language = currentLanguage()) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage(type, label, language))}`;
}

function updateWhatsappLinks(language = currentLanguage()) {
  const translatedLabels = {
    "consulta de oncología": "an oncology consultation",
    "consulta de hematología": "a hematology consultation",
    "consulta de psicooncología": "a psycho-oncology consultation"
  };
  document.querySelectorAll("[data-whatsapp-context]").forEach((link) => {
    const originalLabel = link.dataset.whatsappLabel || "";
    const label = language === "en" ? (translatedLabels[originalLabel] || originalLabel) : originalLabel;
    link.href = whatsappUrl(link.dataset.whatsappContext, label, language);
  });
}

function cleanHeadingPunctuation(root = document) {
  root.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      node.nodeValue = node.nodeValue.replace(/\.(\s*)$/u, "$1");
    });
  });
}

function serviceLinks() {
  return services.map((service) => `<a href="${serviceFile(service.id)}"><span>${service.number}</span>${service.title}</a>`).join("");
}

function injectLayout() {
  const header = document.querySelector("#siteHeader");
  const footer = document.querySelector("#siteFooter");

  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#main-content">Saltar al contenido principal</a>
      <div class="topbar">
        <div class="shell topbar-inner">
          <a href="${config.googleMapsUrl}" target="_blank" rel="noopener noreferrer" data-track="map_open" data-track-label="topbar_google">Pacífica Salud · Piso 8 · Punta Pacífica</a>
          <div><a href="mailto:atclientes@hopepanama.com" data-track="email_click">atclientes@hopepanama.com</a><a class="phone-link" href="tel:+5073863086" data-track="phone_click" data-track-label="topbar">386-3086 / 386-3588 / 386-3488</a></div>
        </div>
      </div>
      <header class="site-header" id="siteNav">
        <div class="shell nav-shell">
          <a class="brand" href="index.html" aria-label="HOPE Panamá, inicio"><img src="images/logo.png" alt="HOPE Panamá"></a>
          <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mainNav"><span></span><span></span><span></span><b>Menú</b></button>
          <nav class="main-nav" id="mainNav" aria-label="Navegación principal">
            <a class="${page === "inicio" ? "active" : ""}" href="index.html">Inicio</a>
            <a class="${page === "nosotros" ? "active" : ""}" href="nosotros.html">Quiénes somos</a>
            <a class="${page === "equipo" ? "active" : ""}" href="equipo.html">Equipo médico</a>
            <div class="nav-services">
              <button class="${page === "servicios" || page === "especialidad" ? "active" : ""}" id="servicesToggle" aria-expanded="false" aria-controls="megaMenu">Servicios <span>⌄</span></button>
              <div class="mega-menu" id="megaMenu"><div class="mega-intro"><small>Atención integral</small><strong>Explora nuestros servicios especializados.</strong><a href="servicios.html">Ver todos</a><a class="mega-conditions-link" href="oncologia-panama.html">Oncología en Panamá</a><a class="mega-conditions-link" href="hematologia-panama.html">Hematología en Panamá</a><a class="mega-conditions-link" href="psicooncologia-panama.html">Psicooncología en Panamá</a><a class="mega-conditions-link" href="condiciones.html">Condiciones que tratamos</a></div><div class="mega-links">${serviceLinks()}</div></div>
            </div>
            <a class="${page === "condiciones" ? "active" : ""}" href="condiciones.html">Condiciones</a>
            <a href="index.html#aseguradoras">Aseguradoras</a>
            <div class="language-switch" role="group" aria-label="Cambiar idioma">
              <button type="button" data-language="es" aria-pressed="true">ES</button>
              <button type="button" data-language="en" aria-pressed="false">EN</button>
            </div>
            <a class="nav-contact ${page === "contacto" ? "active" : ""}" href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer" data-whatsapp-context="general" data-track="appointment_click" data-track-label="navigation">Agendar cita</a>
          </nav>
        </div>
      </header>`;
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="footer">
        <div class="shell footer-top">
          <div class="footer-main"><img src="images/logo.png" alt="HOPE Panamá"><p>Centro de Hematología Oncología de Panamá Especializada.</p><a href="https://www.instagram.com/hope_puntapacifica/" target="_blank" rel="noopener">@hope_puntapacifica</a></div>
          <div><small>Navegación</small><a href="nosotros.html">Quiénes somos</a><a href="equipo.html">Equipo médico</a><a href="oncologia-panama.html">Oncología en Panamá</a><a href="hematologia-panama.html">Hematología en Panamá</a><a href="psicooncologia-panama.html">Psicooncología en Panamá</a><a href="servicios.html">Servicios</a><a href="condiciones.html">Condiciones que tratamos</a><a href="contacto.html">Contacto</a></div>
          <div><small>Servicios</small><a href="${serviceFile("consulta-externa")}">Consulta externa</a><a href="${serviceFile("quimioterapia-ambulatoria")}">Quimioterapia ambulatoria</a><a href="${serviceFile("aspirado-medula")}">Aspirado de médula</a><a href="${serviceFile("psicooncologia")}">Psicooncología</a></div>
          <div><small>Contacto</small><p>Pacífica Salud, Piso 8<br>Punta Pacífica, Panamá</p><a class="phone-link" href="tel:+5073863086" data-track="phone_click" data-track-label="footer">386-3086 / 386-3588</a><a href="mailto:atclientes@hopepanama.com" data-track="email_click">atclientes@hopepanama.com</a><a href="privacidad.html">Política de privacidad</a></div>
        </div>
        <div class="shell footer-bottom"><span>© 2026 HOPE Panamá. Todos los derechos reservados.</span><span>Atención especializada con ciencia y humanidad.</span><a class="developer-credit" href="${config.developerUrl}" target="_blank" rel="noopener noreferrer" aria-label="Diseño y desarrollo por ${config.developerName}">Diseño y desarrollo por ${config.developerName}</a></div>
      </footer>
      <a class="whatsapp-button" href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer" aria-label="Contactar a HOPE Panamá por WhatsApp" data-whatsapp-context="general" data-track="whatsapp_click" data-track-label="floating"><span class="whatsapp-icon"><img src="images/whatsapp.png" alt="" aria-hidden="true" width="25" height="25"></span><b>Escríbenos</b></a>
      <aside class="privacy-banner" id="privacyBanner" role="dialog" aria-modal="false" aria-labelledby="privacyTitle" hidden>
        <div><strong id="privacyTitle">Tu privacidad importa</strong><p>Usamos almacenamiento esencial para recordar el idioma. La medición anónima solo se activa si la aceptas.</p><a href="privacidad.html">Conocer más</a></div>
        <div class="privacy-actions"><button type="button" class="privacy-essential" data-consent="denied">Solo necesarias</button><button type="button" class="privacy-accept" data-consent="granted">Aceptar analítica</button></div>
      </aside>`;
  }

  const main = document.querySelector("main");
  if (main && !main.id) main.id = "main-content";
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
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("menu-open", open);
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
    menuToggle?.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  }));

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    megaMenu?.classList.remove("open");
    servicesToggle?.setAttribute("aria-expanded", "false");
    mainNav?.classList.remove("open");
    menuToggle?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  });

  const updateHeader = () => siteNav?.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function doctorCard(doctor, index) {
  return `
    <article class="doctor-card" data-category="${doctor.specialty}" data-reveal>
      <a class="doctor-profile-link" href="${doctorFile(doctor.id)}">
        <div class="doctor-photo"><img src="${doctor.image.replace(".png", ".webp")}" alt="${doctor.name}" style="object-position:${doctor.position}" loading="lazy" decoding="async"><span>${String(index + 1).padStart(2, "0")}</span><b>Ver perfil</b></div>
        <div class="doctor-info"><small>Perfil del especialista</small><h3>${doctor.name}</h3><p>${doctor.specialty}</p></div>
      </a>
      <div class="doctor-social-row">
        <a href="${doctorFile(doctor.id)}">Conocer perfil</a>
        <a class="instagram-link" href="${doctor.instagram}" target="_blank" rel="noopener" aria-label="Instagram de ${doctor.name}">Instagram</a>
      </div>
    </article>`;
}

function serviceCard(service) {
  return `
    <a class="service-card" href="${serviceFile(service.id)}" data-category="${service.category}" data-reveal>
      <div class="service-card-top"><span>${service.number}</span><img src="${service.icon.replace(".png", ".webp")}" alt="" loading="lazy" decoding="async"></div>
      <div><small>${service.category}</small><h3>${service.title}</h3><p>${service.short}</p></div>
    </a>`;
}

function conditionCard(condition) {
  const content = condition[currentLanguage()] || condition.es;
  return `
    <a class="condition-card" href="${conditionFile(condition.id)}" data-reveal>
      <span>${condition.number}</span>
      <small>${condition.category}</small>
      <h3>${content.title}</h3>
      <p>${content.summary}</p>
      <b aria-hidden="true">Conocer más</b>
    </a>`;
}

function renderGrids() {
  document.querySelectorAll("[data-doctor-grid]").forEach((grid) => {
    const limit = Number(grid.dataset.limit || doctors.length);
    const specialtyGroup = grid.dataset.specialtyGroup;
    let selectedDoctors = doctors;
    if (specialtyGroup === "oncology") {
      selectedDoctors = doctors.filter((doctor) => /^oncólog[oa]$/i.test(doctor.specialty));
    } else if (specialtyGroup === "hematology") {
      selectedDoctors = doctors.filter((doctor) => /^hematólog[oa]$/i.test(doctor.specialty));
    } else if (specialtyGroup === "psychooncology") {
      selectedDoctors = doctors.filter((doctor) => /psicooncolog/i.test(doctor.specialty));
    }
    grid.innerHTML = selectedDoctors.slice(0, limit).map(doctorCard).join("");
  });

  document.querySelectorAll("[data-service-grid]").forEach((grid) => {
    const limit = Number(grid.dataset.limit || services.length);
    grid.innerHTML = services.slice(0, limit).map(serviceCard).join("");
  });

  document.querySelectorAll("[data-condition-grid]").forEach((grid) => {
    const limit = Number(grid.dataset.limit || conditions.length);
    grid.innerHTML = conditions.slice(0, limit).map(conditionCard).join("");
  });

  document.querySelectorAll("[data-insurance-grid]").forEach((grid) => {
    grid.innerHTML = insurers.map((insurer) => `
      <a class="insurance-card" href="${insurer.url}" target="_blank" rel="noopener noreferrer" data-reveal data-track="insurer_click" data-track-label="${insurer.name}" aria-label="Visitar sitio oficial de ${insurer.name}; se abre en una nueva pestaña">
        <img src="${insurer.image}" alt="${insurer.name}" loading="lazy" decoding="async">
        <span>Sitio oficial</span>
      </a>`).join("");
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

function setMetaContent(selector, value, attribute = "content") {
  const element = document.querySelector(selector);
  if (element && value) element.setAttribute(attribute, value);
}

function updatePageSeo({ title, description, url, image, type = "website", schema }) {
  document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', url);
  setMetaContent('meta[property="og:image"]', image || `${SITE_URL}images/og-image.png`);
  setMetaContent('meta[property="og:type"]', type);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', image || `${SITE_URL}images/og-image.png`);
  setMetaContent('link[rel="canonical"]', url, "href");

  if (schema) {
    let structuredData = document.querySelector("#dynamicStructuredData");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "dynamicStructuredData";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  }
}

function renderDoctorDetail() {
  const target = document.querySelector("#doctorDetail");
  if (!target) return;
  const id = document.body.dataset.doctorId || new URLSearchParams(window.location.search).get("id");
  const doctor = doctors.find((item) => item.id === id) || doctors[0];
  const others = doctors.filter((item) => item.id !== doctor.id).slice(0, 3);
  const canonical = `${SITE_URL}${doctorFile(doctor.id)}`;
  const professionalSchema = doctor.id === "lidia-luna"
    ? {
      "@context": "https://schema.org",
      "@type": "Person",
      name: doctor.name,
      image: `${SITE_URL}${doctor.image}`,
      description: doctor.intro,
      jobTitle: doctor.specialty,
      url: canonical,
      worksFor: { "@type": "MedicalClinic", name: "HOPE Panamá", url: SITE_URL },
      sameAs: doctor.instagram && doctor.instagram !== "https://www.instagram.com/" ? [doctor.instagram] : []
    }
    : {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: doctor.name,
      image: `${SITE_URL}${doctor.image}`,
      description: doctor.intro,
      medicalSpecialty: doctor.specialty,
      url: canonical,
      worksFor: { "@type": "MedicalClinic", name: "HOPE Panamá", url: SITE_URL },
      sameAs: doctor.instagram && doctor.instagram !== "https://www.instagram.com/" ? [doctor.instagram] : []
    };
  updatePageSeo({
    title: `${doctor.name} | HOPE Panamá`,
    description: `Conoce el perfil de ${doctor.name}, ${doctor.specialty.toLowerCase()}, y solicita una cita en HOPE Panamá.`,
    url: canonical,
    image: `${SITE_URL}${doctor.image}`,
    type: "profile",
    schema: professionalSchema
  });
  target.innerHTML = `
    <section class="profile-hero">
      <div class="profile-orbit"></div>
      <div class="shell profile-grid">
        <div class="profile-copy" data-reveal><a class="breadcrumb" href="equipo.html">← Equipo médico</a><span class="demo-badge">Perfil demostrativo</span><p class="kicker light"><span></span> ${doctor.specialty}</p><h1>${doctor.name}</h1><p>${doctor.intro}</p><div class="profile-actions"><a class="button button-gold" href="${whatsappUrl("doctor", doctor.name)}" target="_blank" rel="noopener noreferrer" data-whatsapp-context="doctor" data-whatsapp-label="${doctor.name}" data-track="appointment_click" data-track-label="doctor_${doctor.id}">Agendar una cita</a><a class="button button-dark-ghost phone-link" href="tel:+5073863086" data-track="phone_click" data-track-label="doctor_${doctor.id}">Llamar al centro</a><a class="button button-instagram" href="${doctor.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a></div></div>
        <div class="profile-photo-wrap" data-reveal><div class="profile-photo"><img src="${doctor.image.replace(".png", ".webp")}" alt="${doctor.name}" style="object-position:${doctor.position}" decoding="async"></div><div class="profile-fact"><small>Experiencia</small><strong>${doctor.experience}</strong><span>Información demostrativa</span></div></div>
      </div>
    </section>
    <section class="profile-content section-space"><div class="shell profile-content-grid">
      <article data-reveal><p class="kicker"><span></span> Sobre el especialista</p><h2>Atención rigurosa, explicada con claridad.</h2><p>${doctor.bio}</p>${doctor.id === "lidia-luna" ? '<a class="text-link" href="psicooncologia-panama.html">Conocer la atención psicooncológica</a>' : ""}<blockquote>“<span>${doctor.quote}</span>”</blockquote></article>
      <aside class="expertise-card" data-reveal><small>Áreas de atención</small><h3>Enfoque clínico</h3><ul>${doctor.areas.map((area) => `<li><span>✓</span>${area}</li>`).join("")}</ul><div class="language"><span>Idiomas</span><strong>${doctor.languages}</strong></div></aside>
    </div></section>
    <section class="credentials section-space soft-section"><div class="shell credentials-grid"><div data-reveal><p class="kicker"><span></span> Trayectoria</p><h2>Formación y actualización profesional.</h2><p class="demo-note">Los siguientes datos son de demostración y deben reemplazarse por credenciales verificadas.</p></div><ol data-reveal>${doctor.education.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></li>`).join("")}</ol></div></section>
    <section class="related-section section-space"><div class="shell"><div class="split-heading compact" data-reveal><div><p class="kicker"><span></span> Más especialistas</p><h2>Conoce al resto del equipo.</h2></div><a class="text-link" href="equipo.html">Ver equipo completo</a></div><div class="doctor-grid related-grid">${others.map((item) => doctorCard(item, doctors.indexOf(item))).join("")}</div></div></section>`;
}

function renderServiceDetail() {
  const target = document.querySelector("#serviceDetail");
  if (!target) return;
  const id = document.body.dataset.serviceId || new URLSearchParams(window.location.search).get("id");
  const service = services.find((item) => item.id === id) || services[0];
  const related = services.filter((item) => item.id !== service.id).slice(0, 3);
  const canonical = `${SITE_URL}${serviceFile(service.id)}`;
  updatePageSeo({
    title: `${service.title} | HOPE Panamá`,
    description: service.short,
    url: canonical,
    image: `${SITE_URL}images/og-image.png`,
    schema: {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.short,
      url: canonical,
      provider: { "@type": "MedicalClinic", name: "HOPE Panamá", url: SITE_URL }
    }
  });
  target.innerHTML = `
    <section class="service-detail-hero"><div class="service-number-bg">${service.number}</div><div class="shell service-detail-grid">
      <div data-reveal><a class="breadcrumb" href="servicios.html">← Todos los servicios</a><p class="kicker light"><span></span> ${service.category}</p><h1>${service.title}</h1><p>${service.intro}</p><a class="button button-gold" href="${whatsappUrl("service", service.title)}" target="_blank" rel="noopener noreferrer" data-whatsapp-context="service" data-whatsapp-label="${service.title}" data-track="appointment_click" data-track-label="service_${service.id}">Agendar una cita</a></div>
      <div class="service-symbol" data-reveal><img src="${service.icon.replace(".png", ".webp")}" alt=""><span>${service.number}</span><small>HOPE Panamá</small></div>
    </div></section>
    <section class="quick-facts"><div class="shell"><div><small>Duración estimada</small><strong>${service.duration}</strong></div><div><small>Modalidad</small><strong>${service.setting}</strong></div><div><small>Dirigido a</small><strong>${service.forWho}</strong></div><a href="${whatsappUrl("service", service.title)}" target="_blank" rel="noopener noreferrer" data-whatsapp-context="service" data-whatsapp-label="${service.title}" data-track="appointment_click" data-track-label="availability_${service.id}">Consultar disponibilidad</a></div></section>
    <section class="service-overview section-space"><div class="shell overview-grid"><div data-reveal><p class="kicker"><span></span> Sobre el servicio</p><h2>Qué incluye tu atención.</h2><p>${service.short}</p></div><ul class="include-list" data-reveal>${service.includes.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></li>`).join("")}</ul></div></section>
    <section class="what-to-expect section-space dark-section"><div class="shell"><div class="split-heading" data-reveal><div><p class="kicker light"><span></span> Qué esperar</p><h2>Un proceso organizado de principio a fin.</h2></div><p>Cada caso puede requerir ajustes. El equipo confirmará las indicaciones específicas antes de tu atención.</p></div><div class="steps-grid" data-reveal>${service.steps.map((step, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><div></div><h3>${step}</h3></article>`).join("")}</div></div></section>
    <section class="preparation section-space"><div class="shell prep-grid"><div data-reveal><p class="kicker"><span></span> Preparación</p><h2>Antes de tu cita.</h2><p>Sigue siempre las instrucciones entregadas por tu especialista, ya que pueden variar según tu condición y tratamiento.</p></div><div class="prep-list" data-reveal>${service.preparation.map((item) => `<div><span>✓</span><p>${item}</p></div>`).join("")}</div></div></section>
    <section class="faq-section section-space soft-section"><div class="shell faq-layout"><div data-reveal><p class="kicker"><span></span> Preguntas frecuentes</p><h2>Resolvemos dudas comunes.</h2></div><div class="faq-stack" data-reveal>${service.faq.map(([question, answer]) => `<details><summary>${question}<span>+</span></summary><p>${answer}</p></details>`).join("")}</div></div></section>
    <section class="related-section section-space"><div class="shell"><div class="split-heading compact" data-reveal><div><p class="kicker"><span></span> También puede interesarte</p><h2>Otros servicios de HOPE.</h2></div><a class="text-link" href="servicios.html">Ver todos</a></div><div class="service-grid related-grid">${related.map(serviceCard).join("")}</div></div></section>`;
}

function renderConditionDetail(language = currentLanguage()) {
  const target = document.querySelector("#conditionDetail");
  if (!target) return;
  const id = document.body.dataset.conditionId || new URLSearchParams(window.location.search).get("id");
  const condition = conditions.find((item) => item.id === id) || conditions[0];
  const content = condition[language] || condition.es;
  const canonical = `${SITE_URL}${conditionFile(condition.id)}`;
  const related = conditions.filter((item) => item.id !== condition.id).slice(0, 3);

  updatePageSeo({
    title: `${content.title} | HOPE Panamá`,
    description: content.meta,
    url: canonical,
    image: `${SITE_URL}images/og-image.png`,
    schema: {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: content.title,
      description: content.summary,
      url: canonical,
      lastReviewed: "2026-10-31",
      audience: { "@type": "MedicalAudience", audienceType: "Patient" },
      about: { "@type": "MedicalCondition", name: content.title, description: content.summary }
    }
  });

  const labels = language === "en" ? {
    back: "← Conditions we treat",
    kicker: "Educational information",
    appointment: "Schedule an appointment",
    overview: "About this condition",
    overviewTitle: "Understanding the condition is the first step.",
    signs: "Possible signs",
    signsTitle: "Changes that deserve medical evaluation.",
    evaluation: "Evaluation",
    evaluationTitle: "How the diagnostic process may begin.",
    care: "Care at HOPE",
    careTitle: "Specialized, coordinated support.",
    source: "Official information source",
    disclaimer: "This content is educational and does not replace a medical consultation. Symptoms may have many causes; only a qualified professional can diagnose a condition.",
    related: "Related conditions",
    relatedTitle: "Continue exploring reliable information."
  } : {
    back: "← Condiciones que tratamos",
    kicker: "Información educativa",
    appointment: "Agendar una cita",
    overview: "Sobre esta condición",
    overviewTitle: "Comprender la condición es el primer paso.",
    signs: "Posibles señales",
    signsTitle: "Cambios que merecen evaluación médica.",
    evaluation: "Evaluación",
    evaluationTitle: "Cómo puede comenzar el proceso diagnóstico.",
    care: "Atención en HOPE",
    careTitle: "Acompañamiento especializado y coordinado.",
    source: "Fuente oficial de información",
    disclaimer: "Este contenido es educativo y no reemplaza una consulta médica. Los síntomas pueden tener muchas causas; solo un profesional idóneo puede realizar un diagnóstico.",
    related: "Condiciones relacionadas",
    relatedTitle: "Continúa explorando información confiable."
  };

  target.innerHTML = `
    <section class="condition-hero">
      <div class="condition-orbit"></div>
      <div class="shell condition-hero-grid">
        <div data-reveal><a class="breadcrumb" href="condiciones.html">${labels.back}</a><p class="kicker light"><span></span> ${condition.category}</p><h1>${content.title}</h1><p>${content.summary}</p><a class="button button-gold" href="${whatsappUrl("condition", content.title, language)}" target="_blank" rel="noopener noreferrer" data-whatsapp-context="condition" data-whatsapp-label="${content.title}" data-track="appointment_click" data-track-label="condition_${condition.id}">${labels.appointment}</a></div>
        <div class="condition-number" aria-hidden="true"><span>${condition.number}</span><small>HOPE Panamá</small></div>
      </div>
    </section>
    <section class="condition-overview section-space"><div class="shell overview-grid"><div data-reveal><p class="kicker"><span></span> ${labels.overview}</p><h2>${labels.overviewTitle}</h2></div><div data-reveal><p class="condition-lead">${content.overview}</p><div class="medical-disclaimer">${labels.disclaimer}</div></div></div></section>
    <section class="condition-info section-space soft-section"><div class="shell condition-columns">
      <article data-reveal><p class="kicker"><span></span> ${labels.signs}</p><h2>${labels.signsTitle}</h2><ul>${content.signs.map((item) => `<li><span>✓</span>${item}</li>`).join("")}</ul></article>
      <article data-reveal><p class="kicker"><span></span> ${labels.evaluation}</p><h2>${labels.evaluationTitle}</h2><ol>${content.evaluation.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${item}</li>`).join("")}</ol></article>
      <article class="condition-care" data-reveal><p class="kicker light"><span></span> ${labels.care}</p><h2>${labels.careTitle}</h2><ul>${content.care.map((item) => `<li><span>✓</span>${item}</li>`).join("")}</ul><a href="${condition.sourceUrl}" target="_blank" rel="noopener noreferrer">${labels.source}: ${condition.sourceName}</a></article>
    </div></section>
    <section class="related-section section-space"><div class="shell"><div class="split-heading compact" data-reveal><div><p class="kicker"><span></span> ${labels.related}</p><h2>${labels.relatedTitle}</h2></div><a class="text-link" href="condiciones.html">${labels.back.replace("← ", "")}</a></div><div class="condition-grid related-grid">${related.map(conditionCard).join("")}</div></div></section>`;

  if (document.body.dataset.language) {
    target.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("revealed"));
  }
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const language = currentLanguage();
    const message = language === "en"
      ? `Hello, I would like to schedule an appointment at HOPE Panama.\n\nName: ${values.get("name")}\nPhone: ${values.get("phone")}\nEmail: ${values.get("email") || "Not provided"}\nReason: ${values.get("reason")}\n\nMessage:\n${values.get("message") || "No additional message"}`
      : `Hola, deseo agendar una cita en HOPE Panamá.\n\nNombre: ${values.get("name")}\nTeléfono: ${values.get("phone")}\nCorreo: ${values.get("email") || "No proporcionado"}\nMotivo: ${values.get("reason")}\n\nMensaje:\n${values.get("message") || "Sin mensaje adicional"}`;
    status.textContent = language === "en" ? "Opening WhatsApp…" : "Abriendo WhatsApp…";
    trackEvent("appointment_form_submit", { reason: String(values.get("reason") || "") });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

function setupMapSwitcher() {
  const buttons = Array.from(document.querySelectorAll("[data-map-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-map-panel]"));
  if (!buttons.length) return;

  buttons.forEach((button) => button.addEventListener("click", () => {
    const selected = button.dataset.mapTab;
    buttons.forEach((item) => {
      const active = item.dataset.mapTab === selected;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.dataset.mapPanel === selected;
      panel.hidden = !active;
      if (active) {
        const iframe = panel.querySelector("iframe[data-src]");
        if (iframe && !iframe.getAttribute("src")) {
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute("data-src");
        }
      }
    });
    trackEvent("map_tab_select", { provider: selected });
  }));
}

const CONSENT_KEY = "hope-analytics-consent";

function trackEvent(name, parameters = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, parameters);
  }
}

function loadAnalytics() {
  const measurementId = String(config.ga4Id || "").trim();
  if (!measurementId || !measurementId.startsWith("G-") || document.querySelector("[data-hope-analytics]")) return;

  const script = document.createElement("script");
  script.async = true;
  script.dataset.hopeAnalytics = "true";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
}

function setupPrivacyAndAnalytics() {
  const banner = document.querySelector("#privacyBanner");
  let consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (error) { /* El modo file:// puede restringir almacenamiento. */ }

  if (!consent && banner) banner.hidden = false;
  if (consent === "granted") loadAnalytics();

  banner?.querySelectorAll("[data-consent]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.consent;
      try { localStorage.setItem(CONSENT_KEY, choice); } catch (error) { /* Se conserva la sesión actual. */ }
      banner.hidden = true;
      if (choice === "granted") loadAnalytics();
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track]");
    if (!target) return;
    trackEvent(target.dataset.track, {
      label: target.dataset.trackLabel || target.textContent.trim().slice(0, 80),
      destination: target.getAttribute("href") || ""
    });
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
  }), { threshold: 0.08, rootMargin: "0px 0px 120px" });
  items.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight + 100) item.classList.add("revealed");
    else observer.observe(item);
  });
  window.setTimeout(() => items.forEach((item) => item.classList.add("revealed")), 1500);
}

injectLayout();
setupNavigation();
renderGrids();
renderDoctorDetail();
renderServiceDetail();
renderConditionDetail();
setupFilters();
setupContactForm();
setupMapSwitcher();
setupPrivacyAndAnalytics();
updateWhatsappLinks();
setupReveal();

document.addEventListener("hope:languagechange", (event) => {
  const language = event.detail?.language || currentLanguage();
  document.querySelectorAll("[data-condition-grid]").forEach((grid) => {
    const limit = Number(grid.dataset.limit || conditions.length);
    grid.innerHTML = conditions.slice(0, limit).map(conditionCard).join("");
    grid.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("revealed"));
  });
  renderConditionDetail(language);
});

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
    "Condiciones": "Conditions",
    "Condiciones que tratamos": "Conditions we treat",
    "Contacto": "Contact",
    "Agendar cita": "Schedule",
    "Agendar una cita": "Schedule an appointment",
    "Llamar al centro": "Call the center",
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
    "Política de privacidad": "Privacy policy",
    "Diseño y desarrollo por Alejandro Admadé": "Design and development by Alejandro Admadé",
    "Tu privacidad importa": "Your privacy matters",
    "Usamos almacenamiento esencial para recordar el idioma. La medición anónima solo se activa si la aceptas.": "We use essential storage to remember your language. Anonymous analytics are activated only if you accept.",
    "Conocer más": "Learn more",
    "Solo necesarias": "Necessary only",
    "Aceptar analítica": "Accept analytics",
    "Saltar al contenido principal": "Skip to main content",
    "Sitio oficial": "Official website",
    "Hematología": "Hematology",
    "Oncología": "Oncology",
    "Hemato-oncología": "Hematology-oncology",

    /* SEO local y páginas de especialidad */
    "Centro médico especializado · Panamá": "Specialized medical center · Panama",
    "Centro de oncología y hematología en Panamá": "Oncology and hematology center in Panama",
    "Ciencia que cuida": "Science that cares",
    "Humanidad que acompaña": "Humanity that stands by you",
    "Especialidades principales": "Main specialties",
    "Atención oncológica y hematológica en Panamá": "Oncology and hematology care in Panama",
    "Conoce cómo nuestro equipo evalúa, trata y acompaña distintas condiciones de la sangre y enfermedades oncológicas.": "Learn how our team evaluates, treats, and supports people with blood disorders and oncologic diseases.",
    "Especialidad médica": "Medical specialty",
    "Oncología en Panamá": "Oncology in Panama",
    "Hematología en Panamá": "Hematology in Panama",
    "Evaluación, segunda opinión, planificación de tratamientos y seguimiento oncológico coordinado.": "Evaluation, second opinions, treatment planning, and coordinated oncology follow-up.",
    "Valoración especializada de anemias, alteraciones sanguíneas y enfermedades de la médula ósea.": "Specialized evaluation of anemia, blood abnormalities, and bone marrow disorders.",
    "Conocer la atención oncológica": "Explore oncology care",
    "Conocer la atención hematológica": "Explore hematology care",
    "Oncología médica · Panamá": "Medical oncology · Panama",
    "Hematología · Panamá": "Hematology · Panama",
    "Evaluación especializada, segunda opinión, planificación de tratamientos y seguimiento coordinado durante cada etapa de la atención oncológica.": "Specialized evaluation, second opinions, treatment planning, and coordinated follow-up throughout every stage of oncology care.",
    "Evaluación especializada de anemias, alteraciones sanguíneas, coagulación, médula ósea y enfermedades hematológicas.": "Specialized evaluation of anemia, blood abnormalities, coagulation, bone marrow, and hematologic diseases.",
    "Agendar una consulta de oncología": "Schedule an oncology consultation",
    "Agendar una consulta de hematología": "Schedule a hematology consultation",
    "Atención especializada": "Specialized care",
    "Una ruta oncológica clara y personalizada": "A clear and personalized oncology care path",
    "Comprender los resultados para definir el siguiente paso": "Understanding the results to define the next step",
    "En HOPE Panamá, la atención oncológica comienza con una revisión organizada de antecedentes, estudios y necesidades individuales. El objetivo es explicar el caso con claridad y definir los siguientes pasos junto al paciente.": "At HOPE Panama, oncology care begins with an organized review of medical history, tests, and individual needs. The goal is to explain the case clearly and define the next steps together with the patient.",
    "La ruta puede incluir estudios adicionales, tratamiento ambulatorio, coordinación con otras especialidades y controles posteriores, según la indicación médica.": "The care path may include additional tests, outpatient treatment, coordination with other specialties, and follow-up appointments, as medically indicated.",
    "La consulta de hematología integra la historia clínica, los síntomas y la interpretación de laboratorios para estudiar alteraciones de la sangre y de la médula ósea.": "A hematology consultation combines medical history, symptoms, and laboratory interpretation to evaluate blood and bone marrow abnormalities.",
    "Según el caso, el especialista puede solicitar estudios adicionales, procedimientos diagnósticos o seguimiento periódico para comprender la causa y orientar el tratamiento.": "Depending on the case, the specialist may request additional tests, diagnostic procedures, or periodic follow-up to understand the cause and guide treatment.",
    "Información para pacientes:": "Information for patients:",
    "este contenido es educativo y no reemplaza una valoración, diagnóstico o indicación médica individual.": "this content is educational and does not replace an individual medical evaluation, diagnosis, or recommendation.",
    "Cómo podemos ayudarte": "How we can help",
    "Atención coordinada en cada etapa": "Coordinated care at every stage",
    "Evaluación hematológica organizada y comprensible": "Organized and understandable hematology evaluation",
    "El plan se adapta al diagnóstico, los estudios disponibles y las necesidades de cada persona.": "The plan is adapted to the diagnosis, available tests, and each person's needs.",
    "La atención se adapta a los hallazgos, antecedentes y necesidades de cada paciente.": "Care is adapted to each patient's findings, history, and needs.",
    "Evaluación y segunda opinión": "Evaluation and second opinion",
    "Revisión de historia clínica, imágenes, laboratorios, biopsias y tratamientos previos.": "Review of medical history, imaging, laboratory tests, biopsies, and prior treatments.",
    "Planificación del tratamiento": "Treatment planning",
    "Explicación de alternativas y coordinación de terapias sistémicas cuando existe indicación.": "Explanation of alternatives and coordination of systemic therapies when indicated.",
    "Seguimiento y soporte": "Follow-up and support",
    "Controles médicos, manejo de síntomas y acompañamiento durante y después del tratamiento.": "Medical follow-up, symptom management, and support during and after treatment.",
    "Revisión de laboratorios": "Laboratory review",
    "Interpretación de hemogramas, estudios de coagulación y otros resultados relevantes.": "Interpretation of blood counts, coagulation studies, and other relevant results.",
    "Estudios especializados": "Specialized testing",
    "Coordinación de procedimientos como aspirado o biopsia de médula cuando existe indicación.": "Coordination of procedures such as bone marrow aspiration or biopsy when indicated.",
    "Tratamiento y seguimiento": "Treatment and follow-up",
    "Definición de una ruta clínica y controles para evaluar la respuesta y la evolución.": "Definition of a clinical care path and follow-up to assess response and progress.",
    "Servicios relacionados": "Related services",
    "Atención oncológica disponible en HOPE": "Oncology care available at HOPE",
    "Atención hematológica disponible en HOPE": "Hematology care available at HOPE",
    "Explora los servicios que pueden formar parte de una ruta de atención, siempre según evaluación médica.": "Explore services that may be part of a care path, always according to medical evaluation.",
    "Explora procedimientos y servicios que pueden formar parte de la evaluación, según indicación médica.": "Explore procedures and services that may be part of the evaluation, as medically indicated.",
    "Primera valoración, segunda opinión y controles especializados.": "Initial evaluation, second opinions, and specialized follow-up.",
    "Administración de tratamientos en un entorno controlado y acompañado.": "Treatment administration in a controlled and supportive environment.",
    "Apoyo emocional especializado para pacientes y familiares.": "Specialized emotional support for patients and families.",
    "Obtención de una muestra para estudiar la producción de células sanguíneas.": "Collection of a sample to evaluate blood cell production.",
    "Procedimiento diagnóstico realizado bajo indicación y protocolo médico.": "Diagnostic procedure performed according to medical indication and protocol.",
    "Aspirado de médula ósea": "Bone marrow aspiration",
    "Biopsia de hueso": "Bone biopsy",
    "Oncólogos en Panamá": "Oncologists in Panama",
    "Hematólogos en Panamá": "Hematologists in Panama",
    "Conoce a los especialistas que acompañan la evaluación, el tratamiento y el seguimiento.": "Meet the specialists who support evaluation, treatment, and follow-up.",
    "Conoce a los especialistas que acompañan la evaluación, los procedimientos y el seguimiento.": "Meet the specialists who support evaluation, procedures, and follow-up.",
    "Condiciones oncológicas": "Oncologic conditions",
    "Condiciones hematológicas": "Hematologic conditions",
    "Información general para comprender conceptos y preparar una conversación con el especialista.": "General information to understand key concepts and prepare for a conversation with the specialist.",
    "Ver todas las condiciones": "View all conditions",
    "Antes de una consulta de oncología": "Before an oncology consultation",
    "Antes de una consulta de hematología": "Before a hematology consultation",
    "Si tienes un diagnóstico, estudios o inquietudes, nuestro equipo puede orientarte sobre la documentación necesaria.": "If you have a diagnosis, tests, or concerns, our team can guide you regarding the documentation needed.",
    "Lleva resultados recientes, informes anteriores y una lista de medicamentos para facilitar la revisión del caso.": "Bring recent results, prior reports, and a medication list to help with the case review.",
    "Visítanos en Pacífica Salud": "Visit us at Pacífica Salud",
    "Consultorios Pacífica Salud, Piso 8, Boulevard Pacífica Salud, Vía Punta Darién, Panamá.": "Pacífica Salud Medical Offices, 8th Floor, Boulevard Pacífica Salud, Vía Punta Darién, Panama.",
    "Conversa con nuestro equipo de oncología": "Talk with our oncology team",
    "Conversa con nuestro equipo de hematología": "Talk with our hematology team",
    "Podemos orientarte sobre disponibilidad, estudios y requisitos para la consulta.": "We can guide you regarding availability, tests, and consultation requirements.",
    "Agendar una consulta": "Schedule a consultation",
    "Agenda una consulta": "Schedule a consultation",
    "← Inicio": "← Home",
    "Cáncer de mama": "Breast cancer",
    "Cáncer de pulmón": "Lung cancer",
    "Cáncer de próstata": "Prostate cancer",
    "Cáncer colorrectal": "Colorectal cancer",
    "Información general, posibles señales y evaluación especializada.": "General information, possible signs, and specialized evaluation.",
    "Conceptos básicos, evaluación y acompañamiento especializado.": "Key concepts, evaluation, and specialized support.",
    "Información educativa sobre diagnóstico y opciones de atención.": "Educational information about diagnosis and care options.",
    "Información para conversar con un especialista sobre la evaluación.": "Information to discuss the evaluation with a specialist.",
    "Anemia": "Anemia",
    "Leucemia": "Leukemia",
    "Linfoma": "Lymphoma",
    "Mieloma múltiple": "Multiple myeloma",
    "Tipos, posibles causas, señales y evaluación especializada.": "Types, possible causes, signs, and specialized evaluation.",
    "Información general sobre este grupo de enfermedades de las células sanguíneas.": "General information about this group of blood cell diseases.",
    "Conceptos básicos y evaluación de enfermedades del sistema linfático.": "Key concepts and evaluation of diseases of the lymphatic system.",
    "Información educativa sobre células plasmáticas, médula ósea y seguimiento.": "Educational information about plasma cells, bone marrow, and follow-up.",
    "¿Qué hace un oncólogo?": "What does an oncologist do?",
    "El oncólogo evalúa, planifica y da seguimiento al tratamiento médico de diferentes tipos de cáncer, coordinando estudios y otras especialidades cuando es necesario.": "An oncologist evaluates, plans, and follows the medical treatment of different types of cancer, coordinating tests and other specialties when needed.",
    "¿Puedo solicitar una segunda opinión oncológica?": "Can I request a second oncology opinion?",
    "Sí. Una segunda opinión permite revisar diagnósticos, estudios y alternativas de tratamiento antes de tomar decisiones.": "Yes. A second opinion provides an opportunity to review diagnoses, tests, and treatment alternatives before making decisions.",
    "¿HOPE trabaja con aseguradoras?": "Does HOPE work with insurance providers?",
    "HOPE coordina atención con diferentes aseguradoras. La cobertura depende de la póliza y debe confirmarse antes de la cita.": "HOPE coordinates care with different insurance providers. Coverage depends on the policy and must be confirmed before the appointment.",
    "¿Qué hace un hematólogo?": "What does a hematologist do?",
    "El hematólogo evalúa y trata enfermedades de la sangre, la médula ósea, la coagulación y otros componentes del sistema hematológico.": "A hematologist evaluates and treats diseases of the blood, bone marrow, coagulation, and other components of the hematologic system.",
    "¿Cuándo puede ser necesaria una consulta de hematología?": "When might a hematology consultation be needed?",
    "Una consulta puede ser indicada ante alteraciones persistentes en el hemograma, anemia, problemas de coagulación, ganglios aumentados u otros hallazgos que requieran evaluación especializada.": "A consultation may be indicated for persistent blood count abnormalities, anemia, coagulation problems, enlarged lymph nodes, or other findings that require specialized evaluation.",
    "¿Debo llevar mis laboratorios anteriores?": "Should I bring my previous laboratory results?",
    "Sí. Llevar hemogramas, estudios, informes, imágenes y una lista de medicamentos ayuda al especialista a revisar la evolución del caso.": "Yes. Bringing blood counts, tests, reports, imaging, and a medication list helps the specialist review how the case has evolved.",

    /* Psicooncología */
    "Oncología, hematología y psicooncología en Panamá": "Oncology, hematology, and psycho-oncology in Panama",
    "Integramos atención médica especializada y acompañamiento emocional para pacientes, familiares y cuidadores.": "We combine specialized medical care with emotional support for patients, families, and caregivers.",
    "Acompañamiento especializado": "Specialized support",
    "Psicooncología en Panamá": "Psycho-oncology in Panama",
    "Apoyo emocional para pacientes, familiares y cuidadores durante el diagnóstico, tratamiento y recuperación.": "Emotional support for patients, families, and caregivers during diagnosis, treatment, and recovery.",
    "Conocer la atención psicooncológica": "Explore psycho-oncology care",
    "Psicooncología · Panamá": "Psycho-oncology · Panama",
    "Acompañamiento emocional especializado para pacientes, familiares y cuidadores durante el diagnóstico, tratamiento, recuperación y seguimiento oncológico.": "Specialized emotional support for patients, families, and caregivers during cancer diagnosis, treatment, recovery, and follow-up.",
    "Agendar una consulta de psicooncología": "Schedule a psycho-oncology consultation",
    "Acompañamiento integral": "Comprehensive support",
    "Cuidar las emociones también forma parte del tratamiento": "Caring for emotional well-being is also part of treatment",
    "Un diagnóstico oncológico puede generar ansiedad, temor, cambios en la dinámica familiar y dificultades para adaptarse a nuevas rutinas. La psicooncología ofrece un espacio profesional para comprender y trabajar esas necesidades.": "A cancer diagnosis may cause anxiety, fear, changes in family dynamics, and difficulty adapting to new routines. Psycho-oncology offers a professional space to understand and address these needs.",
    "En HOPE Panamá, el acompañamiento puede incluir herramientas para manejar el estrés, fortalecer la comunicación, preparar conversaciones importantes y apoyar tanto al paciente como a su red cercana.": "At HOPE Panama, support may include tools to manage stress, strengthen communication, prepare for important conversations, and support both patients and those close to them.",
    "este contenido es educativo y no reemplaza una valoración o indicación profesional individual.": "this content is educational and does not replace an individual professional evaluation or recommendation.",
    "Apoyo para cada etapa del proceso oncológico": "Support for every stage of the cancer journey",
    "El acompañamiento se adapta a las necesidades, el momento clínico y la realidad de cada persona y familia.": "Support is adapted to each person and family's needs, clinical stage, and circumstances.",
    "Apoyo para pacientes": "Support for patients",
    "Herramientas para ansiedad, temor, cambios emocionales y adaptación al tratamiento.": "Tools for anxiety, fear, emotional changes, and adjustment to treatment.",
    "Orientación para familias": "Guidance for families",
    "Apoyo para la comunicación, la organización del cuidado y el manejo de cambios familiares.": "Support for communication, organizing care, and managing family changes.",
    "Seguimiento emocional": "Emotional follow-up",
    "Acompañamiento durante el tratamiento, la recuperación y las etapas de seguimiento.": "Support during treatment, recovery, and follow-up stages.",
    "Atención relacionada": "Related care",
    "Un enfoque conectado con el cuidado médico": "An approach connected with medical care",
    "La psicooncología complementa la atención clínica y puede integrarse a distintas etapas de la ruta del paciente.": "Psycho-oncology complements clinical care and can be integrated into different stages of the patient journey.",
    "Consulta enfocada en las necesidades emocionales de pacientes y familias.": "A consultation focused on the emotional needs of patients and families.",
    "Valoración médica, segunda opinión y seguimiento especializado.": "Medical evaluation, second opinion, and specialized follow-up.",
    "Tratamientos administrados en un entorno controlado y acompañado.": "Treatments administered in a controlled, supportive environment.",
    "Especialista": "Specialist",
    "Conoce su enfoque de acompañamiento para pacientes, familiares y cuidadores durante el proceso oncológico.": "Learn about her support approach for patients, families, and caregivers throughout the cancer journey.",
    "Ver perfil profesional": "View professional profile",
    "Motivos de consulta": "Reasons to seek support",
    "Situaciones en las que podemos acompañarte": "Situations in which we can support you",
    "Solicitar apoyo emocional es válido en cualquier etapa y no requiere esperar a sentirse sobrepasado.": "Seeking emotional support is valid at any stage; you do not need to wait until you feel overwhelmed.",
    "Adaptación": "Adjustment",
    "Ansiedad y temor": "Anxiety and fear",
    "Herramientas para afrontar la incertidumbre, los estudios y el inicio del tratamiento.": "Tools to cope with uncertainty, tests, and the beginning of treatment.",
    "Comunicación": "Communication",
    "Entorno familiar": "Family environment",
    "Orientación para conversar sobre el diagnóstico, las necesidades y los cambios cotidianos.": "Guidance for discussing the diagnosis, needs, and everyday changes.",
    "Imagen y autoestima": "Body image and self-esteem",
    "Apoyo ante cambios físicos, emocionales y sociales relacionados con el proceso.": "Support for physical, emotional, and social changes related to the process.",
    "Cuidadores": "Caregivers",
    "Red de apoyo": "Support network",
    "Recursos para familiares y cuidadores que también atraviesan exigencias emocionales.": "Resources for family members and caregivers who also face emotional demands.",
    "Antes de una consulta de psicooncología": "Before a psycho-oncology consultation",
    "No necesitas una preparación especial. Puedes anotar las situaciones, emociones o preguntas que deseas conversar.": "No special preparation is required. You may write down the situations, emotions, or questions you would like to discuss.",
    "¿Qué es la psicooncología?": "What is psycho-oncology?",
    "Es un área de acompañamiento que atiende las necesidades emocionales y psicológicas relacionadas con el proceso oncológico.": "It is an area of support that addresses emotional and psychological needs related to the cancer journey.",
    "¿La atención es únicamente para pacientes?": "Is care only for patients?",
    "No. Familiares y cuidadores también pueden recibir orientación y apoyo según sus necesidades.": "No. Family members and caregivers can also receive guidance and support according to their needs.",
    "¿Cuándo conviene solicitar acompañamiento?": "When is it helpful to seek support?",
    "En cualquier etapa: diagnóstico, tratamiento, recaída, recuperación, seguimiento o adaptación posterior.": "At any stage: diagnosis, treatment, recurrence, recovery, follow-up, or later adjustment.",
    "Conversa con nuestro equipo de psicooncología": "Talk with our psycho-oncology team",
    "Podemos orientarte sobre disponibilidad y ayudarte a coordinar la atención adecuada.": "We can guide you regarding availability and help coordinate the appropriate care.",

    /* Condiciones */
    "Información clara para dar el siguiente paso.": "Clear information to help you take the next step.",
    "Conoce algunas de las condiciones hematológicas y oncológicas que evalúa nuestro equipo.": "Learn about some of the hematologic and oncologic conditions evaluated by our team.",
    "Explorar condiciones": "Explore conditions",
    "Información para pacientes": "Patient information",
    "Condiciones que tratamos.": "Conditions we treat.",
    "Conoce conceptos básicos, posibles señales y cómo puede comenzar una evaluación especializada.": "Learn the basics, possible signs, and how a specialized evaluation may begin.",
    "Contenido educativo · Fuentes oficiales": "Educational content · Official sources",
    "Hematología y oncología": "Hematology and oncology",
    "Información clara para conversar con tu especialista.": "Clear information to discuss with your specialist.",
    "Estos contenidos no sustituyen una consulta ni permiten realizar un diagnóstico. Si tienes síntomas o inquietudes, solicita una valoración profesional.": "This content does not replace a consultation or provide a diagnosis. If you have symptoms or concerns, request a professional evaluation.",
    "Información responsable": "Responsible information",
    "Contenido educativo respaldado por fuentes oficiales.": "Educational content supported by official sources.",
    "Las páginas incluyen enlaces al Instituto Nacional del Cáncer de Estados Unidos y al National Heart, Lung, and Blood Institute para ampliar la información.": "The pages include links to the U.S. National Cancer Institute and the National Heart, Lung, and Blood Institute for further information.",
    "La evaluación, el diagnóstico y el tratamiento siempre deben ser indicados por profesionales idóneos.": "Evaluation, diagnosis, and treatment must always be provided by qualified professionals.",
    "¿Necesitas una valoración especializada?": "Do you need a specialized evaluation?",
    "Conversemos para ayudarte a identificar el especialista adecuado.": "Let's talk so we can help you identify the right specialist.",

    /* Contacto, mapas y privacidad */
    "Agenda por WhatsApp": "Schedule through WhatsApp",
    "Completa tus datos y prepararemos un mensaje para enviarlo directamente al centro.": "Complete your details and we will prepare a message to send directly to the center.",
    "(opcional)": "(optional)",
    "No incluyas diagnósticos ni información médica sensible": "Do not include diagnoses or sensitive medical information",
    "He leído la": "I have read the",
    "y autorizo preparar el mensaje para WhatsApp.": "and authorize the message to be prepared for WhatsApp.",
    "Continuar en WhatsApp": "Continue in WhatsApp",
    "El sitio no almacena estos datos. Al continuar, la información se enviará mediante WhatsApp.": "The site does not store this information. By continuing, it will be sent through WhatsApp.",
    "Abrir en Google Maps": "Open in Google Maps",
    "Abrir en Waze": "Open in Waze",
    "Proveedor del mapa": "Map provider",
    "Privacidad": "Privacy",
    "Tu información merece cuidado.": "Your information deserves care.",
    "Esta política explica qué sucede cuando utilizas el sitio, cambias de idioma o decides contactar a HOPE.": "This policy explains what happens when you use the site, change languages, or decide to contact HOPE.",
    "Última actualización: octubre de 2026": "Last updated: October 2026",
    "Resumen": "Summary",
    "Datos y formularios": "Data and forms",
    "Almacenamiento local": "Local storage",
    "Analítica": "Analytics",
    "Servicios externos": "External services",
    "El formulario de contacto prepara un mensaje en tu dispositivo y abre WhatsApp. Este sitio no guarda el nombre, teléfono, correo ni mensaje que escribes.": "The contact form prepares a message on your device and opens WhatsApp. This site does not store the name, phone number, email, or message you enter.",
    "Evita incluir diagnósticos, resultados de laboratorio u otra información médica sensible. La atención clínica debe coordinarse directamente con el centro.": "Avoid including diagnoses, laboratory results, or other sensitive medical information. Clinical care must be coordinated directly with the center.",
    "El navegador recuerda tu preferencia de idioma y tu decisión sobre analítica mediante almacenamiento local. Puedes eliminar estas preferencias desde la configuración del navegador.": "Your browser remembers your language preference and analytics choice through local storage. You can remove these preferences from your browser settings.",
    "Analítica opcional": "Optional analytics",
    "La medición anónima solo se activa si la aceptas y si HOPE configura una herramienta de analítica. Puede registrar acciones generales como abrir WhatsApp, llamar, consultar un mapa o visitar una aseguradora, sin enviar el contenido del formulario.": "Anonymous analytics are activated only if you accept and HOPE configures an analytics tool. It may record general actions such as opening WhatsApp, calling, viewing a map, or visiting an insurer, without sending form content.",
    "El sitio ofrece enlaces a WhatsApp, Instagram, Google Maps, Waze y las páginas oficiales de aseguradoras. Al abrirlos, se aplican las políticas de privacidad de cada proveedor.": "The site links to WhatsApp, Instagram, Google Maps, Waze, and official insurer websites. When you open them, each provider's privacy policy applies.",
    "Para consultas relacionadas con este sitio, puedes escribir a": "For questions related to this site, you can write to",
    "o llamar al": "or call",

    /* Inicio */
    "Hematología · Oncología · Panamá": "Hematology · Oncology · Panama",
    "Ciencia que cuida.": "Science that cares.",
    "Humanidad que acompaña.": "Humanity that stands by you.",
    "Atención especializada, diagnóstico preciso y acompañamiento integral en cada etapa del proceso.": "Specialized care, precise diagnosis, and comprehensive support at every stage of the process.",
    "Solicitar orientación": "Request guidance",
    "Agendar una cita": "Schedule an appointment",
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
    "Ver perfil": "View profile",

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
    "Especialista en Psicooncología": "Psycho-Oncology Specialist",
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
    "Centro de Oncología y Hematología en Panamá | HOPE": "Oncology and Hematology Center in Panama | HOPE",
    "Oncología en Panamá | Atención Especializada | HOPE": "Oncology in Panama | Specialized Care | HOPE",
    "Hematología en Panamá | Atención Especializada | HOPE": "Hematology in Panama | Specialized Care | HOPE",
    "Psicooncología en Panamá | Apoyo Emocional | HOPE": "Psycho-Oncology in Panama | Emotional Support | HOPE",
    "Oncología, Hematología y Psicooncología | Equipo HOPE": "Oncology, Hematology and Psycho-Oncology | HOPE Team",
    "Servicios de Oncología y Hematología en Panamá | HOPE": "Oncology and Hematology Services in Panama | HOPE",
    "Quimioterapia Ambulatoria en Panamá | HOPE": "Outpatient Chemotherapy in Panama | HOPE",
    "Equipo médico | HOPE Panamá": "Medical Team | HOPE Panama",
    "Servicios médicos | HOPE Panamá": "Medical Services | HOPE Panama",
    "Quiénes somos | HOPE Panamá": "About Us | HOPE Panama",
    "Contacto | HOPE Panamá": "Contact | HOPE Panama",
    "Perfil médico | HOPE Panamá": "Medical Profile | HOPE Panama",
    "Servicio médico | HOPE Panamá": "Medical Service | HOPE Panama"
    ,"Condiciones que tratamos | HOPE Panamá": "Conditions We Treat | HOPE Panama"
    ,"Condición médica | HOPE Panamá": "Medical Condition | HOPE Panama"
    ,"Política de privacidad | HOPE Panamá": "Privacy Policy | HOPE Panama"
  };

  const attributeTranslations = {
    "Abrir menú": "Open menu",
    "Cerrar menú": "Close menu",
    "Navegación principal": "Main navigation",
    "Cambiar idioma": "Change language",
    "Tu nombre": "Your name",
    "nombre@correo.com": "name@email.com",
    "Cuéntanos brevemente qué necesitas": "Briefly tell us what you need",
    "No incluyas diagnósticos ni información médica sensible": "Do not include diagnoses or sensitive medical information",
    "Proveedor del mapa": "Map provider",
    "Mapa de Pacífica Salud, Punta Pacífica, Panamá": "Map of Pacífica Salud, Punta Pacífica, Panama",
    "Mapa de Google de Pacífica Salud, Punta Pacífica, Panamá": "Google map of Pacífica Salud, Punta Pacífica, Panama",
    "Mapa de Waze de Pacífica Salud, Punta Pacífica, Panamá": "Waze map of Pacífica Salud, Punta Pacífica, Panama",
    "Diseño y desarrollo por Alejandro Admadé": "Design and development by Alejandro Admadé",
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
        if (language === "en" && attribute === "aria-label" && value.startsWith("Visitar sitio oficial de ")) {
          translated = value.replace("Visitar sitio oficial de ", "Visit the official website of ").replace("; se abre en una nueva pestaña", "; opens in a new tab");
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
    updateWhatsappLinks(selected);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, selected); } catch (error) { /* El modo file:// puede restringir almacenamiento. */ }
    }
    document.dispatchEvent(new CustomEvent("hope:languagechange", { detail: { language: selected } }));
    cleanHeadingPunctuation();
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  let savedLanguage = null;
  try { savedLanguage = localStorage.getItem(STORAGE_KEY); } catch (error) { /* Se mantiene el idioma del navegador. */ }
  applyLanguage(savedLanguage || "es", Boolean(savedLanguage));

  window.HOPE_LANGUAGE = { set: applyLanguage, get: () => document.documentElement.lang };
})();
