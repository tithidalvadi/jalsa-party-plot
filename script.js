
// ===== Config =====
const WHATSAPP_NUMBER = "919875038948"; // change this to update WhatsApp number
// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();
// ===== Navbar scroll effect =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});
// ===== Mobile menu =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);
// ===== Reveal on scroll =====
const io = new IntersectionObserver(
  entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
// ===== Contact Form -> WhatsApp =====
const form = document.getElementById("contactForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const eventType = document.getElementById("eventType").value;
  const eventDate = document.getElementById("eventDate").value;
  const message = document.getElementById("message").value.trim() || "—";
  const text =
`Hello, I am interested in booking Jalsa Party Plot.
Name:
${name}
Phone:
${phone}
Event Type:
${eventType}
Event Date:
${eventDate}
Message:
${message}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

// ===== GitHub Sign In =====
const authStatus = document.getElementById("authStatus");
const githubSignIn = document.getElementById("githubSignIn");
const GITHUB_CLIENT_ID = "YOUR_GITHUB_CLIENT_ID"; // replace with your GitHub OAuth App client_id
const GITHUB_REDIRECT_URI = window.location.origin + window.location.pathname;

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function updateAuthStatus(status) {
  authStatus.textContent = status;
}

function githubSignInRedirect() {
  if (!GITHUB_CLIENT_ID || GITHUB_CLIENT_ID === "YOUR_GITHUB_CLIENT_ID") {
    updateAuthStatus("GitHub client ID not configured. Set GITHUB_CLIENT_ID in script.js.");
    return;
  }

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: "read:user",
    allow_signup: "true"
  });

  window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
}

githubSignIn.addEventListener("click", githubSignInRedirect);

const authCode = getQueryParam("code");
if (authCode) {
  updateAuthStatus("GitHub sign-in code received. Check console for code.");
  console.log("GitHub OAuth code:", authCode);
  window.history.replaceState({}, document.title, window.location.pathname);
} else {
  updateAuthStatus("Not signed in");
}

