// Font sizing
let fontStep = 0; 

// Thema
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle?.querySelector("img");
const savedTheme = localStorage.getItem("theme");

// Font size toggle button (ipv inline onclick in HTML)
document.querySelector("#fontToggle")?.addEventListener("click", cycleFontSize);

// Video & audio
const videoWrapper = document.querySelector(".video-wrapper");
const video = videoWrapper?.querySelector("video");
const audio = videoWrapper?.querySelector("audio");
const videoBtn = videoWrapper?.querySelector("button");
const videoBtnImg = videoBtn?.querySelector("img");


// ========================
// FUNCTIES
// ========================

// FONT SIZING
function cycleFontSize() {
    const root = document.documentElement;
    if (fontStep === 0) {
        root.style.setProperty('--base-font-size', '150%');
        fontStep = 1;
    } else {
        root.style.setProperty('--base-font-size', '100%');
        fontStep = 0;
    }
}

// DARK AND LIGHT
function updateThemeUI() {
    const dark = body.classList.contains("dark-theme");

    if (themeIcon) {
        themeIcon.src = dark ? "images/maan.svg" : "images/zon.svg";
        themeIcon.alt = dark ? "Switch to light theme" : "Switch to dark theme";
    }
}


// ========================
// INIT THEMA
// ========================
if (savedTheme) {
    body.classList.add(savedTheme);
} else {
    if (body.classList.contains("reggaepage")) {
        body.classList.add("dark-theme");
    } else {
        body.classList.add("light-theme");
    }
}
updateThemeUI();

// Toggle knop
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        if (body.classList.contains("light-theme")) {
            body.classList.remove("light-theme");
            body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark-theme");
        } else {
            body.classList.remove("dark-theme");
            body.classList.add("light-theme");
            localStorage.setItem("theme", "light-theme");
        }
        updateThemeUI();
    });
}


// ========================
// VIDEO & AUDIO
// ========================
if (video && audio && videoBtn && videoBtnImg) {
    audio.play().catch(() => {
        // fallback voor browsers die autoplay blokkeren
        audio.muted = true;
        audio.play();
    });

    // initial icon check
    videoBtnImg.src = video.paused ? "images/playbutton.svg" : "images/pausebutton.svg";

    // klik event: video en audio synchroon
    videoBtn.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            audio.play();
            videoBtnImg.src = "images/pausebutton.svg";
        } else {
            video.pause();
            audio.pause();
            videoBtnImg.src = "images/playbutton.svg";
        }
    });
}
