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

const orderedSectionKeys = [
  "problemDefinition",
  "whyItMatters",
  "dataAndSetup",
  "methodDesign",
  "modelPath",
  "mathematicalCore",
  "systemPipeline",
  "evaluation",
  "decisionTakeaway",
  "limitations",
  "nextSteps",
];

const standardizedSectionGroups = [
  { title: "Background / Motivation", keys: ["problemDefinition"] },
  { title: "Problem Formulation", keys: ["whyItMatters"] },
  { title: "Data & Setup", keys: ["dataAndSetup"] },
  { title: "Methodology", keys: ["methodDesign", "modelPath", "mathematicalCore", "systemPipeline"] },
  { title: "Results", keys: ["evaluation"] },
  { title: "Insights / Takeaways", keys: ["decisionTakeaway"] },
  { title: "Limitations & Future Work", keys: ["limitations", "nextSteps"] },
];

const buildNarrativeFromSections = (projectData = {}) => {
  const detailSections = projectData.detailSections || {};

  return standardizedSectionGroups
    .map(({ title, keys }) => {
      const content = keys
        .map((key) => detailSections[key] || "")
        .filter(Boolean)
        .join("");
      if (!content) return "";
      return `<h2>${title}</h2>${content}`;
    })
    .filter(Boolean)
    .join("");
};

