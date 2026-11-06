(() => {
  const preferenceKey = "portfolio-analytics-opt-out";
  const url = new URL(window.location.href);
  const preference = url.searchParams.get("analytics");
  let optedOut = preference === "off";

  try {
    if (preference === "off") window.localStorage.setItem(preferenceKey, "1");
    if (preference === "on") window.localStorage.removeItem(preferenceKey);
    optedOut ||= window.localStorage.getItem(preferenceKey) === "1";
  } catch {
    // An explicit opt-out still applies to this page if storage is blocked.
  }

  if (preference === "off" || preference === "on") {
    url.searchParams.delete("analytics");
    window.history.replaceState(window.history.state, "", url);
  }
  if (optedOut) return;

  const beacon = document.createElement("script");
  beacon.type = "module";
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js?token=96cb827025674a6f979b3c184d74c742&spa=false";
  document.body.append(beacon);
})();
