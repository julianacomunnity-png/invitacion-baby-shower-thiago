/**
 * ====================================================================
 * APLICACIÓN PRINCIPAL - BABY SHOWER THIAGO
 * ====================================================================
 * Inicialización de componentes, apertura del sobre interactivo,
 * renderizado editorial, observador de animaciones y modal de regalos.
 * Cero emojis en la lógica e interfaz.
 */

import { EVENT_CONFIG, GIFTS, GIFT_CATEGORIES } from "./config.js";
import { MusicManager } from "./audio.js";
import { RsvpManager } from "./rsvp.js";
import { AdminPanel } from "./admin.js";

// SVG icons limpios para los regalos
const GIFT_ICONS = {
  care: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  clothes: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>`,
  bath: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path><path d="M2 12h20"></path><path d="M7 12V5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1"></path></svg>`,
  feeding: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12l1 5v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8l1-5z"></path><path d="M10 3v4"></path><path d="M14 3v4"></path><line x1="6" y1="13" x2="18" y2="13"></line></svg>`,
  toys: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  comfort: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 10h18"></path><path d="M10 4v16"></path></svg>`
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Instanciar gestores
  const music = new MusicManager(EVENT_CONFIG);
  const rsvp = new RsvpManager(EVENT_CONFIG);
  const admin = new AdminPanel(EVENT_CONFIG);

  // Exponer instancias globales para depuración o atajos
  window.adminPanelInstance = admin;
  window.appMusicInstance = music;

  // 2. Inicializar subsistemas
  music.init();
  rsvp.init();
  admin.init();

  // 3. Renderizar contenido desde configuración
  populateDynamicContent();
  setupGiftsModal();
  setupLocationButton();

  // 4. Experiencia de Apertura del Sobre (Hero Reveal)
  setupEnvelopeOpening(music);

  // 5. Animaciones con IntersectionObserver (scroll reveal)
  setupScrollObserver();

  // 6. Efecto de partículas doradas suaves en segundo plano
  setupFloatingParticles();
});

/**
 * Llena todos los datos dinámicos a partir de EVENT_CONFIG
 */
function populateDynamicContent() {
  const babyName = EVENT_CONFIG.BABY_NAME || "Thiago";
  const eventType = EVENT_CONFIG.EVENT_TYPE || "Baby Shower";
  const dateFormatted = EVENT_CONFIG.EVENT_DATE_DISPLAY || "8 DE NOVIEMBRE";
  const dayName = EVENT_CONFIG.EVENT_DAY_DISPLAY || "DOMINGO";
  const eventTime = EVENT_CONFIG.EVENT_TIME_DISPLAY || "3:00 PM";
  const emotionalStory = EVENT_CONFIG.EMOTIONAL_STORY || "";

  // Nombre del bebé
  document.querySelectorAll(".dyn-baby-name").forEach((el) => {
    el.textContent = babyName;
  });

  // Título del evento
  document.querySelectorAll(".dyn-event-type").forEach((el) => {
    el.textContent = eventType;
  });

  // Fecha y hora (Formato estricto: 8 DE NOVIEMBRE / DOMINGO / 3:00 PM)
  document.querySelectorAll(".dyn-date-formatted").forEach((el) => {
    el.textContent = dateFormatted;
  });
  document.querySelectorAll(".dyn-day-name").forEach((el) => {
    el.textContent = dayName;
  });
  document.querySelectorAll(".dyn-time").forEach((el) => {
    el.textContent = eventTime;
  });

  // Textos emotivos
  const emotionalStoryEl = document.getElementById("emotionalStoryText");
  if (emotionalStoryEl && emotionalStory) {
    emotionalStoryEl.textContent = emotionalStory;
  }

  // Despedida
  const closingPhrase1 = document.getElementById("closingPhrase1");
  const closingPhrase2 = document.getElementById("closingPhrase2");
  const closingSig = document.getElementById("closingSignature");
  if (closingPhrase1) closingPhrase1.textContent = EVENT_CONFIG.CLOSING_PHRASE_1 || "Gracias por acompañarnos en este momento tan especial.";
  if (closingPhrase2) closingPhrase2.textContent = EVENT_CONFIG.CLOSING_PHRASE_2 || "Te esperamos con todo el amor para celebrar la llegada de THIAGO.";
  if (closingSig) closingSig.textContent = EVENT_CONFIG.CLOSING_SIGNATURE || "Con amor, Thiago";

  // Fecha límite de confirmación
  const deadlineEl = document.getElementById("rsvpDeadlineText");
  if (deadlineEl && EVENT_CONFIG.RSVP_DEADLINE_TEXT) {
    deadlineEl.textContent = EVENT_CONFIG.RSVP_DEADLINE_TEXT;
  }
}

/**
 * Apertura del sobre interactivo artesanal
 */
