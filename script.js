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
    <a class="doctor-card" href="doctor.html?id=${doctor.id}" data-category="${doctor.specialty}" data-reveal>
      <div class="doctor-photo"><img src="${doctor.image}" alt="${doctor.name}" style="object-position:${doctor.position}"><span>${String(index + 1).padStart(2, "0")}</span><b>Ver perfil ↗</b></div>
      <div class="doctor-info"><small>Perfil demostrativo</small><h3>${doctor.name}</h3><p>${doctor.specialty}</p></div>
    </a>`;
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
        <div class="profile-copy" data-reveal><a class="breadcrumb" href="equipo.html">← Equipo médico</a><span class="demo-badge">Perfil demostrativo</span><p class="kicker light"><span></span> ${doctor.specialty}</p><h1>${doctor.name}</h1><p>${doctor.intro}</p><div class="profile-actions"><a class="button button-gold" href="contacto.html">Solicitar orientación <span>↗</span></a><a class="button button-dark-ghost" href="tel:+5073863086">Llamar al centro</a></div></div>
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
    status.textContent = "Abriendo tu aplicación de correo…";
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
