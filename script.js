const siteData = {
  heroName: "Shangyu Gong",
  heroTagline: "Data Science, Product Analytics, LLM, Machine Learning",
  heroSubtitle: "M.S.E. in Data Science @ Penn",
  heroSubtitleHref: "https://dats.seas.upenn.edu/",
  heroSummary:
    "I build product and business analytics systems that connect rigorous modeling with clear decisions. Across edtech, SaaS platforms, finance, and real estate contexts, I have worked on A/B testing, causal inference, predictive modeling, dashboards, and end-to-end data workflows to turn messy questions into interpretable, decision-ready insights.",
  portrait: {
    image: "./assets/full-portrait.png",
    fallback: "RG",
  },
  heroLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shangyu-ricky-gong",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/Ricky-S-Gong",
      icon: "github",
    },
    {
      label: "Email",
      href: "mailto:sgong.recruiting@gmail.com",
      icon: "email",
    },
  ],
  about: [
    "I care about analytical work that is both technically credible and operationally useful. That means defining the decision clearly, choosing methods that match the risk, and presenting results so non-specialists can act on them.",
    "This portfolio is designed for recruiting conversations: it shows how I frame ambiguous problems, work with real datasets, and communicate outcomes across project, research, and teaching contexts.",
  ],
  homeAbout: [
    'Hi there. 😉 I am Shangyu Gong, and you can also call me Ricky. I am currently pursuing an M.S.E. in Data Science at the University of Pennsylvania, where my work increasingly sits at the intersection of analytics, machine learning, and decision-making under real-world constraints. My graduate coursework has focused on big data analytics, trustworthy machine learning, deep learning, generative AI and LLMs, operating systems, and distributed systems, which has pushed me to think not only about model quality but also about reliability, scalability, and how analytical work actually gets operationalized.',
    'Before Penn, I studied Statistics and Economics at the University of Illinois Urbana-Champaign, with minors in Mathematics and Computer Science. Along the way, I built a technical base across statistical learning, Bayesian analysis, time series, causal inference, design of experiments, econometrics, databases, algorithms, deep learning, and computer vision. My undergraduate research perspective was shaped by mentors including <a href="https://jkcshea.github.io/" target="_blank" rel="noreferrer">Prof. Joshua Shea</a>, <a href="https://www.songlena.com/" target="_blank" rel="noreferrer">Prof. Lena Song</a>, <a href="https://experts.illinois.edu/en/persons/hyoeun-lee/" target="_blank" rel="noreferrer">Prof. Hyoeun Lee</a>, <a href="https://economics.illinois.edu/profile/dafontes" target="_blank" rel="noreferrer">Prof. Daniela Fontes</a>, and <a href="https://sites.google.com/a/illinois.edu/eunyichung/" target="_blank" rel="noreferrer">Prof. EunYi Chung</a>. My research spanned labor economics, social media, housing markets, macro forecasting, and policy evaluation. Across that research, I developed a strong foundation in causal inference and empirical economics, including IV, Bartik IV, 2SLS, event-study design, and difference-in-differences. I graduated from UIUC as a Bronze Tablet Scholar, the university\'s highest academic honor for undergraduates, and Summa Cum Laude.',
    "In industry, I see myself as a practitioner who translates business ambiguity into analytical structure. I am strongest when a team has a product, growth, retention, or operational question that needs more than just reporting. I have come to believe that for a data scientist, understanding the business deeply matters more than knowing one more complex model or one more advanced tool, which is why I have deliberately pursued internships to build sharper product instinct and commercial judgment. That usually means clarifying the decision, defining the right metrics, building experiments or models that match the business risk, and communicating outputs in a way that product managers, operators, or executives can actually use.",
    "Outside of work, I enjoy guandan, hiking, cooking and exploring great restaurants, and playing badminton. Those parts of my life keep me curious, social, and energized, and they matter to me for the same reason good analytics does: they are at their best when they bring people together around something engaging and memorable.",
  ],
  capabilities: [
    {
      title: "Problem framing",
      body: "Translate vague business or research questions into hypotheses, metrics, and analytical plans.",
    },
    {
      title: "Data storytelling",
      body: "Present findings with visual clarity, concise writing, and strong narrative structure for decision-makers.",
    },
    {
      title: "Technical range",
      body: "Work across SQL, Python, experimentation, dashboards, modeling, and reproducible analysis workflows.",
    },
  ],
  projects: [
    {
      category: "Customer Analytics",
      title: "Churn Risk Segmentation",
      description:
        "Built an end-to-end retention analysis pipeline to identify churn drivers, cluster customer risk tiers, and recommend interventions with expected impact by segment.",
      impact: "Outcome: turned raw usage and billing features into a prioritized retention playbook.",
      tags: ["Python", "SQL", "Segmentation", "Classification"],
    },
    {
      category: "Marketplace Strategy",
      title: "Pricing and Conversion Diagnostics",
      description:
        "Analyzed funnel leakage and pricing sensitivity across acquisition channels to identify where conversion losses were structural versus messaging-driven.",
      impact: "Outcome: framed a test roadmap for product, marketing, and pricing stakeholders.",
      tags: ["Experimentation", "Funnel Analysis", "A/B Testing", "Visualization"],
    },
    {
      category: "Public Data",
      title: "City Mobility Demand Explorer",
      description:
        "Developed an interactive analysis of urban mobility demand by geography and time, highlighting service gaps and opportunity zones.",
      impact: "Outcome: combined spatial analysis with executive-ready visuals for non-technical audiences.",
      tags: ["Geospatial", "Dashboarding", "Time Series", "Policy Lens"],
    },
    {
      category: "Applied ML",
      title: "Forecasting Operational Load",
      description:
        "Compared baseline and machine learning approaches for short-horizon demand forecasting, with attention to evaluation leakage and deployment realism.",
      impact: "Outcome: positioned model choice around reliability, not just benchmark score.",
      tags: ["Forecasting", "Model Evaluation", "scikit-learn", "Feature Engineering"],
    },
    {
      category: "Product Analytics",
      title: "Activation Journey Analysis",
      description:
        "Mapped user activation sequences to quantify where first-session friction slowed time-to-value and weakened downstream retention.",
      impact: "Outcome: identified leading indicators for product onboarding health.",
      tags: ["User Journey", "Cohort Analysis", "Product Metrics", "SQL"],
    },
    {
      category: "Experimental Design",
      title: "Teaching Intervention Study",
      description:
        "Designed and evaluated a lightweight teaching intervention using pre/post measures, effect-size reasoning, and communication tailored for instructors.",
      impact: "Outcome: connected statistical evidence to practical classroom decisions.",
      tags: ["Causal Thinking", "Research Design", "Education", "R/Python"],
    },
  ],
  research: [
    {
      title: "Research Assistant",
      org: "University Lab / Faculty Collaboration",
      period: "Example entry",
      body:
        "Describe the domain, your methods, and the concrete contribution: literature review, data collection, econometric modeling, survey analysis, NLP pipeline, or experimental design.",
    },
    {
      title: "Independent Research Project",
      org: "Graduate or undergraduate thesis",
      period: "Example entry",
      body:
        "Summarize the question, dataset, approach, and what the result taught you about rigorous inference or domain-specific decision-making.",
    },
  ],
  teaching: [
    {
      title: "Teaching Assistant",
      org: "Course / Department",
      period: "Example entry",
      body:
        "Include what you taught, how you explained quantitative ideas, how you supported students, and any process you improved for the course.",
    },
    {
      title: "Workshop or Mentoring",
      org: "Lab / student organization / tutoring",
      period: "Example entry",
      body:
        "Highlight communication, curriculum design, office hours, code review, or coaching that shows you can make technical work understandable.",
    },
  ],
  experience: [
    {
      date: "Now",
      role: "Building a job-search-ready data portfolio",
      body:
        "Turning previous analyses, coursework, and research into concise case studies with stronger business framing and cleaner presentation.",
    },
    {
      date: "Recent",
      role: "Research and instructional work",
      body:
        "Worked in academic settings that required careful reasoning, reproducibility, and clear communication of technical material.",
    },
    {
      date: "Foundation",
      role: "Data project development",
      body:
        "Built projects across analytics, experimentation, and forecasting to strengthen end-to-end thinking from question definition to recommendation.",
    },
  ],
  toolbox: {
    summary:
      "Strongest fit: analytics projects that need structured thinking, reproducible workflows, and communication that lands with stakeholders.",
    pills: [
      "Python",
      "SQL",
      "Pandas",
      "scikit-learn",
      "Tableau / Power BI",
      "Experimentation",
      "Statistics",
      "Data Visualization",
      "Storytelling",
      "Research Design",
    ],
  },
  contacts: [
    { label: "Email", value: "yourname@email.com", href: "mailto:yourname@email.com" },
    { label: "LinkedIn", value: "linkedin.com/in/your-profile", href: "https://linkedin.com/in/your-profile" },
    { label: "GitHub", value: "github.com/your-handle", href: "https://github.com/your-handle" },
    { label: "Resume", value: "Add your PDF link", href: "#" },
  ],
};

