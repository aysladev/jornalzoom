// recuperando parametros da query da pagina
const params = new URLSearchParams(window.location.search);
// recuperando o parametro de section do artigo
const section = params.get("section");
// recuperando parametro de id do artigo
const slug = params.get("slug");

// pegando o arquivo por tipo de section
// const jsonBySection = {
//   highlight: highlightCardJson,
//   interesting: interestingCardJson,
//   community: communityCardJson,
//   see_this: seeThisCardJson,
// };

// função padrão para criar o link que jogaremos na nossa query
function handleNavigation(slugName) {
  return `matter.html?section=${section}&slug=${slugName}`;
}

function createText(matter, matterTextsArea) {
  matter.texts.forEach((text) => {
    if (text.image) {
      const newImage = document.createElement("img");
      newImage.src = text.image;

      matterTextsArea.appendChild(newImage);
    } else {
      const newP = document.createElement("p");

      // Verifica se o texto contém uma tag de link <a>
      const linkRegex = /<a>(.*?)<\/a>/;
      const match = text.text.match(linkRegex);

      if (match) {
        // Se encontrou link, cria o texto antes e o link
        const partes = text.text.split(linkRegex);
        newP.append(document.createTextNode(partes[0])); // texto antes do link

        const link = document.createElement("a");
        link.href = match[1];
        link.classList.add("link");
        link.textContent = match[1];
        link.target = "_blank"; // abre em nova aba
        newP.appendChild(link);

        if (partes[2]) {
          newP.append(document.createTextNode(partes[2])); // texto após o link, se houver
        }
      } else {
        // Caso não tenha link, só adiciona o texto normal
        newP.textContent = text.text;
      }

      matterTextsArea.appendChild(newP);
    }
  });
}

function createCard(cardArea, relatedArticlesCard) {
  const cardImage = cardArea.querySelector(".img-fluid");
  cardImage.src = relatedArticlesCard.thumbmail;
  cardImage.alt = relatedArticlesCard.thumbmailAlt;

  // definindo o link no nosso a
  cardArea.querySelector("a").href = handleNavigation(relatedArticlesCard.slug);
  cardArea.querySelector(".card-body .card-text").textContent =
    relatedArticlesCard.description || relatedArticlesCard.title;
}

function createMatter(matter) {
  const matterInfoArea = document
    .querySelector(".models #matter-info")
    .cloneNode(true);

  const matterImage = matterInfoArea.querySelector("#thumbmail-image");

  matterImage.src = matter.thumbmail;
  matterImage.alt = matter.thumbmailAlt;

  matterInfoArea.querySelector(".article-infos h2").textContent = matter.title;
  matterInfoArea.querySelector(
    ".fst-italic small"
  ).textContent = `${matter.actorName} - ${matter.year}`;

  const matterTextsArea = matterInfoArea.querySelector(".article-text");

  if (matter?.texts && matter.texts.length > 0) {
    createText(matter, matterTextsArea);
  }

  document.querySelector("#matter-info-area").appendChild(matterInfoArea);
}

function init() {
  const getUniqueMatter = matterJson.find((matter) => matter.slug === slug);

  const otherMatters = matterJson.filter(
    (json) => json.slug !== slug && json.section === section
  );

  createMatter(getUniqueMatter);

  otherMatters.forEach((relatedArticlesCard) => {
    const cardArea = document
      .querySelector(".models #related-articles-card")
      .cloneNode(true);
    cardArea.style.display = "block";
    createCard(cardArea, relatedArticlesCard);
    document.querySelector("#related-articles-area").appendChild(cardArea);
  });
}

init();
