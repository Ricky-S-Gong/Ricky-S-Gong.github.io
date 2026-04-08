const catalog = window.projectCatalog || { projects: [] };
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const project = catalog.projects.find((item) => item.slug === slug);

const normalizeLocale = (value) => {
  if (!value) return "en";
  if (typeof value === "string") {
    return /^zh/i.test(value) || /^cn/i.test(value) ? "zh" : "en";
  }
  if (typeof value === "object") {
    return normalizeLocale(value.current ?? value.locale ?? value.value ?? value.lang);
  }
  return "en";
};

const resolveLocale = () => {
  const fromGlobals =
    typeof window.__siteLocale?.getLocale === "function"
      ? window.__siteLocale.getLocale()
      : window.__siteLocale ?? window.__locale ?? window.__currentLocale;
  if (fromGlobals != null && fromGlobals !== "") {
    return normalizeLocale(fromGlobals);
  }
  return normalizeLocale(new URLSearchParams(window.location.search).get("lang"));
};

const locale = resolveLocale();
window.__locale = locale;
window.__currentLocale = locale;
window.__getLocale = () => locale;

const pickLocale = (value) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[locale] ?? value.en ?? value.zh ?? "";
  }
  return value || "";
};

const localized = (enValue, zhValue) => (locale === "zh" ? zhValue || enValue : enValue);

const shellCopy = {
  en: {
    backLink: "← Back to Projects",
    notFoundCategory: "Project",
    notFoundTitle: "Project not found",
    notFoundSubtitle: "Return to the overview page and select a project card.",
    notFoundSummary:
      "This detail page is reserved for project narratives that will be filled after a full read of the corresponding code, report, notebook, and paper materials.",
  },
  zh: {
    backLink: "← 返回项目列表",
    notFoundCategory: "项目",
    notFoundTitle: "未找到项目",
    notFoundSubtitle: "返回概览页面并选择一个项目卡片。",
    notFoundSummary: "这个详情页用于展示项目叙述，后续会根据相应材料补全。",
  },
};

const detailBackLink = document.getElementById("detail-back-link");
if (detailBackLink) {
  detailBackLink.textContent = (shellCopy[locale] || shellCopy.en).backLink;
  detailBackLink.href = locale === "zh" ? "./index.html?lang=zh#projects" : "./index.html#projects";
}

const categoryTranslations = {
  "Causal Inference & Experimentation": "因果推断与实验",
  "Time Series & Statistical Modelling": "时间序列与统计建模",
  "Machine Learning & Deep Learning": "机器学习与深度学习",
  "NLP & Large Language Model": "自然语言处理与大模型",
  "Data Systems & Infrastructure": "数据系统与基础设施",
};

const resourceLabelTranslations = {
  Paper: "论文",
  Report: "报告",
  GitHub: "GitHub",
};

const tagTranslations = {
  DiD: "双重差分",
  TWFE: "双向固定效应",
  Labor: "劳动",
  Policy: "政策",
  "Panel Data": "面板数据",
  "Experiment Design": "实验设计",
  Survey: "问卷",
  Health: "健康",
  "Consumer Behavior": "消费者行为",
  "A/B Testing": "A/B 测试",
  Experimentation: "实验",
  Fintech: "金融科技",
  "Funnel Analysis": "漏斗分析",
  "Product Analytics": "产品分析",
  Behavior: "行为",
  Statistics: "统计",
  "Mixed Effects": "混合效应",
  ANOVA: "方差分析",
  Time: "时间",
  "Time Series": "时间序列",
  Forecasting: "预测",
  R: "R 语言",
  Energy: "能源",
  "Statistical Modelling": "统计建模",
  Bayesian: "贝叶斯",
  "Posterior Sampling": "后验采样",
  Economics: "经济学",
  "Robust Regression": "稳健回归",
  Prophet: "Prophet",
  NLP: "NLP",
  LLM: "LLM",
  "Tool Use": "工具使用",
  "Reasoning": "推理",
  "Customer Analytics": "客户分析",
  "Marketplace Strategy": "市场策略",
  "Public Data": "公共数据",
  "Applied ML": "应用机器学习",
  "Product Analytics": "产品分析",
  "Experimental Design": "实验设计",
  "Classification": "分类",
  Segmentation: "分群",
  Python: "Python",
  SQL: "SQL",
  Visualization: "可视化",
  "Model Evaluation": "模型评估",
  "Feature Engineering": "特征工程",
  "User Journey": "用户旅程",
  "Cohort Analysis": "队列分析",
  "Product Metrics": "产品指标",
  "Causal Thinking": "因果思维",
  Education: "教育",
  "Geospatial": "地理空间",
  Dashboarding: "仪表盘",
  "Policy Lens": "政策视角",
  "Forecasting": "预测",
  "scikit-learn": "scikit-learn",
  "Deep Learning": "深度学习",
  "Data Systems": "数据系统",
  "Operating Systems": "操作系统",
};

const sectionTitleTranslations = {
  "Background / Motivation": "背景 / 动机",
  "Problem Formulation": "问题定义",
  "Data & Setup": "数据与设置",
  Methodology: "方法",
  Results: "结果",
  "Insights / Takeaways": "洞察 / 收获",
  "Limitations & Future Work": "局限与未来工作",
};

const translateCategory = (value) => {
  const resolved = pickLocale(value);
  return locale === "zh" ? categoryTranslations[resolved] || resolved : resolved;
};

const translateTag = (value) => {
  const resolved = pickLocale(value);
  return locale === "zh" ? tagTranslations[resolved] || resolved : resolved;
};

const translateResourceLabel = (value) => {
  const resolved = pickLocale(value);
  return locale === "zh" ? resourceLabelTranslations[resolved] || resolved : resolved;
};

const localizeSectionTitle = (title) => {
  if (locale !== "zh") return title;
  return sectionTitleTranslations[title] || title;
};

