# Comunicación con el jugador

Cómo recibe el jugador la información. La regla general: lo dibujado a mano (trazo de lápiz, papel) pertenece a la protagonista, y lo brillante y perfecto pertenece al enemigo.

## Lenguaje visual

| Qué debe entender el jugador | Cómo se comunica |
| --- | --- |
| Estoy escondida o expuesta | En la sombra se ve en tonos apagados; bajo un reflector, con contorno brillante. Un ícono de ojo en el HUD se abre a medida que es más visible. |
| Un enemigo me busca | Símbolo dibujado sobre el enemigo: nada mientras patrulla, "?" cuando investiga y "!" cuando persigue. Su cono de visión se dibuja en el suelo con trazo de lápiz. |
| Hice ruido | Ondas de garabato en el suelo, del tamaño del radio del ruido. Así el jugador aprende qué tan lejos se oye correr, pisar virutas o disparar. |
| Estoy dejando rastro | Gotas de tinta berenjena en el suelo que se secan y desaparecen en unos 6 segundos. El HUD muestra que la protagonista sangra tinta mientras dure. |
| Una cámara me va a ver | Cono de luz ámbar visible en el suelo. Antes de la alarma se pone rojo medio segundo para dar tiempo de reaccionar. |
| Esto se puede recoger o usar | La cinta y los tinteros flotan y brillan con trazo de lápiz. Los escondites y el carrito muestran un contorno al acercarse. |

## Feedback por evento

| Evento | Visual | Sonido | Cámara / tiempo |
| --- | --- | --- | --- |
| Recoger la cinta | Cuadro del recuerdo (o animación corta) | [[SFX]] | Pausa breve mientras se ve el recuerdo |
| Recibir golpe | Salpicadura de tinta y rastro | [[SFX]] | Sacudida corta |
| Ser borrada | [[VFX de borrado]] | [[SFX]] | Reinicio de la sala |
| Ganar el nivel | Carrito al siguiente set | [[SFX]] | [[Cámara]] |

## HUD

Arriba: la cinta del nivel (0/1) y la tinta (x/5). Las vidas se muestran como bocetos de la protagonista. En el set final aparece la barra de vida de El Reemplazo. En el nivel 1, letreros pintados a mano enseñan los controles sin pausar el juego.
