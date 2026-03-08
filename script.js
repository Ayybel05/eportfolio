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
    // 11. VEILLE TECHNOLOGIQUE DYNAMIQUE
    // ========================================
    
    // Configuration de la veille - sources RSS/API
    const veilleConfig = {
        // Pour utiliser NewsAPI (gratuit), obtenez une clé API sur newsapi.org
        // et remplacez YOUR_API_KEY ci-dessous
        newsApiKey: 'YOUR_API_KEY',
        keywords: ['IoT', 'Smart City', 'Internet of Things', 'Smart Cities'],
        defaultArticles: [
            {
                source: 'Orange IoT Journey',
                date: 'Mars 2026',
                title: 'Les solutions IoT dans la Smart City',
                excerpt: 'Découvrez comment l\'IoT révolutionne les villes intelligentes. Les objets connectés permettent d\'optimiser la gestion urbaine, de l\'éclairage public à la gestion des déchets...',
                tags: ['IoT', 'Smart City', 'Connectivité'],
                url: 'https://iotjourney.orange.com/fr-FR/explorer/les-solutions-iot/iot-dans-le-smart-city'
            },
            {
                source: 'Matooma',
                date: 'Février 2026',
                title: 'Smart City : Ces objets connectés qui nous entourent',
                excerpt: 'Lampadaires intelligents, capteurs de pollution, poubelles connectées... Les objets IoT sont partout dans nos villes.',
                tags: ['M2M', 'Capteurs', 'Ville connectée'],
                url: 'https://www.matooma.com/fr/s-informer/actualites-iot-m2m/smart-city-quels-sont-ces-objets-connectes-qui-nous-entourent-au-quotidien'
            },
            {
                source: 'Application IoT',
                date: 'Janvier 2026',
                title: 'Fonctionnement d\'une Smart City',
                excerpt: 'Comment fonctionne réellement une ville intelligente ? De la collecte de données via des capteurs IoT à leur analyse en temps réel...',
                tags: ['Infrastructure', 'Data', 'Gestion urbaine'],
                url: 'https://www.application-iot.fr/fonctionnement-smart-city/'
            },
            {
                source: 'Application IoT',
                date: 'Décembre 2025',
                title: 'Villes intelligentes : Actualités technologiques',
                excerpt: 'Restez informé des dernières innovations IoT pour les Smart Cities. Nouvelles solutions de mobilité, réseaux LoRaWAN...',
                tags: ['Innovation', 'LoRaWAN', 'Mobilité'],
                url: 'https://www.application-iot.fr/actualites-technologiques/villes-intelligentes-iot/'
            },
            {
                source: 'Diehl Metering',
                date: 'Novembre 2025',
                title: 'L\'avenir des Smart Cities avec le Smart Metering',
                excerpt: 'Le comptage intelligent (Smart Metering) est au cœur de la transition énergétique urbaine...',
                tags: ['Smart Metering', 'Énergie', 'Durabilité'],
                url: 'https://www.diehl.com/metering/fr/produits-et-solutions/solutions/solutions-de-connectivite/discover-the-future-of-smart-cities-with-smart-metering/'
            },
            {
                source: 'Hostragons',
                date: 'Octobre 2025',
                title: 'Risques de sécurité des appareils IoT',
                excerpt: 'Les objets connectés présentent aussi des vulnérabilités. Attaques DDoS, piratage de données...',
                tags: ['Cybersécurité', 'Risques', 'Protection'],
                url: 'https://www.hostragons.com/fr/blog/risques-de-securite-des-appareils-connectes-avec-la-securite-iot/'
            }
        ]
    };

    // Fonction pour charger les articles
    async function loadVeilleArticles(useApi = false) {
        const veilleGrid = document.getElementById('veilleGrid');
        const refreshBtn = document.getElementById('refreshArticles');
        const lastUpdateEl = document.getElementById('lastUpdate');
        
        // Animation de chargement
        refreshBtn.classList.add('spinning');
        veilleGrid.innerHTML = '<div class="veille-loading">🔍 Recherche des derniers articles...</div>';
        
        try {
            let articles = [];
            
            if (useApi && veilleConfig.newsApiKey !== 'YOUR_API_KEY') {
                // Requête API réelle (NewsAPI)
                const query = veilleConfig.keywords.join(' OR ');
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=fr&sortBy=publishedAt&pageSize=6&apiKey=${veilleConfig.newsApiKey}`
                );
                
                if (!response.ok) throw new Error('API Error');
                
                const data = await response.json();
                articles = data.articles.map(article => ({
                    source: article.source.name,
                    date: new Date(article.publishedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
                    title: article.title,
                    excerpt: article.description || 'Cliquez pour lire l\'article complet...',
                    tags: ['IoT', 'Smart City', 'Actualité'],
                    url: article.url
                }));
            } else {
                // Simulation d'API avec articles par défaut
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Mélanger les articles pour simuler une mise à jour
                articles = [...veilleConfig.defaultArticles].sort(() => Math.random() - 0.5);
                
                // Mettre à jour la date
                const now = new Date();
                const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
                const formattedDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
                
                if (lastUpdateEl) {
                    lastUpdateEl.textContent = `Dernière mise à jour : ${formattedDate}`;
                }
            }
            
            // Rendu des articles
            renderArticles(articles);
            
        } catch (error) {
            console.error('Erreur veille:', error);
            veilleGrid.innerHTML = `
                <div class="veille-error">
                    <p>⚠️ Impossible de charger les articles en temps réel.</p>
                    <p>Les articles par défaut sont affichés.</p>
                </div>
            `;
            setTimeout(() => renderArticles(veilleConfig.defaultArticles), 2000);
        } finally {
            refreshBtn.classList.remove('spinning');
        }
    }

    // Fonction pour rendre les articles
    function renderArticles(articles) {
        const veilleGrid = document.getElementById('veilleGrid');
        
        veilleGrid.innerHTML = articles.map((article, index) => `
            <article class="veille-card glass fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="veille-header">
                    <div class="veille-source">${article.source}</div>
                    <span class="veille-date">${article.date}</span>
                </div>
                <h3>${article.title}</h3>
                <p class="veille-excerpt">${article.excerpt}</p>
                <div class="veille-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${article.url}" target="_blank" class="btn-link">
                    Lire l'article complet →
                </a>
            </article>
        `).join('');
        
        // Réappliquer les animations
        const newCards = veilleGrid.querySelectorAll('.fade-in');
        newCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    // Bouton de rafraîchissement
    const refreshBtn = document.getElementById('refreshArticles');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const veilleGrid = document.querySelector('.veille-grid');
            const lastUpdateEl = document.getElementById('lastUpdate');
            
            // Animation
            refreshBtn.classList.add('spinning');
            
            // Récupérer les articles
            const articles = Array.from(veilleGrid.querySelectorAll('.veille-card'));
            
            // Animation de sortie
            articles.forEach(card => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
            });
            
            // Après l'animation de sortie, mélanger et réafficher
            setTimeout(() => {
                // Mélanger les articles
                articles.sort(() => Math.random() - 0.5);
                
                // Réorganiser dans le DOM
                articles.forEach(article => veilleGrid.appendChild(article));
                
                // Mettre à jour la date
                const now = new Date();
                const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
                const formattedDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
                if (lastUpdateEl) {
                    lastUpdateEl.textContent = `Dernière mise à jour : ${formattedDate}`;
                }
                
                // Animation d'entrée
                articles.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, index * 100);
                });
                
                // Arrêter l'animation du bouton
                refreshBtn.classList.remove('spinning');
            }, 300);
        });
    }

    // ========================================
    // 12. CONSOLE EASTER EGG
    // ========================================
    console.log('%c👋 Hey ! Tu inspectes mon code ?', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Portfolio développé avec passion par Ayyoub BELHASSEN', 'color: #94a3b8; font-size: 14px;');
    console.log('%c📧 Contact : ayyoubbelhassen05@gmail.com', 'color: #6366f1; font-size: 12px;');

});
