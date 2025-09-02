function createCard(cardArea, categoryCard) {
  cardArea.querySelector(".card-body .card-text").textContent =
    categoryCard.description;
  cardArea.querySelector(".card-body .card-title").textContent =
    categoryCard.title;
  cardArea.querySelector(".card-header").textContent =
    categoryCard.tag;
}

function init() {
  categoryCardJson.forEach((categoryCard) => {
    const cardArea = document
      .querySelector(".models #category-card")
      .cloneNode(true);
    cardArea.style.display = "block";
    createCard(cardArea, categoryCard);
    document.querySelector("#category-card-area").appendChild(cardArea);
  });
}
init();