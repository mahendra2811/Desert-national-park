'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

// for whatsaapp icon start 
// start


// end
// for whatsaapp icon end 



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

let currentIndex = 0;
let galleryItems = [];

// Initialize gallery items
document.addEventListener("DOMContentLoaded", () => {
  galleryItems = document.querySelectorAll('.gallery-image');

  if (!galleryItems || galleryItems.length === 0) {
    console.error("No gallery items found with class 'gallery-image'.");
  } else {
    console.log("Gallery initialized with", galleryItems.length, "items.");
  }
});

// Open the modal
function openModal(figure) {
  const modal = document.getElementById("galleryModal");
  modal.style.display = "flex"; // Show the modal
  console.log("clicked on image")
  // Set currentIndex and update modal content
  currentIndex = Array.from(galleryItems).indexOf(figure);
  if (currentIndex === -1) {
    console.error("Failed to find the clicked figure in the gallery array.");
    return;
  }

  updateModalContent();
}

// Update modal content
function updateModalContent() {
  console.log("Current Index:", currentIndex);
  console.log("Total Items:", galleryItems.length);

  const currentFigure = galleryItems[currentIndex];
  if (!currentFigure) {
    console.error(`Figure at index ${currentIndex} is undefined.`);
    return;
  }

  // Use the full-size image from the data-full attribute
  const currentImage = currentFigure.querySelector('img');
  const fullImagePath = currentImage.getAttribute('data-full');

  const modalImage = document.getElementById("modalImage");
  const caption = document.getElementById("caption");
  const loader = document.getElementById("loader");

  // Show loader and hide image
  loader.style.display = "block";
  modalImage.style.display = "none";

  modalImage.src = fullImagePath; // Load the full-size image
  modalImage.onload = function () {
    loader.style.display = "none"; // Hide loader
    modalImage.style.display = "block"; // Show image
  };
  caption.textContent = currentImage.alt || "No caption available"; // Set the caption
}

// Close the modal
function closeModal() {
  const modal = document.getElementById("galleryModal");
  modal.style.display = "none";
}

// Change image (navigation)
function changeImage(direction) {
  currentIndex += direction;

  // Wrap around the index if it goes out of bounds
  if (currentIndex < 0) {
    currentIndex = galleryItems.length - 1;
  } else if (currentIndex >= galleryItems.length) {
    currentIndex = 0;
  }

  updateModalContent();
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") changeImage(-1);
  if (e.key === "ArrowRight") changeImage(1);
  if (e.key === "Escape") closeModal();
});
