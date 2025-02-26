const elements = document.querySelectorAll('.hidden');

window.addEventListener('scroll', () => {
  elements.forEach(element => {
    const position = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (position < windowHeight - 100) {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  });
});
function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  var btn = document.querySelector(".open-btn");

  if (sidebar.style.width === "250px") {
    sidebar.style.width = "0";
    btn.setAttribute("aria-expanded", "false");
  } else {
    sidebar.style.width = "250px";
    btn.setAttribute("aria-expanded", "true");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var sidebar = document.getElementById("sidebar");
  sidebar.style.transition = "width 0.5s";  
});

function subscribe() {
  const email = document.getElementById('emailInput').value;

  if (email) {
      alert('You have successfully subscribed to our newsletter!');
  } else {
      alert('Please enter a valid email address.');
  }
}

function toggleSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.classList.toggle('active');
  if (searchInput.classList.contains('active')) {
      searchInput.focus();
  }
}
