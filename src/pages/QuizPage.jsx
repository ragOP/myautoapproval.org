import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { FaArrowRight } from "react-icons/fa";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";

const questionTransition = {
  initial: { opacity: 0, x: 50, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.26, ease: "easeIn" } },
};

const playClickSound = () => {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = "triangle";
    oscillator.frequency.value = 630;
    gainNode.gain.setValueAtTime(0.07, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.09);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.09);
  } catch {
    // Audio feedback is optional; ignore unsupported environments.
  }
};

function QuizPage() {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const hasFiredConfetti = useRef(false);

  const currentQuestion = questions[index];
  const progress = useMemo(() => ((index + (done ? 1 : 0)) / questions.length) * 100, [index, done]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index, done]);

  useEffect(() => {
    if (!done || hasFiredConfetti.current) return;

    hasFiredConfetti.current = true;
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 },
        zIndex: 999,
      });
      setTimeout(() => {
        confetti({
          particleCount: 120,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          zIndex: 999,
        });
        confetti({
          particleCount: 120,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          zIndex: 999,
        });
      }, 350);
    });
  }, [done]);

  const nextWithShimmer = (newAnswer) => {
    playClickSound();
    if (currentQuestion?.type === "input") {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: inputValue.trim() }));
    } else if (newAnswer) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: newAnswer }));
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (index >= questions.length - 1) {
        setDone(true);
        return;
      }
      setInputValue("");
      setIndex((prev) => prev + 1);
    }, 380);
  };

  const canContinueInput = inputValue.trim().length > 2;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b0f] text-white">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-12 top-8 h-64 w-64 rounded-full bg-gradient-to-r from-red-500/30 to-orange-500/20 blur-3xl"
          animate={{ x: [0, 22, -14, 0], y: [0, 18, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-[-48px] h-72 w-72 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-500/25 blur-3xl"
          animate={{ x: [0, -18, 14, 0], y: [0, -22, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[420px] flex-col px-4 pb-8 pt-6">
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-white/70">
            <span>Progress</span>
            <span>
              {Math.min(index + 1, questions.length)}/{questions.length}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]"
              animate={{ width: `${done ? 100 : progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.section
              key="final"
              variants={questionTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
            >
              <h1 className="bg-gradient-to-r from-red-500 via-orange-400 to-pink-500 bg-clip-text text-4xl font-black text-transparent">
                You May Qualify!
              </h1>
              <p className="mt-3 text-base text-white/80">
                Great news. Your answers were recorded and your potential options are ready.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-4 text-lg font-extrabold shadow-[0_0_25px_rgba(217,70,239,0.5)]"
              >
                Continue <FaArrowRight />
              </motion.button>
              <p className="mt-4 text-xs text-white/45">Captured responses: {Object.keys(answers).length}</p>
            </motion.section>
          ) : (
            <motion.section
              key={currentQuestion.id}
              variants={questionTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
            >
              {loading ? (
                <div className="space-y-3">
                  <div className="relative h-7 overflow-hidden rounded-lg bg-white/10">
                    <span className="quiz-shimmer absolute inset-0" />
                  </div>
                  <div className="relative h-14 overflow-hidden rounded-xl bg-white/10">
                    <span className="quiz-shimmer absolute inset-0" />
                  </div>
                  <div className="relative h-14 overflow-hidden rounded-xl bg-white/10">
                    <span className="quiz-shimmer absolute inset-0" />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black leading-tight">{currentQuestion.question}</h2>

                  {currentQuestion.type === "input" ? (
                    <div className="mt-5 space-y-3">
                      <input
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder="ZIP code"
                        inputMode="numeric"
                        className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-4 text-lg outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-300/60"
                      />
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => nextWithShimmer()}
                        disabled={!canContinueInput}
                        className={clsx(
                          "w-full rounded-2xl px-4 py-4 text-lg font-extrabold transition-all",
                          canContinueInput
                            ? "bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.5)]"
                            : "cursor-not-allowed bg-white/10 text-white/40"
                        )}
                      >
                        Continue
                      </motion.button>
                    </div>
                  ) : (
                    <div className="mt-5 grid gap-3">
                      {currentQuestion.options.map((option) => {
                        const selected = answers[currentQuestion.id] === option;
                        return (
                          <motion.button
                            key={option}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => nextWithShimmer(option)}
                            className={clsx(
                              "rounded-2xl border px-4 py-4 text-left text-lg font-bold transition-all",
                              selected
                                ? "border-orange-300 bg-gradient-to-r from-red-500/30 to-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                : "border-white/20 bg-white/5 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-500/25"
                            )}
                          >
                            {option}
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {isMobile && !done && (
          <p className="mt-4 text-center text-xs text-white/50">One quick question at a time. Tap to continue.</p>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
