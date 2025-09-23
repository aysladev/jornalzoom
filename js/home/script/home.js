import { getAllPosts, getAllPostsBySection } from "/../../appwrite/services/posts.js";
import { tags } from "/../../utils/tags.js";
console.log("🔍 Variáveis de ambiente:", import.meta.env);
// função padrão que cria os links das nossas paginas
function handleNavigation(sectionName, matter_id) {
  return `matter.html?section=${sectionName}&matter_id=${matter_id}`;
}

function createCard(cardArea, interestingCard) {
  // definindo o link da pagina no nosso <a>
  const highlightLink = cardArea.querySelector("#interesting-card-link");
  highlightLink.href = handleNavigation("interesting", interestingCard.$id);

  const cardImage = cardArea.querySelector(".card-img-top");
  cardImage.src = interestingCard.matter_image;
  cardImage.alt = "matter-image";

  cardArea.querySelector(".card-img-overlay .bg-tag .card-title").textContent =
    tags[interestingCard.tag];
  cardArea.querySelector(".card-body .card-text").textContent =
    interestingCard.title;
}

async function initInteresting() {
  try {
    const posts = await getAllPostsBySection(4, "1");
    if (!posts?.rows?.length) return; // Evita erro se não houver retorno

    posts.rows.forEach((interestingCard) => {
      const cardArea = document
        .querySelector(".models #interesting-card")
        .cloneNode(true);
      cardArea.style.display = "block";
      createCard(cardArea, interestingCard);
      document.querySelector("#interesting-card-area").appendChild(cardArea);
    });
  } catch (error) {
    console.error("Erro ao inicializar os cards Interessantes:", error);
  }
}

function createHighlightCard(highlightCardArea, highlightCard, index) {
  const highlightLink = highlightCardArea.querySelector("a");
  highlightLink.href = handleNavigation("highlight", highlightCard.$id);

  const cardImage = highlightCardArea.querySelector(".card-img");
  cardImage.src = highlightCard.matter_image;
  cardImage.alt = "matter-image";

  if (index !== 0) {
    highlightCardArea.classList.add("p-0");
  } else {
    cardImage.style.height = "450px";
    highlightCardArea.style.gridRow = "span 2";
    highlightCardArea.style.gridColumn = "span 2";
  }

  highlightCardArea.querySelector(
    ".highlight-infos .bg-tag .card-title"
  ).textContent = tags[highlightCard.tag];
  highlightCardArea.querySelector(".card-body .card-text").textContent =
    highlightCard.title;
}

async function initPrincipalBanners() {
  try {
    const posts = await getAllPosts(5);
    if (!posts?.rows?.length) return; // Evita erro se não houver retorno

    posts.rows.forEach((highlightCard, index) => {
      const highlightCardArea = document
        .querySelector("#highlight-card")
        .cloneNode(true);

      createHighlightCard(highlightCardArea, highlightCard, index);

      document.querySelector("#highlight-area").appendChild(highlightCardArea);
    });
  } catch (error) {
    console.error("Erro ao inicializar os banners principais:", error);
  }
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
  highlightLink.href = handleNavigation("community", communityCard.$id);

  const cardImage = communityCardArea.querySelector(".img-fluid");
  cardImage.src = communityCard.matter_image;
  cardImage.alt = "matter-image";

  communityCardArea.querySelector(".bg-tag").textContent = tags[communityCard.tag];
  communityCardArea.querySelector(".card-headline").textContent =
    communityCard.title;
  communityCardArea.querySelector(".text-body-secondary").textContent =
    communityCard.description;
}

async function initCommunityCard() {
  try {
    const posts = await getAllPostsBySection(6, "2");
    if (!posts?.rows?.length) return; // Evita erro se não houver retorno

    posts.rows.forEach((communityCard) => {
      const cardArea = document
        .querySelector(".models #community-card")
        .cloneNode(true);
      cardArea.style.display = "block";
      createCommunityCard(cardArea, communityCard);
      document.querySelector("#community-card-area").appendChild(cardArea);
    });
  } catch (error) {
    console.error("Erro ao inicializar os cards da comunidade:", error);
  }
}

function createSeeThisCard(cardArea, cardData) {
  const highlightLink = cardArea.querySelector("#see-this-card-link");
  highlightLink.href = handleNavigation("see_this", cardData.$id);

  const img = cardArea.querySelector("img");
  img.src = cardData.matter_image;
  img.alt = "matter-image";

  cardArea.querySelector(".card-title").textContent = tags[cardData.tag];
  cardArea.querySelector(".card-text").textContent = cardData.title;
}

async function initSeeThisCards() {
  try {
    const posts = await getAllPostsBySection(6, "3");
    if (!posts?.rows?.length) return; // Evita erro se não houver retorno

    posts.rows.forEach((cardData) => {
      const cardArea = document
        .querySelector(".models #see-this-card")
        .cloneNode(true);
      cardArea.style.display = "block";
      createSeeThisCard(cardArea, cardData);
      document.querySelector("#see-this-card-area").appendChild(cardArea);
    });
  } catch (error) {
    console.error("Erro ao inicializar os cards 'Viu Isso Aqui?':", error);
  }
}

// Inicializar
initPrincipalBanners();
initInteresting();
// initNav();
initCommunityCard();
initSeeThisCards();
