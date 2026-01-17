"use strict";

/*
  DOM Basics checklist used in this file
  querySelector, getElementById, setAttribute, textContent, style,
  className, classList add remove toggle, value
*/

const DEFAULTS = Object.freeze({
  title: "HTML, CSS, and JS",
  subtitle: "The foundational technologies that power websites and web applications",
  imgSrc: "https://wddbyui.github.io/wdd131/images/trifecta.png",
  imgAlt: "JS, CSS, and HTML logos",
  heading: "HyperText Markup Language",
  status: "Select a topic to see DOM updates."
});

const TOPIC_DATA = Object.freeze({
  html: {
    heading: "HyperText Markup Language",
    status: "HTML selected. Updated heading, list, and image text.",
    imgAlt: "HTML logo focus",
    list: [
      "Defines the structure and content of a web page.",
      "Gives the browser meaningful elements to render.",
      "Provides semantic structure for accessibility and SEO."
    ]
  },
  css: {
    heading: "Cascading Style Sheets",
    status: "CSS selected. Updated styles, list, and image text.",
    imgAlt: "CSS styling focus",
    list: [
      "Controls how HTML elements look and feel.",
      "Handles layout, typography, spacing, and color.",
      "Improves usability through visual hierarchy."
    ]
  },
  js: {
    heading: "JavaScript",
    status: "JavaScript selected. Updated content and interactivity cues.",
    imgAlt: "JavaScript interactivity focus",
    list: [
      "Adds interactivity and dynamic behavior.",
      "Responds to events like clicks, inputs, and changes.",
      "Can update the DOM after the page loads."
    ]
  }
});

function buildListItems(items) {
  return items.map((text) => `<li>${text}</li>`).join("");
}

function setActiveTopic(topicKey) {
  const content = document.getElementById("content");
  const title = document.getElementById("pageTitle");
  const subtitle = document.getElementById("subtitle");
  const status = document.getElementById("status");
  const topicHeading = document.getElementById("topicHeading");
  const topicList = document.getElementById("topicList");
  const img = document.getElementById("trifectaImg");

  const firstList = document.querySelector("#topics ul.list");

  if (!TOPIC_DATA[topicKey]) {
    status.textContent = "Please choose a valid option.";
    return;
  }

  const data = TOPIC_DATA[topicKey];

  status.textContent = data.status;

  topicHeading.textContent = data.heading;

  topicList.innerHTML = buildListItems(data.list);

  img.setAttribute("alt", data.imgAlt);

  title.style.color = "#035f9c";

  subtitle.style.fontSize = "1.2em";

  firstList.className = "list is-dimmed";

  content.classList.add("is-highlighted");
  content.classList.toggle("is-dimmed", false);

  img.classList.remove("is-dimmed");
}

function resetPage() {
  const content = document.getElementById("content");
  const title = document.getElementById("pageTitle");
  const subtitle = document.getElementById("subtitle");
  const status = document.getElementById("status");
  const topicHeading = document.getElementById("topicHeading");
  const topicList = document.getElementById("topicList");
  const img = document.getElementById("trifectaImg");
  const selectElem = document.getElementById("webdevlist");

  title.textContent = DEFAULTS.title;
  subtitle.textContent = DEFAULTS.subtitle;
  status.textContent = DEFAULTS.status;

  topicHeading.textContent = DEFAULTS.heading;

  topicList.innerHTML = buildListItems([
    "Defines the structure and content of a web page.",
    "Without HTML there's nothing for the browser to display."
  ]);

  img.setAttribute("src", DEFAULTS.imgSrc);
  img.setAttribute("alt", DEFAULTS.imgAlt);

  title.style.color = "";
  subtitle.style.fontSize = "";

  content.classList.remove("is-highlighted");
  content.classList.remove("is-dimmed");

  document.querySelector("#topics ul.list").className = "list";

  selectElem.value = "choose";
}

function init() {
  const selectElem = document.getElementById("webdevlist");
  const resetBtn = document.getElementById("resetBtn");

  selectElem.addEventListener("change", () => {
    const codeValue = selectElem.value;
    if (codeValue === "choose") {
      resetPage();
      return;
    }
    setActiveTopic(codeValue);
  });

  resetBtn.addEventListener("click", resetPage);
}

init();