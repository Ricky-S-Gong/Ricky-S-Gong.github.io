const siteData = {
  heroName: "Shangyu Gong",
  heroTagline: "Data Science, Product Analytics, LLM, Machine Learning",
  heroSubtitle: "M.S.E. in Data Science @ Penn",
  heroSubtitleHref: "https://dats.seas.upenn.edu/",
  heroSummary:
    "I focus on using rigorous modeling and analytical methods to help teams turn complex problems into clear, actionable business decisions. Across edtech, SaaS platforms, finance, and real estate contexts, I have worked on A/B testing, causal inference, predictive modeling, dashboards, and end-to-end data workflows, and over time I have developed an analytical style that turns ambiguity into interpretable, executable conclusions. I strongly believe real value comes from deep business understanding, not blind admiration for complex tools.",
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
    'Hi there 😉. I am Shangyu Gong, and you can also call me Ricky. I am currently pursuing an M.S.E. in Data Science at the University of Pennsylvania, where my work increasingly sits at the intersection of analytics, machine learning, and decision-making under real-world constraints. My graduate coursework has focused on big data analytics, trustworthy machine learning, deep learning, generative AI and LLMs, operating systems, and distributed systems, which has pushed me to think not only about model quality but also about reliability, scalability, and how analytical work actually gets operationalized.',
    'Before Penn, I studied Statistics and Economics at the University of Illinois Urbana-Champaign, with minors in Mathematics and Computer Science. Along the way, I built a technical base across statistical learning, Bayesian analysis, time series, causal inference, design of experiments, econometrics, databases, algorithms, deep learning, and computer vision. My undergraduate research perspective was shaped by mentors including <a href="https://jkcshea.github.io/" target="_blank" rel="noreferrer">Prof. Joshua Shea</a>, <a href="https://www.songlena.com/" target="_blank" rel="noreferrer">Prof. Lena Song</a>, <a href="https://experts.illinois.edu/en/persons/hyoeun-lee/" target="_blank" rel="noreferrer">Prof. Hyoeun Lee</a>, <a href="https://economics.illinois.edu/profile/dafontes" target="_blank" rel="noreferrer">Prof. Daniela Fontes</a>, and <a href="https://sites.google.com/a/illinois.edu/eunyichung/" target="_blank" rel="noreferrer">Prof. EunYi Chung</a>. My research spanned labor economics, social media, housing markets, macro forecasting, and policy evaluation. Across that research, I developed a strong foundation in causal inference and empirical economics, including IV, Bartik IV, 2SLS, event-study design, and difference-in-differences. I graduated from UIUC as a Bronze Tablet Scholar, the university\'s highest academic honor for undergraduates, and Summa Cum Laude.',
    "In industry, I see myself as a practitioner who translates business ambiguity into analytical structure. I am strongest when a team has a product, growth, retention, or operational question that needs more than just reporting. I have come to believe that for a data scientist, understanding the business deeply matters more than knowing one more complex model or one more advanced tool, which is why I have deliberately pursued internships to build sharper product instinct and commercial judgment. That usually means clarifying the decision, defining the right metrics, building experiments or models that match the business risk, and communicating outputs in a way that product managers, operators, or executives can actually use.",
    "Outside of work, I enjoy guandan, hiking, cooking, exploring restaurants, and playing badminton. These parts of my life let me move across different rhythms and states of mind, and over time they have shaped the way I think about life. I have long believed that doing my best work depends on more than technical ability alone: it comes from physical well-being, a genuine love of life, and the social process of learning how to relate to different kinds of people. Those things help me work at a higher level, stay connected to the world, understand others more deeply, and know myself more clearly over time.",
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
      title: "Minimum Wage Shocks on Unemployment",
      org: 'Independent Research under <a href="https://sites.google.com/a/illinois.edu/eunyichung/" target="_blank" rel="noreferrer">Prof. EunYi Chung</a>, Department of Economics, UIUC',
      period: "Jan 2025 - May 2025",
      body:
        "I built a county-month unemployment panel for California and New York from BLS data to study California's 2021 minimum wage increase as a quasi-experiment. The project pushed me to treat causal inference as a design problem rather than a regression exercise: I estimated the ATT with DiD under TWFE, checked parallel trends with state-specific polynomial pre-trend regressions, ran placebo dates and alternative-outcome tests, and used triple interactions to probe county-level heterogeneity. What stayed with me most was how much credibility comes from doing the unglamorous work around identification, robustness, and interpretation.",
    },
    {
      title: "AI Content Detection and Diffusion on Social Media",
      org: 'Research Assistant for <a href="https://www.songlena.com/" target="_blank" rel="noreferrer">Prof. Lena Song</a>, Department of Economics, UIUC',
      period: "Jun 2024 - Nov 2024",
      body:
        "For this project, I worked on the measurement side of a fast-moving research question: how much AI-generated content was actually diffusing through Reddit communities after the launches of ChatGPT and GPT-4. I helped build a 111 GB Reddit panel from much larger Academic Torrents archives, designed stratified subreddit-month sampling, and implemented a GPTZero-based detection pipeline over more than 62,000 posts. Beyond the event-study analysis itself, I also ran controlled placement experiments to understand when the detector systematically understated mixed AI-human content, and supported related annotation and field-experiment work with reproducible reporting for the PI.",
    },
    {
      title: "US Inflation Forecasting in a Data-Rich Environment",
      org: 'Economics Data Lab under <a href="https://economics.illinois.edu/profile/dafontes" target="_blank" rel="noreferrer">Prof. Daniela Fontes</a> and <a href="https://sites.google.com/site/marcelocmedeiros" target="_blank" rel="noreferrer">Prof. Marcelo Medeiros</a>, UIUC',
      period: "Jan 2024 - May 2024",
      body:
        "This project sat at the intersection of macroeconomics, forecasting, and high-dimensional modeling. Following the data-rich forecasting literature, I built a FRED pipeline with TCODE transformations across 89 macroeconomic series and compared benchmark models such as Random Walk, ARIMA, and UCSV against shrinkage estimators including Ridge, LASSO, and Elastic Net. The work taught me to think carefully about what different models assume about persistence, sparsity, and multicollinearity, and why forecasting performance often depends as much on disciplined data preparation as on model choice.",
    },
    {
      title: "Gender Ratio Effects on Female Labor Force Participation",
      org: 'Independent Research under <a href="https://jkcshea.github.io/" target="_blank" rel="noreferrer">Prof. Joshua Shea</a>, Department of Economics, UIUC',
      period: "Jan 2024 - May 2024",
      body:
        "I constructed a cross-country panel for the United States, Germany, Australia, and Canada to study whether gender imbalance affects female labor force participation. The empirical strategy used sex ratio at birth lagged 20-30 years as an instrument for adult gender ratio, with country and year fixed effects and cluster-robust inference. Working through that project deepened my intuition for identification in applied microeconomics: the interesting part was not only estimating 2SLS, but thinking through why the instrument could plausibly move current matching conditions without being driven by contemporaneous labor-market shocks.",
    },
    {
      title: "Nutrition Label Education and Consumer Diet Choices",
      org: 'SURF Fellow under <a href="https://www.shuyangsi.com/" target="_blank" rel="noreferrer">Prof. Shuyang Si</a>, Department of Economics, XJTLU',
      period: "Jun 2022 - Aug 2022",
      body:
        "I designed and analyzed a randomized survey experiment on whether nutrition-label education changes consumers' willingness to pay for healthier products. The project combined survey design, treatment construction, baseline-balance checks, and a difference-in-differences specification with demographic controls to evaluate both revealed willingness to pay and nutrition knowledge acquisition. It was an early research experience that made experimental design feel concrete to me: a good intervention study depends just as much on careful measurement and control design as on the final regression table.",
    },
  ],
  teaching: [
    {
      title: "Teaching Assistant",
      org: "UPenn CIS 2450 Big Data Analytics",
      period: "Jan 2026 - May 2026",
      body:
        "This course is centered on a systems view of analytics: how to turn large, messy data into usable knowledge when a single machine is no longer enough. My teaching work fits naturally with how I approach research. I help students connect data wrangling, scalable programming models, distributed computation, and statistical machine learning rather than treating them as separate topics. What I value most in the course is that it frames analytics as an end-to-end workflow, where data engineering, parallel execution, and model design all have to work together for filtering, graph analysis, clustering, classification, and other common large-scale tasks to be genuinely useful.",
    },
    {
      title: "Economics Tutor",
      org: "UIUC Economics Tutoring Center",
      period: "Aug 2024 - Jan 2025",
      body:
        "I worked with students through the UIUC Economics Tutoring Center on post-class support across calculus, linear algebra, statistics, and econometrics. The role focused on helping students work through assignments, reinforce technical foundations, and connect mathematical tools to the kinds of empirical reasoning used in economics courses.",
    },
  ],
  contactBooking: [
    {
      label: "Schedule Coffee Chat",
      detail: "Choose a time directly through my Google Calendar booking page.",
      href: "https://calendar.app.google/xYadJnFyvrpuWXcSA",
      icon: "calendar",
      tone: "mint",
      newTab: true,
    },
    {
      label: "Resume Request",
      detail: "Request a copy of my resume without exposing it publicly on the site.",
      href: "mailto:sgong.recruiting@gmail.com?subject=Resume%20Request&body=Hi%20Ricky%2C%0A%0AI%27d%20love%20to%20request%20a%20copy%20of%20your%20resume.%0A%0AHere%20is%20some%20context%20on%20my%20interest%20or%20role%3A%0A%0AThanks%21",
      icon: "resume",
      tone: "slate",
    },
  ],
  contacts: [
    {
      label: "Email",
      href: "mailto:sgong.recruiting@gmail.com",
      icon: "email",
      tone: "mint",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shangyu-ricky-gong",
      icon: "linkedin",
      tone: "blue",
    },
    {
      label: "GitHub",
      href: "https://github.com/Ricky-S-Gong",
      icon: "github",
      tone: "slate",
    },
  ],
};

