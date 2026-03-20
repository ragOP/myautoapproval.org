import { AnimatePresence, motion as Motion } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Chatbotdq from "./Chatbotdq";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";

const pageTransition = {
  initial: { opacity: 0, scale: 0.985 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.985, transition: { duration: 0.2, ease: "easeIn" } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Motion.div key={location.pathname} variants={pageTransition} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/engsf2200" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/wed" element={<Chatbotdq />} />
        </Routes>
      </Motion.div>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
      {/*
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/wed" element={<Chatbotdq />} />
        <Route path="/engsfdq" element={<Chatbotdq2 />} />
        <Route path="/engsf2200" element={<ChatbotTwo />} />
        <Route path="/engsf1dup" element={<Chatbotdq2 />} />
        <Route path="/engsf2200dup" element={<ChatbotFour />} />
        <Route path="/engsafe1" element={<Chatbot2 />} />
      </Routes>
      */}
    </Router>
  );
};

export default App;
