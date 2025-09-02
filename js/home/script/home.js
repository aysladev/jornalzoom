// função padrão que cria os links das nossas paginas
function handleNavigation(sectionName, slug) {
  return `matter.html?section=${sectionName}&slug=${slug}`;
}

function createCard(cardArea, interestingCard) {
  // definindo o link da pagina no nosso <a>
  const highlightLink = cardArea.querySelector("#interesting-card-link");
  highlightLink.href = handleNavigation("interesting", interestingCard.slug);

  const cardImage = cardArea.querySelector(".card-img-top");
  cardImage.src = interestingCard.cardImage;
  cardImage.alt = interestingCard.altCard;

  cardArea.querySelector(".card-img-overlay .bg-tag .card-title").textContent =
    interestingCard.tag;
  cardArea.querySelector(".card-body .card-text").textContent =
    interestingCard.description;
}

function init() {
  interestingCardJson.forEach((interestingCard) => {
    const cardArea = document
      .querySelector(".models #interesting-card")
      .cloneNode(true);
    cardArea.style.display = "block";
    createCard(cardArea, interestingCard);
    document.querySelector("#interesting-card-area").appendChild(cardArea);
  });
}

function createHighlightCard(highlightCardArea, highlightCard) {
  const highlightLink = highlightCardArea.querySelector("a");
  highlightLink.href = handleNavigation("highlight", highlightCard.slug);

  const cardImage = highlightCardArea.querySelector(".card-img");
  cardImage.src = highlightCard.cardImage;
  cardImage.alt = highlightCard.altCard;

  if (!highlightCard.main) {
    highlightCardArea.classList.add("p-0");
  } else {
    cardImage.style.height = "450px";
    highlightCardArea.style.gridRow = "span 2";
    highlightCardArea.style.gridColumn = "span 2";
  }

  highlightCardArea.querySelector(
    ".highlight-infos .bg-tag .card-title"
  ).textContent = highlightCard.tag;
  highlightCardArea.querySelector(".card-body .card-text").textContent =
    highlightCard.description;
}

function initHighlightCard() {
  highlightCardJson.forEach((highlightCard) => {
    const highlightCardArea = document
      .querySelector("#highlight-card")
      .cloneNode(true);

    createHighlightCard(highlightCardArea, highlightCard);

    document.querySelector("#highlight-area").appendChild(highlightCardArea);
  });
}

function createNav(nav) {
  const newLi = document.createElement("li");
  const newA = document.createElement("a");

  newLi.classList.add("nav-item");
  newA.classList.add(
    "section-buttom",
    "link-offset-2",
    "link-offset-3-hover",
    "link-underline",
    "link-underline-opacity-0",
    "link-underline-opacity-75-hover"
  );
  newA.href = nav.href;
  newA.textContent = nav.label;

  newLi.appendChild(newA);
  return newLi;
}

// function initNav() {
//   navJson.forEach((nav) => {
//     const newNav = createNav(nav);
//     document.querySelector("#nav-menu").appendChild(newNav);
//   });
// }

function createCommunityCard(communityCardArea, communityCard) {
  const highlightLink = communityCardArea.querySelector("#community-card-link");
  highlightLink.href = handleNavigation("community", communityCard.slug);

  const cardImage = communityCardArea.querySelector(".img-fluid");
  cardImage.src = communityCard.cardImage;
  cardImage.alt = communityCard.altCard;

  communityCardArea.querySelector(".bg-tag").textContent = communityCard.tag;
  communityCardArea.querySelector(".card-headline").textContent =
    communityCard.title;
  communityCardArea.querySelector(".text-body-secondary").textContent =
    communityCard.description;
}

function initCommunityCard() {
  communityCardJson.forEach((communityCard) => {
    const cardArea = document
      .querySelector(".models #community-card")
      .cloneNode(true);
    cardArea.style.display = "block";
    createCommunityCard(cardArea, communityCard); // corrigido aqui
    document.querySelector("#community-card-area").appendChild(cardArea);
  });
}

function createSeeThisCard(cardArea, cardData) {
  const highlightLink = cardArea.querySelector("#see-this-card-link");
  highlightLink.href = handleNavigation("see_this", cardData.slug);

  const img = cardArea.querySelector("img");
  img.src = cardData.cardImage;
  img.alt = cardData.altCard;

  cardArea.querySelector(".card-title").textContent = cardData.tag;
  cardArea.querySelector(".card-text").textContent = cardData.title;
}

function initSeeThisCards() {
  seeThisCardJson.forEach((cardData) => {
    const cardArea = document
      .querySelector(".models #see-this-card")
      .cloneNode(true);
    cardArea.style.display = "block";
    createSeeThisCard(cardArea, cardData);
    document.querySelector("#see-this-card-area").appendChild(cardArea);
  });
}

// Inicializar

initHighlightCard();
init();
// initNav();
initCommunityCard();
initSeeThisCards();
