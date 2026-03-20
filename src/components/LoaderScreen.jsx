import { motion as Motion } from "framer-motion";

function LoaderScreen({ progress = 0, text = "Running AI Analysis" }) {
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050507]/90 p-4 backdrop-blur-md"
    >
      <div className="w-full max-w-md rounded-3xl border border-cyan-300/20 bg-white/5 p-6 shadow-[0_0_55px_rgba(56,189,248,0.25)] sm:p-8">
        <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-2 border-cyan-200/20 border-t-cyan-300" />
        <p className="text-center text-lg text-white sm:text-xl">{text}<span className="loading-dots" /></p>
        <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/10">
          <Motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: "linear" }}
          />
        </div>
        <p className="mt-2 text-center text-sm text-cyan-100/70">Neural confidence: {Math.round(progress)}%</p>
      </div>
    </Motion.div>
  );
}

export default LoaderScreen;
