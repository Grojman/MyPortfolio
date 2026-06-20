import { experienceData } from "./experiences.js";
import { technologies } from "./tecnologies.js";
import { projects } from "./proyects.js";

const showMoreButton = document.querySelector(".show-more-timeline")
const timeline = document.querySelector('.timeline')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const techContainer = document.querySelector('.tecnologies-container')
const projectsContainer = document.querySelector('.proyects-container')
const btn = document.getElementById('toggle-theme');
const icon = btn.querySelector('i');

showMoreButton.addEventListener('click', event => {
    showMoreButton.classList.add('show-more-timeline-opened')
    timeline.classList.add('timeline-open')

})


const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.className = savedTheme;
  icon.classList.add(savedTheme === 'dark' ? 'fa-moon-o' : 'fa-sun-o');
} else {
  document.body.className = prefersDark ? 'dark' : 'light';
  icon.classList.add(prefersDark ? 'fa-moon-o' : 'fa-sun-o');
}

technologies.forEach(t => {
  const img = document.createElement('img');
  img.src = t.img;
  img.alt = t.alt;
  img.classList.add('tecnology');
  techContainer.appendChild(img);
});


// initial rendering deferred into applyTranslations so content is language-aware


function createExperienceArticle(exp, lang = 'es') {
  const article = document.createElement("article");
  article.className = "experience-article";

  const header = document.createElement("header");

  const title = document.createElement("h3");
  title.className = "experience-article-title";
  title.textContent = (lang === 'en' && exp.title_en) ? exp.title_en : exp.title;

  const link = document.createElement("a");
  link.className = "experience-article-subtitle";
  link.href = exp.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const subtitleText = document.createElement("p");
  const subtitle = (lang === 'en' && exp.subtitle_en) ? exp.subtitle_en : exp.subtitle;
  subtitleText.innerHTML = `${subtitle} <i class="fa fa-external-link"></i>`;
  link.appendChild(subtitleText);

  header.appendChild(title);
  header.appendChild(link);

  const description = document.createElement("p");
  description.textContent = (lang === 'en' && exp.description_en) ? exp.description_en : exp.description;

  const footer = document.createElement("footer");
  footer.className = "experience-article-timespan";

  const dateRange = document.createElement("p");
  dateRange.textContent = exp.endDate
    ? `${exp.startDate} - ${exp.endDate}`
    : exp.startDate;

  footer.appendChild(dateRange);

  article.appendChild(header);
  article.appendChild(description);
  article.appendChild(footer);

  return article;
}

function renderExperiences(lang = 'es') {
  // keep header (first child) and remove existing experience articles
  while (timeline.children.length > 1) timeline.removeChild(timeline.lastChild);
  experienceData.forEach(exp => timeline.appendChild(createExperienceArticle(exp, lang)));
}

function renderProjects(projectArray, technologyArray, lang = 'es') {
  // clear existing
  projectsContainer.innerHTML = '';
  projectArray.forEach(project => {
      const article = document.createElement("article");
      article.className = "proyect-card";
  
      const content = document.createElement("div");
      content.className = "proyect-content";
  
      const header = document.createElement("header");
      const h3 = document.createElement("h3");
      h3.className = "proyect-title";
      h3.textContent = (lang === 'en' && project.title_en) ? project.title_en : project.title;
      header.appendChild(h3);
  
      const desc = document.createElement("p");
      desc.textContent = (lang === 'en' && project.description_en) ? project.description_en : project.description;
  
      const footer = document.createElement("footer");
      footer.className = "proyect-footer";
  
      project.tech.forEach(techId => {
      const tech = technologyArray.find(t => t.id === techId);
      if (!tech) return;
  
      const techDiv = document.createElement("div");
      techDiv.className = "proyect-tecnology";
      techDiv.style.backgroundColor = tech.color;
  
      const img = document.createElement("img");
      img.alt = tech.alt;
      img.src = tech.img;
  
      techDiv.appendChild(img);
      techDiv.appendChild(document.createTextNode(` ${tech.name}`));
      footer.appendChild(techDiv);
      });
  
      content.appendChild(header);
      content.appendChild(desc);
      content.appendChild(footer);
  
      const link = document.createElement("a");
      link.className = "proyect-image";
      link.target = "_blank";
      link.href = project.link;
  
      const img = document.createElement("img");
      const altTitle = (lang === 'en' && project.title_en) ? project.title_en : project.title;
      img.alt = `imagen del proyecto ${altTitle}`;
      img.src = project.image;
  
      link.appendChild(img);
  
      article.appendChild(content);
      article.appendChild(link);
      projectsContainer.appendChild(article);
  });
  }
    

