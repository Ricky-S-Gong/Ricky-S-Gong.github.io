(() => {
  const canvas = document.getElementById("home-sky");
  if (!canvas) return;
  const version = new URL(document.currentScript.src).searchParams.get("v");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let scene;
  let loading = false;
  let failed = false;
  const canAnimate = () => !document.hidden && !reduced.matches && !navigator.connection?.saveData && !failed;
  const sync = () => {
    scene?.setPlaying(canAnimate());
    if (!canAnimate() || scene || loading) return;
    loading = true;
    const load = async () => {
      if (!canAnimate()) { loading = false; return; }
      try {
        const { createSkyBackground } = await import(`./home-sky.js?v=${version}`);
        scene = await createSkyBackground(canvas, version);
        scene.setPlaying(canAnimate());
      } catch (error) {
        failed = true;
        canvas.dataset.ready = "false";
        console.warn("Using the static site background.", error);
      } finally {
        loading = false;
      }
    };
    if ("requestIdleCallback" in window) window.requestIdleCallback(load, { timeout: 1500 });
    else window.setTimeout(load, 250);
  };
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  sync();
})();
