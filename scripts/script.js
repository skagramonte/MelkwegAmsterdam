// ======================
// FONT SIZING
// ======================
let fontStep = 0; // 0 = normaal, 1 = 150%

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

// ======================
// DARK AND LIGHT
// ======================
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle?.querySelector("img");

// opgeslagen voorkeur
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme);
} else {
    if (body.classList.contains("reggaepage")) {
        body.classList.add("dark-theme");
    } else {
        body.classList.add("light-theme");
    }
}

function updateThemeUI() {
    const dark = body.classList.contains("dark-theme");

    if (!body.classList.contains('reggaepage')) {
        document.querySelectorAll('header h1, header p').forEach(el => {
            el.style.color = dark ? "#fff" : "#000";
        });

        document.querySelectorAll('.events article h2').forEach(el => {
            el.style.color = "#fff";
        });
        document.querySelectorAll('.events article time').forEach(el => {
            el.style.color = dark ? "#fff" : "#000";
        });

        document.querySelectorAll('main > section:not(.events) *:not(h2, h3, h4, img, time)').forEach(el => {
            el.style.color = dark ? "#fff" : "#000";
        });
        document.querySelectorAll('main > section:not(.events) h2, main > section:not(.events) h3, main > section:not(.events) h4').forEach(el => {
            el.style.color = dark ? "#fff" : "#000";
        });

        document.querySelectorAll('main > section:not(.events) time').forEach(el => {
            el.style.color = dark ? "#fff" : "#000";
        });
    }

    if (body.classList.contains('reggaepage')) {
        document.querySelectorAll('main *:not(section:nth-of-type(4) article) :not(img):not(video):not(iframe)').forEach(el => el.style.color = dark ? "#fff" : "#000"); 
        const newsletter = document.querySelector('.reggaepage section:nth-of-type(4) article');
        if (newsletter) {
            newsletter.style.color = "#000";
            newsletter.querySelectorAll('*').forEach(el => el.style.color = "#000");
        }
    }

    body.style.backgroundColor = dark ? "#000" : "#fff";
    body.style.color = dark ? "#fff" : "#000";

    if (themeIcon) {
        themeIcon.src = dark ? "images/maan.svg" : "images/zon.svg";
        themeIcon.alt = dark ? "Switch to light theme" : "Switch to dark theme";
    }
}

updateThemeUI();

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

// ======================
// VIDEO & AUDIO PLAY/PAUSE
// ======================

// Selecteer video, audio en knop in header
const videoWrapper = document.querySelector(".video-wrapper");
const video = videoWrapper.querySelector("video");
const audio = videoWrapper.querySelector("audio");
const videoBtn = videoWrapper.querySelector("button");
const videoBtnImg = videoBtn.querySelector("img");

// Start audio automatisch bij paginalaad
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
