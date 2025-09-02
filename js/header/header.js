const body = document.querySelector("body");

function setMenu() {
  const a = document.createElement("a");
  const i = document.createElement("i");

  a.textContent = "Menu";
  i.classList.add("bi", "bi-list");

  a.prepend(i)

  a.style.position = "absolute";
  a.style.left = 0;

  return a;
}

function setLogo() {
  const linkImage = document.createElement("a");
  const logoImage = document.createElement("img");
  const logoArea = document.createElement("div");

  logoArea.style.width = "100%";
  logoArea.classList.add("d-flex", "align-items-center", "justify-content-center");

  linkImage.href = "/";
  // linkImage.style.width = "100%";
  // linkImage.classList.add("d-flex", "align-items-center");

  logoImage.alt = "logo";
  logoImage.style.height = "100px";
  logoImage.style.width = "150px";
  logoImage.style.objectFit = "contain";
  logoImage.src = "images/seeimages/logo.png";
  logoImage.style.flex = 1

  linkImage.appendChild(logoImage)
  logoArea.appendChild(linkImage)

  return logoArea
}

function setSearchInput() {
    const form = document.createElement("form");
    const input = document.createElement("input");

    input.type = "search";
    input.placeholder = "Pesquise por artigos";
    input.ariaLabel = "Search"
    input.classList.add("form-control", "border-1")

    form.role = "search";
    
    form.appendChild(input);

    form.style.position = "absolute";
    form.style.right = 0;

    return form;
}

function init() {
  const header = document.createElement("header");
  // const menu = setMenu();
  const logo = setLogo();
  // const searchInput = setSearchInput();  

  header.classList.add("d-flex", "container", "align-items-center", "py-4");
  header.style.position = "relative";

  // header.append(menu, logo, searchInput)  
  header.append(logo)  

  body.prepend(header)
}

init();
