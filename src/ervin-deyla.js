import "./ervin-deyla.css";

const wedding = {
  date: new Date("2026-09-26T19:00:00+02:00"),
  directions: "https://www.google.com/maps/search/?api=1&query=DoubleTree+by+Hilton+Skopje+Blvd+ASNOM+17",
};

document.documentElement.lang = "sr-Latn";
document.title = "Deyla & Ervin — Pozivnica za venčanje";
setMeta("description", "Deyla i Ervin vas pozivaju na svoje venčanje 26. septembra 2026. u DoubleTree by Hilton Skopje.");

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="ed-site">
    <section class="ed-cover" aria-label="Otvorite pozivnicu">
      <button class="ed-cover-button" type="button">
        <img class="ed-cover-back" src="/assets/envelope-back.webp" alt="" />
        <img class="ed-cover-front" src="/assets/ervin-deyla/envelope-front-de-transparent.png" alt="" />
        <span class="ed-open-copy">Dodirnite da otvorite pozivnicu</span>
      </button>
    </section>

    <section class="ed-invite">
      <section class="ed-hero">
        <div class="ed-hero-copy">
          <p class="ed-kicker">Zajedno sa svojim porodicama</p>
          <h1><span>Deyla</span><em>&</em><span>Ervin</span></h1>
          <div class="ed-divider"><i></i><b>26 · 09 · 2026</b><i></i></div>
          <p class="ed-intro">Sa velikom radošću vas pozivamo da budete deo dana kada ćemo izgovoriti naše zauvek.</p>
          <a class="ed-scroll" href="#detalji">Otkrijte detalje <span>↓</span></a>
        </div>
      </section>

      <section class="ed-countdown" aria-labelledby="countdown-title">
        <p class="ed-eyebrow">Do našeg dana</p>
        <h2 id="countdown-title">Još samo malo</h2>
        <div class="ed-clock" aria-live="polite">
          ${["days", "hours", "minutes", "seconds"].map((key) => `
            <div><strong data-count="${key}">00</strong><span>${countLabel(key)}</span></div>
          `).join("")}
        </div>
        <p class="ed-quote">Ljubav je sastavljena od jedne duše koja živi u dva srca.</p>
      </section>

      <section class="ed-date" id="detalji">
        <img class="ed-spray ed-parallax ed-spray-date-corner" data-parallax="-0.035" src="/assets/ervin-deyla/pearl-floral-spray.png" alt="" />
        <p class="ed-eyebrow">Sačuvajte datum</p>
        <h2>Subota</h2>
        <div class="ed-date-lockup"><strong>26</strong><span>septembar<br />2026.</span></div>
        <div class="ed-calendar" aria-label="Septembar 2026.">${buildCalendar()}</div>
      </section>

      <section class="ed-venue">
        <div class="ed-venue-card">
          <span class="ed-pin" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.8" />
            </svg>
          </span>
          <p class="ed-eyebrow">Mesto proslave</p>
          <h2>DoubleTree<br /><i>by Hilton</i></h2>
          <p>Skoplje · Bulevar ASNOM 17</p>
          <div class="ed-time"><span>Dolazak gostiju</span><strong>19:00</strong></div>
          <a href="${wedding.directions}" target="_blank" rel="noreferrer">Prikaži lokaciju</a>
        </div>
      </section>

      <section class="ed-agenda">
        <img class="ed-spray ed-parallax ed-spray-agenda-corner" data-parallax="0.05" src="/assets/ervin-deyla/pearl-floral-spray.png" alt="" />
        <img class="ed-spray ed-parallax ed-spray-agenda-corner-left" data-parallax="-0.065" src="/assets/ervin-deyla/pearl-floral-spray.png" alt="" />
        <p class="ed-eyebrow">Plan večeri</p>
        <h2>Naši trenuci</h2>
        <div class="ed-timeline">
          <article><time>19:00</time><span></span><div><h3>Dolazak gostiju</h3><p>Dobrodošlica u DoubleTree by Hilton Skopje</p></div></article>
          <article><time>20:00</time><span></span><div><h3>Svečana večera</h3><p>Slavlje, muzika i uspomene koje ćemo stvarati zajedno</p></div></article>
        </div>
      </section>

      <section class="ed-rsvp">
        <img class="ed-spray ed-parallax ed-spray-rsvp" data-parallax="-0.04" src="/assets/ervin-deyla/pearl-floral-spray.png" alt="" />
        <img class="ed-spray ed-parallax ed-spray-rsvp-front" data-parallax="0.065" src="/assets/ervin-deyla/pearl-floral-spray.png" alt="" />
        <form class="ed-form">
          <p class="ed-eyebrow">Potvrda dolaska</p>
          <h2>Radujemo se vašem dolasku</h2>
          <p class="ed-form-copy">Molimo vas da potvrdite svoj dolazak i broj osoba u pratnji.</p>
          <div class="ed-success" aria-live="polite"><strong>Hvala vam!</strong><span>Vaš odgovor je uspešno poslat.</span></div>
          <label><span>Ime i prezime</span><input name="name" type="text" placeholder="Vaše ime i prezime" required /></label>
          <fieldset><legend>Da li ćete prisustvovati?</legend>
            <label><input type="radio" name="attendance" value="Da" checked /> Da, sa zadovoljstvom</label>
            <label><input type="radio" name="attendance" value="Ne" /> Nažalost, nisam u mogućnosti</label>
          </fieldset>
          <label><span>Broj osoba u pratnji</span><input name="guestCount" type="number" min="0" value="0" required /></label>
          <label><span>Imena osoba u pratnji</span><input name="guestNames" type="text" placeholder="Upišite imena" /></label>
          <button type="submit">Pošaljite odgovor</button>
        </form>
      </section>

      <footer><span>26.09.2026.</span><b>Deyla & Ervin</b></footer>
    </section>
  </main>
