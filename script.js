document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // 1. EFFET DE PARTICULES EN ARRIÈRE-PLAN
    // ========================================
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    const numberOfParticles = 80;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
    
    initParticles();
    animateParticles();

    // ========================================
    // 2. EFFET DE TYPING SUR LE NOM
    // ========================================
    const typedTextSpan = document.querySelector('.typed-text');
    const textToType = 'BELHASSEN';
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < textToType.length) {
            typedTextSpan.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 150);
        }
    }
    
    setTimeout(typeText, 500);

    // ========================================
    // 3. BARRE DE PROGRESSION DU SCROLL
    // ========================================
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });

    // ========================================
    // 4. BOUTON RETOUR EN HAUT
    // ========================================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // 5. NAVIGATION ACTIVE AU SCROLL
    // ========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Header effet au scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================================
    // 6. ANIMATION D'APPARITION DES ÉLÉMENTS
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ========================================
    // 7. SMOOTH SCROLL POUR LES LIENS
    // ========================================
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 8. FORMULAIRE DE CONTACT FONCTIONNEL
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !message) {
            showFeedback('Veuillez remplir tous les champs.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFeedback('Veuillez entrer un email valide.', 'error');
            return;
        }

        // Simulation d'envoi (à remplacer par vraie logique)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simuler un délai d'envoi
        setTimeout(() => {
            showFeedback('Message envoyé avec succès ! Je vous recontacterai rapidement.', 'success');
            contactForm.reset();
            submitBtn.textContent = 'Envoyer le message';
            submitBtn.disabled = false;

            // Créer un lien mailto comme fallback
            const mailtoLink = `mailto:ayyoubbelhassen05@gmail.com?subject=Contact depuis le portfolio&body=Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            
            // Optionnel : ouvrir le client mail
            // window.location.href = mailtoLink;
        }, 1500);
    });

    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        
        setTimeout(() => {
            formFeedback.style.display = 'none';
            formFeedback.className = 'form-feedback';
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ========================================
    // 9. ANIMATIONS SUPPLÉMENTAIRES
    // ========================================
    
    // Effet parallaxe léger sur le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / 800);
        }
    });

    // Animation des compteurs (si tu veux ajouter des stats)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ========================================
    // 10. EASTER EGG - EFFET AU CLIC
    // ========================================
    document.addEventListener('click', (e) => {
        createRipple(e.pageX, e.pageY);
    });

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(99, 102, 241, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.zIndex = '9999';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Ajouter l'animation CSS pour le ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                width: 40px;
                height: 40px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // 11. CONSOLE EASTER EGG
    // ========================================
    console.log('%c👋 Hey ! Tu inspectes mon code ?', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Portfolio développé avec passion par Ayyoub BELHASSEN', 'color: #94a3b8; font-size: 14px;');
    console.log('%c📧 Contact : ayyoubbelhassen05@gmail.com', 'color: #6366f1; font-size: 12px;');

});
