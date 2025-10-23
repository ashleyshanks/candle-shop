const heroImages = document.querySelectorAll(".hero picture");

// SMOOTH BREAKING POINT HERO TRANSITION
const hero = document.querySelector(".hero");

function setHeroHeight() {
  const activeImg = hero.querySelector(".active");
  hero.style.height = activeImg.offsetHeight + "px";
}

window.addEventListener("load", setHeroHeight);
window.addEventListener("resize", setHeroHeight);

function showSlide(index) {
  const currentImg = hero.querySelector(".active");
  const nextImg = heroImages[index];

  // Fade transition
  currentImg.classList.remove("active");
  nextImg.classList.add("active");

  // Calculate next image height based on its natural ratio
  const nextHeight =
    nextImg.naturalHeight * (hero.offsetWidth / nextImg.naturalWidth);

  // Animate hero height
  hero.style.transition = "height 0.6s ease";
  hero.style.height = nextHeight + "px";
}

// Initialize hero height on page load
window.addEventListener("load", () => {
  const initialImg = hero.querySelector(".active");
  hero.style.height = initialImg.offsetHeight + "px";
});

// ===== HERO SLIDER =====
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let current = 0;
let slideInterval;

// Show slide
function showSlide(index) {
  heroImages.forEach((img) => img.classList.remove("active"));
  heroImages[index].classList.add("active");
}

// Next / Prev slide
function nextSlide() {
  current = (current + 1) % heroImages.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + heroImages.length) % heroImages.length;
  showSlide(current);
}

// Auto-slide
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 11000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

leftArrow.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

rightArrow.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

showSlide(current);
startAutoSlide();

// --- breaking point img change slide--
// const mediaQuery = window.matchMedia("(max-width: 657px)");
// let lastMatchState = mediaQuery.matches; // track previous state

// function handleViewportChange(e) {
//   // If the state (matches true/false) changed, switch slide
//   if (e.matches !== lastMatchState) {
//     nextSlide();
//     lastMatchState = e.matches; // update the state
//   }
// }

// mediaQuery.addEventListener("change", handleViewportChange);

// ===== SPARKLE CURSOR FOR MULTIPLE SECTIONS =====
const sparkle = document.getElementById("sparkle");
const heart = document.getElementById("heart-cursor");
const hoverAreas = [document.querySelector("header")];
const heartAreas = [document.querySelector(".social-media-icons")];

let mouseX = 0,
  mouseY = 0;

let heartX = 0;
let heartY = document.body.scrollHeight - 150;

let heartMouseX = 0,
  heartMouseY = heartY;

let sparkleX = 0,
  sparkleY = 0;

let isHovering = false;
let heartHovering = false;

// Event listeners for hover areas
hoverAreas.forEach((area) => {
  area.addEventListener("mouseenter", () => {
    isHovering = true;
    sparkle.style.opacity = 1;
  });

  area.addEventListener("mouseleave", () => {
    isHovering = false;
    sparkle.style.opacity = 0;
  });

  area.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });
});

heartAreas.forEach((area) => {
  area.addEventListener("mouseenter", () => {
    heartHovering = true;
    heart.style.opacity = 1;
  });

  area.addEventListener("mouseleave", () => {
    heartHovering = false;
    heart.style.opacity = 0;
  });

  area.addEventListener("mousemove", (e) => {
    heartMouseX = e.pageX;
    heartMouseY = e.pageY;
  });
});

// Animation loop for smooth movement
function animateSparkle() {
  // Smoothly move sparkle toward cursor
  sparkleX += (mouseX - sparkleX) * 0.15;
  sparkleY += (mouseY - sparkleY) * 0.15;

  sparkle.style.transform = `translate(${
    sparkleX - sparkle.offsetWidth / 2
  }px, ${sparkleY - sparkle.offsetHeight / 2}px)`;

  requestAnimationFrame(animateSparkle);
}

animateSparkle();

function animateHeart() {
  heartX += (heartMouseX - heartX) * 0.1;
  heartY += (heartMouseY - heartY) * 0.1;

  heart.style.transform = `translate(${heartX - heart.offsetWidth / 2}px, ${
    heartY - heart.offsetHeight
  }px)`;

  requestAnimationFrame(animateHeart);
}

animateHeart();

const reviews = document.querySelector(".reviews");
const reviewLeftArrow = document.querySelector(".reviews-section .arrow.left");
const reviewRightArrow = document.querySelector(
  ".reviews-section .arrow.right"
);

let isScrolling = false;
let reminderInterval;

function updateArrows() {
  const scrollLeft = reviews.scrollLeft;
  const maxScrollLeft = reviews.scrollWidth - reviews.clientWidth;

  if (scrollLeft > 0) {
    reviewLeftArrow.style.pointerEvents = "auto";
  } else {
    reviewLeftArrow.style.opacity = "0";
    reviewLeftArrow.style.pointerEvents = "none";
  }

  if (scrollLeft < maxScrollLeft - 1) {
    reviewRightArrow.style.pointerEvents = "auto";
  } else {
    reviewRightArrow.style.opacity = "0";
    reviewRightArrow.style.pointerEvents = "none";
  }
}

function showArrowReminder() {
  reviewLeftArrow.classList.add("reminder");
  reviewRightArrow.classList.add("reminder");
  setTimeout(() => {
    reviewLeftArrow.classList.remove("reminder");
    reviewRightArrow.classList.remove("reminder");
    updateArrows(); // 🩹 make sure state returns to correct visibility
  }, 4000);
}

reviews.addEventListener("scroll", () => {
  isScrolling = true;
  updateArrows();
  clearTimeout(reviews.scrollTimeout);

  reviews.scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 1000);
});

reminderInterval = setInterval(() => {
  if (!isScrolling) {
    showArrowReminder();
  }
}, 7000);

const scrollAmount = 300; // adjust for how far each click scrolls

reviewLeftArrow.addEventListener("click", () => {
  reviews.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

reviewRightArrow.addEventListener("click", () => {
  reviews.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

let scrollInterval;
const scrollSpeed = 20; // smaller = slower, larger = faster

function startScrolling(direction) {
  stopScrolling(); // prevent duplicates
  scrollInterval = setInterval(() => {
    reviews.scrollLeft += direction * scrollSpeed;
  }); // every 10ms for smooth continuous scroll
}

function stopScrolling() {
  clearInterval(scrollInterval);
}

// 🡸 Hold left arrow
reviewLeftArrow.addEventListener("mousedown", () => startScrolling(-1));
reviewLeftArrow.addEventListener("mouseup", stopScrolling);
reviewLeftArrow.addEventListener("mouseleave", stopScrolling);

// 🡺 Hold right arrow
reviewRightArrow.addEventListener("mousedown", () => startScrolling(1));
reviewRightArrow.addEventListener("mouseup", stopScrolling);
reviewRightArrow.addEventListener("mouseleave", stopScrolling);

// 📱 Mobile touch support
reviewLeftArrow.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startScrolling(-1);
});
reviewLeftArrow.addEventListener("touchend", stopScrolling);

reviewRightArrow.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startScrolling(1);
});
reviewRightArrow.addEventListener("touchend", stopScrolling);

window.addEventListener("load", updateArrows);
