import "./styles.css";
import { invitation } from "./config.js";

const app = document.querySelector("#app");
const weddingDate = new Date(invitation.date.iso);

app.innerHTML = `
  <main class="site-shell">
    <section class="cover" aria-label="Отвори покана">
      <button class="cover-button" type="button" aria-label="Отвори ја поканата">
        <img class="cover-back" src="/assets/envelope-back.webp" alt="" />
        <img class="cover-front" src="/assets/envelope-front-adz.png" alt="" />
        <span>Стисни за да jа<br />отвориш поканата</span>
      </button>
    </section>

      <section class="invite" aria-label="Покана">
      <section class="hero-panel">
        <div class="hero-copy">
          <p class="hero-date">${invitation.date.hero}</p>
          <p class="family">${invitation.copy.familyLine}</p>
          <h1>
            <span>${invitation.couple.firstName}</span>
            <em>&</em>
            <span>${invitation.couple.secondName}</span>
          </h1>
          <p class="intro">${invitation.copy.intro}</p>
          <p class="continue">Продолжи надоле</p>
          <span class="chevron" aria-hidden="true"></span>
        </div>
      </section>

      <section class="countdown-band">
        <img class="flower-spray spray-left" src="/assets/small-flowers.webp" alt="" />
        <img class="flower-spray spray-right" src="/assets/small-flowers.webp" alt="" />
        <div class="section-title">
          <p>Нашиот ден се</p>
          <span>Ближи</span>
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
            <p>Зачуваj го</p>
            <span>Датумот</span>
          </div>
          <span class="calendar-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M7 2v4M17 2v4M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
              <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" />
            </svg>
          </span>
          <div class="calendar" aria-label="Август 2026">
            ${buildCalendar()}
          </div>
          <h2>${invitation.date.display}</h2>
          <p class="underlined">${invitation.date.weekday}</p>
        </section>

        <section class="details-panel">
          <div class="detail">
            <span class="round-icon image-icon"><img src="/assets/rings-only.svg" alt="" /></span>
            <p class="script">Прием</p>
            <h2>${invitation.venue.receptionTime}</h2>
          </div>
          <div class="detail">
            <span class="round-icon">⌖</span>
            <p class="script">Ресторан</p>
            <h2>${invitation.venue.name}</h2>
            <p class="underlined">${invitation.venue.city}</p>
          </div>
          <a class="polaroid" href="${invitation.venue.directionsUrl}" target="_blank" rel="noreferrer">
            <img src="${invitation.venue.image}" alt="${invitation.venue.name}" />
            <span>Стисни за насоки до ресторанот</span>
          </a>
        </section>
      </section>

      <section class="agenda-panel">
        <img class="corner top-right" src="/assets/bouquet-corner.webp" alt="" />
        <div class="section-title dark agenda-heading">
          <p>Агенда за</p>
          <span>Денот</span>
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
            <p>Потврда на</p>
            <span>Присуство</span>
          </div>
          <p class="rsvp-copy">Ве молиме потврдете присуство за Вас и Вашата придружба, доколку ја имате, најдоцна до ${invitation.date.rsvpDeadline}. Ве очекуваме!</p>
          <div class="rsvp-success" aria-live="polite">
            <p>Ви благодариме!</p>
            <span>Вашиот одговор е успешно испратен.</span>
          </div>
          <label>
            <span>Ваше име и презиме</span>
            <input type="text" name="Име и презиме" placeholder="Име Презиме" required />
          </label>
          <fieldset>
            <legend>Дали ќе присуствувате?</legend>
            <label class="radio"><input type="radio" name="Присуство" value="Да" checked /> Да, со задоволство</label>
            <label class="radio"><input type="radio" name="Присуство" value="Не" /> Не, за жал не сум во можност</label>
          </fieldset>
          <label>
            <span>Број на лица кои доаѓаат со Вас</span>
            <input type="number" min="0" name="Број на придружба" placeholder="Напиши број" required />
          </label>
          <label>
            <span>Напишете ги нивните имиња</span>
            <input type="text" name="Имиња на придружба" placeholder="Напиши имиња" />
          </label>
          <button type="submit">Испрати одговор</button>
        </form>
      </section>

    </section>
  </main>
`;

const cover = document.querySelector(".cover");

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
  const defaultText = "Испрати одговор";

  button.disabled = true;
  button.textContent = "Се испраќа...";

  try {
    const response = await fetch("/.netlify/functions/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.get("Име и презиме"),
        attendance: data.get("Присуство"),
        guestCount: data.get("Број на придружба"),
        guestNames: data.get("Имиња на придружба"),
      }),
    });

    if (!response.ok) {
      throw new Error("RSVP request failed");
    }

    form.classList.add("submitted");
    button.textContent = "Одговорот е испратен";
    form.reset();
  } catch {
    button.disabled = false;
    button.textContent = defaultText;
    window.alert("Не успеавме да го испратиме одговорот. Обидете се повторно.");
  }
});

function labelFor(key) {
  return {
    days: "денови",
    hours: "часа",
    minutes: "минути",
    seconds: "секунди",
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
