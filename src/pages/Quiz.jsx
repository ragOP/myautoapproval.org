import { useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AIBackground from "../components/AIBackground";
import LoaderScreen from "../components/LoaderScreen";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import TypingText from "../components/TypingText";
import questions from "../data/questions";
import useQuizStore from "../store/useQuizStore";

const aiProcessingMessages = ["Analyzing response...", "Cross-checking data...", "Optimizing result..."];

const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms);
});

const playSelectSound = () => {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(640, context.currentTime);
    gain.gain.setValueAtTime(0.045, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.08);
  } catch {
    // Audio feedback is optional for unsupported browsers.
  }
};

function Quiz() {
  const navigate = useNavigate();
  const {
    currentStep,
    answers,
    aiMessage,
    isAnalyzing,
    showOverlayLoader,
    overlayProgress,
    setAnswer,
    nextStep,
    setAiMessage,
    setAnalyzing,
    setOverlayLoader,
    setOverlayProgress,
  } = useQuizStore();
  const [selectedOption, setSelectedOption] = useState("");

  const question = questions[currentStep];
  const totalSteps = questions.length;
  const progressStep = Math.min(currentStep + 1, totalSteps);
  const shouldShowOverlay = useMemo(() => [1, 3].includes(currentStep), [currentStep]);

  const handleAnswer = async (option) => {
    if (!question || isAnalyzing) return;

    playSelectSound();
    setSelectedOption(option);
    setAnswer(question.id, option);
    setAnalyzing(true);

    for (let index = 0; index < aiProcessingMessages.length; index += 1) {
      setAiMessage(aiProcessingMessages[index]);
      await wait(350 + Math.floor(Math.random() * 280));
    }

    if (shouldShowOverlay) {
      setOverlayLoader(true);
      const sequence = [12, 28, 44, 58, 77, 92, 100];
      for (const value of sequence) {
        setOverlayProgress(value);
        await wait(120 + Math.floor(Math.random() * 120));
      }
      setOverlayLoader(false);
      setOverlayProgress(0);
    } else {
      await wait(280);
    }

    setSelectedOption("");
    setAnalyzing(false);

    if (currentStep >= totalSteps - 1) {
      navigate("/result");
      return;
    }

    nextStep();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507] px-4 py-8 text-white sm:py-12">
      <AIBackground />

      <section className="relative z-10 mx-auto w-full max-w-3xl space-y-5">
        <div className="rounded-3xl border border-cyan-300/20 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
          <ProgressBar current={progressStep} total={totalSteps} />
          <TypingText text={aiMessage} className="mt-4 text-sm text-cyan-100/80 sm:text-base" />
        </div>

        <AnimatePresence mode="wait">
          {question && (
            <Motion.div key={question.id}>
              <QuestionCard
                question={question}
                selected={selectedOption || answers[question.id]}
                onSelect={handleAnswer}
                disabled={isAnalyzing}
              />
            </Motion.div>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {showOverlayLoader && <LoaderScreen progress={overlayProgress} />}
      </AnimatePresence>
    </main>
  );
}

export default Quiz;
