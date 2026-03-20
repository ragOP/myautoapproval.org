import { motion } from "framer-motion";
import clsx from "clsx";
import { FaBolt, FaCheckCircle, FaLock, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import { useInView } from "react-intersection-observer";

const trustBadges = [
  { icon: FaBolt, label: "Fast Process" },
  { icon: FaLock, label: "Secure" },
  { icon: FaCheckCircle, label: "No Obligation" },
];

const steps = [
  { title: "Step 1", description: "Answer Questions" },
  { title: "Step 2", description: "Get Match" },
  { title: "Step 3", description: "See Results" },
];

const cardInViewAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

function LandingPage() {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [badgesRef, badgesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const goToQuiz = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/quiz");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0b0b0f] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gradient-to-r from-red-500/40 to-orange-500/30 blur-3xl"
          animate={{ x: [0, 25, -15, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-80px] top-48 h-80 w-80 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-500/30 blur-3xl"
          animate={{ x: [0, -25, 10, 0], y: [0, -22, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <main className="relative mx-auto flex w-full max-w-[420px] flex-col gap-10 px-4 pb-28 pt-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <motion.p
            className="mb-3 inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Limited time support matching
          </motion.p>
          <motion.h1
            className="text-4xl font-black leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-pink-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-[pulse_2s_ease-in-out_infinite]">
              You May Qualify for Up to $5,000
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 text-base text-white/80"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            Quick 60-second check. No obligation, no paperwork upfront, and instant next-step guidance.
          </motion.p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={goToQuiz}
            className={clsx(
              "relative mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-extrabold",
              "bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.45)]",
              "transition-all duration-300"
            )}
          >
            <motion.span animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
              Check Now
            </motion.span>
            <FaArrowRight />
          </motion.button>
        </section>

        <section ref={badgesRef} className="space-y-3">
          {trustBadges.map(({ icon: Icon, label }, index) => (
            <motion.article
              key={label}
              custom={index}
              variants={cardInViewAnimation}
              initial="hidden"
              animate={badgesInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur"
            >
              <div className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 p-2 text-white shadow-md">
                <Icon className="text-lg" />
              </div>
              <p className="text-base font-semibold">{label}</p>
            </motion.article>
          ))}
        </section>

        <section ref={stepsRef} className="space-y-3">
          <h2 className="text-2xl font-black tracking-tight">How It Works</h2>
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              custom={index}
              variants={cardInViewAnimation}
              initial="hidden"
              animate={stepsInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-orange-300">{step.title}</p>
              <p className="mt-1 text-xl font-bold">{step.description}</p>
            </motion.article>
          ))}
        </section>
      </main>

      {isMobile && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-[#0b0b0f]/70 p-4 backdrop-blur-xl">
          <motion.button
            onClick={goToQuiz}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            animate={{ boxShadow: ["0 0 0 rgba(249,115,22,0.2)", "0 0 30px rgba(249,115,22,0.65)", "0 0 0 rgba(249,115,22,0.2)"] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-5 py-4 text-lg font-extrabold"
          >
            Start Now
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
