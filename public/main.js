document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Global intercept for placeholder links
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle (Slide-out Drawer)
    const mobileDrawer = document.getElementById('mobile-drawer-menu');
    const drawerOverlay = document.getElementById('mobile-drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');

    if (menuToggle && mobileDrawer && drawerOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            drawerOverlay.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        });

        const closeDrawer = () => {
            mobileDrawer.classList.remove('active');
            drawerOverlay.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
        };

        if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
        drawerOverlay.addEventListener('click', closeDrawer);

        // Stäng menyn när man klickar på en vanlig länk (inte submenu-togglen)
        const drawerLinks = mobileDrawer.querySelectorAll('a');
        drawerLinks.forEach(link => {
            if (link.id !== 'mobile-submenu-toggle') {
                link.addEventListener('click', closeDrawer);
            }
        });

        // Submeny Dragspel (Accordion)
        const submenuToggle = document.getElementById('mobile-submenu-toggle');
        const submenu = document.getElementById('mobile-tjanster-submenu');
        if (submenuToggle && submenu) {
            submenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                submenuToggle.classList.toggle('active');
                if (submenu.style.maxHeight) {
                    submenu.style.maxHeight = null;
                } else {
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                }
            });
        }
    }

    // Mobile Dropdown Toggle (Click-to-expand)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                // Unconditionally prevent default so href="#" doesn't append to URL
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) other.classList.remove('active');
                    });
                    
                    const isOpen = dropdown.classList.toggle('active');
                    link.setAttribute('aria-expanded', isOpen);
                }
            });
        }
    });

    // Video Play/Pause Toggle
    const video = document.getElementById('hero-video');
    const videoToggle = document.getElementById('video-toggle');
    const videoIcon = document.getElementById('video-icon');

    if (video && videoToggle) {
        videoToggle.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                videoToggle.setAttribute('aria-label', 'Pausa video');
                videoIcon.innerHTML = '<path d="M6 4h4v16H6zm8 0h4v16h-4z"/>'; // Pause icon
            } else {
                video.pause();
                videoToggle.setAttribute('aria-label', 'Spela video');
                videoIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'; // Play icon
            }
        });
    }

    // Reveal animations on load
    const panels = document.querySelectorAll('.panel-content');
    panels.forEach((panel, index) => {
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
    
    // Fade-in Animation Observer
    const faders = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        // Mobile-only: Intercept core service rows and swap their animation classes for center pop-up
        if (window.innerWidth < 768 && fader.closest('.service-row')) {
            fader.classList.remove('fade-in-left', 'fade-in-right', 'fade-in', 'fade-in-up');
            fader.classList.add('mobile-pop-standby');
            return; // Skip standard observer
        }
        appearOnScroll.observe(fader);
    });

    // --- Mobile-only Center Pop-up Observer ---
    if (window.innerWidth < 768) {
        const mobilePopObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('mobile-pop-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: "-40% 0px -40% 0px" // Triggers when element crosses the middle 20% of viewport
        });

        // Small delay to ensure classes are added before observing
        setTimeout(() => {
            const mobileFaders = document.querySelectorAll('.mobile-pop-standby');
            mobileFaders.forEach(fader => mobilePopObserver.observe(fader));
        }, 100);
    }

    // --- Projects Carousel ---
    window.initProjectsCarousel = function() {
        const carousel = document.getElementById('projects-carousel');
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        if (!track || !prevBtn || !nextBtn) return;
        const totalSlides = track.children.length;
        if (totalSlides === 0) return;
        let currentSlide = 0;

        // Clear any previous auto-play
        if (window._carouselAutoPlay) {
            clearInterval(window._carouselAutoPlay);
            window._carouselAutoPlay = null;
        }

        // Remove old listeners by cloning buttons
        const newPrev = prevBtn.cloneNode(true);
        const newNext = nextBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);

        function goToSlide(index) {
            currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach(d => {
                d.classList.remove('active');
                d.removeAttribute('aria-current');
            });
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
                dots[currentSlide].setAttribute('aria-current', 'true');
            }
        }

        function startAutoPlay() {
            stopAutoPlay();
            window._carouselAutoPlay = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        }

        function stopAutoPlay() {
            if (window._carouselAutoPlay) {
                clearInterval(window._carouselAutoPlay);
                window._carouselAutoPlay = null;
            }
        }

        newNext.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            startAutoPlay();
        });

        newPrev.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            startAutoPlay();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
                startAutoPlay();
            });
        });

        // Reset to first slide and start
        goToSlide(0);
        startAutoPlay();

        // --- Touch Swipe Support for Mobile ---
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            stopAutoPlay();
        }, {passive: true});

        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            startAutoPlay();
        }, {passive: true});

        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Only trigger if horizontal movement is larger than vertical (not scrolling) and exceeds threshold
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                if (deltaX < 0) {
                    goToSlide(currentSlide + 1);
                } else {
                    goToSlide(currentSlide - 1);
                }
            }
        }
    };

    // Auto-initialize only if carousel is NOT marked as dynamic
    const carousel = document.getElementById('projects-carousel');
    if (carousel && !carousel.hasAttribute('data-dynamic')) {
        window.initProjectsCarousel();
    }

    // Animated Stat Counters
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    const duration = 2000;
                    const startTime = performance.now();

                    function animate(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out quad
                        const eased = 1 - (1 - progress) * (1 - progress);
                        el.textContent = Math.floor(eased * target);
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            el.textContent = target;
                        }
                    }
                    requestAnimationFrame(animate);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                const filterValue = btn.dataset.filter;
                // Fetch dynamically loaded cards
                const currentProjectCards = document.querySelectorAll('.project-card');
                currentProjectCards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.classList.remove('is-hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.classList.add('visible');
                        }, 10);
                    } else {
                        card.classList.add('is-hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    }
                });
            });
        });
    }

    // --- Premium Blog Card Intersection Observer ---
    const premiumBlogCards = document.querySelectorAll('.premium-blog-card');
    if (premiumBlogCards.length > 0) {
        const blogCardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    blogCardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        premiumBlogCards.forEach(el => blogCardObserver.observe(el));
    }

    // --- Premium Blog Filtering ---
    const blogFilterBtns = document.querySelectorAll('.blog-filter-nav-v2 button, .blog-filter-nav button');

    if (blogFilterBtns.length > 0) {
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                blogFilterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                const filterValue = btn.dataset.filter;
                // Fetch dynamically loaded blog cards
                const currentBlogCardsList = document.querySelectorAll('.premium-blog-card');
                currentBlogCardsList.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.classList.remove('is-hidden');
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 50);
                    } else {
                        card.classList.add('is-hidden');
                        card.classList.remove('visible');
                    }
                });
            });
        });
    }

    // --- Partner Cards Staggered Animation ---
    const partnerCards = document.querySelectorAll('.partner-card');
    if (partnerCards.length > 0) {
        const partnerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    partnerCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150);
                    });
                    partnerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const grid = document.querySelector('.partnerships-grid');
        if (grid) partnerObserver.observe(grid);
    }

    // --- File Size Validation (Max 5MB) ---
    const fileInput = document.getElementById('file-upload');
    const fileError = document.getElementById('file-error');
    const fileLabelText = document.getElementById('file-label-text');
    const submitBtn = document.getElementById('submit-btn');

    if (fileInput && submitBtn) {
        // Form is initially enabled
        submitBtn.disabled = false; 

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            
            // Update label text if file is selected
            if (file) {
                fileLabelText.textContent = file.name.length > 25 ? file.name.substring(0, 22) + "..." : file.name;
            } else {
                fileLabelText.textContent = "Ingen fil vald";
            }

            if (file && file.size > 5 * 1024 * 1024) {
                fileError.style.display = 'block';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
                submitBtn.style.cursor = 'not-allowed';
            } else {
                if (fileError) fileError.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }
        });
    }

    // --- Dynamic Select Color (Placeholder matching) ---
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', () => {
            if (serviceSelect.value !== "") {
                serviceSelect.style.color = '#1B263B'; // Dark Navy for selection
            }
        });
    }

    // --- Premium FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.closest('.faq-item');
                const isActive = item.classList.contains('active');
                
                // Close other items for a more focused premium experience
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // --- Contact Form Submission Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'SKICKAR...';
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    // Dölj formuläret och visa tack-rutan
                    contactForm.style.display = 'none';
                    const successMessage = document.getElementById('form-success-message');
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.style.animation = 'fadeInUp 0.5s ease forwards';
                    }
                    
                    // Uppdatera URL tyst för GTM-spårning
                    if (window.history && window.history.pushState) {
                        window.history.pushState(null, '', '/kontakt/tack');
                    }
                    
                    // Hantera "Tillbaka"-knappen
                    const backBtn = document.getElementById('success-back-btn');
                    if (backBtn) {
                        backBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (window.history && window.history.pushState) {
                                window.history.pushState(null, '', '/kontakt');
                            }
                            if (successMessage) successMessage.style.display = 'none';
                            contactForm.style.display = 'block';
                        }, { once: true });
                    }

                    contactForm.reset();
                    const fileLabel = document.getElementById('file-label-text');
                    if(fileLabel) fileLabel.textContent = 'Ingen fil vald';
                } else {
                    alert('Ett fel uppstod: ' + (result.error || 'Försök igen senare.'));
                }
            } catch (error) {
                console.error(error);
                alert('Något gick snett. Kontrollera din uppkoppling och försök igen.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
});

