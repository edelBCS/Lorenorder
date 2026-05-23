# Lore & Order

Splash site for **Lore & Order**, a travelling booth bringing handcrafted
dice, tabletop accessories, and pop-up D&D one-shots to cons, festivals,
and ren-fairs.

## What's here

A single-page static site:

- `index.html` &mdash; structure and content
- `styles.css` &mdash; theming (dark fantasy, gold + burgundy)

No build step. Open `index.html` in a browser, or serve the directory
with anything (`python3 -m http.server`, `npx serve`, GitHub Pages, etc.).

## Editing

- **Tour dates** &mdash; update the `.tour-list` block in `index.html`.
  Duplicate the `.tour-item` for each new stop and fill in `tour-month`
  / `tour-day` plus the event name and details.
- **Contact email** &mdash; change the `mailto:` link in the contact
  section. Currently a placeholder (`hello@loreandorder.example`).
- **Wares** &mdash; the three cards (Dice, Accessories, One-Shots) live
  inside the `.wares-grid` block.
