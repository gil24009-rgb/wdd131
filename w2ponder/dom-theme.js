// Computational Thinking summary (pseudocode)
// 1) Identify the elements: select menu, body, status text
// 2) Listen for a change on the select menu
// 3) When it changes, read the selected value
// 4) If value matches a theme, apply background image and font
// 5) Otherwise reset to default
// 6) Update the visible status message each time

const themeSelect = document.querySelector("#theme-select");
const statusText = document.querySelector("#status");
const pageBody = document.body;

const themes = {
  ocean: {
    label: "Ocean",
    font: "Papyrus, fantasy",
    backgroundUrl: "https://wddbyui.github.io/wdd131/images/ocean.jpg",
  },
  forest: {
    label: "Forest",
    font: "Impact, sans-serif",
    backgroundUrl: "https://wddbyui.github.io/wdd131/images/forest.jpg",
  },
  desert: {
    label: "Desert",
    font: "'Big Caslon', serif",
    backgroundUrl: "https://wddbyui.github.io/wdd131/images/desert.jpg",
  },
};

function applyTheme(themeKey) {
  const theme = themes[themeKey];

  if (theme) {
    pageBody.style.backgroundImage = `url('${theme.backgroundUrl}')`;
    pageBody.style.fontFamily = theme.font;
    statusText.textContent = `Current theme: ${theme.label}`;
    return;
  }

  pageBody.style.backgroundImage = "none";
  pageBody.style.fontFamily = "Georgia, serif";
  statusText.textContent = "Current theme: Default";
}

themeSelect.addEventListener("change", (event) => {
  applyTheme(event.target.value);
});

// Optional quality improvement: initialize based on current selection
applyTheme(themeSelect.value);