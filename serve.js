/**
 * ====================================================================
 * SERVIDOR LOCAL RÁPIDO CON NODE.JS (CERO DEPENDENCIAS)
 * ====================================================================
 * Garantiza tipos MIME estándar y soporte completo para ES Modules.
 *
 * Uso:
 *   node serve.js
 * Luego abre en tu navegador:
 *   http://localhost:8080
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=UTF-8",
  ".js": "application/javascript; charset=UTF-8",
  ".mjs": "application/javascript; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".svg": "image/png+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".json": "application/json",
  ".txt": "text/plain; charset=UTF-8"
};

const server = http.createServer((req, res) => {
  // Manejo de URL y ruta de archivo
  let reqPath = decodeURI(req.url.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(BASE_DIR, safePath);

  // Seguridad: evitar directory traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("403 Prohibido");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8" });
      res.end(`404 No encontrado: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*"
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log(" 🍼 INVITACIÓN DIGITAL BABY SHOWER THIAGO 💛");
  console.log(` Servidor local activo en: http://localhost:${PORT}`);
  console.log(" MIME type para .js: application/javascript [OK]");
  console.log(" Presiona Ctrl + C para detener el servidor.");
  console.log("=".repeat(60) + "\n");
});
