# Arte visual

El detalle completo va en el sistema de diseño del proyecto. Aquí va el resumen que necesita un lector externo.

## Estilo

El estilo gráfico escogido para desarrollar nuestro videojuego es el cartoon clásico, tipo caricatura de los años 80, nos enfocamos en integrar esta estética para Ollie, los props, y el diseño de nivel en general, haciendo que el estudio de televisión y animación esté ambientado en una época clásica en la cual se produjo el auge de las caricaturas en la televisión hechas a mano y con mucho amor e intención.

Los personajes y props 3D se modelan en Blender y se ven en Unity con Flat Kit, que da el sombreado toon y el contorno tipo caricatura, para que todo parezca dibujado.

```galeria
assets/img/arte/moodboard-set-final.png | Moodboard: el set final con El Reemplazo
assets/img/arte/boceto-distribucion-set.png | Boceto de distribución de un set con props
```

## Paleta

Paleta opción protagonista B. Es la misma que usa este GDD (`assets/css/tokens.css`).

```colores
Azul pizarra | #687589 | Chaqueta de Ollie
Ladrillo apagado | #A65F45 | Pantalón de Ollie
Nogal | #65483D | Piso, mesas de dibujo y cajas
Ciruela oscura | #302A38 | Sombras bajo los muebles y zonas de sigilo
Verde humo | #66736A | Decorados pintados al fondo del estudio
Café tinta | #251E23 | Fondo del menú, placas del HUD y texto sobre el botón mostaza
Marfil | #F1DFC0 | Título, contadores y borde del botón Opciones
Mostaza | #D5A34F | Botón Jugar y selección activa
Latón claro | #E2BD73 | Cinta coleccionable y su ícono en el HUD
Ámbar | #D99C52 | Cono de vigilancia translúcido
Rojo apagado | #D26361 | Luz de la cámara cuando detecta a Ollie
Berenjena | #59405C | Tinta de la pluma, rastro e ícono de munición con borde marfil
```

## Tipografía

```tipografia
--font-display | Caprasimo · título y encabezados de pantalla | 400
--font-boton | DynaPuff Bold · botones, etiquetas e indicaciones | 700
```

| Elemento | Fuente | Tamaño |
| --- | --- | --- |
| Título del juego | Caprasimo | 128 px |
| Botones Jugar, Opciones y Salir | DynaPuff Bold | 48 px |
| Encabezados de pantalla como Pausa u Opciones | Caprasimo | 64 px |
| Etiquetas como Volumen y Controles | DynaPuff Bold | 32 px |
| Indicaciones como "Pulsa E para interactuar" | DynaPuff Bold | 24 px |

