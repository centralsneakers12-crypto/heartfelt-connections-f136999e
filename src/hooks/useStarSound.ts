import { useCallback, useRef } from "react";

const ERIKA_NOTES = [
  523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440.00, 493.88,
  523.25, 587.33, 659.25, 783.99, 698.46, 659.25, 587.33, 523.25,
];

const useStarSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noteIndexRef = useRef(0);

  const play = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;

      const note = ERIKA_NOTES[noteIndexRef.current % ERIKA_NOTES.length];
      noteIndexRef.current++;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(note, ctx.currentTime);
      osc2.frequency.setValueAtTime(note * 1.5, ctx.currentTime);

      osc1.frequency.exponentialRampToValueAtTime(note * 1.5, ctx.currentTime + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(note * 0.75, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } catch {
      // Silent fail if audio not supported
    }
  }, []);

  return play;
};

export default useStarSound;
