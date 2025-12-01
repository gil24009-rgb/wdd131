// scripts/questions.mjs
// Each question awards points to some major categories based on the answer.

const questions = [
  {
    id: 1,
    step: 1,
    text: "Do you enjoy creating things visually, like drawing, design, or layout?",
    image: "images/Q1.png",
    yesCategories: ["art", "comm", "music"],
    noCategories: ["cs", "math", "engineering"]
  },
  {
    id: 2,
    step: 2,
    text: "Are you curious about how living things work, such as plants, animals, or the human body?",
    image: "images/Q1.png",
    yesCategories: ["bio", "psych", "health"],
    noCategories: ["business", "art"]
  },
  {
    id: 3,
    step: 3,
    text: "Would you like to work with technology, coding, or data in your future career?",
    image: "images/Q1.png",
    yesCategories: ["cs", "engineering", "math"],
    noCategories: ["art", "music", "humanities"]
  },
  {
    id: 4,
    step: 4,
    text: "Do you enjoy teaching, mentoring, or helping others understand new ideas?",
    image: "images/Q1.png",
    yesCategories: ["edu", "psych", "humanities"],
    noCategories: ["cs", "engineering"]
  },
  {
    id: 5,
    step: 5,
    text: "Would you like to plan projects, organize teams, or run a business someday?",
    image: "images/Q1.png",
    yesCategories: ["business", "comm"],
    noCategories: ["bio", "music"]
  },
  {
    id: 6,
    step: 6,
    text: "Are you energized by performing, presenting, or being in front of people?",
    image: "images/Q10.png",
    yesCategories: ["music", "comm", "edu"],
    noCategories: ["cs", "math"]
  },
  {
    id: 7,
    step: 7,
    text: "Do you find yourself thinking about emotions, behavior, or how people make decisions?",
    image: "images/Q10.png",
    yesCategories: ["psych", "bio", "comm"],
    noCategories: ["math", "engineering"]
  },
  {
    id: 8,
    step: 8,
    text: "Do you like solving step-by-step problems, puzzles, or equations?",
    image: "images/Q10.png",
    yesCategories: ["math", "cs", "engineering"],
    noCategories: ["art", "music"]
  },
  {
    id: 9,
    step: 9,
    text: "Would you enjoy studying languages, culture, history, or literature?",
    image: "images/Q10.png",
    yesCategories: ["humanities", "comm"],
    noCategories: ["cs", "engineering"]
  },
  {
    id: 10,
    step: 10,
    text: "Is working directly with people (clients, students, patients) important to you?",
    image: "images/Q10.png",
    yesCategories: ["edu", "psych", "health", "business"],
    noCategories: ["cs", "engineering", "math"]
  }
];

export default questions;