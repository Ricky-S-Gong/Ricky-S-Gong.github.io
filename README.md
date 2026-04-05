# Personal Website

Static portfolio website for job search use. No build step, no framework, no dependency install required.

## Files

- `index.html`: page structure
- `styles.css`: visual system and responsive layout
- `script.js`: portfolio content and section rendering

## How to edit content

Most of the editable content lives in `script.js` inside the `siteData` object:

- `heroSummary`: opening summary
- `currentFocus`: current job-search focus
- `heroMetrics`: the 3 highlight metrics in the hero section
- `about`: about paragraphs
- `capabilities`: top strengths
- `projects`: project cards
- `research`: research items
- `teaching`: teaching items
- `experience`: timeline entries
- `toolbox`: skills and methods
- `contacts`: email, LinkedIn, GitHub, resume

## Local preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

This repo is configured to deploy automatically with GitHub Actions from the `main` branch.

### Recommended flow

1. Create a GitHub repository.
2. Push this folder to the repository's `main` branch.
3. In GitHub, open:
   - `Settings`
   - `Pages`
4. Under **Build and deployment**:
   - set **Source** to `GitHub Actions`
5. Pushes to `main` will then publish the site automatically.

### Expected site URL

- For a normal repo named `Website`, the URL will usually look like:
  - `https://YOUR_GITHUB_USERNAME.github.io/Website/`
- If you want the site at the root domain:
  - `https://YOUR_GITHUB_USERNAME.github.io/`
  then the repository name should be exactly:
  - `YOUR_GITHUB_USERNAME.github.io`

### Suggested commands

After you create the remote repo on GitHub:

```bash
git add .
git commit -m "Initial portfolio site"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Custom domain

Not required.

You can publish first with the default GitHub Pages URL and buy a custom domain later.

If you later buy a domain:

1. Add the domain in GitHub Pages settings.
2. Update DNS records at your domain registrar.
3. Optionally add a `CNAME` file to this repo.

## Recommended next content pass

1. Replace placeholder contact links.
2. Replace example research and teaching entries with your real history.
3. Rewrite each project entry to include:
   - problem
   - dataset
   - method
   - output
   - measurable or decision impact
4. Add project links once you have GitHub repos, notebooks, dashboards, or writeups.
