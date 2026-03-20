import clsx from "clsx";
import { motion as Motion } from "framer-motion";

function GlowButton({ children, className, pulse = false, ...props }) {
  return (
    <Motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      animate={pulse ? { boxShadow: ["0 0 12px rgba(56,189,248,0.22)", "0 0 34px rgba(59,130,246,0.48)", "0 0 12px rgba(56,189,248,0.22)"] } : undefined}
      transition={pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : undefined}
      className={clsx(
        "relative inline-flex items-center justify-center rounded-2xl border border-cyan-300/40",
        "bg-gradient-to-r from-cyan-500/85 via-blue-500/90 to-purple-500/85 px-6 py-3 font-semibold text-white",
        "shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all duration-300",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-white/10 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </Motion.button>
  );
}

export default GlowButton;
