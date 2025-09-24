const btnAddFonte = document.getElementById("btnAddFonte");
const extraFontesContainer = document.getElementById("extra-fontes");
let fonteCount = 1; // já existe o primeiro input

function createFonteInput() {
  const wrapper = document.createElement("div");
  wrapper.className = "d-flex align-items-end gap-2";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.id = `fonte-${fonteCount + 1}`;
  input.name = `fonte-${fonteCount + 1}`;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn btn-danger btn-sm";
  removeBtn.textContent = "Excluir";
  removeBtn.addEventListener("click", () => {
    wrapper.remove();
    fonteCount--;
    toggleAddFonteButton();
  });

  wrapper.appendChild(input);
  wrapper.appendChild(removeBtn);

  return wrapper;
}

function addFonteBlock() {
  if (fonteCount >= 5) return; // limite total
  const newFonte = createFonteInput();
  extraFontesContainer.appendChild(newFonte);
  fonteCount++;
  toggleAddFonteButton();
}

function toggleAddFonteButton() {
  if (fonteCount >= 5) {
    btnAddFonte.disabled = true;
    btnAddFonte.classList.remove("btn-primary");
    btnAddFonte.classList.add("btn-secondary");
    btnAddFonte.style.cursor = "not-allowed";
  } else {
    btnAddFonte.disabled = false;
    btnAddFonte.classList.remove("btn-secondary");
    btnAddFonte.classList.add("btn-primary");
    btnAddFonte.style.cursor = "pointer";
  }
}

btnAddFonte.addEventListener("click", addFonteBlock);
