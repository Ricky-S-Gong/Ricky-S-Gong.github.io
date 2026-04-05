const catalog = window.projectCatalog || { projects: [] };
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const project = catalog.projects.find((item) => item.slug === slug);

const setNodeText = (id, value) => {
  const node = document.getElementById(id);
  if (node) node.textContent = value || "";
};

if (!project) {
  setNodeText("detail-category", "Project");
  setNodeText("detail-title", "Project not found");
  setNodeText("detail-subtitle", "Return to the overview page and select a project card.");
  setNodeText("detail-summary", "This detail page is reserved for project narratives that will be filled after a full read of the corresponding code, report, notebook, and paper materials.");
} else {
  document.title = `${project.title} | Ricky Gong`;
  setNodeText("detail-category", project.primaryCategory);
  setNodeText("detail-title", project.title);
  setNodeText("detail-subtitle", project.subtitle);
  setNodeText(
    "detail-summary",
    "This page is intentionally scaffolded first. Full narrative content will be added after a complete read of the project materials, with sections tailored to the project's technical and decision-making emphasis."
  );

  const resourceRow = document.getElementById("detail-resource-row");
  if (resourceRow) {
    resourceRow.innerHTML = project.resources
      .map(
        (resource) => `
          <a class="detail-resource-button" href="${resource.href}" target="_blank" rel="noreferrer">${resource.label}</a>
        `
      )
      .join("");
  }

  const metaRow = document.getElementById("detail-meta-row");
  if (metaRow) {
    metaRow.innerHTML = `
      <span class="pill">${project.status}</span>
      <span class="pill">${project.yearLabel}</span>
      ${project.tags.slice(0, 3).map((tag) => `<span class="pill">${tag}</span>`).join("")}
    `;
  }

  const sectionBlueprints = [
    ["problemDefinition", "Problem Definition"],
    ["whyItMatters", "Why It Matters"],
    ["dataAndSetup", "Data & Setup"],
    ["methodDesign", "Method Design"],
    ["modelPath", "Model / Technical Path"],
    ["systemPipeline", "System / Pipeline"],
    ["mathematicalCore", "Mathematical Core"],
    ["evaluation", "Evaluation / Validation"],
    ["decisionTakeaway", "Decision-Oriented Takeaway"],
    ["limitations", "Limitations"],
    ["nextSteps", "Next Steps"],
  ];

  const detailSections = document.getElementById("detail-sections");
  if (detailSections) {
    detailSections.innerHTML = sectionBlueprints
      .filter(([key]) => project.sections[key])
      .map(
        ([key, label]) => `
          <article class="glass panel detail-section" data-section-key="${key}">
            <h2>${label}</h2>
            <p>
              Section scaffold ready. Final content for <strong>${label}</strong> will be written after a full read of the
              project's source materials.
            </p>
          </article>
        `
      )
      .join("");
  }
}
