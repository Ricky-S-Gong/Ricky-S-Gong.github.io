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
      "A county-level Difference-in-Differences study of California's January 2021 minimum wage increase using California and New York unemployment panels from 2018 to 2025.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This paper studies the labor-market effect of California's January 2021 minimum wage increase. The report frames the question as whether county-level unemployment in California rose relative to a control state after the policy took effect.</p>
      <h2>Problem Formulation</h2>
      <p>The empirical target is the Average Treatment Effect on the Treated (ATT) for California counties in the post-policy period. The paper writes this as</p>
      <div class="math-block">\[ \mathrm{ATT} = \mathbb{E}\left[Y_{it}(1)-Y_{it}(0)\mid D_i^{\mathrm{treatment}}=1,\ t \geq \text{Jan 2021}\right]. \]</div>
      <p>The identifying assumption is parallel trends: absent the policy, unemployment in California and New York counties would have evolved similarly over time.</p>
      <h2>Data & Setup</h2>
      <p>The paper uses county-level monthly unemployment data from the Bureau of Labor Statistics for California and New York between 2018 and 2025. California counties are treated, New York counties are controls, and the panel is organized at the county-month level. The report notes that time-varying county-level covariates such as demographic composition or industrial structure are not included because consistent monthly county measures were unavailable.</p>
      <h2>Methodology</h2>
      <p>The paper estimates three nested specifications: a baseline DID, a two-way fixed-effects model, and a two-way fixed-effects model with a lagged dependent variable. The dynamic specification is</p>
      <div class="math-block">\[ \log(Y_{it})=\beta_0+\beta_1 D_i^{\mathrm{treat}}+\beta_2 D_t^{\mathrm{post}}+\beta_3\left(D_i^{\mathrm{treat}}D_t^{\mathrm{post}}\right)+\rho \log(Y_{i,t-1})+\gamma_i+\delta_t+u_{it}. \]</div>
      <p>Here \(Y_{it}\) is monthly unemployment in county \(i\) at month \(t\), \(D_i^{\mathrm{treat}}\) marks California counties, \(D_t^{\mathrm{post}}\) marks post-January-2021 months, \(\gamma_i\) are county fixed effects, and \(\delta_t\) are month fixed effects. The report also runs pre-treatment parallel-trend regressions with state-specific linear, quadratic, and cubic time trends, plus a heterogeneity analysis based on high- versus low-unemployment counties.</p>
      <h2>Results</h2>
      <p>Table 2 reports \(\hat\beta_3=0.213\) in both the simple DID and TWFE specifications, corresponding to an estimated 23.7% relative increase in unemployment. After adding the one-period lag of log unemployment, the treatment effect falls to \(\hat\beta_3=0.023\), implying an estimated 2.3% relative increase. The paper also reports no significant treatment-effect heterogeneity by baseline unemployment levels.</p>
      <h2>Insights / Takeaways</h2>
      <p>The report's main interpretation is that unemployment is highly persistent over time, so part of the larger naive post-policy estimate is absorbed once lagged unemployment is included. The paper concludes that the policy effect remains statistically significant after controlling for fixed effects, serial correlation, and common time shocks.</p>
      <h2>Limitations & Future Work</h2>
      <p>The paper notes several limitations: the California-New York comparison may still differ in unobserved ways, the post-COVID period is unusually volatile, and richer monthly county controls are unavailable. The conclusion points to more granular individual- or firm-level data, event-study designs, and stronger heterogeneity analysis as the natural next steps.</p>
    `,
  },
  "nutrition-label-diet-choices": {
    summary:
      "A randomized survey experiment testing whether nutrition-label education changes willingness to pay for healthier product alternatives.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This study examines whether nutrition-label education affects healthy diet choices. The project is designed as a randomized experiment rather than a descriptive survey, so the focus is on whether education changes consumer willingness to pay for healthier products.</p>
      <h2>Problem Formulation</h2>
      <p>The core outcome is willingness to pay for the healthier option in each product pair. Treatment assignment identifies whether the respondent received nutrition-label education, and the regression coefficient on treatment is the quantity used to measure the intervention effect.</p>
      <h2>Data & Setup</h2>
      <p>The poster reports an RCT with \(n=115\) participants. Respondents were randomly assigned to treatment and control conditions. The treatment arm received nutrition-label education, the control arm received placebo-style information, and participants then evaluated multiple healthier-versus-conventional product pairs. The poster also reports no significant baseline difference between treatment and control groups.</p>
      <h2>Methodology</h2>
      <p>The main regression in the poster is</p>
      <div class="math-block">\[ y_i = \beta_0 + \beta_1\,\mathrm{Treat}_i + \beta_2\,\mathrm{Price}_i + \varepsilon_i. \]</div>
      <p>Here \(y_i\) is the outcome for respondent \(i\), \(\mathrm{Treat}_i\) is the treatment indicator, and \(\mathrm{Price}_i\) captures the product-price term included in the specification. The project uses \(\beta_1\) to measure whether the education treatment changes the valuation of the healthier option.</p>
      <h2>Results</h2>
      <p>The poster reports the clearest treatment effects in Product Pairs 2, 5, and 6. Those pairs are tied in the poster to lower sodium, lower fat, and higher vitamin content. The reported effect is therefore selective rather than uniform across all product comparisons.</p>
      <h2>Insights / Takeaways</h2>
      <p>The source materials support a narrow conclusion: nutrition-label education changed willingness to pay in some product contexts but not all of them. The result is tied to specific product comparisons rather than a blanket effect over all healthier-food decisions.</p>
      <h2>Limitations & Future Work</h2>
      <p>The poster highlights the modest sample size and the fact that the outcome is a survey willingness-to-pay measure rather than observed purchase behavior. A larger sample and a more behaviorally realistic setting would be the natural extension.</p>
    `,
  },
  "email-funding-conversion-experiment": {
    summary:
      "A multi-arm growth experiment on whether targeted emails can causally increase first-deposit funding among approved-but-unfunded fintech users.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project studies a specific funnel bottleneck for a retail investing platform: many users complete account approval but never make the first deposit. The report treats email as a potentially scalable intervention and asks whether the campaign generates incremental funded accounts rather than just engagement.</p>
      <h2>Problem Formulation</h2>
      <p>The task is a multi-arm causal experiment on a binary conversion outcome. Each treatment arm is compared against its matched control segment, and the main quantity of interest is incremental funding lift over the control baseline.</p>
      <h2>Data & Setup</h2>
      <p>The experiment covers about 480,000 approved-but-unfunded users over five weeks. Users are partitioned into 12 behavioral segments based on approval recency, bank-link status, recent activity, and recent trading behavior. Those 12 segments are crossed with two cadences, daily and twice-weekly, producing 24 treatment arms. The report uses user-level event data, email logs, randomized template order, and segment-level control-rate tables.</p>
      <h2>Methodology</h2>
      <p>The report defines the primary business metric as</p>
      <div class="math-block">\[ \text{Funding Rate}=\frac{|\text{Users who completed first deposit}|}{|\text{Users with approved accounts}|}. \]</div>
      <p>At the treatment-arm level, lift is defined as</p>
      <div class="math-block">\[ \Delta_g = \hat p_{\mathrm{treat},g} - p_{\mathrm{control},g}. \]</div>
      <p>The one-sided hypothesis is \(H_0: p_{\mathrm{treat},g}\le p_{\mathrm{control},g}\) versus \(H_1: p_{\mathrm{treat},g}>p_{\mathrm{control},g}\). Each treatment arm is compared with a matched control using a one-sided proportions z-test:</p>
      <div class="math-block">\[ z_g = \frac{\hat p_{\mathrm{treat},g}-p_{\mathrm{control},g}}{\sqrt{p_{\mathrm{control},g}(1-p_{\mathrm{control},g})/n_g}}. \]</div>
      <p>The report also converts lift into incremental funded users with</p>
      <div class="math-block">\[ \text{ExtraFunded}_g=N_{\text{treatment},g}\cdot \Delta_g. \]</div>
      <p>Open rate, link rate, unsubscribe rate, and spam-report rate are tracked alongside the final funding outcome.</p>
      <h2>Results</h2>
      <p>The strongest top-of-funnel result is the <code>ml_funding_faq</code> template, which reaches an open rate around 31.5%. On the final funding outcome, 7 of the 24 treatment arms show statistically significant lift, and 6 of those 7 significant wins are daily-cadence arms. The report estimates that the significant treatment arms together generate roughly 500 additional funded users.</p>
      <h2>Insights / Takeaways</h2>
      <p>The report's main practical lesson is that top-of-funnel engagement and bottom-of-funnel funding must be separated. FAQ-style content performed especially well, which is consistent with a funnel in which uncertainty and friction matter more than pure awareness.</p>
      <h2>Limitations & Future Work</h2>
      <p>The cadence comparison is weakened by incomplete maturation of some weekly arms near the end of the experiment window. The design also combines segment, cadence, and randomized content order, so a more targeted follow-up would separate those levers more cleanly.</p>
    `,
  },
  "bgm-focused-task-performance": {
    summary:
      "A controlled mixed-effects study on how music type and playback volume affect completion time on verbal and mathematical focus tasks.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This study examines the impact of background music features on cognitive functioning during focused tasks. The report varies music type, playback volume, task type, and task difficulty, with task completion time as the main outcome.</p>
      <h2>Problem Formulation</h2>
      <p>The goal is to determine whether the characteristics of background music, specifically music type and playback volume, facilitate or hinder task performance across verbal and mathematical tasks of different difficulty.</p>
      <h2>Data & Setup</h2>
      <p>The design is nested and blocked with 288 trial sessions. Music type has two levels (instrumental and lyrics), and volume is nested within music type at 0%, 50%, and 100%. Task type has verbal and math arms, difficulty has easy and hard variants, and participants and time intervals are treated as blocking variables.</p>
      <h2>Methodology</h2>
      <p>The initial linear mixed-effects model in the paper is</p>
      <div class="math-block">\[ Y_{ijklmno} = \mu + \alpha_i + \beta_{j(i)} + \gamma_k + \delta_l + \phi_n + \tau_m + (\alpha\gamma)_{ik} + (\alpha\delta)_{il} + (\gamma\delta)_{kl} + (\alpha\gamma\delta)_{ikl} + \varepsilon_{ijklmno}. \]</div>
      <p>After sequential testing, the final model is</p>
      <div class="math-block">\[ Y_{ijklmn} = \mu + \alpha_i + \beta_{j(i)} + \gamma_k + \delta_l + \tau_m + (\gamma\delta)_{kl} + \varepsilon_{ijklmn}. \]</div>
      <p>The source reports a non-significant three-way interaction and retains the task-type-by-difficulty interaction in the final model.</p>
      <h2>Results</h2>
      <p>The paper reports a p-value of 0.2418 for the three-way interaction, 0.6967 for Music Type × Task Type, and 0.7967 for Music Type × Difficulty. The Task Type × Difficulty interaction is significant with \(F=49.69\) and \(p&lt;0.0001\), and the random Time Interval block is significant with \(F=18.93\) and \(p&lt;0.0001\). Tukey-adjusted comparisons show that instrumental music at 50% volume has the shortest task completion time and significantly outperforms all other settings, with all pairwise p-values below 0.0001.</p>
      <h2>Insights / Takeaways</h2>
      <p>The paper's supported conclusion is specific: among the six MusicType × Volume combinations, instrumental music at 50% volume produces the shortest completion times. The report also states that all four main effects remain highly significant in the final model.</p>
      <h2>Limitations & Future Work</h2>
      <p>The paper discusses measurement noise from the manual setup, the absence of an accuracy outcome, and the very limited participant base. A stronger follow-up would measure both speed and accuracy with a broader participant sample.</p>
    `,
  },
  "natural-gas-consumption-forecasting": {
    summary:
      "A hybrid forecasting project that combines regression and seasonal ARIMA residual modeling to predict U.S. natural gas consumption more credibly out of sample.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project forecasts U.S. natural gas consumption using a hybrid approach. The report motivates the design by arguing that neither a plain regression nor a plain seasonal time-series model fully captures the structure of the monthly series.</p>
      <h2>Problem Formulation</h2>
      <p>The target is monthly U.S. Natural Gas Total Consumption. The report treats the task as a forecasting problem with additional explanatory variables selected for their relationship to gas demand.</p>
      <h2>Data & Setup</h2>
      <p>The report uses monthly observations from January 2005 through December 2023. The retained explanatory variables are U.S. Natural Gas Imports, U.S. Coal Consumption, and U.S. Electricity Net Generation. The evaluation uses an 80/20 train-test split.</p>
      <h2>Methodology</h2>
      <p>The report gives two regression specifications for the mean component:</p>
      <div class="math-block">\[ \mathrm{NaturalGasConsumption}_t = \beta_0 + \beta_1 \mathrm{Time}_t + \beta_2 \mathrm{Imports}_t + \beta_3 \mathrm{Coal}_t + \beta_4 \mathrm{Electricity}_t + \varepsilon_t. \]</div>
      <div class="math-block">\[ \mathrm{NaturalGasConsumption}_t = \beta_0 + \beta_1 \mathrm{Time}_t^2 + \beta_2 \mathrm{Imports}_t + \beta_3 \mathrm{Coal}_t + \beta_4 \mathrm{Electricity}_t + \varepsilon_t. \]</div>
      <p>Residual dependence is then modeled with seasonal ARIMA. The selected residual model for the linear-trend regression is ARIMA\((0,1,1)\times(0,1,1)_{12}\), and the selected residual model for the quadratic-trend regression is ARIMA\((2,1,0)\times(0,1,1)_{12}\).</p>
      <h2>Results</h2>
      <p>The report states that the hybrid model based on the linear-trend regression achieves the lower test MSE at 415001.48, compared with 496704.48 for the quadratic-trend alternative. It reports the next five monthly forecasts as 2229.836, 2313.898, 2113.298, 2762.903, and 2407.874 Bcf.</p>
      <h2>Insights / Takeaways</h2>
      <p>The source supports a layered interpretation: the regression component handles the structural relationship with imports, coal, and electricity generation, while the residual ARIMA model handles remaining serial dependence.</p>
      <h2>Limitations & Future Work</h2>
      <p>The report's design still relies on a small set of external variables and simple mean specifications. A natural extension would be to test richer exogenous inputs or alternative dynamic-regression formulations.</p>
    `,
  },
  "bayesian-statistical-modeling": {
    summary:
      "A Bayesian computation project centered on Metropolis-Hastings proposal design, mixing behavior, and convergence diagnostics when direct posterior sampling is unavailable.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project studies Metropolis-Hastings sampling in a setting where the posterior distribution cannot be sampled from directly. The report focuses on how proposal choice affects convergence and mixing behavior in practice.</p>
      <h2>Problem Formulation</h2>
      <p>The task is posterior sampling rather than prediction. The objective is to construct a Markov chain whose stationary distribution matches a target posterior distribution.</p>
      <h2>Data & Setup</h2>
      <p>The report uses simulated examples rather than an applied observational dataset. It compares chains started from different initial values and studies both symmetric and asymmetric proposal distributions.</p>
      <h2>Methodology</h2>
      <p>The posterior target is written as</p>
      <div class="math-block">\[ \pi(\theta \mid y) \propto p(y \mid \theta)\,\pi(\theta). \]</div>
      <p>The Metropolis-Hastings acceptance probability is</p>
      <div class="math-block">\[ \alpha(x,x') = \min\left\{1,\frac{\pi(x'\mid y)\,q(x\mid x')}{\pi(x\mid y)\,q(x'\mid x)}\right\}. \]</div>
      <p>When the proposal is symmetric, the acceptance rule simplifies to \(\alpha(x,x') = \min\{1,\pi(x'\mid y)/\pi(x\mid y)\}\). One of the proposal distributions studied in the report is \(q(x'\mid x)=\mathcal{N}(x,1)\).</p>
      <h2>Results</h2>
      <p>The report shows that both the symmetric Normal proposal and the asymmetric Gamma-style proposal converge in the illustrated setting. Chains initialized farther from the target region mix more slowly at the start, which is visible in the trace plots and convergence diagnostics.</p>
      <h2>Insights / Takeaways</h2>
      <p>The paper's main takeaway is that Metropolis-Hastings correctness does not eliminate practical sensitivity to proposal design. Proposal choice still materially affects mixing behavior and convergence speed.</p>
      <h2>Limitations & Future Work</h2>
      <p>The examples are simulation-based and intentionally narrow. A natural next step would be to apply the same comparison to a richer applied posterior and explore proposal tuning more systematically.</p>
    `,
  },
  "champaign-rental-price-forecasting": {
    summary:
      "A URES forecasting project comparing baseline regression, tree models, robust regression, and Prophet on Champaign rental-index data from 2016 to 2024.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This URES paper studies rental-price forecasting in Champaign, Illinois, where a large student population and academic-driven housing cycles shape the market. The response variable is the Zillow Observed Rent Index (ZORI) for Champaign, and the paper evaluates whether modern forecasting methods improve prediction accuracy in this setting.</p>
      <h2>Problem Formulation</h2>
      <p>The paper's research question is how time-series analysis and data-driven methods can enhance rental-price forecasting in Champaign. The prediction target is monthly Champaign ZORI, and the covariates are drawn from economic indicators, demographic and social indicators, real-estate market indicators, and an external COVID-19 impact variable.</p>
      <h2>Data & Setup</h2>
      <p>The source explains that yearly data is forward-filled, semesterly data is resampled and forward-filled, and daily data is aggregated by monthly means so that all features align at monthly frequency. Missing values are imputed with <code>IterativeImputer</code>, with a separate rule that treats leading missing values in the “new deaths” variable as zeros. The final cleaned dataset is truncated to July 2016 through July 2024.</p>
      <h2>Methodology</h2>
      <p>The paper compares linear regression, first-differenced KNN, decision tree, Elastic Net, Random Forest, XG-Boost, LightGBM, Huber Regression, Prophet, and several deep-learning baselines. The linear baseline chosen by the paper is</p>
      <div class="math-block">\[ Y_t = \beta_0 + \beta_1 t + \sum_{m=1}^{11}\gamma_m D_m + \delta_1 Y_{t-1} + \sum_{k=1}^{21}\theta_k X_{k,t} + \varepsilon_t. \]</div>
      <p>For robust regression, the Huber loss is written as</p>
      <div class="math-block">\[ L_{\delta}(a)=\begin{cases} \frac{1}{2}a^2 & \text{if } |a|\le \delta \\ \delta\cdot \left(|a|-\frac{1}{2}\delta\right) & \text{if } |a|>\delta \end{cases} \]</div>
      <p>where \(a=y-f(x)\) is the residual. Prophet is introduced with the additive formulation</p>
      <div class="math-block">\[ y(t)=g(t)+s(t)+h(t)+\varepsilon_t. \]</div>
      <p>The report then specifies the piecewise-linear trend as \(g(t)=(k+a(t)^T\delta)t+(m+a(t)^T\gamma)\) and the seasonal component as a Fourier series. Evaluation is reported under both n-step-ahead forecasting and rolling expanding-window forecasting.</p>
      <h2>Results</h2>
      <p>Table 1 reports the following key errors: linear regression Test MSE 336.92 and Rolling MSE 198.51; Huber Regression Test MSE 456.52 and Rolling MSE 186.91; Prophet Test MSE 183.65 and Rolling MSE 175.11. The paper states that Prophet is the best-performing model across all metrics and gives a first-quarter 2025 Champaign ZORI forecast between 1324.90 and 1330.11.</p>
      <h2>Insights / Takeaways</h2>
      <p>The paper's comparison is consistent across sections: models that rely on split-based tree structure struggle to extrapolate the strong upward trend, while Prophet's explicit trend-plus-seasonality formulation handles the Champaign series more effectively.</p>
      <h2>Limitations & Future Work</h2>
      <p>The conclusion section suggests integrating external regressors and exploring hybrid or deep-learning methods as future work. The paper also makes clear that the framework is tailored to a city with academic-cycle demand, so broader generalization would need additional validation.</p>
    `,
  },
  "amazon-food-review-sentiment-analysis": {
    summary:
      "A large-scale NLP pipeline for Amazon food reviews that treats negative-review detection as the operational objective rather than optimizing overall accuracy.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project starts from a customer-feedback setting where negative reviews matter disproportionately for downstream action. The report is built around detecting negative sentiment reliably in an imbalanced review corpus.</p>
      <h2>Problem Formulation</h2>
      <p>The task is binary text classification on review text. The label construction is</p>
      <div class="math-block">\[ y_i=\begin{cases} 1 & \text{if } s_i > 3 \\ 0 & \text{if } s_i < 3 \\ \text{excluded} & \text{if } s_i = 3 \end{cases} \]</div>
      <p>where \(s_i\) is the original rating for review \(i\). Neutral reviews are excluded, and evaluation emphasizes negative-class performance rather than overall accuracy.</p>
      <h2>Data & Setup</h2>
      <p>The project uses 568,454 Amazon Fine Food Reviews after excluding neutral ratings. The final class distribution is 443,777 positive reviews and 124,677 negative reviews. The preprocessing pipeline keeps negation terms while applying tokenization, stemming, and standard cleanup.</p>
      <h2>Methodology</h2>
      <p>The main representation is TF-IDF:</p>
      <div class="math-block">\[ \mathrm{TF\text{-}IDF}(t,d,D)=\mathrm{TF}(t,d)\times \mathrm{IDF}(t,D). \]</div>
      <p>Class weighting uses</p>
      <div class="math-block">\[ w_c = \frac{N}{K N_c}. \]</div>
      <p>The tuned decision rule is</p>
      <div class="math-block">\[ \hat y=\begin{cases} 1 & \text{if } \hat p \ge \tau \\ 0 & \text{otherwise} \end{cases} \quad \text{with } \tau^*=0.37. \]</div>
      <p>The project compares balanced Logistic Regression, ElasticNet regularization, SMOTE, Random Forest, and a soft-voting ensemble.</p>
      <h2>Results</h2>
      <p>The best single model is balanced ElasticNet Logistic Regression with threshold \(\tau^*=0.37\). The reported metrics are negative-class precision 0.750, negative recall 0.821, negative-class F1 0.784, and AUC 0.951. The soft-voting ensemble matches the top AUC and increases negative recall, though with lower precision.</p>
      <h2>Insights / Takeaways</h2>
      <p>The source materials show that preprocessing and threshold policy matter as much as model family. Preserving negation words and tuning the decision threshold are both important to the final performance.</p>
      <h2>Limitations & Future Work</h2>
      <p>The pipeline remains based on classical text representations rather than contextual encoders, and neutral reviews are excluded entirely. Extending the work to contextual embeddings or finer-grained sentiment structure would be a natural next step.</p>
    `,
  },
  "conversion-rate-modeling-optimization": {
    summary:
      "An imbalanced conversion-modeling workflow that combines calibrated prediction, threshold tuning, and segment-level action design for product and marketing decisions.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project addresses a low-conversion e-commerce setting where only a small fraction of sessions convert. The report frames the problem as identifying which sessions are most likely to convert and then using those predictions for product and marketing prioritization.</p>
      <h2>Problem Formulation</h2>
      <p>For session \(i\), the input is</p>
      <div class="math-block">\[ x_i = (\text{country}_i,\ \text{age}_i,\ \text{new\_user}_i,\ \text{source}_i,\ \text{pages}_i), \]</div>
      <p>with binary label \(y_i\in\{0,1\}\). The prediction rule is threshold-based:</p>
      <div class="math-block">\[ \hat{y}_i(\tau) = \mathbf{1}\{\hat{p}_i \ge \tau\}. \]</div>
      <h2>Data & Setup</h2>
      <p>The source data contains 316,200 sessions and six columns: country, age, new-user status, traffic source, total pages visited, and conversion outcome. The positive class is about 3.2% of sessions. Categorical variables are one-hot encoded and continuous variables are standardized before modeling.</p>
      <h2>Methodology</h2>
      <p>The tuned logistic objective is</p>
      <div class="math-block">\[ \mathcal{L}(\beta)= -\frac{1}{n}\sum_{i=1}^{n}\left[y_i \log p_i + (1-y_i)\log(1-p_i)\right] + \lambda\left((1-\alpha)\frac{\|\beta\|_2^2}{2}+\alpha\|\beta\|_1\right), \]</div>
      <p>where \(p_i = \sigma(x_i^\top \beta)\). The final selected model is a soft-voting ensemble over ElasticNet Logistic Regression and SVM with weights \((12,1)\) and threshold \(\tau=0.9323\).</p>
      <h2>Results</h2>
      <p>The final soft-voting model achieves AUC 0.9848, converted-class precision 0.8198, recall 0.7239, and F1 0.7688. The report also uses the predicted scores to create high-, medium-, and low-propensity user segments for action design.</p>
      <h2>Insights / Takeaways</h2>
      <p>The source materials support two main conclusions: threshold policy is a core part of the modeling problem in this imbalanced setting, and user behavior variables such as returning-user status and pages visited matter more than traffic source alone.</p>
      <h2>Limitations & Future Work</h2>
      <p>The feature space is narrow and the intervention ideas are inferred rather than experimentally validated. A natural extension would be to connect the score-based policy to downstream A/B tests.</p>
    `,
  },
  "trm-mechanistic-interpretability": {
    summary:
      "A sparse-feature interpretability workflow for a Tiny Recursive Model on ARC-AGI-1 that connects latent features to behavior through causal ablations.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project studies how a Tiny Recursive Model solves ARC-AGI-1 puzzles by analyzing its internal latent states. The delivered project is centered on sparse-autoencoder-based feature extraction and ablation rather than on output accuracy alone.</p>
      <h2>Problem Formulation</h2>
      <p>The question is whether sparse features extracted from the TRM lower latent stream \(z_L\) are behaviorally meaningful. The project tests this by ranking SAE features and then ablating them to see whether puzzle predictions change.</p>
      <h2>Data & Setup</h2>
      <p>The experiments use ARC-AGI-1 with trajectories from the <code>arc1concept-aug-1000</code> setup. The ablation study focuses on 20 representative validation puzzles. The base TRM uses hidden size 512, eight attention heads, a 16-token prefix, six lower-level cycles, three higher-level cycles, and up to 16 reasoning steps.</p>
      <h2>Methodology</h2>
      <p>The sparse autoencoder encodes the lower-stream latent with</p>
      <div class="math-block">\[ z_n = \operatorname{TopK}_{64}\!\left(\operatorname{ReLU}\!\left(W_{\mathrm{enc}}(z_L - b_{\mathrm{pre}}) + b_{\mathrm{enc}}\right)\right). \]</div>
      <p>The decoder reconstructs the latent as</p>
      <div class="math-block">\[ \hat z_L = W_{\mathrm{dec}} z_n + b_{\mathrm{pre}}. \]</div>
      <p>The SAE loss is</p>
      <div class="math-block">\[ \mathcal{L}_{\mathrm{SAE}} = \operatorname{MSE}(\hat z_L, z_L) + \alpha\,\operatorname{MSE}(\hat e, e), \qquad \alpha = \frac{1}{32}. \]</div>
      <p>The project then ranks features by average activation and activation frequency and applies both subtractive and reconstruction-based ablations.</p>
      <h2>Results</h2>
      <p>The archived progressive reconstruction sweeps over 20 puzzles produce 55 prediction-change events under average-activation ranking and 42 under activation-frequency ranking. The report notes that coarse puzzle structure is often preserved even when many SAE features are removed, and that some puzzles remain unchanged even after aggressive ablation.</p>
      <h2>Insights / Takeaways</h2>
      <p>The source materials support a cautious interpretation: the SAE features do affect behavior, but the ablation results also suggest redundancy, interference, or important information outside the SAE view of \(z_L\), especially in the higher-level stream \(z_H\).</p>
      <h2>Limitations & Future Work</h2>
      <p>The delivered work is centered on SAE-based analysis rather than a completed circuit-discovery stage, and the intervention pipeline only targets \(z_L\). Extending the analysis jointly across \(z_L\) and \(z_H\) is the clearest next step.</p>
    `,
  },
  "llm-powered-churn-analysis-system": {
    summary:
      "An end-to-end churn analysis system that answers natural-language business questions with retrieval-grounded JSON, validated citations, and deterministic risk scoring.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project presents an end-to-end churn analysis system that combines retrieval-augmented generation, QLoRA fine-tuning, and deterministic post-processing. The goal is to answer natural-language business questions with structured, citation-backed churn analysis rather than a single churn probability.</p>
      <h2>Problem Formulation</h2>
      <p>The system takes a natural-language query, retrieves relevant customer records, and returns a JSON report containing five required fields: summary, top reasons, risk level, actions, and citations. The paper evaluates the system on JSON validity, field completeness, type correctness, citation accuracy, and risk-level alignment.</p>
      <h2>Data & Setup</h2>
      <p>The source dataset is the Kaggle Telco Customer Churn dataset with realistic customer feedback. The paper reports 7,043 customer records, 21 structured features, and a churn rate of 26.5% (1,869 churned customers). Each record is converted into a unified document, embedded with <code>BAAI/bge-base-en-v1.5</code> into a 768-dimensional vector, and indexed in FAISS with <code>IndexFlatIP</code>. The generation model is <code>Qwen2.5-7B-Instruct</code> quantized to 4-bit NF4 precision.</p>
      <h2>Methodology</h2>
      <p>The retrieval layer combines dense and sparse search through Reciprocal Rank Fusion:</p>
      <div class="math-block">\[ \mathrm{RRF}(d)=\sum_{r\in\{\mathrm{vector},\mathrm{BM25}\}}\frac{w_r}{k+\mathrm{rank}_r(d)}. \]</div>
      <p>The paper sets \(k=60\) and uses top-\(K\) retrieval with default \(K=5\). Fine-tuning uses QLoRA on 305 training examples generated by a 14B teacher model. The LoRA decomposition is written as</p>
      <div class="math-block">\[ W' = W_0 + \Delta W = W_0 + BA. \]</div>
      <p>The forward pass becomes</p>
      <div class="math-block">\[ h = W_0x + \frac{\alpha}{r}BAx. \]</div>
      <p>The supervised fine-tuning objective is</p>
      <div class="math-block">\[ \mathcal{L}(\theta;x,y)=-\frac{1}{T}\sum_{t=1}^{T}\log P_\theta(y_t\mid y_{&lt;t},x). \]</div>
      <p>The final pipeline adds citation validation and a deterministic risk score</p>
      <div class="math-block">\[ R_{\mathrm{total}}=0.35R_{\mathrm{churn}}+0.25R_{\mathrm{tenure}}+0.20R_{\mathrm{charge}}+0.20R_{\mathrm{contract}}. \]</div>
      <p>with high risk if \(R_{\mathrm{total}}>0.6\), low risk if \(R_{\mathrm{total}}<0.3\), and medium otherwise.</p>
      <h2>Results</h2>
      <p>The paper reports that citation accuracy dropped from 85.0% to 70.0% after fine-tuning, while risk alignment remained at 60.0% for both base and fine-tuned models. After adding the improved pipeline, the evaluation reached 100% JSON format compliance, 100% citation accuracy, and a 92.0% overall score in the three-way comparison.</p>
      <h2>Insights / Takeaways</h2>
      <p>The paper's main systems takeaway is that fine-tuning improved domain-specific analysis but also introduced citation regressions, so deterministic post-processing was necessary to restore traceability and output reliability.</p>
      <h2>Limitations & Future Work</h2>
      <p>The paper notes that the public telecom dataset is only a proxy for the original business setting, that the training set is still relatively small, and that the deterministic risk formula does not perfectly align with the evaluator's risk standard. Larger evaluation sets and better calibration are the clearest next steps.</p>
    `,
  },
  "tool-using-language-models": {
    summary:
      "A proposal-stage comparison of SFT, DPO, PPO, and GRPO for tool-use alignment in small language models.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This project is framed as a systematic comparison of SFT, DPO, PPO, and GRPO for tool-use alignment in small language models. The proposal focuses on the small-model regime because most existing comparisons are done on larger models and do not isolate the training algorithm under a fixed tool-use setup.</p>
      <h2>Problem Formulation</h2>
      <p>The proposal defines the setting as a small language model \(M\), a fixed tool set \(\mathcal{T}=\{t_1,\ldots,t_k\}\), and a task distribution \(\mathcal{D}\) over natural-language queries requiring tool invocation. The comparison spans four regimes: SFT, DPO, PPO, and GRPO. The three evaluation axes are tool-call accuracy, reward-signal stability during training, and OOD generalization to unseen tool-use scenarios.</p>
      <h2>Data & Setup</h2>
      <p>The proposal uses GPT-nano as the base model and GPT-mini as the teacher model. Training data is constructed from ToolBench-I1 and GSM8K trajectories, while evaluation covers ToolBench-I3, ToolQA, GSM8K test, and BFCL. The planned training split contains approximately 12,000 ToolBench-I1 examples plus 7,473 GSM8K calculator-tool trajectories.</p>
      <h2>Methodology</h2>
      <p>The proposal defines the composite reward as</p>
      <div class="math-block">\[ r = \alpha \cdot r_{\mathrm{select}} + \beta \cdot r_{\mathrm{format}} + \gamma \cdot r_{\mathrm{answer}}. \]</div>
      <p>The default weights are \(\alpha=0.2\), \(\beta=0.3\), and \(\gamma=0.5\). For GRPO, the proposal gives the group-relative advantage estimate as</p>
      <div class="math-block">\[ A_i = \frac{r_i-\mu_G}{\sigma_G+\varepsilon}, \]</div>
      <p>where \(G=8\) completions are sampled per prompt, \(\mu_G\) is the group mean reward, and \(\sigma_G\) is the group standard deviation. The reward-decomposition ablation varies \((\alpha,\beta,\gamma)\) across four configurations, including binary end-to-end reward and the full composite setting.</p>
      <h2>Results</h2>
      <p>This project is still at the proposal stage, so there is no final benchmark table yet. The current deliverable is the experimental design: fixed architecture, fixed task family, fixed evaluation protocol, and explicitly stated ablations for reward decomposition and OOD testing.</p>
      <h2>Insights / Takeaways</h2>
      <p>The proposal argues that tool-use rewards are structurally compositional, sparse, and partially verifiable at training time. That framing is the main design insight of the project so far and is the reason the evaluation separately tracks tool-call accuracy, final-answer accuracy, reward stability, and OOD gap.</p>
      <h2>Limitations & Future Work</h2>
      <p>The obvious limitation is that the work is still pre-results. The next steps are the controlled training runs, the four-way algorithm comparison, and the planned reward-decomposition and OOD generalization experiments.</p>
    `,
  },
  "trustworthy-rl-llm-reasoning": {
    summary:
      "A proposal-stage ARC-AGI-1 reasoning project using exact and dense grid rewards for SFT, RFT, and DPO-style training.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This course project studies GPT-nano on ARC-AGI-1 tasks using supervised fine-tuning, reward-based fine-tuning, and DPO-style preference construction. The project is built around dense reward design for grid prediction rather than around a generic language-generation objective.</p>
      <h2>Problem Formulation</h2>
      <p>Each ARC task consists of demonstration input-output grids plus a test input grid, serialized as plain text. The model must infer the hidden transformation rule and generate the output grid in the same format. The proposal distinguishes between exact evaluation reward and dense training reward.</p>
      <h2>Data & Setup</h2>
      <p>The proposal uses the official 400 public ARC-AGI-1 training tasks, split into 350 training tasks and 50 held-out validation tasks. GPT-mini is used to generate supervised fine-tuning examples, and only completions whose predicted output grid exactly matches the gold answer are retained for SFT.</p>
      <h2>Methodology</h2>
      <p>The source defines two rewards. The evaluation reward is</p>
      <div class="math-block">\[ r_{\mathrm{eval}}(\hat{y}, y^*) = \mathbf{1}\left[\hat{y}=y^*\right]. \]</div>
      <p>The dense training reward is</p>
      <div class="math-block">\[ r_{\mathrm{train}}(\hat{y},y^*)=\frac{1}{H\cdot W}\sum_{i=1}^{H}\sum_{j=1}^{W}\mathbf{1}[\hat{y}_{ij}=y^*_{ij}]. \]</div>
      <p>The proposal states that \(r_{\mathrm{train}}=1 \Leftrightarrow r_{\mathrm{eval}}=1\), so the dense reward is consistent with exact-match evaluation while giving finer-grained learning signal. For DPO pair generation, the project samples \(G=8\) completions per training task and selects the highest-scoring completion as \(y^+\) and the lowest-scoring completion as \(y^-\).</p>
      <h2>Results</h2>
      <p>This project is also at the proposal stage, so there is no final empirical benchmark yet. The current concrete result is the task specification, reward design, and preference-pair construction procedure for comparing SFT, RFT/PPO-style training, and DPO on ARC-AGI-1.</p>
      <h2>Insights / Takeaways</h2>
      <p>The proposal's key design decision is to avoid training on exact-match reward alone. Instead, cell-level accuracy is used during training so that partially correct grid predictions still provide usable optimization signal.</p>
      <h2>Limitations & Future Work</h2>
      <p>The work is still pre-results. The next stage is the actual implementation and comparison of SFT, RFT, and DPO under the reward definitions laid out in the proposal.</p>
    `,
  },
  pennos: {
    summary:
      "A UNIX-like guest operating system that integrates scheduling, process management, shell interaction, and a FAT-style file system inside one coherent state model.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>PennOS is a UNIX-like guest operating system implemented inside a single host-OS process. The project README describes it as a system built around standard UNIX-style subsystems including a basic priority scheduler, a FAT filesystem, and user-shell interactions.</p>
      <h2>Problem Formulation</h2>
      <p>The system problem is to make scheduling, process management, shell control, and filesystem operations work together inside one coherent guest OS. The project documentation describes the process model, scheduler, syscalls, shell, and PennFAT layers as the main subsystems.</p>
      <h2>Data & Setup</h2>
      <p>The README states that each PennOS “process” is implemented as an <code>spthread</code> with a PCB storing PID, PPID, thread handle, priority, status, file descriptors, signals, and child-process metadata. The kernel maintains ready queues, blocked, stopped, and zombie queues, plus a process table and a current-process pointer.</p>
      <h2>Methodology</h2>
      <p>The scheduler uses <code>SIGALRM</code> for 100 ms clock ticks and implements a weighted round-robin policy with a 9:6:4 ratio across three priority levels. The filesystem is documented as a FAT-style layout with a FAT region, data region, flat root directory, linked block chains, and a 3-bit permission model. The shell implements parsing, job control, I/O redirection, and built-in commands such as <code>ps</code>, <code>kill</code>, <code>nice</code>, <code>sleep</code>, <code>cat</code>, <code>ls</code>, <code>touch</code>, <code>cp</code>, <code>rm</code>, and <code>chmod</code>.</p>
      <h2>Results</h2>
      <p>The documentation lists process creation, waiting, signaling, timed blocking, job control, shell redirection, and integrated PennFAT operations as implemented functionality. The FAT tool can run standalone as <code>bin/pennfat</code>, while the integrated OS mounts a filesystem image at startup through <code>bin/pennos myfs</code>.</p>
      <h2>Insights / Takeaways</h2>
      <p>The codebase is organized around clean subsystem boundaries: FAT core, kernel layer, system-call layer, and shell/command layer. The companion documentation explicitly presents this modular layering as the project's architectural rationale.</p>
      <h2>Limitations & Future Work</h2>
      <p>As documented, PennOS remains a course operating-system build running inside a simplified host-process environment. Broader fault handling, heavier stress testing, and richer multi-process workloads would be natural extensions.</p>
    `,
  },
  penncloud: {
    summary:
      "An ongoing distributed cloud-platform build centered on stateless frontends, replicated key-value storage, and the integration path from basic services to a fault-tolerant architecture.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>PennCloud is an ongoing distributed cloud-platform build with three layers: a frontend load balancer, stateless frontend servers, and a distributed backend key-value store. The proposal positions the system as a platform for user accounts, webmail, drive, and an admin console.</p>
      <h2>Problem Formulation</h2>
      <p>The central design question is how to keep application services usable while replication, coordinator-based metadata management, and node failure handling are introduced underneath them. The proposal explicitly keeps the coordinator off the critical path for normal data operations: actual GET/PUT/CPUT/DELETE requests go from frontend servers directly to storage nodes.</p>
      <h2>Data & Setup</h2>
      <p>The proposal and progress log state that frontend servers are stateless and communicate with backend nodes over persistent TCP connections using a text protocol such as <code>PUT row col &lt;len&gt;\r\n&lt;bytes&gt;</code>. Ricky's assigned scope is frontend HTTP infrastructure, load balancing, user accounts, and cross-layer integration. The progress log shows completed minimal solutions for backend KV, frontend HTTP, user accounts, webmail, and drive, with replicated KV, fault detection, and other intermediate components still in progress.</p>
      <h2>Methodology</h2>
      <p>The proposal chooses primary-based replication with a target of three replicas per tablet, coordinator heartbeats for failure detection, checkpoint-plus-WAL recovery, and tablet partitioning by row-key range. The progress log also documents concrete frontend integration details, including consuming the backend banner line in <code>connect_backend()</code>, implementing cookie-based sessions, and using CPUT retry loops to update webmail and drive index columns safely.</p>
      <h2>Results</h2>
      <p>As of the 2026-04-04 progress log, the completed pieces include a multithreaded frontend HTTP server with GET/POST/HEAD, cookies, and persistent connections; a backend KV server supporting PUT/GET/CPUT/DELETE; user login and registration; minimal internal webmail; and minimal drive upload/download. Intermediate goals such as chunked transfer encoding, frontend load balancing, replicated KV, admin console, and richer webmail/drive features are listed as not yet complete.</p>
      <h2>Insights / Takeaways</h2>
      <p>The source materials emphasize explicit schema and interface design. Examples include using <code>mail:&lt;username&gt;.__index__</code> for inbox indexing, UUID-based drive row keys, configurable heartbeat intervals, and frontend retry-through-coordinator behavior after backend connection failure.</p>
      <h2>Limitations & Future Work</h2>
      <p>The project is still in progress. The proposal and progress notes identify replicated KV, failover, recovery, chunked transfer encoding, load balancing, admin tooling, and complete application services as the major remaining milestones.</p>
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
