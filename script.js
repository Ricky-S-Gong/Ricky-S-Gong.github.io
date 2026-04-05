const siteData = {
  heroName: "Ricky Gong",
  heroTagline: "Data science · analytics · product-minded research",
  heroSubtitle: "Data-focused builder translating analysis into clear decisions.",
  heroSummary:
    "I work on data projects that start with ambiguous questions and end with decision-ready analysis. My strongest work combines statistical rigor, product sense, and communication that makes complex results usable for teams.",
  portrait: {
    image: "",
    fallback: "RG",
  },
  heroLinks: [
    {
      label: "LinkedIn",
      value: "Add your LinkedIn URL",
      href: "https://www.linkedin.com/",
      icon: "in",
    },
    {
      label: "GitHub",
      value: "github.com/Ricky-S-Gong",
      href: "https://github.com/Ricky-S-Gong",
      icon: "GH",
    },
    {
      label: "Email",
      value: "sgong.recruiting@gmail.com",
      href: "mailto:sgong.recruiting@gmail.com",
      icon: "@",
    },
  ],
  about: [
    "I care about analytical work that is both technically credible and operationally useful. That means defining the decision clearly, choosing methods that match the risk, and presenting results so non-specialists can act on them.",
    "This portfolio is designed for recruiting conversations: it shows how I frame ambiguous problems, work with real datasets, and communicate outcomes across project, research, and teaching contexts.",
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
setText("hero-subtitle", siteData.heroSubtitle);

const portraitImage = document.getElementById("hero-portrait-image");
const portraitFallback = document.getElementById("hero-portrait-fallback");

portraitFallback.textContent = siteData.portrait.fallback;

if (siteData.portrait.image) {
  portraitImage.src = siteData.portrait.image;
  portraitImage.classList.add("is-visible");
  portraitFallback.classList.add("is-hidden");
}

renderList(
  siteData.heroLinks,
  (link) => `
    <a class="hero-link" href="${link.href}" target="_blank" rel="noreferrer">
      <span class="hero-link-icon">${link.icon}</span>
      <span>
        <span class="hero-link-label">${link.label}</span>
        <span class="hero-link-value">${link.value}</span>
      </span>
    </a>
  `,
  "hero-link-row"
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

renderList(
  siteData.projects,
  (project) => `
    <article class="project-card">
      <p class="card-topline">${project.category}</p>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p><strong>${project.impact}</strong></p>
      <div class="tag-list">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </article>
  `,
  "project-grid"
);

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
