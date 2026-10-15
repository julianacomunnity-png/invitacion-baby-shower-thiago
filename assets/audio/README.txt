MÚSICA PARA LA INVITACIÓN DIGITAL DE THIAGO
============================================

Para agregar la canción solicitada ("Te esperaba" — Carlos Rivera) o cualquier melodía elegida:

1. Coloca tu archivo de audio en esta carpeta con el nombre:
   te-esperaba.mp3

2. En el archivo 'js/config.js', asegúrate de que la variable 'musicUrl' apunte a:
   musicUrl: "assets/audio/te-esperaba.mp3"

3. Si dejas 'musicUrl' vacío o el archivo no está presente, el sitio web activará automáticamente
   un sintetizador armónico Web Audio integrado ("Caja de música de cuna").
   De esta forma la invitación siempre tendrá música tierna y relajante activa al abrirse,
   sin provocar errores de archivo ni enlaces rotos.
