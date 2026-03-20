import { useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiRefreshCcw } from "react-icons/fi";
import confetti from "canvas-confetti";
import AIBackground from "../components/AIBackground";
import GlowButton from "../components/GlowButton";
import useQuizStore from "../store/useQuizStore";

function Result() {
  const navigate = useNavigate();
  const { answers, resetQuiz } = useQuizStore();
  const answerCount = Object.keys(answers).length;

  useEffect(() => {
    confetti({
      particleCount: 70,
      spread: 70,
      scalar: 0.8,
      origin: { y: 0.65 },
      colors: ["#22d3ee", "#3b82f6", "#a855f7", "#ec4899"],
    });
  }, []);

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-4 py-10 text-white">
      <AIBackground />

      <Motion.section
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl rounded-3xl border border-emerald-300/25 bg-white/5 p-7 text-center shadow-[0_0_60px_rgba(16,185,129,0.24)] backdrop-blur-xl sm:p-10"
      >
        <div className="mx-auto w-fit rounded-full border border-emerald-300/40 bg-emerald-400/10 p-3">
          <FiCheckCircle className="text-4xl text-emerald-300" />
        </div>

        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Analysis Complete</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-emerald-100/85 sm:text-lg">
          You may qualify based on your responses. Our system has generated a personalized recommendation profile.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {["Identity validated", "Rules scored", "Match confidence high"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-sm text-white/85">
              {item}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-cyan-100/80">Signals processed: {answerCount}</p>
        <GlowButton onClick={handleRestart} className="mt-6 gap-2 px-8 py-3">
          Run Another Analysis
          <FiRefreshCcw />
        </GlowButton>
      </Motion.section>
    </main>
  );
}

export default Result;
