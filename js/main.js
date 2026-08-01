/* =========================================================
   GuardHealth Technologies
   main.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("GuardHealth Technologies initialized.");

    /* ==========================================
       Core Modules
    ========================================== */

    if (typeof initTheme === "function") {
        initTheme();
    }

    if (typeof initNavbar === "function") {
        initNavbar();
    }

    if (typeof initAnimations === "function") {
        initAnimations();
    }

    if (typeof initEcosystem === "function") {
        initEcosystem();
    }

    /* ==========================================
       Remove Loading Screen
    ========================================== */

    const loader = document.querySelector(".loading-screen");

    if (loader) {

        loader.classList.add("loaded");

        setTimeout(() => {
            loader.remove();
        }, 600);

    }

});
