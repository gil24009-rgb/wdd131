import { articles } from "./articles.js";

const reviewsEl = document.querySelector(".reviews");

function starsToCount(starsString){
  const matches = starsString.match(/⭐/g);
  return matches ? matches.length : 0;
}

function buildArticleMarkup(article){
  const starCount = starsToCount(article.stars);
  const maxStars = 5;

  const safeTitle = article.title;
  const safeAlt = article.imgAlt;

  return `
    <article class="review" aria-labelledby="book-title-${article.id}">
      <section class="review-details" aria-label="Book details">
        <p class="detail date">${article.date}</p>
        <p class="detail age">${article.ages}</p>
        <p class="detail genre">${article.genre}</p>

        <div class="rating" role="img" aria-label="Rating: ${starCount} out of ${maxStars}">
          <span aria-hidden="true">${article.stars}</span>
        </div>
      </section>

      <section class="review-body">
        <h2 id="book-title-${article.id}" class="book-title">${safeTitle}</h2>

        <figure class="cover">
          <img
            src="${article.imgSrc}"
            alt="${safeAlt}"
            loading="lazy"
          />
        </figure>

        <p class="blurb">${article.description}</p>
      </section>
    </article>
  `;
}

function renderArticles(list){
  reviewsEl.innerHTML = list.map(buildArticleMarkup).join("");
}

renderArticles(articles);