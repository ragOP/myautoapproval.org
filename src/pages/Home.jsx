import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCpu, FiShield, FiZap } from "react-icons/fi";
import AIBackground from "../components/AIBackground";
import GlowButton from "../components/GlowButton";
import useQuizStore from "../store/useQuizStore";

const features = [
  { label: "Real-time inference", icon: FiCpu },
  { label: "Adaptive decisioning", icon: FiZap },
  { label: "Secure analysis pipeline", icon: FiShield },
];

function Home() {
  const navigate = useNavigate();
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const handleStart = () => {
    resetQuiz();
    navigate("/quiz");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-4 py-10 text-white">
      <AIBackground />

      <section className="relative z-10 mx-auto w-full max-w-4xl rounded-3xl border border-cyan-300/20 bg-white/5 p-6 shadow-[0_0_65px_rgba(59,130,246,0.18)] backdrop-blur-xl sm:p-10">
        <Motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-cyan-100/85"
        >
          <FiCpu />
          Decision Intelligence System
        </Motion.p>

        <Motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl"
        >
          AI Is Analyzing Your Eligibility
        </Motion.h1>

        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-base text-cyan-100/75 sm:text-lg"
        >
          Answer a few quick questions to get your personalized result. Our engine cross-checks your responses in real-time to surface the best next step.
        </Motion.p>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-7"
        >
          <GlowButton pulse onClick={handleStart} className="gap-2 text-base sm:text-lg">
            Start Analysis
            <FiArrowRight />
          </GlowButton>
        </Motion.div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Motion.article
                key={feature.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 + index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <Icon className="text-cyan-300" />
                <p className="mt-2 text-sm text-white/90">{feature.label}</p>
              </Motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Home;
