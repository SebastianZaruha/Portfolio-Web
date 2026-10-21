// Vercel Web Analytics: queue events until the real script loads.
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };


// ---------- Language (ES / EN) ----------
// Text exists twice in the HTML: class="es" and class="en".
// The CSS hides the language that doesn't match <html lang="...">.

function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  // Page title comes from data-es / data-en on the <title> tag.
  var title = document.querySelector("title");
  document.title = title.dataset[lang];

  // Highlight the active letter in the toggle.
  document.querySelectorAll(".lang-toggle button").forEach(function (button) {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
}

// Saved choice, otherwise the browser language.
var savedLang = localStorage.getItem("lang");
var browserLang = navigator.language.startsWith("es") ? "es" : "en";
setLanguage(savedLang || browserLang);

document.querySelectorAll(".lang-toggle button").forEach(function (button) {
  button.addEventListener("click", function () {
    setLanguage(button.dataset.lang);
  });
});


// ---------- Background video ----------
// The video has autoplay + muted in the HTML. If the browser still blocks it,
// try again on the first click, tap or key press.

var video = document.querySelector(".bg-video");

function playVideo() {
  video.muted = true;
  video.play().catch(function () {
    document.addEventListener("pointerdown", playVideo, { once: true });
    document.addEventListener("keydown", playVideo, { once: true });
  });
}

playVideo();


// ---------- Madrid clock (home page) ----------

var clock = document.querySelector(".clock");

if (clock) {
  var madridTime = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  function updateClock() {
    clock.textContent = madridTime.format(new Date());
  }

  updateClock();
  setInterval(updateClock, 1000);
}


// ---------- Esc on legal pages → back to home ----------

if (document.body.classList.contains("legal")) {
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    // Came from this site? Go back. Otherwise open the home page.
    if (document.referrer.startsWith(location.origin)) {
      history.back();
    } else {
      location.href = "/";
    }
  });
}
