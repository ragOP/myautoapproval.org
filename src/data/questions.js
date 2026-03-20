const questions = [
  {
    id: "coverage",
    prompt: "What type of support are you exploring right now?",
    options: ["Health benefits", "Income support", "Housing support", "Not sure yet"],
  },
  {
    id: "age",
    prompt: "Which age bracket best describes you?",
    options: ["18-24", "25-44", "45-64", "65+"],
  },
  {
    id: "household",
    prompt: "How many people are in your household?",
    options: ["1", "2", "3-4", "5+"],
  },
  {
    id: "employment",
    prompt: "What is your current employment status?",
    options: ["Full-time", "Part-time", "Self-employed", "Not currently employed"],
  },
  {
    id: "urgency",
    prompt: "How soon do you need a recommendation?",
    options: ["Immediately", "This week", "This month", "Researching options"],
  },
];

export default questions;