const siteDataZh = {
  heroName: "宫商羽",
  heroTagline: "数据科学、产品分析、LLM、机器学习",
  heroSubtitle: "宾夕法尼亚大学 · 数据科学硕士",
  heroSummary:
    "我专注于用严谨的建模和分析方法，帮助团队把复杂问题转化为清晰、可执行的业务决策。围绕教育科技、SaaS 平台、金融和房地产等场景，我做过 A/B 测试、因果推断、预测建模、仪表板搭建以及端到端数据流程建设，也逐渐形成了把模糊问题梳理成可解释、可执行分析结论的工作方范式。我坚信，真正的价值来自对业务的深刻理解，而不是对复杂工具的盲目崇拜。",
  heroLinks: [
    { label: "领英", href: "https://www.linkedin.com/in/shangyu-ricky-gong", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/Ricky-S-Gong", icon: "github" },
    { label: "邮箱", href: "mailto:sgong.recruiting@gmail.com", icon: "email" },
  ],
  homeAbout: [
    "你好 😉 我是宫商羽，你也可以叫我 Ricky。我目前在宾夕法尼亚大学攻读数据科学硕士，最近的学习和项目越来越集中在分析、机器学习，以及真实业务约束下的决策问题交叉处。研究生阶段的课程主要覆盖大数据分析、可信机器学习、深度学习、生成式 AI 与 LLM、操作系统和分布式系统，这也让我不仅关注模型效果，更关注可靠性、可扩展性，以及分析工作如何真正被落地。",
    '在 Penn 之前，我在伊利诺伊大学厄巴纳-香槟分校主修统计学与经济学，并辅修数学和计算机科学。一路以来，我系统学习了统计学习、贝叶斯分析、时间序列、因果推断、实验设计、计量经济学、数据库、算法、深度学习和计算机视觉。我的本科研究视角深受多位导师影响，包括 <a href="https://jkcshea.github.io/" target="_blank" rel="noreferrer">Joshua Shea 教授</a>、<a href="https://www.songlena.com/" target="_blank" rel="noreferrer">Lena Song 教授</a>、<a href="https://experts.illinois.edu/en/persons/hyoeun-lee/" target="_blank" rel="noreferrer">Hyoeun Lee 教授</a>、<a href="https://economics.illinois.edu/profile/dafontes" target="_blank" rel="noreferrer">Daniela Fontes 教授</a> 和 <a href="https://sites.google.com/a/illinois.edu/eunyichung/" target="_blank" rel="noreferrer">EunYi Chung 教授</a>。我的研究覆盖劳动经济学、社交媒体、住房市场、宏观预测和政策评估，也由此建立了扎实的因果推断与实证经济学基础，包括 IV、Bartik IV、2SLS、事件研究设计和双重差分。我以 UIUC Bronze Tablet Scholar（本科最高学术荣誉之一）及 Summa Cum Laude 毕业。',
    "在行业场景里，我更把自己看作一个能把业务模糊性转化为分析结构的实践型数据科学家。我最擅长的场景，是团队面对一个产品、增长、留存或运营问题，单靠报表并不能回答，而需要把决策、指标、实验或模型系统化。我越来越相信，对数据科学家来说，真正理解业务，往往比多掌握一个复杂模型或一个新工具更重要，所以我也刻意通过实习去训练更强的产品直觉和商业判断。对我来说，这通常意味着先澄清要支持的决策，再定义合适的指标，选择与业务风险匹配的方法，最后把结果讲清楚，让产品经理、运营或管理层真正能用。",
    "工作之余，我也喜欢掼蛋、徒步、做饭、探索餐厅，也会打羽毛球。这些事情让我在不同的节奏和状态中切换，也逐渐塑造了我的生活哲学。一直以来，我都相信，只有健康的体魄、对生活的热爱，以及与不同人相处的社会化过程，才能让我更出色地工作，更持续地感受世界、理解他人，并更清楚地认识自己。",
  ],
  research: [
    {
      title: "最低工资冲击对失业的影响",
      org: '在 UIUC 经济系 <a href="https://sites.google.com/a/illinois.edu/eunyichung/" target="_blank" rel="noreferrer">EunYi Chung 教授</a> 指导下的独立研究',
      period: "2025年1月 - 2025年5月",
      body:
        "我基于 BLS 数据构建了加州与纽约的 county-month 失业面板，用来研究加州 2021 年最低工资上调这一准自然实验。这个项目让我真正把因果推断当作研究设计问题，而不是单纯的回归练习：我用 TWFE 下的 DiD 估计 ATT，使用州特定多项式预趋势回归检查平行趋势，做了 placebo 日期和替代结果检验，并通过三重交互探索县层面的异质性。这个项目最深刻的收获，是认识到识别策略、稳健性检验和解释框架这些“看起来不华丽”的部分，才真正决定结果是否可信。",
    },
    {
      title: "社交媒体中 AI 内容检测与扩散",
      org: 'UIUC 经济系 <a href="https://www.songlena.com/" target="_blank" rel="noreferrer">Lena Song 教授</a> 的研究助理',
      period: "2024年6月 - 2024年11月",
      body:
        "这个项目里，我主要负责一个快速变化研究问题中的测量部分：在 ChatGPT 和 GPT-4 发布后，AI 生成内容究竟在 Reddit 社区中扩散到了什么程度。我参与把更大规模的 Academic Torrents 档案整理成 111GB 的 Reddit 面板，设计 subreddit-month 分层抽样，并在 6.2 万多条帖子上实现基于 GPTZero 的检测流程。除了事件研究分析本身，我还做了受控 placement 实验，研究检测器在 AI-human 混合内容场景下何时会系统性低估 AI 比例，并支持了相关标注和 field experiment 的可复现报告工作。",
    },
    {
      title: "数据富集环境下的美国通胀预测",
      org: 'UIUC Economics Data Lab，<a href="https://economics.illinois.edu/profile/dafontes" target="_blank" rel="noreferrer">Daniela Fontes 教授</a> 与 <a href="https://sites.google.com/site/marcelocmedeiros" target="_blank" rel="noreferrer">Marcelo Medeiros 教授</a> 指导',
      period: "2024年1月 - 2024年5月",
      body:
        "这个项目处在宏观经济学、预测和高维建模的交叉处。沿着 data-rich forecasting 文献的思路，我构建了包含 89 条宏观序列和 TCODE 变换的 FRED 流水线，并比较了 Random Walk、ARIMA、UCSV 等基准模型以及 Ridge、LASSO、Elastic Net 等收缩估计方法。这个过程让我更清楚地理解，不同模型分别对持续性、稀疏性和多重共线性做了什么假设，也让我意识到预测效果往往同样依赖于纪律严明的数据准备，而不仅仅是模型本身。",
    },
    {
      title: "性别比例对女性劳动参与率的影响",
      org: '在 UIUC 经济系 <a href="https://jkcshea.github.io/" target="_blank" rel="noreferrer">Joshua Shea 教授</a> 指导下的独立研究',
      period: "2024年1月 - 2024年5月",
      body:
        "我构建了覆盖美国、德国、澳大利亚和加拿大的跨国面板，用来研究性别失衡是否会影响女性劳动参与率。识别策略使用滞后 20-30 年的出生性别比作为成年性别比的工具变量，并加入国家和年份固定效应以及 cluster-robust 推断。这个项目加深了我对应用微观识别策略的理解：真正重要的不只是跑出 2SLS，而是认真思考为什么这个工具变量能改变当前匹配条件，同时又不应被当期劳动市场冲击直接驱动。",
    },
    {
      title: "营养标签教育与消费者健康饮食选择",
      org: '西交利物浦大学经济系 <a href="https://www.shuyangsi.com/" target="_blank" rel="noreferrer">Shuyang Si 教授</a> 指导下的 SURF Fellow',
      period: "2022年6月 - 2022年8月",
      body:
        "我设计并分析了一项随机问卷实验，研究营养标签教育是否会改变消费者为更健康产品支付溢价的意愿。项目同时涉及问卷设计、处理组构建、基线平衡检验，以及带有人口统计控制变量的双重差分设定，用来评估消费者的支付意愿和营养知识变化。这是我较早的一段研究经历，也让我第一次真正体会到：好的实验研究并不只是最后那张回归表，而是从干预设计、测量方式到控制设置都要严谨。",
    },
  ],
  teaching: [
    {
      title: "助教",
      org: "宾夕法尼亚大学 CIS 2450 Big Data Analytics",
      period: "2026年1月 - 2026年5月",
      body:
        "这门课强调一种系统化的数据分析视角：当单机已经不够用时，如何把大规模、杂乱的数据真正转化为可用知识。我的教学工作也和我自己的研究方法很一致：我会帮助学生把数据清洗、可扩展编程模型、分布式计算和统计机器学习看成一个整体，而不是孤立模块。这门课最吸引我的地方，在于它把 analytics 理解为端到端工作流，要求数据工程、并行执行和模型设计一起协同，才能让过滤、图分析、聚类和分类等大规模任务真正有用。",
    },
    {
      title: "经济学导师",
      org: "UIUC Economics Tutoring Center",
      period: "2024年8月 - 2025年1月",
      body:
        "我在 UIUC Economics Tutoring Center 为学生提供课后辅导，内容覆盖微积分、线性代数、统计和计量经济学。这个角色主要是帮助学生梳理作业、夯实技术基础，并把数学工具和经济学课程中的实证推理真正连接起来。",
    },
  ],
  contactBooking: [
    {
      label: "预约交流",
      detail: "可以直接通过我的 Google Calendar 预约页面选择合适的时间。",
      href: "https://calendar.app.google/xYadJnFyvrpuWXcSA",
      icon: "calendar",
      tone: "mint",
      newTab: true,
    },
    {
      label: "请求简历",
      detail: "如果你需要简历，可以私下向我索取；我不会把简历公开放在网站上。",
      href: "mailto:sgong.recruiting@gmail.com?subject=Resume%20Request&body=Hi%20Ricky%2C%0A%0AI%27d%20love%20to%20request%20a%20copy%20of%20your%20resume.%0A%0AHere%20is%20some%20context%20on%20my%20interest%20or%20role%3A%0A%0AThanks%21",
      icon: "resume",
      tone: "slate",
    },
  ],
  contacts: [
    { label: "邮箱", href: "mailto:sgong.recruiting@gmail.com", icon: "email", tone: "mint" },
    { label: "领英", href: "https://www.linkedin.com/in/shangyu-ricky-gong", icon: "linkedin", tone: "blue" },
    { label: "GitHub", href: "https://github.com/Ricky-S-Gong", icon: "github", tone: "slate" },
  ],
};

const siteChrome = {
  en: {
    nav: { home: "Home", projects: "Projects", research: "Research", contact: "Contact" },
    aboutHeading: "About Me",
    projectsTag: "Portfolio",
    projectsHeading: "Selected Projects",
    projectsIntro:
      "This section brings together the projects that best represent how I think and work, organized by toolkit so it is easy to move between causal analysis, modeling, language systems, and infrastructure-oriented builds.",
    researchHeading: "Research",
    teachingHeading: "Teaching",
    contactTag: "Contact",
    contactHeading: "Connect, coffee chats, and potential opportunities.",
    contactCopy:
      "If you'd like to connect, you can schedule a conversation, request my resume privately, or follow up by email or social media.",
    documentTitle: "Shangyu Gong | Data Portfolio",
    metaDescription: "Portfolio site for Shangyu Gong featuring data projects, research, and teaching.",
  },
  zh: {
    nav: { home: "首页", projects: "项目", research: "研究", contact: "联系" },
    aboutHeading: "关于我",
    projectsTag: "作品集",
    projectsHeading: "精选项目",
    projectsIntro:
      "这里汇集了最能代表我思考方式和工作风格的项目，并按工具与方法分组，方便在因果分析、建模、语言系统和基础设施类构建之间快速切换。",
    researchHeading: "研究",
    teachingHeading: "教学",
    contactTag: "联系",
    contactHeading: "欢迎联系、预约 coffee chat，或交流合作机会。",
    contactCopy:
      "如果你希望联系我，可以直接预约交流、私下索取简历，或通过邮件和社交媒体进一步联系我。",
    documentTitle: "宫商羽 | 数据作品集",
    metaDescription: "宫商羽的个人作品集网站，包含项目、研究与教学内容。",
  },
};

const assetVersion = "20260406-home-tabs-112";
const projectCatalog = window.projectCatalog || { categories: [], projects: [] };
const realProjectCovers = {
  "minimum-wage-unemployment": {
    src: "./assets/project-covers-real/minimum-wage-coins-illustration.png",
    position: "center 56%",
    textTone: "light",
  },
  "nutrition-label-diet-choices": {
    src: "./assets/project-covers-real/nutrition-diet-vs-zero-banner.jpg",
    position: "center center",
    overlay: "linear-gradient(180deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.04))",
    textTone: "dark",
  },
  "email-funding-conversion-experiment": {
    src: "./assets/project-covers-real/email-funding-conversion-experiment.jpg",
    position: "center center",
    textTone: "light",
  },
  "bgm-focused-task-performance": {
    src: "./assets/project-covers-real/bgm-focused-task-performance.jpg",
    position: "center center",
    textTone: "light",
  },
  "natural-gas-consumption-forecasting": {
    src: "./assets/project-covers-real/natural-gas-consumption-forecasting.jpg",
    position: "center center",
    textTone: "light",
  },
  "bayesian-statistical-modeling": {
    src: "./assets/project-covers-real/bayesian-statistical-modeling.jpg",
    position: "center center",
    textTone: "light",
  },
  "champaign-rental-price-forecasting": {
    src: "./assets/project-covers-real/champaign-rental-price-forecasting.jpg",
    position: "center center",
    textTone: "light",
  },
  "amazon-food-review-sentiment-analysis": {
    src: "./assets/project-covers-real/amazon-food-review-sentiment-analysis.jpg",
    position: "center center",
    textTone: "light",
  },
  "trm-mechanistic-interpretability": {
    src: "./assets/project-covers-real/trm-transformer-illustration.png",
    position: "center center",
    textTone: "light",
  },
  "llm-powered-churn-analysis-system": {
    src: "./assets/project-covers-real/llm-powered-churn-rag-pipeline.webp",
    position: "center 54%",
    overlay: "linear-gradient(180deg, rgba(4, 13, 24, 0.03), rgba(4, 13, 24, 0.16))",
    textTone: "dark",
  },
  "tool-using-language-models": {
    src: "./assets/project-covers-real/tool-using-language-models-agent-workflow.webp",
    position: "center center",
    overlay: "linear-gradient(180deg, rgba(4, 13, 24, 0.03), rgba(4, 13, 24, 0.16))",
    textTone: "dark",
  },
  "trustworthy-rl-llm-reasoning": {
    src: "./assets/project-covers-real/trustworthy-rl-llm-reasoning.svg",
    position: "center center",
    textTone: "light",
  },
  pennos: {
    src: "./assets/project-covers-real/pennos-monolithic-kernel.svg",
    position: "center center",
    overlay: "linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.08))",
    textTone: "dark",
    canvasTone: "white",
  },
  penncloud: {
    src: "./assets/project-covers-real/penncloud.jpg",
    position: "center center",
    textTone: "light",
  },
  "conversion-rate-modeling-optimization": {
    src: "./assets/project-covers-real/conversion-rate-modeling-optimization.jpg",
    position: "center center",
    textTone: "light",
  },
};

const getLocale = () => window.__siteLocale?.getLocale() || "en";
const pickLocale = (value) => window.__siteLocale?.pick(value) || value;
const getActiveSiteData = () => (getLocale() === "zh" ? { ...siteData, ...siteDataZh } : siteData);
const getSiteChrome = () => siteChrome[getLocale()] || siteChrome.en;
const getCategoryTitle = (category) => (getLocale() === "zh" ? category.titleZh || category.title : category.title);
const getCategoryDescription = (category) =>
  getLocale() === "zh" ? category.descriptionZh || category.description : category.description;
const getProjectField = (project, key) =>
  getLocale() === "zh" ? project[`${key}Zh`] || project[key] : project[key];
const getProjectTags = (project) => (getLocale() === "zh" ? project.tagsZh || project.tags : project.tags);
const getProjectStatusLabel = (project) => (getLocale() === "zh" ? project.statusZh || project.status : project.status);

const setText = (id, text) => {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
};

const renderList = (items, renderer, targetId) => {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = items.map(renderer).join("");
};

const heroSubtitle = document.getElementById("hero-subtitle");
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
  coffee: `
    <svg viewBox="0 0 24 24" aria-hidden="true" class="hero-link-svg">
      <path
        fill="currentColor"
        d="M5 6.5h10.5a.5.5 0 0 1 .5.5v3h1.25a2.75 2.75 0 0 1 0 5.5H16a5 5 0 0 1-5 4.5H8A5 5 0 0 1 3 15V7a.5.5 0 0 1 .5-.5H5Zm0 1.5V15a3.5 3.5 0 0 0 3.5 3.5h3A3.5 3.5 0 0 0 15 15V8H5Zm11 3.5V14h1.25a1.25 1.25 0 0 0 0-2.5H16ZM7.25 4a.75.75 0 0 1 .75.75V6a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 7.25 4Zm3 0a.75.75 0 0 1 .75.75V6a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 10.25 4Zm3 0a.75.75 0 0 1 .75.75V6a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 13.25 4Z"
      />
    </svg>
  `,
  calendar: `
    <svg viewBox="0 0 24 24" aria-hidden="true" class="hero-link-svg">
      <path
        fill="currentColor"
        d="M7 2.75a.75.75 0 0 1 1.5 0V4H15V2.75a.75.75 0 0 1 1.5 0V4h1A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11A2.5 2.5 0 0 1 6.5 4h1V2.75ZM5.5 9v8.5c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V9h-13Zm13-1.5V6.5c0-.55-.45-1-1-1h-1V6a.75.75 0 0 1-1.5 0v-.5H8.5V6A.75.75 0 0 1 7 6v-.5h-.5c-.55 0-1 .45-1 1v1h13Zm-9.75 3.25h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5Zm0 3.5h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Z"
      />
    </svg>
  `,
  resume: `
    <svg viewBox="0 0 24 24" aria-hidden="true" class="hero-link-svg">
      <path
        fill="currentColor"
        d="M7 3.5h7.38c.4 0 .78.16 1.06.44l2.62 2.62c.28.28.44.66.44 1.06V18.5A2.5 2.5 0 0 1 16 21H8a2.5 2.5 0 0 1-2.5-2.5v-12A3 3 0 0 1 8.5 3.5H7Zm8 1.81V7h1.69L15 5.31ZM8.5 5A1.5 1.5 0 0 0 7 6.5v12c0 .55.45 1 1 1h8a1 1 0 0 0 1-1V8.5H14.5A1.5 1.5 0 0 1 13 7V5H8.5Zm.25 5.25h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Zm0 3.5h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Zm0 3.5h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5Z"
      />
    </svg>
  `,
};

