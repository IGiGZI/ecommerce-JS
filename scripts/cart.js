let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCounter() {
  const counters = document.querySelectorAll('#cart-counter, #cart-counter-mobile');
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  counters.forEach(counter => {
    if (totalItems > 0) {
      counter.textContent = totalItems;
      counter.classList.remove('hidden');
    } else {
      counter.classList.add('hidden');
    }
  });
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter();
  displayCartItems();
  updateCartTotal();
}


function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    updateCartTotal();
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) {
      qtyInput.value = newQuantity;
    }
    const subtotalElement = document.getElementById(`subtotal-${productId}`);
    if (subtotalElement) {
      subtotalElement.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    }

  } else if (newQuantity <= 0) {
    removeFromCart(productId);
  }
}

function displayCartItems() {
  const cartContainer = document.querySelector('.cart-items-container');
  
  if (!cartContainer) return;
  
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center py-10">
        <p class="text-lg text-gray-500">Your cart is empty</p>
        <a href="../index.html" class="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">Continue Shopping</a>
      </div>
    `;
    return;
  }
  
  cartContainer.innerHTML = cart.map(item => `
    <div class="flex justify-between items-center shadow-md p-4 rounded-md relative">
      <div class="flex items-center gap-4 w-1/4">
        <div class="relative">
          <img src="${item.image}" alt="${item.title}" class="w-12 h-12 object-cover rounded">
          <button onclick="removeFromCart(${item.id})" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">×</button>
        </div>
        <span class="font-medium">${item.title}</span>
      </div>
      <div class="w-1/4 text-center">$${item.price}</div>
      <div class="w-1/4 text-center">
        <div class="flex items-center justify-center gap-2">
          <button onclick="updateQuantity(${item.id}, parseInt(document.getElementById('qty-${item.id}').value) - 1)" class="w-10 h-10  rounded flex items-center justify-center hover:bg-gray-100">-</button>
          <input id="qty-${item.id}" type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, parseInt(this.value))" class="w-16 h-10 border border-gray-300 rounded text-center" />
          <button onclick="updateQuantity(${item.id}, parseInt(document.getElementById('qty-${item.id}').value) + 1)" class="w-10 h-10  rounded flex items-center justify-center hover:bg-gray-100">+</button>
        </div>
      </div>
      <div id="subtotal-${item.id}" class="w-1/4 text-right">$${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');
}

function updateCartTotal() {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const subtotalElements = document.querySelectorAll('.subtotal');
  const totalElements = document.querySelectorAll('.total');
  
subtotalElements.forEach(el => el.textContent = `$${subtotal.toFixed(2)}`);
totalElements.forEach(el => el.textContent = `$${subtotal.toFixed(2)}`);

}

document.addEventListener('DOMContentLoaded', function() {
  updateCartCounter();
  displayCartItems();
  updateCartTotal();
});