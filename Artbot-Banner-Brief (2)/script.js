const slides = document.querySelectorAll(".slide");
const itemName = document.querySelector(".item");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
let current = 0;

function showSlide(index) {
  const prev = slides[current];
  const next = slides[index];

  gsap.to(prev, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      prev.classList.remove("active");
      prev.style.visibility = "hidden";
    }
  });

  next.style.visibility = "visible";
  next.classList.add("active");
  gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 1 });

  itemName.textContent = next.getAttribute("data-name");
  current = index;
}

function showNextSlide() {
  const nextIndex = (current + 1) % slides.length;
  showSlide(nextIndex);
}

function showPrevSlide() {
  const prevIndex = (current - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

// Automatic rotation
let interval = setInterval(showNextSlide, 1500);

// Manual controls
leftArrow.addEventListener("click", () => {
  clearInterval(interval);
  showPrevSlide();
  interval = setInterval(showNextSlide, 1500);
});

rightArrow.addEventListener("click", () => {
  clearInterval(interval);
  showNextSlide();
  interval = setInterval(showNextSlide, 1500);
});