/* =========================================================
   GuardHealth Technologies
   navbar.js
   Premium Navigation System
========================================================= */

function initNavbar() {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.querySelector("header");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll("#navMenu a");

    if (!header) return;

    /* =====================================================
       STICKY / SHRINK NAVBAR
    ===================================================== */

    function updateNavbar() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        if (!navMenu) return;

        navMenu.classList.add("active");

        hamburger?.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeMenu() {

        if (!navMenu) return;

        navMenu.classList.remove("active");

        hamburger?.classList.remove("active");

        document.body.style.overflow = "";

    }

    function toggleMenu() {

        if (!navMenu) return;

        if (navMenu.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    }

    hamburger?.addEventListener("click", toggleMenu);

    /* =====================================================
       CLOSE MENU WHEN LINK CLICKED
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });

    /* =====================================================
       CLOSE ON OUTSIDE CLICK
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!navMenu || !hamburger) return;

        const clickedInside =
            navMenu.contains(event.target) ||
            hamburger.contains(event.target);

        if (!clickedInside) {

            closeMenu();

        }

    });

    /* =====================================================
       ESC TO CLOSE
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });

    /* =====================================================
       ACTIVE LINK HIGHLIGHT
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;
            const height = section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < top + height
            ) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${current}`) {

                link.classList.add("active");

            }

        });

    }

    updateActiveLink();

    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId.startsWith("#")) return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                header.offsetHeight;

            const targetPosition =
                target.offsetTop - navbarHeight - 20;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}
