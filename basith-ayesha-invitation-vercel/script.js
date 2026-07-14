const opening = document.getElementById("opening");
const openButton = document.getElementById("openInvitation");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

let isPlaying = false;

async function openInvitation() {
  opening.classList.add("hidden");
  document.body.classList.remove("locked");
  try {
    music.volume = 0.28;
    await music.play();
    isPlaying = true;
    musicToggle.classList.remove("muted");
  } catch (error) {
    isPlaying = false;
    musicToggle.classList.add("muted");
  }
}

openButton.addEventListener("click", (event) => {
  event.stopPropagation();
  openInvitation();
});
opening.addEventListener("click", openInvitation);
opening.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") openInvitation();
});

musicToggle.addEventListener("click", async () => {
  if (isPlaying) {
    music.pause();
    isPlaying = false;
    musicToggle.classList.add("muted");
  } else {
    try {
      await music.play();
      isPlaying = true;
      musicToggle.classList.remove("muted");
    } catch (error) {
      musicToggle.classList.add("muted");
    }
  }
});

const weddingDate = new Date("2026-12-28T11:30:00+05:30").getTime();

function updateCountdown() {
  const distance = weddingDate - Date.now();
  const safe = Math.max(distance, 0);
  const days = Math.floor(safe / 86400000);
  const hours = Math.floor((safe % 86400000) / 3600000);
  const minutes = Math.floor((safe % 3600000) / 60000);
  const seconds = Math.floor((safe % 60000) / 1000);
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
