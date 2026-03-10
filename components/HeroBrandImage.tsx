"use client";
import { useState, useEffect } from "react";

// Three independent layers, all sharing the same 1708×1207 canvas:
//   word-ac.png    — ANYTHING (top 43.2%) + CLIMBING (bottom 56.8%), white on transparent
//   word-but2.png  — red BUT composited at split point, on matching canvas

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeSpring = (t: number) =>
  t === 0 ? 0 : t === 1 ? 1
    : Math.pow(2, -8 * t) * Math.sin((t * 8 - 0.75) * ((2 * Math.PI) / 4)) + 1;

export default function HeroBrandImage() {
  const [p0, setP0] = useState(0);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);

  useEffect(() => {
    const run = (setter: (v: number) => void, delay: number, dur: number) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const raw = Math.min(1, (now - start) / dur);
          setter(raw);
          if (raw < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
      return t;
    };
    const t0 = run(setP0, 400, 700);
    const t1 = run(setP1, 1300, 400);
    const t2 = run(setP2, 1900, 700);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const e0 = easeOut(p0);
  const e1 = easeSpring(p1);
  const e2 = easeOut(p2);

  const img = (src: string) => (
    <img
      src={src}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-top"
      draggable={false}
    />
  );

  return (
    <div
      className="relative mx-auto mb-8"
      style={{ width: "clamp(280px, 62vw, 580px)", aspectRatio: "1708 / 1207" }}
    >
      {/* ANYTHING: top 43.2% of word-ac.png — left→right wipe */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${(1 - e0) * 100}% 56.8% 0)` }}
      >
        {img("/images/word-ac.png")}
      </div>

      {/* CLIMBING: bottom 56.8% of word-ac.png — right→left wipe */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(43.2% 0 0 ${(1 - e2) * 100}%)` }}
      >
        {img("/images/word-ac.png")}
      </div>

      {/* BUT: red letters composited on same canvas — scale punch (DOM-last = highest z-index) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${0.2 + e1 * 0.8})`,
          opacity: Math.min(1, e1 * 1.5),
          transformOrigin: "center 45.6%",
        }}
      >
        {img("/images/word-but2.png")}
      </div>
    </div>
  );
}