Las dos fuentes son de Google Fonts con licencia OFL: [DynaPuff](https://fonts.google.com/specimen/DynaPuff) y [Caprasimo](https://fonts.google.com/specimen/Caprasimo). En este GDD el texto largo usa Atkinson Hyperlegible para que se lea cómodo.

## Forma y silueta

Propuesta a partir de los diseños actuales; se confirma con Oscar y Laura.

| Categoría | Forma base | Lo que comunica |
| --- | --- | --- |
| Ollie | Curvas y formas redondeadas, cabello suelto, trazo de lápiz | Cercana y viva, hecha a mano |
| Enemigos de IA | Siluetas rectas y simétricas, líneas perfectas | Fríos, genéricos, sin alma |
| Peligro | Conos de visión y de cámara, triángulos | Zona que no se debe pisar |
| Recompensas | Círculos: carrete de la cinta, tintero, corazón | Algo bueno para recoger |
| Escenario sólido | Bloques: cajas de props, escritorios, telones | Pared o escondite |

## Interfaz (UI y HUD)

El menú principal se presenta como un escenario con cortinas y un marco ovalado iluminado por bombillos. Los botones tienen forma de manchas de tinta, con una variante negra para el estado normal y una dorada para la opción resaltada.

El HUD reúne sus elementos en un contenedor oscuro compartido, tomando como base el marco de los corazones (vida), el ojo (sigilo), el contador de cintas (objetos coleccionables), el tintero (tinta disponible) y la pluma con su tecla **Q**.

```marquesina
assets/img/ui/menu-principal-exploracion.jpg | Exploración del menú principal.
```

```galeria
assets/img/ui/hud-propuesta.jpg | Propuesta del HUD (Laura): corazones, ojo de sigilo, cintas, tintero y pluma con Q
assets/img/ui/botones-mancha.png | Botones de mancha: normal y resaltado
assets/img/ui/menu-boceto-a-propuesta.png | Del boceto en papel a la propuesta del menú principal
```

> [!ia] Las propuestas del menú y del HUD se iteraron con IA como exploración de estilo; no son assets finales.

## Lista de assets

Cómo se producen y se nombran los assets del proyecto.

- **Herramientas:** Photoshop (Ollie, texturas, props 2D, UI), Figma (UI, mockups y sistema de diseño), Blender (modelos 3D de personajes y props), ChatGPT (imágenes de exploración y algunos assets) y Claude (apoyo en redacción de documentación y código).
- **Paquetes de la Unity Asset Store:** Senses 3 (percepción de enemigos), Flat Kit (sombreado toon y contorno tipo caricatura para el trazo de los objetos 3D).
- **Formatos y tamaños:** texturas e ilustraciones en PNG (tentativa de 512, 1024 o 2048 px de lado); sprites de UI en PNG con transparencia (botones mancha en 9-slice); modelos en FBX (1 unidad = 1 metro, pivote en la base); SFX en WAV y música en OGG; fuentes TTF u OTF (Caprasimo y DynaPuff).
- **Nombres:** prefijo por tipo y nombre dentro de los assets de unity en PascalCase:
  - TEX_ (texturas),
  - SPR_ (sprites),
  - MAT_ (materiales),
  - MDL_ (modelos),
  - PF_ (prefabs),
  - UI_,
  - SFX_,
  - MUS_,
  - FNT_ y
  - VFX_.
  - Ejemplo: PF_Enemy_Office, TEX_PropBox_01.
- **Carpetas:** Assets/_Project/Art, Audio, Prefabs, Scenes y Scripts; pruebas personales en Assets/_Sandbox/<nombre>.
- **Uso de IA:** el diseño de los enemigos se hizo con IA (ChatGPT) y así se declara. Los demás assets se hacen a mano. La IA también se usa para revisar código, para buscar referencias, como moodboards o ideas de cómo podrían verse las interfaces. Todo uso de IA se anota en los créditos.

### Personajes

- Boceto inicial de Ollie, utilizamos el estilo cartoon clásico para el diseño de está aventurera de caricatura clásica, añadido a esto, incluimos ropa de chica rebelde para indicar que está en guerra con las imágenes generadas por inteligencia artificial, finalmente, el personaje tiene armas y municiones para dibujar y desdibujar a sus enemigos a su antojo.
- Diseño inicial de los enemigos hechos por la IA, el concepto gráfico de estos personajes se basa en los personajes genéricos diseñados por la IA que se pueden ver hoy en día en anuncios publicitarios, además tienen vestimenta de coworkers y empresarios porque hacen referencia al progreso y la productividad. Es una referencia: el diseño final de los enemigos está por definir.
- El Reemplazo (Jefe final)

Una versión de Ollie creada por IA para ocupar su lugar en el estudio. Conserva su apariencia y empuña una pluma estilográfica como la suya.

### Entorno

- MoodBoard

### Objetos

- Objetos para la construcción de los niveles, props de televisión y cine.
- Objetos para la construcción de los niveles, prop de escritorio de animación cuadro por cuadro.
- Props de construcción para el nivel, cámaras de cine y cintas de cine antiguas.

```galeria
assets/img/arte/props-telon-camara.png | Props: telón, decorados y cámara
assets/img/arte/props-escritorio.png | Props: escritorio de animación
assets/img/arte/props-camara-cintas.png | Props: cámara de cine y cintas
```

### Material promocional

- Poster promocional del videojuego.
- Imagen principal del cover.
- Imagen del banner.
- Contenido de las memorias de Ollie.

### Piezas para la publicación

| Pieza | Formato | Dónde se usa |
| --- | --- | --- |
| Logo | Color, monocromo, fondo claro y oscuro | Juego, itch.io, deck |
| Key art | 16:9 y vertical | Portada de itch.io, deck, este GDD |
| Capturas | 1920 × 1080 sin UI de depuración | itch.io, deck |
| Video de gameplay | 30 a 60 s | itch.io, pitch |
