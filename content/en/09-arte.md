# Visual art

The full detail lives in the project's design system. This is the summary an outside reader needs.

## Style

The art style chosen for the game is the classic 1980s cartoon. We bring this look to Ollie, the props and the level design as a whole, so the TV and animation studio feels set in the classic era when handmade TV cartoons, made with a lot of love and intention, were at their peak.

Characters and 3D props are modeled in Blender and shown in Unity with Flat Kit, which provides the toon shading and the cartoon outline, so everything looks drawn.

```galeria
assets/img/arte/moodboard-set-final.png | Moodboard: the final set with The Replacement
assets/img/arte/boceto-distribucion-set.png | Layout sketch of a set with props
```

## Palette

Protagonist palette option B. It is the same palette this GDD uses (`assets/css/tokens.css`).

```colores
Slate blue | #687589 | Ollie's jacket
Muted brick | #A65F45 | Ollie's pants
Walnut | #65483D | Floor, drawing desks and boxes
Dark plum | #302A38 | Shadows under furniture and stealth zones
Smoke green | #66736A | Painted backdrops at the back of the studio
Ink brown | #251E23 | Menu background, HUD plates and text on the mustard button
Ivory | #F1DFC0 | Title, counters and the Options button border
Mustard | #D5A34F | Play button and active selection
Light brass | #E2BD73 | Collectible tape and its HUD icon
Amber | #D99C52 | Translucent surveillance cone
Muted red | #D26361 | Camera light when it detects Ollie
Eggplant | #59405C | Pen ink, trail and ammo icon with an ivory border
```

## Typography

```tipografia
--font-display | Caprasimo · title and screen headings | 400
--font-boton | DynaPuff Bold · buttons, labels and prompts | 700
```

| Element | Font | Size |
| --- | --- | --- |
| Game title | Caprasimo | 128 px |
| Play, Options and Quit buttons | DynaPuff Bold | 48 px |
| Screen headings such as Pause or Options | Caprasimo | 64 px |
| Labels such as Volume and Controls | DynaPuff Bold | 32 px |
| Prompts such as "Press E to interact" | DynaPuff Bold | 24 px |

Both fonts come from Google Fonts with the OFL license: [DynaPuff](https://fonts.google.com/specimen/DynaPuff) and [Caprasimo](https://fonts.google.com/specimen/Caprasimo). In this GDD, long text uses Atkinson Hyperlegible so it is comfortable to read.

## Shape and silhouette

A proposal based on the current designs; to be confirmed with Oscar and Laura.

| Category | Base shape | What it communicates |
| --- | --- | --- |
| Ollie | Curves and rounded shapes, loose hair, pencil lines | Approachable and alive, handmade |
| AI enemies | Straight, symmetrical silhouettes, perfect lines | Cold, generic, soulless |
| Danger | Vision and camera cones, triangles | An area to stay out of |
| Rewards | Circles: tape reel, inkwell, heart | Something good to pick up |
| Solid scenery | Blocks: prop boxes, desks, curtains | A wall or a hiding spot |

## Interface (UI and HUD)

The main menu is presented as a stage with curtains and an oval frame lit by light bulbs. The buttons are shaped like ink blots, with a black variant for the normal state and a golden one for the highlighted option.

The HUD gathers its elements in a shared dark container, built around the frame of the hearts (health), the eye (stealth), the tape counter (collectibles), the inkwell (available ink) and the pen with its **Q** key.

```marquesina
assets/img/ui/menu-principal-exploracion.jpg | Main menu exploration.
```

```galeria
assets/img/ui/hud-propuesta.jpg | HUD proposal (Laura): hearts, stealth eye, tapes, inkwell and pen with Q
assets/img/ui/botones-mancha.png | Ink-blot buttons: normal and highlighted
assets/img/ui/menu-boceto-a-propuesta.png | From the paper sketch to the main menu proposal
```

> [!ia] The menu and HUD proposals were iterated with AI as style exploration; they are not final assets.

## Asset list

How the project's assets are made and named.

- **Tools:** Photoshop (Ollie, textures, 2D props, UI), Figma (UI, mockups and design system), Blender (3D models of characters and props), ChatGPT (exploration images and some assets) and Claude (help writing documentation and code).
- **Unity Asset Store packages:** Senses 3 (enemy perception) and Flat Kit (toon shading and cartoon outline for the strokes of 3D objects).
- **Formats and sizes:** textures and illustrations in PNG (tentatively 512, 1024 or 2048 px per side); UI sprites in PNG with transparency (ink-blot buttons as 9-slice); models in FBX (1 unit = 1 meter, pivot at the base); SFX in WAV and music in OGG; fonts in TTF or OTF (Caprasimo and DynaPuff).
- **Names:** a prefix by type and the name in PascalCase inside the Unity assets:
  - TEX_ (textures),
  - SPR_ (sprites),
  - MAT_ (materials),
  - MDL_ (models),
  - PF_ (prefabs),
  - UI_,
  - SFX_,
  - MUS_,
  - FNT_ and
  - VFX_.
  - Example: PF_Enemy_Office, TEX_PropBox_01.
- **Folders:** Assets/_Project/Art, Audio, Prefabs, Scenes and Scripts; personal tests in Assets/_Sandbox/<name>.
- **AI use:** the enemy design was made with AI (ChatGPT) and is declared as such. All other assets are made by hand. AI is also used to review code and to look for references, such as moodboards or ideas of how the interfaces could look. Every use of AI is listed in the credits.

### Characters

- Initial sketch of Ollie: we used the classic cartoon style for this classic cartoon adventurer and gave her a rebel-girl outfit to show she is at war with AI-generated images. She also carries weapons and ammo to draw and undraw her enemies at will.
- Initial design of the AI-made enemies: their look is based on the generic AI-designed characters seen in ads today, and they wear coworker and business clothes as a nod to progress and productivity. This is a reference: the final enemy design is still open.
- The Replacement (final boss)

A version of Ollie created by AI to take her place in the studio. It keeps her appearance and holds a fountain pen like hers.

### Environment

- Moodboard

### Objects

- Objects to build the levels: TV and film props.
- Objects to build the levels: a frame-by-frame animation desk prop.
- Level props: film cameras and old film reels.

```galeria
assets/img/arte/props-telon-camara.png | Props: curtain, backdrops and camera
assets/img/arte/props-escritorio.png | Props: animation desk
assets/img/arte/props-camara-cintas.png | Props: film camera and reels
```

### Promotional material

- Promotional poster for the game.
- Main cover image.
- Banner image.
- Content of Ollie's memories.

### Pieces for the release

| Piece | Format | Where it is used |
| --- | --- | --- |
| Logo | Color, monochrome, light and dark background | Game, itch.io, deck |
| Key art | 16:9 and vertical | itch.io cover, deck, this GDD |
| Screenshots | 1920 × 1080 without debug UI | itch.io, deck |
| Gameplay video | 30 to 60 s | itch.io, pitch |