`;

const cover = document.querySelector(".ed-cover");
document.querySelector(".ed-cover-button")?.addEventListener("click", () => {
  document.body.classList.add("ed-opened");
  document.body.style.overflow = "";
  window.setTimeout(() => cover?.remove(), 1200);
});

document.querySelector(".ed-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button");
  const data = new FormData(form);
  button.disabled = true;
  button.textContent = "Šalje se...";

  try {
    const response = await fetch("/.netlify/functions/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    if (!response.ok) throw new Error("RSVP failed");
    form.classList.add("is-sent");
  } catch {
    button.disabled = false;
    button.textContent = "Pošaljite odgovor";
    window.alert("Odgovor trenutno nije moguće poslati. Molimo pokušajte ponovo.");
  }
});

function updateCountdown() {
  const remaining = Math.max(0, wedding.date.getTime() - Date.now());
  const units = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000),
  };
  Object.entries(units).forEach(([key, value]) => {
    document.querySelector(`[data-count="${key}"]`).textContent = String(value).padStart(2, "0");
  });
}

function countLabel(key) {
  return { days: "dana", hours: "sati", minutes: "minuta", seconds: "sekundi" }[key];
}

function buildCalendar() {
  const headers = ["P", "U", "S", "Č", "P", "S", "N"];
  const blanks = 1;
  const cells = [...Array(blanks).fill(""), ...Array.from({ length: 30 }, (_, index) => index + 1)];
  return `${headers.map((day) => `<b>${day}</b>`).join("")}${cells.map((day) => `<span class="${day === 26 ? "is-wedding" : ""}">${day}</span>`).join("")}`;
}

function setMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setupParallax() {
  const layers = [...document.querySelectorAll(".ed-parallax")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frameRequested = false;

  const update = () => {
    frameRequested = false;

    if (reducedMotion.matches) {
      layers.forEach((layer) => layer.style.setProperty("--parallax-y", "0px"));
      return;
    }

    const viewportCenter = window.innerHeight / 2;

    layers.forEach((layer) => {
      const section = layer.closest("section");
      const rect = section.getBoundingClientRect();
      const distance = rect.top + rect.height / 2 - viewportCenter;
      const speed = Number(layer.dataset.parallax || 0);
      const offset = Math.max(-56, Math.min(56, -distance * speed));
      layer.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    });
  };

  const requestUpdate = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  reducedMotion.addEventListener?.("change", requestUpdate);
  requestUpdate();
}

updateCountdown();
setupParallax();
window.setInterval(updateCountdown, 1000);
