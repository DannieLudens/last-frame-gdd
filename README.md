# Last Frame: GDD web

Game Design Document de **Last Frame**, de The Strokes (proyecto final, Generation Jr Unity Developer). Se publica con GitHub Pages, se lee en español (inglés después) y se descarga como PDF o Markdown.

Es un documento vivo: el contenido viene del Google Doc del equipo y se va pasando aquí a medida que se llena. Los campos `[[así]]` son los que faltan; el índice los cuenta por sección.

## Identidad

- Paleta: opción protagonista B, en `assets/css/tokens.css` (variables `--lf-*`).
- Fuentes: Caprasimo (título del juego) y DynaPuff (botones y títulos de sección), guardadas en `assets/fonts` con su licencia OFL. El texto largo usa Atkinson Hyperlegible.
- Marquesina: el aro de bombillos del menú principal rodea la portada. Para enmarcar una imagen con él, usa el bloque ` ```marquesina ` con líneas `ruta | pie de foto`.
- Manchas de tinta: los títulos de sección y los botones Descargar e idioma son manchas como Jugar y Opciones. Las formas están en `assets/img/ui/mancha-a.svg`, `-b` y `-c`.
- Colores con nombre y uso: bloque ` ```colores ` con líneas `Nombre | #hex | uso`.

## Publicar en GitHub Pages

1. En el repositorio de la plantilla: **Use this template > Create a new repository** (por ejemplo `last-frame-gdd`).
2. Clona el repositorio nuevo y reemplaza su contenido con esta carpeta. Haz commit y push.
3. **Settings > Pages > Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. En uno o dos minutos queda en `https://<usuario>.github.io/last-frame-gdd/`.

Para verlo en tu computador: `python -m http.server` dentro de la carpeta y abre `http://localhost:8000`.

## Estructura

```
index.html                 página (no hace falta tocarla)
assets/css/tokens.css      IDENTIDAD: paleta, fuentes, radio, key art
assets/fonts/              Caprasimo, DynaPuff y Atkinson Hyperlegible (OFL)
assets/css/gdd.css         diseño del sitio (solo usa variables de tokens.css)
assets/css/print.css       diseño del PDF
assets/js/gdd.js           carga las secciones, idiomas y descargas
assets/js/vendor/          marked (Markdown) y mermaid (diagramas), con sus licencias
assets/img/                key art, capturas, bocetos
content/config.json        datos del documento y orden de secciones
content/es/*.md            secciones principales del GDD
content/es/extras/*.md     secciones opcionales
content/en/                traducciones revisadas (mismo nombre de archivo)
```

## Identidad visual

Todo el aspecto sale de `assets/css/tokens.css`:

- Paleta por roles: `--color-dominante`, `--color-secundario`, `--color-acento`, `--color-peligro`, `--color-interactuable`, `--color-panel`, `--color-texto`, `--color-texto-2`, `--color-linea` y `--color-sobre-acento` (texto encima del acento).
- Fuentes: la URL de Google Fonts, `--font-display` y `--font-body`.
- Forma: `--radius` (0 para esquinas rectas).
- Portada: `--portada-imagen: url('../img/key-art.jpg');`.
- PDF: `--pdf-fondo`, `--pdf-texto` y compañía, para las páginas claras.


## Configuración

`content/config.json`:

| Campo | Qué es |
| --- | --- |
| `titulo` | Nombre del juego o proyecto |
| `tipo` | Lo que aparece en la portada, por idioma. Ej. "Game Design Document", "Documento de proyecto" |
| `siglas` | Texto corto junto al título en la barra y en los nombres de archivo. Ej. "GDD" |
| `pitch` | Frase de la portada (texto o `{ "es": "…", "en": "…" }`) |
| `estudio`, `equipo`, `version`, `fecha` | Datos de la portada |
| `logo` | Ruta a un logo para la portada (opcional) |
| `idiomas`, `idiomaBase` | Idiomas disponibles y el idioma original |
| `pdf` | Ruta a un PDF ya generado por idioma (opcional) |
| `secciones` | Orden de las secciones: `id`, `archivo` y, si quieres, `etiqueta` |