/* --- GDPR Intercept Logic --- */
window.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    const gdprModal = document.getElementById('gdpr-modal');
    
    if (newsletterForm && gdprModal) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            gdprModal.classList.add('active'); 
            gdprModal.setAttribute('aria-hidden', 'false');
        });

        const closeModal = () => {
            gdprModal.classList.remove('active');
            gdprModal.setAttribute('aria-hidden', 'true');
        };

        const closeBtn = gdprModal.querySelector('.modal-close');
        const cancelBtn = gdprModal.querySelector('.gdpr-cancel');
        const acceptBtn = gdprModal.querySelector('.gdpr-accept');

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                closeModal();
                setTimeout(() => {
                    alert('Tack! Ditt samtycke är verifierat och din e-post registrerad.');
                    newsletterForm.reset();
                }, 400);
            });
        }
        
        gdprModal.addEventListener('click', (e) => {
            if (e.target === gdprModal) {
                closeModal();
            }
        });
    }
});

/* --- FAQ Expand Toggle Logic --- */
window.addEventListener('DOMContentLoaded', () => {
    const faqToggles = [
        { btn: 'faq-toggle-konstruktion', panel: 'faq-extra-konstruktion' },
        { btn: 'faq-toggle-skyddsrum',    panel: 'faq-extra-skyddsrum'    },
    ];

    faqToggles.forEach(({ btn, panel }) => {
        const button = document.getElementById(btn);
        const extra  = document.getElementById(panel);
        if (!button || !extra) return;

        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                extra.classList.remove('is-open');
                extra.setAttribute('aria-hidden', 'true');
                button.setAttribute('aria-expanded', 'false');
                button.querySelector('.btn-label').textContent = 'VISA FLER FAQs';
            } else {
                extra.classList.add('is-open');
                extra.setAttribute('aria-hidden', 'false');
                button.setAttribute('aria-expanded', 'true');
                button.querySelector('.btn-label').textContent = 'VISA FÄRRE FAQs';
            }
        });
    });
});

