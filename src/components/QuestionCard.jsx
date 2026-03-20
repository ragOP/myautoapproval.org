import { motion as Motion } from "framer-motion";
import clsx from "clsx";
import { FiCpu } from "react-icons/fi";

function QuestionCard({ question, selected, onSelect, disabled }) {
  return (
    <Motion.section
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)", y: -18 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-cyan-200/15 bg-white/5 p-6 shadow-[0_0_55px_rgba(16,185,129,0.04)] backdrop-blur-xl sm:p-8"
    >
      <div className="mb-5 flex items-center gap-3 text-cyan-100/80">
        <FiCpu className="text-cyan-300" />
        <span className="text-xs uppercase tracking-[0.2em]">AI Decision Module</span>
      </div>

      <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">{question.prompt}</h2>

      <div className="mt-6 grid gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option)}
            className={clsx(
              "group relative overflow-hidden rounded-2xl border px-4 py-4 text-left text-base font-medium transition-all sm:px-5 sm:text-lg",
              disabled && "cursor-not-allowed opacity-60",
              selected === option
                ? "border-cyan-300/80 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,0.38)]"
                : "border-white/15 bg-white/5 hover:border-blue-300/70 hover:bg-blue-400/10 hover:shadow-[0_0_18px_rgba(99,102,241,0.4)]"
            )}
          >
            <span className="relative z-10">{option}</span>
            <span className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_55%)]" />
          </button>
        ))}
      </div>
    </Motion.section>
  );
}

export default QuestionCard;
