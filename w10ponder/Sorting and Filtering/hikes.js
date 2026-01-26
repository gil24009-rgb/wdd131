"use strict";

/*
  Requirements covered
  1) Filter by search string in name, description, tags
  2) Sort filtered results by distance
  3) Render difficulty as boots and placeholders
  4) Random hike shown on initial load
  5) Enter key triggers search
  6) Tag buttons inside cards trigger a search for that tag
*/

const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Coffee Pot Rapids",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

const els = {
  input: document.querySelector("#search"),
  searchBtn: document.querySelector("#searchBtn"),
  clearBtn: document.querySelector("#clearBtn"),
  container: document.querySelector("#hike-container"),
  status: document.querySelector("#statusText")
};

function normalize(str) {
  return String(str || "").trim().toLowerCase();
}

function milesToNumber(distanceStr) {
  // Accepts formats like "3 miles", "2.2 miles"
  const match = String(distanceStr || "").match(/[\d.]+/);
  if (!match) return Number.POSITIVE_INFINITY;
  const value = Number(match[0]);
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

function compareByDistance(a, b) {
  return milesToNumber(a.distance) - milesToNumber(b.distance);
}

function matchesQuery(hike, query) {
  if (!query) return true;

  const q = normalize(query);
  const inName = normalize(hike.name).includes(q);
  const inDesc = normalize(hike.description).includes(q);
  const inTags = hike.tags.some((tag) => normalize(tag).includes(q));

  return inName || inDesc || inTags;
}

function tagButtonsTemplate(tags) {
  return tags
    .map(
      (tag) =>
        `<button type="button" class="tag-btn" data-tag="${escapeHtml(tag)}" aria-label="Search tag ${escapeHtml(
          tag
        )}">${escapeHtml(tag)}</button>`
    )
    .join("");
}

function difficultyTemplate(rating) {
  const max = 5;
  const safeRating = Math.min(Math.max(Number(rating) || 0, 0), max);

  let html = `<span class="rating" role="img" aria-label="Rating ${safeRating} out of ${max}">Difficulty: `;
  for (let i = 1; i <= max; i++) {
    if (i <= safeRating) {
      html += `<span aria-hidden="true">🥾</span>`;
    } else {
      html += `<span aria-hidden="true">▫️</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function hikeCardTemplate(hike) {
  const distanceNum = milesToNumber(hike.distance);
  const distanceLabel = Number.isFinite(distanceNum) ? `${distanceNum} miles` : hike.distance;

  return `
    <article class="hike-card" role="listitem" aria-label="${escapeHtml(hike.name)}">
      <div class="hike-media">
        <img src="${escapeAttr(hike.imgSrc)}" alt="${escapeAttr(hike.imgAlt)}" loading="lazy" />
      </div>

      <div class="hike-content">
        <div class="hike-topline">
          <h2>${escapeHtml(hike.name)}</h2>
          <span class="distance" aria-label="Distance ${escapeAttr(distanceLabel)}">${escapeHtml(hike.distance)}</span>
        </div>

        <div class="hike-tags" aria-label="Tags">
          ${tagButtonsTemplate(hike.tags)}
        </div>

        <p class="desc">${escapeHtml(hike.description)}</p>

        <div class="meta">
          ${difficultyTemplate(hike.difficulty)}
          <p class="directions">${escapeHtml(hike.directions)}</p>
        </div>
      </div>
    </article>
  `;
}

function setStatus(text) {
  els.status.textContent = text;
}

function renderList(list, contextLabel) {
  els.container.innerHTML = list.map(hikeCardTemplate).join("");

  if (!list.length) {
    els.container.innerHTML = `
      <div class="hike-card" role="listitem" aria-label="No results">
        <div class="hike-content">
          <h2>No matches</h2>
          <p class="desc">Try a different keyword, or click Clear to see all hikes.</p>
        </div>
      </div>
    `;
  }

  const label = contextLabel ? `${contextLabel}. ` : "";
  setStatus(`${label}Showing ${list.length} hike${list.length === 1 ? "" : "s"}.`);
}

function searchAndRender() {
  const query = els.input.value;
  const filtered = hikes.filter((hike) => matchesQuery(hike, query));
  const sorted = filtered.slice().sort(compareByDistance);
  renderList(sorted, query.trim() ? `Results for "${query.trim()}"` : "All hikes");
}

function showRandomHike() {
  const randomIndex = Math.floor(Math.random() * hikes.length);
  renderList([hikes[randomIndex]], "Random hike");
}

function clearSearch() {
  els.input.value = "";
  searchAndRender();
  els.input.focus();
}

function handleEnter(event) {
  if (event.key === "Enter") searchAndRender();
}

function handleTagClick(event) {
  const btn = event.target.closest(".tag-btn");
  if (!btn) return;
  const tag = btn.getAttribute("data-tag") || "";
  els.input.value = tag;
  searchAndRender();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function init() {
  els.searchBtn.addEventListener("click", searchAndRender);
  els.clearBtn.addEventListener("click", clearSearch);
  els.input.addEventListener("keydown", handleEnter);
  els.container.addEventListener("click", handleTagClick);

  showRandomHike();
}

init();