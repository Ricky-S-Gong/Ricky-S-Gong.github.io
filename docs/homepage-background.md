# Shared site cloud sea

Every section and project detail page uses the selected cached cloud sea and the existing Blue Whale model's native swimming clip. The fixed flight path leaves both edges and moves between close and distant positions. The static poster is rendered from the same scene and appears before the module loads.

The shared `site-background.js` controller loads `home-sky.js` after the first paint. Navigation keeps the same scene running. Background tabs pause; reduced-motion preferences and data-saving connections keep the static poster. WebGL failure falls back to the poster. Cloud lighting is cached and recomputed only for a visible resize, with a short debounce. There are no homepage motion or credit controls; asset attribution appears in Contact.

Cards share a pale surface at 82% opacity, dark ink and green/blue/copper role highlights. The bilingual homepage summary has three bullets, ordered AIE, MLE / Modelling DS, Product DS, based on the AI/MLE and Product DS resumes updated October 26, 2026.

Run `node tests/home-background.test.mjs`. Browser checks cover desktop and mobile layouts, language switching, shared navigation background, project details and static fallback.

## New asset credits

- `assets/sky/blue-whale.glb`: **Blue Whale - Textured**, Bohdan Lvov, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [original model](https://sketchfab.com/3d-models/blue-whale-textured-d24d19021c724c3a9134eebcb76b0e0f). Retrieved through [open-water](https://github.com/bob6664569/open-water) at commit `285b6ce32057c70191a7fe16c31d979fa383ac64`. The model and native animation data are unchanged. The site adds lighting, scaling and a flight path. The static posters are renders of this same scene. Attribution is available in the Contact section and `assets/sky/WHALE-LICENSE.txt`.
- `assets/sky/cloud.png`: [pmndrs/assets cloud texture](https://github.com/pmndrs/assets/blob/main/src/textures/cloud.png), CC0-1.0. Full license: `assets/sky/CLOUD-CC0-LICENSE.txt`.
- `assets/vendor/three/`: Three.js r170, GLTFLoader and BufferGeometryUtils, MIT. Full license: `assets/vendor/three/LICENSE`.

No live-action footage, generated video, randomized route, or experimental replacement cloud engine is included.
