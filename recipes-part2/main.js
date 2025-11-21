// main.js – WDD 131: Recipe Book Part 2
// Uses recipes.mjs to:
//  - show a random recipe on load
//  - render recipe cards from template functions
//  - filter recipes by search query

import recipes from "./recipes.mjs";

/* ---------- Random Helpers ---------- */

/** Random integer between 0 and max-1 */
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

/** Return random entry from a list */
function getRandomListEntry(list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[getRandomNumber(list.length)];
}

/* ---------- Template Functions ---------- */

/** Build HTML for tag pills */
function tagsTemplate(tags) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return "";
  }

  const items = tags
    .map(tag => `<li class="recipe__tag">${String(tag)}</li>`)
    .join("");

  return `<ul class="recipe__tags">${items}</ul>`;
}

/** Build HTML for rating stars (out of 5) with accessible aria-label */
function ratingTemplate(rating) {
  const numeric = Number(rating);
  const safeRating = Number.isNaN(numeric) ? 0 : numeric;
  const rounded = Math.round(safeRating);
  const outOf = 5;

  let html = `<span class="rating" role="img" aria-label="Rating: ${rounded} out of ${outOf} stars">`;

  for (let i = 1; i <= outOf; i += 1) {
    if (i <= rounded) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }

  html += `</span>`;
  return html;
}

/** Build complete recipe figure from a recipe object (recipes.mjs 구조 사용) */
function recipeTemplate(recipe) {
  if (!recipe) return "";

  const {
    name,
    image,
    description,
    tags,
    rating,
    prepTime,
    cookTime,
    recipeYield,
    url
  } = recipe;

  // image 값은 ./images/... 형태이므로 그대로 사용
  const imgSrc = image || "images/chocolate-chip-cookies.jpg";
  const imgAlt = name || "Recipe image";
  const linkHref = url || "#";

  const metaParts = [];
  if (prepTime) metaParts.push(`Prep: ${prepTime}`);
  if (cookTime) metaParts.push(`Cook: ${cookTime}`);
  if (recipeYield) metaParts.push(recipeYield);
  const metaText = metaParts.join(" • ");

  return `
<figure class="recipe">
  <div class="recipe__image-wrapper">
    <img
      src="${imgSrc}"
      alt="${imgAlt}"
      class="recipe__image"
      loading="lazy"
    >
  </div>
  <figcaption class="recipe__body">
    ${tagsTemplate(tags)}
    <h2 class="recipe__title">
      <a href="${linkHref}">${name}</a>
    </h2>
    <p class="recipe__ratings">
      ${ratingTemplate(rating)}
    </p>
    ${metaText ? `<p class="recipe__meta">${metaText}</p>` : ""}
    ${
      description
        ? `<p class="recipe__description">${description}</p>`
        : ""
    }
  </figcaption>
</figure>
  `;
}

/* ---------- Rendering & Filtering ---------- */

/** Render a list of recipes into #recipes-list */
function renderRecipes(recipeList) {
  const container = document.querySelector("#recipes-list");
  if (!container) return;

  if (!Array.isArray(recipeList) || recipeList.length === 0) {
    container.innerHTML = `
      <p class="recipes__empty">
        No recipes match your search. Try a different keyword.
      </p>
    `;
    return;
  }

  const html = recipeList.map(recipeTemplate).join("");
  container.innerHTML = html;
}

/** Sort recipes by name alphabetically */
function sortByName(a, b) {
  return (a.name || "").localeCompare(b.name || "");
}

/** Filter recipes by query in name, description, tags, ingredients */
function filterRecipes(query) {
  const q = (query || "").trim().toLowerCase();

  // Empty query → 전체 레시피 이름순 정렬
  if (!q) {
    return [...recipes].sort(sortByName);
  }

  return recipes
    .filter(recipe => {
      const name = (recipe.name || "").toLowerCase();
      const description = (recipe.description || "").toLowerCase();
      const tags = Array.isArray(recipe.tags)
        ? recipe.tags.join(" ").toLowerCase()
        : "";
      const ingredients = Array.isArray(recipe.recipeIngredient)
        ? recipe.recipeIngredient.join(" ").toLowerCase()
        : "";

      const matchesName = name.includes(q);
      const matchesDescription = description.includes(q);
      const matchesTags = tags.includes(q);
      const matchesIngredients = ingredients.includes(q);

      return (
        matchesName ||
        matchesDescription ||
        matchesTags ||
        matchesIngredients
      );
    })
    .sort(sortByName);
}

/** Search form submit handler */
function searchHandler(event) {
  event.preventDefault();

  const input = document.querySelector("#search-input");
  const query = input ? input.value : "";

  const filtered = filterRecipes(query);
  renderRecipes(filtered);
}

/* ---------- Init ---------- */

/** Initialize: random recipe on load + search wiring */
function init() {
  // 1. 랜덤 레시피 1개 선택
  const randomRecipe = getRandomListEntry(recipes);

  // 2. 해당 레시피만 먼저 렌더링 (배열로 감싸서 renderRecipes 재사용)
  if (randomRecipe) {
    renderRecipes([randomRecipe]);
  } else {
    renderRecipes([]);
  }

  // 3. 검색 이벤트 연결
  const form = document.querySelector("#search-form");
  if (form) {
    form.addEventListener("submit", searchHandler);
  }
}

// 시작
init();