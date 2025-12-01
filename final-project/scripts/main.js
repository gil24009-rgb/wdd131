// scripts/main.js
import questions from "./questions.mjs";
import results from "./results.mjs";

const app = document.querySelector("#app");
const startButton = document.querySelector("#start-quiz");

const state = {
  currentIndex: 0,
  scores: {},
  answers: []
};

// Initialize scores with zero for each result id
function initializeScores() {
  state.scores = {};
  results.forEach((result) => {
    state.scores[result.id] = 0;
  });
}

// Start or restart the quiz
function startQuiz() {
  state.currentIndex = 0;
  state.answers = [];
  initializeScores();
  renderQuestion();
}

function handleAnswer(choice) {
  const question = questions[state.currentIndex];
  const categories =
    choice === "yes" ? question.yesCategories : question.noCategories;

  categories.forEach((id) => {
    if (state.scores[id] != null) {
      state.scores[id] += 1;
    }
  });

  state.answers.push({ id: question.id, choice });

  if (state.currentIndex < questions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
  } else {
    renderLoading();
  }
}

function renderQuestion() {
  const question = questions[state.currentIndex];
  const total = questions.length;
  const stepNumber = state.currentIndex + 1;
  const progressPercent = (stepNumber / total) * 100;

  app.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-step">Question ${stepNumber} of ${total}</div>
      <div class="quiz-progress-bar" role="img" aria-label="Progress ${stepNumber} of ${total}">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>
    <div class="quiz-card">
      <div class="quiz-question-block">
        <h2>${question.text}</h2>
        <p class="quiz-question-text">
          Answer with what feels most true for you right now.
        </p>
        <div class="quiz-options">
          <button type="button" class="option-button" data-choice="yes">Yes</button>
          <button type="button" class="option-button" data-choice="no">No</button>
        </div>
      </div>
      <figure class="quiz-figure">
        <img src="${question.image}" alt="Illustration for this question" class="quiz-image">
      </figure>
    </div>
  `;

  const optionButtons = app.querySelectorAll(".option-button");
  optionButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const choice = event.currentTarget.getAttribute("data-choice");
      handleAnswer(choice);
    });
  });
}

function renderLoading() {
  app.innerHTML = `
    <div class="loading-screen">
      <figure>
        <img src="images/Start page.png" alt="Potato characters preparing your result" class="loading-image">
      </figure>
      <h2 class="loading-title">Digging up potatoes...</h2>
      <p class="loading-text loading-dots">Finding your major category</p>
    </div>
  `;

  // Simulate a short loading time
  setTimeout(() => {
    renderResult();
  }, 1600);
}

function getBestResult() {
  const entries = Object.entries(state.scores);
  if (!entries.length) return null;

  const [bestId] = entries.reduce(
    (best, current) => (current[1] > best[1] ? current : best),
    entries[0]
  );

  return results.find((item) => item.id === bestId) || null;
}

function renderResult() {
  const best = getBestResult();

  if (!best) {
    app.innerHTML = `
      <p>Something went wrong calculating your result. Please try again.</p>
      <button type="button" class="secondary-button" id="retry-quiz">Retake quiz</button>
    `;
    const retry = document.querySelector("#retry-quiz");
    retry.addEventListener("click", startQuiz);
    return;
  }

  const listItems = best.exampleMajors
    .map((major) => `<li>${major}</li>`)
    .join("");

  app.innerHTML = `
    <div class="result-layout">
      <div class="result-main">
        <span class="chip">Suggested category</span>
        <h2>${best.name}</h2>
        <p class="result-description">${best.description}</p>
        <p class="result-list-title">Possible majors you could explore:</p>
        <ul class="result-list">
          ${listItems}
        </ul>
        <p class="result-list-title">Why this fits you:</p>
        <p class="result-description">${best.tagline}</p>
        <div class="result-actions">
          <button type="button" class="primary-button" id="retake-quiz">
            Retake quiz
          </button>
          <button type="button" class="secondary-button" id="see-all">
            View all categories (outline)
          </button>
        </div>
      </div>
      <figure class="result-figure">
        <img src="${best.image}" alt="${best.name} potato character" class="result-image">
        <figcaption class="result-tagline">
          Result potato illustration for ${best.name}.
        </figcaption>
      </figure>
    </div>
  `;

  const retakeButton = document.querySelector("#retake-quiz");
  retakeButton.addEventListener("click", startQuiz);

  const seeAllButton = document.querySelector("#see-all");
  seeAllButton.addEventListener("click", renderAllCategories);
}

function renderAllCategories() {
  const cards = results
    .map(
      (item) => `
      <article class="result-layout" style="grid-template-columns:minmax(0,1fr) minmax(0,0.8fr); margin-bottom:1rem;">
        <div class="result-main">
          <span class="chip">Category</span>
          <h2>${item.name}</h2>
          <p class="result-description">${item.description}</p>
          <p class="result-list-title">Example majors:</p>
          <ul class="result-list">
            ${item.exampleMajors.map((m) => `<li>${m}</li>`).join("")}
          </ul>
        </div>
        <figure class="result-figure">
          <img src="${item.image}" alt="${item.name} potato character" class="result-image">
        </figure>
      </article>
    `
    )
    .join("");

  app.innerHTML = `
    <div>
      <h2>All major categories</h2>
      <p class="result-description">
        Here is an overview of the twelve categories used in this quiz. You can use this list as a starting
        point to explore majors in more detail.
      </p>
      ${cards}
      <button type="button" class="secondary-button" id="back-to-result">
        Back to my result
      </button>
    </div>
  `;

  const backButton = document.querySelector("#back-to-result");
  backButton.addEventListener("click", renderResult);
}

// Initial wiring
if (startButton) {
  startButton.addEventListener("click", () => {
    startQuiz();
    // Scroll to the app container for better mobile UX
    const shell = document.querySelector(".app-shell");
    if (shell) {
      shell.scrollIntoView({ behavior: "smooth" });
    }
  });
}