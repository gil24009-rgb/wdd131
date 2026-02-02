// setHeaderFooter.mjs
// Header and footer should be consistent across pages, so we centralize them here.

import { parkInfoTemplate, footerTemplate } from "./templates.mjs";

function setHeaderInfo(data) {
  // Insert data into disclaimer section
  const disclaimer = document.querySelector(".disclaimer > a");
  if (disclaimer) {
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;
  }

  // Update the title of the site
  document.querySelector("head > title").textContent = data.fullName;

  // Set the banner image
  const heroImg = document.querySelector(".hero-banner > img");
  if (heroImg && Array.isArray(data.images) && data.images[0]) {
    heroImg.src = data.images[0].url;
    heroImg.alt = data.images[0].altText || `${data.fullName} hero image`;
  }

  // Set the rest of the park specific info in the header
  const heroContent = document.querySelector(".hero-banner__content");
  if (heroContent) {
    heroContent.innerHTML = parkInfoTemplate(data);
  }
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  if (!footerEl) return;
  footerEl.innerHTML = footerTemplate(data);
}

export default function setHeaderFooter(data) {
  setHeaderInfo(data);
  setFooter(data);
}