const assetVersion = "20260405-home-tabs-23";
const projectCatalog = window.projectCatalog || { categories: [], projects: [] };

const setText = (id, text) => {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
};

const renderList = (items, renderer, targetId) => {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = items.map(renderer).join("");
};

setText("hero-summary", siteData.heroSummary);
setText("hero-name", siteData.heroName);
setText("hero-tagline", siteData.heroTagline);
const heroSubtitle = document.getElementById("hero-subtitle");
if (heroSubtitle) {
  heroSubtitle.textContent = siteData.heroSubtitle;
  if (siteData.heroSubtitleHref) {
    heroSubtitle.href = siteData.heroSubtitleHref;
    heroSubtitle.target = "_blank";
    heroSubtitle.rel = "noreferrer";
  }
}

const portraitImage = document.getElementById("hero-portrait-image");
const portraitFallback = document.getElementById("hero-portrait-fallback");

portraitFallback.textContent = siteData.portrait.fallback;

if (siteData.portrait.image) {
  portraitImage.src = `${siteData.portrait.image}?v=${assetVersion}`;
  portraitImage.classList.add("is-visible");
  portraitFallback.classList.add("is-hidden");
}

const iconMarkup = {
  linkedin: `
    <svg viewBox="0 0 24 24" aria-hidden="true" class="hero-link-svg">
      <path
        fill="currentColor"
        d="M6.94 8.5H3.56V20h3.38V8.5Zm-1.69-1.56a1.97 1.97 0 1 0 0-3.94 1.97 1.97 0 0 0 0 3.94ZM20 13.04c0-3.46-1.85-5.07-4.33-5.07-1.99 0-2.88 1.09-3.38 1.86V8.5H8.91V20h3.38v-6.4c0-1.69.32-3.32 2.41-3.32 2.06 0 2.09 1.93 2.09 3.43V20H20v-6.96Z"
      />
    </svg>
  `,
  github: `
    <svg viewBox="0 0 24 24" aria-hidden="true" class="hero-link-svg">
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.41 7.87 10.94.58.1.79-.25.79-.56 0-.28-.01-1.19-.02-2.16-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.97.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.19 1.18a10.98 10.98 0 0 1 5.8 0c2.22-1.49 3.18-1.18 3.18-1.18.64 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.08 0 4.44-2.68 5.41-5.24 5.7.41.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A11.54 11.54 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z"
      />
    </svg>
  `,
  email: `
    <svg viewBox="0 0 24 24" aria-hidden="true" class="hero-link-svg">
      <path
        fill="currentColor"
        d="M3 5.5h18A1.5 1.5 0 0 1 22.5 7v10A1.5 1.5 0 0 1 21 18.5H3A1.5 1.5 0 0 1 1.5 17V7A1.5 1.5 0 0 1 3 5.5Zm0 1.74V17h18V7.24l-8.42 6.48a1 1 0 0 1-1.16 0L3 7.24Zm16.19 0H4.81L12 12.77l7.19-5.53Z"
      />
    </svg>
  `,
};

