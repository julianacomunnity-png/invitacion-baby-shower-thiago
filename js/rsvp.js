/**
 * ====================================================================
 * GESTIÓN DE CONFIRMACIÓN DE ASISTENCIA (RSVP) & WHATSAPP
 * ====================================================================
 * Redirige directamente al enlace oficial de WhatsApp (https://wa.link/j0x1dj)
 * y almacena el registro en la lista local de invitados (localStorage)
 * como herramienta privada para los papitos. Cero emojis.
 */

const SVG_CHECK = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25d366" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20 6L9 17l-5-5"></path>
</svg>`;

const SVG_INFO = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b56b00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="16" x2="12" y2="12"></line>
  <line x1="12" y1="8" x2="12.01" y2="8"></line>
</svg>`;

export class RsvpManager {
  constructor(config) {
    this.config = config;
    this.storageKey = "thiago_baby_shower_guests";
    this.form = document.getElementById("rsvpForm");
    this.nameInput = document.getElementById("rsvpName");
    this.companionsSelect = document.getElementById("rsvpCompanions");
    this.noteInput = document.getElementById("rsvpNote");
    this.whatsappDirectBtn = document.getElementById("whatsappDirectBtn");
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    if (this.whatsappDirectBtn) {
      this.whatsappDirectBtn.addEventListener("click", () => {
        window.open(this.config.WHATSAPP_URL, "_blank", "noopener,noreferrer");
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.nameInput ? this.nameInput.value.trim() : "";
    const companions = this.companionsSelect ? this.companionsSelect.value : "0";
    const attendanceRadio = document.querySelector('input[name="rsvpAttendance"]:checked');
    const attendance = attendanceRadio ? attendanceRadio.value : "yes";
    const note = this.noteInput ? this.noteInput.value.trim() : "";

    // Si escribió su nombre, registrarlo en la lista local de papitos
    if (name) {
      const guestRecord = {
        id: "gst_" + Date.now(),
        name: name,
        attendance: attendance,
        companions: parseInt(companions, 10) || 0,
        note: note,
        date: new Date().toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" }),
        rawTimestamp: Date.now()
      };
      this.saveGuest(guestRecord);
    }

    // Abrir directamente el enlace oficial de WhatsApp
    window.open(this.config.WHATSAPP_URL, "_blank", "noopener,noreferrer");

    this.showToast("Redirigiendo a WhatsApp para confirmar asistencia...", "success");
    this.resetForm();
  }

  saveGuest(record) {
    try {
      const existing = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      existing.unshift(record);
      localStorage.setItem(this.storageKey, JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent("guestListUpdated", { detail: existing }));
    } catch (err) {
      console.warn("Aviso de almacenamiento local:", err);
    }
  }

  resetForm() {
    if (this.nameInput) this.nameInput.value = "";
    if (this.noteInput) this.noteInput.value = "";
    if (this.companionsSelect) this.companionsSelect.value = "0";
    const defaultRadio = document.querySelector('input[name="rsvpAttendance"][value="yes"]');
    if (defaultRadio) defaultRadio.checked = true;
  }

  showToast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === "success" ? SVG_CHECK : SVG_INFO}</span>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
}
