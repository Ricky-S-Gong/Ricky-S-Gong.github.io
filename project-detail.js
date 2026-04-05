const catalog = window.projectCatalog || { projects: [] };
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const project = catalog.projects.find((item) => item.slug === slug);

const setNodeText = (id, value) => {
  const node = document.getElementById(id);
  if (node) node.textContent = value || "";
};

const setNodeHtml = (id, value) => {
  const node = document.getElementById(id);
  if (node) node.innerHTML = value || "";
};

const typesetMath = () => {
  if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
    window.MathJax.typesetPromise();
  }
};

const detailNarratives = {
  "minimum-wage-unemployment": {
    summary:
      "This project studies California's 2021 minimum wage increase as a real policy shock and asks how much county-level unemployment moved relative to a control state once persistence and common macro shocks are taken seriously.",
    body: `
      <p>I worked on this project under the guidance of <a href="https://sites.google.com/a/illinois.edu/eunyichung/" target="_blank" rel="noreferrer">Prof. EunYi Chung</a>. The practical question was simple: when California raised the minimum wage in January 2021, did local unemployment move in a measurable way during the recovery period that followed the initial COVID shock? Rather than treating this as a before-and-after comparison, I framed it as a causal identification problem and used New York counties as the comparison group.</p>
      <h2>How I framed the analysis</h2>
      <p>The hard part was separating the policy from everything else happening in the labor market. The panel covers county-level monthly unemployment from January 2018 through January 2025, with California as treatment and New York as control. That made it possible to compare paths over time instead of relying on a single cross-sectional contrast.</p>
      <h2>Method</h2>
      <p>I compared a baseline DID, a two-way fixed-effects model, and then a richer specification with lagged unemployment because the series clearly showed persistence. I also checked pre-trends and tested whether the effect was different for counties that started with higher unemployment.</p>
      <div class="math-block">\\[ \\log(Y_{it}) = \\beta_0 + \\beta_1 D_i^{\\mathrm{treat}} + \\beta_2 D_t^{\\mathrm{post}} + \\beta_3 (D_i^{\\mathrm{treat}} D_t^{\\mathrm{post}}) + \\rho \\log(Y_{i,t-1}) + \\gamma_i + \\delta_t + u_{it}. \\]</div>
      <h2>What mattered</h2>
      <p>The naive DID and standard TWFE both produced a much larger treatment effect, but once lagged unemployment was included, the estimated effect fell to about 2.3% and remained statistically significant. That shift is exactly why I like this project: it shows how much the answer depends on taking persistence seriously instead of reporting the biggest coefficient available.</p>
      <h2>Why it belongs here</h2>
      <p>This project reflects the way I want to do analytics in practice. Start from a real decision question, define the counterfactual carefully, and prefer an effect estimate that survives a more disciplined specification over a dramatic headline that collapses under scrutiny.</p>
    `,
  },
  "nutrition-label-diet-choices": {
    summary:
      "A behavioral-choice study on whether nutrition-label education changes how people make food decisions, approached as an intervention problem rather than a descriptive survey.",
    body: `
      <p>I completed this project under the guidance of <a href="https://shuyangsi.com/" target="_blank" rel="noreferrer">Prof. Shuyang Si</a>. The core question was whether nutrition-label education actually shifts healthy diet choices in a measurable way. I treated it as a decision problem about information design: if labels are supposed to improve choices, what evidence would make that claim credible?</p>
      <h2>How I approached it</h2>
      <p>The project combines survey-style behavioral data with an intervention mindset. Rather than only summarizing what respondents said, I focused on whether exposure to label education changed downstream choice patterns. That meant defining a treatment contrast clearly and analyzing outcomes in a way that separated the intervention signal from baseline preference differences.</p>
      <h2>Why it matters</h2>
      <p>Even though the setting is not a software product, the logic transfers directly to product and policy work. If we change how information is shown, do people make better decisions? That is the same question behind onboarding nudges, health communication, and consumer-choice design.</p>
    `,
  },
  "email-funding-conversion-experiment": {
    summary:
      "A growth experiment on whether targeted email campaigns can causally increase the probability that approved-but-unfunded fintech users complete their first deposit.",
    body: `
      <p>This project was built around a classic growth problem for a retail investing platform: many users finish account approval but never fund the account. The question was whether a better email strategy could move that last step in a measurable way.</p>
      <h2>Experiment design</h2>
      <p>The setup covered 480,000 approved-but-unfunded users over a five-week period. We tested 10 ML-generated email templates across 12 behavioral segments and two delivery cadences, which produced 24 treatment arms with matched controls. That design let the analysis ask not only whether email works, but which audience-template-frequency combinations create meaningful lift.</p>
      <h2>How I analyzed it</h2>
      <p>I used open rate, link rate, and funding rate as the core funnel metrics, then compared treatment arms against their matched controls with one-sided proportions tests. I also tracked unsubscribes and spam reports, because a campaign that boosts one metric while damaging deliverability is not actually a good product decision.</p>
      <h2>Why I like this project</h2>
      <p>The strongest pattern was that daily delivery generally outperformed the twice-a-week schedule, and a subset of treatment arms produced statistically significant funding lift. This is exactly the kind of work I enjoy: a clear business lever, disciplined experimentation, and output that can turn directly into targeting and messaging decisions.</p>
    `,
  },
  "bgm-focused-task-performance": {
    summary:
      "A controlled study on how music type and playback volume affect completion time on verbal and mathematical focus tasks.",
    body: `
      <p>I worked on this study with guidance from <a href="https://stat.illinois.edu/directory/profile/acv28" target="_blank" rel="noreferrer">Prof. Alexandra Chronopoulou</a>. The question was practical: does background music actually help people focus, or does it interfere with performance once task type and difficulty are taken into account?</p>
      <h2>Design</h2>
      <p>The experiment manipulated music type (instrumental versus lyrics) and volume (0%, 50%, 100%), while participants completed both verbal and mathematical tasks at easy and hard difficulty levels. Participants and time intervals were treated as blocking variables, which made the comparisons much cleaner than a casual “music versus silence” setup.</p>
      <h2>What I learned</h2>
      <p>The main outcome was task completion time, modeled with a nested and blocked design using linear mixed effects. The strongest practical result was that instrumental music at 50% volume produced the shortest completion times. I like this project because it turns a familiar everyday question into a properly designed analysis with a usable recommendation.</p>
    `,
  },
  "natural-gas-consumption-forecasting": {
    summary:
      "A forecasting project on U.S. natural gas consumption using time trend and external energy covariates to understand which signals genuinely improve out-of-sample prediction.",
    body: `
      <p>This project focuses on forecasting U.S. natural gas consumption with a combination of time-series thinking and structured regression. The dataset links natural gas demand with related energy and import variables over a long horizon, and the main objective was to build a model that generalizes to held-out periods rather than simply fit the observed curve.</p>
      <h2>Modeling path</h2>
      <p>I split the series into training and test windows and started with interpretable baselines using time trend, imports, coal, and electricity as regressors. Comparing linear and quadratic trend structures made the trade-off very visible: a more flexible trend can improve in-sample fit while hurting out-of-sample performance.</p>
      <h2>Why it matters</h2>
      <p>The project helped me build a forecasting habit that still matters in later work: treat generalization as the objective, not visual fit alone. It also reinforced that interpretable models can still be very useful when the real goal is to understand which external signals are moving demand.</p>
    `,
  },
  "bayesian-statistical-modeling": {
    summary:
      "A Bayesian computation project centered on Metropolis-Hastings, proposal design, and convergence diagnostics for posterior sampling when exact inference is unavailable.",
    body: `
      <p>This project is less about one domain application and more about a modeling habit that continues to matter in my work: understanding what happens when exact inference is not available and we need to sample from a posterior distribution instead. The focus here was Metropolis-Hastings and the practical trade-offs around proposal distributions and convergence behavior.</p>
      <h2>What I studied</h2>
      <p>I worked through the mechanics of proposal generation, acceptance ratios, and convergence diagnostics, then compared the method conceptually with Gibbs sampling. The point was not to memorize the algorithm, but to understand when the chain mixes well, when it stalls, and why proposal quality matters for usable posterior inference.</p>
      <h2>Why it belongs in the portfolio</h2>
      <p>Even though this project is more methodological, it strengthened a part of my toolkit that is genuinely useful in applied work: probabilistic thinking under uncertainty. When a model is meant to support a decision rather than just produce a point estimate, uncertainty and diagnostics matter.</p>
    `,
  },
  "champaign-rental-price-forecasting": {
    summary:
      "A housing-market forecasting project for Champaign that compares statistical baselines, robust regression, and machine-learning models under a realistic rolling evaluation setup.",
    body: `
      <p>I worked on this project as a URES Fellow under <a href="https://experts.illinois.edu/en/persons/hyoeun-lee/" target="_blank" rel="noreferrer">Prof. Hyoeun Lee</a>. The practical question was how to forecast rental prices in Champaign accurately enough to be useful for both student budgeting and local housing interpretation. The city is a good forecasting challenge because rent is shaped by academic seasonality, persistent upward drift, and disruptions such as the COVID period.</p>
      <h2>Data and workflow</h2>
      <p>The response variable was Zillow's Observed Rent Index for Champaign. I combined macroeconomic indicators, local demographic and university signals, and real-estate variables, then harmonized them to a monthly panel from July 2016 to July 2024. Because the inputs arrived at mixed frequencies, the pipeline included frequency aggregation, forward filling when appropriate, and imputation with <code>IterativeImputer</code>.</p>
      <h2>Model comparison</h2>
      <p>I compared linear regression baselines, first-differenced KNN and decision trees, tree ensembles, Huber regression, Prophet, and lightweight deep-learning models. What stood out quickly was that split-based models struggled to extrapolate the strong upward trend, while methods that modeled trend and seasonality directly behaved much better. Prophet ended up giving the strongest overall forecast quality.</p>
      <div class="math-block">\\[ y(t) = g(t) + s(t) + h(t) + \\varepsilon_t. \\]</div>
      <p>The lesson I carried forward is that the best model is not automatically the most complicated one. It is the one whose structure matches the market's behavior closely enough to make the forecast usable.</p>
    `,
  },
  "amazon-food-review-sentiment-analysis": {
    summary:
      "A large-scale review-classification workflow that treats negative-feedback detection as a business-priority problem rather than a pure accuracy contest.",
    body: `
      <p>This project uses the Amazon Fine Food Reviews dataset to build a binary sentiment classifier at production-like scale. The dataset contains more than 568,000 reviews and is strongly imbalanced, so the project was designed around a business-aware question: how do we identify dissatisfied customers reliably enough to act on them without optimizing for overall accuracy only?</p>
      <h2>Pipeline</h2>
      <p>The workflow covers text preprocessing, TF-IDF and Word2Vec representations, class-imbalance handling, model selection, threshold tuning, and ensemble design. I compared logistic regression, random forest, and a soft-voting combination while explicitly prioritizing negative-class recall because missing a dissatisfied customer is more costly than raising a false alarm.</p>
      <h2>What mattered</h2>
      <p>Logistic regression with balancing and ElasticNet regularization produced the strongest individual classifier, and threshold tuning gave the best negative-class F1. The final ensemble rebalanced recall and precision while keeping AUC strong. What matters most to me here is the framing: the model choice follows the intervention cost, not the other way around.</p>
    `,
  },
  "conversion-rate-modeling-optimization": {
    summary:
      "A conversion-diagnostics project that combines segmentation, predictive modeling, and business interpretation to identify where product and marketing should focus next.",
    body: `
      <p>This project started from a straightforward growth question: why do some users convert while others stall, and which segments create the largest practical upside if the experience improves? I treated it as a mix of predictive modeling and decision support rather than a one-off classification exercise.</p>
      <h2>How I used the data</h2>
      <p>The analysis began with descriptive cuts by country, acquisition source, age, and browsing depth, then moved into logistic regression, tree-based models, and segment interpretation. One of the clearest signals in the data was total pages visited, which behaved like a strong proxy for intent.</p>
      <h2>Decision-oriented takeaway</h2>
      <p>The output naturally turned into action ideas: acquire more of the high-converting segments, investigate friction for older users, and treat large low-conversion segments as the biggest product opportunities. I like this project because it shows how predictive analysis becomes useful only after it is translated into segment-level decisions and experiment ideas.</p>
    `,
  },
  "trm-mechanistic-interpretability": {
    summary:
      "An interpretability workflow for a Tiny Recursive Model on ARC-AGI-1 that links sparse internal features to puzzle-solving behavior through causal ablations.",
    body: `
      <p>This project studies how a Tiny Recursive Model solves ARC-style reasoning puzzles by opening up its internal state rather than judging it only by accuracy. The goal was to build a feature-level interpretability workflow: log stepwise latent trajectories, compress them into sparse features with an SAE, and then intervene on those features to see whether puzzle behavior changes.</p>
      <h2>Technical path</h2>
      <p>The setup uses a TRM with adaptive computation time on ARC-AGI-1. I trained a Top-K sparse autoencoder on lower-level hidden states, ranked features by activation statistics, and then ran subtractive and reconstruction-based ablations, including progressive schedules across recurrence steps. The workflow treats interpretability as a causal question: if a feature matters, changing it should change the model's behavior.</p>
      <div class="math-block">\\[ z_n = \\mathrm{TopK}_{64}(\\mathrm{ReLU}(W_{enc}(z_L - b_{pre}) + b_{enc})). \\]</div>
      <p>What makes this project useful in the portfolio is that it shows depth in model analysis, not just model usage. It is one thing to run a model; it is another to ask which internal features appear to support the reasoning process and how confident we should be in that story.</p>
    `,
  },
  "llm-powered-churn-analysis-system": {
    summary:
      "An end-to-end churn-analysis system that turns natural-language business questions into citation-backed retention analysis through hybrid retrieval, QLoRA fine-tuning, and deterministic safeguards.",
    body: `
      <p>This project grew out of an industry workflow and asks a business-centered question: can we replace a bare churn score with a system that explains why a segment is churning, cites the evidence, and recommends concrete next actions? To make the project reproducible, I rebuilt the pipeline on a public telecom dataset instead of private company data, but the design logic stayed the same.</p>
      <h2>System design</h2>
      <p>The system turns each customer record into a unified document, retrieves relevant cases with dense search plus BM25, fuses those rankings with Reciprocal Rank Fusion, and sends the resulting context to a 4-bit Qwen2.5-7B model. I then used a 14B teacher to generate domain-specific training data and fine-tuned the 7B student with QLoRA so the output would become more structured and domain-aware.</p>
      <div class="math-block">\\[ \\mathrm{RRF}(d) = \\sum_{r \\in \\{\\mathrm{vector},\\mathrm{BM25}\\}} \\frac{w_r}{k + \\mathrm{rank}_r(d)}. \\]</div>
      <div class="math-block">\\[ R_{\\mathrm{total}} = 0.35R_{\\mathrm{churn}} + 0.25R_{\\mathrm{tenure}} + 0.20R_{\\mathrm{charge}} + 0.20R_{\\mathrm{contract}}. \\]</div>
      <h2>What improved the system</h2>
      <p>The interesting twist is that fine-tuning alone was not the finish line. The model preserved perfect JSON structure but regressed on citation accuracy, so I added post-processing that validates citations against retrieved customer IDs and computes risk with a deterministic formula instead of a subjective LLM guess. That improved pipeline achieved 100% JSON compliance, 100% citation accuracy, and the strongest overall evaluation score in the final comparison.</p>
      <p>For me, this is a strong portfolio piece because it shows a pattern I care about deeply: the best solution often comes from combining models with explicit system safeguards instead of assuming one training run will solve every reliability issue.</p>
    `,
  },
  "tool-using-language-models": {
    summary:
      "An alignment study comparing SFT, DPO, PPO, and GRPO for small language models that need to call external tools correctly and consistently.",
    body: `
      <p>This project is still in progress, but the core idea is already clear. I want to understand which training paradigm best teaches a small language model not just to answer, but to use tools correctly: pick the right tool, format its arguments properly, and integrate the result into a final response.</p>
      <h2>Research direction</h2>
      <p>The project compares four regimes on the same task family: SFT, DPO, PPO, and GRPO. The key question is whether group-relative advantage estimation in GRPO is more stable than PPO when the reward is sparse and compositional. I am also explicitly interested in the small-model regime because it is much closer to realistic cost constraints.</p>
      <div class="math-block">\\[ r = \\alpha r_{\\mathrm{select}} + \\beta r_{\\mathrm{format}} + \\gamma r_{\\mathrm{answer}}. \\]</div>
      <p>What makes the project valuable for me is that it sits right at the boundary between modeling and systems. Tool-use alignment is not only about preference optimization; it is also about designing a reward signal that actually reflects the task structure.</p>
    `,
  },
  "trustworthy-rl-llm-reasoning": {
    summary:
      "A project on training a small model for ARC-style reasoning with a mix of supervised data generation, exact-match evaluation, and denser reward design.",
    body: `
      <p>This project is an in-progress exploration of trustworthy reasoning on ARC-AGI-1. The setup asks whether a small model can learn to solve abstract grid-transformation tasks more reliably when the training signal is shaped carefully instead of relying only on sparse exact-match success. I am working on it with Sunggun Lee.</p>
      <h2>Planned approach</h2>
      <p>The pipeline uses GPT-mini to generate supervised examples for a GPT-nano student, then defines two complementary rewards: exact task success for final evaluation and cell-level accuracy for denser training feedback. That balance is important because ARC is structurally hard and a purely binary reward can make optimization unstable or uninformative.</p>
      <div class="math-block">\\[ r_{\\mathrm{train}}(\\hat{y}, y^*) = \\frac{1}{H\\cdot W} \\sum_{i=1}^{H} \\sum_{j=1}^{W} \\mathbf{1}[\\hat{y}_{ij} = y^*_{ij}]. \\]</div>
      <p>I like this project because it is less about chasing a leaderboard and more about understanding how reward design changes model behavior. That makes it a natural bridge between reinforcement learning, reasoning, and trustworthy AI.</p>
    `,
  },
  pennos: {
    summary:
      "A Unix-like operating-systems build that combines process scheduling, shell interaction, and a FAT-style file system inside a single-process guest OS.",
    body: `
      <p>PennOS is a systems project where the point was to build the pieces together, not study them in isolation. The system runs as a guest OS inside a host process and combines a priority scheduler, process lifecycle management, shell commands, and a FAT-style file system. I worked on it with Jichu Mao, Zihao Zhu, and Shibo Jin.</p>
      <h2>What I built</h2>
      <p>The operating-system side includes an <code>spthread</code>-based process model, preemptive weighted scheduling, process states such as blocked and zombie, signal handling, and logging. The file-system side implements a FAT-like storage model with block chains, root-directory entries, permissions, open-file state, and a layered interface from shell commands down to low-level storage operations.</p>
      <h2>Why it matters here</h2>
      <p>I include this project because it shows a different kind of rigor. Here the hard part is not choosing an algorithm, but maintaining clean abstractions across kernel state, queues, syscalls, and file-system operations. It strengthened my intuition for reliability, interfaces, and the engineering discipline behind the data systems I want to work on later.</p>
    `,
  },
  penncloud: {
    summary:
      "A distributed cloud-platform build centered on stateless frontends, replicated key-value storage, and the integration path from minimal service demos to a more fault-tolerant architecture.",
    body: `
      <p>PennCloud is an ongoing distributed-systems project that aims to build a small cloud platform with webmail, file storage, user accounts, and an admin console on top of a replicated key-value backend. I am responsible primarily for frontend infrastructure, including the HTTP server, load-balancing path, user-account flows, and cross-layer integration, while the rest of the team focuses on storage, coordination, and application services.</p>
      <h2>Current direction</h2>
      <p>The architecture follows a stateless-frontend pattern: frontends serve HTTP but do not own persistent state, while the backend handles key-value storage, replication, and eventually recovery. On the implementation side, the current progress includes a multithreaded HTTP server, cookie-backed account flows, initial webmail and drive flows, and the early integration work needed to keep the frontend and storage layers coherent.</p>
      <h2>Why I am showing it already</h2>
      <p>This project is still moving, but it already shows something I care about: scaling from a minimal demo to a system that can survive partial failure. That transition forces you to think about routing, recovery, fault detection, and interface boundaries in a very concrete way. Even before the final version is done, it is a valuable representation of how I like to work on infrastructure problems.</p>
    `,
  },
};

