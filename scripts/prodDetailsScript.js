import { productRating } from "./starsRating.js";
let id = localStorage.getItem("selectedProductId");
let ProductCategory = "";
let productDetailsContainer = document.getElementById(
  "productDetailsContainer"
);
let RelatedProductsContainer = document.getElementById(
  "RelatedProductsContainer"
);
fetch("../products.json")
  .then((res) => res.json())
  .then((products) => displayProducts(products))
  .catch((error) => console.error(error));
function displayProducts(products) {
  let product = products.find((p) => p.id == id);

  ProductCategory = product.category;
  productDetailsContainer.innerHTML = `
<div class="w-[80%] mx-auto grid grid-cols-5 gap-4">
        <div
          class="col-span-2 lg:col-span-1 flex flex-col content-between h-[40vh] lg:h-[70vh] overflow-auto gap-2 custom-scroll"
        >
          <div class="flex-1">
            <img src="${
              product.images[1] ? product.images[1] : product.images[0]
            }" alt="${product.title}" class="w-100" />
          </div>
          <div class="flex-1">
            <img src="${
              product.images[2] ? product.images[2] : product.images[0]
            }" alt="${product.title}" class="w-100" />
          </div>
          <div class="flex-1">
            <img src="${product.images[0]}" alt="${
    product.title
  }" class="w-100" />
          </div>
          <div class="flex-1">
            <img src="${
              product.images[3] ? product.images[3] : product.images[0]
            }" alt="${product.title}" class="w-100" />
          </div>
        </div>
        <div
          class="lg:col-span-2 col-span-3 h-[40vh] lg:h-[70vh] overflow-hidden flex items-center"
        >
          <img src="${
            product.images[4] ? product.images[4] : product.images[0]
          }" alt="${product.title}" />
        </div>
        <div class="lg:col-span-2 col-span-5 px-2">
          <h2 class="font-bold text-xl">${product.title}</h2>
          <div class="flex items-center my-3 flex-wrap">
            <p class="md:pe-2 pe-0.5">
           ${productRating(product.rating)}
            </p>
            <p
              class="text-lg text-gray-500 font-semibold relative after:content-[''] after:absolute after:top-0 after:right-[-12px] after:w-[2px] after:h-full after:bg-gray-400 after:ml-2"
            >(${product.rating})
            </p>
            <p class="ml-4 text-[var(--color-button1)] text-xl">${
              product.availabilityStatus
            }</p>
          </div>
          <h2 class="font-semibold text-xl">$${product.price}</h2>
          <p class="my-2 text-lg">
           ${product.description}
          </p>
          <hr />
          <!-- <div class="my-2 flex">
            <p class="text-lg">Size:</p>
            <div
              class="size-8 font-semibold border border-gray-400 hover:bg-[var(--color-secondary2)] hover:text-white hover:border-[var(--color-secondary2)] rounded-md flex items-center justify-center mx-3"
            >
              S
            </div>
            <div
              class="size-8 font-semibold border border-gray-400 hover:bg-[var(--color-secondary2)] hover:text-white hover:border-[var(--color-secondary2)] rounded-md flex items-center justify-center mx-3"
            >
              L
            </div>
            <div
              class="size-8 font-semibold border border-gray-400 hover:bg-[var(--color-secondary2)] hover:text-white hover:border-[var(--color-secondary2)] rounded-md flex items-center justify-center mx-3"
            >
              XL
            </div>
            <div
              class="size-8 font-semibold border border-gray-400 hover:bg-[var(--color-secondary2)] hover:text-white hover:border-[var(--color-secondary2)] rounded-md flex items-center justify-center mx-3"
            >
              2XL
            </div>
          </div> 
          <div class="flex items-center my-3">
            <button
              type="button"
              class="mx-2 text-white bg-[var(--color-secondary2)] hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Buy Now
            </button>
            <div
              class="size-8 border border-black flex justify-center items-center rounded-lg hover:bg-[var(--color-secondary2)] hover:text-white hover:border-white"
            >
              <i class="far fa-heart text-xl"></i>
            </div>
          </div> -->
          <div class="my-4 border border-black">
            <div class="flex gap-4 items-center w-full p-2">
            <div><i class="fa-solid fa-truck"></i></div>
              <div>
                <h3>Free Delivery</h3>
                <p class="underline">Enter Your Postal code for delivery</p>
              </div>
            </div>
            <div class="flex gap-4 items-center w-full p-2 border-t">
              <div><i class="fa-regular fa-clock"></i> </div>
              <div>
                <h3>${product.shippingInformation}</h3>
                
              </div>
            </div>
          </div>
         <details>
            <summary class="text-lg text-gray-500 font-semibold cursor-pointer ">
                reviews (${product.reviews.length})
            </summary>

            <div
                class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
                <div class="flex items-center justify-between mb-4">
                <h5
                    class="text-xl font-bold leading-none text-gray-900 dark:text-white"
                >
                    Latest Customers
                </h5>
                <a
                    href="#"
                    class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    View all
                </a>
                </div>
                <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  ${reviwers(product.reviews.length, product.reviews)}
                </ul>
                </div>
            </div>
            </details>
        </div>
      </div>

`;
}
function reviwers(num, reviewer) {
  let text = "";
  for (let i = 0; i < num; i++) {
    text += `  <li class="py-3 sm:py-4 shadow rounded-2xl p-2">
                    <div class="flex items-center">
                        <div class="shrink-0">
                        <img
                            class="w-8 h-8 rounded-full"
                            src="../src/images/face.jpg"
                            alt="${reviewer[i].reviewerName}"
                        />
                        </div>
                        <div class="flex-1 min-w-0 ms-4">
                        <p
                            class="text-sm font-medium text-gray-900 truncate dark:text-white"
                        >
                            ${reviewer[i].reviewerName}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           ${reviewer[i].reviewerEmail}
                        </p>
                        </div>
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                        ${reviewer[i].date}
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center w-full">
                        <div
                        class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white my-2"
                        >
                        ${reviewer[i].comment}
                        </div>
                        <div class="flex items-center flex-wrap">
                        <p class="md:pe-2 pe-0.5" >${productRating(
                          reviewer[i].rating
                        )}</p>
                        <p
                            class="text-lg text-gray-500 font-semibold relative"
                           
                        >(${reviewer[i].rating})</p>
                        </div>
                    </div>
                    </li>`;
  }
  return text;
}
// related items
fetch("../products.json")
  .then((res) => res.json())
  .then((data) => {
    let relatedProducts = data.filter((p) => p.category == ProductCategory);
    displayRelatedProducts(relatedProducts);
  })
  .catch((error) => console.error(error));
