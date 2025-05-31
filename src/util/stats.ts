export function initFps(game: Phaser.Game): void {
  const fps = document.getElementById('fps') as HTMLSpanElement;
  let lastFpsUpdate = 0;
  let lastFps = 0;
  game.events.on(Phaser.Core.Events.POST_RENDER, () => {
    const now = performance.now();
    const diff = now - lastFpsUpdate;
    lastFpsUpdate = now;

    let currentFps = Math.round(1000 / diff);
    currentFps = Math.round(lastFps * 0.97 + currentFps * 0.03);
    fps.textContent = currentFps.toString();
    lastFps = currentFps;
  });
}