/* --- GDPR Cookie Consent Logic --- */
(function() {
    const CONSENT_KEY = 'gc_cookie_consent';

    function getConsent() {
        try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
    }

    function setConsent(obj) {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...obj, ts: Date.now() }));
    }

    function hideBanner() {
        const b = document.getElementById('cookie-banner');
        if (b) { b.classList.remove('visible'); setTimeout(() => b.remove(), 600); }
    }

    function hideModal() {
        const m = document.getElementById('cookie-modal-overlay');
        if (m) m.classList.remove('active');
    }

    function showModal() {
        const m = document.getElementById('cookie-modal-overlay');
        if (m) m.classList.add('active');
    }

    function applyConsent(consent) {
        // Placeholder: fire analytics / marketing scripts here based on consent
        // e.g. if (consent.analytics) { /* init GA */ }
    }

    window.addEventListener('DOMContentLoaded', () => {
        const existing = getConsent();
        if (existing) { applyConsent(existing); return; } // Already answered

        // Inject banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie-inställningar');
        banner.innerHTML = `
            <div class="cookie-banner-inner">
                <div class="cookie-text">
                    <strong>Vi respekterar din integritet</strong>
                    <p>Vi använder cookies för att förbättra din upplevelse och analysera trafik. Läs mer i vår <a href="integritetspolicy">Integritetspolicy</a> och <a href="cookies">Cookiepolicy</a>.</p>
                </div>
                <div class="cookie-actions">
                    <button class="btn-cookie-accept" id="cookie-accept-all">Acceptera alla</button>
                    <button class="btn-cookie-reject" id="cookie-reject">Endast nödvändiga</button>
                    <button class="btn-cookie-settings" id="cookie-open-settings">Hantera inställningar</button>
                </div>
            </div>`;
        document.body.appendChild(banner);
        setTimeout(() => banner.classList.add('visible'), 400);

        // Inject settings modal HTML
        const modal = document.createElement('div');
        modal.id = 'cookie-modal-overlay';
        modal.className = 'cookie-modal-overlay';
        modal.innerHTML = `
            <div class="cookie-modal" role="dialog" aria-modal="true" aria-label="Cookie-inställningar">
                <h3>Hantera cookie-inställningar</h3>
                <p>Välj vilka kategorier av cookies du godkänner. Nödvändiga cookies kan inte avaktiveras eftersom de krävs för att webbplatsen ska fungera.</p>

                <div class="cookie-category">
                    <div class="cookie-category-info">
                        <strong>Nödvändiga</strong>
                        <span>Krävs för grundläggande funktioner. Kan inte avaktiveras.</span>
                    </div>
                    <label class="cookie-toggle">
                        <input type="checkbox" id="toggle-necessary" checked disabled>
                        <span class="cookie-toggle-slider"></span>
                    </label>
                </div>

                <div class="cookie-category">
                    <div class="cookie-category-info">
                        <strong>Analytiska</strong>
                        <span>Hjälper oss förstå hur besökare använder sajten (t.ex. Google Analytics).</span>
                    </div>
                    <label class="cookie-toggle">
                        <input type="checkbox" id="toggle-analytics">
                        <span class="cookie-toggle-slider"></span>
                    </label>
                </div>

                <div class="cookie-category">
                    <div class="cookie-category-info">
                        <strong>Marknadsföring</strong>
                        <span>Används för riktad reklam och remarketing på externa plattformar.</span>
                    </div>
                    <label class="cookie-toggle">
                        <input type="checkbox" id="toggle-marketing">
                        <span class="cookie-toggle-slider"></span>
                    </label>
                </div>

                <div class="cookie-modal-actions">
                    <button class="btn-cookie-reject" id="cookie-modal-cancel">Avbryt</button>
                    <button class="btn-cookie-save" id="cookie-save-settings">Spara inställningar</button>
                </div>
            </div>`;
        document.body.appendChild(modal);

        // Close modal on overlay click
        modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });

        // Button logic
        document.getElementById('cookie-accept-all').addEventListener('click', () => {
            const consent = { necessary: true, analytics: true, marketing: true };
            setConsent(consent); applyConsent(consent); hideBanner();
        });

        document.getElementById('cookie-reject').addEventListener('click', () => {
            const consent = { necessary: true, analytics: false, marketing: false };
            setConsent(consent); applyConsent(consent); hideBanner();
        });

        document.getElementById('cookie-open-settings').addEventListener('click', showModal);
        document.getElementById('cookie-modal-cancel').addEventListener('click', hideModal);

        document.getElementById('cookie-save-settings').addEventListener('click', () => {
            const consent = {
                necessary: true,
                analytics:  document.getElementById('toggle-analytics').checked,
                marketing:  document.getElementById('toggle-marketing').checked,
            };
            setConsent(consent); applyConsent(consent); hideBanner(); hideModal();
        });
    });
})();


