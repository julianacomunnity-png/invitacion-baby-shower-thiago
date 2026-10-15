/**
 * ====================================================================
 * PANEL ADMINISTRATIVO PRIVADO DE INVITADOS
 * ====================================================================
 * Permite a los futuros padres consultar en tiempo real quiénes han confirmado,
 * cuántos acompañantes asistirán, exportar a Excel (CSV) y copiar la lista.
 * Protegido mediante un código PIN configurable en config.js.
 * Libre de emojis.
 */

export class AdminPanel {
  constructor(config) {
    this.config = config;
    this.pin = config.ADMIN_PIN || config.adminPin || "1234";
    this.storageKey = "thiago_baby_shower_guests";
    this.isAuthenticated = false;
  }

  init() {
    this.createAdminTrigger();
    this.bindEvents();

    if (window.location.hash === "#admin") {
      this.openAuthModal();
    }
  }

  createAdminTrigger() {
    const existingBtn = document.getElementById("adminOpenBtn");
    if (existingBtn) {
      existingBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openAuthModal();
      });
    }

    // Atajo de teclado: Ctrl + Shift + A
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        this.openAuthModal();
      }
    });

    window.addEventListener("guestListUpdated", () => {
      if (this.isAuthenticated) {
        this.renderGuestList();
      }
    });
  }

  bindEvents() {
    document.addEventListener("click", (e) => {
      if (e.target.matches("#adminCloseBtn") || e.target.closest("#adminCloseBtn")) {
        this.closeModal();
      }
      if (e.target.matches("#adminExportCsvBtn") || e.target.closest("#adminExportCsvBtn")) {
        this.exportToCsv();
      }
      if (e.target.matches("#adminCopyListBtn") || e.target.closest("#adminCopyListBtn")) {
        this.copyListToClipboard();
      }
      if (e.target.matches(".btn-delete-guest")) {
        const id = e.target.getAttribute("data-id");
        this.deleteGuest(id);
      }
    });
  }

  openAuthModal() {
    if (this.isAuthenticated) {
      this.showDashboard();
      return;
    }

    const enteredPin = prompt("Panel de Papitos — Ingresa tu PIN de seguridad (por defecto: 1234):");
    if (enteredPin === null) return;

    if (enteredPin.trim() === this.pin.trim()) {
      this.isAuthenticated = true;
      this.showDashboard();
    } else {
      alert("PIN incorrecto. Puedes verificar el PIN en el archivo js/config.js.");
    }
  }

  showDashboard() {
    let modal = document.getElementById("adminModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "adminModal";
      modal.className = "admin-modal-backdrop is-visible";
      document.body.appendChild(modal);
    } else {
      modal.classList.add("is-visible");
    }

    this.renderGuestList();
  }

  closeModal() {
    const modal = document.getElementById("adminModal");
    if (modal) {
      modal.classList.remove("is-visible");
    }
  }

  getGuests() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    } catch {
      return [];
    }
  }

  renderGuestList() {
    const modal = document.getElementById("adminModal");
    if (!modal) return;

    const guests = this.getGuests();
    const confirmedCount = guests.filter((g) => g.attendance === "yes").length;
    const declinedCount = guests.filter((g) => g.attendance === "no").length;
    const totalCompanions = guests
      .filter((g) => g.attendance === "yes")
      .reduce((acc, curr) => acc + (parseInt(curr.companions, 10) || 0), 0);
    const totalPeople = confirmedCount + totalCompanions;

    modal.innerHTML = `
      <div class="admin-modal-dialog">
        <div class="admin-modal-header">
          <div class="admin-title-area">
            <span class="admin-badge">Control de Invitados</span>
            <h3>Baby Shower de ${this.config.BABY_NAME || "Thiago"}</h3>
          </div>
          <button class="admin-close-btn" id="adminCloseBtn" aria-label="Cerrar modal">&times;</button>
        </div>

        <div class="admin-metrics-row">
          <div class="metric-card metric-primary">
            <span class="metric-num">${totalPeople}</span>
            <span class="metric-label">Personas Totales (Confirmados + Acompañantes)</span>
          </div>
          <div class="metric-card">
            <span class="metric-num">${confirmedCount}</span>
            <span class="metric-label">Titulares Asistirán</span>
          </div>
          <div class="metric-card">
            <span class="metric-num">${totalCompanions}</span>
            <span class="metric-label">Acompañantes</span>
          </div>
          <div class="metric-card metric-declined">
            <span class="metric-num">${declinedCount}</span>
            <span class="metric-label">No asistirán</span>
          </div>
        </div>

        <div class="admin-actions-bar">
          <button class="btn btn-sm btn-secondary" id="adminCopyListBtn">
            Copiar Lista Formateada
          </button>
          <button class="btn btn-sm btn-primary" id="adminExportCsvBtn">
            Descargar CSV (Excel)
          </button>
          <button class="btn btn-sm btn-outline" id="adminAddManualBtn" onclick="window.adminPanelInstance.addManualGuest()">
            Registrar Manualmente
          </button>
        </div>

        <div class="admin-table-container">
          ${
            guests.length === 0
              ? `
            <div class="admin-empty-state">
              <p>Aún no hay confirmaciones registradas en este navegador.</p>
              <small>Cuando un invitado confirme por el formulario o WhatsApp, aparecerá inmediatamente aquí.</small>
            </div>
          `
              : `
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Asistencia</th>
                  <th>Acomp.</th>
                  <th>Mensaje con Cariño</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                ${guests
                  .map(
                    (g) => `
                  <tr>
                    <td><strong>${this.escapeHtml(g.name)}</strong></td>
                    <td>
                      <span class="status-pill status-${g.attendance}">
                        ${g.attendance === "yes" ? "Si asiste" : "No asiste"}
                      </span>
                    </td>
                    <td>${g.companions || 0}</td>
                    <td class="cell-note">${g.note ? `“${this.escapeHtml(g.note)}”` : "—"}</td>
                    <td><small>${g.date || "Reciente"}</small></td>
                    <td>
                      <button class="btn-delete-guest" data-id="${g.id}" title="Eliminar registro">Eliminar</button>
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          `
          }
        </div>

        <div class="admin-modal-footer">
          <small>Los datos se almacenan de forma privada en tu dispositivo y pueden exportarse en cualquier momento.</small>
          <button class="btn btn-secondary" id="adminCloseBtn">Cerrar</button>
        </div>
      </div>
    `;
  }

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  deleteGuest(id) {
    if (!confirm("¿Deseas eliminar este registro de invitado?")) return;
    const guests = this.getGuests().filter((g) => g.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(guests));
    this.renderGuestList();
  }

  addManualGuest() {
    const name = prompt("Nombre del invitado:");
    if (!name || !name.trim()) return;

    const attendance = confirm("¿El invitado asistirá? (Aceptar = Sí / Cancelar = No)") ? "yes" : "no";
    const companionsStr = prompt("Número de acompañantes (0 si viene solo):", "0");
    const companions = parseInt(companionsStr, 10) || 0;
    const note = prompt("Mensaje u observación (opcional):", "") || "";

    const newRecord = {
      id: "gst_" + Date.now(),
      name: name.trim(),
      attendance: attendance,
      companions: companions,
      note: note.trim(),
      date: new Date().toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" }),
      rawTimestamp: Date.now()
    };

    const guests = this.getGuests();
    guests.unshift(newRecord);
    localStorage.setItem(this.storageKey, JSON.stringify(guests));
    this.renderGuestList();
  }

  copyListToClipboard() {
    const guests = this.getGuests();
    if (guests.length === 0) {
      alert("No hay invitados para copiar.");
      return;
    }

    let text = `LISTA DE ASISTENCIA - BABY SHOWER ${(this.config.BABY_NAME || "Thiago").toUpperCase()}\n`;
    text += `Fecha de generación: ${new Date().toLocaleDateString()}\n\n`;
    text += `TOTAL PERSONAS CONFIRMADAS: ${guests.filter((g) => g.attendance === "yes").reduce((a, b) => a + 1 + (b.companions || 0), 0)}\n\n`;

    text += `CONFIRMADOS:\n`;
    guests
      .filter((g) => g.attendance === "yes")
      .forEach((g, idx) => {
        text += `${idx + 1}. ${g.name} (${g.companions > 0 ? `+${g.companions} acomp.` : "Solo/a"})\n`;
        if (g.note) text += `   Nota: "${g.note}"\n`;
      });

    const declined = guests.filter((g) => g.attendance === "no");
    if (declined.length > 0) {
      text += `\nNO PODRÁN ASISTIR:\n`;
      declined.forEach((g, idx) => {
        text += `${idx + 1}. ${g.name}\n`;
      });
    }

    navigator.clipboard.writeText(text).then(
      () => alert("Lista de invitados copiada al portapapeles. Puedes pegarla en WhatsApp o Notas."),
      () => alert("No se pudo copiar automáticamente. Por favor descarga el archivo CSV.")
    );
  }

  exportToCsv() {
    const guests = this.getGuests();
    if (guests.length === 0) {
      alert("No hay invitados para exportar.");
      return;
    }

    let csvContent = "\uFEFF";
    csvContent += "Nombre,Asistencia,Acompañantes,Mensaje,Fecha Registro\n";

    guests.forEach((g) => {
      const row = [
        `"${(g.name || "").replace(/"/g, '""')}"`,
        g.attendance === "yes" ? "SI ASISTE" : "NO ASISTE",
        g.companions || 0,
        `"${(g.note || "").replace(/"/g, '""')}"`,
        `"${g.date || ""}"`
      ];
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `invitados_baby_shower_${(this.config.BABY_NAME || "thiago").toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