const detailNarratives = {
  "minimum-wage-unemployment": {
    summary:
      "This project studies California's 2021 minimum wage increase as a real policy shock and asks how much county-level unemployment moved relative to a control state once persistence and common macro shocks are taken seriously.",
    body: `
      <p>I worked on this project under the guidance of <a href="https://sites.google.com/a/illinois.edu/eunyichung/" target="_blank" rel="noreferrer">Prof. EunYi Chung</a>. The practical question was simple: when California raised the minimum wage in January 2021, did local unemployment move in a measurable way during the recovery period that followed the initial COVID shock? Rather than treating this as a before-and-after comparison, I framed it as a causal identification problem and used New York counties as the comparison group.</p>
      <h2>Data & Setup</h2>
      <p>The panel covers monthly county-level unemployment from January 2018 through January 2025. California is the treated state and New York is the comparison state. That time span matters because it includes the COVID labor-market collapse, the recovery period, and the policy implementation itself. In other words, this is exactly the kind of setting where a casual trend comparison would be misleading.</p>
      <p>I started with descriptive summaries and fixed-effects intuition before moving to formal estimation. California counties have much higher average unemployment counts and substantially more dispersion than New York counties, so the design needed county fixed effects to absorb persistent local differences and time fixed effects to absorb economy-wide shocks. The empirical task was not just estimating one coefficient; it was deciding which specification was credible enough to support a policy conclusion.</p>
      <h2>Methodology</h2>
      <p>I compared three layers of models: a baseline DID, a two-way fixed-effects specification, and then a dynamic version that adds lagged unemployment. That last step ended up being important because unemployment is persistent by construction. If the model ignores that persistence, it can overstate the policy effect by attributing serial dependence to treatment.</p>
      <div class="math-block">\\[ \\log(Y_{it}) = \\beta_0 + \\beta_1 D_i^{\\mathrm{treat}} + \\beta_2 D_t^{\\mathrm{post}} + \\beta_3 (D_i^{\\mathrm{treat}} D_t^{\\mathrm{post}}) + \\rho \\log(Y_{i,t-1}) + \\gamma_i + \\delta_t + u_{it}. \\]</div>
      <p>In this equation, \\(Y_{it}\\) is unemployment in county \\(i\\) during month \\(t\\); \\(D_i^{\\mathrm{treat}}\\) indicates treated California counties; \\(D_t^{\\mathrm{post}}\\) indicates post-policy months; and \\(D_i^{\\mathrm{treat}} D_t^{\\mathrm{post}}\\) is the treatment interaction whose coefficient \\(\\beta_3\\) is the policy effect of interest. The lag term \\(\\rho \\log(Y_{i,t-1})\\) captures persistence, \\(\\gamma_i\\) are county fixed effects, \\(\\delta_t\\) are month fixed effects, and \\(u_{it}\\) is the remaining error. The equation looks simple, but each term corresponds to a specific modeling choice about what we are willing to treat as part of the counterfactual.</p>
      <h2>Insights / Takeaways</h2>
      <p>I also checked the identifying assumptions in more than one way. The paper tests pre-trends, explores heterogeneity by baseline unemployment level, and compares the treatment effect across specifications. The main practical lesson is that the bigger coefficient is not automatically the better answer. The naive DID and standard TWFE both suggested a larger post-policy increase, but once lagged unemployment was added, the estimate dropped to roughly 2.3% and stayed statistically significant.</p>
      <p>That shift is exactly why I value this project. It shows how causal work becomes useful only when the specification is disciplined enough to survive obvious objections. For a business or policy audience, the takeaway is not “minimum wage always hurts employment”; it is that in this particular setting, after accounting for common shocks and persistence, the data still point to a moderate increase in unemployment. That is a much more defensible conclusion than a headline effect from an under-specified model.</p>
    `,
  },
  "nutrition-label-diet-choices": {
    summary:
      "A behavioral-choice study on whether nutrition-label education changes how people make food decisions, approached as an intervention problem rather than a descriptive survey.",
    body: `
      <p>I completed this project under the guidance of <a href="https://www.shuyangsi.com/" target="_blank" rel="noreferrer">Prof. Shuyang Si</a>. The core question was whether nutrition-label education actually shifts healthy diet choices in a measurable way. I treated it as a decision problem about information design: if labels are supposed to improve choices, what evidence would make that claim credible?</p>
      <h2>Background / Motivation</h2>
      <p>The motivation for the project was straightforward. Nutrition labels are everywhere, but their practical value depends on whether they actually change choices instead of merely increasing awareness. That gap between information availability and behavioral change is what made the topic interesting to me. I wanted to evaluate nutrition-label education as an intervention problem, not just as a descriptive survey about what participants say they believe.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the task as an applied treatment-effect question. The goal was to estimate whether exposure to nutrition-label education changes downstream food-choice behavior after accounting for baseline differences in respondents. In that setup, the input is each participant's treatment status plus demographic and baseline-preference covariates, the output is a measurable post-intervention choice outcome, and the main quantity of interest is the treatment coefficient rather than a generic correlation.</p>
      <h2>Data & Setup</h2>
      <p>The study uses respondent-level behavioral and survey data, including participant characteristics, prior eating patterns, and post-intervention decision outcomes. The design compares exposed and unexposed groups on concrete choice variables rather than on attitudes alone. The practical importance of that setup is that it keeps the evaluation tied to behavior at the point of decision, which is much closer to how a public-health team or consumer-information team would judge whether an educational intervention is worth scaling.</p>
      <h2>Methodology</h2>
      <p>The empirical strategy centers on a regression that isolates the incremental effect of education while controlling for baseline heterogeneity. I used that structure because the main risk in this kind of project is attributing pre-existing differences in preferences or demographics to the treatment itself.</p>
      <div class="math-block">\\[ Y_i = \\alpha + \\tau \\cdot \\mathrm{Educated}_i + X_i'\\beta + \\varepsilon_i. \\]</div>
      <p>Here \\(Y_i\\) is the downstream food-choice outcome for respondent \\(i\\), \\(\\alpha\\) is the intercept, \\(\\mathrm{Educated}_i\\) indicates whether the respondent received the nutrition-label intervention, \\(X_i\\) is the vector of observed controls, \\(\\beta\\) is the associated coefficient vector, and \\(\\varepsilon_i\\) is the residual term. The coefficient \\(\\tau\\) is the effect of interest: the estimated shift in behavior attributable to education once those controls are held fixed. I like this specification because it makes the question very explicit: the intervention matters only if it moves choices after we account for who the respondent already is.</p>
      <h2>Results</h2>
      <p>The main result is not simply that participants reported labels to be useful. The stronger result is that the treatment analysis is structured around whether exposed respondents make different downstream choices in a statistically interpretable way. In other words, the project pushes past descriptive awareness and forces the analysis to focus on measurable behavioral movement, which is the more decision-relevant outcome.</p>
      <h2>Insights / Takeaways</h2>
      <p>The biggest takeaway for me was conceptual: information is only valuable if it changes decisions. That sounds obvious, but it is easy for education-oriented analysis to stop at attitudes or self-reported usefulness. This project reinforced a habit I now carry into product and business analytics as well: if a dashboard, message, or intervention does not change behavior at the decision point, then its value is still unproven.</p>
      <h2>Limitations & Future Work</h2>
      <p>The main limitations come from what the current setup can and cannot observe. Behavioral outcomes are richer than attitude measures, but they still depend on the scope of the intervention design, the available controls, and the way the choice outcome is operationalized. A natural next step would be to extend the analysis with a larger sample, clearer longitudinal follow-up, or more granular outcome definitions so that the persistence and magnitude of the educational effect can be evaluated more convincingly.</p>
    `,
  },
  "email-funding-conversion-experiment": {
    summary:
      "A growth experiment on whether targeted email campaigns can causally increase the probability that approved-but-unfunded fintech users complete their first deposit.",
    body: `
      <p>This project was built around a classic growth problem for a retail investing platform: many users finish account approval but never fund the account. The question was whether a better email strategy could move that last step in a measurable way.</p>
      <h2>Data & Setup</h2>
      <p>The setup covered 480,000 approved-but-unfunded users over a five-week period. We tested 10 ML-generated templates across 12 behavioral segments and two delivery cadences, which created 24 treatment arms plus matched controls. That structure let the analysis answer three practical questions at once: which messages attract attention, which combinations drive clicks, and which treatments actually lead to funded accounts.</p>
      <h2>Methodology</h2>
      <p>I treated the funnel as layered rather than collapsing everything into one endpoint. Open rate measured message resonance, link rate captured deeper engagement, and funding rate served as the final business outcome. I also tracked unsubscribe and spam-report rates as guardrails, because a campaign that improves funding while degrading trust or deliverability is not a sustainable win.</p>
      <div class="math-block">\\[ \\widehat{\\Delta}_g = \\hat{p}^{\\mathrm{treat}}_g - \\hat{p}^{\\mathrm{ctrl}}_g, \\qquad z_g = \\frac{\\widehat{\\Delta}_g}{\\sqrt{\\hat{p}_g(1-\\hat{p}_g)(1/n_t + 1/n_c)}}. \\]</div>
      <p>The report uses one-sided proportions tests to compare each treatment arm against its control. In the formula, \\(\\widehat{\\Delta}_g\\) is the estimated lift for treatment group \\(g\\), \\(\\hat{p}^{\\mathrm{treat}}_g\\) and \\(\\hat{p}^{\\mathrm{ctrl}}_g\\) are the observed conversion rates in the treatment and control cohorts, \\(\\hat{p}_g\\) is the pooled conversion rate, and \\(n_t\\) and \\(n_c\\) are the treatment and control sample sizes. The resulting \\(z_g\\) statistic tests whether the observed lift is large enough to justify rollout. The executive summary also highlights aggregate business impact, estimating 500+ incremental funded users attributable to statistically significant groups. That translation from statistical lift to operational value is a big reason I like the project.</p>
      <h2>Results</h2>
      <p>The clearest pattern was cadence. Daily email delivery generally beat the twice-a-week schedule, and the <code>ml_funding_faq</code> template posted the highest open rate at roughly 31.5%, well above campaign average. More importantly, not every high-open treatment produced downstream funding lift, which is exactly why the layered funnel analysis mattered. The output is actionable because it tells a growth team what to send, to whom, and how often, rather than simply declaring the campaign “successful.”</p>
      <p>I also like the project because it separates communication quality from business impact. A subject line can win opens and still fail to change conversion. That distinction is easy to miss if the analysis stops at top-of-funnel metrics. Here the value comes from carrying the experiment all the way to the funding decision and then translating lift into a rollout recommendation.</p>
    `,
  },
  "bgm-focused-task-performance": {
    summary:
      "A controlled study on how music type and playback volume affect completion time on verbal and mathematical focus tasks.",
    body: `
      <p>I worked on this study with guidance from <a href="https://alexandrachron.wixsite.com/mysite" target="_blank" rel="noreferrer">Prof. Alexandra Chronopoulou</a>. The question was practical: does background music actually help people focus, or does it interfere with performance once task type and difficulty are taken into account?</p>
      <h2>Data & Setup</h2>
      <p>The design is more disciplined than the topic first suggests. Music type had two levels, volume had three levels nested within type, task type had verbal and math arms, and difficulty had easy and hard variants. Time interval and participant were introduced as blocking variables, which makes the project much more than a casual “music versus silence” comparison.</p>
      <p>The outcome variable was completion time over 288 trial sessions. That matters because completion time gives a practical performance signal instead of relying on self-reported focus. In a workplace or study setting, the actual decision is not whether participants <em>feel</em> focused, but whether they complete work faster under a given environment.</p>
      <h2>Methodology</h2>
      <div class="math-block">\\[ y_{ijklmn} = \\mu + \\alpha_i + \\beta_{j(i)} + \\gamma_k + \\delta_l + (\\alpha\\gamma)_{ik} + (\\beta\\gamma)_{j(i)k} + b_m + c_n + \\varepsilon_{ijklmn}. \\]</div>
      <p>The analysis uses a linear mixed-effects framework to estimate the contribution of music type, volume, task type, difficulty, and their interactions while accounting for the blocked design. In the model, \\(y_{ijklmn}\\) is the completion time for a given trial, \\(\\mu\\) is the grand mean, \\(\\alpha_i\\) is the effect of music type, \\(\\beta_{j(i)}\\) is the nested volume effect within music type, \\(\\gamma_k\\) is task type, \\(\\delta_l\\) is difficulty, \\((\\alpha\\gamma)_{ik}\\) and \\((\\beta\\gamma)_{j(i)k}\\) are interaction terms, \\(b_m\\) is the block effect for time interval, \\(c_n\\) is the participant-level random effect, and \\(\\varepsilon_{ijklmn}\\) is the residual. The strongest result was not “music always helps.” It was narrower and more usable: instrumental music at 50% volume consistently produced the shortest completion times and outperformed silence as well as the lyric conditions.</p>
      <p>The mixed-effects formulation matters because the design is nested and blocked rather than fully independent. Time interval and participant variation can otherwise leak into the treatment comparison. By modeling those sources explicitly, the recommendation becomes much more credible than a simple mean-difference table.</p>
      <p>I like this project because it turns a familiar lifestyle question into a cleanly designed analysis with a recommendation you could actually implement. It also reflects a pattern I care about in applied work: even simple everyday decisions become much clearer when the design is structured correctly.</p>
    `,
  },
  "natural-gas-consumption-forecasting": {
    summary:
      "A forecasting project on U.S. natural gas consumption using time trend and external energy covariates to understand which signals genuinely improve out-of-sample prediction.",
    body: `
      <p>This project focuses on forecasting U.S. natural gas consumption with a combination of time-series thinking and structured regression. The dataset links natural gas demand with related energy and import variables over a long horizon, and the main objective was to build a model that generalizes to held-out periods rather than simply fit the observed curve.</p>
      <h2>Data & Setup</h2>
      <p>The data span monthly observations from 2005 onward and include natural gas consumption as the response, with imports, coal, electricity, and a time trend as candidate drivers. I split the sample into an 80% training window and a 20% test window so that evaluation reflected forecast performance rather than in-sample fit.</p>
      <p>The modeling path began with two interpretable regressions: one with a linear trend and one with a quadratic trend. That comparison quickly exposed a practical forecasting trade-off. The linear-trend model achieved stronger fit and cleaner residual behavior, while the quadratic trend looked more flexible but generalized worse.</p>
      <div class="math-block">\\[ \\widehat{gas}_t = \\beta_0 + \\beta_1 t + \\beta_2 import_t + \\beta_3 coal_t + \\beta_4 elec_t + \\varepsilon_t. \\]</div>
      <p>This equation matters because each term is interpretable. Here \\(\\widehat{gas}_t\\) is predicted natural gas consumption at month \\(t\\), \\(\\beta_0\\) is the intercept, \\(\\beta_1\\) multiplies the linear time trend, \\(import_t\\), \\(coal_t\\), and \\(elec_t\\) are the contemporaneous import, coal, and electricity covariates, and \\(\\varepsilon_t\\) is the residual shock. The trend term captures long-run movement, imports proxy supply-side conditions, coal captures substitution in energy demand, and electricity contributes additional information about broader consumption dynamics. In the report, the linear-trend model reached an adjusted \\(R^2\\) of about 0.566 and outperformed the quadratic alternative on held-out data.</p>
      <p>I also looked carefully at residual diagnostics rather than stopping at fit statistics. The linear specification produced more stable residual behavior, which reinforced the idea that a slightly simpler model can be more useful if its error structure is easier to trust. For forecasting work, that matters because the person consuming the result usually cares more about whether the next few predictions are stable than whether the model explains one more fraction of in-sample variance.</p>
      <h2>Insights / Takeaways</h2>
      <p>The project reinforced a forecasting habit I still use: optimize for stability and test-set performance, not just curve-fitting. It also showed that even fairly simple models can be valuable when the real objective is to understand which external signals move the series and to produce a forecast that decision-makers can trust.</p>
    `,
  },
  "bayesian-statistical-modeling": {
    summary:
      "A Bayesian computation project centered on Metropolis-Hastings, proposal design, and convergence diagnostics for posterior sampling when exact inference is unavailable.",
    body: `
      <p>This project is less about one domain application and more about a modeling habit that continues to matter in my work: understanding what happens when exact inference is not available and we need to sample from a posterior distribution instead. The focus here was Metropolis-Hastings and the practical trade-offs around proposal distributions and convergence behavior.</p>
      <h2>Problem Formulation</h2>
      <p>The report focuses on a common Bayesian reality: the posterior is known only up to proportionality, so exact sampling is not available. Metropolis-Hastings solves that by proposing a candidate state and then accepting or rejecting it based on how plausible that move is under the target distribution and proposal kernel.</p>
      <div class="math-block">\\[ \\alpha(x, x') = \\min \\left\\{1, \\frac{\\pi(x' \\mid y) q(x \\mid x')}{\\pi(x \\mid y) q(x' \\mid x)} \\right\\}. \\]</div>
      <p>This acceptance ratio is the heart of the algorithm. Here \\(x\\) is the current state of the Markov chain, \\(x'\\) is the proposed state, \\(\\pi(\\cdot \\mid y)\\) is the posterior density given observed data \\(y\\), and \\(q(x'\\mid x)\\) and \\(q(x\\mid x')\\) are the forward and reverse proposal densities. The posterior only needs to be known up to proportionality because the normalizing constant cancels in the ratio. The proposal term matters because the chain is not moving freely over the parameter space; it is moving according to a design choice that can make sampling efficient or painfully slow.</p>
      <h2>Methodology</h2>
      <p>The project compares symmetric and asymmetric proposal setups, acceptance behavior, and convergence diagnostics. The practical lesson is that MCMC quality is not just about correctness in theory. A chain that mixes poorly or accepts too little is technically valid but operationally weak. In applied Bayesian work, useful uncertainty estimates depend on diagnostics just as much as on the underlying model.</p>
      <p>What I found valuable here was how directly proposal design controls the analyst's experience. A very local proposal can make acceptance look healthy while the chain barely explores the posterior; an aggressive proposal can move far but spend too much time rejected. Looking at trace plots, acceptance rate, and convergence behavior together made the trade-off concrete rather than abstract.</p>
      <p>That is why I keep this project in the portfolio. It sharpened my understanding of probabilistic inference as an engineering choice, not just a mathematical object. When a model is meant to inform decisions, uncertainty quantification is only useful if the sampling procedure itself is well behaved.</p>
    `,
  },
  "champaign-rental-price-forecasting": {
    summary:
      "A housing-market forecasting project for Champaign that compares statistical baselines, robust regression, and machine-learning models under a realistic rolling evaluation setup.",
    body: `
      <p>I worked on this project as a URES Fellow under <a href="https://experts.illinois.edu/en/persons/hyoeun-lee/" target="_blank" rel="noreferrer">Prof. Hyoeun Lee</a>. The practical question was how to forecast rental prices in Champaign accurately enough to be useful for both student budgeting and local housing interpretation. The city is a good forecasting challenge because rent is shaped by academic seasonality, persistent upward drift, and disruptions such as the COVID period.</p>
      <h2>Data & Setup</h2>
      <p>The response variable was Zillow's Observed Rent Index for Champaign. I built the feature set by combining macroeconomic indicators, demographics, UIUC student population signals, poverty, vacancy, housing supply, market-liquidity variables such as days on market, and COVID-era disruption measures. One practical difficulty was that these sources arrived at different frequencies, so the pipeline had to aggregate yearly, semesterly, daily, and monthly signals into a common monthly table before modeling even began.</p>
      <p>The final modeling window ran from July 2016 through July 2024. Missing values were imputed with <code>IterativeImputer</code>, and the exploratory stage included decomposition plots plus ACF/PACF checks to understand trend, seasonality, and persistence. Those diagnostics made it clear that Champaign's rental market is not just noisy; it is structurally seasonal and heavily tied to the academic calendar.</p>
      <h2>Methodology</h2>
      <p>I compared linear regression baselines, first-differenced KNN and decision trees, tree ensembles, Huber regression, Prophet, and lightweight deep-learning models. The comparisons were run under both a held-out test split and a rolling evaluation, which matters because housing forecasts are only useful if they stay stable over time instead of winning one lucky split.</p>
      <div class="math-block">\\[ y(t) = g(t) + s(t) + h(t) + \\varepsilon_t. \\]</div>
      <p>In Prophet's formulation, \\(y(t)\\) is the observed rent index at time \\(t\\), \\(g(t)\\) captures long-run trend, \\(s(t)\\) captures seasonality, \\(h(t)\\) captures event-like or holiday-style adjustments, and \\(\\varepsilon_t\\) is the unexplained noise term. That decomposition fit the rental market much better than purely split-based models, which struggled to extrapolate a strong upward trend. In the final comparison, Prophet delivered the best test and rolling MSE, and the report used it to forecast the first quarter of 2025 around the low-1330 range.</p>
      <p>One of the clearest findings was that split-based tree models underperformed not because they were too weak, but because the market's behavior was dominated by persistent upward movement and calendar-driven seasonality. Those are exactly the settings where a model with explicit structure can beat a more flexible model that extrapolates poorly.</p>
      <p>The larger lesson is one I use often now: the best model is not automatically the most complicated one. It is the one whose structural assumptions match how the market actually behaves well enough to produce a forecast somebody can use.</p>
    `,
  },
  "amazon-food-review-sentiment-analysis": {
    summary:
      "A large-scale review-classification workflow that treats negative-feedback detection as a business-priority problem rather than a pure accuracy contest.",
    body: `
      <p>This project uses the Amazon Fine Food Reviews dataset to build a binary sentiment classifier at production-like scale. The dataset contains more than 568,000 reviews and is strongly imbalanced, so the project was designed around a business-aware question: how do we identify dissatisfied customers reliably enough to act on them without optimizing for overall accuracy only?</p>
      <h2>Data & Setup</h2>
      <p>The workflow covers text preprocessing, TF-IDF and Word2Vec representations, class-imbalance handling, model selection, threshold tuning, and ensemble design. I compared a baseline-first sequence of models instead of jumping straight to a complex architecture, because the real objective was to learn what each modeling choice added.</p>
      <p>Two decisions from the report are especially important. First, I preserved negation terms instead of using a generic stop-word list, because removing words like <code>not</code> and <code>can't</code> actually flips sentiment in short reviews. Second, I treated Truncated SVD as a utility for dense-input methods rather than a default NLP improvement, because the report showed that 1,000 components still retained well under the variance needed to justify aggressive compression.</p>
      <div class="math-block">\\[ y_i = \\begin{cases} 1 & s_i > 3 \\\\ 0 & s_i < 3 \\end{cases} \\quad \\text{with neutral reviews removed when } s_i = 3. \\]</div>
      <p>This label construction matters because it reduces ambiguity and makes the downstream business question sharper: identify strongly negative experiences well enough to intervene. In the rule, \\(s_i\\) is the original star rating for review \\(i\\), and \\(y_i\\) is the derived binary sentiment label after neutral three-star reviews are removed. The dataset ends up moderately imbalanced at roughly 78% positive and 22% negative, so recall for the negative class became a first-class metric instead of an afterthought.</p>
      <h2>Results</h2>
      <p>The strongest single model in the report was a balanced logistic regression with ElasticNet regularization and threshold tuning at \\(\\tau^* = 0.37\\), which produced a negative-class F1 of 0.784 and AUC of 0.951. A soft-voting ensemble matched the AUC while shifting the precision-recall balance. I also compared feature spaces carefully, which made it clear that classic sparse text representations remained surprisingly competitive once the objective was framed around actionable negative-review detection.</p>
      <p>I like this project because it treats NLP as a decision system: the model is good only if it catches enough dissatisfied users without overwhelming the business with false positives. That framing is much closer to how customer-support or product teams would actually consume the model.</p>
    `,
  },
  "conversion-rate-modeling-optimization": {
    summary:
      "A conversion-diagnostics project that combines segmentation, predictive modeling, and business interpretation to identify where product and marketing should focus next.",
    body: `
      <p>This project started from a straightforward growth question: why do some users convert while others stall, and which segments create the largest practical upside if the experience improves? I treated it as a mix of predictive modeling and decision support rather than a one-off classification exercise.</p>
      <h2>Problem Formulation</h2>
      <p>The dataset contains 316,200 user sessions with country, age, new-versus-returning status, traffic source, pages visited, and a binary conversion outcome. Only about 3.2% of sessions convert, so from the beginning this was an imbalanced classification problem tied to a very practical business decision: whom should the team target, and which user groups are not moving through the funnel efficiently?</p>
      <h2>Methodology</h2>
      <p>The notebook moves from exploratory analysis into a full classification stack: balanced logistic regression, SMOTE comparisons, ElasticNet regularization, random forest, XGBoost, SVM, LightGBM, soft voting, and stacking. I also tuned decision thresholds on the precision-recall curve instead of defaulting to 0.5, because in a low-conversion setting the cutoff is part of the business policy, not a fixed law of nature.</p>
      <p>The project optimizes directly for minority-class F1, which is the right choice here: we want to identify likely converters without letting precision collapse. The final soft-voting model combined ElasticNet logistic regression and SVM with optimized weights and threshold, reaching an AUC of 0.9848 and a converted-class F1 around 0.769.</p>
      <h2>Insights / Takeaways</h2>
      <p>The part I value most comes after the model. The notebook segments users into high-, medium-, and low-probability groups and then turns those scores into strategy: promotional nudges and checkout simplification for high-intent users, activation campaigns for medium-intent users, and onboarding or localization fixes for low-conversion segments. That is the version of predictive modeling I care about most: not scoring for its own sake, but turning scores into experiments and product changes.</p>
      <p>This project also reinforced that thresholding is a business choice. The best operating point is not the one that looks mathematically elegant; it is the one that matches how many users the business can actually target, how costly false positives are, and which segment-specific interventions are feasible.</p>
    `,
  },
  "trm-mechanistic-interpretability": {
    summary:
      "An interpretability workflow for a Tiny Recursive Model on ARC-AGI-1 that links sparse internal features to puzzle-solving behavior through causal ablations.",
    body: `
      <p>This project studies how a Tiny Recursive Model solves ARC-style reasoning puzzles by opening up its internal state rather than judging it only by accuracy. The goal was to build a feature-level interpretability workflow: log stepwise latent trajectories, compress them into sparse features with an SAE, and then intervene on those features to see whether puzzle behavior changes.</p>
      <h2>Methodology</h2>
      <p>The setup uses a Tiny Recursive Model with adaptive computation time on ARC-AGI-1. Instead of looking only at final logits, I logged lower-level latent trajectories across the model's iterative reasoning steps, then trained a sparse autoencoder on those hidden states. That converts dense activations into a feature dictionary that can be ranked, inspected, and intervened on.</p>
      <div class="math-block">\\[ z_n = \\mathrm{TopK}_{64}(\\mathrm{ReLU}(W_{enc}(z_L - b_{pre}) + b_{enc})). \\]</div>
      <p>This encoding equation says that the final TRM latent state \\(z_L\\) is first centered by the learned bias \\(b_{pre}\\), then mapped by encoder weights \\(W_{enc}\\), shifted by encoder bias \\(b_{enc}\\), passed through a ReLU nonlinearity, and sparsified into the feature vector \\(z_n\\) by keeping only the top 64 activations. The point of that sparsity is interpretability: if only a small subset of features is active, it becomes easier to ask which features matter for a given reasoning trace and what happens when they are removed.</p>
      <p>After training the SAE, I ranked features by activation statistics and ran both subtractive and reconstruction-based ablations, including progressive ablations across recurrent steps. That turns interpretability into a causal question: if a feature truly matters, intervening on it should change puzzle-solving behavior, not just produce a pretty visualization.</p>
      <p>The project matters to me because it pushes interpretability from descriptive analysis toward mechanism. Instead of asking only which examples are solved, I am asking what internal structure seems to support those solutions and how stable that structure remains under intervention. That is a much more useful framing if interpretability is supposed to inform model design rather than just produce interesting plots.</p>
    `,
  },
  "llm-powered-churn-analysis-system": {
    summary:
      "An end-to-end churn-analysis system that turns natural-language business questions into citation-backed retention analysis through hybrid retrieval, QLoRA fine-tuning, and deterministic safeguards.",
    body: `
      <p>This project grew out of an industry workflow and asks a business-centered question: can we replace a bare churn score with a system that explains why a segment is churning, cites the evidence, and recommends concrete next actions? To make the project reproducible, I rebuilt the pipeline on a public telecom dataset instead of private company data, but the design logic stayed the same.</p>
      <h2>Data & Setup</h2>
      <p>The system turns each customer record into a unified text document that combines demographics, services, contract information, billing, churn status, and free-text feedback. At query time, it runs a hybrid retrieval stack: dense vector search for semantic similarity, BM25 for exact keyword matches, and Reciprocal Rank Fusion to combine the two ranking lists. The retrieved records are then fed into a 4-bit Qwen2.5-7B model with a prompt template that requests structured JSON.</p>
      <div class="math-block">\\[ \\mathrm{RRF}(d) = \\sum_{r \\in \\{\\mathrm{vector},\\mathrm{BM25}\\}} \\frac{w_r}{k + \\mathrm{rank}_r(d)}. \\]</div>
      <p>RRF matters here because semantic retrieval and keyword retrieval fail in different ways. In the formula, \\(d\\) is a candidate retrieved document, \\(r\\) indexes the retrieval system, \\(w_r\\) is the weight assigned to retriever \\(r\\), \\(\\mathrm{rank}_r(d)\\) is the rank assigned to document \\(d\\) by that retriever, and \\(k\\) is the smoothing constant that prevents top-ranked items from dominating too aggressively. Dense retrieval catches paraphrases like “internet quality issues,” while BM25 is strong on exact fields such as contract type or service names. Fusing them produced much stronger context than either method alone.</p>
      <p>I then used a 14B teacher to generate 305 domain-specific training samples and fine-tuned the 7B student with QLoRA. The model got better at structure and domain style, but an interesting regression appeared: citation accuracy dropped after fine-tuning, even though JSON formatting stayed perfect.</p>
      <div class="math-block">\\[ \\mathcal{L}(\\theta; x, y) = -\\frac{1}{T} \\sum_{t=1}^{T} \\log P_\\theta(y_t \\mid y_{&lt;t}, x). \\]</div>
      <p>In the training objective, \\(\\theta\\) denotes the LoRA-adapted model parameters, \\(x\\) is the retrieved customer context and prompt, \\(y\\) is the target structured answer, \\(T\\) is the output length, and \\(P_\\theta(y_t \\mid y_{&lt;t}, x)\\) is the probability of token \\(y_t\\) conditioned on the prompt and previously generated tokens.</p>
      <div class="math-block">\\[ R_{\\mathrm{total}} = 0.35R_{\\mathrm{churn}} + 0.25R_{\\mathrm{tenure}} + 0.20R_{\\mathrm{charge}} + 0.20R_{\\mathrm{contract}}. \\]</div>
      <p>In the final risk score, \\(R_{\\mathrm{churn}}\\), \\(R_{\\mathrm{tenure}}\\), \\(R_{\\mathrm{charge}}\\), and \\(R_{\\mathrm{contract}}\\) are normalized component scores for churn history, customer tenure, monthly charges, and contract structure, and the weights sum to one by design. That equation is the deterministic risk score I added in the improved pipeline. Instead of letting the LLM assign risk subjectively, the system computes it from churn rate, tenure, monthly charges, and contract type, then maps the score back into the structured report. I also added citation validation that checks generated IDs against the retrieved record set and repairs hallucinated references.</p>
      <h2>Results</h2>
      <p>The important lesson was that fine-tuning alone was not the finish line. The best-performing system was the one that combined retrieval, fine-tuning, and post-processing safeguards. In the final comparison, the improved pipeline reached 100% JSON compliance, 100% citation accuracy, and the highest overall evaluation score. For me, that is exactly what production-minded LLM work looks like: not betting everything on one model pass, but building a system where the weak points are explicitly constrained.</p>
    `,
  },
  "tool-using-language-models": {
    summary:
      "An alignment study comparing SFT, DPO, PPO, and GRPO for small language models that need to call external tools correctly and consistently.",
    body: `
      <p>This project is still in progress, but the core idea is already clear. I want to understand which training paradigm best teaches a small language model not just to answer, but to use tools correctly: pick the right tool, format its arguments properly, and integrate the result into a final response.</p>
      <h2>Problem Formulation</h2>
      <p>The proposal compares four training regimes on the same tool-use task family: SFT, DPO, PPO, and GRPO. The setup fixes the base model, tools, and evaluation protocol so the comparison isolates the training algorithm itself. That is important because most public benchmarks compare final systems without controlling for how the tool-use behavior was actually learned.</p>
      <p>I am especially interested in the small-model regime because it is much closer to realistic cost constraints. A lot of alignment work is done on 7B+ models, but in deployment settings it matters whether a much smaller model can become competent at selecting tools, formatting arguments, and incorporating tool outputs into a final answer.</p>
      <div class="math-block">\\[ r = \\alpha r_{\\mathrm{select}} + \\beta r_{\\mathrm{format}} + \\gamma r_{\\mathrm{answer}}. \\]</div>
      <p>This reward decomposition is central to the project. Here \\(r\\) is the total reward, while \\(r_{\\mathrm{select}}\\), \\(r_{\\mathrm{format}}\\), and \\(r_{\\mathrm{answer}}\\) score tool selection, argument formatting, and final answer quality. The weights \\(\\alpha\\), \\(\\beta\\), and \\(\\gamma\\) determine how much the training signal emphasizes each failure mode. Tool-use is not one atomic action. The model can fail by choosing the wrong tool, formatting arguments badly, or generating the wrong answer after a correct tool call. Breaking the reward into those components makes it possible to study whether PPO and GRPO behave differently when the task reward is compositional and sparse.</p>
      <p>A second reason this project matters is evaluation design. A model that can often choose the right tool but formats arguments unreliably is not yet useful, and a model that formats arguments correctly but ignores tool outputs is also not useful. Separating those failure modes should make the final comparison much more decision-relevant than reporting a single blended score.</p>
      <p>What makes this project valuable to me is that it sits exactly at the boundary between modeling and systems. Tool-use alignment is not only about preference optimization; it is also about designing a task structure and reward signal that reflect what a usable agent actually needs to do.</p>
    `,
  },
  "trustworthy-rl-llm-reasoning": {
    summary:
      "A project on training a small model for ARC-style reasoning with a mix of supervised data generation, exact-match evaluation, and denser reward design.",
    body: `
      <p>This project is an in-progress exploration of trustworthy reasoning on ARC-AGI-1. The setup asks whether a small model can learn to solve abstract grid-transformation tasks more reliably when the training signal is shaped carefully instead of relying only on sparse exact-match success. I am working on it with Sunggun Lee.</p>
      <h2>Methodology</h2>
      <p>The pipeline uses GPT-mini to generate supervised examples for a GPT-nano student, then defines two complementary rewards: exact task success for evaluation and cell-level accuracy for denser training feedback. ARC is structurally hard, so a purely binary reward would make optimization unnecessarily brittle. The denser reward gives the model information even when an output grid is only partially correct.</p>
      <div class="math-block">\\[ r_{\\mathrm{train}}(\\hat{y}, y^*) = \\frac{1}{H\\cdot W} \\sum_{i=1}^{H} \\sum_{j=1}^{W} \\mathbf{1}[\\hat{y}_{ij} = y^*_{ij}]. \\]</div>
      <p>This formula measures cell-level agreement between the predicted grid and the target grid. Here \\(\\hat{y}\\) is the predicted output grid, \\(y^*\\) is the ground-truth grid, \\(H\\) and \\(W\\) are the grid height and width, and \\(\\mathbf{1}[\\hat{y}_{ij}=y^*_{ij}]\\) is an indicator that equals one when cell \\((i,j)\\) is correct. It is a useful training signal because it tells the model how close it is even when the exact output is wrong. The proposal also adds a refusal mechanism for corrupted or contradictory ARC tasks, where the right behavior is not to guess but to output a dedicated <code>REFUSE</code> token.</p>
      <p>I also care about the refusal setting because it exposes a different notion of model quality. A trustworthy system is not just one that solves more tasks; it is one that recognizes when the input is unreliable and refuses in a principled way. That changes the optimization target from pure performance toward calibrated behavior.</p>
      <p>I like this project because it is less about chasing a leaderboard and more about understanding how reward design shapes model behavior, including when the model should decline to answer. That makes it a natural bridge between reinforcement learning, reasoning, and trustworthy AI.</p>
    `,
  },
  pennos: {
    summary:
      "A Unix-like operating-systems build that combines process scheduling, shell interaction, and a FAT-style file system inside a single-process guest OS.",
    body: `
      <p>PennOS is a systems project where the point was to build the pieces together, not study them in isolation. The system runs as a guest OS inside a host process and combines a priority scheduler, process lifecycle management, shell commands, and a FAT-style file system. I worked on it with Jichu Mao, Zihao Zhu, and Shibo Jin.</p>
      <h2>Methodology</h2>
      <p>The operating-system side includes an <code>spthread</code>-based process model, preemptive weighted scheduling, process states such as blocked, stopped, and zombie, signal handling, and shell-facing job control. The file-system side implements a FAT-like storage model with block chains, root-directory entries, permissions, open-file state, and a layered interface from shell commands down to low-level storage operations.</p>
      <p>Even though the Doxygen report is API-heavy, the engineering core is clear: the scheduler, process table, ready queues, blocked queues, and filesystem metadata all have to agree on system state. That means the hard part is not any one function. It is preserving consistent invariants while shell commands, syscalls, and storage operations all touch shared state.</p>
      <p>What the project taught me in practice was how interface design substitutes for mathematical elegance in systems work. The scheduler only works if process states transition cleanly, and the filesystem only works if metadata and storage layout stay synchronized under command-level operations. That kind of rigor is less visible than a model metric, but it is just as important.</p>
      <h2>Insights / Takeaways</h2>
      <p>I include PennOS because it shows a different kind of rigor from the analytics projects. Here the challenge is designing clean interfaces and state transitions under low-level constraints. That strengthened my intuition for reliability, abstraction boundaries, and the engineering discipline behind the data infrastructure I want to work on later.</p>
    `,
  },
  penncloud: {
    summary:
      "A distributed cloud-platform build centered on stateless frontends, replicated key-value storage, and the integration path from minimal service demos to a more fault-tolerant architecture.",
    body: `
      <p>PennCloud is an ongoing distributed-systems project that aims to build a small cloud platform with webmail, file storage, user accounts, and an admin console on top of a replicated key-value backend. I am responsible primarily for frontend infrastructure, including the HTTP server, load-balancing path, user-account flows, and cross-layer integration, while the rest of the team focuses on storage, coordination, and application services.</p>
      <h2>Methodology</h2>
      <p>The architecture follows a stateless-frontend pattern: frontends speak HTTP to browsers but do not own persistent state, while backend storage nodes expose a key-value abstraction with PUT, GET, CPUT, and DELETE operations. The full design then layers replication, fault detection, checkpointing, and recovery on top of that storage interface.</p>
      <p>My own work is concentrated on the frontend side: the HTTP server, load-balancing path, cookie-backed user-account flows, and the integration work that connects those interfaces to the backend state model. That work is less glamorous than a single algorithm, but it is exactly where distributed systems become real. If the interfaces are loose or the assumptions are inconsistent, the whole platform breaks during integration.</p>
      <p>What makes the project valuable even in its current state is that it forces architectural discipline early. The frontend cannot assume storage semantics that the backend does not guarantee, and the backend cannot evolve independently if the user-facing flows implicitly depend on unstable behavior. Working through those boundaries has been one of the most useful parts of the build.</p>
      <h2>Insights / Takeaways</h2>
      <p>The current build already includes a multithreaded web server and the first layers of account, webmail, and drive functionality. What makes the project valuable at this stage is the transition it forces: moving from a minimal demo toward a platform that can stay available when a node fails. That means reasoning concretely about replication, failover, recovery, and the boundary between frontend convenience and backend correctness. Even before final completion, it is a good representation of how I like to approach infrastructure problems.</p>
    `,
  },
};