/* =====================================================
   SCROLL LINE ANIMATION
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const path = document.getElementById('services-path');
    if (path) {
        const pathLength = 3000;
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
            const draw = pathLength * scrollPercent * 1.5; // Multiply for faster draw
            path.style.strokeDashoffset = pathLength - draw;
        });
    }
});



/* =====================================================
   SCROLL LINE ANIMATION FIXED
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const path = document.getElementById('services-path');
    if (path) {
        const pathLength = 4000;
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
            const draw = pathLength * scrollPercent * 1.5; 
            path.style.strokeDashoffset = pathLength - draw;
        });
    }
});



/* =====================================================
   UNIVERSAL SCROLL LINE COMPONENT
   ===================================================== */
const updateScrollLine = () => {
    const paths = document.querySelectorAll('.scroll-line');
    paths.forEach(path => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPos = window.scrollY;
        const progress = Math.min(scrollPos / totalHeight, 1);
        
        // Path length is hardcoded to 10000 to cover longest pages
        const length = 10000; 
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length - (length * progress * 2); // Factor for faster reveal
    });
};

window.addEventListener('scroll', updateScrollLine);
window.addEventListener('resize', updateScrollLine);
document.addEventListener('DOMContentLoaded', updateScrollLine);



/* =====================================================
   UNIVERSAL SCROLL LINE COMPONENT (REFINED)
   ===================================================== */
