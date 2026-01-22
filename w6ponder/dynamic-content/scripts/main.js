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
const yearEl = document.getElementById("year");
const navToggle = document.querySelector(".nav_toggle");
const siteNav = document.getElementById("site_nav");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function starsAriaLabel(stars) {
  const count = Array.from(stars).filter((c) => c === "⭐").length;
  return `${count} out of 5 stars`;
}

function renderMovieCard(movie, index) {
  const safeTitle = escapeHtml(movie.title);
  const safeDate = escapeHtml(movie.date);
  const safeAges = escapeHtml(movie.ages);
  const safeGenre = escapeHtml(movie.genre);
  const safeDesc = escapeHtml(movie.description);
  const safeAlt = escapeHtml(movie.imgAlt);
  const safeStars = movie.stars;

  const titleId = `m${index + 1}_title`;

  return `
    <article class="movie_card" aria-labelledby="${titleId}">
      <div class="movie_layout">
        <figure class="movie_media">
          <img
            src="${movie.imgSrc}"
            alt="${safeAlt}"
            loading="lazy"
            width="700"
            height="900" />
        </figure>

        <div class="movie_title_area">
          <h2 id="${titleId}" class="movie_title">${safeTitle}</h2>
        </div>

        <div class="movie_info" role="group" aria-label="Movie details">
          <p class="meta_row"><span class="meta_label">Release Date:</span> ${safeDate}</p>
          <p class="meta_row"><span class="meta_label">Recommended Age:</span> ${safeAges}</p>
          <p class="meta_row"><span class="meta_label">Genre:</span> ${safeGenre}</p>
          <p class="meta_row">
            <span class="meta_label">Rating:</span>
            <span class="stars" role="img" aria-label="${starsAriaLabel(safeStars)}">${safeStars}</span>
          </p>
        </div>

        <p class="movie_desc">${safeDesc}</p>
      </div>
    </article>
  `;
}

function renderMovies(list) {
  if (!movieListEl) return;
  movieListEl.innerHTML = "";
  list.forEach((movie, index) => {
    movieListEl.insertAdjacentHTML("beforeend", renderMovieCard(movie, index));
  });
}

function setYear() {
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

function setupNavToggle() {
  if (!navToggle || !siteNav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.toggleAttribute("data-open", !isOpen);
  });
}

setYear();
setupNavToggle();
renderMovies(movies);