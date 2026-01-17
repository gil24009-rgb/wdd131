"use strict";

/*
Required DOM Basics items used here
querySelector, getElementById, setAttribute, textContent, style,
className, classList add remove toggle, value
*/

const selectElem = document.getElementById("webdevlist");
const titleElem = document.querySelector("h1");
const topicTitle = document.getElementById("topicTitle");
const topicList = document.getElementById("topicList");
const img = document.getElementById("trifecta");
const topicsBox = document.getElementById("topics");

const data = {
  html: {
    title: "HyperText Markup Language",
    imgAlt: "HTML logo focus",
    list: [
      "Defines the structure and content of a web page.",
      "Without HTML there's nothing for the browser to display."
    ]
  },
  css: {
    title: "Cascading Style Sheets",
    imgAlt: "CSS styling focus",
    list: [
      "Controls how the HTML elements look.",
      "Without CSS pages look plain and unstyled."
    ]
  },
  js: {
    title: "JavaScript",
    imgAlt: "JavaScript interactivity focus",
    list: [
      "Adds interactivity and dynamic behavior.",
      "Without JavaScript nothing on the page responds dynamically to user actions."
    ]
  }
};

function render(key) {
  if (key === "choose") {
    titleElem.style.color = "";
    topicsBox.classList.remove("picked");
    img.setAttribute("alt", "JS, CSS, and HTML logos");
    topicTitle.textContent = "HyperText Markup Language";
    topicList.className = "list";
    topicList.innerHTML =
      "<li>Defines the structure and content of a web page.</li>" +
      "<li>Without HTML there's nothing for the browser to display.</li>";
    return;
  }

  const item = data[key];
  if (!item) return;

  console.log(selectElem.value);

  topicTitle.textContent = item.title;

  topicList.innerHTML = item.list.map((t) => `<li>${t}</li>`).join("");

  img.setAttribute("alt", item.imgAlt);

  titleElem.style.color = "#000";

  topicList.className = "list";

  topicsBox.classList.toggle("picked", true);
}

selectElem.addEventListener("change", () => {
  render(selectElem.value);
});