// initial rendering will occur inside applyTranslations so content matches the chosen language

  btn.addEventListener('click', () => {
    btn.classList.add('rotate');

    setTimeout(() => {
      const dark = document.body.classList.toggle('dark');
      // persist theme choice
      localStorage.setItem('theme', document.body.className);
      icon.classList.toggle('fa-moon-o', dark);
      icon.classList.toggle('fa-sun-o', !dark);
    }, 250);
    setTimeout(() => {
      btn.classList.remove('rotate');
    }, 600);
  });

  // i18n translations and language switcher

  const translations = {
    en: {
      aboutTitle: 'About me',
      aboutParagraphs: [
        "I'm a student at the University of Alicante, always seeking new challenges to grow.",
        "I enjoy tackling technical difficulties and squeezing every bit of optimization from my programs. Users deserve a smooth, error-free experience.",
        "Keeping code clean saves us many problems later. Design patterns help us build scalable and flexible applications."
      ],
      technologiesTitle: 'Technologies:',
      timelineTitle: 'My career',
      showMore: 'Show more...',
      projectsTitle: 'My projects',
      footerBio: 'Jorge Gomis Román — Backend Software Developer',
      footerContactLine: '<a href="mailto:jorge@example.com">jorge@example.com</a> · <a href="https://www.linkedin.com/in/jorge-gomis-rom%C3%A1n-5ab74b275/" target="_blank">LinkedIn</a>'
    },
    es: {
      aboutTitle: 'Sobre mí',
      aboutParagraphs: [
        'Soy un estudiante de la Universidad de Alicante que busca superarse cada día con nuevos retos y desafíos.',
        'Adoro las dificultades técnicas, y exprimir hasta la última gota de optimización en mis programas. El usuario merece una experiencia fluida y a prueba de errores.',
        'Mantener un código limpio nos ahorra muchos problemas en el futuro. Los patrones de desarrollo están ahí para que podamos desarrollar aplicaciones escalables y flexibles.'
      ],
      technologiesTitle: 'Tecnologías:',
      timelineTitle: 'Mi carrera',
      showMore: 'Saber más...',
      projectsTitle: 'Mis proyectos',
      footerBio: 'Jorge Gomis Román — Desarrollador de software backend',
      footerContactLine: '<a href="mailto:jorge@example.com">jorge@example.com</a> · <a href="https://www.linkedin.com/in/jorge-gomis-rom%C3%A1n-5ab74b275/" target="_blank">LinkedIn</a>'
    }
  };

  function applyTranslations(lang) {
    const t = translations[lang] || translations.es;
    document.documentElement.lang = lang;

    const aboutTitle = document.querySelector('.about-me-title');
    if (aboutTitle) aboutTitle.innerHTML = `<i class="fa fa-address-card" aria-hidden="true"></i> ${t.aboutTitle}`;

    const aboutParas = document.querySelectorAll('.about-me p');
    aboutParas.forEach((p, i) => { p.textContent = t.aboutParagraphs[i] || ''; });

    const techTitle = document.querySelector('.tecnologies-title h2');
    if (techTitle) techTitle.innerHTML = `<i class="fa fa-terminal" aria-hidden="true"></i> ${t.technologiesTitle}`;

    const timelineH2 = document.querySelector('.timeline-title h2');
    if (timelineH2) timelineH2.innerHTML = `<i class="fa fa-paperclip" aria-hidden="true"></i> ${t.timelineTitle}`;

    const showMore = document.querySelector('.show-more-timeline');
    if (showMore) showMore.textContent = t.showMore;

    const projectsTitle = document.querySelector('.proyects-title');
    if (projectsTitle) projectsTitle.innerHTML = `<i class="fa fa-link" aria-hidden="true"></i> ${t.projectsTitle}`;

    const footerBio = document.querySelector('.footer-left p');
    if (footerBio) footerBio.textContent = t.footerBio;

    const footerContactLine = document.querySelectorAll('.footer-left p')[1];
    if (footerContactLine) footerContactLine.innerHTML = t.footerContactLine;

    // update select value if present
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = lang;

    // re-render language-dependent sections
    renderExperiences(lang);
    renderProjects(projects, technologies, lang);
  }

  const savedLang = localStorage.getItem('lang') || (document.documentElement.lang || 'es');
  applyTranslations(savedLang);
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.value = savedLang;
      langSelect.addEventListener('change', (e) => {
        const newLang = e.target.value || 'es';
        localStorage.setItem('lang', newLang);
        applyTranslations(newLang);
      });
    }