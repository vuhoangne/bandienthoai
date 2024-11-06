let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.querySelector('.badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (badge) badge.textContent = totalItems;
}

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    saveCart();
    updateCartBadge();
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
}

function displayCartItems() {
    const cartList = document.querySelector('.cart_list');
    if (!cartList) return;
    cartList.innerHTML = '';
    if (cart.length === 0) {
        cartList.innerHTML = '<li class="cart_item">Giỏ hàng trống</li>';
        return;
    }

    cart.forEach(item => {
        const cartItem = `
            <li class="cart_item clearfix">
                <div class="cart_item_image">
                    <img src="image/huawei-mate-50-pro--600x600.jpg" alt="${item.name}">
                </div>
                <div class="cart_item_info d-flex justify-content-between">
                    <div>${item.name}</div>
                    <div>${item.price.toLocaleString()} vnd</div>
                    <div>Số lượng: ${item.quantity}</div>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Xóa</button>
                </div>
            </li>`;
        cartList.insertAdjacentHTML('beforeend', cartItem);
    });

    updateTotal();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    displayCartItems();
    updateCartBadge();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElement = document.querySelector('.order_total_amount');
    if (totalElement) totalElement.textContent = total.toLocaleString() + ' vnd';
}

function clearCart() {
    cart = [];
    saveCart();
    displayCartItems();
    updateCartBadge();
    alert('Giỏ hàng đã được xóa!');
    
}

document.querySelectorAll('.add-cart-btn').forEach(button => {
    button.addEventListener('click', event => {
        const id = event.target.getAttribute('data-id');
        const name = event.target.getAttribute('data-name');
        const price = parseInt(event.target.getAttribute('data-price'));
        addToCart(id, name, price);
    });
});

window.addEventListener('storage', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartBadge();
    displayCartItems();
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    displayCartItems();
});
