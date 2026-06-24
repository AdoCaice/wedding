import "./styles.css";
import { invitation } from "./config.js";

const app = document.querySelector("#app");
const weddingDate = new Date(invitation.date.iso);

app.innerHTML = `
  <main class="site-shell">
    <section class="cover" aria-label="Otvori pokana">
      <button class="cover-button" type="button" aria-label="Otvori ja pokanata">
        <img class="cover-back" src="/assets/envelope-back.webp" alt="" />
        <img class="cover-front" src="/assets/envelope-front-adz.png" alt="" />
        <span>Stisni za da ja<br />otvorish pokanata</span>
      </button>
    </section>

      <section class="invite" aria-label="Pokana">
      <div class="translate-widget notranslate" translate="no" aria-label="Translate">
        <select class="language-select notranslate" translate="no" aria-label="Choose language">
          <option value="">Original</option>
          <option value="en">English</option>
          <option value="sr">Serbian</option>
          <option value="sq">Albanian</option>
          <option value="it">Italian</option>
          <option value="tr">Turkish</option>
        </select>
        <div id="google_translate_element"></div>
      </div>

      <section class="hero-panel">
        <div class="hero-copy">
          <p class="hero-date">${invitation.date.hero}</p>
          <p class="family">${invitation.copy.familyLine}</p>
          <h1>
            <span class="notranslate" translate="no">${invitation.couple.firstName}</span>
            <em class="notranslate" translate="no">&</em>
            <span class="notranslate" translate="no">${invitation.couple.secondName}</span>
          </h1>
          <p class="intro">${invitation.copy.intro}</p>
          <p class="continue">Prodolzhi nadole</p>
          <span class="chevron" aria-hidden="true"></span>
        </div>
      </section>

      <section class="countdown-band">
        <img class="flower-spray spray-left" src="/assets/small-flowers.webp" alt="" />
        <img class="flower-spray spray-right" src="/assets/small-flowers.webp" alt="" />
        <div class="section-title">
          <p>Nashiot den se</p>
          <span>Blizhi</span>
        </div>
        <div class="countdown" aria-live="polite">
          ${["days", "hours", "minutes", "seconds"]
            .map(
              (key) => `
                <div class="time-box">
                  <strong data-count="${key}">00</strong>
                  <span>${labelFor(key)}</span>
                </div>
              `,
            )
            .join("")}
        </div>
        <p class="story">${invitation.copy.story}</p>
        <img class="countdown-flowers" src="/assets/countdown-flowers.png" alt="" />
      </section>

      <section class="date-details-cover">
        <section class="date-panel">
          <div class="section-title dark">
            <p>Zachuvaj go</p>
            <span>Datumot</span>
          </div>
          <span class="calendar-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M7 2v4M17 2v4M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
              <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" />
            </svg>
          </span>
          <div class="calendar" aria-label="Avgust 2026">
            ${buildCalendar()}
          </div>
          <h2>${invitation.date.display}</h2>
          <p class="underlined">${invitation.date.weekday}</p>
        </section>

        <section class="details-panel">
          <div class="detail">
            <span class="round-icon image-icon"><img src="/assets/glasses-icon.webp" alt="" /></span>
            <p class="script">Priem</p>
            <h2>${invitation.venue.receptionTime}</h2>
          </div>
          <div class="detail">
            <span class="round-icon">⌖</span>
            <p class="script">Restoran</p>
            <h2>${invitation.venue.name}</h2>
            <p class="underlined">${invitation.venue.city}</p>
          </div>
          <a class="polaroid" href="${invitation.venue.directionsUrl}" target="_blank" rel="noreferrer">
            <img src="${invitation.venue.image}" alt="${invitation.venue.name}" />
            <span>Stisni za nasoki do restoranot</span>
          </a>
        </section>
      </section>

      <section class="agenda-panel">
        <img class="corner top-right" src="/assets/bouquet-corner.webp" alt="" />
        <div class="section-title dark agenda-heading">
          <p>Agenda za</p>
          <span>Denot</span>
        </div>
        <div class="timeline">
          ${invitation.agenda
            .map(
              (item) => `
                <article class="timeline-item">
                  <img src="${item.icon}" alt="" />
                  <div>
                    <h2>${item.time}</h2>
                    <p>${item.title}</p>
                    ${
                      item.url
                        ? `<a href="${item.url}" target="_blank" rel="noreferrer">${item.linkLabel}</a>`
                        : ""
                    }
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="rsvp-panel">
        <img class="rsvp-bg" src="/assets/rsvp-card.webp" alt="" />
        <img class="rsvp-bouquet rsvp-bouquet-left" src="/assets/bouquet-corner.webp" alt="" />
        <img class="rsvp-bouquet rsvp-bouquet-right" src="/assets/bouquet-corner.webp" alt="" />
        <form class="rsvp-form" action="${invitation.form.action}" method="post">
          <div class="section-title dark">
            <p>Potvrda na</p>
            <span>Prisustvo</span>
          </div>
          <p class="rsvp-copy">Ve molime potvrdete prisustvo za Vas i Vashata pridruzhba, dokolku ja imate, najdocna do ${invitation.date.rsvpDeadline}. Ve ochekuvame!</p>
          <div class="rsvp-success" aria-live="polite">
            <p>Vi blagodarime!</p>
            <span>Vashiot odgovor e uspeshno ispraten.</span>
          </div>
          <label>
            <span>Vashe ime i prezime</span>
            <input type="text" name="Ime i prezime" placeholder="Ime Prezime" required />
          </label>
          <fieldset>
            <legend>Dali kje prisustvuvate?</legend>
            <label class="radio"><input type="radio" name="Prisustvo" value="Da" checked /> Da, so zadovolstvo</label>
            <label class="radio"><input type="radio" name="Prisustvo" value="Ne" /> Ne, za zhal ne sum vo mozhnost</label>
          </fieldset>
          <label>
            <span>Broj na lica koi doagjaat so Vas</span>
            <input type="number" min="0" name="Broj na pridruzhba" placeholder="Napishi broj" required />
          </label>
          <label>
            <span>Napishete gi nivnite iminja</span>
            <input type="text" name="Iminja na pridruzhba" placeholder="Napishi iminja" />
          </label>
          <button type="submit">Isprati odgovor</button>
        </form>
      </section>

    </section>
  </main>
