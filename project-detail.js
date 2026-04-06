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
  { title: "Background / Motivation", keys: ["problemDefinition", "whyItMatters"] },
  { title: "Problem Formulation", keys: ["problemDefinition"] },
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
      const content = keys.map((key) => detailSections[key] || "").filter(Boolean).join("");
      return content ? `<h2>${title}</h2>${content}` : "";
    })
    .filter(Boolean)
    .join("");
};

const detailNarratives = {
  "minimum-wage-unemployment": {
    summary:
      "A county-level labor economics study that treats California's 2021 minimum wage increase as a policy shock and estimates how much unemployment moved once persistence and common macro shocks are handled carefully.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>I worked on this project under the guidance of <a href="https://sites.google.com/a/illinois.edu/eunyichung/" target="_blank" rel="noreferrer">Prof. EunYi Chung</a>. The policy question is straightforward but politically loaded: when California raised its minimum wage in January 2021, did local unemployment increase in a measurable way during the post-COVID recovery? I liked the project because it forced me to treat a heavily debated topic as an identification problem rather than a rhetorical one.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the project as a causal panel-data problem. The outcome is county-level unemployment observed monthly, California counties are treated, New York counties form the comparison group, and the estimand is the post-policy treatment effect for California relative to that control. The challenge is separating the wage-floor effect from persistent county differences, statewide labor-market structure, and common macro shocks.</p>
      <h2>Data & Setup</h2>
      <p>The data comes from the Bureau of Labor Statistics and covers monthly county-level unemployment in California and New York from January 2018 through January 2025. The final panel contains 10,200 county-month observations. I used a county-by-month design because it lets the model absorb permanent county heterogeneity and common month-level shocks. The report also shows strong serial dependence in unemployment, which is why a lagged outcome term becomes important in the final specification.</p>
      <h2>Methodology</h2>
      <p>The analysis moves from a simple DID intuition to a two-way fixed-effects model and then to a dynamic fixed-effects specification that adds persistence. The preferred regression is</p>
      <div class="math-block">\[ \log(Y_{it})=\beta_0+\beta_1 D_i^{\mathrm{treat}}+\beta_2 D_t^{\mathrm{post}}+\beta_3\left(D_i^{\mathrm{treat}}D_t^{\mathrm{post}}\right)+\rho \log(Y_{i,t-1})+\gamma_i+\delta_t+u_{it}. \]</div>
      <p>Here \(Y_{it}\) is unemployment in county \(i\) at month \(t\), \(D_i^{\mathrm{treat}}\) indicates California counties, \(D_t^{\mathrm{post}}\) indicates the post-policy period, and \(\beta_3\) is the treatment effect of interest. The lag term \(\rho \log(Y_{i,t-1})\) captures persistence, \(\gamma_i\) are county fixed effects, \(\delta_t\) are time fixed effects, and \(u_{it}\) is the residual. I also checked pre-trends and heterogeneity by baseline unemployment to probe whether the identifying assumptions were remotely credible.</p>
      <h2>Results</h2>
      <p>The naive DID and plain TWFE specifications both imply a much larger post-policy increase, but once lagged unemployment is added, the estimated effect falls to roughly 2.3% and remains statistically significant. That comparison is the most important result in the paper. The point is not that one can force any answer from the data; it is that a more disciplined treatment of persistence yields a smaller and more credible estimate.</p>
      <h2>Insights / Takeaways</h2>
      <p>The strongest lesson was about specification discipline. In labor-market panels, persistence can easily masquerade as treatment if the model is too thin. This project reinforced that a coefficient only becomes decision-relevant after the obvious counterarguments, serial dependence included, have been addressed directly.</p>
      <h2>Limitations & Future Work</h2>
      <p>The design still depends on the comparability of California and New York and works with aggregate county data rather than sector or worker-level outcomes. The post-COVID recovery period is also unusually noisy. The next step would be an event-study extension with richer labor-market controls and sector-level outcomes to see where the treatment signal is actually coming from.</p>
    `,
  },
  "nutrition-label-diet-choices": {
    summary:
      "A randomized behavioral-choice study on whether nutrition-label education changes willingness to pay for healthier foods, written as an intervention analysis instead of a descriptive survey.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>I completed this project under the guidance of <a href="https://www.shuyangsi.com/" target="_blank" rel="noreferrer">Prof. Shuyang Si</a>. The project starts from a simple public-health question: nutrition labels are common, but do they actually change consumer decisions? I wanted to study the issue as an intervention problem because awareness alone is not useful unless it shifts behavior at the point of choice.</p>
      <h2>Problem Formulation</h2>
      <p>I treated the study as a randomized intervention on consumer valuation. The core estimand is the effect of nutrition-label education on willingness to pay for healthier products relative to conventional alternatives. Inputs include treatment assignment and product-pair survey responses, and the output is a concrete behavioral measure rather than an attitude-only response.</p>
      <h2>Data & Setup</h2>
      <p>The study uses an RCT with \(n=115\) participants. Respondents were randomly assigned to a treatment or control group. The treatment group received nutrition-label education, while the control group received placebo-style information. Participants then evaluated several product pairs in which one option was nutritionally stronger than the other. The poster also reports baseline-comparison checks and does not find significant pre-treatment imbalance between groups.</p>
      <h2>Methodology</h2>
      <p>The main behavioral outcome is modeled with a treatment-effect regression:</p>
      <div class="math-block">\[ y_i = \beta_0 + \beta_1\,\mathrm{Treat}_i + \beta_2\,\mathrm{Price}_i + \varepsilon_i. \]</div>
      <p>Here \(y_i\) is respondent \(i\)'s willingness to pay for the healthier product, \(\mathrm{Treat}_i\) indicates whether the respondent received nutrition-label education, \(\mathrm{Price}_i\) captures the price context of the product comparison, and \(\varepsilon_i\) is the residual. The coefficient \(\beta_1\) is the object of interest because it measures whether education shifts product valuation after accounting for price conditions.</p>
      <h2>Results</h2>
      <p>The poster reports the clearest positive treatment effects for Product Pairs 2, 5, and 6. In those cases, educated participants became more willing to pay for the healthier option. The project also makes those wins interpretable by tying them to nutritional differences such as lower sodium, lower fat, and higher vitamin content rather than treating all product pairs as interchangeable.</p>
      <h2>Insights / Takeaways</h2>
      <p>The project reinforced a habit I care about in both research and product work: information only matters if it changes a real decision. Nutrition-label education is not valuable because participants say it sounds useful; it is valuable only if it changes how they trade off healthier and less healthy options in a concrete purchasing scenario.</p>
      <h2>Limitations & Future Work</h2>
      <p>The biggest limitations are sample size and external validity. With 115 respondents, the study is informative but still relatively small, and stated willingness to pay is not identical to observed purchase behavior. The natural follow-up would be a larger sample, stronger treatment design, and longer-run observation of whether the effect persists outside the survey setting.</p>
    `,
  },
  "email-funding-conversion-experiment": {
    summary:
      "A multi-arm growth experiment on whether targeted emails can causally increase first-deposit funding among approved-but-unfunded fintech users.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project was built around a specific growth bottleneck for a retail investing platform: many users completed account approval but never made the first deposit. That last step mattered because funded accounts drive downstream engagement and monetization. The real business question was not whether emails looked helpful, but whether they produced incremental funding beyond what high-intent users would have done anyway.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the task as a multi-arm causal experiment on a binary conversion outcome. The primary metric was funding rate, and the main estimand for each treatment arm was incremental lift over its matched control group. The objective was to determine which treatment combinations created true movement at the bottom of the funnel rather than just better top-of-funnel engagement.</p>
      <h2>Data & Setup</h2>
      <p>The experiment covered roughly 480,000 approved-but-unfunded users over five weeks. Users were partitioned into 12 behavioral segments built from account age, bank-link status, recent activity, and recent trading behavior. Those segments were crossed with two cadences, daily and twice-weekly, producing 24 treatment arms. Ten ML-generated templates were randomized across treated users. The analysis used user-level event data, email logs, treatment-order files, and segment-level control-rate tables.</p>
      <h2>Methodology</h2>
      <p>I treated the funnel as layered rather than collapsing everything into one outcome. Open rate measured resonance, link rate captured deeper engagement, and funding rate remained the final business objective. At the treatment-arm level, lift was defined as</p>
      <div class="math-block">\[ \Delta_g = \hat p_{\mathrm{treat},g} - p_{\mathrm{control},g}. \]</div>
      <p>For statistical testing, each arm was compared against its control with a one-sided proportions z-test:</p>
      <div class="math-block">\[ z_g = \frac{\hat p_{\mathrm{treat},g}-p_{\mathrm{control},g}}{\sqrt{p_{\mathrm{control},g}(1-p_{\mathrm{control},g})/n_g}}. \]</div>
      <p>Here \(\hat p_{\mathrm{treat},g}\) is the observed funding rate in treatment arm \(g\), \(p_{\mathrm{control},g}\) is the matched control funding rate, and \(n_g\) is the treatment-group sample size. I also tracked unsubscribe and spam-report rates as guardrails because a campaign that improves funding while hurting deliverability is not operationally viable.</p>
      <h2>Results</h2>
      <p>The best top-of-funnel performer was the <code>ml_funding_faq</code> template, which reached an open rate around 31.5%. More importantly, 7 of the 24 treatment arms showed statistically significant funding lift, and 6 of those 7 wins came from the daily-cadence condition. The project estimated that the significant arms together produced 500+ incremental funded users.</p>
      <h2>Insights / Takeaways</h2>
      <p>The useful lesson was that conversion experiments have to separate attention from actual business impact. A template can win opens without moving funded accounts, and a segment can have high baseline funding without being incrementally affected by email. FAQ-style content turned out to be especially effective, which suggests that friction and uncertainty were more important barriers than lack of interest.</p>
      <h2>Limitations & Future Work</h2>
      <p>The cadence comparison was weakened by incomplete maturation of some weekly arms near the end of the experiment window. The design also entangles segment, cadence, and content order. A better next step would isolate cadence and content testing more cleanly and then layer in send-time optimization or adaptive sequencing.</p>
    `,
  },
  "bgm-focused-task-performance": {
    summary:
      "A controlled mixed-effects study on how music type and playback volume affect completion time on verbal and mathematical focus tasks.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>I worked on this study under the guidance of <a href="https://alexandrachron.wixsite.com/mysite" target="_blank" rel="noreferrer">Prof. Alexandra Chronopoulou</a>. The motivating question was practical: does background music help focused work, or does it interfere once task type and difficulty are taken seriously? I liked the project because it turned a familiar everyday claim into a structured experimental-design problem.</p>
      <h2>Problem Formulation</h2>
      <p>The output variable is task completion time, so the problem is a performance-analysis task rather than a perception survey. The objective is to determine which experimental factors materially affect completion time and which combination of music type and volume minimizes it.</p>
      <h2>Data & Setup</h2>
      <p>The study uses a nested and blocked design with 288 total trial sessions. Music type has two levels, instrumental and lyrics. Volume is nested within music type with three levels: 0%, 50%, and 100%. Task type has verbal and math arms, difficulty has easy and hard variants, and time interval is treated as a random block. Each trial contains ten pre-generated tasks, and completion time is recorded in seconds.</p>
      <h2>Methodology</h2>
      <p>The report uses a linear mixed-effects model to respect both the nested treatment structure and the blocked design. The initial specification is</p>
      <div class="math-block">\[ Y_{ijklmno} = \mu + \alpha_i + \beta_{j(i)} + \gamma_k + \delta_l + \phi_n + \tau_m + (\alpha\gamma)_{ik} + (\alpha\delta)_{il} + (\gamma\delta)_{kl} + (\alpha\gamma\delta)_{ikl} + \varepsilon_{ijklmno}. \]</div>
      <p>Here \(Y_{ijklmno}\) is completion time, \(\mu\) is the grand mean, \(\alpha_i\) is music type, \(\beta_{j(i)}\) is volume nested within music type, \(\gamma_k\) is task type, \(\delta_l\) is difficulty, \(\phi_n\) is participant, \(\tau_m\) is the random time-block effect, and \(\varepsilon_{ijklmno}\) is the residual. After sequential testing, the final model retains the significant main effects and the task-type-by-difficulty interaction.</p>
      <h2>Results</h2>
      <p>The three-way interaction among music type, task type, and difficulty is not significant, nor are the music-type-by-task-type and music-type-by-difficulty interactions. The task-type-by-difficulty interaction is strongly significant, and the main effects remain highly significant. Tukey comparisons show that instrumental music at 50% volume yields the shortest completion times and significantly outperforms the other music settings.</p>
      <h2>Insights / Takeaways</h2>
      <p>The useful conclusion is not that music always helps. The result is narrower and more actionable: moderate-volume instrumental music appears beneficial, while lyrical music and other volume settings perform worse. The project also shows that language-heavy tasks are more vulnerable to difficulty-related slowdown than math tasks.</p>
      <h2>Limitations & Future Work</h2>
      <p>The study has a very small participant pool, manual timing introduces noise, and the project records speed but not accuracy. A stronger follow-up would expand the participant base, automate the audio-delivery and timing setup, and measure both completion time and error rate so any speed-accuracy tradeoff becomes visible.</p>
    `,
  },
  "natural-gas-consumption-forecasting": {
    summary:
      "A hybrid forecasting project that combines regression and seasonal ARIMA residual modeling to predict U.S. natural gas consumption more credibly out of sample.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>U.S. natural gas demand has strong seasonality, but seasonality alone does not explain the series. Consumption is also shaped by imports, coal substitution, electricity-generation needs, and long-run structural drift. The project started from a practical forecasting issue: a pure SARIMA model on the raw series left residual structure unresolved, so I moved toward a hybrid design that separates structural mean modeling from residual time dependence.</p>
      <h2>Problem Formulation</h2>
      <p>I treated the task as a univariate forecasting problem with exogenous covariates. The target is monthly U.S. natural gas total consumption, and the inputs are time together with natural gas imports, coal consumption, and electricity net generation. The success criterion is holdout forecast quality rather than only in-sample fit.</p>
      <h2>Data & Setup</h2>
      <p>The dataset covers monthly observations from January 2005 through December 2023. The response variable is U.S. natural gas total consumption in billion cubic feet. The exogenous predictors are monthly natural gas imports, monthly coal consumption, and monthly electricity net generation, all from the U.S. Energy Information Administration. I used an 80/20 train-test split and then modeled the residual series after fitting the mean structure.</p>
      <h2>Methodology</h2>
      <p>The first layer models the conditional mean with exogenous drivers:</p>
      <div class="math-block">\[ \mathrm{NaturalGasConsumption}_t = \beta_0 + \beta_1 \mathrm{Time}_t + \beta_2 \mathrm{Imports}_t + \beta_3 \mathrm{Coal}_t + \beta_4 \mathrm{Electricity}_t + \varepsilon_t. \]</div>
      <p>I also compared a quadratic-trend version. The second layer models the remaining residual dependence with seasonal ARIMA. For the linear-trend residuals, the preferred model is ARIMA\((0,1,1)\times(0,1,1)_{12}\). For the quadratic-trend residuals, the preferred model is ARIMA\((2,1,0)\times(0,1,1)_{12}\). Model selection used residual diagnostics, information criteria, and test-set MSE.</p>
      <h2>Results</h2>
      <p>The best-performing pipeline was the linear-trend regression plus ARIMA\((0,1,1)\times(0,1,1)_{12}\) on the residuals. It achieved a test MSE of about 415001.48, beating the best quadratic alternative at about 496704.48. The report's next five monthly forecasts were 2229.836, 2313.898, 2113.298, 2762.903, and 2407.874 Bcf.</p>
      <h2>Insights / Takeaways</h2>
      <p>The main lesson is that neither regression alone nor seasonal ARIMA alone was sufficient. Regression handled the structural drivers; SARIMA handled the leftover temporal dependence. The hybrid worked because each layer was assigned a narrower and more realistic job.</p>
      <h2>Limitations & Future Work</h2>
      <p>The model still uses a small covariate set and keeps the mean structure linear. Weather, prices, policy shocks, and richer demand-side indicators could plausibly improve the forecasts. A natural next step would be dynamic regression or a state-space formulation that preserves interpretability while absorbing more evolving structure.</p>
    `,
  },
  "bayesian-statistical-modeling": {
    summary:
      "A Bayesian computation project centered on Metropolis-Hastings proposal design, mixing behavior, and convergence diagnostics when direct posterior sampling is unavailable.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project focuses on a basic Bayesian computation problem: in many useful models, the posterior is only known up to proportionality, so exact sampling is not available. That turns inference into an algorithm-design problem. I used Metropolis-Hastings to study that setting directly and then asked a practical question that always matters in MCMC: how much do convergence and mixing depend on the proposal distribution we choose?</p>
      <h2>Problem Formulation</h2>
      <p>The task here is posterior sampling rather than prediction. The objective is to construct a Markov chain whose stationary distribution matches a target posterior \(\pi(\theta \mid y)\), even when that posterior can only be evaluated up to a normalizing constant.</p>
      <h2>Data & Setup</h2>
      <p>The project uses simulated examples rather than an applied observational dataset. The report illustrates the sampler on a target density proportional to a standard exponential distribution and compares behavior under different proposal mechanisms. Multiple chains are started from very different initial values, including large initial states such as 50 and 100, to make convergence behavior visible.</p>
      <h2>Methodology</h2>
      <p>The posterior target is written in the standard form</p>
      <div class="math-block">\[ \pi(\theta \mid y) \propto p(y \mid \theta)\,\pi(\theta). \]</div>
      <p>Metropolis-Hastings proposes a candidate state \(x'\) from a proposal distribution \(q(x'\mid x)\) and accepts it with probability</p>
      <div class="math-block">\[ \alpha(x,x') = \min\left\{1,\frac{\pi(x'\mid y)\,q(x\mid x')}{\pi(x\mid y)\,q(x'\mid x)}\right\}. \]</div>
      <p>When the proposal is symmetric, the Hastings correction cancels and the rule simplifies to \(\alpha(x,x') = \min\{1,\pi(x'\mid y)/\pi(x\mid y)\}\). The project compares a symmetric Normal proposal \(q(x'\mid x)=\mathcal{N}(x,1)\) against an asymmetric Gamma-style proposal and evaluates both through trace plots, autocorrelation, and Gelman-Rubin diagnostics.</p>
      <h2>Results</h2>
      <p>The symmetric Normal proposal converged and mixed well in the illustrated setting, though chains started from more extreme initial values mixed more slowly early on. The asymmetric proposal also converged and showed comparably fast mixing. The report's useful conclusion is not that one proposal is universally best, but that proposal design materially affects practical sampler behavior even when asymptotic correctness is guaranteed.</p>
      <h2>Insights / Takeaways</h2>
      <p>The project reinforced that MCMC quality depends heavily on proposal choice. Metropolis-Hastings is general in principle, but in practice its usefulness depends on whether the proposal matches the geometry of the target distribution well enough to mix efficiently.</p>
      <h2>Limitations & Future Work</h2>
      <p>The examples are intentionally narrow and simulation-driven. A natural next step would be a more systematic proposal-tuning study and then an application to a substantive Bayesian model where poor mixing would have clearer inferential consequences.</p>
    `,
  },
  "champaign-rental-price-forecasting": {
    summary:
      "A URES forecasting project that compares statistical baselines and Prophet-style structure for predicting Champaign rents under realistic rolling evaluation.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>I worked on this project as a URES Fellow under <a href="https://experts.illinois.edu/en/persons/hyoeun-lee/" target="_blank" rel="noreferrer">Prof. Hyoeun Lee</a>. The practical objective was to forecast rental prices in Champaign accurately enough to be useful for student budgeting and local housing interpretation. The city is a good forecasting case because rents are shaped by academic seasonality, persistent upward drift, and disruptions from the COVID period.</p>
      <h2>Problem Formulation</h2>
      <p>I treated the task as a time-series forecasting problem with exogenous covariates. The output is the monthly Zillow Observed Rent Index for Champaign, and the inputs include macroeconomic variables, demographics, UIUC student-population signals, poverty, vacancy, housing supply, and local market-liquidity measures.</p>
      <h2>Data & Setup</h2>
      <p>The response variable is Zillow's Observed Rent Index for Champaign. I assembled the feature table by merging yearly, semesterly, daily, and monthly sources into a common monthly series. The final modeling window ran from July 2016 through July 2024. Missing values were handled with <code>IterativeImputer</code>, and exploratory diagnostics included decomposition plots plus ACF/PACF analysis.</p>
      <h2>Methodology</h2>
      <p>I compared linear regression baselines, first-differenced KNN and decision trees, tree ensembles, Huber regression, Prophet, and lightweight deep-learning variants. Prophet was especially relevant because the series showed strong trend-plus-seasonality structure:</p>
      <div class="math-block">\[ y(t)=g(t)+s(t)+h(t)+\varepsilon_t. \]</div>
      <p>Here \(g(t)\) is long-run trend, \(s(t)\) captures seasonality, \(h(t)\) captures event-style adjustments, and \(\varepsilon_t\) is noise. I evaluated the models under both a held-out split and a rolling forecast setup because housing forecasts are only useful if they remain stable over time.</p>
      <h2>Results</h2>
      <p>Prophet delivered the best performance in both holdout and rolling evaluation and was used to forecast the first quarter of 2025 in the low-1330 range. The more flexible tree-based models underperformed because they extrapolated the strong upward trend poorly.</p>
      <h2>Insights / Takeaways</h2>
      <p>The strongest lesson was that the best forecasting model was not the most complex one. In a market dominated by drift and recurring academic seasonality, explicit structure was more valuable than flexible split-based nonlinear models.</p>
      <h2>Limitations & Future Work</h2>
      <p>The project is limited by the granularity of local covariates and by the relatively short post-COVID evaluation window. Better supply-side data, richer event features, and longer rolling-horizon tests would make the comparison more convincing.</p>
    `,
  },
  "amazon-food-review-sentiment-analysis": {
    summary:
      "A large-scale NLP pipeline for Amazon food reviews that treats negative-review detection as the operational objective rather than optimizing overall accuracy.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project starts from a familiar customer-feedback problem: negative reviews are rarer than positive ones, but they are the ones most likely to matter operationally. If the model misses dissatisfied customers, the business loses the chance to intervene early. That makes overall accuracy a weak target on an imbalanced review corpus.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the task as binary text classification on raw review text. The original five-point rating was collapsed into a positive-versus-negative label using</p>
      <div class="math-block">\[ y_i=\begin{cases} 1 & \text{if } s_i > 3 \\ 0 & \text{if } s_i < 3 \\ \text{excluded} & \text{if } s_i = 3 \end{cases} \]</div>
      <p>where \(s_i\) is the original star rating and \(y_i\) is the derived sentiment label for review \(i\). Neutral reviews were excluded to reduce label ambiguity. Because the negative class is the operational priority, I emphasized negative-class precision, recall, F1, and AUC rather than headline accuracy.</p>
      <h2>Data & Setup</h2>
      <p>The dataset contains 568,454 Amazon Fine Food Reviews after removing neutral observations. The final class distribution is 443,777 positive reviews and 124,677 negative reviews. Preprocessing included lowercasing, punctuation removal, tokenization, Snowball stemming, and a custom stop-word strategy that intentionally preserved negation terms such as <code>not</code>, <code>won't</code>, and <code>can't</code>.</p>
      <h2>Methodology</h2>
      <p>The primary representation was TF-IDF on 1-2 grams with 10,000 features:</p>
      <div class="math-block">\[ \mathrm{TF\text{-}IDF}(t,d,D)=\mathrm{TF}(t,d)\times \mathrm{IDF}(t,D). \]</div>
      <p>I compared Logistic Regression, class weighting, SMOTE, ElasticNet regularization, threshold tuning, Random Forest, and a soft-voting ensemble. Class weighting used</p>
      <div class="math-block">\[ w_c = \frac{N}{K N_c}, \]</div>
      <p>where \(N\) is the total sample count, \(K\) is the number of classes, and \(N_c\) is the number of observations in class \(c\). The strongest single model was balanced ElasticNet Logistic Regression with a tuned decision rule</p>
      <div class="math-block">\[ \hat y=\begin{cases} 1 & \text{if } \hat p \ge \tau \\ 0 & \text{otherwise} \end{cases} \quad \text{with } \tau^*=0.37. \]</div>
      <h2>Results</h2>
      <p>The best single operating point came from balanced ElasticNet Logistic Regression with threshold tuning at \(\tau^*=0.37\). That model reached negative-class precision 0.750, negative recall 0.821, negative-class F1 0.784, and AUC 0.951. The soft-voting ensemble matched the top AUC and pushed negative recall higher, though with lower precision.</p>
      <h2>Insights / Takeaways</h2>
      <p>The project showed that preprocessing and threshold policy mattered as much as model family. Preserving negation words was critical, and threshold tuning turned out to be a real modeling decision rather than an afterthought. Sparse linear models remained very strong once the objective was defined correctly.</p>
      <h2>Limitations & Future Work</h2>
      <p>The pipeline still uses classical text representations rather than contextual encoders, and neutral reviews are excluded entirely. Future work could extend the project toward transformer-based embeddings, topic-conditioned sentiment, or richer customer-support workflows built on top of the classifier.</p>
    `,
  },
  "conversion-rate-modeling-optimization": {
    summary:
      "An imbalanced conversion-modeling workflow that combines calibrated prediction, threshold tuning, and segment-level action design for product and marketing decisions.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project started from a practical lower-funnel problem: a large e-commerce site was attracting traffic, but only a small fraction of sessions ended in conversion. The useful version of the problem was not just whether conversion could be predicted, but whether those predictions could be turned into segmented interventions for product and marketing teams.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the task as binary classification on session-level user data. For session \(i\), the input is</p>
      <div class="math-block">\[ x_i = (\text{country}_i,\ \text{age}_i,\ \text{new\_user}_i,\ \text{source}_i,\ \text{pages}_i), \]</div>
      <p>and the label is \(y_i \in \{0,1\}\), where \(y_i=1\) means the session converted. Because only about 3.2% of sessions convert, the real problem is minority-class detection under a business-relevant operating threshold rather than generic accuracy maximization.</p>
      <h2>Data & Setup</h2>
      <p>The source data contains 316,200 sessions and six columns: country, age, new-user status, traffic source, total pages visited, and conversion outcome. Categorical features were one-hot encoded and continuous variables were standardized. The train-test split used <code>test_size=0.3</code>, <code>stratify=y</code>, and <code>random_state=42</code> so that class proportions remained stable.</p>
      <h2>Methodology</h2>
      <p>The modeling stack compared balanced Logistic Regression, SMOTE variants, ElasticNet Logistic Regression, Random Forest, XGBoost, SVM, LightGBM, soft voting, and stacking. For the logistic branch, the main objective is</p>
      <div class="math-block">\[ \mathcal{L}(\beta)= -\frac{1}{n}\sum_{i=1}^{n}\left[y_i \log p_i + (1-y_i)\log(1-p_i)\right] + \lambda\left((1-\alpha)\frac{\|\beta\|_2^2}{2}+\alpha\|\beta\|_1\right), \]</div>
      <p>where \(p_i = \sigma(x_i^\top \beta)\), \(\lambda\) is regularization strength, and \(\alpha\) is the ElasticNet mixing parameter. I then tuned the classification threshold against the converted-class F1 score rather than fixing it at 0.5. The final selected model was a soft-voting ensemble over ElasticNet Logistic Regression and SVM with weights \((12,1)\) and threshold \(\tau=0.9323\).</p>
      <h2>Results</h2>
      <p>The final soft-voting model achieved AUC 0.9848, converted-class precision 0.8198, recall 0.7239, and F1 0.7688. The broader pattern was more informative than the single best line: a plain balanced logistic model already ranked very well by AUC, but its default operating point was unusable because precision collapsed. Better calibration and thresholding mattered at least as much as model complexity.</p>
      <h2>Insights / Takeaways</h2>
      <p>The strongest lesson was that behavior dominated channel. Returning-user status, browsing depth, age, and geography mattered more than traffic source alone. The project also reinforced that prediction becomes useful only when it is turned into action logic: high-propensity users support checkout simplification and offers, medium-propensity users support targeted nudges, and low-propensity users point to onboarding or localization problems.</p>
      <h2>Limitations & Future Work</h2>
      <p>The feature space is still narrow, and the threshold was tuned on held-out predictions rather than through a cleaner validation-only workflow. A stronger next step would optimize an ROI-aware objective instead of F1 alone and then connect the model-driven targeting policy to actual A/B tests.</p>
    `,
  },
  "trm-mechanistic-interpretability": {
    summary:
      "A sparse-feature interpretability workflow for a Tiny Recursive Model on ARC-AGI-1 that connects latent features to behavior through causal ablations.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project started from a specific mechanistic question: if a Tiny Recursive Model can solve ARC-AGI-1 puzzles with only a few million parameters, what internal computation is it actually using? Final accuracy alone does not answer that. ARC puzzles require compositional transformations on color grids, which makes them a good setting for studying reasoning trajectories instead of outputs only.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the task as a feature-level interpretability problem. The objective was to determine whether sparse features extracted from the TRM lower-level latent stream \(z_L\) are behaviorally meaningful. In practice that meant asking whether a sparse autoencoder could recover a useful basis over the hidden states, whether those features could be ranked sensibly, and whether ablating them changed puzzle-solving behavior.</p>
      <h2>Data & Setup</h2>
      <p>The experiments use ARC-AGI-1 with trajectories drawn from the <code>arc1concept-aug-1000</code> setup. The ablation study itself focuses on 20 representative validation puzzles. The base model is a Tiny Recursive Model with hidden size 512, eight attention heads, a 16-token puzzle prefix, six lower-level cycles, three higher-level cycles, and up to 16 reasoning steps. The SAE is trained only on the \(z_L\) stream.</p>
      <h2>Methodology</h2>
      <p>The sparse autoencoder maps 512-dimensional hidden states into a 4096-feature dictionary and keeps only the top 64 active features per token:</p>
      <div class="math-block">\[ z_n = \operatorname{TopK}_{64}\!\left(\operatorname{ReLU}\!\left(W_{\mathrm{enc}}(z_L - b_{\mathrm{pre}}) + b_{\mathrm{enc}}\right)\right). \]</div>
      <p>The decoder reconstructs the latent as</p>
      <div class="math-block">\[ \hat z_L = W_{\mathrm{dec}} z_n + b_{\mathrm{pre}}. \]</div>
      <p>The training loss combines reconstruction with an auxiliary dead-feature term:</p>
      <div class="math-block">\[ \mathcal{L}_{\mathrm{SAE}} = \operatorname{MSE}(\hat z_L, z_L) + \alpha\,\operatorname{MSE}(\hat e, e), \qquad \alpha = \frac{1}{32}. \]</div>
      <p>After training, I ranked features by average activation and firing frequency and then applied both subtractive and reconstruction-based ablations. In the reconstruction version, the latent is rebuilt from the remaining sparse code after masking a selected feature set.</p>
      <h2>Results</h2>
      <p>The strongest result was behavioral rather than purely descriptive. Progressive ablation usually did not cause immediate collapse. Instead, the model often preserved coarse puzzle structure while making localized errors such as offsets, wrong turns, or segment misalignment. Across the archived progressive reconstruction sweeps, the 20-puzzle evaluation produced 55 prediction-change events under average-activation ranking and 42 under activation-frequency ranking, which shows that the ranking heuristic materially affects the apparent sensitivity of the model.</p>
      <h2>Insights / Takeaways</h2>
      <p>The project showed that the TRM reasoning trace can be manipulated in a structured way without immediately collapsing into noise. That is useful evidence that the latent state is not just an uninterpretable dense blob. At the same time, unchanged-prediction cases and non-monotonic ablation behavior suggest redundancy, interference, or important information living outside the SAE view of \(z_L\), especially in the higher-level stream \(z_H\).</p>
      <h2>Limitations & Future Work</h2>
      <p>The delivered work is centered on SAE-based analysis rather than the full SAE-plus-ACDC plan from the proposal, and the current intervention pipeline only targets \(z_L\). The clearest next step is joint analysis of \(z_L\) and \(z_H\), ideally with a stronger puzzle-level sparse representation and a completed circuit-discovery stage.</p>
    `,
  },
  "llm-powered-churn-analysis-system": {
    summary:
      "An end-to-end churn analysis system that answers natural-language business questions with retrieval-grounded JSON, validated citations, and deterministic risk scoring.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project started from a practical analytics gap rather than a modeling benchmark. A plain churn score is not enough if a retention team also needs evidence, explanations, and next-step recommendations. I wanted to build a system that could answer natural-language business questions with grounded analysis instead of returning a single opaque probability.</p>
      <h2>Problem Formulation</h2>
      <p>I treated the task as a retrieval-grounded structured generation problem. Given a natural-language business query, the system retrieves relevant customer records and returns a JSON report with summary, top reasons, actions, risk level, and citations. Evaluation therefore focuses on schema correctness, citation validity, and risk alignment rather than only on generation fluency.</p>
      <h2>Data & Setup</h2>
      <p>The project uses the Kaggle Telco Customer Churn dataset with realistic customer feedback. It contains 7,043 customer records, 21 structured features, a churn rate of 26.5%, and a feedback field for every customer. Each customer is converted into a unified document containing ID, churn status, services, contract details, billing information, demographics, and feedback text. Retrieval uses 768-dimensional BGE embeddings in FAISS together with BM25, and the generator is a 4-bit <code>Qwen2.5-7B-Instruct</code> model.</p>
      <h2>Methodology</h2>
      <p>The retrieval layer combines dense and sparse search through Reciprocal Rank Fusion:</p>
      <div class="math-block">\[ \mathrm{RRF}(d)=\sum_{r\in\{\mathrm{vector},\mathrm{BM25}\}}\frac{w_r}{k+\mathrm{rank}_r(d)}. \]</div>
      <p>Here \(d\) is a candidate record, \(r\) indexes the retriever, \(w_r\) is the retriever weight, and \(k\) is the smoothing constant. Fine-tuning uses QLoRA on 305 teacher-generated domain examples with the standard next-token objective</p>
      <div class="math-block">\[ \mathcal{L}(\theta;x,y)=-\frac{1}{T}\sum_{t=1}^{T}\log P_\theta(y_t\mid y_{&lt;t},x). \]</div>
      <p>In the final pipeline, I added deterministic post-processing for citation repair and an explicit risk score</p>
      <div class="math-block">\[ R_{\mathrm{total}}=0.35R_{\mathrm{churn}}+0.25R_{\mathrm{tenure}}+0.20R_{\mathrm{charge}}+0.20R_{\mathrm{contract}}. \]</div>
      <p>This separation matters because citation validity and risk labeling are too important to leave entirely to a sampled decoder.</p>
      <h2>Results</h2>
      <p>The most important result is that fine-tuning alone was not enough. JSON validity stayed strong, but citation accuracy regressed after fine-tuning. Once deterministic citation validation and risk scoring were added, the improved pipeline reached 100% JSON compliance, 100% citation accuracy, and a 92% overall evaluation score on the held-out business-query set.</p>
      <h2>Insights / Takeaways</h2>
      <p>The project reinforced that useful LLM systems are modular. Retrieval, generation, risk logic, and post-processing should each carry a distinct responsibility. Better model behavior is not automatically the same as better system behavior, and production reliability often comes from explicit safeguards rather than one bigger prompt.</p>
      <h2>Limitations & Future Work</h2>
      <p>The public telecom dataset is still only a proxy for the original business setting, and the fine-tuning set is relatively small. The next step would be larger evaluation sets, reranking or query-aware citation selection, and tighter calibration of the deterministic risk score against actual retention outcomes.</p>
    `,
  },
  "tool-using-language-models": {
    summary:
      "An in-progress alignment study comparing SFT, DPO, PPO, and GRPO for small models that need to select tools, format calls, and use outputs correctly.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project is still in progress, but the motivation is clear. I want to understand which training paradigm best teaches a small language model not just to answer in free text, but to use tools correctly. Practical agents fail in multiple ways: they can choose the wrong tool, format arguments incorrectly, or ignore the tool output even after a correct call.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the project as a comparative training problem in the small-model regime. The task is tool-use learning under a fixed base model, common tool set, and shared evaluation harness. The outputs of interest are correct tool selection, correct argument formatting, and high-quality final answers. The point is to isolate the effect of the training algorithm rather than confound it with architecture or dataset changes.</p>
      <h2>Data & Setup</h2>
      <p>The setup compares four regimes on the same tool-use task family: supervised fine-tuning, DPO, PPO, and GRPO. All runs share the same tool schema and evaluation logic. I focused on smaller models because that regime is both more deployment-relevant and more revealing about sample efficiency.</p>
      <h2>Methodology</h2>
      <p>The project decomposes tool-use quality into multiple reward components:</p>
      <div class="math-block">\[ r = \alpha r_{\mathrm{select}} + \beta r_{\mathrm{format}} + \gamma r_{\mathrm{answer}}. \]</div>
      <p>Here \(r_{\mathrm{select}}\) rewards correct tool selection, \(r_{\mathrm{format}}\) rewards valid argument formatting, \(r_{\mathrm{answer}}\) rewards final-answer quality, and \(\alpha,\beta,\gamma\) determine their relative importance. I structured the project this way because tool use is not one atomic skill. A model can fail before the call, during the call, or after the call when it has to integrate the result.</p>
      <h2>Results</h2>
      <p>The project is still underway, so I do not yet have a final benchmark table I would treat as portfolio-ready. The main current result is that the evaluation scaffold now makes it possible to compare SFT, DPO, PPO, and GRPO under a shared task definition instead of comparing loosely related systems.</p>
      <h2>Insights / Takeaways</h2>
      <p>The strongest insight so far is conceptual: tool-use quality should not be measured by one blended score alone. The practically important failures are compositional, and decomposing them gives a clearer picture of which training method is actually improving the agent.</p>
      <h2>Limitations & Future Work</h2>
      <p>The obvious limitation is incompleteness. The next step is to finish controlled training runs, produce stable evaluation tables, and determine which regime gives the best tradeoff among reliability, sample efficiency, and final-answer quality for small tool-using models.</p>
    `,
  },
  "trustworthy-rl-llm-reasoning": {
    summary:
      "An in-progress ARC-style reasoning project on whether denser rewards and refusal behavior can make a small model more trustworthy under structured reasoning tasks.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project is an in-progress exploration of trustworthy reasoning on ARC-style tasks. I am working on it with Sunggun Lee. The motivation is not only to improve exact-match accuracy, but to understand whether reward design can make a small reasoning model behave more reliably, including in cases where refusing to answer is the correct behavior.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the task as a reinforcement-learning problem for structured reasoning. The model takes an input grid and generates an output grid. The evaluation target includes exact task success, but the training objective also tries to provide denser feedback than an all-or-nothing reward. That makes the project partly about optimization and partly about how trustworthy behavior should be encoded.</p>
      <h2>Data & Setup</h2>
      <p>The current setup uses ARC-style reasoning tasks together with synthetic supervised examples generated by a stronger model for a smaller student model. The project also introduces refusal behavior for corrupted or contradictory tasks, which matters because trustworthy reasoning should include recognizing when the input itself is unreliable.</p>
      <h2>Methodology</h2>
      <p>The central reward-shaping term is based on cell-level agreement:</p>
      <div class="math-block">\[ r_{\mathrm{train}}(\hat{y},y^*)=\frac{1}{H\cdot W}\sum_{i=1}^{H}\sum_{j=1}^{W}\mathbf{1}[\hat{y}_{ij}=y^*_{ij}]. \]</div>
      <p>Here \(\hat{y}\) is the predicted output grid, \(y^*\) is the target grid, and \(H,W\) are the grid dimensions. I used this because a purely exact-match reward is too sparse for stable optimization on ARC tasks. The refusal mechanism adds a second alignment objective: the model should not guess on malformed or contradictory inputs.</p>
      <h2>Results</h2>
      <p>The project is still underway, so I do not yet have a final benchmark table that I would treat as definitive. The main current result is that the setup now distinguishes among exact-match success, partial correctness, and refusal behavior, which makes evaluation more faithful to the trustworthy-reasoning objective than a single binary score.</p>
      <h2>Insights / Takeaways</h2>
      <p>The most useful shift in this project is the definition of quality itself. A trustworthy model is not just one that solves more tasks; it is one that behaves sensibly when the task is unreliable or underspecified. That changes both reward design and evaluation design in important ways.</p>
      <h2>Limitations & Future Work</h2>
      <p>The main limitation is that the project is still in progress and the current reward design has not yet been validated on a broad enough benchmark. The next step is to finish training and evaluation, compare sparse versus dense rewards more systematically, and test whether refusal behavior remains calibrated across more corrupted-task settings.</p>
    `,
  },
  pennos: {
    summary:
      "A Unix-like guest operating system that integrates scheduling, process management, shell interaction, and a FAT-style file system inside one coherent state model.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>PennOS is a systems project where the challenge was to make multiple low-level components work coherently rather than study them in isolation. I worked on it with Jichu Mao, Zihao Zhu, and Shibo Jin. I keep it in the portfolio because it demonstrates a different kind of rigor from my modeling projects: correctness here depends on state transitions, invariants, and interface boundaries rather than on leaderboard metrics.</p>
      <h2>Problem Formulation</h2>
      <p>I treated the project as a systems-build problem with several tightly coupled responsibilities: scheduling, process management, shell interaction, and a FAT-style filesystem. The relevant question is whether those components can coexist consistently inside a guest operating system process. The output is therefore a working system with correct lifecycle management and usable shell/file behavior.</p>
      <h2>Data & Setup</h2>
      <p>This project is code-driven rather than data-driven. The setup consists of a guest operating system implemented inside a host process, with <code>spthread</code>-style processes, scheduler queues, shell commands, and FAT-style storage abstractions. The meaningful inputs are command sequences, process-state transitions, file operations, and concurrency scenarios that stress the consistency of the system.</p>
      <h2>Methodology</h2>
      <p>The system combines a weighted scheduler, process control blocks, ready and blocked queues, signal handling, shell-facing job control, and a FAT-style storage layer with block chains and metadata management. What mattered most in implementation was not one isolated algorithm, but ensuring that the scheduler, process table, shell, and filesystem all agreed on shared state. In systems work, interface and invariant design play the role that objective functions often play in modeling work.</p>
      <h2>Results</h2>
      <p>The project produced a working integrated OS build with process lifecycle management, shell commands, and filesystem functionality inside a single guest environment. The meaningful result is not a single benchmark number, but that the components operate coherently under a shared state model.</p>
      <h2>Insights / Takeaways</h2>
      <p>PennOS strengthened my intuition for abstraction boundaries and low-level reliability. A clean implementation of one subsystem is not enough if the scheduler, shell, and storage layer disagree on system state. That kind of consistency work is the real core of the project.</p>
      <h2>Limitations & Future Work</h2>
      <p>As with most course operating systems, the build is limited by instructional scope and by the simplified environment in which it runs. A natural next step would be broader stress testing, richer concurrency scenarios, and stronger fault handling so that the design can be pushed further beyond the baseline instructional setting.</p>
    `,
  },
  penncloud: {
    summary:
      "An ongoing distributed cloud-platform build centered on stateless frontends, replicated key-value storage, and the integration path from basic services to a fault-tolerant architecture.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>PennCloud is an ongoing distributed-systems project that aims to build a small cloud platform with webmail, file storage, user accounts, and an admin console on top of a replicated key-value backend. I keep it in the portfolio because it captures the kind of infrastructure work I want to get better at: integrating user-facing services with a backend architecture that has to remain correct under failure.</p>
      <h2>Problem Formulation</h2>
      <p>I framed the project as a distributed-platform design problem. The question is not just whether each component works in isolation, but whether the frontend and backend agree on semantics closely enough that the whole system remains usable as replication, coordination, and failover are introduced. The output is an integrated service platform rather than a benchmark score.</p>
      <h2>Data & Setup</h2>
      <p>The system uses stateless frontends that serve HTTP requests and backend storage nodes that expose key-value operations such as PUT, GET, CPUT, and DELETE. My own work has focused primarily on frontend infrastructure: the HTTP server, load-balancing path, cookie-backed account flows, and the integration boundary between frontend services and backend storage semantics.</p>
      <h2>Methodology</h2>
      <p>The architecture follows a stateless-frontend pattern layered over a replicated key-value backend. That separation matters because it forces clear contracts. The frontend cannot assume stronger guarantees than the backend actually provides, and the backend cannot evolve freely if user-facing flows rely on unstable behavior. For me, the technical core of the project has been maintaining clean service boundaries while the underlying distributed system continues to mature.</p>
      <h2>Results</h2>
      <p>The current build already includes a multithreaded web server and initial layers of account, webmail, and drive functionality. Since the project is still in progress, the most meaningful result at this stage is that the frontend-backend service boundary is concrete enough to support real integration work while replication, coordination, and recovery logic continue to develop underneath it.</p>
      <h2>Insights / Takeaways</h2>
      <p>What I value most in PennCloud is the way it sharpens systems intuition at the boundary between product behavior and infrastructure guarantees. It has made the frontend-backend contract much more concrete for me, especially around what must stay stateless, what must be persisted carefully, and where failures can leak into user-facing behavior.</p>
      <h2>Limitations & Future Work</h2>
      <p>The obvious limitation is incompleteness. The platform still needs fuller replication, failover, recovery, and system-wide validation before it can be judged as a mature distributed system. The next step is to push the architecture beyond feature completeness toward stronger operational guarantees and failure-mode testing.</p>
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
    const narrativeHtml = narrative.body || "";
    const sectionNarrative = buildNarrativeFromSections(project);
    detailArticle.innerHTML =
      narrativeHtml ||
      sectionNarrative ||
      "<p>This project detail page is being expanded into a full narrative after a complete read of the underlying materials.</p>";
  }

  typesetMath();
  window.addEventListener("load", typesetMath, { once: true });
}
