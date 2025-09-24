function createCarouselButtons(idx) {
  const button = document.createElement("button")
  button.type = "button"
  button.ariaLabel = `Slide ${idx + 1}`
  button.setAttribute("data-bs-target", "#carouselMatter")
  button.setAttribute("data-bs-slide-to", String(idx))
  if (idx === 0) {
    button.classList.add("active")
    button.ariaCurrent = "true"
  }
  return button
}

function createImageElement(url) {
  const img = document.createElement("img")
  img.src = url
  img.classList.add("d-block", "w-100")
  img.alt = "carousel-image"
  img.style.height = "500px"
  img.style.objectFit = "contain"
  return img
}

function createOverlay() {
  const overlay = document.createElement("div")
  overlay.style.position = "absolute"
  overlay.style.top = "0"
  overlay.style.left = "0"
  overlay.style.width = "100%"
  overlay.style.height = "100%"
  overlay.style.background = "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))"
  return overlay
}

function createImageWrapper(url) {
  const wrapper = document.createElement("div")
  wrapper.style.position = "relative"
  wrapper.append(createImageElement(url), createOverlay())
  return wrapper
}

function createCaption(description, source) {
  const caption = document.createElement("div")
  caption.classList.add("carousel-caption", "d-none", "d-md-block")
  const descEl = document.createElement("h5")
  descEl.textContent = description
  const sourceEl = document.createElement("p")
  if (source) {
    const link = document.createElement("a")
    link.href = source
    link.textContent = source
    link.classList.add("link")
    link.target = "_blank"
    sourceEl.appendChild(link)
  }
  caption.append(descEl, sourceEl)
  return caption
}

function createCarouselItem(carouselInfo, idx) {
  const item = document.createElement("div")
  item.classList.add("carousel-item")
  item.style.backgroundColor = "#000000"
  if (idx === 0) item.classList.add("active")
  item.setAttribute("data-bs-interval", `${idx + 1}000`)
  item.append(
    createImageWrapper(carouselInfo.imageUrl),
    createCaption(carouselInfo.description, carouselInfo.source)
  )
  return item
}

function setActiveSlide(carouselContainer, newIndex) {
  const slides = carouselContainer.querySelectorAll(".carousel-item")
  const indicators = carouselContainer.querySelectorAll(".carousel-indicators button")
  if (newIndex < 0) newIndex = slides.length - 1
  if (newIndex >= slides.length) newIndex = 0
  slides.forEach(slide => slide.classList.remove("active"))
  indicators.forEach(ind => {
    ind.classList.remove("active")
    ind.removeAttribute("aria-current")
  })
  slides[newIndex].classList.add("active")
  indicators[newIndex].classList.add("active")
  indicators[newIndex].setAttribute("aria-current", "true")
}

function addCarouselControls(carouselContainer) {
  const prevBtn = carouselContainer.querySelector(".carousel-control-prev")
  const nextBtn = carouselContainer.querySelector(".carousel-control-next")
  const slides = carouselContainer.querySelectorAll(".carousel-item")
  let activeIndex = 0
  slides.forEach((slide, idx) => {
    if (slide.classList.contains("active")) activeIndex = idx
  })
  prevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + slides.length) % slides.length
    setActiveSlide(carouselContainer, activeIndex)
  })
  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % slides.length
    setActiveSlide(carouselContainer, activeIndex)
  })
}

export function createCarousel(carouselInfo, carouselContainer) {
  const indicators = carouselContainer.querySelector(".carousel-indicators")
  const carouselImagesContainer = carouselContainer.querySelector(".carousel-inner")
  carouselContainer.style.marginBottom = "24px"
  carouselInfo.forEach((info, idx) => {
    indicators.appendChild(createCarouselButtons(idx))
    carouselImagesContainer.appendChild(createCarouselItem(info, idx))
  })
  addCarouselControls(carouselContainer)
}
