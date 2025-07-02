// === Navbar hamburger ===
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// === Modal Elements ===
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalClose = document.getElementById("modalClose");
const addToCartBtn = document.getElementById("addToCartBtn");

let selectedProduct = {}; // Temp store for the clicked product

// === Open Modal on Product Click ===
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    const name = card.dataset.name;
    const price = card.dataset.price;
    const image = card.dataset.image;

    selectedProduct = { name, price, image };

    modalImg.src = image;
    modalTitle.innerText = name;
    modalPrice.innerText = `Rs. ${price}`;
    modal.classList.add("show");
  });
});

// === Close Modal ===
modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
});

// === Add to Cart Logic ===
let cart = [];

addToCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cart.push(selectedProduct);
  updateCartUI();
  modal.classList.remove("show");
  showConfirmation();
});

// === Show Confirmation Popup ===
function showConfirmation() {
  const popup = document.getElementById("confirmationPopup");
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
}

// === Cart Drawer ===
const cartIcon = document.getElementById("cartIcon");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

cartIcon.addEventListener("click", () => {
  cartDrawer.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
});

// === Update Cart UI ===
function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>Rs. ${item.price}</p>
      </div>
    `;
    cartItemsContainer.appendChild(div);
    total += parseInt(item.price);
  });

  cartTotalEl.innerText = total;
  cartCount.innerText = cart.length;
}
