// Add a simple paragraph
const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

// Add an image
const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "Random Image");
document.body.appendChild(newImage);

// Add a list using innerHTML
const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);

// Add a new section with heading and paragraph
const newSection = document.createElement("section");
const newH2 = document.createElement("h2");
newH2.innerText = "DOM Basics";
const newP = document.createElement("p");
newP.innerText = "This was added through Javascript";

newSection.appendChild(newH2);
newSection.appendChild(newP);
document.body.appendChild(newSection);