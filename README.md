# Invitación Digital Interactiva Editorial — Baby Shower Thiago

Una experiencia web de invitación digital interactiva, editorial, emotiva y de alta gama creada para el **Baby Shower de Thiago**, inspirada en la estética artesanal de un folleto/cuento ilustrado (naturaleza, tarros de miel, abejitas juguetonas, tonos crema y dorados, libre de cajas rígidas) y diseñada principalmente para visualizarse en teléfonos celulares (Mobile-First) y centrada con marco en computadores de escritorio.

---

## Características Principales

1. **Apertura de Sobre Artesanal Físico (Hero Reveal):**
   - Sobre interactivo tridimensional con textura de papel kraft, solapa triangular superior abatible y sello de cera dorada artesanal con monograma y botón: **"VER INVITACIÓN"**.
   - Al tocar el sello o el botón, la solapa triangular se abre con animación suave y se inicia automáticamente la música de fondo.

2. **Música de Fondo Real ("Te Esperaba" — Carlos Rivera):**
   - Reproduce el archivo de audio MP3 `assets/audio/te-esperaba.mp3` utilizando `HTMLAudioElement`.
   - Reproductor flotante persistente con iconos vectoriales SVG limpios de reproducir/pausar y barras de ecualizador activas.
   - Libre de emojis en controles e interfaz.

3. **Lienzo Editorial Continuo (Brochure Sheet):**
   - La experiencia se lee como una sola hoja de papel artesanal continua (`#FFFCF4`) con textura de algodón y divisores botánicos sutiles, no como una cuadrícula de cajas web genéricas.
   - Ilustración vectorial exclusiva en formato SVG del osito con globo y miel.
   - Abejitas animadas flotando con trayectorias suaves en CSS.
   - Mensaje poético de bienvenida y dulce espera.

4. **Fecha, Día y Hora (Formato Estricto Editorial):**
   - Visualización tipográfica pura y limpia:
     ```
     8 DE NOVIEMBRE
     DOMINGO
     3:00 PM
     ```
   - Sin año 2026, sin reloj digital y sin cuenta regresiva.

5. **Ubicación & Google Maps:**
   - Bloque de lugar de encuentro con icono SVG minimalista y botón *"VER UBICACIÓN"*.
   - Configurable en `js/config.js` sin inventar direcciones falsas.

6. **Confirmación Oficial por WhatsApp (RSVP):**
   - Botón principal: **"CONFIRMAR ASISTENCIA"**.
   - Abre directamente el enlace oficial definitivo: **https://wa.link/j0x1dj**.
   - Formulario elegante que registra el nombre en la lista local de invitados antes de abrir WhatsApp.

7. **Lista de Regalos en Modal Elegante:**
   - En el brochure se presenta un bloque compacto con el botón **"VER LISTA DE REGALOS"**.
   - Al hacer clic, abre un modal con sugerencias categorizadas e iconos vectoriales limpios (cuidado diario, vestuario, higiene, alimentación, juguetes y mantas).
   - Totalmente libre de referencias bancarias, números de cuenta o transferencias.

8. **Panel Privado de Invitados (Control de Papitos):**
   - Acceso seguro mediante PIN (por defecto: `1234`) desde el pie de página o atajo `Ctrl + Shift + A`.
   - Consulta de confirmados, acompañantes, copia al portapapeles y descarga de archivo CSV (Excel).

9. **Purga Total de Emojis:**
   - Todo el proyecto utiliza iconos vectoriales SVG limpios y tipografía editorial cuidada.

---

## Cómo Probar Localmente

Dado que el proyecto utiliza módulos de JavaScript estándar (`ES Modules`), debe servirse mediante un servidor HTTP local. Hemos incluido el script `serve.js` con Node.js (cero dependencias externas) que configura automáticamente los tipos MIME estándar para Windows:

```bash
cd C:\Users\boda\.gemini\antigravity\scratch\invitacion-baby-shower-thiago
node serve.js
```

Luego abre tu navegador en:
```
http://localhost:8080
```

---

## Personalización en `js/config.js`

Abre `js/config.js` para modificar cualquier dato del evento:

```javascript
export const EVENT_CONFIG = {
  BABY_NAME: "Thiago",
  EVENT_DATE_DISPLAY: "8 DE NOVIEMBRE",
  EVENT_DAY_DISPLAY: "DOMINGO",
  EVENT_TIME_DISPLAY: "3:00 PM",

  // 1. Asigna tu ubicación y Google Maps cuando estén confirmados:
  EVENT_VENUE_NAME: "Salón Campestre Los Robles",
  EVENT_ADDRESS: "Dirección exacta del evento",
  GOOGLE_MAPS_URL: "https://maps.app.goo.gl/TU_ENLACE",

  // 2. Enlace oficial de WhatsApp:
  WHATSAPP_URL: "https://wa.link/j0x1dj",
  WHATSAPP_BTN_TEXT: "CONFIRMAR ASISTENCIA",

  // 3. Archivo MP3 local:
  MUSIC_FILE: "assets/audio/te-esperaba.mp3",

  // 4. PIN de administración privada:
  ADMIN_PIN: "1234"
};
```

---

## Publicación y Despliegue en 1 Enlace

Para compartir un **único enlace** por WhatsApp (ejemplo: `tudominio.com/thiago`):

1. **Vercel / Netlify / GitHub Pages:**
   - Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop) o vincúlala a GitHub con Pages.
2. **Hosting Tradicional (cPanel / Apache / Nginx):**
   - Sube todos los archivos a la carpeta `public_html` o al subdirectorio `/thiago`.
3. Al compartir el enlace en WhatsApp, se mostrará automáticamente el título:
   **Baby Shower Thiago** con la descripción y preview configurados.
