// main.js
import { getParkData, parkInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

const parkData = getParkData();

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  if (!introEl) return;

  introEl.innerHTML = `<h1>${data.fullName}</h1>
    <p>${data.description}</p>`;
}

function setParkInfoLinks(links) {
  const infoEl = document.querySelector(".info");
  if (!infoEl) return;

  // Transform array of objects into an array of HTML strings.
  const html = links.map(mediaCardTemplate);

  // Join and insert for better performance than repeated innerHTML updates.
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

setHeaderFooter(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks);