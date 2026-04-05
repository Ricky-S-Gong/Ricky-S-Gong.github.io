# Website Project Instructions

## Deployment Discipline

- Any change that affects frontend rendering must be pushed to `main` and confirmed live on GitHub Pages before reporting completion.
- For changes to `index.html`, `styles.css`, `script.js`, or referenced static assets, bump the query-string version in `index.html` and the `assetVersion` constant in `script.js`.
- After every push, wait for the latest GitHub Pages workflow to complete successfully before telling the user the change is live.
- If a visual change appears not to have taken effect, assume cache first: bump versions again rather than guessing.

## Homepage Portrait

- The homepage portrait must preserve a professional folded-arms composition.
- Prefer adjusting CSS framing before regenerating or editing image assets.
- Do not create new portrait variants unless the user explicitly asks for image editing.