function displayRelatedProducts(products) {
  products.forEach((p) => {
    RelatedProductsContainer.innerHTML += `
        <div class="card m-2" style="width:250px;">
          <div
            class="w-full shadow max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="card-header relative">
              <img
                class="p-8 rounded-t-lg mx-auto"
                src="${p.images[0]}"
                alt="product image"
                style="width:250px;"
              />
              <div
                class="absolute bg-red-600 text-white text-sm font-semibold top-2 left-2 px-2 py-1 rounded"
              >
                -${p.discountPercentage}%
              </div>
              <div
                class="absolute hover:bg-red-600 hover:text-white hover:border-white border border-black text-black text-lg font-semibold top-2 right-2 px-2 py-1 rounded"
              >
                <i class="fa-regular fa-heart"></i>
              </div>
            </div>

            <div class="px-5 pb-5">
              <h2 class="font-bold text-xl">${p.title}</h2>
              <div class="flex items-center mt-2">
                <span class="text-lg font-bold text-[var(--color-secondary2)]"
                  >$${p.price}</span
                >
                <span class="text-lg font-bold text-gray-500 mx-2 line-through"
                  >$${(p.price / (1 - p.discountPercentage / 100)).toFixed(
                    2
                  )}</span
                >
              </div>
              <div class="flex items-center my-3">
                <p class="pe-2">
                ${productRating(p.rating)}
                </p>
                <p class="text-lg text-gray-500 font-semibold relative">
                  (${p.rating})
                </p>
              </div>
            </div>
          </div>
        </div>  
      `;
  });
}
