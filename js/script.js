/* =========================================================
   EventHub - script.js
   Interacciones:
   1) Filtro de eventos por categoría
   2) Validación del formulario de contacto
   3) Resaltado del enlace activo del navbar según la sección visible
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1) Filtro de eventos por categoría ---------- */
    const categoryButtons = document.querySelectorAll('.category-btn');
    const eventItems = document.querySelectorAll('.event-item');
    const noResults = document.getElementById('noResults');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isActive = btn.classList.contains('active');

            // Quitar estado activo de todos los botones
            categoryButtons.forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-outline-primary');
                b.setAttribute('aria-pressed', 'false');
            });

            if (isActive) {
                // Si ya estaba activo, mostrar todos los eventos (quitar filtro)
                eventItems.forEach(item => item.classList.remove('d-none'));
                noResults.classList.add('d-none');
                return;
            }

            // Activar el botón clickeado
            btn.classList.add('active', 'btn-primary');
            btn.classList.remove('btn-outline-primary');
            btn.setAttribute('aria-pressed', 'true');

            const filter = btn.dataset.filter;
            let visibleCount = 0;

            eventItems.forEach(item => {
                if (item.dataset.category === filter) {
                    item.classList.remove('d-none');
                    visibleCount++;
                } else {
                    item.classList.add('d-none');
                }
            });

            noResults.classList.toggle('d-none', visibleCount > 0);
        });
    });

    /* ---------- 2) Validación del formulario de contacto ---------- */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                formSuccess.classList.add('d-none');
                return;
            }

            // Formulario válido: simular envío exitoso
            contactForm.classList.remove('was-validated');
            formSuccess.classList.remove('d-none');
            contactForm.reset();

            // Ocultar el mensaje de éxito luego de unos segundos
            setTimeout(() => formSuccess.classList.add('d-none'), 4000);
        });
    }

    /* ---------- 3) Resaltado del enlace activo del navbar ---------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('#navLinks .nav-link');

    const highlightNav = () => {
        let currentId = '';
        const scrollPos = window.scrollY + 120; // compensa altura del navbar

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    };

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // ejecutar al cargar la página

});
