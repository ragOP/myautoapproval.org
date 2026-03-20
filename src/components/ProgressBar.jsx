import { motion as Motion } from "framer-motion";

function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-cyan-100/70 sm:text-sm">
        <span>Step {Math.min(current, total)} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
        <Motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_20px_rgba(34,211,238,0.65)]"
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
