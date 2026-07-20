/* ============================================
   TAROT BY PAVI — Main JavaScript
   ============================================ */

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initTextAnimations();
  initCharacterAnimation();
  initStaggerAnimations();
  initFaqAccordion();
  initBookingForm();
  initParallax();
  initMobileBookingSticky();
  initPricingToBooking();
});

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target) && navLinks.classList.contains('active')) {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      e.preventDefault();
      
      const navbarHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      const navLink = document.querySelector(`.nav-link[href="${targetId}"]`);
      if (navLink) navLink.classList.add('active');
    });
  });

  // Update active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .text-reveal, .text-reveal-up, .text-reveal-down');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ============================================
// TEXT ANIMATIONS
// ============================================
function initTextAnimations() {
  const textElements = document.querySelectorAll('h1, h2, h3, h4, .hero-text, .pricing-title, .section-header p');
  
  textElements.forEach(el => {
    if (!el.classList.contains('text-reveal') && !el.classList.contains('text-reveal-up')) {
      el.classList.add('text-reveal');
    }
  });

  // Add glow animation to highlighted text
  const highlights = document.querySelectorAll('.highlight');
  highlights.forEach(el => {
    el.classList.add('text-glow');
  });

  // Add floating animation to hero image
  const heroImage = document.querySelector('.hero-image-frame');
  if (heroImage) {
    heroImage.classList.add('floating');
  }

  // Add pulse to buttons
  const primaryButtons = document.querySelectorAll('.btn--primary');
  primaryButtons.forEach(btn => {
    btn.classList.add('pulse');
  });
}

// ============================================
// CHARACTER ANIMATION
// ============================================
function initCharacterAnimation() {
  const charElements = document.querySelectorAll('.char-animate');
  
  charElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${index * 0.03}s`;
      el.appendChild(span);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const chars = entry.target.querySelectorAll('span');
        chars.forEach(char => char.classList.add('visible'));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  charElements.forEach(el => observer.observe(el));
}

// ============================================
// STAGGER ANIMATIONS
// ============================================
function initStaggerAnimations() {
  const staggerElements = document.querySelectorAll('.stagger-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  staggerElements.forEach(el => observer.observe(el));
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ============================================
// BOOKING FORM
// ============================================
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const packageSelect = document.getElementById('readingPackage');
  const fileUpload = document.getElementById('fileUpload');
  const fileInput = document.getElementById('paymentScreenshot');
  const filePreview = document.getElementById('filePreviewName');
  const modal = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModal');

  if (!form) return;

  // Show/hide question fields based on package
  if (packageSelect) {
    packageSelect.addEventListener('change', () => {
      const val = packageSelect.value;
      const q1 = document.getElementById('question1').closest('.form-group');
      const q2 = document.getElementById('question2Group');
      const q3 = document.getElementById('question3Group');

      // Show all question fields by default
      q1.style.display = 'block';

      if (val === 'one-question') {
        q2.style.display = 'none';
        q3.style.display = 'none';
      } else if (val === 'two-questions') {
        q2.style.display = 'block';
        q3.style.display = 'none';
      } else if (val === 'three-questions') {
        q2.style.display = 'block';
        q3.style.display = 'block';
      } else if (val === 'call-reading' || val === 'video-call-reading') {
        // Live sessions — questions discussed during the call
        q2.style.display = 'none';
        q3.style.display = 'none';
      }
    });
  }

  // File upload
  if (fileUpload && fileInput) {
    fileUpload.addEventListener('click', () => fileInput.click());
    
    fileUpload.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUpload.style.borderColor = 'var(--lavender)';
      fileUpload.style.background = 'var(--soft-purple)';
    });

    fileUpload.addEventListener('dragleave', () => {
      fileUpload.style.borderColor = '';
      fileUpload.style.background = '';
    });

    fileUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUpload.style.borderColor = '';
      fileUpload.style.background = '';
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        showFilePreview(fileInput.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        showFilePreview(fileInput.files[0]);
      }
    });
  }

  function showFilePreview(file) {
    if (filePreview) {
      filePreview.style.display = 'block';
      filePreview.textContent = `✓ ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      filePreview.style.color = 'var(--pattern-purple)';
    }
  }

  // Form validation & submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check honeypot
    const honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) return;

    // Validate
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      const group = field.closest('.form-group') || field.closest('.form-checkbox-wrapper')?.parentElement;
      
      if (field.type === 'checkbox') {
        if (!field.checked) {
          if (group) group.classList.add('error');
          isValid = false;
        } else {
          if (group) group.classList.remove('error');
        }
      } else if (field.type === 'file') {
        if (!field.files.length) {
          if (group) group.classList.add('error');
          isValid = false;
        } else {
          if (group) group.classList.remove('error');
        }
      } else if (!field.value.trim()) {
        if (group) group.classList.add('error');
        isValid = false;
      } else {
        if (group) group.classList.remove('error');
      }

      // Email validation
      if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          if (group) group.classList.add('error');
          isValid = false;
        }
      }
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Show confirmation modal
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Reset form
    form.reset();
    if (filePreview) {
      filePreview.style.display = 'none';
    }
    document.getElementById('question2Group').style.display = 'none';
    document.getElementById('question3Group').style.display = 'none';
  });

  // Close modal
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// ============================================
// PARALLAX (Desktop Only)
// ============================================
function initParallax() {
  if (window.matchMedia('(max-width: 767px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxElements = document.querySelectorAll('.parallax-bg');
  if (!parallaxElements.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
          const section = el.closest('section') || el.closest('footer');
          if (!section) return;
          
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
            const offset = (scrollY - sectionTop) * 0.15;
            el.style.transform = `translateY(${offset}px)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ============================================
// MOBILE BOOKING STICKY
// ============================================
function initMobileBookingSticky() {
  const mobileBooking = document.getElementById('mobileBooking');
  const hero = document.getElementById('hero');
  if (!mobileBooking || !hero) return;

  window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
      mobileBooking.style.display = 'block';
    } else {
      mobileBooking.style.display = 'none';
    }
  }, { passive: true });
}

// ============================================
// PRICING TO BOOKING LINK
// ============================================
function initPricingToBooking() {
  document.querySelectorAll('[data-package]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const packageValue = btn.getAttribute('data-package');
      
      // Wait for scroll to complete, then set package value
      setTimeout(() => {
        const packageSelect = document.getElementById('readingPackage');
        if (packageSelect) {
          packageSelect.value = packageValue;
          packageSelect.dispatchEvent(new Event('change'));
        }
      }, 800);
    });
  });
}
