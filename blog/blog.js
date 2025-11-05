const articles = [
  {
    id: 1,
    title: 'Septimus Heap Book One: Magyk',
    date: 'July 5, 2022',
    description:
      'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
    imgAlt: 'Book cover for Septimus Heap 1',
    ages: '10-14',
    genre: 'Fantasy',
    stars: '****'
  },
  {
    id: 2,
    title: 'Magnus Chase Book One: Sword of Summer',
    date: 'December 12, 2021',
    description:
      'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
    imgSrc:
      'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
    imgAlt: 'Book cover for Magnus Chase 1',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  },
  // Example new article
  {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description:
      "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐⭐"
  }
];

function buildArticle(article) {
  const post = document.createElement('article');
  post.className = 'post';
  post.setAttribute('aria-labelledby', `post-${article.id}-title`);

  post.innerHTML = `
    <aside class="post-details">
      <dl>
        <div>
          <dt>Author</dt>
          <dd>${article.author || "Unknown"}</dd>
        </div>
        <div>
          <dt>Published</dt>
          <dd><time datetime="${article.date}">${article.date}</time></dd>
        </div>
        <div>
          <dt>Reviewer</dt>
          <dd>Your Name</dd>
        </div>
        <div>
          <dt>Rating</dt>
          <dd aria-label="Rating">${article.stars}</dd>
        </div>
      </dl>
    </aside>

    <div class="post-content">
      <h2 id="post-${article.id}-title" class="post-title">${article.title}</h2>
      <figure class="post-media">
        <img src="${article.imgSrc}" alt="${article.imgAlt}" width="600" height="400" loading="lazy" />
        <figcaption>${article.description}</figcaption>
      </figure>
      <p class="post-excerpt">${article.description}</p>
    </div>
  `;
  return post;
}

function displayArticles() {
  const container = document.getElementById('articles-container');
  articles.forEach(article => {
    const postEl = buildArticle(article);
    container.appendChild(postEl);
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', displayArticles);