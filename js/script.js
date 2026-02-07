document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Navbar ---
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('open'); // Optional: Add animation class to burger
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    // Note: CSS scroll-behavior: smooth handles most cases, 
    // but this ensures cross-browser support and control.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Validation ---
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Reset error messages
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
            formStatus.textContent = '';

            let isValid = true;

            // Validate Name
            if (nameInput.value.trim() === '') {
                showError('name-error', 'Name is required');
                isValid = false;
            }

            // Validate Email
            if (!isValidEmail(emailInput.value.trim())) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim().length < 10) {
                showError('message-error', 'Message must be at least 10 characters');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission success
                formStatus.style.color = '#764abc'; // Accent color
                formStatus.textContent = 'Thank you! Your message has been sent (simulation).';
                form.reset();

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }
        });
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function isValidEmail(email) {
        // Simple regex for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Only activate if elements exist and device has fine pointer
    if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            // Show cursor if it was hidden (optional safety)
            cursorDot.style.opacity = 1;
            cursorOutline.style.opacity = 1;
        });

        // Smooth animation loop for outline
        const animateCursor = () => {
            // Lerp (Linear Interpolation) for smooth trailing
            // current = current + (target - current) * ease
            outlineX += (mouseX - outlineX) * 0.15; // 0.15 is the easing factor
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover Effect Logic
        const interactables = document.querySelectorAll('a, button, input, textarea, label, .skill-card, .project-card');

        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }
});
