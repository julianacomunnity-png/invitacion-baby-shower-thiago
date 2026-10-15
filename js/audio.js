/**
 * ====================================================================
 * GESTOR DE AUDIO & REPRODUCTOR FLOTANTE
 * ====================================================================
 * Reproduce el archivo MP3 real ("Te Esperaba" — Carlos Rivera)
 * utilizando HTMLAudioElement, respetando las políticas de interacción
 * e iniciando automáticamente tras pulsar "VER INVITACIÓN".
 * Totalmente libre de emojis; utiliza iconos vectoriales SVG limpios.
 */

const SVG_NOTE_PLAYING = `
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M9 18V5l12-2v13"></path>
  <circle cx="6" cy="18" r="3"></circle>
  <circle cx="18" cy="16" r="3"></circle>
</svg>`;

const SVG_NOTE_PAUSED = `
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M9 18V5l12-2v13"></path>
  <circle cx="6" cy="18" r="3"></circle>
  <circle cx="18" cy="16" r="3"></circle>
  <line x1="2" y1="2" x2="22" y2="22"></line>
</svg>`;

export class MusicManager {
  constructor(config) {
    this.config = config;
    this.audioSrc = config.MUSIC_FILE || "assets/audio/te-esperaba.mp3";
    this.audioElement = null;
    this.isPlaying = false;
    this.buttonElement = null;
    this.waveElement = null;
  }

  init() {
    this.buttonElement = document.getElementById("musicToggleBtn");
    this.waveElement = document.getElementById("musicWaveIndicator");

    if (this.buttonElement) {
      this.buttonElement.addEventListener("click", () => this.toggle());
    }

    // Instanciar elemento de audio nativo HTML5
    this.audioElement = new Audio();
    this.audioElement.src = this.audioSrc;
    this.audioElement.loop = true;
    this.audioElement.preload = "auto";

    // Eventos de estado de audio
    this.audioElement.addEventListener("play", () => {
      this.isPlaying = true;
      this.updateUI(true);
    });

    this.audioElement.addEventListener("pause", () => {
      this.isPlaying = false;
      this.updateUI(false);
    });

    this.audioElement.addEventListener("error", () => {
      console.warn("Aviso de audio:", this.audioElement.error?.message || "Archivo de audio no disponible.");
    });
  }

  async play() {
    if (!this.audioElement) return;

    try {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isPlaying = true;
        this.updateUI(true);
      }
    } catch (err) {
      console.info("Autoplay condicionado a interacción del usuario.", err);
      this.isPlaying = false;
      this.updateUI(false);
    }
  }

  pause() {
    if (!this.audioElement) return;
    this.audioElement.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (!this.buttonElement) return;

    const iconSpan = this.buttonElement.querySelector(".music-icon");
    const labelSpan = this.buttonElement.querySelector(".music-label");

    if (playing) {
      this.buttonElement.classList.add("is-playing");
      this.buttonElement.setAttribute("aria-label", "Pausar música de fondo");
      if (iconSpan) iconSpan.innerHTML = SVG_NOTE_PLAYING;
      if (labelSpan) labelSpan.textContent = "Música";
      if (this.waveElement) this.waveElement.classList.add("active");
    } else {
      this.buttonElement.classList.remove("is-playing");
      this.buttonElement.setAttribute("aria-label", "Reproducir música de fondo");
      if (iconSpan) iconSpan.innerHTML = SVG_NOTE_PAUSED;
      if (labelSpan) labelSpan.textContent = "Pausa";
      if (this.waveElement) this.waveElement.classList.remove("active");
    }
  }
}
