const $ = (q, root = document) => root.querySelector(q);

const navToggle = $("#navToggle");
const navMenu = $("#navMenu");
const themeToggle = $("#themeToggle");
const yearEl = $("#year");
const contactForm = $("#contactForm");
const formHint = $("#formHint");

yearEl.textContent = new Date().getFullYear();

// Mobile menu
navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("isOpen");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  navMenu.classList.remove("isOpen");
  navToggle.setAttribute("aria-expanded", "false");
});

// Theme
const THEME_KEY = "resume_theme";

function applyTheme(theme) {
  if (theme === "light") document.documentElement.classList.add("light");
  else document.documentElement.classList.remove("light");
}

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const isLight = document.documentElement.classList.toggle("light");
  localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
});

// Contact form: copy message to clipboard
contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fd = new FormData(contactForm);
  const name = String(fd.get("name") || "").trim();
  const subject = String(fd.get("subject") || "").trim();
  const message = String(fd.get("message") || "").trim();

  const text =
`Hello! My name is ${name}.
Subject: ${subject}

Message:
${message}

— Roma (Frontend Developer)`;

  try {
    await navigator.clipboard.writeText(text);
    formHint.textContent = "✅ Copied! Paste it into Telegram or Email.";
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    formHint.textContent = "✅ Copied (fallback). Paste it into Telegram or Email.";
  }

  contactForm.reset();
});