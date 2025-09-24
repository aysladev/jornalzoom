function createSetCard(setCardArea, setCard) {
  const cardImage = setCardArea.querySelector(".img-fluid");
  cardImage.src = setCard.cardImage;
  cardImage.alt = setCard.altCard;

  setCardArea.querySelector(".bg-tag").textContent = setCard.tag;
  setCardArea.querySelector(".card-headline").textContent =
    setCard.title;
  setCardArea.querySelector(".text-body-secondary").textContent =
    setCard.description;
}

function initSetCard() {
  setCardJson.forEach((setCard) => {
    const cardArea = document
      .querySelector(".models #set-card")
      .cloneNode(true);
    cardArea.style.display = "block";
    createSetCard(cardArea, setCard); 
    document.querySelector("#set-card-area").appendChild(cardArea);
  });
}
initSetCard();