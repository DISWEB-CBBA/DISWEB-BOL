document.addEventListener("DOMContentLoaded", function () {
  // === 1. CURSOR PERSONALIZADO ===
  const cursorTrail = document.querySelector(".cursor-trail");
  if (cursorTrail) {
    document.addEventListener("mousemove", (e) => {
      cursorTrail.style.left = e.pageX + "px";
      cursorTrail.style.top = e.pageY + "px";
    });
  }

  // === 2. NAVEGACIÓN SUAVE ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
        const nav = document.querySelector("nav ul");
        if (nav) nav.classList.remove("active");
      }
    });
  });

  // === 3. MENÚ MÓVIL ===
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav ul");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove("active");
      }
    });
  });

  // === 4. CARRUSEL DE PROYECTOS ===
  const slides = document.querySelectorAll(".project-slide");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const carousel = document.querySelector(".projects-carousel");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    const newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
  }

  function prevSlide() {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  }

  function startCarousel() {
    if (slides.length) {
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  function stopCarousel() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }

  if (slides.length && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopCarousel();
      nextSlide();
      startCarousel();
    });

    prevBtn.addEventListener("click", () => {
      stopCarousel();
      prevSlide();
      startCarousel();
    });

    showSlide(currentSlide);
    startCarousel();

    if (carousel) {
      carousel.addEventListener("mouseenter", stopCarousel);
      carousel.addEventListener("mouseleave", startCarousel);
      carousel.addEventListener("touchstart", stopCarousel);
    }
  }

  // === 5. VALIDACIÓN DE FORMULARIO ===
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        alert("Por favor completa todos los campos requeridos.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Por favor ingresa un email válido.");
        return;
      }

      alert("Gracias por tu mensaje. Me pondré en contacto contigo pronto.");
      contactForm.reset();
    });

    const observerForm = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contactForm.classList.add("visible");
            observerForm.unobserve(contactForm);
          }
        });
      },
      { threshold: 0.2 }
    );

    observerForm.observe(contactForm);
  }

  // === 6. ACTUALIZAR AÑO EN FOOTER ===
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // === 7. EFECTO DE ESCRITURA PARA SUBTÍTULO ===
  const subtitle = document.querySelector(".subtitle");

  function startTypingEffect() {
    if (!subtitle) return;
    const text = subtitle.getAttribute("data-text");
    if (!text) return;

    subtitle.textContent = "";
    let i = 0;
    clearInterval(subtitle._typingInterval);

    subtitle._typingInterval = setInterval(() => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(subtitle._typingInterval);
      }
    }, 50);
  }

  if (subtitle) {
    startTypingEffect();
    subtitle.addEventListener("mouseenter", startTypingEffect);

    const subtitleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTypingEffect();
          }
        });
      },
      { threshold: 0.5 }
    );

    subtitleObserver.observe(subtitle);
  }

  // === 8. ANIMACIONES FADE-IN ===
  const fadeElements = document.querySelectorAll(
    ".service-card, .about-content, .contact-info, .contact-form, .fade-in-up, .skills-image"
  );

  if (fadeElements.length) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeElements.forEach((el) => {
      el.classList.remove("visible");
      fadeObserver.observe(el);
    });
  }

  // === 9. ANIMACIÓN DE BARRAS ===
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".bar-fill");
    skillBars.forEach((bar) => {
      const finalWidth = bar.getAttribute("data-width") || "0";
      bar.style.transition = "none";
      bar.style.width = "0";
      void bar.offsetWidth;
      bar.style.transition = "width 2s ease-in-out";
      bar.style.width = finalWidth;
    });
    setTimeout(animateSkillBars, 5000);
  }

  if (window.innerWidth > 768) animateSkillBars();

  // === 10. ANIMACIÓN DEL LOGO ===
  const animatedLogo = document.querySelector(".animated-logo");
  if (animatedLogo) {
    const observerLogo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animatedLogo.classList.remove("from-behind-trigger");
            void animatedLogo.offsetWidth;
            animatedLogo.classList.add("from-behind-trigger");
          }
        });
      },
      { threshold: 0.5 }
    );
    observerLogo.observe(animatedLogo);
  }

  // === 11. AJUSTE PARA MÓVILES ===
  function adjustForMobile() {
    const isMobile = window.innerWidth <= 768;
    const logo = document.querySelector(".logo img");
    if (isMobile && logo) {
      logo.style.animation =
        "slideLogoMobile 3s ease-in-out infinite alternate";
    } else if (logo) {
      logo.style.animation = "slideLogo 4s ease-in-out infinite alternate";
    }
  }

  window.addEventListener("load", adjustForMobile);
  window.addEventListener("resize", adjustForMobile);

  // === 12. OPTIMIZACIÓN TOUCH ===
  if ("ontouchstart" in window) {
    document.querySelectorAll(".service-card").forEach((card) => {
      card.style.cursor = "pointer";
    });
    document.documentElement.style.setProperty("--primary-color", "#00ccdd");
  }

  // === 13. DESCARGA PDF ===
  const enlacesPDF = document.querySelectorAll(".descargar-pdf");
  const mensaje = document.getElementById("mensaje-descarga");

  enlacesPDF.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const url = enlace.href;
      const nombreArchivo = enlace.download || "documento.pdf";
      mensaje.style.display = "block";
      mensaje.textContent = `Descargando ${nombreArchivo}...`;
      const a = document.createElement("a");
      a.href = url;
      a.download = nombreArchivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        mensaje.style.display = "none";
      }, 2000);
    });
  });

  // === 14. MODAL DE VIDEO CON BOTÓN DE SONIDO (MULTIVIDEO) ===
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", () => {
      const videoSrc = card.getAttribute("data-video");
      if (!videoSrc) return;

      // Crear modal
      const modal = document.createElement("div");
      modal.classList.add("video-modal");
      modal.innerHTML = `
      <div class="video-content" style="
          position: relative;
          width: 900px; /* tamaño fijo del modal */
          height: 500px;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.4);
        ">
        <video id="serviceVideo"
          autoplay muted playsinline
          style="
            width: 100%;
            height: 100%;
            object-fit: fill; /* se encaja completamente, aunque se distorsione */
            border-radius: 12px;
          ">
          <source src="${videoSrc}" type="video/mp4">
          Tu navegador no soporta video HTML5.
        </video>
        <button class="unmute-btn" style="
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(0,0,0,0.6);
          color: #00ffff;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
        ">🔊 Activar sonido</button>
      </div>
    `;
      document.body.appendChild(modal);

      const video = modal.querySelector("#serviceVideo");
      const unmuteBtn = modal.querySelector(".unmute-btn");

      // Reproducir automáticamente sin sonido
      video.play().catch(() => {
        console.warn(
          "El navegador bloqueó el autoplay, requiere interacción del usuario."
        );
      });

      // Activar sonido
      unmuteBtn.addEventListener("click", () => {
        video.muted = false;
        video.volume = 1;
        video.play();
        unmuteBtn.style.display = "none";
      });

      // Cerrar automáticamente al terminar
      video.addEventListener("ended", () => {
        modal.remove();
      });

      // Cerrar si hace clic fuera del video
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
      });
    });
  });
});
