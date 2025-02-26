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

document.addEventListener("DOMContentLoaded", function () {
  var sidebar = document.getElementById("sidebar");
  sidebar.style.transition = "width 0.5s";
});


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price, imageUrl) {
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1, image: imageUrl });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCart();
  showAddedMessage(productName);
  updateBagPage();
}

function showAddedMessage(productName) {
  const message = document.createElement('div');
  message.classList.add('added-message');
  message.innerHTML = `${productName} has been added to your bag.`;
  document.body.appendChild(message);
  setTimeout(() => {
    message.remove();
  }, 2000);
}
function updateCart() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartDisplay = document.getElementById('cart-display');

  if (cartCount > 0) {
    cartDisplay.innerHTML = `My Bag (${cartCount} items)`;
  } else {
    cartDisplay.innerHTML = 'My Bag (Empty)';
  }
}

function updateBagPage() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="item-actions">
                <button onclick="removeFromCart('${item.name}')">Remove</button>
                <button onclick="increaseQuantity('${item.name}')">+</button>
                <button onclick="decreaseQuantity('${item.name}')">-</button>
            </div>
        `;

    cartItemsContainer.appendChild(cartItem);
  });

  totalAmount.innerText = total.toFixed(2);
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));  
  updateCart();
  updateBagPage();
}

function increaseQuantity(productName) {
  const item = cart.find(item => item.name === productName);
  if (item) {
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCart();
    updateBagPage();
  }
}

function decreaseQuantity(productName) {
  const item = cart.find(item => item.name === productName);
  if (item && item.quantity > 1) {
    item.quantity--;
    localStorage.setItem('cart', JSON.stringify(cart));  
    updateCart();
    updateBagPage();
  }
}

document.addEventListener('DOMContentLoaded', updateBagPage);

function openCheckoutPopup() {
  const popup = document.getElementById('checkout-popup');
  const popupItemsDiv = document.getElementById('popup-items');
  const popupTotalAmount = document.getElementById('popup-total-amount');

  popupItemsDiv.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <p>${item.name} (x${item.quantity})</p>
      <p>$${(item.price * item.quantity).toFixed(2)}</p>
    `;
    popupItemsDiv.appendChild(div);
  });

  popupTotalAmount.textContent = total.toFixed(2);
  popup.style.display = 'flex'; 
}

function closeCheckoutPopup() {
  document.getElementById('checkout-popup').style.display = 'none';
}

document.querySelectorAll(".product-card").forEach(product => {
  const stars = product.querySelectorAll(".star");
  
  stars.forEach(star => {
      star.addEventListener("click", function() {
          const value = this.getAttribute("data-value");
          
          stars.forEach(s => {
              s.style.color = s.getAttribute("data-value") <= value ? "black" : "gray";
          });
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const products = document.querySelectorAll(".product");
  products.forEach((product, index) => {
      setTimeout(() => {
          product.classList.add("show");
      }, index * 200);
  });
});


function setRating(event) {
  const stars = event.target.parentElement.children;
  const ratingValue = event.target.dataset.value;  
  const product = event.target.closest('.product'); 

  Array.from(stars).forEach(star => {
    if (star.dataset.value <= ratingValue) {
      star.classList.add('filled');  
    } else {
      star.classList.remove('filled');
    }
  });

  product.setAttribute('data-rating', ratingValue); 
}

document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', setRating);
});