const updateScrollLineFixed = () => {
    const paths = document.querySelectorAll('.scroll-line');
    paths.forEach(path => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPos = window.scrollY;
        const progress = Math.min(scrollPos / totalHeight, 1);
        
        const length = 6000; 
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length - (length * progress * 2.5); // Faster reveal
    });
};

window.addEventListener('scroll', updateScrollLineFixed);
window.addEventListener('resize', updateScrollLineFixed);
document.addEventListener('DOMContentLoaded', updateScrollLineFixed);

// --- Mobile Dropdown Sync ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileDropdowns = document.querySelectorAll('.mobile-filter-dropdown');
    
    // When dropdown changes, trigger click on the corresponding pill button
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', (e) => {
            const filterValue = e.target.value;
            const matchingBtn = document.querySelector(`button[data-filter="${filterValue}"]`);
            if (matchingBtn) {
                matchingBtn.click();
            }
        });
    });

    // When a pill button is clicked (e.g. desktop), sync the dropdown's value
    const allFilterBtns = document.querySelectorAll('.filter-btn, .blog-filter-nav-v2 button, .blog-filter-nav button');
    allFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterValue = e.currentTarget.dataset.filter;
            mobileDropdowns.forEach(dropdown => {
                dropdown.value = filterValue;
            });
        });
    });
});








document.addEventListener('DOMContentLoaded', () => {
    const contentSections = document.querySelectorAll('.service-page-content');
    if (contentSections.length > 0) {
        let ticking = false;
        let scrollTimeout;
        
        const updateAnimation = () => {
            contentSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                const startPoint = windowHeight * 0.8; 
                let progress = (startPoint - rect.top) / (rect.height);
                progress = Math.max(0, Math.min(1, progress));
                
                section.style.setProperty('--scroll-progress', progress);
                
                const dirts = section.querySelectorAll('.dirt-clog');
                dirts.forEach(dirt => {
                    const depth = parseFloat(dirt.getAttribute('data-depth'));
                    dirt.style.opacity = progress > depth ? '0' : '1';
                    // Optional scale down to make it pop out smoother
                    dirt.style.transform = progress > depth ? 'scale(0.8)' : 'scale(1)';
                });
            });
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            const svg = document.querySelector('.stamspolning-svg');
            if(svg) {
                svg.classList.add('is-spraying');
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    svg.classList.remove('is-spraying');
                }, 150);
            }

            if (!ticking) {
                window.requestAnimationFrame(updateAnimation);
                ticking = true;
            }
        }, { passive: true }); // passive true makes scrolling buttery smooth
        
        window.requestAnimationFrame(updateAnimation);
    }
});



