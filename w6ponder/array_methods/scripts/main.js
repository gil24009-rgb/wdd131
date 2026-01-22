"use strict";

/*
  WDD 131 Ponder
  Array methods plus template literals
  Some output goes on the page, other output goes to the console
*/

function convert(letter) {
  switch (letter) {
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    case "F":
      return 0;
    default:
      throw new Error("Not a valid grade letter");
  }
}

const words = ["watermelon", "peach", "apple", "tomato", "grape"];

const students = [
  { last: "Andrus", first: "Aaron" },
  { last: "Masa", first: "Manny" },
  { last: "Tanda", first: "Tamanda" },
];

const consoleItems = ["one", "two", "three"];

const grades = ["A", "B", "A"];
const fruits = ["Banana", "Orange", "Apple", "Mango"];

function qs(selector) {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

function renderConsoleList(items) {
  const list = qs("#consoleList");
  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderStudents(list) {
  const roster = qs("#studentRoster");

  const html = list
    .map((s) => {
      const fullName = `${s.first} ${s.last}`;
      return `
        <div class="studentCard">${fullName}</div>
      `;
    })
    .join("");

  roster.innerHTML = html;
}

function renderOnPageOutputs() {
  const filtered = words.filter((w) => w.length >= 6);
  qs("#filteredWords").textContent = filtered.join(", ");

  const points = grades.map(convert);
  const total = points.reduce((sum, p) => sum + p, 0);
  const average = total / points.length;

  qs("#gradeSummary").textContent = `${grades.join(", ")}  →  ${points.join(", ")}`;
  qs("#averagePoints").textContent = average.toFixed(2);
}

function consoleDemo() {
  console.log("forEach output");
  consoleItems.forEach((item) => console.log(item));

  console.log("map output");
  const points = grades.map(convert);
  console.log(points);

  console.log("reduce output");
  const total = points.reduce((sum, p) => sum + p, 0);
  console.log(total);

  console.log("average output");
  const average = total / points.length;
  console.log(average);

  console.log("filter output");
  const longWords = words.filter((w) => w.length >= 6);
  console.log(longWords);

  console.log("indexOf output");
  const index = fruits.indexOf("Apple");
  console.log(index);
}

function init() {
  renderConsoleList(consoleItems);
  renderStudents(students);
  renderOnPageOutputs();
  consoleDemo();
}

init();