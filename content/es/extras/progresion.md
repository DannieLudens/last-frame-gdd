# Progresión visual

Cómo pasó el juego de primitivas a arte final, con las iteraciones y las opciones descartadas. Ningún asset aparece de la nada: cada etapa muestra de dónde vino.

## Del playground al juego

```etapas
Playground con primitivas | [[Fecha]]
Exploración de arte | [[Fecha]]
Imagen objetivo | [[Fecha]] | hito
Greybox del nivel | [[Fecha]]
Primer pase de arte | [[Fecha]]
Alpha | [[Fecha]] | hito
Beta | [[Fecha]] | hito
```

## Mecánicas: playground con primitivas

Las mismas tomas, desde las cámaras fijas `CaptureCam_NN` de cada escena. Arrastra el control para comparar.

```antes-despues
assets/img/progresion/playground-01.png | assets/img/progresion/beta-01.png | [[Toma 01: playground (fecha) frente a Beta (fecha)]]
```

## Exploración de arte

Opciones que se consideraron y por qué se eligió una.

```galeria
assets/img/progresion/estilo-opcion-a.png | [[Opción A: por qué no]]
assets/img/progresion/estilo-opcion-b.png | [[Opción B: por qué no]]
assets/img/progresion/estilo-opcion-c.png | [[Opción C: la elegida y por qué]]
```

## Iteraciones del personaje

```galeria
assets/img/progresion/personaje-v1.png | [[v1: boceto]]
assets/img/progresion/personaje-v2.png | [[v2: qué cambió]]
assets/img/progresion/personaje-v3.png | [[v3: versión final]]
```

## El nivel: greybox, pase de arte y pulido

```antes-despues
assets/img/progresion/nivel-greybox.png | assets/img/progresion/nivel-alpha.png | [[Greybox frente a Alpha]]
assets/img/progresion/nivel-alpha.png | assets/img/progresion/nivel-beta.png | [[Alpha frente a Beta: cambios por comentarios de testers]]
```

## Registro de etapas

| Etapa | Fecha | Qué cambió | Por qué |
| --- | --- | --- | --- |
| Playground | [[Fecha]] | [[Mecánicas con primitivas]] | [[Probar antes de producir arte]] |
| Imagen objetivo | [[Fecha]] | [[Estilo definido]] | [[Congelar la identidad]] |
| Primer pase de arte | [[Fecha]] | [[Qué]] | [[Por qué]] |
| Alpha | [[Fecha]] | [[Qué]] | [[Por qué]] |
| Beta | [[Fecha]] | [[Qué]] | [[Por qué]] |

> [!nota] Cómo capturar: siempre desde las cámaras fijas `CaptureCam_NN`, a 1920 × 1080; clips con Unity Recorder; cada versión de arte en un archivo aparte (`Player_v1`, `Player_v2`). Nombres: `AAAA-MM-DD_Etapa_Tema_NN.png`.
