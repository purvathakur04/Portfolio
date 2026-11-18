// ---------- Mobile menu ----------
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Dark / light theme ----------
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) { /* storage unavailable */ }

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");
const showAll = () => revealEls.forEach((el) => el.classList.add("visible"));
// Sections are only hidden once this script is running, and a safety timer
// guarantees they always appear even if something goes wrong.
document.documentElement.classList.add("js");
setTimeout(showAll, 1500);
if ("IntersectionObserver" in window) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => revealObs.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// ---------- Highlight active nav link ----------
const links = document.querySelectorAll(".nav-menu a[href^='#']");
const sections = [...links].map((l) => document.querySelector(l.getAttribute("href")));

if ("IntersectionObserver" in window) {
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => s && navObs.observe(s));
}

// ---------- Contact form (validates, then opens email app) ----------
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const MY_EMAIL = "thakurpurva149@gmail.com";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill in all fields.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    statusEl.textContent = "Please enter a valid email address.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
  window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  statusEl.textContent = "Opening your email app…";
  form.reset();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();