function setupEnvelopeOpening(musicManager) {
  const envelopeScreen = document.getElementById("envelopeScreen");
  const openBtn = document.getElementById("openInvitationBtn");
  const waxSealBtn = document.getElementById("envelopeWaxSealBtn");
  const mainContent = document.getElementById("mainContent");

  if (!envelopeScreen) return;

  let isOpening = false;

  const handleOpen = () => {
    if (isOpening) return;
    isOpening = true;

    // 1. Iniciar música de fondo "Te Esperaba" tras interacción
    if (EVENT_CONFIG.AUTO_PLAY_ON_OPEN !== false) {
      musicManager.play();
    }

    // 2. Disparar animación de solapa abriéndose y sello
    envelopeScreen.classList.add("envelope-is-opening");

    // 3. Revelar contenido principal del brochure
    setTimeout(() => {
      envelopeScreen.classList.add("envelope-fade-out");
      document.body.classList.remove("envelope-locked");
      if (mainContent) {
        mainContent.classList.add("content-revealed");
      }

      // Desplazamiento suave al inicio de la invitación
      const heroSection = document.getElementById("heroSection");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }

      // Ocultar la pantalla del sobre tras concluir la transición
      setTimeout(() => {
        envelopeScreen.style.display = "none";
      }, 850);
    }, 750);
  };

  if (openBtn) {
    openBtn.addEventListener("click", handleOpen);
  }
  if (waxSealBtn) {
    waxSealBtn.addEventListener("click", handleOpen);
  }
}

/**
 * Configuración del botón de Ubicación / Google Maps
 */
function setupLocationButton() {
  const btn = document.getElementById("locationMapBtn");
  const venueTitleEl = document.getElementById("locationVenueTitle");
  const venueAddressEl = document.getElementById("locationAddressText");
  const instructionsEl = document.getElementById("locationInstructionsText");

  const venueName = (EVENT_CONFIG.EVENT_VENUE_NAME || "").trim();
  const address = (EVENT_CONFIG.EVENT_ADDRESS || "").trim();
  const mapsUrl = (EVENT_CONFIG.GOOGLE_MAPS_URL || "").trim();
  const instructions = EVENT_CONFIG.LOCATION_INSTRUCTIONS || "";

  if (venueTitleEl) {
    venueTitleEl.textContent = venueName !== "" ? venueName : "Conjunto Residencial Cerritos Campestre — Salón Social";
  }
  if (venueAddressEl) {
    if (address !== "") {
      venueAddressEl.textContent = address;
      venueAddressEl.style.display = "block";
    } else {
      venueAddressEl.textContent = "";
      venueAddressEl.style.display = "none";
    }
  }
  if (instructionsEl && instructions) {
    instructionsEl.textContent = instructions;
  }

  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (mapsUrl !== "") {
        window.open(mapsUrl, "_blank", "noopener,noreferrer");
      }
    });
  }
}

/**
 * Gestión del Modal Elegante de Lista de Regalos Organizada por Categorías
 */
function setupGiftsModal() {
  const openBtn = document.getElementById("openGiftsModalBtn");
  const modal = document.getElementById("giftsModal");
  const closeBtn = document.getElementById("closeGiftsModalBtn");
  const container = document.getElementById("giftsModalContainer");

  if (!modal || !openBtn) return;

  // Renderizar los regalos agrupados por categorías
  if (container) {
    if (!GIFT_CATEGORIES || GIFT_CATEGORIES.length === 0) {
      container.innerHTML = `
        <div class="empty-gifts-card">
          <p>Tu presencia y cariño son nuestro mayor regalo para Thiago.</p>
        </div>
      `;
    } else {
      container.innerHTML = GIFT_CATEGORIES.map((cat) => {
        const iconSvg = GIFT_ICONS[cat.type] || GIFT_ICONS.care;
        return `
          <div class="gifts-category-block">
            <div class="gifts-category-header">
              <div class="gifts-category-icon">${iconSvg}</div>
              <h4 class="gifts-category-title">${cat.name}</h4>
            </div>
            <ul class="gifts-item-list">
              ${cat.items.map((item) => `
                <li class="gifts-item-row">
                  <svg class="gifts-item-bullet" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span class="gifts-item-text">${item.name}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `;
      }).join("");
    }
  }

  const openModal = () => {
    modal.classList.add("is-visible");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-visible");
    document.body.classList.remove("modal-open");
  };

  openBtn.addEventListener("click", openModal);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-visible")) {
      closeModal();
    }
  });
}

/**
 * Microinteracciones: Animación al hacer scroll (Intersection Observer)
 */
function setupScrollObserver() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Partículas doradas flotantes suaves en el fondo
 */
function setupFloatingParticles() {
  const container = document.getElementById("ambientParticles");
  if (!container) return;

  const count = 10;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-pollen";
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    container.appendChild(particle);
  }
}

function showCustomAlert(title, message) {
  let modal = document.getElementById("infoModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "infoModal";
    modal.className = "info-modal-backdrop";
    modal.innerHTML = `
      <div class="info-modal-card">
        <div class="info-modal-header">
          <h4 id="infoModalTitle"></h4>
          <button class="info-modal-close" id="infoModalCloseBtn" aria-label="Cerrar">&times;</button>
        </div>
        <div class="info-modal-body" id="infoModalBody"></div>
        <div class="info-modal-footer">
          <button class="btn btn-secondary info-modal-ok">Entendido</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".info-modal-close");
    const okBtn = modal.querySelector(".info-modal-ok");
    const closeModal = () => modal.classList.remove("is-visible");

    closeBtn.addEventListener("click", closeModal);
    okBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.getElementById("infoModalTitle").innerHTML = title;
  document.getElementById("infoModalBody").innerHTML = message;
  modal.classList.add("is-visible");
}