if (!project) {
  setNodeText("detail-category", "Project");
  setNodeText("detail-title", "Project not found");
  setNodeText("detail-subtitle", "Return to the overview page and select a project card.");
  setNodeText(
    "detail-summary",
    "This detail page is reserved for project narratives that will be filled after a full read of the corresponding code, report, notebook, and paper materials."
  );
} else {
  const narrative = detailNarratives[project.slug] || {};
  document.title = `${project.title} | Ricky Gong`;
  setNodeText("detail-category", project.primaryCategory);
  setNodeText("detail-title", project.title);
  setNodeText("detail-subtitle", project.subtitle);
  setNodeHtml(
    "detail-summary",
    narrative.summary ||
      project.detailSummary ||
      "This page is being expanded into a full narrative after a complete read of the project materials."
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
      <span class="pill">${project.yearLabel}</span>
      ${project.tags.slice(0, 3).map((tag) => `<span class="pill">${tag}</span>`).join("")}
    `;
  }

  const detailArticle = document.getElementById("detail-article");
  if (detailArticle) {
    detailArticle.innerHTML =
      narrative.body ||
      "<p>This project detail page is being expanded into a full narrative after a complete read of the underlying materials.</p>";
  }

  typesetMath();
  window.addEventListener("load", typesetMath, { once: true });
}