const introSectionHeadings = {
  "nutrition-label-diet-choices": "Background / Motivation",
  "email-funding-conversion-experiment": "Background / Motivation",
  "bgm-focused-task-performance": "Background / Motivation",
  "natural-gas-consumption-forecasting": "Background / Motivation",
  "bayesian-statistical-modeling": "Background / Motivation",
  "amazon-food-review-sentiment-analysis": "Background / Motivation",
  "conversion-rate-modeling-optimization": "Background / Motivation",
  "trm-mechanistic-interpretability": "Background / Motivation",
  "tool-using-language-models": "Background / Motivation",
  "trustworthy-rl-llm-reasoning": "Background / Motivation",
  pennos: "Background / Motivation",
  penncloud: "Background / Motivation",
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
    const sectionNarrative = buildNarrativeFromSections(project);
    const narrativeBody = narrative.body || "";
    const introHeading = introSectionHeadings[project.slug];
    const bodyWithIntroHeading =
      !sectionNarrative && introHeading && narrativeBody
        ? narrativeBody.replace(/^\s*/, (match) => `${match}<h2>${introHeading}</h2>`)
        : narrativeBody;

    detailArticle.innerHTML =
      sectionNarrative ||
      bodyWithIntroHeading ||
      "<p>This project detail page is being expanded into a full narrative after a complete read of the underlying materials.</p>";
  }

  typesetMath();
  window.addEventListener("load", typesetMath, { once: true });
}
