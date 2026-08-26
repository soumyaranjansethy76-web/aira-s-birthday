let audio: HTMLAudioElement | null = null;
let playing = false;
const listeners = new Set<(value: boolean) => void>();

function notify() {
  listeners.forEach((listener) => listener(playing));
}

export function startMusic() {
  if (playing) return;
  
  // Yahan hum audio file set kar rahe hain
  if (!audio) {
    audio = new Audio('/bgm.mp3'); // Tumhari music file ka naam
    audio.loop = true;             // Gaana khatam hone par wapas start hoga
  }

  audio.play().then(() => {
    playing = true;
    notify();
  }).catch((err) => {
    console.error("Music play karne mein problem aayi:", err);
  });
}

export function stopMusic() {
  if (!audio) return;
  audio.pause();
  playing = false;
  notify();
}

export function toggleMusic() {
  if (playing) stopMusic();
  else startMusic();
}

export function isMusicPlaying() {
  return playing;
}

export function subscribeMusic(listener: (value: boolean) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
