// Shared chrome — nav, footer, card tiles, card mini-previews
// All exported to window for use across pages.

const Logo73 = ({ size = 28 }) => (
  <svg width={size * 1.15} height={size} viewBox="0 0 80 70" fill="none" stroke="#388BFD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* Circuit traces feeding in from outside */}
    <path d="M2 14 L10 14 L14 10 L24 10" />
    <path d="M2 30 L8 30 L12 34 L18 34" strokeOpacity="0.55" />
    <path d="M2 50 L10 50" strokeOpacity="0.55" />
    <circle cx="2" cy="14" r="1.6" fill="#00D4FF" stroke="none" />
    <circle cx="2" cy="30" r="1.6" fill="#00D4FF" stroke="none" />
    <circle cx="2" cy="50" r="1.6" fill="#00D4FF" stroke="none" />

    {/* '7' — bold blocky shape */}
    <path d="M14 12 Q14 10 16 10 L36 10 Q38 10 38 12 L38 16 Q38 17 37 18 L24 56 Q23 58 21 58 L18 58 Q15 58 16 55 L29 18 L18 18 Q14 18 14 16 Z" fill="#0A0E14" strokeWidth="2.5" />
    {/* node dots on '7' */}
    <circle cx="22" cy="10" r="1.6" fill="#00D4FF" stroke="none" />
    <circle cx="32" cy="10" r="1.6" fill="#00D4FF" stroke="none" />
    <circle cx="20" cy="58" r="1.6" fill="#00D4FF" stroke="none" />

    {/* '3' — bold blocky two-bumped shape */}
    <path d="M40 12 Q40 10 42 10 L62 10 Q70 10 70 18 Q70 26 62 30 Q70 32 70 42 Q70 58 56 58 L42 58 Q40 58 40 56 L40 52 Q40 50 42 50 L56 50 Q62 50 62 44 Q62 38 56 36 L48 36 Q46 36 46 34 L46 30 Q46 28 48 28 L54 28 Q62 28 62 22 Q62 18 58 18 L42 18 Q40 18 40 16 Z" fill="#0A0E14" strokeWidth="2.5" />
    <circle cx="44" cy="10" r="1.6" fill="#00D4FF" stroke="none" />
    <circle cx="68" cy="14" r="1.6" fill="#00D4FF" stroke="none" />
    <circle cx="50" cy="32" r="1.6" fill="#00D4FF" stroke="none" />
    <circle cx="68" cy="46" r="1.6" fill="#00D4FF" stroke="none" />

    {/* Traces feeding out the right */}
    <path d="M70 22 L76 22 L78 24" strokeOpacity="0.55" />
    <path d="M62 58 L66 58 L70 62 L78 62" />
    <circle cx="78" cy="24" r="1.6" fill="#00D4FF" stroke="none" />
    <circle cx="78" cy="62" r="1.6" fill="#00D4FF" stroke="none" />
  </svg>
);

const Nav = ({ active }) => (
  <nav className="nav">
    <div className="container nav-inner">
      <a href="index.html" className="logo" aria-label="squizzer73.dev — home">
        <img src="assets/logo-mark.png" alt="" className="logo-mark" />
        <span className="logo-stack">
          <span className="logo-text">squizzer<span className="num73">73</span><span className="dot">.</span>dev</span>
          <span className="logo-tag mono">custom home automation &amp; home assistant cards</span>
        </span>
      </a>
      <div className="nav-links">
        <a href="index.html#cards" className={active === "cards" ? "active" : ""}>cards</a>
        <a href="blog.html" className={active === "blog" ? "active" : ""}>blog</a>
        <a href="#about" className={active === "about" ? "active" : ""}>about</a>
      </div>
      <a className="gh-btn" href="https://github.com/squizzer73" target="_blank" rel="noreferrer">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        GitHub
      </a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div>
        Mark Squires · Buckinghamshire, UK
      </div>
      <div className="footer-links">
        <a href="https://github.com/squizzer73" target="_blank" rel="noreferrer">github</a>
        <a href="https://youtube.com/@squizzer73" target="_blank" rel="noreferrer">youtube</a>
        <a href="https://tiktok.com/@squizzer73" target="_blank" rel="noreferrer">tiktok</a>
      </div>
    </div>
  </footer>
);

// =====================================================================
// Card mini-previews — actual live HTML/CSS renders of each HA card
// =====================================================================

