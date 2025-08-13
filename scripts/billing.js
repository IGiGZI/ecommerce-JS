const cart = JSON.parse(localStorage.getItem('cart')) || [];
const billingContainer = document.getElementById('billing-container');
billingContainer.innerHTML = '';

const productListDiv = document.createElement('div');
productListDiv.className = 'space-y-6';

if (cart.length === 0) {
  productListDiv.innerHTML = '<p>Your cart is empty.</p>';
} else {
  cart.forEach(item => {
    const productDiv = document.createElement('div');
    productDiv.className = 'flex justify-between items-center';

    productDiv.innerHTML = `
      <div class="flex items-center gap-2">
        <img src="${item.image || '../src/images/default.png'}" alt="${item.name}" class="w-10 h-10 object-cover" />
        <span>${item.title} x${item.quantity}</span>
      </div>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;

    productListDiv.appendChild(productDiv);
  });
}
billingContainer.appendChild(productListDiv);

const priceSummaryDiv = document.createElement('div');
priceSummaryDiv.className = 'space-y-6 pt-6 border-t pt-6';

const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shippingCost = 0;

priceSummaryDiv.innerHTML = `
  <div class="flex justify-between text-md pb-4 border-b">
    <span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span>
  </div>
  <div class="flex justify-between text-md pb-4 border-b">
    <span>Shipping:</span><span>${shippingCost === 0 ? 'Free' : '$' + shippingCost.toFixed(2)}</span>
  </div>
  <div class="flex justify-between font-semibold pt-2">
    <span>Total:</span><span>$${(subtotal + shippingCost).toFixed(2)}</span>
  </div>
`;
billingContainer.appendChild(priceSummaryDiv);

const paymentMethodsDiv = document.createElement('div');
paymentMethodsDiv.className = 'space-y-4 mt-6';

paymentMethodsDiv.innerHTML = `
  <label class="flex justify-between items-center cursor-pointer pb-2">
    <div class="flex items-center space-x-3">
      <input type="radio" name="payment" class="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500" />
      <span class="text-gray-800">Bank</span>
    </div>
    <div class="flex space-x-2">
      <img src="../src/images/Bkash.png" alt="Bkash" class="h-5" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" class="h-5" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="h-5" />
      <img src="../src/images/image 33.png" alt="Nagad" class="h-5" />
    </div>
  </label>
  <label class="flex items-center space-x-3 cursor-pointer">
    <input type="radio" name="payment" class="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500" checked />
    <span class="text-gray-800">Cash on delivery</span>
  </label>
`;
billingContainer.appendChild(paymentMethodsDiv);

const couponOrderDiv = document.createElement('div');
couponOrderDiv.className = 'mt-6 flex flex-col gap-4';

couponOrderDiv.innerHTML = `
  <div class="flex items-center gap-4">
    <input type="text" placeholder="Coupon Code" class="border px-4 py-2 rounded w-full" />
    <button class="whitespace-nowrap bg-red-500 text-white px-8 py-3 rounded cursor-pointer">Apply Coupon</button>
  </div>
  <button class="bg-red-500 text-white w-44 py-2 rounded cursor-pointer">Place Order</button>
`;
billingContainer.appendChild(couponOrderDiv);
