/**
 * ====================================================================
 * CONFIGURACIÓN CENTRALIZADA - BABY SHOWER THIAGO
 * ====================================================================
 * Todos los textos, enlaces, fechas y detalles del evento se gestionan
 * desde este archivo. Cero emojis en los datos.
 */

export const EVENT_CONFIG = {
  // Información Principal del Bebé y Evento
  BABY_NAME: "Thiago",
  EVENT_TYPE: "Baby Shower",
  WELCOME_PHRASE: "Hay una nueva aventura por comenzar...",
  EMOTIONAL_STORY: "Familia y amigos, nuestro corazón está lleno de felicidad porque pronto llegará a nuestras vidas el más grande amor. Con mucha ilusión queremos compartir contigo la dulce espera y celebrar juntos la llegada de nuestro pequeño Thiago.",

  // Fecha y Hora del Evento (Formato Estricto Editorial: 8 DE NOVIEMBRE / DOMINGO / 3:00 PM)
  EVENT_DATE_DISPLAY: "8 DE NOVIEMBRE",
  EVENT_DAY_DISPLAY: "DOMINGO",
  EVENT_TIME_DISPLAY: "3:00 PM",

  // Campos complementarios para compatibilidad
  EVENT_DAY_NAME: "DOMINGO",
  EVENT_TIME: "3:00 PM",

  // Ubicación Definitiva del Evento (Exacta y Verificada)
  EVENT_VENUE_NAME: "Conjunto Residencial Cerritos Campestre — Salón Social",
  EVENT_ADDRESS: "", // No se añaden direcciones postales extras ni coordenadas inventadas
  GOOGLE_MAPS_URL: "https://maps.app.goo.gl/pk8UHGjQaXqT3aDD9",
  LOCATION_INSTRUCTIONS: "Contamos con parqueadero privado y zona verde para compartir una hermosa tarde campestre.",

  // Enlace Oficial Definitivo de WhatsApp
  WHATSAPP_URL: "https://wa.link/j0x1dj",
  WHATSAPP_BTN_TEXT: "CONFIRMAR ASISTENCIA",
  RSVP_DEADLINE_TEXT: "Agradecemos confirmar tu asistencia con anticipación.",

  // Archivo MP3 Oficial ("Te Esperaba" — Carlos Rivera)
  MUSIC_FILE: "assets/audio/te-esperaba.mp3",
  MUSIC_TITLE: "Te Esperaba — Carlos Rivera",
  AUTO_PLAY_ON_OPEN: true,

  // PIN de seguridad para el panel privado de papitos (Ctrl + Shift + A o #admin)
  ADMIN_PIN: "1234",

  // Despedida Editorial
  CLOSING_PHRASE_1: "Gracias por acompañarnos en este momento tan especial.",
  CLOSING_PHRASE_2: "Te esperamos con todo el amor para celebrar la llegada de THIAGO.",
  CLOSING_SIGNATURE: "Con amor, Thiago"
};

/**
 * ====================================================================
 * LISTA DE REGALOS ORGANIZADA POR CATEGORÍAS (5 CATEGORÍAS COMPLETAS)
 * ====================================================================
 * Se muestra dentro del modal emergente al pulsar "VER LISTA DE REGALOS".
 * Todos los productos han sido incluidos sin omisiones ni alteraciones.
 */
export const GIFT_CATEGORIES = [
  {
    id: "cat_aseo",
    name: "Aseo y Cuidado del Bebé",
    type: "bath",
    items: [
      { name: "Bañera plegable con termómetro" },
      { name: "Lima eléctrica para bebé" },
      { name: "Kit de aseo" },
      { name: "Aspiradores nasales" },
      { name: "Nebulizador para bebé" },
      { name: "Pañitos húmedos sin alcohol" },
      { name: "Pañales a partir de la etapa 2" },
      { name: "Cambiador portátil" },
      { name: "Cepillo eléctrico para limpiar teteros" },
      { name: "Esterilizador de teteros" },
      { name: "Organizador de pañales" },
      { name: "Toallas para después del baño" },
      { name: "Baberos" }
    ]
  },
  {
    id: "cat_alimentacion",
    name: "Alimentación y Lactancia",
    type: "feeding",
    items: [
      { name: "Tetero Thyseed, disponible para buscar en Amazon, o tetero Philips Avent" },
      { name: "Bolsas recolectoras de leche" },
      { name: "Copas recolectoras de leche de silicona" },
      { name: "Pezoneras de plata" },
      { name: "Crema de lanolina" }
    ]
  },
  {
    id: "cat_estimulacion",
    name: "Estimulación y Desarrollo",
    type: "toys",
    items: [
      { name: "Gimnasio para bebé" },
      { name: "Juegos de estimulación visual en blanco y negro" }
    ]
  },
  {
    id: "cat_descanso",
    name: "Descanso, Movilidad y Seguridad",
    type: "comfort",
    items: [
      { name: "Mecedora eléctrica" },
      { name: "Cámara de vigilancia para bebé" },
      { name: "Portabebé" },
      { name: "Fular portabebé" },
      { name: "Saco para dormir" },
      { name: "Almohada antirreflujo" },
      { name: "Cojín de lactancia" },
      { name: "Sleeping para dormir" }
    ]
  },
  {
    id: "cat_ropa",
    name: "Ropa y Textiles",
    type: "clothes",
    items: [
      { name: "Ropa para bebé de 3 a 6 meses" },
      { name: "Semanario de ropa de 0 a 3 meses, sin los días de la semana" },
      { name: "Enterizos" },
      { name: "Mantas" }
    ]
  }
];

// Compatibilidad con arreglos planos
export const GIFTS = GIFT_CATEGORIES.flatMap((cat) =>
  cat.items.map((item, idx) => ({
    id: `${cat.id}_${idx + 1}`,
    name: item.name,
    category: cat.name,
    type: cat.type
  }))
);