renderList(
  siteData.heroLinks,
  (link) => `
    <a class="hero-link" href="${link.href}" target="_blank" rel="noreferrer">
      <span class="hero-link-icon">${iconMarkup[link.icon] || ""}</span>
      <span class="hero-link-text">${link.label}</span>
    </a>
  `,
  "hero-link-row"
);

renderList(
  siteData.homeAbout,
  (paragraph) => `<p>${paragraph}</p>`,
  "home-about-content"
);

document.getElementById("about-content").innerHTML = siteData.about.map((paragraph) => `<p>${paragraph}</p>`).join("");

renderList(
  siteData.capabilities,
  (item) => `
    <article class="capability-card">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </article>
  `,
  "capability-grid"
);

const projectNav = document.getElementById("projects-nav");
if (projectNav) {
  const categories = [...projectCatalog.categories].sort((a, b) => a.order - b.order);
  projectNav.innerHTML = categories
    .map(
      (category) => `
        <button class="project-nav-pill" type="button" data-category-target="${category.id}">${category.title}</button>
      `
    )
    .join("");
}

const projectCategories = document.getElementById("projects-categories");
if (projectCategories) {
  const categories = [...projectCatalog.categories].sort((a, b) => a.order - b.order);

  projectCategories.innerHTML = categories
    .map((category) => {
      const categoryProjects = projectCatalog.projects.filter((project) =>
        project.displayCategories.includes(category.title)
      );

      return `
        <section class="project-category-block" id="${category.id}">
          <div class="section-heading">
            <div>
              <p class="section-tag">Toolkit</p>
              <h2>${category.title}</h2>
            </div>
            <p class="section-copy">${category.description}</p>
          </div>
          <div class="project-grid section-tight">
            ${categoryProjects
              .map(
                (project) => `
                  <a class="project-card project-card-link" href="./project.html?slug=${project.slug}">
                    <div class="project-cover">
                      <span class="project-cover-label">${project.coverLabel}</span>
                      <span class="project-status-pill">${project.status}</span>
                    </div>
                    <p class="card-topline">${project.topic}</p>
                    <h3>${project.title}</h3>
                    <p class="project-subtitle">${project.subtitle}</p>
                    <p>${project.miniDescription}</p>
                    <div class="tag-list">
                      ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                    </div>
                  </a>
                `
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

document.querySelectorAll("[data-category-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.categoryTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const renderStackItem = (item) => `
  <article class="stack-item">
    <div class="stack-item-header">
      <h3>${item.title}</h3>
      <span class="stack-item-meta">${item.period}</span>
    </div>
    <p class="stack-item-meta">${item.org}</p>
    <p>${item.body}</p>
  </article>
`;

renderList(siteData.research, renderStackItem, "research-list");
renderList(siteData.teaching, renderStackItem, "teaching-list");

renderList(
  siteData.experience,
  (item) => `
    <article class="timeline-item">
      <p class="timeline-date">${item.date}</p>
      <h3>${item.role}</h3>
      <p>${item.body}</p>
    </article>
  `,
  "experience-timeline"
);

document.getElementById("toolbox").innerHTML = `
  <p class="toolbox-copy">${siteData.toolbox.summary}</p>
  <div class="tool-pills">
    ${siteData.toolbox.pills.map((pill) => `<span class="pill">${pill}</span>`).join("")}
  </div>
`;

renderList(
  siteData.contacts,
  (item) => `
    <a class="contact-chip" href="${item.href}" target="_blank" rel="noreferrer">
      <strong>${item.label}</strong>
      <span>${item.value}</span>
    </a>
  `,
  "contact-links"
);

const views = ["home", "projects", "research", "experience", "contact"];
const panels = document.querySelectorAll("[data-view]");
const navLinks = document.querySelectorAll("[data-view-link]");

const activateView = (viewName) => {
  const activeView = views.includes(viewName) ? viewName : "home";

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.view === activeView);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.viewLink === activeView);
  });

  window.scrollTo({ top: 0, behavior: "auto" });
};

const syncViewFromHash = () => {
  const hash = window.location.hash.replace("#", "");
  activateView(hash || "home");
};

window.addEventListener("hashchange", syncViewFromHash);
syncViewFromHash();
