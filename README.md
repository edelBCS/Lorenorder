# Lore & Order

Splash site for **Lore & Order**, a travelling booth bringing handcrafted
dice, tabletop accessories, and one-shot adventures to cons, festivals,
and ren-fairs &mdash; run by avid players, for players.

## What's here

A single-page static site:

- `index.html` &mdash; structure and content
- `styles.css` &mdash; theming (dark fantasy, gold + burgundy)
- `events.js` &mdash; loads the upcoming-events list from a Google Sheet

No build step. Open `index.html` in a browser, or serve the directory
with anything (`python3 -m http.server`, GitHub Pages, etc.).

## Updating the upcoming-events list (no code required)

The "Where to find the booth" section reads from a Google Sheet so the
schedule can be updated from any device (phone, tablet, laptop).

**One-time setup:**

1. Make a Google Sheet with these column headers in row 1 (exact spelling):

   | Date | Event | Location | Notes |
   | --- | --- | --- | --- |

   Format the **Date** column as a date (`Format` → `Number` → `Date`).
2. **Share → "Anyone with the link" → Viewer.**
3. Copy the sheet's ID out of its URL &mdash; the long string between
   `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
   ```
4. Open `events.js` and paste it into the `SHEET_ID` line at the top:
   ```js
   const SHEET_ID = "paste-it-here";
   ```
5. Commit/push (or edit the file in the GitHub web editor). One-time only.

**After that, just edit the sheet.** Add rows, change dates, delete past
events &mdash; the site picks up the changes the next time someone loads
the page.

Past dates are hidden automatically. Rows are sorted by date.

## Other things to edit

- **Contact email** &mdash; change the `mailto:` link in the contact
  section of `index.html` (currently placeholder
  `hello@loreandorder.example`).
- **Hero tagline / About copy** &mdash; both live near the top of
  `index.html`.
- **Wares cards** &mdash; the three cards (Dice, Accessories, One-Shots)
  live inside the `.wares-grid` block.
