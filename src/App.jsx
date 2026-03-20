import { AnimatePresence, motion as Motion } from "framer-motion";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Chatbotdq from "./Chatbotdq";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Quiz from "./pages/Quiz";
import QuizPage from "./pages/QuizPage";
import Result from "./pages/Result";

const pageTransition = {
  initial: { opacity: 0, scale: 0.985, filter: "blur(8px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.02, filter: "blur(6px)", transition: { duration: 0.28, ease: "easeIn" } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Motion.div key={location.pathname} variants={pageTransition} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Chatbotdq />} />
          <Route path="/engsf2200" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/wed" element={<Chatbotdq />} />

          <Route path="/ai" element={<Home />} />
          <Route path="/ai/quiz" element={<Quiz />} />
          <Route path="/ai/result" element={<Result />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Motion.div>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
