document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO PARTICLES & CIRCUIT SPARKS ================= */
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 12 + 8;
      const isGreen = Math.random() > 0.5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.background = isGreen ? '#23F8B2' : '#0084F5';
      particle.style.boxShadow = isGreen ? '0 0 10px #23F8B2' : '0 0 10px #0084F5';
      particle.style.opacity = Math.random() * 0.7 + 0.3;
      
      particlesContainer.appendChild(particle);
    }
  }

  /* ================= HERO INTERACTIVE MOUSE PARALLAX ================= */
  const heroSection = document.getElementById("hero");
  const heroSvg = document.querySelector(".hero-circuit-svg");
  
  if (heroSection && heroSvg) {
    heroSection.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const moveX = ((clientX / innerWidth) - 0.5) * 16;
      const moveY = ((clientY / innerHeight) - 0.5) * 16;
      
      heroSvg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
      heroSvg.style.transition = "transform 0.1s ease-out";
    });
    
    heroSection.addEventListener("mouseleave", () => {
      heroSvg.style.transform = "translate(0px, 0px) scale(1)";
      heroSvg.style.transition = "transform 0.6s ease-out";
    });
  }

  /* ================= NAVBAR & NAVEGAÇÃO INTERATIVA ================= */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navAnchors = navLinks ? navLinks.querySelectorAll("a") : [];
  const sections = document.querySelectorAll("section[id]");

  // Scroll Shadow Navbar & Scrollspy Trigger
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
    highlightNavOnScroll();
  });

  // Toggle Mobile Menu
  navToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
    navToggle?.classList.toggle("open");
  });

  // Smooth Scroll on Link Click with Header Offset
  navAnchors.forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const navHeight = navbar ? navbar.offsetHeight : 70;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight + 2;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

          // Close Mobile Menu
          navLinks?.classList.remove("open");
          navToggle?.classList.remove("open");
        }
      }
    });
  });

  // Scrollspy: Destaca o link ativo conforme a seção visível na tela
  function highlightNavOnScroll() {
    let currentSectionId = "";
    const navHeight = navbar ? navbar.offsetHeight : 70;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 80;
      const sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove("active");
      if (anchor.getAttribute("href") === `#${currentSectionId}`) {
        anchor.classList.add("active");
      }
    });
  }

  // Executa scrollspy inicial ao carregar a página
  highlightNavOnScroll();

  /* ================= REVEAL ON SCROLL ================= */
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(item => revealObserver.observe(item));

  /* ================= CONTADORES ================= */
  const counters = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      let current = 0;
      const increment = target / 100;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 20);

      counterObserver.unobserve(counter);
    });
  });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ================= ÁREAS DE ATUAÇÃO (CARROSSEL SHOWCASE MODAL) ================= */
  const areas = [
    {
      id: "robotica",
      icon: "🤖",
      title: "Robótica",
      desc: "Projetos de <strong>automação</strong>, sensores e sistemas inteligentes, do protótipo à competição.",
      subtitle: "Estudantes & Projetos em Ação",
      details: "Nossa equipe de Robótica projeta e constrói robôs autônomos, carrinhos com sensores ultrassônicos e braços robóticos. Os alunos trabalham diretamente com programação em C++/Arduino e microcontroladores de alta precisão.",
      tags: ["🤖 Arduino & ESP32", "⚙️ Mecânica & Sensores", "🏆 Competições"],
      images: [
        "../img/robotics_lab_1.jpg",
        "../img/robo.jpg"
      ]
    },
    {
      id: "impressao3d",
      icon: "🖨️",
      title: "Impressão 3D",
      desc: "<strong>Prototipagem rápida</strong> e fabricação digital para transformar ideias em objetos reais.",
      subtitle: "Fabricação Digital & Modelagem 3D",
      details: "Utilizando impressoras 3D de tecnologia FDM e resina, os membros modelam peças mecânicas, protótipos de produtos, engrenagens e maquetes educacionais com alto nível de detalhe e acabamento.",
      tags: ["🖨️ Prototipagem FDM", "📐 CAD 3D", "🛠️ Fabricação Digital"],
      images: [
        "../img/print3d_lab_1.jpg",
        "../img/lampada.png"
      ]
    },
    {
      id: "programacao",
      icon: "💻",
      title: "Programação",
      desc: "Desenvolvimento de <strong>software e aplicações</strong> com linguagens usadas no mercado.",
      subtitle: "Dev Lab & Soluções Digitais",
      details: "Do desenvolvimento web moderno com JavaScript ao processamento de dados e IA com Python, os alunos aprendem lógica de programação, consumo de APIs e construção de interfaces interativas.",
      tags: ["💻 JavaScript & Python", "🌐 Web Apps", "⚡ Lógica & APIs"],
      images: [
        "../img/coding_lab_1.jpg",
        "../img/robotics_lab_1.jpg"
      ]
    },
    {
      id: "eletronica",
      icon: "⚡",
      title: "Eletrônica",
      desc: "Circuitos, sensores e <strong>sistemas embarcados</strong> que dão vida aos projetos maker.",
      subtitle: "Sistemas Embarcados & IoT",
      details: "Na bancada de eletrônica, os participantes realizam soldagem de componentes, leitura de schematics, testes com multímetro e criação de placas de circuito impresso (PCB) para projetos de Internet das Coisas.",
      tags: ["⚡ Circuitos & PCB", "🔌 Soldagem", "📡 Internet das Coisas"],
      images: [
        "../img/electronics_lab_1.jpg",
        "../img/robo.jpg"
      ]
    },
    {
      id: "design",
      icon: "🎨",
      title: "Design",
      desc: "<strong>Modelagem e identidade visual</strong> pensadas para a experiência de quem usa.",
      subtitle: "Design de Produto & UX/UI",
      details: "Focados na experiência do usuário, os alunos criam a identidade visual dos projetos, esquemas técnicos de montagem e modelos tridimensionais que unem estética e usabilidade.",
      tags: ["🎨 Identidade Visual", "📐 Modelagem Tridimensional", "✨ UX/UI"],
      images: [
        "../img/lampada.png",
        "../img/print3d_lab_1.jpg"
      ]
    },
    {
      id: "inovacao",
      icon: "🚀",
      title: "Inovação",
      desc: "Criação de <strong>soluções tecnológicas</strong> com impacto real para a comunidade.",
      subtitle: "Hub de Soluções com Impacto Real",
      details: "Integrando todas as especialidades maker, a frente de inovação desenvolve protótipos de impacto sustentável e social aplicáveis no IFBA e na comunidade de Eunápolis.",
      tags: ["🚀 Impacto Social", "💡 Projetos Integrados", "🌱 Sustentabilidade"],
      images: [
        "../img/robo.jpg",
        "../img/coding_lab_1.jpg"
      ]
    }
  ];

  const areasGrid = document.getElementById("areasGrid");
  const areaModalOverlay = document.getElementById("areaModalOverlay");
  const areaModalClose = document.getElementById("areaModalClose");
  const areaCarouselTrack = document.getElementById("areaCarouselTrack");
  const areaCarouselDots = document.getElementById("areaCarouselDots");
  const areaPrevBtn = document.getElementById("areaPrevBtn");
  const areaNextBtn = document.getElementById("areaNextBtn");
  const areaCounterBadge = document.getElementById("areaCounterBadge");
  const areaModalIcon = document.getElementById("areaModalIcon");
  const areaModalTitle = document.getElementById("areaModalTitle");
  const areaBodySubtitle = document.getElementById("areaBodySubtitle");
  const areaBodyDesc = document.getElementById("areaBodyDesc");
  const areaTagsWrapper = document.getElementById("areaTagsWrapper");

  let currentArea = null;
  let currentImageIdx = 0;

  if (areasGrid) {
    areas.forEach((area) => {
      const card = document.createElement("div");
      card.className = "area-card";
      card.innerHTML = `
        <div class="area-icon-box">
          <span class="area-icon">${area.icon}</span>
        </div>
        <h3 class="area-name">${area.title}</h3>
        <p class="area-desc">${area.desc}</p>
        <div class="area-carousel-badge">
          <span class="badge-cam">🖼️</span> Ver Galeria (${area.images.length} fotos) ➔
        </div>
      `;
      card.addEventListener("click", () => openAreaModal(area));
      areasGrid.appendChild(card);
    });
  }

  function openAreaModal(area) {
    currentArea = area;
    currentImageIdx = 0;

    areaModalIcon.textContent = area.icon;
    areaModalTitle.textContent = area.title;
    areaBodySubtitle.textContent = area.subtitle;
    areaBodyDesc.textContent = area.details;

    // Tags
    areaTagsWrapper.innerHTML = "";
    area.tags.forEach(tagText => {
      const tag = document.createElement("span");
      tag.className = "area-tag-pill";
      tag.textContent = tagText;
      areaTagsWrapper.appendChild(tag);
    });

    // Populate Carousel
    areaCarouselTrack.innerHTML = "";
    areaCarouselDots.innerHTML = "";

    area.images.forEach((imgSrc, idx) => {
      const slide = document.createElement("div");
      slide.className = `area-slide ${idx === 0 ? "active" : ""}`;
      slide.innerHTML = `<img src="${imgSrc}" alt="${area.title} Foto ${idx + 1}" class="area-slide-img">`;
      areaCarouselTrack.appendChild(slide);

      if (area.images.length > 1) {
        const dot = document.createElement("span");
        dot.className = `area-dot ${idx === 0 ? "active" : ""}`;
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          goToAreaImage(idx);
        });
        areaCarouselDots.appendChild(dot);
      }
    });

    // Show/Hide Nav Arrow Controls
    if (area.images.length > 1) {
      areaPrevBtn.style.display = "flex";
      areaNextBtn.style.display = "flex";
      areaCarouselDots.style.display = "flex";
    } else {
      areaPrevBtn.style.display = "none";
      areaNextBtn.style.display = "none";
      areaCarouselDots.style.display = "none";
    }

    updateAreaCarouselPosition();

    areaModalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeAreaModal() {
    areaModalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function goToAreaImage(idx) {
    if (!currentArea) return;
    currentImageIdx = idx;
    updateAreaCarouselPosition();
  }

  function updateAreaCarouselPosition() {
    if (!currentArea) return;
    areaCarouselTrack.style.transform = `translateX(-${currentImageIdx * 100}%)`;

    if (areaCounterBadge) {
      areaCounterBadge.textContent = `${String(currentImageIdx + 1).padStart(2, "0")} / ${String(currentArea.images.length).padStart(2, "0")}`;
    }

    const dots = areaCarouselDots.querySelectorAll(".area-dot");
    dots.forEach((d, i) => {
      if (i === currentImageIdx) d.classList.add("active");
      else d.classList.remove("active");
    });
  }

  areaPrevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!currentArea) return;
    currentImageIdx = currentImageIdx > 0 ? currentImageIdx - 1 : currentArea.images.length - 1;
    updateAreaCarouselPosition();
  });

  areaNextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!currentArea) return;
    currentImageIdx = currentImageIdx < currentArea.images.length - 1 ? currentImageIdx + 1 : 0;
    updateAreaCarouselPosition();
  });

  areaModalClose?.addEventListener("click", closeAreaModal);
  areaModalOverlay?.addEventListener("click", (e) => {
    if (e.target === areaModalOverlay) closeAreaModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && areaModalOverlay.classList.contains("active")) {
      closeAreaModal();
    }
  });

  /* ================= HISTÓRIA / TIMELINE ================= */
  const timelineNav = document.getElementById("timelineNav");
  const timelineSlides = document.getElementById("timelineSlides");
  const tlProgressFill = document.getElementById("tlProgressFill");
  const tlStepIndicator = document.getElementById("tlStepIndicator");
  const tlCurrentNum = document.getElementById("tlCurrentNum");
  const tlTotalNum = document.getElementById("tlTotalNum");

  const historia = [
    {
      ano: "2020",
      fase: "01",
      tag: "FUNDAÇÃO E IDEALIZAÇÃO",
      titulo: "Criação do EDUMaker",
      texto: "Início oficial do laboratório maker no IFBA Campus Eunápolis, focado no desenvolvimento de tecnologias abertas, cultura maker e inovação na educação.",
      imagem: "../img/robo.jpg"
    },
    {
      ano: "2021",
      fase: "02",
      tag: "PRIMEIROS PROTÓTIPOS",
      titulo: "Robótica & Programação",
      texto: "Desenvolvimento dos primeiros robôs educacionais e circuitos interativos com participação ativa dos estudantes de informática e edificações.",
      imagem: "../img/coding_lab_1.jpg"
    },
    {
      ano: "2022",
      fase: "03",
      tag: "FABRICAÇÃO DIGITAL",
      titulo: "Impressão 3D & Equipamentos",
      texto: "Aquisição de impressoras 3D de alta precisão, cortadoras a laser e kits de prototipagem para expansão das capacidades de fabricação digital.",
      imagem: "../img/electronics_lab_1.jpg"
    },
    {
      ano: "2023",
      fase: "04",
      tag: "RECONHECIMENTO",
      titulo: "Feiras Científicas & Eventos",
      texto: "Apresentação e premiação de projetos do EDUMaker em mostras tecnológicas e feiras de inovação regionais e estaduais.",
      imagem: "../img/robotics_lab_1.jpg"
    },
    {
      ano: "2024",
      fase: "05",
      tag: "ECOSSISTEMA MAKER",
      titulo: "Consolidação & Futuro",
      texto: "Transformação do laboratório em um centro de referência regional, impactando centenas de alunos e fortalecendo parcerias com o mercado.",
      imagem: "../img/print3d_lab_1.jpg"
    }
  ];

  if (timelineNav && timelineSlides) {
    if (tlTotalNum) tlTotalNum.textContent = String(historia.length).padStart(2, "0");

    historia.forEach((item, index) => {
      timelineNav.innerHTML += `
        <div class="timeline-dot ${index === 0 ? 'active' : ''}" data-index="${index}">
          <div class="timeline-dot-circle">
            <span class="dot-core"></span>
          </div>
          <div class="timeline-dot-label">${item.ano}</div>
        </div>
      `;

      timelineSlides.innerHTML += `
        <div class="timeline-slide ${index === 0 ? 'active' : ''}">
          <div class="timeline-img-box">
            <div class="timeline-img-frame">
              ${item.imagem
                ? `<img src="${item.imagem}" alt="${item.titulo}">`
                : `<div class="timeline-placeholder-icon">🚀</div>`}
              <div class="timeline-img-scanline"></div>
              <div class="timeline-img-corner tl-c-tl"></div>
              <div class="timeline-img-corner tl-c-tr"></div>
              <div class="timeline-img-corner tl-c-bl"></div>
              <div class="timeline-img-corner tl-c-br"></div>
            </div>
          </div>
          <div class="timeline-content-body">
            <div class="timeline-tag"><span class="tag-icon">⚡</span> ${item.tag}</div>
            <div class="timeline-year-bg">${item.ano}</div>
            <h3 class="timeline-event-title">${item.titulo}</h3>
            <p class="timeline-event-desc">${item.texto}</p>
          </div>
        </div>
      `;
    });

    const dots = timelineNav.querySelectorAll(".timeline-dot");
    const slides = timelineSlides.querySelectorAll(".timeline-slide");
    let currentIndex = 0;

    function goTo(index) {
      dots.forEach((d, i) => {
        if (i < index) {
          d.classList.add("completed");
          d.classList.remove("active");
        } else if (i === index) {
          d.classList.add("active");
          d.classList.remove("completed");
        } else {
          d.classList.remove("active", "completed");
        }
      });

      slides.forEach(s => s.classList.remove("active"));
      currentIndex = index;
      slides[currentIndex].classList.add("active");

      // Update progress bar fill
      if (tlProgressFill) {
        const pct = (index / (historia.length - 1)) * 100;
        tlProgressFill.style.width = `${pct}%`;
      }

      // Update counter text
      if (tlCurrentNum) {
        tlCurrentNum.textContent = String(index + 1).padStart(2, "0");
      }

      // Update HUD step indicator
      if (tlStepIndicator) {
        tlStepIndicator.textContent = `FASE ${String(index + 1).padStart(2, "0")} / ${String(historia.length).padStart(2, "0")}`;
      }
    }

    // Initialize progress fill on load
    goTo(0);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goTo(index));
    });

    const tlPrev = document.getElementById("tlPrev");
    const tlNext = document.getElementById("tlNext");

    tlPrev?.addEventListener("click", () => {
      goTo(currentIndex > 0 ? currentIndex - 1 : historia.length - 1);
    });

    tlNext?.addEventListener("click", () => {
      goTo(currentIndex < historia.length - 1 ? currentIndex + 1 : 0);
    });
  }

  /* ================= FORMULÁRIO DE CONTATO ================= */
  const sendBtn = document.getElementById("sendBtn");
  const notification = document.getElementById("notification");

  sendBtn?.addEventListener("click", () => {
    const nome = document.getElementById("fNome");
    const email = document.getElementById("fEmail");

    if (!nome.value.trim() || !email.value.trim()) {
      nome.focus();
      return;
    }

    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 3000);

    document.getElementById("fAssunto").value = "";
    document.getElementById("fMsg").value = "";
    nome.value = "";
    email.value = "";
  });

  /* ================= EQUIPMENT CARDS — MOUSE GLOW ================= */
  const equipCards = document.querySelectorAll('.equip-card');

  equipCards.forEach(card => {
    // Radial glow that follows the mouse
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    // 3D tilt effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -6;  // max 6deg
      const tiltY = dx * 6;
      card.style.transform = `translateY(-12px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});

