/* =========================================================
   GuardHealth Technologies
   animations.js
   Premium Motion Engine
========================================================= */

function initAnimations() {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sections = document.querySelectorAll("section");
    const revealElements = document.querySelectorAll(
        ".fade-up, .fade-down, .fade-left, .fade-right, .scale-in"
    );

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px"
    });

    revealElements.forEach(el => observer.observe(el));

    /* =====================================================
       CENTER FOCUS EFFECT
    ===================================================== */

    let ticking = false;

    function updateFocus() {

        const viewportCenter = window.innerHeight / 2;
        const maxDistance = window.innerHeight * 0.75;

        sections.forEach(section => {

            const rect = section.getBoundingClientRect();

            const sectionCenter =
                rect.top + rect.height / 2;

            const distance =
                Math.abs(viewportCenter - sectionCenter);

            const progress =
                Math.min(distance / maxDistance, 1);

            const opacity =
                1 - progress * 0.7;

            const scale =
                1 - progress * 0.04;

            const blur =
                progress * 2;

            section.style.opacity = opacity;
            section.style.transform = `scale(${scale})`;
            section.style.filter = `blur(${blur}px)`;

        });

        ticking = false;

    }

    function requestUpdate() {

        if (!ticking) {

            requestAnimationFrame(updateFocus);

            ticking = true;

        }

    }

    window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        requestUpdate
    );

    updateFocus();

    /* =====================================================
       PARALLAX
    ===================================================== */

    const parallax = document.querySelectorAll("[data-parallax]");

    function updateParallax() {

        const scroll = window.pageYOffset;

        parallax.forEach(item => {

            const speed =
                Number(item.dataset.parallax) || 0.15;

            item.style.transform =
                `translateY(${scroll * speed}px)`;

        });

    }

    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );

    /* =====================================================
       BUTTON MAGNETIC EFFECT
    ===================================================== */

    const magnetic =
        document.querySelectorAll(".primary, .secondary");

    magnetic.forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect = button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

    /* =====================================================
       PAGE FADE IN
    ===================================================== */

    document.body.classList.add("loaded");

    /* =====================================================
       SCROLL PROGRESS BAR
    ===================================================== */

    const progress = document.createElement("div");

    progress.id = "scrollProgress";

    Object.assign(progress.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "0%",
        height: "3px",
        zIndex: "99999",
        background: "var(--gradient-accent)",
        transformOrigin: "left center"
    });

    document.body.appendChild(progress);

    function updateProgress() {

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent =
            (window.scrollY / total) * 100;

        progress.style.width = percent + "%";

    }

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();

}
