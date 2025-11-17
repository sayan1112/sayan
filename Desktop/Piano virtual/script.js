// Simple, robust JS to wire the piano buttons and keyboard controls

// Grab all piano buttons (each button should contain a child <audio>)
const buttons = Array.from(document.querySelectorAll('.piano-container button'));

// A common keyboard-to-key mapping (12 keys)
const KEY_MAP = {
  a: 0, w: 1, s: 2, e: 3, d: 4, f: 5,
  t: 6, g: 7, y: 8, h: 9, u: 10, j: 11
};

// Initialize: attach handlers and ensure audio is ready
buttons.forEach((btn, i) => {
  const audio = btn.querySelector('audio');
  if (!audio) {
    console.warn('Button has no audio child', btn);
    return;
  }

  // preload where possible
  try { audio.load(); } catch (e) { /* ignore */ }

  // Click and touch
  btn.addEventListener('click', () => playButton(btn));
  btn.addEventListener('touchstart', (ev) => { ev.preventDefault(); playButton(btn); }, {passive: false});
});

// Play logic: reset time, play, and add a short visual press state
function playButton(btn) {
  const audio = btn.querySelector('audio');
  if (!audio || !audio.src) {
    console.warn('No audio source for', btn);
    return;
  }

  // restart audio so repeated presses replay
  try {
    audio.currentTime = 0;
  } catch (_) { /* some browsers may throw if not ready */ }

  // play and handle promise rejection silently (autoplay policies)
  audio.play().catch((err) => {
    // If playback is blocked, user gesture is usually required — ignore quietly
    console.warn('Playback failed or was blocked:', err);
  });

  btn.classList.add('active'); // requires CSS for .active to show visual press
  // remove active state after short delay (or rely on CSS transitionend)
  clearTimeout(btn._pressTimeout);
  btn._pressTimeout = setTimeout(() => btn.classList.remove('active'), 140);
}

// Keyboard control
document.addEventListener('keydown', (ev) => {
  if (ev.repeat) return; // ignore held repeats
  const idx = KEY_MAP[ev.key.toLowerCase()];
  if (typeof idx === 'number') {
    const btn = buttons[idx];
    if (btn) playButton(btn);
  }
});

// Optional: expose a convenience function for debugging in console
window.playPianoKey = (index) => {
  const btn = buttons[index];
  if (btn) playButton(btn);
};