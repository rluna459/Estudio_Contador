document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================
       1. MENÚ HAMBURGUESA PARA MÓVILES
       ========================================== */
    const menuBtn = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".nav__menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("nav__menu--open");
            menuBtn.setAttribute(
                "aria-expanded",
                navMenu.classList.contains("nav__menu--open")
            );
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll(".nav__link").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("nav__menu--open");
            });
        });
    }

    /* ==========================================
       2. HIGHLIGHT DE NAVEGACIÓN SEGÚN EL SCROLL
       ========================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav__link");

    const highlightNavOnScroll = () => {
        const scrollY = window.scrollY;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("nav__link--active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("nav__link--active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", highlightNavOnScroll);

    /* ==========================================
       3. BOTÓN FLOTANTE "VOLVER ARRIBA"
       ========================================== */
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("back-to-top--visible");
            } else {
                backToTopBtn.classList.remove("back-to-top--visible");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    /* ==========================================
       4. CONFIRMACIÓN Y MANEJO DEL FORMULARIO
       ========================================== */
    const contactForm = document.querySelector(".contact__form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            const nameInput = document.getElementById("subject");
            const messageInput = document.getElementById("body");

            if (!nameInput.value.trim() || !messageInput.value.trim()) {
                e.preventDefault();
                showNotification("Por favor completa todos los campos requeridos.", "error");
            } else {
                showNotification("¡Preparando tu consulta para abrir el correo!", "success");
            }
        });
    }

    // Helper: Notificación Flotante (Toast)
    function showNotification(message, type = "success") {
        let toast = document.createElement("div");
        toast.className = `toast toast--${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("toast--show");
        }, 100);

        setTimeout(() => {
            toast.classList.remove("toast--show");
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
});
