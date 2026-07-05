// Project Data for Modals
const projectsData = {
    1: {
        title: "Plan d'Exécution de Structure (Fondations & Poteaux)",
        category: "Plans 2D",
        img: "assets/project_2d.jpg",
        description: "Ce projet présente le dossier d'exécution complet des structures en béton armé d'un immeuble résidentiel R+4. Il comprend le plan de coffrage détaillé des fondations (semelles isolées et filantes), le plan de ferraillage de la dalle basse, ainsi que les détails d'armatures des poteaux et poutres les plus sollicités. Tous les dessins ont été conçus en étroite collaboration avec l'ingénieur calcul conformément aux normes Eurocode 2 et intègrent des nomenclatures d'aciers précises pour le façonnage.",
        meta: {
            client: "BTP Construction Services",
            logiciels: "ArchiCAD",
            annee: "2024",
            role: "Dessinateur Projeteur"
        }
    },
    2: {
        title: "Modélisation BIM 3D d'un Complexe Tertiaire Mixte",
        category: "Maquette BIM",
        img: "assets/project_3d.jpg",
        description: "Conception et modélisation de la maquette numérique structurelle (LOD 350) d'un complexe mixte sous Revit, suivie du calcul de descente de charges et du dimensionnement des éléments porteurs en béton armé et charpente métallique sous Robot Structural Analysis. Ce projet a permis d'optimiser les sections de poteaux et de dalles selon les contraintes de charges, assurant la conformité structurelle aux Eurocodes.",
        meta: {
            client: "Archipôle Partners",
            logiciels: "Autodesk Revit, Robot Structure",
            annee: "2025",
            role: "Modélisateur BIM & Projeteur Structure"
        }
    },
    3: {
        title: "Villa Contemporaine en Bord de Lac - Visualisation 3D",
        category: "Rendu Photoréaliste",
        img: "assets/project_render.jpg",
        description: "Production de rendus 3D photoréalistes pour la promotion immobilière et l'intégration paysagère (dossier de permis de construire). L'accent a été mis sur la fidélité des matériaux (béton architectural sablé, verre à faible émissivité, bardage en cèdre naturel) et sur le réalisme de l'environnement grâce à un éclairage global HDRI de fin de journée. Le traitement de l'eau du lac et les reflets du bâtiment dans la piscine au premier plan ont fait l'objet d'une post-production soignée sous Photoshop.",
        meta: {
            client: "Promoteur Immobilier Privé",
            logiciels: "Blender, Lumion, Adobe Photoshop",
            annee: "2025",
            role: "Concepteur 3D & Artiste Rendu"
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SCROLL EFFECT ON HEADER & SCROLLSPY
    // ==========================================
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Toggle header background on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scrollspy: Highlight active nav link based on section scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // 3. STATS COUNT-UP ANIMATION
    // ==========================================
    const stats = document.querySelectorAll('.stat-num');
    let animatedStats = false;

    const countUp = () => {
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // If stats section is in viewport and not yet animated
        if (sectionTop < windowHeight - 50 && !animatedStats) {
            animatedStats = true;
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-val'));
                const duration = 1500; // milliseconds
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const currentVal = Math.floor(progress * target);
                    
                    // Add "+" or "%" based on the text
                    if (stat.textContent.includes('+')) {
                        stat.textContent = currentVal + '+';
                    } else if (stat.textContent.includes('%')) {
                        stat.textContent = currentVal + '%';
                    } else {
                        stat.textContent = currentVal;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = stat.getAttribute('data-val') + (stat.textContent.includes('+') ? '+' : stat.textContent.includes('%') ? '%' : '');
                    }
                };

                requestAnimationFrame(updateCount);
            });
        }
    };

    window.addEventListener('scroll', countUp);
    countUp(); // Check if initially in view

    // ==========================================
    // 4. PORTFOLIO FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hidden');
                    // Simple animation reflow
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    // Delay hiding element physically to allow transition
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // 5. PROJECT DETAILS MODAL (LIGHTBOX)
    // ==========================================
    const projectModal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const projectCards = document.querySelectorAll('.portfolio-item');

    const openModal = (projectId) => {
        const project = projectsData[projectId];
        if (!project) return;

        // Build HTML for inside the modal
        modalBody.innerHTML = `
            <div class="modal-grid">
                <div class="modal-image-area">
                    <img src="${project.img}" alt="${project.title}">
                </div>
                <div class="modal-info-area">
                    <span class="modal-project-tag">${project.category}</span>
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    
                    <ul class="modal-meta-list">
                        <li>
                            <span>Client / Projet :</span>
                            <span>${project.meta.client}</span>
                        </li>
                        <li>
                            <span>Logiciels utilisés :</span>
                            <span>${project.meta.logiciels}</span>
                        </li>
                        <li>
                            <span>Année :</span>
                            <span>${project.meta.annee}</span>
                        </li>
                        <li>
                            <span>Rôle :</span>
                            <span>${project.meta.role}</span>
                        </li>
                    </ul>
                    
                    <a href="#contact" class="btn btn-primary btn-sm modal-cta-btn" style="width: 100%; text-align: center;">Demander un projet similaire</a>
                </div>
            </div>
        `;

        // Smooth scroll details button to contact if clicked
        const modalCta = modalBody.querySelector('.modal-cta-btn');
        modalCta.addEventListener('click', (e) => {
            closeModal();
        });

        // Show Modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent main page scrolling
    };

    const closeModal = () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        // Close if click is on overlay itself, not the wrapper/content
        if (e.target === projectModal) {
            closeModal();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ==========================================
    // 6. CONTACT FORM SUBMISSION (SIMULATED)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show sending state
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = 'Envoi en cours... <i class="fa-solid fa-circle-notch fa-spin" style="margin-left: 8px;"></i>';

        // Simulate network request (1.5 seconds)
        setTimeout(() => {
            // Reset button
            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = 'Envoyer le message <i class="fa-solid fa-paper-plane" style="margin-left: 8px;"></i>';

            // Show success message
            formFeedback.textContent = "Merci ! Votre message a bien été envoyé. Je reviendrai vers vous rapidement.";
            formFeedback.className = "form-feedback success";

            // Clear form
            contactForm.reset();

            // Clear feedback after 5 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 6000);
        }, 1500);
    });

});