/* =====================================================
   DYNAMIC RESPONSIVE PIPE ANIMATION (STAMSPOLNING)
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const pipeGroup = document.getElementById('dynamic-pipe-group');
    const nozzleGroup = document.getElementById('dynamic-nozzle');
    const pipeDefs = document.getElementById('dynamic-pipe-defs');
    if (!pipeGroup || !nozzleGroup || !pipeDefs) return;

    const container = document.getElementById('stamspolning-content');
    const introText = document.getElementById('intro-text');
    const stepsHeading = document.getElementById('steg-for-steg-heading');
    
    let cachedScrollRange = 0;
    let cachedScrollStartOffset = 0;
    let pipePathString = '';
    let totalLength = 0;
    const nozzlePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Add organic filter for dirt
    pipeDefs.innerHTML += `
        <filter id="organic-dirt" x="-20%" y="-20%" width="140%" height="140%">
            <!-- X=0.03, Y=0.003 skapar långa vertikala strimmor av smuts istället för runda prickar -->
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.003" numOctaves="3" result="noise" />
            <!-- Mjukare kontrast för att se ut som smet och olja -->
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 6 -2.5" result="alphaNoise" />
            <feComposite operator="in" in="SourceGraphic" in2="alphaNoise" result="maskedDirt" />
            <feDropShadow in="maskedDirt" dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.7" />
        </filter>
        <mask id="dirt-mask">
            <!-- White reveals everything -->
            <path id="mask-bg" stroke="white" stroke-width="106" fill="none" stroke-linecap="butt" stroke-linejoin="round" />
            <!-- Black hides everything (this will be animated to erase the dirt) -->
            <path id="mask-eraser" stroke="black" stroke-width="106" fill="none" stroke-linecap="butt" stroke-linejoin="round" />
        </mask>
    `;

    // 1. Background Shadow
    const bgShadow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgShadow.setAttribute('fill', '#000000');
    bgShadow.setAttribute('opacity', '0.05');
    bgShadow.setAttribute('style', 'filter: blur(15px);');
    
    // 2. Main Pipe (Single Rect with gradient)
    const pipeBase = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    pipeBase.setAttribute('fill', 'url(#premium-pipe)');
    
    // Inner occlusion shadow
    const innerOcclusion = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    innerOcclusion.setAttribute('fill', 'none');
    innerOcclusion.setAttribute('stroke', '#000000');
    innerOcclusion.setAttribute('stroke-opacity', '0.15');
    innerOcclusion.setAttribute('stroke-width', '20');
    innerOcclusion.setAttribute('style', 'filter: blur(6px);');
    
    // 3. Dirt Group
    const dirtGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    dirtGroup.setAttribute('mask', 'url(#dirt-mask)');
    
    
    
    
    
    // 1. Skapa själva den tecknade texturen (som referensbilden)
    if (pipeDefs && !document.getElementById('cartoon-dirt-texture')) {
        const texturePattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        texturePattern.setAttribute('id', 'cartoon-dirt-texture');
        texturePattern.setAttribute('x', '0');
        texturePattern.setAttribute('y', '0');
        texturePattern.setAttribute('width', '256');
        texturePattern.setAttribute('height', '256');
        texturePattern.setAttribute('patternUnits', 'userSpaceOnUse');
        
        texturePattern.innerHTML = `
            <image href="/comic-dirt.png" x="0" y="0" width="256" height="256" preserveAspectRatio="none" style="filter: brightness(0.65) contrast(1.2) saturate(1.2);" />
        `;
        pipeDefs.appendChild(texturePattern);
    }
    
    // 2. Skapa den organiska formen (masken) och den svarta konturen (filtret)
    if (pipeDefs && !document.getElementById('turbulence-mask-filter')) {
        // Gradient för att tvinga smutsen mot kanterna
        const edgeGrad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        edgeGrad.setAttribute('id', 'edge-gradient');
        edgeGrad.innerHTML = `
            <stop offset="0%" stop-color="white" stop-opacity="1" />
            <stop offset="15%" stop-color="white" stop-opacity="0.8" />
            <stop offset="40%" stop-color="white" stop-opacity="0.1" />
            <stop offset="60%" stop-color="white" stop-opacity="0.1" />
            <stop offset="85%" stop-color="white" stop-opacity="0.8" />
            <stop offset="100%" stop-color="white" stop-opacity="1" />
        `;
        pipeDefs.appendChild(edgeGrad);

        const turbFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        turbFilter.setAttribute('id', 'turbulence-mask-filter');
        turbFilter.innerHTML = `
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.015" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 25 -12" result="sharpNoise" />
            <feComposite operator="in" in="SourceGraphic" in2="sharpNoise" />
        `;
        pipeDefs.appendChild(turbFilter);

        const organicMask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
        organicMask.setAttribute('id', 'organic-shape-mask');
        organicMask.innerHTML = `
            <rect width="100%" height="100%" fill="url(#edge-gradient)" filter="url(#turbulence-mask-filter)" />
        `;
        pipeDefs.appendChild(organicMask);

        const strokeFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        strokeFilter.setAttribute('id', 'comic-stroke-filter');
        strokeFilter.setAttribute('x', '-20%');
        strokeFilter.setAttribute('y', '-20%');
        strokeFilter.setAttribute('width', '140%');
        strokeFilter.setAttribute('height', '140%');
        strokeFilter.innerHTML = `
            <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="dilated" />
            <feColorMatrix in="dilated" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="blackStroke" />
            <feMerge result="outlined">
                <feMergeNode in="blackStroke" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
            <feDropShadow in="outlined" dx="0" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.8" />
        `;
        pipeDefs.appendChild(strokeFilter);
    }
    
    // Ta bort den gamla comic-clogs pattern om den finns
    const oldClogs = document.getElementById('comic-clogs');
    if (oldClogs) oldClogs.remove();

    // 3. Applicera masken och filtret på en grupp, och fyll med texturen
    const organicGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    organicGroup.setAttribute('mask', 'url(#organic-shape-mask)');
    organicGroup.setAttribute('style', 'filter: url(#comic-stroke-filter); mix-blend-mode: multiply;');

    const dirtRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    dirtRect.setAttribute('width', '100%');
    dirtRect.setAttribute('height', '100%');
    dirtRect.setAttribute('fill', 'url(#cartoon-dirt-texture)');
    
    organicGroup.appendChild(dirtRect);
    dirtGroup.appendChild(organicGroup);



    
    // Replace the mask definitions to use rects instead of strokes
    const existingMask = document.getElementById('dirt-mask');
    if (existingMask) {
        existingMask.innerHTML = `
            <rect id="mask-bg" fill="white" />
            <rect id="mask-eraser" fill="black" />
        `;
    }
    
    // 4. Hose Layers
    const hoseRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hoseRect.setAttribute('fill', '#111827');
    const hoseHighlight = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hoseHighlight.setAttribute('fill', '#475569');
    hoseHighlight.setAttribute('opacity', '0.6');
    const hosePeak = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hosePeak.setAttribute('fill', '#ffffff');
    hosePeak.setAttribute('opacity', '0.4');

    // Append everything in correct z-index order
    pipeGroup.appendChild(bgShadow);
    pipeGroup.appendChild(pipeBase);
    pipeGroup.appendChild(innerOcclusion);
    pipeGroup.appendChild(dirtGroup);
    pipeGroup.appendChild(hoseRect);
    pipeGroup.appendChild(hoseHighlight);
    pipeGroup.appendChild(hosePeak);

    let startX = 0;
    let startY = 0;

    function drawPipe() {
        if (!container || !introText || !stepsHeading) return;
        
        const cRect = container.getBoundingClientRect();
        const absoluteTop = cRect.top + window.scrollY;
        cachedScrollRange = cRect.height;
        cachedScrollStartOffset = absoluteTop + 200;
        const wrapper = container.querySelector('.layout-wrapper');
        const wrapperRect = wrapper.getBoundingClientRect();
        
        const pipeWidth = 120;
        
        // Rör-startpunkt: I centrum av rör-bilden i sektionen ovanför (som är till höger)
        startX = wrapperRect.left - cRect.left + (wrapperRect.width * 0.75) - (pipeWidth/2); // fallback
        const heroImg = document.querySelector('.swoosh-hero .container > div > div:nth-child(2)');
        if (heroImg) {
            const imgRect = heroImg.getBoundingClientRect();
            // Centrera röret under den runda bilden. startX är rörets vänsterkant.
            startX = imgRect.left + (imgRect.width / 2) - cRect.left - (pipeWidth / 2);
        }

        startY = -350; 
        const endY = cRect.height + 300; 
        totalLength = endY - startY;
        
        // Update all static rects
        [bgShadow, pipeBase, innerOcclusion, dirtRect].forEach(el => {
            el.setAttribute('x', startX);
            el.setAttribute('y', startY);
            el.setAttribute('width', pipeWidth);
            el.setAttribute('height', totalLength);
        });
        
        // Mask backgrounds
        const maskBg = document.getElementById('mask-bg');
        if (maskBg) {
            maskBg.setAttribute('x', startX - 20); // slightly wider to ensure coverage
            maskBg.setAttribute('y', startY);
            maskBg.setAttribute('width', pipeWidth + 40);
            maskBg.setAttribute('height', totalLength);
        }
        
        // Setup hoses horizontally (height is animated)
        const hoseWidth = 14;
        hoseRect.setAttribute('x', startX + (pipeWidth / 2) - (hoseWidth / 2));
        hoseRect.setAttribute('y', startY);
        hoseRect.setAttribute('width', hoseWidth);
        
        hoseHighlight.setAttribute('x', startX + (pipeWidth / 2) - 3);
        hoseHighlight.setAttribute('y', startY);
        hoseHighlight.setAttribute('width', 6);
        
        hosePeak.setAttribute('x', startX + (pipeWidth / 2) - 1);
        hosePeak.setAttribute('y', startY);
        hosePeak.setAttribute('width', 2);
        
        updateScroll();
    }
    
    let isSpraying = false;
    let sprayTimeout = null;
    let lastScrollPos = window.scrollY;

    function doUpdateScroll() {
        if (totalLength === 0) return;
        const windowHeight = window.innerHeight;
        const currentCenter = window.scrollY + (windowHeight / 2);
        
        let progress = (currentCenter - cachedScrollStartOffset) / cachedScrollRange;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        const currentLength = progress * totalLength;
        const currentY = startY + currentLength;
        
        nozzleGroup.style.opacity = 1;
        nozzleGroup.style.transformOrigin = `100px -5px`;
        // Nozzle svg has its center at X=100. We want its center to match startX + 60.
        // So translate = (startX + 60) - 100
        nozzleGroup.style.transform = `translate(${startX + 60 - 100}px, ${currentY + 5}px) rotate(0deg)`;
        
        // Update hose heights
        hoseRect.setAttribute('height', currentLength);
        hoseHighlight.setAttribute('height', currentLength);
        hosePeak.setAttribute('height', currentLength);
        
        // Update mask eraser
        const maskEraser = document.getElementById('mask-eraser');
        if (maskEraser) {
            const isInspection = document.getElementById('camera-cable-group') !== null;
            if (isInspection) {
                // Snail trail for camera inspection
                maskEraser.setAttribute('x', startX + 25);
                maskEraser.setAttribute('width', 70);
            } else {
                // Full clean for stamspolning
                maskEraser.setAttribute('x', startX - 20);
                maskEraser.setAttribute('width', 160); // pipeWidth (120) + 40
            }
            maskEraser.setAttribute('y', startY);
            maskEraser.setAttribute('height', currentLength + 30); // erase down to the camera body
        }

        // Handle spray animation
        const isScrollingDown = window.scrollY > lastScrollPos;
        lastScrollPos = window.scrollY;
        
        if (!isSpraying && progress > 0 && progress < 1) {
            isSpraying = true;
            nozzleGroup.classList.add('is-spraying');
        }
        
        clearTimeout(sprayTimeout);
        sprayTimeout = setTimeout(() => {
            isSpraying = false;
            nozzleGroup.classList.remove('is-spraying');
        }, 150);
    }
    
    let ticking = false;
    function updateScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                doUpdateScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('resize', drawPipe);
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    setTimeout(drawPipe, 100);
});
