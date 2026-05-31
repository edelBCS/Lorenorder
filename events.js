// ---------------------------------------------------------------------------
// Lore & Order — Tour schedule loader
//
// Pulls the upcoming-events list from a published Google Sheet so the booth
// owner can update dates without editing the site.
//
// To wire up your sheet:
//
//   1.  Make a Google Sheet with these column headers in row 1 (exact spelling):
//
//         Date  |  Event  |  Location  |  Notes
//
//       Format the "Date" column as a date (Format -> Number -> Date).
//
//   2.  In Google Sheets:  File -> Share -> "Anyone with the link" -> Viewer.
//
//   3.  Copy the sheet's ID out of its URL.  The ID is the long string
//       between "/d/" and "/edit":
//
//         https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit#gid=0
//
//   4.  Paste it into SHEET_ID below.  If the tab is not named "Events",
//       update SHEET_NAME too.
//
// That's it.  Edit the sheet on any device; the site picks up changes the
// next time someone loads the page (usually within a minute).
// ---------------------------------------------------------------------------

const SHEET_ID = ""; // <-- paste your Google Sheet ID here
const SHEET_NAME = "Events";

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

function parseSheetDate(raw) {
  if (raw == null || raw === "") return null;
  if (typeof raw === "string" && raw.startsWith("Date(")) {
    const parts = raw.slice(5, -1).split(",").map(Number);
    const [y, m, d] = parts;
    return { month: MONTHS[m], day: String(d), sort: new Date(y, m, d).getTime() };
  }
  const ts = Date.parse(raw);
  if (!isNaN(ts)) {
    const dt = new Date(ts);
    return { month: MONTHS[dt.getMonth()], day: String(dt.getDate()), sort: ts };
  }
  return { month: String(raw).slice(0, 3).toUpperCase(), day: "—", sort: Infinity };
}

function renderEvents(items) {
  const list = document.querySelector(".tour-list");
  if (!list || items.length === 0) return;
  list.innerHTML = items.map((e) => `
    <li class="tour-item">
      <div class="tour-date">
        <span class="tour-month">${escapeHtml(e.month)}</span>
        <span class="tour-day">${escapeHtml(e.day)}</span>
      </div>
      <div class="tour-meta">
        <h3>${escapeHtml(e.event)}${e.location ? ` <span class="tour-loc">&mdash; ${escapeHtml(e.location)}</span>` : ""}</h3>
        ${e.notes ? `<p>${escapeHtml(e.notes)}</p>` : ""}
      </div>
    </li>
  `).join("");
}

async function loadEvents() {
  if (!SHEET_ID) return;

  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
    `?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

  let text;
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    text = await res.text();
  } catch (e) {
    return;
  }

  const open = text.indexOf("(");
  const close = text.lastIndexOf(")");
  if (open === -1 || close === -1 || close <= open) return;

  let data;
  try {
    data = JSON.parse(text.slice(open + 1, close));
  } catch (e) {
    return;
  }

  const cols = (data?.table?.cols || []).map((c) =>
    (c.label || c.id || "").toString().toLowerCase().trim(),
  );
  const idx = (name) => cols.indexOf(name);
  const dateCol = idx("date");
  const eventCol = idx("event");
  const locationCol = idx("location");
  const notesCol = idx("notes");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const items = (data?.table?.rows || [])
    .map((row) => {
      const cell = (i) => (i >= 0 && row.c[i] ? row.c[i] : null);
      const value = (i) => {
        const c = cell(i);
        if (!c) return "";
        return c.f ?? c.v ?? "";
      };
      const dateRaw = cell(dateCol)?.v;
      const date = parseSheetDate(dateRaw);
      return {
        month: date?.month || "TBA",
        day: date?.day || "—",
        sort: date?.sort ?? Infinity,
        event: value(eventCol),
        location: value(locationCol),
        notes: value(notesCol),
      };
    })
    .filter((e) => e.event)
    .filter((e) => e.sort === Infinity || e.sort >= today.getTime())
    .sort((a, b) => a.sort - b.sort);

  renderEvents(items);
}

loadEvents();