const renderResearchCard = (item) => `
  <article class="glass panel research-card">
    <div class="stack-item-header">
      <h3>${item.title}</h3>
      <span class="stack-item-meta">${item.period}</span>
    </div>
    <p class="stack-item-meta">${item.org}</p>
    <p>${item.body}</p>
  </article>
`;

const bindProjectNav = () => {
  document.querySelectorAll("[data-category-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.categoryTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
};

const renderShellText = () => {
  const chrome = getSiteChrome();
  setText("nav-home", chrome.nav.home);
  setText("nav-projects", chrome.nav.projects);
  setText("nav-research", chrome.nav.research);
  setText("nav-contact", chrome.nav.contact);
  setText("about-heading", chrome.aboutHeading);
  setText("projects-tag", chrome.projectsTag);
  setText("projects-heading", chrome.projectsHeading);
  setText("projects-intro", chrome.projectsIntro);
  setText("research-heading", chrome.researchHeading);
  setText("teaching-heading", chrome.teachingHeading);
  setText("contact-tag", chrome.contactTag);
  setText("contact-heading", chrome.contactHeading);
  setText("contact-copy", chrome.contactCopy);
  document.title = chrome.documentTitle;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", chrome.metaDescription);
};

const renderHero = () => {
  const activeSiteData = getActiveSiteData();
  setText("hero-summary", activeSiteData.heroSummary);
  setText("hero-name", activeSiteData.heroName);
  setText("hero-tagline", activeSiteData.heroTagline);
  if (heroSubtitle) {
    heroSubtitle.textContent = activeSiteData.heroSubtitle;
    if (activeSiteData.heroSubtitleHref) {
      heroSubtitle.href = activeSiteData.heroSubtitleHref;
      heroSubtitle.target = "_blank";
      heroSubtitle.rel = "noreferrer";
    }
  }
  renderList(
    activeSiteData.heroLinks,
    (link) => `
      <a class="hero-link" href="${link.href}" target="_blank" rel="noreferrer">
        <span class="hero-link-icon">${iconMarkup[link.icon] || ""}</span>
        <span class="hero-link-text">${link.label}</span>
      </a>
    `,
    "hero-link-row"
  );
  renderList(
    activeSiteData.homeAbout,
    (paragraph) => `<p>${paragraph}</p>`,
    "home-about-content"
  );
};

const renderProjects = () => {
  const projectNav = document.getElementById("projects-nav");
  const projectCategories = document.getElementById("projects-categories");
  const categories = [...projectCatalog.categories].sort((a, b) => a.order - b.order);
  if (projectNav) {
    projectNav.innerHTML = categories
      .map(
        (category) => `
          <button class="project-nav-pill" type="button" data-category-target="${category.id}">${getCategoryTitle(category)}</button>
        `
      )
      .join("");
  }

  if (projectCategories) {
    projectCategories.innerHTML = categories
      .map((category) => {
        const categoryProjects = projectCatalog.projects.filter((project) =>
          project.displayCategories.includes(category.title)
        );
        return `
          <section class="project-category-block" id="${category.id}">
            <div class="section-heading project-category-heading">
              <div>
                <h2>${getCategoryTitle(category)}</h2>
              </div>
              <p class="section-copy">${getCategoryDescription(category)}</p>
            </div>
            <div class="project-grid section-tight">
              ${categoryProjects
                .map((project) => {
                  const coverAsset = realProjectCovers[project.slug];
                  const coverImage = coverAsset
                    ? `${coverAsset.src}?v=${assetVersion}`
                    : `./assets/project-covers/${project.slug}.svg?v=${assetVersion}`;
                  const coverPosition = coverAsset?.position || "center center";
                  const coverOverlay =
                    coverAsset?.overlay ||
                    "linear-gradient(180deg, rgba(4, 13, 24, 0.12), rgba(4, 13, 24, 0.48))";
                  const coverToneClass =
                    coverAsset?.textTone === "dark"
                      ? "project-cover--dark-text"
                      : "project-cover--light-text";
                  const coverCanvasClass =
                    coverAsset?.canvasTone === "white" ? "project-cover--white-canvas" : "";
                  const statusClass =
                    project.status === "In Progress"
                      ? "project-status-pill--progress"
                      : "project-status-pill--completed";
                  const detailHref = `./project.html?slug=${project.slug}${getLocale() === "zh" ? "&lang=zh" : ""}`;
                  return `
                    <a class="project-card project-card-link" href="${detailHref}">
                      <div class="project-cover ${coverToneClass} ${coverCanvasClass}">
                        <div
                          class="project-cover-image"
                          style="background-image: url('${coverImage}'); background-position: ${coverPosition};"
                        ></div>
                        <div
                          class="project-cover-overlay"
                          style="background-image: ${coverOverlay};"
                        ></div>
                        <span class="project-cover-label">${getProjectField(project, "coverLabel")}</span>
                        <span class="project-status-pill ${statusClass}">${getProjectStatusLabel(project)}</span>
                      </div>
                      <h3>${getProjectField(project, "title")}</h3>
                      <p>${getProjectField(project, "miniDescription")}</p>
                      <div class="tag-list">
                        ${getProjectTags(project).map((tag) => `<span class="tag">${tag}</span>`).join("")}
                      </div>
                    </a>
                  `;
                })
                .join("")}
            </div>
          </section>
        `;
      })
      .join("");
  }
  bindProjectNav();
};

const renderResearchAndContact = () => {
  const activeSiteData = getActiveSiteData();
  renderList(activeSiteData.research, renderResearchCard, "research-cards");
  renderList(activeSiteData.teaching, renderResearchCard, "teaching-cards");
  renderList(
    activeSiteData.contactBooking,
    (item) => `
      <a class="contact-action-card contact-action-card--${item.tone}" href="${item.href}"${
        item.newTab ? ' target="_blank" rel="noreferrer"' : ""
      }>
        <span class="contact-action-icon">${iconMarkup[item.icon] || ""}</span>
        <span class="contact-action-copy">
          <strong>${item.label}</strong>
          <span>${item.detail}</span>
        </span>
      </a>
    `,
    "contact-booking"
  );
  renderList(
    activeSiteData.contacts,
    (item) => `
      <a class="hero-link" href="${item.href}" target="_blank" rel="noreferrer">
        <span class="hero-link-icon">${iconMarkup[item.icon] || ""}</span>
        <span class="hero-link-text">${item.label}</span>
      </a>
    `,
    "contact-links"
  );
};

const renderHomepage = () => {
  renderShellText();
  renderHero();
  renderProjects();
  renderResearchAndContact();
};

renderHomepage();

const views = ["home", "projects", "research", "contact"];
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
window.addEventListener("site-locale-change", () => {
  renderHomepage();
  syncViewFromHash();
});
syncViewFromHash();
