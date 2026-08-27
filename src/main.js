const path = window.location.pathname.replace(/\/+$/, "") || "/";

if (path === "/ahtan-dzejna") {
  document.documentElement.lang = "mk";
  document.title = "Ahtan & Dzejna — Покана за свадба";
  import("./legacy-main.js");
} else {
  document.documentElement.lang = "sr-Latn";
  document.title = "Deyla & Ervin — Pozivnica za venčanje";
  import("./ervin-deyla.js");
}
