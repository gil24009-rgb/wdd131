const movies = [
  {
    title: "Spider-Man: Into the Spider-Verse",
    date: "Dec 14, 2018",
    description:
      "Miles Morales becomes the Spider-Man of his reality and crosses paths with others from the multiverse.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/spiderman.png",
    imgAlt: "Miles Morales swinging through the city",
    ages: "10+",
    genre: "Action/Adventure",
    stars: "⭐⭐⭐⭐⭐"
  },
  {
    title: "The Other Side of Heaven",
    date: "December 14, 2001",
    description:
      "Based on the true story of Elder John H. Groberg, a missionary in Tonga in the 1950s, this film tells a powerful story of faith, hardship, and miracles.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/heaven.png",
    imgAlt: "Poster for The Other Side of Heaven showing a missionary and tropical landscape",
    ages: "10+",
    genre: "Drama/Religious",
    stars: "⭐⭐⭐⭐"
  },
  {
    title: "Luca",
    date: "June 18, 2021",
    description:
      "Two sea monsters experience a life-changing summer on the Italian Riviera.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/luca.png",
    imgAlt: "Luca and Alberto standing on the beach",
    ages: "6+",
    genre: "Family/Fantasy",
    stars: "⭐⭐⭐⭐"
  },
  {
    title: "17 Miracles",
    date: "June 3, 2011",
    description:
      "A moving depiction of the Willie Handcart Company's journey west in 1856, focusing on the miraculous events that helped early pioneers survive one of the harshest migrations in history.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/miracles.jpg",
    imgAlt: "Movie poster for 17 Miracles showing handcart pioneers walking through snow",
    ages: "12+",
    genre: "Historical/Religious",
    stars: "⭐⭐⭐⭐"
  }
];

const movieListEl = document.getElementById("movie_list");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getStarCount(starsString) {
  return Array.from(String(starsString)).filter((c) => c === "⭐").length;
}

function renderStars(count) {
  const clamped = Math.max(0, Math.min(5, count));
  let html = "";

  for (let i = 1; i <= 5; i += 1) {
    const filled = i <= clamped ? "filled" : "";
    html += `<span class="star ${filled}" aria-hidden="true">★</span>`;
  }

  return `
    <span class="stars" role="img" aria-label="${clamped} out of 5 stars">
      ${html}
    </span>
  `;
}

function renderMovie(movie) {
  const title = escapeHtml(movie.title);
  const date = escapeHtml(movie.date);
  const ages = escapeHtml(movie.ages);
  const genre = escapeHtml(movie.genre);
  const desc = escapeHtml(movie.description);
  const alt = escapeHtml(movie.imgAlt);

  const starCount = getStarCount(movie.stars);

  return `
    <article class="movie_card">
      <div class="movie_grid">
        <figure class="movie_media">
          <img class="movie_poster" src="${movie.imgSrc}" alt="${alt}" loading="lazy" />
        </figure>

        <div class="movie_right">
          <h2 class="movie_title">${title}</h2>

          <div class="meta" role="group" aria-label="Movie details">
            <div class="meta_row">
              <span class="meta_label">Release Date:</span>
              <span>${date}</span>
            </div>
            <div class="meta_row">
              <span class="meta_label">Recommended Age:</span>
              <span>${ages}</span>
            </div>
            <div class="meta_row">
              <span class="meta_label">Genre:</span>
              <span>${genre}</span>
            </div>
            <div class="meta_row">
              <span class="meta_label">Rating:</span>
              <span>${renderStars(starCount)}</span>
            </div>
          </div>
        </div>

        <p class="movie_desc">${desc}</p>
      </div>
    </article>
  `;
}

function renderAll() {
  movieListEl.innerHTML = "";
  movies.forEach((movie) => {
    movieListEl.insertAdjacentHTML("beforeend", renderMovie(movie));
  });
}

renderAll();