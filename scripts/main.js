console.log("Main.js loaded successfully!");
import { productRating } from "./starsRating.js";
// products containers
let categoryProducts = document.querySelector("#category-results");
let bestSellingProducts = document.querySelector("#best-selling-products");
let exploreProducts = document.querySelector("#explore-products");

// category buttons
let groceryBtn = document.getElementById("groceries");
let tabletBtn = document.getElementById("tablets");
let laptopBtn = document.getElementById("laptops");
let glassesBtn = document.getElementById("sun-glasses");
let mobileAccessoriesBtn = document.getElementById("mobile-accessories");
let sportsAccessoriesBtn = document.getElementById("sports-accessories");

// show all products buttons
let bestSellingAllBtn = document.getElementById("best-selling-products-all");
let exploreAllBtn = document.getElementById("explore-products-all");

// products data
let products = [];

// event listeners
groceryBtn.addEventListener("click", () => filterProducts("groceries"));
tabletBtn.addEventListener("click", () => filterProducts("tablets"));
laptopBtn.addEventListener("click", () => filterProducts("laptops"));
glassesBtn.addEventListener("click", () => filterProducts("sunglasses"));
mobileAccessoriesBtn.addEventListener("click", () =>
  filterProducts("mobile-accessories")
);
sportsAccessoriesBtn.addEventListener("click", () =>
  filterProducts("sports-accessories")
);
bestSellingAllBtn.addEventListener("click", () => {
  // Show all best selling products
  showBestProducts(4);
});
exploreAllBtn.addEventListener("click", () => {
  // Show all explore products
  showExploreProducts(0);
});

async function loadData() {
  try {
    // Fetch product data
    const response = await fetch("products.json");
    // Check if the response is okay
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      // filter the products by the selected categories
      const selectedCategories = [
        "groceries",
        "laptops",
        "tablets",
        "sunglasses",
        "mobile-accessories",
        "sports-accessories",
      ];
      products = data.filter((product) => {
        return selectedCategories.includes(product.category);
      });
      if (categoryProducts) {
        showRandomCategoryProducts();
      }
      if (bestSellingProducts) {
        showBestProducts();
      }
      if (exploreProducts) {
        showExploreProducts();
      }
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

loadData();

function filterProducts(category) {
  //clear existing products
  categoryProducts.innerHTML = "";

  // filter products by category
  const filteredProducts = products.filter((product) => {
    return product.category === category;
  });

  // display filtered products
  filteredProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className =
      "w-full max-w-sm bg-bg border border-gray-200 rounded-lg shadow-sm relative";
    productElement.innerHTML = `
            <button
              class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
              aria-label="Add to wishlist"
            >
              <svg
                class="w-5 h-5 text-gray-600 hover:text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.001Z"
                />
              </svg>
            </button>
            <a href="#">
              <img
                id="${product.id}"
                class="p-8 rounded-t-lg bg-secondary"
                src="${product.images[0]}"
                alt="${product.title}"
                onclick="goToDetails(${product.id})"
              />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-text2">
                  ${product.title}
                </h5>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                 <div >
                 ${productRating(product.rating)}
                </div>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3"
                  >${product.rating}</span
                >
              </div>
              <div class="flex items-center justify-between md:gap-4">
                <span class="text-3xl font-bold text-text2">$${
                  product.price
                }</span>
                <button
                  class="add-to-cart-btn text-text bg-button hover:bg-button2 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  data-product-id="${product.id}"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
      `;
    categoryProducts.appendChild(productElement);
  });
}

// render random products in the category section
function showRandomCategoryProducts() {
  const filteredProducts = products.slice(0, 11);
  displayProducts(filteredProducts, categoryProducts);
}

// render products in the best selling section
function showBestProducts(rate = 4.7) {
  const bestProducts = products.filter((product) => product.rating >= rate);
  displayProducts(bestProducts, bestSellingProducts);
}

// render products in the explore section
function showExploreProducts(discount = 15) {
  const randomProducts = products.filter((product) => {
    return product.discountPercentage > discount;
  });
  displayProducts(randomProducts, exploreProducts);
}

// Function to display products in a given parent element
function displayProducts(productList, parentElement) {
  parentElement.innerHTML = ""; // Clear existing products
  productList.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className =
      "w-full max-w-sm bg-bg border border-gray-200 rounded-lg shadow-sm relative";
    productElement.innerHTML = `
            <button
              class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
              aria-label="Add to wishlist"
            >
              <svg
                class="w-5 h-5 text-gray-600 hover:text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.001Z"
                />
              </svg>
            </button>
            <a href="#">
              <img
                id="${product.id}"
                class="p-8 rounded-t-lg bg-secondary"
                src="${product.images[0]}"
                alt="${product.title}"
                onclick="goToDetails(${product.id})"
              />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-text2">
                  ${product.title}
                </h5>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                <div >
                 ${productRating(product.rating)}
                </div>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3"
                  >${product.rating}</span
                >
              </div>
              <div class="flex items-center justify-between md:gap-4">
                <span class="text-3xl font-bold text-text2">$${
                  product.price
                }</span>
                <button
                  class="add-to-cart-btn text-text bg-button hover:bg-button2 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  data-product-id="${product.id}"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        `;
    parentElement.appendChild(productElement);
  });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCounter() {
  const counters = document.querySelectorAll(
    "#cart-counter, #cart-counter-mobile"
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  console.log("Updating cart counter. Total items:", totalItems);
  console.log("Found counters:", counters.length);

  counters.forEach((counter) => {
    if (totalItems > 0) {
      counter.textContent = totalItems;
      counter.classList.remove("hidden");
      console.log("Counter updated and shown:", counter);
    } else {
      counter.classList.add("hidden");
      console.log("Counter hidden");
    }
  });
}

function addToCart(product) {
  console.log("addToCart called with:", product);
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
    console.log("Updated existing item quantity:", existingItem);
  } else {
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };
    cart.push(newItem);
    console.log("Added new item to cart:", newItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart updated:", cart);
  updateCartCounter();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}

function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId);
  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
  }
}

updateCartCounter();

console.log("Adding click event listener...");

document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("add-to-cart-btn") ||
    (e.target.tagName === "BUTTON" &&
      e.target.textContent.trim() === "Add to cart")
  ) {
    console.log("Add to cart button clicked!");
    let productId = e.target.getAttribute("data-product-id");
    let product = null;

    if (!productId) {
      const productCard = e.target.closest(".max-w-sm");
      if (productCard) {
        const img = productCard.querySelector("img");
        if (img && img.id) {
          productId = img.id;
        } else if (img && img.src) {
          const titleElement = productCard.querySelector("h5");
          const priceElement = productCard.querySelector(".text-3xl");

          if (titleElement && priceElement) {
            const title = titleElement.textContent.trim();
            const price = parseFloat(priceElement.textContent.replace("$", ""));

            product = {
              id: Date.now() + Math.random(),
              title: title,
              price: price,
              images: [img.src],
              rating: 4.5,
            };
          }
        }
      }
    }

    if (productId) {
      product = products.find((p) => p.id === parseInt(productId));
    }

    if (product) {
      console.log("Adding product to cart:", product);
      addToCart(product);
    } else {
      console.log("No product found to add to cart");
    }
  }
});

// go to details page
window.goToDetails = function (id) {
  localStorage.setItem("selectedProductId", id);
  window.location.href = "../pages/productDetails.html";
};
