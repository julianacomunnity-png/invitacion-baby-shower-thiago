"""
===================================================================
SERVIDOR LOCAL DE PRUEBAS - BABY SHOWER THIAGO 💛
===================================================================
Garantiza que Windows y Python sirvan los archivos JavaScript (.js)
con el tipo MIME 'application/javascript' requerido por ES Modules.

Uso:
  python serve.py
Luego abre:
  http://localhost:8080
"""

import http.server
import mimetypes
import socketserver
import sys

PORT = 8080

# Registrar explícitamente los MIME types estándar de la web
mimetypes.init()
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("audio/mpeg", ".mp3")


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
  def end_headers(self):
    self.send_header("Access-Control-Allow-Origin", "*")
    self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
    super().end_headers()

  def guess_type(self, path):
    if path.endswith(".js") or path.endswith(".mjs"):
      return "application/javascript"
    if path.endswith(".css"):
      return "text/css"
    if path.endswith(".svg"):
      return "image/svg+xml"
    if path.endswith(".mp3"):
      return "audio/mpeg"
    return super().guess_type(path)


if __name__ == "__main__":
  socketserver.TCPServer.allow_reuse_address = True
  try:
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
      print("\n" + "=" * 60)
      print(" 🍼 INVITACIÓN BABY SHOWER THIAGO 💛")
      print(f" Servidor local activo en: http://localhost:{PORT}")
      print(" MIME type para ES Modules: application/javascript [OK]")
      print(" Presiona Ctrl + C para detener el servidor.")
      print("=" * 60 + "\n")
      httpd.serve_forever()
  except OSError as e:
    # Si el puerto 8080 está en uso, intentar con 8081
    if e.errno == 10048 or "Address already in use" in str(e):
      PORT = 8081
      with socketserver.TCPServer(
          ("", PORT), CustomHTTPRequestHandler
      ) as httpd:
        print(f"\nServidor local activo en: http://localhost:{PORT}")
        httpd.serve_forever()
    else:
      raise e
  except KeyboardInterrupt:
    print("\nServidor detenido por el usuario.")
    sys.exit(0)
