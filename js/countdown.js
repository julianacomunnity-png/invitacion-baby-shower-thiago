/**
 * ====================================================================
 * CUENTA REGRESIVA DINÁMICA EN TIEMPO REAL
 * ====================================================================
 * Calcula la diferencia exacta entre la hora actual y la fecha del evento.
 * Al llegar el momento, muestra el mensaje conmemorativo de celebración.
 */

export class CountdownTimer {
  constructor(config) {
    this.targetDateStr = config.TARGET_DATE_ISO || config.targetDateISO || "2026-11-08T15:00:00";
    this.targetDate = new Date(this.targetDateStr);
    this.babyName = config.BABY_NAME || config.babyName || "Thiago";
    
    this.daysEl = document.getElementById("countdownDays");
    this.hoursEl = document.getElementById("countdownHours");
    this.minutesEl = document.getElementById("countdownMinutes");
    this.secondsEl = document.getElementById("countdownSeconds");
    this.containerEl = document.getElementById("countdownContainer");
    this.finishedEl = document.getElementById("countdownFinished");
    
    this.intervalId = null;
  }

  start() {
    this.tick();
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  tick() {
    const now = new Date().getTime();
    const target = this.targetDate.getTime();
    const distance = target - now;

    if (distance <= 0) {
      this.stop();
      this.showFinished();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.updateValue(this.daysEl, this.padZero(days));
    this.updateValue(this.hoursEl, this.padZero(hours));
    this.updateValue(this.minutesEl, this.padZero(minutes));
    this.updateValue(this.secondsEl, this.padZero(seconds));
  }

  padZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  updateValue(element, newValue) {
    if (!element) return;
    if (element.textContent !== newValue) {
      element.textContent = newValue;
      element.classList.add("pulse-change");
      setTimeout(() => element.classList.remove("pulse-change"), 300);
    }
  }

  showFinished() {
    if (this.containerEl) {
      this.containerEl.style.display = "none";
    }
    if (this.finishedEl) {
      this.finishedEl.style.display = "block";
      this.finishedEl.innerHTML = `
        <div class="celebration-box">
          <span class="celebration-icon">🎉 🧸 💛</span>
          <h3 class="celebration-title">¡Hoy celebramos la llegada de ${this.babyName}!</h3>
          <p class="celebration-sub">Gracias por acompañarnos y llenar este día de alegría y bendiciones.</p>
        </div>
      `;
    }
  }
}
