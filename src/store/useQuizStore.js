import { create } from "zustand";
import questions from "../data/questions";

const initialState = {
  currentStep: 0,
  answers: {},
  aiMessage: "System idle",
  isAnalyzing: false,
  showOverlayLoader: false,
  overlayProgress: 0,
};

const useQuizStore = create((set) => ({
  ...initialState,
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, questions.length),
    })),
  setAiMessage: (message) => set({ aiMessage: message }),
  setAnalyzing: (value) => set({ isAnalyzing: value }),
  setOverlayLoader: (value) => set({ showOverlayLoader: value }),
  setOverlayProgress: (value) => set({ overlayProgress: value }),
  resetQuiz: () => set(initialState),
}));

export default useQuizStore;
