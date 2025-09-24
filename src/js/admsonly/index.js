const btnAddImage = document.querySelector(".btn.btn-primary");
const template = document.getElementById("template");
const extraImagesContainer = document.getElementById("extra-images");
let count = 0;

function createClone() {
  const clone = template.cloneNode(true);
  clone.classList.remove("d-none");
  clone.removeAttribute("id");
  return clone;
}

function updateInputs(clone) {
  count++;
  const inputs = clone.querySelectorAll("input");
  inputs.forEach((input) => {
    const baseId = input.getAttribute("id") || "extra-field";
    const newId = `${baseId}-${count}`;
    input.id = newId;
    input.name = `${input.name}-${count}`;
    const label = input.closest("div").querySelector("label");
    if (label) label.setAttribute("for", newId);
  });
}

function adjustColumns(clone) {
  const cols = clone.querySelectorAll(".col-12");
  cols.forEach(col => {
    col.className = "col-12 col-lg";
  });
}

function createRemoveButton(clone) {
  const removeWrapper = document.createElement("div");
  removeWrapper.classList.add("col-12", "col-lg-auto", "d-flex", "align-items-end");
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn btn-danger btn-sm";
  removeBtn.textContent = "Excluir";
  removeBtn.addEventListener("click", () => {
    clone.remove();
    toggleAddButton();
    if (!extraImagesContainer.querySelector(".row")) {
      extraImagesContainer.classList.add("d-none");
    }
  });
  removeWrapper.appendChild(removeBtn);
  clone.appendChild(removeWrapper);
}

function addImageBlock() {
  if (extraImagesContainer.querySelectorAll(".row").length >= 5) return;
  extraImagesContainer.classList.remove("d-none");
  const clone = createClone();
  updateInputs(clone);
  adjustColumns(clone);
  clone.classList.add("row", "g-3", "mb-2");
  createRemoveButton(clone);
  extraImagesContainer.appendChild(clone);
  toggleAddButton();
}

function toggleAddButton() {
  const rows = extraImagesContainer.querySelectorAll(".row").length;
  if (rows >= 5) {
    btnAddImage.disabled = true;
    btnAddImage.classList.remove("btn-primary");
    btnAddImage.classList.add("btn-secondary");
    btnAddImage.style.cursor = "not-allowed";
  } else {
    btnAddImage.disabled = false;
    btnAddImage.classList.remove("btn-secondary");
    btnAddImage.classList.add("btn-primary");
    btnAddImage.style.cursor = "pointer";
  }
}

btnAddImage.addEventListener("click", addImageBlock);
