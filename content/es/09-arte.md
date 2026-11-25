# Arte visual

El detalle completo va en el sistema de diseño del proyecto: [[enlace, si existe]]. Aquí va el resumen que necesita un lector externo.

## Estilo

3D con cámara cenital (top-down) y look de caricatura con sombreado toon (Flat Kit). El estudio y la protagonista se ven hechos a mano: trazo de lápiz, colores desparejos, madera y papel. Los enemigos de IA se ven brillantes, simétricos y genéricos. [[Luz, ánimo e imagen objetivo.]]

```galeria
assets/img/arte/imagen-objetivo.png | Imagen objetivo: la referencia de todo el arte
assets/img/arte/moodboard.png | Moodboard del equipo
```

## Paleta

Paleta opción protagonista B. Es la misma que usa este GDD (`assets/css/tokens.css`).

```colores
Azul pizarra | #687589 | Chaqueta de la protagonista
Ladrillo apagado | #A65F45 | Pantalón de la protagonista
Nogal | #65483D | Piso, mesas de dibujo y cajas
Ciruela oscura | #302A38 | Sombras bajo los muebles y zonas de sigilo
Verde humo | #66736A | Decorados pintados al fondo del estudio
Café tinta | #251E23 | Fondo del menú, placas del HUD y texto sobre el botón mostaza
Marfil | #F1DFC0 | Título, contadores y borde del botón Opciones
Mostaza | #D5A34F | Botón Jugar y selección activa
Latón claro | #E2BD73 | Cinta coleccionable y su ícono en el HUD
Ámbar | #D99C52 | Cono de vigilancia translúcido
Rojo apagado | #D26361 | Luz de la cámara cuando detecta a la protagonista
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

| Categoría | Forma base | Lo que comunica |
| --- | --- | --- |
| Jugador | [[Forma]] | [[Mensaje]] |
| Peligro | [[Triángulos, puntas]] | Amenaza |
| Recompensas | [[Círculos, curvas]] | Algo bueno |
| Escenario sólido | [[Bloques]] | Se puede pisar |

## Interfaz (UI y HUD)

Menú principal: un escenario de teatro con telón rojo y un aro de bombillos alrededor. Los botones son manchas de tinta con texto en DynaPuff: Jugar en mostaza (la opción activa, con la pluma al lado) y Opciones y Salir en café tinta. Este GDD usa el mismo aro y las mismas manchas.

```marquesina
assets/img/ui/menu-principal-exploracion.jpg | Exploración del menú principal. [[Cambiar el título "Caricaturas Canceladas" por Last Frame.]]
```

> [!ia] [[Confirmar si esta imagen se hizo con IA.]] Si es así, es exploración de estilo y no un asset final, según la política de IA del equipo.

```galeria
assets/img/ui/hud.png | [[HUD: cinta (0/1), tinta (x/5), vidas]]
```

## Lista de assets

Formatos, tamaños y nombres según las especificaciones técnicas de arte.

| Asset | Tipo | Formato y tamaño | Animaciones | Responsable | Estado |
| --- | --- | --- | --- | --- | --- |
| [[SPR_Player]] | Personaje | [[PNG, 128 px de alto]] | [[Idle, Run, Jump]] | [[Nombre]] | [[Por hacer]] |
| [[Tileset del nivel 1]] | Entorno | [[PNG 32 px]] | — | [[Nombre]] | [[Por hacer]] |
| [[Ítem]] | Objeto | [[PNG]] | [[Brillo]] | [[Nombre]] | [[Por hacer]] |
| [[Botón base]] | UI | [[PNG 9-slice]] | [[Hover, Pressed]] | [[Nombre]] | [[Por hacer]] |

## Material promocional

| Pieza | Formato | Dónde se usa |
| --- | --- | --- |
| Logo | Color, monocromo, fondo claro y oscuro | Juego, itch.io, deck |
| Key art | 16:9 y vertical | Portada de itch.io, deck, este GDD |
| Capturas | 1920 × 1080 sin UI de depuración | itch.io, deck |
| Video de gameplay | 30 a 60 s | itch.io, pitch |
