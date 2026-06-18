// 1. Added the "." to properly select the classes
const navbar = document.querySelector(".navbarjs");
const button = document.querySelector(".jsbutton");

button.addEventListener("click", function() {
  // 2. Toggle between 'none' and 'flex' to preserve your CSS layout
  if (navbar.style.display === 'none') {
    navbar.style.display = 'flex';
  } else {
    navbar.style.display = 'none';
  }
});