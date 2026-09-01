// HOPE Panamá V2 — carrusel de aseguradoras corregido
const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");
const servicesButton = document.querySelector("#servicesButton");
const serviceDropdown = document.querySelector("#serviceDropdown");

menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

servicesButton.addEventListener("click", () => {
  const isOpen = serviceDropdown.classList.toggle("open");
  servicesButton.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

const heroImages = Array.from(document.querySelectorAll(".hero-image"));
const heroDots = Array.from(document.querySelectorAll("#heroDots button"));
const heroCounter = document.querySelector("#heroCounter");
let heroIndex = 0;
let heroTimer;

function showHero(index) {
  heroIndex = (index + heroImages.length) % heroImages.length;

  heroImages.forEach((image, imageIndex) => {
    image.classList.toggle("active", imageIndex === heroIndex);
  });

  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === heroIndex);
  });

  heroCounter.textContent = String(heroIndex + 1).padStart(2, "0");
}

function startHeroTimer() {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => showHero(heroIndex + 1), 7000);
}

document.querySelector("#heroPrev").addEventListener("click", () => {
  showHero(heroIndex - 1);
  startHeroTimer();
});

document.querySelector("#heroNext").addEventListener("click", () => {
  showHero(heroIndex + 1);
  startHeroTimer();
});

heroDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showHero(index);
    startHeroTimer();
  });
});

startHeroTimer();

const doctors = [
  "images/doctor-1.png",
  "images/doctor-2.png",
  "images/doctor-3.png",
  "images/doctor-4.png",
  "images/doctor-5.png",
  "images/doctor-6.png"
];

const galleryState = {
  team: 0,
  hope: 3
};

function renderGallery(name) {
  const gallery = document.querySelector(name === "team" ? "#teamGallery" : "#hopeGallery");
  const counter = document.querySelector(name === "team" ? "#teamCount" : "#hopeCount");
  const start = galleryState[name];

  gallery.innerHTML = "";

  for (let position = 0; position < 4; position += 1) {
    const doctorIndex = (start + position) % doctors.length;
    const card = document.createElement("article");
    card.className = "doctor-card";
    card.innerHTML = `
      <img src="${doctors[doctorIndex]}" alt="Especialista de HOPE Panamá ${doctorIndex + 1}">
      <div class="doctor-shade">
        <span>${String(doctorIndex + 1).padStart(2, "0")}</span>
        <small>HOPE Panamá</small>
      </div>
    `;
    gallery.appendChild(card);
  }

  counter.textContent = `${start + 1} / ${doctors.length}`;
}

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    const galleryName = button.dataset.gallery;
    const direction = Number(button.dataset.direction);
    galleryState[galleryName] = (galleryState[galleryName] + direction + doctors.length) % doctors.length;
    renderGallery(galleryName);
  });
});

renderGallery("team");
renderGallery("hope");

const insurers = [
  "images/insurer-3.png",
  "images/insurer-4.png",
  "images/insurer-5.png",
  "images/insurer-6.png",
  "images/insurer-7.png",
  "images/insurer-8.png"
];

const insuranceGrid = document.querySelector("#insuranceGrid");
let insurerIndex = 0;

function renderInsurers() {
  insuranceGrid.innerHTML = "";

  for (let position = 0; position < 4; position += 1) {
    const currentIndex = (insurerIndex + position) % insurers.length;
    const card = document.createElement("div");
    card.className = "insurance-card";
    card.innerHTML = `<img src="${insurers[currentIndex]}" alt="Aseguradora asociada ${currentIndex + 1}">`;
    insuranceGrid.appendChild(card);
  }
}

document.querySelector("#insurerPrev").addEventListener("click", () => {
  insurerIndex = (insurerIndex - 1 + insurers.length) % insurers.length;
  renderInsurers();
});

document.querySelector("#insurerNext").addEventListener("click", () => {
  insurerIndex = (insurerIndex + 1) % insurers.length;
  renderInsurers();
});

renderInsurers();
