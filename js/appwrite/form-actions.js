import { v4 as uuidV4 } from "uuid";
import { createPost } from "./services/posts";

const matterForm = document.querySelector("#matter-form");

async function onFormSubmit(event) {
  event.preventDefault();

  const matterName = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const title = document.querySelector("#titulo-materia").value.trim();
  const content = document.querySelector("#conteudo-materia").value.trim();
  const tag = document.querySelector("#tag").value;
  const fileInput = document.querySelector("#capa-materia");
  const imageFile = fileInput.files[0];
  const displayLocation = document.querySelector("#secao-exibicao").value;

  if (!imageFile) {
    alert("Selecione uma capa para a matéria!");
    return;
  }

  const extraBlocks = document.querySelectorAll("#extra-images .row");
  const textImages = Array.from(extraBlocks)
    .map(block => {
      const inputs = block.querySelectorAll("input");
      return {
        image: inputs[0]?.files[0] || null,
        source: inputs[1]?.value.trim() || "",
        description: inputs[2]?.value.trim() || ""
      };
    })
    .filter(item => item.image);

  const sources = Array.from(document.querySelectorAll('#extra-fontes input'))
    .map(input => input.value.trim())
    .filter(value => value !== ""); 

  const matter = {
    $id: uuidV4(),
    name: matterName,
    email,
    displayLocation,
    title,
    content,
    tag,
    sources,
    $createdAt: new Date().toISOString()
  };

  await createPost(matter, imageFile, textImages);

  alert("Matéria cadastrada com sucesso!");
  matterForm.reset();
}

matterForm.addEventListener("submit", onFormSubmit);
