import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";

const particles = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 8 + 8,
}));

function AIBackground() {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const update = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.2),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.2),transparent_42%),linear-gradient(120deg,rgba(59,130,246,0.08),rgba(236,72,153,0.06))]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050507]" />

      {particles.map((particle) => (
        <Motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300/55 blur-[1px]"
          style={{ top: particle.top, left: particle.left, width: particle.size, height: particle.size }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <Motion.div
        className="absolute h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl"
        animate={{ x: cursor.x - 88, y: cursor.y - 88 }}
        transition={{ type: "spring", damping: 24, stiffness: 120, mass: 0.35 }}
      />
    </div>
  );
}

export default AIBackground;
