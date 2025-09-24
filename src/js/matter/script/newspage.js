import { getAllPostsBySection, getUniquePost } from "../../appwrite/services/posts.js";
import { createCarousel } from "./carousel.js";

const params = new URLSearchParams(window.location.search);
const section = params.get("section");
const matter_id = params.get("matter_id");

function handleNavigation(matter_id) {
  return `matter.html?section=${section}&matter_id=${matter_id}`;
}

function getMatterDate(createdAt) {
  const date = new Date(createdAt);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("pt-BR", options);
}

function createLinks(sources) {
  const container = document.createElement("div");
  container.style.marginTop = "12px";

  const prefix = document.createElement("span");
  prefix.textContent = "Fontes:";
  prefix.style.fontWeight = "bold";
  container.appendChild(prefix);

  const linksWrapper = document.createElement("div");
  linksWrapper.classList.add("d-flex", "flex-column", "gap-2");
  linksWrapper.style.marginTop = "8px";

  sources.forEach((src) => {
    const link = document.createElement("a");
    link.href = src;
    link.textContent = src;
    link.classList.add("link", "source-link");
    link.target = "_blank";

    linksWrapper.appendChild(link);
  });

  container.style.marginBottom = "24px";

  container.appendChild(linksWrapper);
  return container;
}


function createCard(cardArea, relatedArticlesCard) {
  const cardImage = cardArea.querySelector(".img-fluid");
  cardImage.src = relatedArticlesCard.matter_image;
  cardImage.alt = "matter-image";

  cardArea.querySelector("a").href = handleNavigation(relatedArticlesCard.$id);
  cardArea.querySelector(".card-body .card-text").textContent =
    relatedArticlesCard.title;
}

function createMatter(matter, carouselContainer) {
  const matterInfoArea = document
    .querySelector(".models #matter-info")
    .cloneNode(true);

  const matterImage = matterInfoArea.querySelector("#thumbmail-image");
  matterImage.src = matter.matter_image;
  matterImage.alt = "matter_image";

  matterInfoArea.querySelector(".article-infos h2").textContent = matter.title;
  matterInfoArea.querySelector(
    ".fst-italic small"
  ).textContent = `Por ${matter.name} | ${matter.email} - ${getMatterDate(
    matter.$createdAt
  )}`;

  const matterTextsArea = matterInfoArea.querySelector(".article-text");
  matterTextsArea.textContent = matter.content;

  const matterInfoWrapper = document.createElement("div");
  matterInfoWrapper.appendChild(matterInfoArea);
  matterInfoWrapper.appendChild(carouselContainer);

  if (matter.sources && matter.sources.length > 0) {
    const linkContainer = createLinks(matter.sources);
    matterInfoWrapper.appendChild(linkContainer);
  }

  document.querySelector("#matter-info-area").appendChild(matterInfoWrapper);
}

async function init() {
  const post = await getUniquePost(matter_id);
  const carouselInfo = post.textImages ? JSON.parse(post.textImages) : [];
  const otherMatters = await getAllPostsBySection(6, post.displayLocation);
  const carouselContainer = document
    .querySelector(".models #carousel-area")
    .cloneNode(true);

  if (carouselInfo.length > 0) createCarousel(carouselInfo, carouselContainer);

  createMatter(post, carouselContainer);

  otherMatters.rows.forEach((relatedArticlesCard) => {
    const cardArea = document
      .querySelector(".models #related-articles-card")
      .cloneNode(true);

    cardArea.style.display = "block";
    createCard(cardArea, relatedArticlesCard);
    document.querySelector("#related-articles-area").appendChild(cardArea);
  });
}

init();
