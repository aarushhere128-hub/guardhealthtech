/* =========================================================
   GuardHealth Technologies
   theme.js
   Handles light/dark mode
========================================================= */

function initTheme() {

    const STORAGE_KEY = "guardhealth-theme";

    const html = document.documentElement;

    const toggleDesktop = document.getElementById("themeToggle");
    const toggleMobile = document.getElementById("themeToggleMobile");

    /* =====================================================
       INITIAL THEME
    ===================================================== */

    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {

        html.setAttribute("data-theme", savedTheme);

    } else {

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        html.setAttribute(
            "data-theme",
            prefersDark ? "dark" : "light"
        );

    }

    updateIcons();

    /* =====================================================
       TOGGLE FUNCTION
    ===================================================== */

    function toggleTheme() {

        const current =
            html.getAttribute("data-theme");

        const next =
            current === "dark"
            ? "light"
            : "dark";

        html.setAttribute("data-theme", next);

        localStorage.setItem(STORAGE_KEY, next);

        updateIcons();

    }

    /* =====================================================
       UPDATE BUTTON ICONS
    ===================================================== */

    function updateIcons() {

        const dark =
            html.getAttribute("data-theme") === "dark";

        if (toggleDesktop) {

            toggleDesktop.textContent =
                dark ? "☀️" : "🌙";

            toggleDesktop.setAttribute(
                "aria-label",
                dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

        }

        if (toggleMobile) {

            toggleMobile.textContent =
                dark
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode";

        }

    }

    /* =====================================================
       EVENTS
    ===================================================== */

    if (toggleDesktop) {

        toggleDesktop.addEventListener(
            "click",
            toggleTheme
        );

    }

    if (toggleMobile) {

        toggleMobile.addEventListener(
            "click",
            toggleTheme
        );

    }

    /* =====================================================
       FOLLOW SYSTEM THEME
       (only if user hasn't chosen one)
    ===================================================== */

    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {

            if (localStorage.getItem(STORAGE_KEY)) return;

            html.setAttribute(
                "data-theme",
                event.matches ? "dark" : "light"
            );

            updateIcons();

        });

}
