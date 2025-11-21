// main.js
// WDD 131 - Recipe Book Part 1
// Uses the data from recipes.mjs (named or default export) and hydrates the UI.
// Also wires up a simple search that picks a matching recipe by name or tag.

import * as recipesModule from "./recipes.mjs";

function getRecipesArray(module) {
  // Support either: export const recipes = [...]
  if (Array.isArray(module.recipes)) {
    return module.recipes;
  }
  // Or: export default [...]
  if (Array.isArray(module.default)) {
    return module.default;
  }
  return null;
}

const recipesData = getRecipesArray(recipesModule);

/**
 * Safely fills the featured recipe card using data from a single recipe object.
 * The HTML provides sensible defaults so if any property is missing,
 * the layout still looks fine.
 */
function hydrateFeaturedRecipe(recipe) {
  if (!recipe) return;

  const titleEl = document.querySelector("[data-recipe-title]");
  const metaEl = document.querySelector("[data-recipe-meta]");
  const descEl = document.querySelector("[data-recipe-description]");
  const ingredientsList = document.querySelector("[data-recipe-ingredients]");
  const instructionsList = document.querySelector("[data-recipe-instructions]");
  const imageEl = document.querySelector(".recipe-image");
  const ratingSpan = document.querySelector(".rating");

  // Title
  const title = recipe.name || recipe.title;
  if (titleEl && title) {
    titleEl.textContent = title;
  }

  // Meta info: time + servings
  if (metaEl) {
    const prep = recipe.prepTime || recipe.prep || recipe.prep_time;
    const cook = recipe.cookTime || recipe.cook || recipe.cook_time;
    const total = recipe.totalTime || recipe.total || recipe.time;
    const servings = recipe.servings || recipe.yield || recipe.portions;

    const parts = [];

    if (total) {
      parts.push(`${total} total`);
    } else if (prep || cook) {
      const prepPart = prep ? `Prep: ${prep}` : "";
      const cookPart = cook ? `Cook: ${cook}` : "";
      const combined = [prepPart, cookPart].filter(Boolean).join(" • ");
      if (combined) parts.push(combined);
    }

    if (servings) {
      parts.push(`${servings} servings`);
    }

    if (parts.length > 0) {
      metaEl.textContent = parts.join(" • ");
    }
  }

  // Description
  if (descEl && recipe.description) {
    descEl.textContent = recipe.description;
  }

  // Ingredients
  if (ingredientsList && Array.isArray(recipe.ingredients)) {
    ingredientsList.innerHTML = "";
    recipe.ingredients.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ingredientsList.appendChild(li);
    });
  }

  // Instructions
  if (instructionsList && Array.isArray(recipe.instructions)) {
    instructionsList.innerHTML = "";
    recipe.instructions.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      instructionsList.appendChild(li);
    });
  }

  // Image
  if (imageEl && (recipe.image || recipe.imageUrl)) {
    imageEl.src = recipe.image || recipe.imageUrl;
    imageEl.alt =
      recipe.imageAlt || `Finished dish of ${recipe.name || recipe.title || "this recipe"}`;
  }

  // Rating (accessible)
  if (ratingSpan && typeof recipe.rating === "number") {
    const outOf = typeof recipe.maxRating === "number" ? recipe.maxRating : 5;
    const roundedRating = Math.round(recipe.rating);
    ratingSpan.setAttribute(
      "aria-label",
      `Rating: ${recipe.rating} out of ${outOf} stars`
    );
    ratingSpan.innerHTML = "";

    for (let i = 0; i < outOf; i += 1) {
      const star = document.createElement("span");
      star.setAttribute("aria-hidden", "true");

      if (i < roundedRating) {
        star.className = "icon-star";
        star.textContent = "⭐";
      } else {
        star.className = "icon-star-empty";
        star.textContent = "☆";
      }

      ratingSpan.appendChild(star);
    }
  }
}

/**
 * Initialize page: show first recipe (if data is available)
 */
function initFeaturedRecipe() {
  if (!recipesData || recipesData.length === 0) return;
  hydrateFeaturedRecipe(recipesData[0]);
}

/**
 * Simple search: on submit, find first recipe whose name or tags
 * include the search term and display it in the featured card.
 */
function initSearch() {
  const form = document.querySelector(".search-form");
  if (!form || !recipesData || recipesData.length === 0) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = form.querySelector("input[name='search']");
    const query = (searchInput?.value || "").trim().toLowerCase();

    if (!query) {
      // If empty search, reset to first recipe
      hydrateFeaturedRecipe(recipesData[0]);
      return;
    }

    const match = recipesData.find((recipe) => {
      const name = (recipe.name || recipe.title || "").toLowerCase();
      const tags = Array.isArray(recipe.tags)
        ? recipe.tags.join(" ").toLowerCase()
        : "";
      return name.includes(query) || tags.includes(query);
    });

    if (match) {
      hydrateFeaturedRecipe(match);
    }
    // If no match found, keep the current visible recipe; could also show a message.
  });
}

// Run when the module is loaded
initFeaturedRecipe();
initSearch();