`;

const cover = document.querySelector(".cover");
const originalContent = captureOriginalContent();

document.querySelector(".cover-button")?.addEventListener("click", () => {
  document.body.classList.add("opened");
  document.body.style.overflow = "";

  const removeCover = (event) => {
    if (event.target !== cover) return;
    cover.removeEventListener("animationend", removeCover);
    cover.remove();
  };

  cover.addEventListener("animationend", removeCover);

  window.setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 450);
});

document.querySelector(".rsvp-form").addEventListener("submit", async (event) => {
  if (invitation.form.action) return;

  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector("button");
  const data = new FormData(form);
  const defaultText = "Isprati odgovor";

  button.disabled = true;
  button.textContent = "Se isprakja...";

  try {
    const response = await fetch("/.netlify/functions/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.get("Ime i prezime"),
        attendance: data.get("Prisustvo"),
        guestCount: data.get("Broj na pridruzhba"),
        guestNames: data.get("Iminja na pridruzhba"),
      }),
    });

    if (!response.ok) {
      throw new Error("RSVP request failed");
    }

    form.classList.add("submitted");
    button.textContent = "Odgovorot e ispraten";
    form.reset();
  } catch {
    button.disabled = false;
    button.textContent = defaultText;
    window.alert("Ne uspeavme da go ispratime odgovorot. Obidete se povtorno.");
  }
});

window.googleTranslateElementInit = () => {
  new window.google.translate.TranslateElement(
    {
      autoDisplay: false,
      includedLanguages: "en,sr,sq,it,tr",
      pageLanguage: "mk",
    },
    "google_translate_element",
  );
};

const languageSelect = document.querySelector(".language-select");
const originalLanguage = "mk";

if (languageSelect) {
  languageSelect.value = getTranslateLanguage();
}

languageSelect?.addEventListener("change", async (event) => {
  const language = event.currentTarget.value;

  setTranslateCookie(language);
  await translatePage(language);
});

const translateScript = document.createElement("script");
translateScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
translateScript.async = true;
document.head.appendChild(translateScript);

function setTranslateCookie(language) {
  const value = language ? `/${originalLanguage}/${language}` : "";
  const expires = language ? "max-age=31536000" : "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const hosts = [window.location.hostname, `.${window.location.hostname}`].filter(Boolean);

  document.cookie = `googtrans=${value}; path=/; ${expires}; SameSite=Lax`;

  for (const host of hosts) {
    document.cookie = `googtrans=${value}; path=/; domain=${host}; ${expires}; SameSite=Lax`;
  }
}

function getTranslateLanguage() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return match?.[1] || "";
}

async function translatePage(language) {
  if (!language) {
    restoreOriginalContent();
    return;
  }

  const combo = await waitForTranslateCombo();

  if (!combo) return;

  combo.value = language;
  combo.dispatchEvent(new Event("change"));
}

function waitForTranslateCombo() {
  const existingCombo = document.querySelector(".goog-te-combo");

  if (existingCombo) {
    return Promise.resolve(existingCombo);
  }

  return new Promise((resolve) => {
    let attempts = 0;
    const interval = window.setInterval(() => {
      const combo = document.querySelector(".goog-te-combo");
      attempts += 1;

      if (combo || attempts >= 40) {
        window.clearInterval(interval);
        resolve(combo);
      }
    }, 100);
  });
}

function captureOriginalContent() {
  const textSelectors = [
    ".cover-button span",
    ".hero-date",
    ".family",
    ".intro",
    ".continue",
    ".section-title p",
    ".section-title span",
    ".time-box span",
    ".story",
    ".date-panel h2",
    ".underlined",
    ".detail .script",
    ".detail h2",
    ".polaroid span",
    ".timeline-item h2",
    ".timeline-item p",
    ".timeline-item a",
    ".rsvp-copy",
    ".rsvp-success p",
    ".rsvp-success span",
    ".rsvp-form label span",
    ".rsvp-form legend",
    ".rsvp-form .radio",
    ".rsvp-form button",
  ];
  const elements = [...document.querySelectorAll(textSelectors.join(","))].filter(
    (element) => !element.closest(".translate-widget") && !element.closest(".notranslate"),
  );
  const attributes = [...document.querySelectorAll("[placeholder], [aria-label], [alt]")].filter(
    (element) => !element.closest(".translate-widget") && !element.closest(".notranslate"),
  );

  return {
    attributes: attributes.map((element) => ({
      alt: element.getAttribute("alt"),
      ariaLabel: element.getAttribute("aria-label"),
      element,
      placeholder: element.getAttribute("placeholder"),
    })),
    elements: elements.map((element) => ({
      element,
      html: element.innerHTML,
    })),
    title: document.title,
  };
}

function restoreOriginalContent() {
  const combo = document.querySelector(".goog-te-combo");

  if (combo) {
    combo.value = "";
  }

  for (const item of originalContent.elements) {
    if (item.element.isConnected) {
      item.element.innerHTML = item.html;
    }
  }

  for (const item of originalContent.attributes) {
    if (!item.element.isConnected) continue;

    restoreAttribute(item.element, "alt", item.alt);
    restoreAttribute(item.element, "aria-label", item.ariaLabel);
    restoreAttribute(item.element, "placeholder", item.placeholder);
  }

  document.title = originalContent.title;

  if (languageSelect) {
    languageSelect.value = "";
  }
}

function restoreAttribute(element, name, value) {
  if (value === null) {
    element.removeAttribute(name);
    return;
  }

  element.setAttribute(name, value);
}

function labelFor(key) {
  return {
    days: "denovi",
    hours: "chasa",
    minutes: "minuti",
    seconds: "sekundi",
  }[key];
}

function updateCountdown() {
  const now = new Date();
  const remaining = Math.max(0, weddingDate.getTime() - now.getTime());
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const values = {
    days: Math.floor(remaining / day),
    hours: Math.floor((remaining % day) / hour),
    minutes: Math.floor((remaining % hour) / minute),
    seconds: Math.floor((remaining % minute) / 1000),
  };

  for (const [key, value] of Object.entries(values)) {
    document.querySelector(`[data-count="${key}"]`).textContent = String(value).padStart(2, "0");
  }
}

function buildCalendar() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const numbers = ["", "", "", "", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  return `
    ${days.map((day) => `<b>${day}</b>`).join("")}
    ${numbers
      .map((day) => `<span class="${day === 12 ? "marked" : ""}">${day || ""}</span>`)
      .join("")}
  `;
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
