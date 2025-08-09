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
              />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-text2">
                  ${product.title}
                </h5>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-text1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                </div>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3"
                  >${product.rating}</span
                >
              </div>
              <div class="flex items-center justify-between md:gap-4">
                <span class="text-3xl font-bold text-text2">$${product.price}</span>
                <button
                  class="text-text bg-button hover:bg-button2 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
              />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-text2">
                  ${product.title}
                </h5>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <svg
                    class="w-4 h-4 text-text1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                </div>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3"
                  >${product.rating}</span
                >
              </div>
              <div class="flex items-center justify-between md:gap-4">
                <span class="text-3xl font-bold text-text2">$${product.price}</span>
                <button
                  class="text-text bg-button hover:bg-button2 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