`etiqueta` muestra una marca junto al título de la sección (texto o por idioma). Las secciones de `extras/` vienen marcadas "Opcional".

## Secciones

**Principales** (`content/es/`): resumen, jugabilidad, historia, personajes, niveles, comunicación con el jugador, cinemáticas, aspectos técnicos, desarrollo, arte visual, audio, monetización, alcance, cronograma e historial de versiones.

**Opcionales** (`content/es/extras/`): progresión visual (antes y después, iteraciones), uso de IA, audiencia y analíticas, dirección publicitaria, pruebas con usuarios, mejoras y changelog, wishlist.

Para quitar una sección, borra su línea en `secciones`. Para agregar una, crea el archivo `.md` y añade su línea. El archivo empieza con `# Título`.

**Otros documentos.** Las secciones las define `config.json`, así que la misma plantilla sirve para documentos de un proyecto de AR/VR, un press kit o una propuesta: cambias `tipo`, `siglas` y las secciones.

## Escribir el contenido

Además del Markdown normal (títulos, listas, tablas, enlaces, imágenes):

| Escribes | Se ve como |
| --- | --- |
| `[[texto]]` | Campo por definir (resaltado y contado en el índice) |
| `> [!nota] …` | Aviso (también `[!rubrica]`, `[!ia]`, `[!alerta]`) |
| ` ```pilares ` con líneas `Nombre \| descripción` | Tarjetas de pilares |
| ` ```paleta ` vacío | Muestras de color leídas de `tokens.css` |
| ` ```tipografia ` vacío | Muestra de las dos fuentes |
| ` ```etapas ` con líneas `Nombre \| detalle \| hito` | Pasos en línea; `hito` los resalta |
| ` ```antes-despues ` con líneas `antes.png \| despues.png \| pie` | Comparador con control deslizante |
| ` ```galeria ` con líneas `imagen.png \| pie` | Galería |
| ` ```mermaid ` | Diagrama (flujo, clases…) con los colores del tema |

Si una imagen todavía no existe, se ve un recuadro "Imagen pendiente" con su ruta.

## Probar en el computador

El sitio lee archivos con `fetch`, así que no funciona con doble clic en `index.html`. Desde la carpeta:

```
python -m http.server 8000
```

y abre `http://localhost:8000` (o usa Live Server en VS Code).

## Publicar en GitHub Pages

1. Sube la carpeta a un repositorio público (por ejemplo `gdd-nombre-del-juego`).
2. **Settings > Pages > Build and deployment > Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En uno o dos minutos queda en `https://<usuario>.github.io/gdd-nombre-del-juego/`.

Usa un repositorio aparte del juego si el de Unity guarda imágenes con Git LFS: GitHub Pages no sirve archivos de LFS.

## Idiomas

- Botones ES / EN. Al entrar, el sitio elige el idioma del navegador o el último elegido; también se puede compartir con `?lang=en`.
- La versión en inglés va en `content/en/` con los mismos nombres de archivo. Mientras falte una sección, se muestra en el idioma base con la etiqueta "Translation pending".
- Para otros idiomas, el sitio declara su idioma, así que Chrome y Edge ofrecen traducir la página.

## Descargas

- **PDF con diseño:** abre la ventana de impresión con portada, índice y páginas con los colores del tema. Elige "Guardar como PDF", tamaño A4. Mejor en Chrome o Edge.
- **Markdown:** todas las secciones del idioma actual en un archivo.
- **PDF publicado:** si subes un PDF y pones su ruta en `pdf` de `config.json`, el menú lo ofrece directamente.

## Licencias de terceros

- [marked](https://github.com/markedjs/marked) (MIT) y [Mermaid](https://github.com/mermaid-js/mermaid) (MIT), en `assets/js/vendor/` con sus licencias.
- Fuentes de Google Fonts con licencia OFL.