// Calendar events card — multi-calendar mini display
const CalendarPreview = ({ size = "tile" }) => {
  // size: "tile" (small homepage tile) or "hero" (large detail page demo)
  const isHero = size === "hero";
  const today = 14; // fixed Tu the 14th in our mock month
  const days = Array.from({length: 30}, (_, i) => i + 1);
  const weekHeaders = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  // April 2026 starts on Wednesday (Mo=0, Tu=1, We=2)
  const startOffset = 2;
  const events = {
    14: { color: "#388bfd", label: "Gym 19:00" },
    16: { color: "#a371f7", label: "F1 sprint" },
    18: { color: "#3fb950", label: "Hike" },
    22: { color: "#f78166", label: "Birthday" },
    27: { color: "#388bfd", label: "Gym 19:00" },
  };

  return (
    <div className={`cal-preview ${isHero ? "cal-hero" : ""}`}>
      <div className="cal-head">
        <span className="cal-month">April 2026</span>
        <div className="cal-nav">
          <span>‹</span><span>›</span>
        </div>
      </div>
      <div className="cal-grid">
        {weekHeaders.map(h => <div key={h} className="cal-dow">{h}</div>)}
        {Array.from({length: startOffset}).map((_, i) => <div key={"e"+i} />)}
        {days.map(d => (
          <div key={d} className={`cal-day ${d === today ? "cal-today" : ""}`}>
            <span className="cal-num">{d}</span>
            {events[d] && <span className="cal-dot" style={{background: events[d].color}} />}
          </div>
        ))}
      </div>
      {isHero && (
        <div className="cal-events">
          <div className="cal-event">
            <span className="cal-event-dot" style={{background: "#388bfd"}} />
            <span className="cal-event-time mono">19:00</span>
            <span className="cal-event-title">Gym</span>
            <span className="cal-event-cal mono faint">personal</span>
          </div>
          <div className="cal-event">
            <span className="cal-event-dot" style={{background: "#a371f7"}} />
            <span className="cal-event-time mono">14:30</span>
            <span className="cal-event-title">F1 sprint qualifying</span>
            <span className="cal-event-cal mono faint">f1</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Word clock card — 11x10 word grid that lights up the time
// Computes which letters are "lit" based on a given time.
const WORD_CLOCK_GRID = [
  "ITLISASTIME",
  "ACQUARTERDC",
  "TWENTYFIVEX",
  "HALFSTENFTO",
  "PASTERUNINE",
  "ONESIXTHREE",
  "FOURFIVETWO",
  "EIGHTELEVEN",
  "SEVENTWELVE",
  "TENSEOCLOCK",
];

// Maps of letter ranges to highlight per phrase (row, colStart, colEnd inclusive)
const WC_PHRASES = {
  "IT":      [[0, 0, 1]],
  "IS":      [[0, 3, 4]],
  "A":       [[1, 0, 0]],
  "QUARTER": [[1, 2, 8]],
  "TWENTY":  [[2, 0, 5]],
  "FIVE_M":  [[2, 6, 9]],
  "TEN_M":   [[3, 6, 8]],
  "HALF":    [[3, 0, 3]],
  "PAST":    [[4, 0, 3]],
  "TO":      [[3, 9, 10]],
  "ONE":     [[5, 0, 2]],
  "TWO":     [[6, 8, 10]],
  "THREE":   [[5, 6, 10]],
  "FOUR":    [[6, 0, 3]],
  "FIVE":    [[6, 4, 7]],
  "SIX":     [[5, 3, 5]],
  "SEVEN":   [[8, 0, 4]],
  "EIGHT":   [[7, 0, 4]],
  "NINE":    [[4, 7, 10]],
  "TEN":     [[9, 0, 2]],
  "ELEVEN":  [[7, 5, 10]],
  "TWELVE":  [[8, 5, 10]],
  "OCLOCK":  [[9, 5, 10]],
};

function wordClockLit(date) {
  const lit = new Set();
  const mark = (key) => {
    const ranges = WC_PHRASES[key];
    if (!ranges) return;
    ranges.forEach(([r, a, b]) => {
      for (let c = a; c <= b; c++) lit.add(`${r}-${c}`);
    });
  };
  mark("IT"); mark("IS");
  let h = date.getHours();
  const m = date.getMinutes();
  // round to nearest 5
  const rounded = Math.round(m / 5) * 5;
  let useNextHour = rounded > 30;
  let displayHour = useNextHour ? (h + 1) % 24 : h;
  displayHour = displayHour % 12;
  if (displayHour === 0) displayHour = 12;

  const min = rounded % 60;
  if (min === 0) {
    mark("OCLOCK");
  } else if (min === 5) { mark("FIVE_M"); mark("PAST"); }
  else if (min === 10) { mark("TEN_M"); mark("PAST"); }
  else if (min === 15) { mark("A"); mark("QUARTER"); mark("PAST"); }
  else if (min === 20) { mark("TWENTY"); mark("PAST"); }
  else if (min === 25) { mark("TWENTY"); mark("FIVE_M"); mark("PAST"); }
  else if (min === 30) { mark("HALF"); mark("PAST"); }
  else if (min === 35) { mark("TWENTY"); mark("FIVE_M"); mark("TO"); }
  else if (min === 40) { mark("TWENTY"); mark("TO"); }
  else if (min === 45) { mark("A"); mark("QUARTER"); mark("TO"); }
  else if (min === 50) { mark("TEN_M"); mark("TO"); }
  else if (min === 55) { mark("FIVE_M"); mark("TO"); }

  const HOUR_KEYS = ["TWELVE","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE","TEN","ELEVEN","TWELVE"];
  mark(HOUR_KEYS[displayHour]);

  return lit;
}

const WordClockPreview = ({ size = "tile", time }) => {
  const isHero = size === "hero";
  const [now, setNow] = React.useState(time || new Date());
  React.useEffect(() => {
    if (time) { setNow(time); return; }
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, [time]);
  const lit = wordClockLit(now);

  return (
    <div className={`wc-preview ${isHero ? "wc-hero" : ""}`}>
      <div className="wc-grid">
        {WORD_CLOCK_GRID.map((row, r) => (
          <div key={r} className="wc-row">
            {row.split("").map((letter, c) => (
              <span
                key={c}
                className={`wc-letter ${lit.has(`${r}-${c}`) ? "wc-lit" : ""}`}
              >{letter}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// "Heat demand" placeholder — the third (in-progress) card, styled differently
const HeatDemandPreview = ({ size = "tile" }) => {
  const isHero = size === "hero";
  const rooms = [
    { name: "Lounge", demand: 78, temp: "19.2°" },
    { name: "Bedroom", demand: 42, temp: "18.4°" },
    { name: "Office", demand: 91, temp: "17.8°" },
    { name: "Kitchen", demand: 12, temp: "20.1°" },
  ];
  return (
    <div className={`hd-preview ${isHero ? "hd-hero" : ""}`}>
      <div className="hd-head">
        <span className="hd-title">Heat demand</span>
        <span className="hd-status mono">62% avg</span>
      </div>
      <div className="hd-rows">
        {rooms.map(r => (
          <div key={r.name} className="hd-row">
            <span className="hd-room">{r.name}</span>
            <div className="hd-bar"><div className="hd-fill" style={{width: r.demand + "%"}} /></div>
            <span className="hd-temp mono">{r.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// =====================================================================
// Card tile — grid item used on homepage and (optionally) detail page
// =====================================================================
const CardTile = ({ card, onClick }) => (
  <a className="card-tile" href={card.detailUrl || "#"} onClick={onClick}>
    <div className="card-tile-preview">
      <div className="card-tile-preview-inner">
        {card.preview}
      </div>
      {card.versionTag && (
        <span className={`tag ${card.tagKind === "new" ? "tag-new" : "tag-version"} card-tile-version`}>
          {card.versionTag}
        </span>
      )}
    </div>
    <div className="card-tile-body">
      <div className="card-tile-name">{card.name}</div>
      <div className="card-tile-desc">{card.desc}</div>
    </div>
    <div className="card-tile-meta">
      <span className="mono card-tile-filename">{card.filename}</span>
      <span className="card-tile-stars">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg>
        <span className="mono">—</span>
      </span>
    </div>
  </a>
);

const CardEmptyTile = () => (
  <div className="card-tile card-tile-empty">
    <div className="card-tile-empty-inner">
      <div className="card-tile-empty-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </div>
      <div className="card-tile-empty-label">Next card in progress</div>
    </div>
  </div>
);

Object.assign(window, {
  Nav, Footer,
  CalendarPreview, WordClockPreview, HeatDemandPreview,
  CardTile, CardEmptyTile,
  wordClockLit, WORD_CLOCK_GRID,
});