const getProjectField = (projectData, key) =>
  locale === "zh" ? projectData?.[`${key}Zh`] || projectData?.[key] : projectData?.[key];

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
      return content ? `<h2>${localizeSectionTitle(title)}</h2>${content}` : "";
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
      <p>The poster defines the main variable of interest as the survey taker's revealed willingness to pay for the healthier product (Product 2) conditional on knowing the fair market price of the conventional product (Product 1):</p>
      <div class="math-block">\[ Y_{i,t} = WTP^{Product\ 2}_{i,t}\mid Price^{Product\ 1} \]</div>
      <h2>Data & Setup</h2>
      <p>The poster reports an RCT with \(n=115\) participants. Respondents were randomly assigned to treatment and control conditions. The treatment arm received nutrition-label education, the control arm received placebo-style information, and participants then evaluated multiple healthier-versus-conventional product pairs. The poster also reports no significant baseline difference between treatment and control groups.</p>
      <h2>Methodology</h2>
      <p>To estimate the treatment effect of nutrition label education on survey taker's revealed willingness to pay for the healthier product, the poster estimates the following regression specification for all six product pairs in the survey following Twisk et al. (2018):</p>
      <div class="math-block">\[ Y_{i,t} = \alpha + \beta_1 Time + \beta_2 Time \times treatment_i + \gamma^\prime Control_{i,t} + \epsilon_{i,t} \]</div>
      <p>The poster states that the control variables included are Age, Gender, Education, and Income. It also states that the coefficient of the interaction term of Time and Treatment captures the treatment effect of nutrition label education on survey taker's revealed willingness to pay for the healthier product within each of the product pairs analyzed. The same regression specification is then used for the survey effect and treatment effect on consumer nutrition knowledge, with results reported in Table 3.</p>
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
      "A <a href=\"https://stat.illinois.edu/research/mures\" target=\"_blank\" rel=\"noreferrer\">URES</a> forecasting project comparing baseline regression, tree models, robust regression, and Prophet on Champaign rental-index data from 2016 to 2024.",
    body: String.raw`
      <h2>Background / Motivation</h2>
      <p>This <a href="https://stat.illinois.edu/research/mures" target="_blank" rel="noreferrer">URES</a> paper studies rental-price forecasting in Champaign, Illinois, where a large student population and academic-driven housing cycles shape the market. The response variable is the Zillow Observed Rent Index (ZORI) for Champaign, and the paper evaluates whether modern forecasting methods improve prediction accuracy in this setting.</p>
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

const detailNarrativesZh = {
  "minimum-wage-unemployment": {
    summary:
      "一项以县级月度面板为基础的双重差分研究，使用 2018 到 2025 年的加州与纽约失业数据，考察加州 2021 年最低工资上调的影响。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>这项研究关注加州 2021 年 1 月最低工资上调对劳动力市场的影响。报告将问题表述为：政策生效后，加州县级失业率是否相对于对照州出现上升。</p>
      <h2>问题定义</h2>
      <p>经验上要估计的是处理组在政策实施后的平均处理效应（ATT）。文中将其写为</p>
      <div class="math-block">\[ \mathrm{ATT} = \mathbb{E}\left[Y_{it}(1)-Y_{it}(0)\mid D_i^{\mathrm{treatment}}=1,\ t \geq \text{Jan 2021}\right]. \]</div>
      <p>识别假设是平行趋势：如果没有该政策，加州与纽约县的失业走势应当保持相似。</p>
      <h2>数据与设置</h2>
      <p>研究使用美国劳工统计局提供的 2018 到 2025 年加州和纽约县级月度失业数据。加州县作为处理组，纽约县作为对照组，面板以县-月层级组织。报告还说明，由于缺乏一致的月度县级协变量，因此没有纳入人口结构或产业结构等随时间变化的县级控制变量。</p>
      <h2>方法</h2>
      <p>报告估计了三个嵌套规格：基础 DID、双向固定效应模型，以及加入滞后因变量的双向固定效应模型。动态规格为</p>
      <div class="math-block">\[ \log(Y_{it})=\beta_0+\beta_1 D_i^{\mathrm{treat}}+\beta_2 D_t^{\mathrm{post}}+\beta_3\left(D_i^{\mathrm{treat}}D_t^{\mathrm{post}}\right)+\rho \log(Y_{i,t-1})+\gamma_i+\delta_t+u_{it}. \]</div>
      <p>其中 \(Y_{it}\) 表示县 \(i\) 在月份 \(t\) 的失业水平，\(D_i^{\mathrm{treat}}\) 表示加州县，\(D_t^{\mathrm{post}}\) 表示 2021 年 1 月之后的月份，\(\gamma_i\) 为县固定效应，\(\delta_t\) 为月份固定效应。报告还用州别线性、二次和三次时间趋势检验政策前的平行趋势，并基于高失业与低失业县做了异质性分析。</p>
      <h2>结果</h2>
      <p>表 2 显示，在基础 DID 和 TWFE 规格下，\(\hat\beta_3=0.213\)，对应失业率约 23.7% 的相对上升。加入一阶滞后对数失业之后，处理效应降至 \(\hat\beta_3=0.023\)，对应约 2.3% 的相对上升。报告还发现，处理效应在基线失业水平上的异质性不显著。</p>
      <h2>洞察 / 收获</h2>
      <p>报告的核心解释是：失业率具有很强的时间持续性，因此在加入滞后失业项后，原先较大的政策后估计会被部分吸收。论文最终认为，在控制固定效应、序列相关和共同时间冲击之后，政策效应仍然显著。</p>
      <h2>局限与未来工作</h2>
      <p>报告也指出若干局限：加州与纽约的比较仍可能存在未观测差异，疫情后的时期波动较大，而且缺乏更丰富的月度县级控制变量。更细粒度的个体或企业数据、事件研究设计，以及更强的异质性分析，是后续最自然的扩展方向。</p>
    `,
  },
  "nutrition-label-diet-choices": {
    summary:
      "一项随机调查实验，检验营养标签教育是否会改变消费者对更健康产品的支付意愿。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>这项研究考察营养标签教育是否会影响健康饮食选择。项目采用随机实验而不是描述性调查的设计，因此重点在于教育是否改变消费者对更健康产品的支付意愿。</p>
      <h2>问题定义</h2>
      <p>海报将核心变量定义为：在了解普通产品（Product 1）的公平市场价格后，调查对象对更健康产品（Product 2）的显性支付意愿：</p>
      <div class="math-block">\[ Y_{i,t} = WTP^{Product\ 2}_{i,t}\mid Price^{Product\ 1} \]</div>
      <h2>数据与设置</h2>
      <p>海报报告了一项包含 \(n=115\) 名参与者的随机对照试验。受访者被随机分配到处理组和对照组。处理组接受营养标签教育，对照组接受安慰剂式信息；随后参与者对多个“更健康 vs. 常规”产品对进行评估。海报还指出，处理组与对照组在基线特征上没有显著差异。</p>
      <h2>方法</h2>
      <p>为估计营养标签教育对调查对象支付意愿的影响，海报针对问卷中的六组产品对，按照 Twisk et al. (2018) 的思路估计了如下回归规格：</p>
      <div class="math-block">\[ Y_{i,t} = \alpha + \beta_1 Time + \beta_2 Time \times treatment_i + \gamma^\prime Control_{i,t} + \epsilon_{i,t} \]</div>
      <p>海报说明所包含的控制变量为 Age、Gender、Education 和 Income。它同时指出，Time 与 Treatment 的交互项系数刻画了营养标签教育对调查对象支付更健康产品意愿的处理效应。相同的回归规格也被用于分析消费者营养知识的调查效应与处理效应，结果见表 3。</p>
      <h2>结果</h2>
      <p>海报显示，最明显的处理效应出现在 Product Pair 2、5 和 6。海报将这些产品对分别对应到较低钠、较低脂肪和更高维生素含量。因此，这一效果是有选择性的，而不是对所有产品比较都成立。</p>
      <h2>洞察 / 收获</h2>
      <p>材料支持的结论很明确：营养标签教育会在部分产品情境下改变支付意愿，但并不会对所有更健康食品选择产生一致影响。结果更多地依赖于具体产品对，而不是对更健康饮食决策的普遍作用。</p>
      <h2>局限与未来工作</h2>
      <p>海报也强调了样本量有限，以及研究使用的是调查中的支付意愿，而非真实购买行为。更大的样本和更贴近真实行为的场景，是后续最自然的延伸。</p>
    `,
  },
  "email-funding-conversion-experiment": {
    summary:
      "一项增长实验，考察定向邮件是否能够因果性地提升已获批但尚未入金的金融科技用户首次入金率。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>这个项目研究的是零售投资平台中的一个关键漏斗瓶颈：很多用户虽然完成了账户审核，却从未进行首次入金。报告将邮件视为一种可规模化的干预方式，并考察这类活动是否能带来真实的入金增量，而不仅仅是打开率或点击率提升。</p>
      <h2>问题定义</h2>
      <p>该任务是一个关于二元转化结果的多臂因果实验。每个处理臂都会与其匹配的对照组比较，核心关注的是相对对照基线的入金增量。</p>
      <h2>数据与设置</h2>
      <p>实验覆盖约 48 万名已获批但尚未入金的用户，持续五周。用户被划分为 12 个行为分群，依据包括批准时间、是否绑定银行、近期活跃程度和近期交易行为。12 个分群再与两种发送频率（日频和每周两次）组合，形成 24 个处理臂。报告使用用户级事件数据、邮件日志、随机模板顺序以及分群级别的对照率表。</p>
      <h2>方法</h2>
      <p>报告将核心业务指标定义为</p>
      <div class="math-block">\[ \text{Funding Rate}=\frac{|\text{Users who completed first deposit}|}{|\text{Users with approved accounts}|}. \]</div>
      <p>在处理臂层面，增量提升定义为</p>
      <div class="math-block">\[ \Delta_g = \hat p_{\mathrm{treat},g} - p_{\mathrm{control},g}. \]</div>
      <p>单侧假设为 \(H_0: p_{\mathrm{treat},g}\le p_{\mathrm{control},g}\) 对 \(H_1: p_{\mathrm{treat},g}>p_{\mathrm{control},g}\)。每个处理臂都通过单侧比例 z 检验与对应对照组比较：</p>
      <div class="math-block">\[ z_g = \frac{\hat p_{\mathrm{treat},g}-p_{\mathrm{control},g}}{\sqrt{p_{\mathrm{control},g}(1-p_{\mathrm{control},g})/n_g}}. \]</div>
      <p>报告还用下面的方式把 uplift 转换为新增入金用户：</p>
      <div class="math-block">\[ \text{ExtraFunded}_g=N_{\text{treatment},g}\cdot \Delta_g. \]</div>
      <p>与此同时，报告也持续跟踪打开率、点击率、退订率和垃圾邮件举报率。</p>
      <h2>结果</h2>
      <p>最强的漏斗上游结果来自 <code>ml_funding_faq</code> 模板，打开率约为 31.5%。在最终入金结果上，24 个处理臂中有 7 个显示出显著提升，而且这 7 个显著结果里有 6 个来自日频发送。报告估计，这些显著处理臂合计带来了约 500 个新增入金用户。</p>
      <h2>洞察 / 收获</h2>
      <p>报告的实用结论是：漏斗上游的参与度指标与漏斗下游的入金结果必须分开看。FAQ 风格内容表现尤其好，这与一个由不确定性和摩擦主导的漏斗结构是一致的。</p>
      <h2>局限与未来工作</h2>
      <p>由于部分每周频率的处理臂在实验结束时尚未完全成熟，频率对比会受到一定限制。该设计还同时混合了分群、发送频率和随机模板顺序，因此更精细的后续研究应把这些杠杆拆开。</p>
    `,
  },
  "bgm-focused-task-performance": {
    summary:
      "一项受控混合效应研究，考察背景音乐类型与音量如何影响语言和数学专注任务的完成时间。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>这项研究关注背景音乐特征对专注任务中认知表现的影响。报告改变音乐类型、播放音量、任务类型与任务难度，把任务完成时间作为主要结果变量。</p>
      <h2>问题定义</h2>
      <p>研究目标是判断背景音乐的类型与音量，是否会在不同难度的语言任务与数学任务中促进或阻碍任务表现。</p>
      <h2>数据与设置</h2>
      <p>实验设计为嵌套且分块的结构，共 288 次试验会话。音乐类型分为器乐和带歌词两类，音量在每种音乐类型内嵌套为 0%、50% 和 100%。任务类型分为语言和数学两类，难度分为容易和困难，参与者与时间区间都作为区组变量处理。</p>
      <h2>方法</h2>
      <p>论文中的初始线性混合效应模型为</p>
      <div class="math-block">\[ Y_{ijklmno} = \mu + \alpha_i + \beta_{j(i)} + \gamma_k + \delta_l + \phi_n + \tau_m + (\alpha\gamma)_{ik} + (\alpha\delta)_{il} + (\gamma\delta)_{kl} + (\alpha\gamma\delta)_{ikl} + \varepsilon_{ijklmno}. \]</div>
      <p>经过逐步检验后，最终模型为</p>
      <div class="math-block">\[ Y_{ijklmn} = \mu + \alpha_i + \beta_{j(i)} + \gamma_k + \delta_l + \tau_m + (\gamma\delta)_{kl} + \varepsilon_{ijklmn}. \]</div>
      <p>报告指出三阶交互项不显著，并在最终模型中保留了任务类型与难度之间的交互项。</p>
      <h2>结果</h2>
      <p>论文报告三阶交互的 p 值为 0.2418，Music Type × Task Type 为 0.6967，Music Type × Difficulty 为 0.7967。Task Type × Difficulty 的交互显著，\(F=49.69\) 且 \(p&lt;0.0001\)；随机 Time Interval 分块也显著，\(F=18.93\) 且 \(p&lt;0.0001\)。Tukey 校正后的比较显示，50% 音量的器乐音乐完成时间最短，并显著优于其他所有设置，所有两两比较的 p 值都低于 0.0001。</p>
      <h2>洞察 / 收获</h2>
      <p>论文支持的结论很具体：在六种 MusicType × Volume 组合中，50% 音量的器乐音乐能带来最短的任务完成时间。报告同时指出，在最终模型里所有四个主效应都保持高度显著。</p>
      <h2>局限与未来工作</h2>
      <p>论文讨论了手工实验装置带来的测量噪声、没有纳入准确率结果，以及参与者样本非常有限。更强的后续研究应当在更大样本上同时测量速度与准确率。</p>
    `,
  },
  "natural-gas-consumption-forecasting": {
    summary:
      "一个混合式预测项目，将回归模型与季节性 ARIMA 残差建模结合，以更稳健地预测美国天然气消费。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>该项目使用混合方法预测美国天然气消费。报告认为，单纯的回归或单纯的季节性时间序列模型都不足以完整刻画月度序列结构，因此需要组合建模。</p>
      <h2>问题定义</h2>
      <p>预测目标是美国月度天然气总消费量。报告将其视为一个带有外生解释变量的预测问题，所选变量与天然气需求密切相关。</p>
      <h2>数据与设置</h2>
      <p>报告使用 2005 年 1 月到 2023 年 12 月的月度数据。最终保留的解释变量是美国天然气进口、美国煤炭消费和美国电力净发电量。评估采用 80/20 的训练测试划分。</p>
      <h2>方法</h2>
      <p>报告给出了均值部分的两个回归规格：</p>
      <div class="math-block">\[ \mathrm{NaturalGasConsumption}_t = \beta_0 + \beta_1 \mathrm{Time}_t + \beta_2 \mathrm{Imports}_t + \beta_3 \mathrm{Coal}_t + \beta_4 \mathrm{Electricity}_t + \varepsilon_t. \]</div>
      <div class="math-block">\[ \mathrm{NaturalGasConsumption}_t = \beta_0 + \beta_1 \mathrm{Time}_t^2 + \beta_2 \mathrm{Imports}_t + \beta_3 \mathrm{Coal}_t + \beta_4 \mathrm{Electricity}_t + \varepsilon_t. \]</div>
      <p>残差中的依赖结构随后由季节性 ARIMA 建模。线性趋势回归对应的残差模型为 ARIMA\((0,1,1)\times(0,1,1)_{12}\)，二次趋势回归对应的残差模型为 ARIMA\((2,1,0)\times(0,1,1)_{12}\)。</p>
      <h2>结果</h2>
      <p>报告指出，基于线性趋势回归的混合模型在测试集上的 MSE 更低，为 415001.48；相比之下，二次趋势替代模型的 MSE 为 496704.48。报告还给出了未来五个月的预测值：2229.836、2313.898、2113.298、2762.903 和 2407.874 Bcf。</p>
      <h2>洞察 / 收获</h2>
      <p>材料支持的解释是：回归部分负责刻画进口、煤炭和电力发电之间的结构关系，而残差 ARIMA 部分负责处理剩余的序列相关性。</p>
      <h2>局限与未来工作</h2>
      <p>该设计仍然依赖少量外生变量和相对简单的均值规格。自然的后续方向是测试更丰富的外部输入，或者采用其他动态回归形式。</p>
    `,
  },
  "bayesian-statistical-modeling": {
    summary:
      "一个贝叶斯计算项目，围绕 Metropolis-Hastings 的提议分布设计、混合行为和收敛诊断展开。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>该项目研究的是在无法直接采样后验分布的情况下，如何使用 Metropolis-Hastings 进行后验抽样。报告重点关注提议分布如何影响实际的收敛速度与混合效果。</p>
      <h2>问题定义</h2>
      <p>任务是后验抽样，而不是预测。目标是构造一个其平稳分布与目标后验一致的马尔可夫链。</p>
      <h2>数据与设置</h2>
      <p>报告使用的是模拟示例，而不是实证观测数据。它比较了从不同初始值出发的链，并研究了对称与非对称两类提议分布。</p>
      <h2>方法</h2>
      <p>后验目标写为</p>
      <div class="math-block">\[ \pi(\theta \mid y) \propto p(y \mid \theta)\,\pi(\theta). \]</div>
      <p>Metropolis-Hastings 的接受概率为</p>
      <div class="math-block">\[ \alpha(x,x') = \min\left\{1,\frac{\pi(x'\mid y)\,q(x\mid x')}{\pi(x\mid y)\,q(x'\mid x)}\right\}. \]</div>
      <p>当提议分布是对称的，接受规则会简化为 \(\alpha(x,x') = \min\{1,\pi(x'\mid y)/\pi(x\mid y)\}\)。报告研究的一个提议分布是 \(q(x'\mid x)=\mathcal{N}(x,1)\)。</p>
      <h2>结果</h2>
      <p>报告显示，在所示示例中，对称的正态提议和非对称的 Gamma 风格提议都能够收敛。距离目标区域更远初始化的链在起始阶段混合更慢，这一点可以从轨迹图和收敛诊断中看到。</p>
      <h2>洞察 / 收获</h2>
      <p>论文的核心结论是：Metropolis-Hastings 的正确性并不能消除对提议分布设计的实际敏感性。提议分布仍然会显著影响混合行为和收敛速度。</p>
      <h2>局限与未来工作</h2>
      <p>这些示例完全基于模拟，而且范围有意保持得比较窄。下一步自然是将同样的比较应用到更丰富的实际后验问题中，并更系统地探索提议调参。</p>
    `,
  },
  "champaign-rental-price-forecasting": {
    summary:
      "一个 <a href=\"https://stat.illinois.edu/research/mures\" target=\"_blank\" rel=\"noreferrer\">URES</a> 预测项目，比较了基线回归、树模型、稳健回归和 Prophet 在香槟租金指数数据上的表现。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>这篇 <a href="https://stat.illinois.edu/research/mures" target="_blank" rel="noreferrer">URES</a> 论文研究伊利诺伊州香槟市的租金预测问题。当地学生人口占比高，住房市场具有明显的学期周期性。响应变量是香槟市的 Zillow Observed Rent Index（ZORI），论文检验不同预测方法是否能提升该场景下的预测精度。</p>
      <h2>问题定义</h2>
      <p>论文关注的是如何用时间序列分析和数据驱动方法改善香槟市租金预测。预测目标是月度香槟 ZORI，协变量来自经济指标、人口与社会指标、房地产市场指标以及一个外生 COVID-19 影响变量。</p>
      <h2>数据与设置</h2>
      <p>材料说明：年度数据采用前向填充，学期数据重采样后再前向填充，日度数据按月均值聚合，以便所有特征都对齐到月度频率。缺失值使用 <code>IterativeImputer</code> 进行插补，其中“new deaths”变量的前段缺失被单独处理为 0。最终清洗后的数据截取为 2016 年 7 月到 2024 年 7 月。</p>
      <h2>方法</h2>
      <p>论文比较了线性回归、一阶差分 KNN、决策树、Elastic Net、随机森林、XG-Boost、LightGBM、Huber 回归、Prophet 以及若干深度学习基线。论文选择的线性基线为</p>
      <div class="math-block">\[ Y_t = \beta_0 + \beta_1 t + \sum_{m=1}^{11}\gamma_m D_m + \delta_1 Y_{t-1} + \sum_{k=1}^{21}\theta_k X_{k,t} + \varepsilon_t. \]</div>
      <p>对于稳健回归，Huber 损失写为</p>
      <div class="math-block">\[ L_{\delta}(a)=\begin{cases} \frac{1}{2}a^2 & \text{if } |a|\le \delta \\ \delta\cdot \left(|a|-\frac{1}{2}\delta\right) & \text{if } |a|>\delta \end{cases} \]</div>
      <p>其中 \(a=y-f(x)\) 是残差。Prophet 采用如下加性分解：</p>
      <div class="math-block">\[ y(t)=g(t)+s(t)+h(t)+\varepsilon_t. \]</div>
      <p>随后论文给出分段线性趋势 \(g(t)=(k+a(t)^T\delta)t+(m+a(t)^T\gamma)\) 以及傅里叶级数形式的季节项。评估同时采用 n-step-ahead 预测和滚动扩展窗口预测。</p>
      <h2>结果</h2>
      <p>表 1 给出的关键误差为：线性回归 Test MSE 336.92、Rolling MSE 198.51；Huber 回归 Test MSE 456.52、Rolling MSE 186.91；Prophet Test MSE 183.65、Rolling MSE 175.11。论文认为 Prophet 在所有指标上都表现最好，并给出了 2025 年第一季度香槟 ZORI 的预测区间 1324.90 到 1330.11。</p>
      <h2>洞察 / 收获</h2>
      <p>论文的比较结果前后一致：依赖树结构分裂的模型难以外推强趋势，而 Prophet 显式的趋势 + 季节性建模更适合香槟这条序列。</p>
      <h2>局限与未来工作</h2>
      <p>结论部分建议引入外部回归变量，并探索混合模型或深度学习方法。论文同时说明，该框架是为学期驱动需求显著的城市量身定制的，因此其泛化能力仍需要进一步验证。</p>
    `,
  },
  "amazon-food-review-sentiment-analysis": {
    summary:
      "一个大规模 NLP 管线，用于亚马逊食品评论情感分析，并将识别负面评论作为核心业务目标，而不是单纯追求总体准确率。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>该项目起点是一个客户反馈场景：在下游行动中，负面评论往往比正面评论更重要。报告围绕一个高度不平衡的评论语料，重点建立负面情绪检测能力。</p>
      <h2>问题定义</h2>
      <p>任务是对评论文本进行二分类。标签构造为</p>
      <div class="math-block">\[ y_i=\begin{cases} 1 & \text{if } s_i > 3 \\ 0 & \text{if } s_i < 3 \\ \text{excluded} & \text{if } s_i = 3 \end{cases} \]</div>
      <p>其中 \(s_i\) 是评论 \(i\) 的原始评分。中性评论被排除，评估重点放在负类表现而不是总体准确率。</p>
      <h2>数据与设置</h2>
      <p>项目使用 568,454 条 Amazon Fine Food Reviews，并排除中性评分。最终类别分布为 443,777 条正面评论和 124,677 条负面评论。预处理流程在分词、词干提取和标准清洗的基础上保留了否定词。</p>
      <h2>方法</h2>
      <p>核心表示方式是 TF-IDF：</p>
      <div class="math-block">\[ \mathrm{TF\text{-}IDF}(t,d,D)=\mathrm{TF}(t,d)\times \mathrm{IDF}(t,D). \]</div>
      <p>类别权重采用</p>
      <div class="math-block">\[ w_c = \frac{N}{K N_c}. \]</div>
      <p>最终的阈值决策规则为</p>
      <div class="math-block">\[ \hat y=\begin{cases} 1 & \text{if } \hat p \ge \tau \\ 0 & \text{otherwise} \end{cases} \quad \text{with } \tau^*=0.37. \]</div>
      <p>项目比较了 balanced Logistic Regression、ElasticNet 正则、SMOTE、Random Forest 和 soft-voting 集成。</p>
      <h2>结果</h2>
      <p>最佳单模型是 balanced ElasticNet Logistic Regression，并将阈值设为 \(\tau^*=0.37\)。报告给出的指标为：负类 precision 0.750、负类 recall 0.821、负类 F1 0.784、AUC 0.951。soft-voting 集成与最佳 AUC 持平，并提升了负类召回率，但精度略低。</p>
      <h2>洞察 / 收获</h2>
      <p>材料表明，预处理和阈值策略与模型家族同样重要。保留否定词并调整决策阈值，都是最终表现的重要组成部分。</p>
      <h2>局限与未来工作</h2>
      <p>该管线仍然建立在经典文本表示之上，而不是上下文编码器；同时中性评论被完全排除。进一步引入上下文嵌入或更细粒度的情感结构，是很自然的下一步。</p>
    `,
  },
  "conversion-rate-modeling-optimization": {
    summary:
      "一个面向高度不平衡转化问题的建模流程，结合了校准预测、阈值调优和分群层面的动作设计。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>这个项目处理的是一个低转化电商场景，其中只有很小比例的会话会完成转化。报告将问题定义为：找出最可能转化的会话，并将这些预测用于产品和营销的优先级决策。</p>
      <h2>问题定义</h2>
      <p>对于会话 \(i\)，输入为</p>
      <div class="math-block">\[ x_i = (\text{country}_i,\ \text{age}_i,\ \text{new\_user}_i,\ \text{source}_i,\ \text{pages}_i), \]</div>
      <p>二元标签为 \(y_i\in\{0,1\}\)。预测规则基于阈值：</p>
      <div class="math-block">\[ \hat{y}_i(\tau) = \mathbf{1}\{\hat{p}_i \ge \tau\}. \]</div>
      <h2>数据与设置</h2>
      <p>数据包含 316,200 条会话和六个字段：国家、年龄、新用户状态、流量来源、访问页面总数以及是否转化。正类比例约为 3.2%。建模前对分类变量进行 one-hot 编码，对连续变量进行标准化。</p>
      <h2>方法</h2>
      <p>调参后的 logistic 目标函数为</p>
      <div class="math-block">\[ \mathcal{L}(\beta)= -\frac{1}{n}\sum_{i=1}^{n}\left[y_i \log p_i + (1-y_i)\log(1-p_i)\right] + \lambda\left((1-\alpha)\frac{\|\beta\|_2^2}{2}+\alpha\|\beta\|_1\right), \]</div>
      <p>其中 \(p_i = \sigma(x_i^\top \beta)\)。最终选定的模型是 soft-voting 集成，集成对象为 ElasticNet Logistic Regression 与 SVM，权重为 \((12,1)\)，阈值为 \(\tau=0.9323\)。</p>
      <h2>结果</h2>
      <p>最终 soft-voting 模型的 AUC 为 0.9848，转化类 precision 为 0.8198、recall 为 0.7239、F1 为 0.7688。报告还根据预测分数构建了高、中、低倾向性用户分群，用于后续动作设计。</p>
      <h2>洞察 / 收获</h2>
      <p>材料支持两个主要结论：在这个高度不平衡的场景里，阈值策略本身就是建模问题的一部分；同时，返回用户状态与页面浏览量比单纯的流量来源更有解释力。</p>
      <h2>局限与未来工作</h2>
      <p>特征空间仍然较窄，干预建议也更多是推断而非实验验证。下一步很自然的是把这些分数策略连接到下游 A/B 测试。</p>
    `,
  },
  "trm-mechanistic-interpretability": {
    summary:
      "一个针对 Tiny Recursive Model 的稀疏特征可解释性流程，通过因果消融把潜在特征与模型行为联系起来。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>该项目研究 Tiny Recursive Model 如何解决 ARC-AGI-1 谜题，重点不是单纯看输出准确率，而是分析其内部潜在状态。最终交付的核心是基于稀疏自编码器的特征提取与消融分析。</p>
      <h2>问题定义</h2>
      <p>研究问题是：从 TRM 下层潜在表示 \(z_L\) 中提取出的稀疏特征，是否具有行为上的意义？项目通过对稀疏特征排序并做消融，观察谜题预测是否发生变化来回答这一问题。</p>
      <h2>数据与设置</h2>
      <p>实验使用 ARC-AGI-1 数据集以及 <code>arc1concept-aug-1000</code> 设置下的轨迹。消融研究聚焦于 20 个具有代表性的验证谜题。基础 TRM 的设置为：hidden size 512、8 个 attention heads、16-token prefix、6 个 lower-level cycles、3 个 higher-level cycles，以及最多 16 个推理步骤。</p>
      <h2>方法</h2>
      <p>稀疏自编码器对下层潜在表示的编码为</p>
      <div class="math-block">\[ z_n = \operatorname{TopK}_{64}\!\left(\operatorname{ReLU}\!\left(W_{\mathrm{enc}}(z_L - b_{\mathrm{pre}}) + b_{\mathrm{enc}}\right)\right). \]</div>
      <p>解码器将潜在表示重建为</p>
      <div class="math-block">\[ \hat z_L = W_{\mathrm{dec}} z_n + b_{\mathrm{pre}}. \]</div>
      <p>SAE 损失为</p>
      <div class="math-block">\[ \mathcal{L}_{\mathrm{SAE}} = \operatorname{MSE}(\hat z_L, z_L) + \alpha\,\operatorname{MSE}(\hat e, e), \qquad \alpha = \frac{1}{32}. \]</div>
      <p>随后项目按照平均激活与激活频率对特征排序，并执行减法式和重建式两类消融。</p>
      <h2>结果</h2>
      <p>对 20 个谜题进行的渐进式重建扫描显示：按平均激活排序时有 55 次预测变化，按激活频率排序时有 42 次预测变化。报告指出，即使大量 SAE 特征被移除，谜题的粗粒度结构往往仍能保留，而且某些谜题在强消融下也不会变化。</p>
      <h2>洞察 / 收获</h2>
      <p>材料支持一个谨慎的解释：SAE 特征确实影响行为，但消融结果也暗示这些信息可能存在冗余、干扰，或者有一部分关键表征并不在 SAE 对 \(z_L\) 的视角中，尤其是更高层的 \(z_H\)。</p>
      <h2>局限与未来工作</h2>
      <p>当前交付仍然聚焦于 SAE 视角下的分析，而不是完整的 circuit discovery；而且干预管线只针对 \(z_L\)。同时分析 \(z_L\) 与 \(z_H\) 是最清晰的后续方向。</p>
    `,
  },
  "llm-powered-churn-analysis-system": {
    summary:
      "一个端到端流失分析系统，能够用检索增强的 JSON、可验证引用和确定性的风险评分回答自然语言业务问题。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>该项目实现了一个端到端的流失分析系统，把检索增强生成、QLoRA 微调和确定性后处理结合在一起。目标不是只输出一个流失概率，而是对自然语言业务问题给出带引用、结构化的流失分析。</p>
      <h2>问题定义</h2>
      <p>系统接收自然语言查询，检索相关客户记录，并返回一个包含五个必需字段的 JSON 报告：summary、top reasons、risk level、actions 和 citations。论文对系统的评估覆盖 JSON 合法性、字段完整性、类型正确性、引用准确性和风险等级一致性。</p>
      <h2>数据与设置</h2>
      <p>源数据来自 Kaggle Telco Customer Churn 数据集，具有较真实的客户反馈场景。论文报告共有 7,043 条客户记录、21 个结构化特征，流失率为 26.5%（1,869 名流失客户）。每条记录会被转换为统一文档，用 <code>BAAI/bge-base-en-v1.5</code> 编码成 768 维向量，并以 FAISS 的 <code>IndexFlatIP</code> 建索引。生成模型为量化到 4-bit NF4 精度的 <code>Qwen2.5-7B-Instruct</code>。</p>
      <h2>方法</h2>
      <p>检索层通过 Reciprocal Rank Fusion 结合 dense 与 sparse search：</p>
      <div class="math-block">\[ \mathrm{RRF}(d)=\sum_{r\in\{\mathrm{vector},\mathrm{BM25}\}}\frac{w_r}{k+\mathrm{rank}_r(d)}. \]</div>
      <p>论文设定 \(k=60\)，并默认取 top-\(K\) 检索，\(K=5\)。微调部分使用 14B teacher 生成的 305 个训练样本做 QLoRA 训练。LoRA 分解写为</p>
      <div class="math-block">\[ W' = W_0 + \Delta W = W_0 + BA. \]</div>
      <p>前向传播变为</p>
      <div class="math-block">\[ h = W_0x + \frac{\alpha}{r}BAx. \]</div>
      <p>监督微调目标为</p>
      <div class="math-block">\[ \mathcal{L}(\theta;x,y)=-\frac{1}{T}\sum_{t=1}^{T}\log P_\theta(y_t\mid y_{&lt;t},x). \]</div>
      <p>最终流水线再加入引用校验和确定性的风险评分</p>
      <div class="math-block">\[ R_{\mathrm{total}}=0.35R_{\mathrm{churn}}+0.25R_{\mathrm{tenure}}+0.20R_{\mathrm{charge}}+0.20R_{\mathrm{contract}}. \]</div>
      <p>当 \(R_{\mathrm{total}}>0.6\) 时判为高风险，低于 0.3 时判为低风险，其余为中风险。</p>
      <h2>结果</h2>
      <p>论文报告称，微调后引用准确率从 85.0% 降至 70.0%，而风险一致性在基础模型与微调模型上都保持在 60.0%。在加入改进后的流水线后，评估达到了 100% 的 JSON 格式合规率、100% 的引用准确率，以及 92.0% 的总体得分。</p>
      <h2>洞察 / 收获</h2>
      <p>论文的系统性结论是：微调提升了领域分析能力，但也引入了引用回退，因此需要确定性后处理来恢复可追溯性和输出可靠性。</p>
      <h2>局限与未来工作</h2>
      <p>论文指出，公开电信数据集只是原业务场景的近似替代，训练集规模仍然相对有限，而且确定性的风险公式并不完全等同于评估器的风险标准。更大的评估集和更好的校准是最清晰的后续方向。</p>
    `,
  },
  "tool-using-language-models": {
    summary:
      "一项关于小语言模型工具调用对齐的提案性比较，聚焦 SFT、DPO、PPO 和 GRPO。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>该项目系统比较了 SFT、DPO、PPO 和 GRPO 在小语言模型工具使用对齐上的表现。提案特别关注小模型场景，因为现有比较大多集中在大模型，且没有在固定工具使用设定下隔离训练算法本身的作用。</p>
      <h2>问题定义</h2>
      <p>提案将任务定义为：一个小语言模型 \(M\)、一个固定工具集合 \(\mathcal{T}=\{t_1,\ldots,t_k\}\)，以及一个关于需要调用工具的自然语言查询分布 \(\mathcal{D}\)。比较覆盖四种训练范式：SFT、DPO、PPO 和 GRPO。三个评估轴分别是工具调用准确率、训练过程中的奖励稳定性，以及对未见工具使用情境的 OOD 泛化能力。</p>
      <h2>数据与设置</h2>
      <p>提案使用 GPT-nano 作为基础模型、GPT-mini 作为 teacher model。训练数据由 ToolBench-I1 和 GSM8K 轨迹构成，评估覆盖 ToolBench-I3、ToolQA、GSM8K test 和 BFCL。计划中的训练集包含约 12,000 条 ToolBench-I1 样本以及 7,473 条 GSM8K 计算器工具轨迹。</p>
      <h2>方法</h2>
      <p>提案把复合奖励定义为</p>
      <div class="math-block">\[ r = \alpha \cdot r_{\mathrm{select}} + \beta \cdot r_{\mathrm{format}} + \gamma \cdot r_{\mathrm{answer}}. \]</div>
      <p>默认权重为 \(\alpha=0.2\)、\(\beta=0.3\)、\(\gamma=0.5\)。对于 GRPO，提案给出的组相对优势估计为</p>
      <div class="math-block">\[ A_i = \frac{r_i-\mu_G}{\sigma_G+\varepsilon}, \]</div>
      <p>其中每个 prompt 会采样 \(G=8\) 个 completion，\(\mu_G\) 是组内平均奖励，\(\sigma_G\) 是组内标准差。奖励分解消融会在四种配置间变化 \((\alpha,\beta,\gamma)\)，包括二元端到端奖励与完整复合奖励。</p>
      <h2>结果</h2>
      <p>该项目仍处于提案阶段，因此还没有最终 benchmark 表。当前交付物是实验设计本身：固定架构、固定任务族、固定评估协议，以及关于奖励分解和 OOD 测试的明确消融方案。</p>
      <h2>洞察 / 收获</h2>
      <p>提案认为，工具使用奖励在结构上是组合式、稀疏且在训练时部分可验证的。这是当前阶段最重要的设计洞察，也正是评估中分别追踪工具调用准确率、最终答案准确率、奖励稳定性和 OOD gap 的原因。</p>
      <h2>局限与未来工作</h2>
      <p>最明显的局限是项目仍然没有结果。下一步是按计划运行训练实验，完成四种算法的比较，以及奖励分解与 OOD 泛化实验。</p>
    `,
  },
  "trustworthy-rl-llm-reasoning": {
    summary:
      "一个处于提案阶段的 ARC-AGI-1 推理项目，使用精确与稠密网格奖励开展 SFT、RFT 和 DPO 风格训练。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>这门课题项目研究 GPT-nano 在 ARC-AGI-1 任务上的表现，并结合监督微调、基于奖励的微调与 DPO 风格的偏好构造。项目的重点是针对网格预测设计稠密奖励，而不是通用语言生成目标。</p>
      <h2>问题定义</h2>
      <p>每个 ARC 任务都由若干示例输入输出网格和一个测试输入网格组成，并以纯文本形式序列化。模型需要推断隐藏的变换规则，并以相同格式生成输出网格。提案区分了精确评估奖励和稠密训练奖励。</p>
      <h2>数据与设置</h2>
      <p>提案使用官方 400 个公开 ARC-AGI-1 训练任务，并拆分成 350 个训练任务和 50 个留出的验证任务。GPT-mini 被用于生成监督微调样本，只有那些预测输出网格与 gold answer 完全一致的 completion 才会保留用于 SFT。</p>
      <h2>方法</h2>
      <p>材料中定义了两种奖励。评估奖励为</p>
      <div class="math-block">\[ r_{\mathrm{eval}}(\hat{y}, y^*) = \mathbf{1}\left[\hat{y}=y^*\right]. \]</div>
      <p>稠密训练奖励为</p>
      <div class="math-block">\[ r_{\mathrm{train}}(\hat{y},y^*)=\frac{1}{H\cdot W}\sum_{i=1}^{H}\sum_{j=1}^{W}\mathbf{1}[\hat{y}_{ij}=y^*_{ij}]. \]</div>
      <p>提案指出 \(r_{\mathrm{train}}=1 \Leftrightarrow r_{\mathrm{eval}}=1\)，因此稠密奖励与精确匹配评估保持一致，同时提供更细粒度的学习信号。对于 DPO 配对生成，项目在每个训练任务上采样 \(G=8\) 个 completion，并把得分最高者作为 \(y^+\)，得分最低者作为 \(y^-\)。</p>
      <h2>结果</h2>
      <p>该项目同样还处于提案阶段，因此没有最终的实证 benchmark。当前的具体成果是任务定义、奖励设计，以及用于比较 SFT、RFT/PPO 风格训练和 DPO 的偏好对构造流程。</p>
      <h2>洞察 / 收获</h2>
      <p>提案最重要的设计选择，是避免只依赖精确匹配奖励进行训练。相反，训练阶段使用 cell-level accuracy，使得即便是部分正确的网格预测也能提供有效优化信号。</p>
      <h2>局限与未来工作</h2>
      <p>当前工作仍是 pre-results。下一阶段是按照提案中的奖励定义，真正实现并比较 SFT、RFT 和 DPO。</p>
    `,
  },
  pennos: {
    summary:
      "一个类 UNIX 的客体操作系统，在单一一致状态模型中整合了调度、进程管理、shell 交互与 FAT 风格文件系统。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>PennOS 是一个运行在单一宿主进程内部的类 UNIX 客体操作系统。项目 README 将其描述为一个围绕标准 UNIX 风格子系统构建的系统，包括基础优先级调度器、FAT 文件系统和用户 shell 交互。</p>
      <h2>问题定义</h2>
      <p>系统层面的问题是如何让调度、进程管理、shell 控制和文件系统操作在同一个客体 OS 中协同工作。项目文档把进程模型、调度器、系统调用、shell 和 PennFAT 层都描述为核心子系统。</p>
      <h2>数据与设置</h2>
      <p>README 说明，每个 PennOS “进程”都实现为一个 <code>spthread</code>，其 PCB 存储 PID、PPID、线程句柄、优先级、状态、文件描述符、信号与子进程元数据。内核维护就绪队列、阻塞队列、停止队列和僵尸队列，以及进程表和当前进程指针。</p>
      <h2>方法</h2>
      <p>调度器使用 <code>SIGALRM</code> 产生 100 ms 时钟 tick，并在三个优先级层之间采用 9:6:4 的加权轮转策略。文件系统则采用 FAT 风格布局，包括 FAT 区、数据区、扁平根目录、链式块结构以及 3-bit 权限模型。shell 负责解析、任务控制、I/O 重定向，并提供 <code>ps</code>、<code>kill</code>、<code>nice</code>、<code>sleep</code>、<code>cat</code>、<code>ls</code>、<code>touch</code>、<code>cp</code>、<code>rm</code> 和 <code>chmod</code> 等内建命令。</p>
      <h2>结果</h2>
      <p>文档列出了进程创建、等待、信号、定时阻塞、任务控制、shell 重定向以及集成式 PennFAT 操作等已实现功能。FAT 工具可以独立以 <code>bin/pennfat</code> 运行，而集成 OS 则在启动时通过 <code>bin/pennos myfs</code> 挂载文件系统镜像。</p>
      <h2>洞察 / 收获</h2>
      <p>代码库围绕清晰的子系统边界组织：FAT core、kernel 层、系统调用层，以及 shell/command 层。配套文档也明确把这种模块化分层作为项目的架构理由。</p>
      <h2>局限与未来工作</h2>
      <p>按照文档所述，PennOS 仍然是一个运行在简化宿主进程环境中的课程级操作系统实现。更强的故障处理、更大规模的压力测试以及更丰富的多进程工作负载，都是自然的后续扩展方向。</p>
    `,
  },
  penncloud: {
    summary:
      "一个正在推进中的分布式云平台项目，围绕无状态前端、复制式键值存储，以及从基础服务走向容错架构的集成路线展开。",
    body: String.raw`
      <h2>背景 / 动机</h2>
      <p>PennCloud 是一个正在推进中的分布式云平台项目，包含三层：前端负载均衡器、无状态前端服务器和分布式后端键值存储。项目提案将系统定位为用户账户、webmail、drive 和 admin console 的基础平台。</p>
      <h2>问题定义</h2>
      <p>核心设计问题是：当复制、基于协调器的元数据管理和节点故障处理逐步加入底层系统时，如何保持应用服务仍然可用。提案明确将协调器移出正常数据操作的关键路径：实际的 GET/PUT/CPUT/DELETE 请求由前端服务器直接发送到存储节点。</p>
      <h2>数据与设置</h2>
      <p>提案与进展日志说明，前端服务器是无状态的，并通过持久 TCP 连接与后端节点通信，使用的文本协议形式例如 <code>PUT row col &lt;len&gt;\r\n&lt;bytes&gt;</code>。Ricky 负责的范围包括前端 HTTP 基础设施、负载均衡、用户账户以及跨层集成。进展日志显示，后端 KV、前端 HTTP、用户账户、webmail 和 drive 的最小可用版本都已完成，而复制式 KV、故障检测等组件仍在推进中。</p>
      <h2>方法</h2>
      <p>提案选择了基于 primary 的复制方案，每个 tablet 的目标副本数为 3，同时使用协调器心跳进行故障检测、checkpoint 加 WAL 的恢复机制，以及按 row-key 范围划分 tablet。进展日志还记录了具体的前端集成细节，包括在 <code>connect_backend()</code> 中消费后端 banner 行、实现 cookie-based session，以及用 CPUT 重试循环安全更新 webmail 和 drive 的索引列。</p>
      <h2>结果</h2>
      <p>截至 2026-04-04 的进展日志，已完成的部分包括：支持 GET/POST/HEAD、cookie 和持久连接的多线程前端 HTTP 服务器；支持 PUT/GET/CPUT/DELETE 的后端 KV 服务器；用户登录与注册；最小化内部 webmail；以及最小化 drive 上传/下载。chunked transfer encoding、前端负载均衡、复制式 KV、admin console 以及更完整的 webmail/drive 功能仍列在未完成项中。</p>
      <h2>洞察 / 收获</h2>
      <p>材料强调了显式的 schema 与接口设计。例如，使用 <code>mail:&lt;username&gt;.__index__</code> 作为收件箱索引、使用 UUID 作为 drive row key、可配置的 heartbeat 间隔，以及在后端连接失败后通过协调器进行前端重试。</p>
      <h2>局限与未来工作</h2>
      <p>该项目仍在进行中。提案与进展笔记把复制式 KV、故障转移、恢复、chunked transfer encoding、负载均衡、管理工具，以及完整的应用服务列为主要剩余里程碑。</p>
    `,
  },
};

const getLocalizedNarrative = (slugValue) => {
  const englishNarrative = detailNarratives[slugValue] || {};
  const chineseNarrative = detailNarrativesZh[slugValue] || {};
  return {
    summary: localized(englishNarrative.summary, chineseNarrative.summary),
    body: localized(englishNarrative.body, chineseNarrative.body),
  };
};

if (!project) {
  const shell = shellCopy[locale] || shellCopy.en;
  setNodeText("detail-category", shell.notFoundCategory);
  setNodeText("detail-title", shell.notFoundTitle);
  setNodeText("detail-subtitle", shell.notFoundSubtitle);
  setNodeText("detail-summary", shell.notFoundSummary);
} else {
  const narrative = getLocalizedNarrative(project.slug);
  const pageTitle = getProjectField(project, "title");
  document.title = `${pageTitle} | ${locale === "zh" ? "宫商羽" : "Shangyu Gong"}`;
  setNodeText("detail-category", translateCategory(project.primaryCategory));
  setNodeText("detail-title", pageTitle);
  setNodeText("detail-subtitle", getProjectField(project, "subtitle"));
  setNodeHtml(
    "detail-summary",
    narrative.summary ||
      getProjectField(project, "detailSummary") ||
      localized(
        "This page is being expanded into a full narrative after a complete read of the project materials.",
        "这个页面正在根据完整项目材料逐步扩展为更完整的叙述。"
      )
  );

  const resourceRow = document.getElementById("detail-resource-row");
  if (resourceRow) {
    resourceRow.innerHTML = project.resources
      .map(
        (resource) => `
          <a class="detail-resource-button" href="${resource.href}" target="_blank" rel="noreferrer">${translateResourceLabel(resource.label)}</a>
        `
      )
      .join("");
  }

  const metaRow = document.getElementById("detail-meta-row");
  if (metaRow) {
    metaRow.innerHTML = `
      <span class="pill">${project.yearLabel}</span>
      ${project.tags
        .slice(0, 3)
        .map((tag) => `<span class="pill">${translateTag(tag)}</span>`)
        .join("")}
    `;
  }

  const detailArticle = document.getElementById("detail-article");
  if (detailArticle) {
    const narrativeHtml = narrative.body || "";
    const sectionNarrative = buildNarrativeFromSections(project);
    detailArticle.innerHTML =
      narrativeHtml ||
      sectionNarrative ||
      localized(
        "<p>This project detail page is being expanded into a full narrative after a complete read of the underlying materials.</p>",
        "<p>这个项目详情页正在根据底层材料逐步扩展为更完整的叙述。</p>"
      );
  }

  typesetMath();
  window.addEventListener("load", typesetMath, { once: true });
}

window.addEventListener("site-locale-change", () => {
  window.location.reload();
});
