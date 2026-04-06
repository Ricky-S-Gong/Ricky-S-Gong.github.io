(function () {
  const STORAGE_KEY = "site-locale";
  const SUPPORTED = new Set(["en", "zh"]);
  const params = new URLSearchParams(window.location.search);
  const urlLocale = params.get("lang");
  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  const browserLocale = (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";

  let currentLocale = SUPPORTED.has(urlLocale)
    ? urlLocale
    : SUPPORTED.has(storedLocale)
      ? storedLocale
      : browserLocale;

  const applyLocaleToDocument = () => {
    document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.locale = currentLocale;
  };

  const syncUrl = () => {
    const nextParams = new URLSearchParams(window.location.search);
    if (currentLocale === "zh") {
      nextParams.set("lang", "zh");
    } else {
      nextParams.delete("lang");
    }
    const query = nextParams.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState({}, "", nextUrl);
  };

  const pick = (value) => {
    if (value == null) return value;
    if (Array.isArray(value)) return value.map((item) => pick(item));
    if (typeof value === "object" && ("en" in value || "zh" in value)) {
      return value[currentLocale] || value.en || value.zh || "";
    }
    return value;
  };

  const toggleMarkup = () => `
    <span class="locale-toggle-option${currentLocale === "en" ? " is-active" : ""}">EN</span>
    <span class="locale-toggle-divider">/</span>
    <span class="locale-toggle-option${currentLocale === "zh" ? " is-active" : ""}">中文</span>
  `;

  const updateMountedToggles = () => {
    document.querySelectorAll("[data-locale-toggle]").forEach((button) => {
      button.classList.add("locale-toggle");
      button.setAttribute("aria-label", currentLocale === "zh" ? "切换语言" : "Switch language");
      button.innerHTML = toggleMarkup();
    });
  };

  const notify = () => {
    applyLocaleToDocument();
    syncUrl();
    window.localStorage.setItem(STORAGE_KEY, currentLocale);
    updateMountedToggles();
    window.dispatchEvent(new CustomEvent("site-locale-change", { detail: { locale: currentLocale } }));
  };

  window.__siteLocale = {
    getLocale: () => currentLocale,
    setLocale: (locale) => {
      if (!SUPPORTED.has(locale) || locale === currentLocale) return;
      currentLocale = locale;
      notify();
    },
    toggle: () => {
      currentLocale = currentLocale === "en" ? "zh" : "en";
      notify();
    },
    pick,
  };

  applyLocaleToDocument();
  syncUrl();
  window.localStorage.setItem(STORAGE_KEY, currentLocale);

  document.addEventListener("DOMContentLoaded", () => {
    updateMountedToggles();
    document.querySelectorAll("[data-locale-toggle]").forEach((button) => {
      button.addEventListener("click", () => window.__siteLocale.toggle());
    });
  });
})();
