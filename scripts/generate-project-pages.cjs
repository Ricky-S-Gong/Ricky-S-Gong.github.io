const { readFileSync, writeFileSync } = require("node:fs");
const { runInNewContext } = require("node:vm");

const window = {};
runInNewContext(readFileSync("projects-data.js", "utf8"), { window });

const template = readFileSync("project.html", "utf8");
const body = "<body data-sky>";
if (!template.includes(body)) throw new Error("Project page body marker is missing");

for (const { slug, externalHref } of window.projectCatalog.projects) {
  if (externalHref) continue;
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid project slug: ${slug}`);
  }
  writeFileSync(`project-${slug}.html`, template.replace(body, `<body data-sky data-project-slug="${slug}">`), { flag: "wx" });
}

writeFileSync("project.html", template.replace(body, "<body data-sky data-project-paths>"));
