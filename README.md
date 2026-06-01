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

The "Where to find the booth" section on the site reads from this
Google Sheet:

**[Lore & Order — Events sheet](https://docs.google.com/spreadsheets/d/1cNLeYSCh79JTZcieolJuekDMi0Bl-4KcVM5jTnVC8ag/edit)**

Edit it from any device (iPad, phone, laptop) and the site picks up
your changes the next time someone loads the page &mdash; usually
within a minute.

### How to use it

The sheet has four columns. Row 1 holds the headers; **don't rename or
reorder them.**

| Date | Event | Location | Notes |
| --- | --- | --- | --- |
| 6/14/2026 | Gen Con | Indianapolis, IN | Booth #1234 |
| 8/2/2026 | Faire of the Realm | Springfield, OR | Weekend only |

- **Date** &mdash; the date of the event. Must be a real date, not
  text. If you type `6/14/2026` Google Sheets will recognize it; if
  it stays left-aligned it's text, so reformat the column with
  `Format → Number → Date`.
- **Event** &mdash; the name of the con / festival / fair. Required;
  rows without an event name are skipped.
- **Location** &mdash; city and state, or venue name. Shown after the
  event name in gold.
- **Notes** &mdash; anything extra (booth number, day-of hours, etc.).
  Optional &mdash; leave blank to hide.

### Adding, editing, removing events

- **Adding an event**: add a new row anywhere in the sheet. Order in
  the sheet doesn't matter &mdash; the site sorts by date.
- **Editing**: change any cell. Reload the site to see the update.
- **Removing**: delete the row, or just leave it &mdash; **past dates
  are hidden automatically.** You don't need to clean up old events.

### If the site shows "TBA" instead of your events

Three usual suspects, in order:

1. **Sharing isn't public.** On the sheet, tap **Share** → set
   "General access" to **"Anyone with the link"**, role **Viewer**.
2. **The Date column has text dates, not real dates.** Reformat as
   above. (Dates that are right-aligned in the cell are real dates;
   left-aligned ones are text.)
3. **There are no future-dated rows yet.** Past events are hidden by
   design; if every row is in the past the site falls back to "TBA".

### Changing which sheet the site reads

If you ever need to point the site at a different spreadsheet, edit
the top of `events.js`:

```js
const SHEET_ID = "1cNLeYSCh79JTZcieolJuekDMi0Bl-4KcVM5jTnVC8ag";
const SHEET_NAME = "Events"; // falls back to the first tab if not found
```

The `SHEET_ID` is the long string between `/d/` and `/edit` in the
spreadsheet's URL.

## Other things to edit

- **Contact email** &mdash; change the `mailto:` link in the contact
  section of `index.html` (currently placeholder
  `hello@loreandorder.example`).
- **Hero tagline / About copy** &mdash; both live near the top of
  `index.html`.
- **Wares cards** &mdash; the three cards (Dice, Accessories, One-Shots)
  live inside the `.wares-grid` block.
