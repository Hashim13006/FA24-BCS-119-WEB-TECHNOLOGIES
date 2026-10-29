document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const MAX_LIMIT = 3; // (N mod 4) + 2 where N = 119 -> (119 % 4) + 2 = 3

    // Locate the cart icon in the navbar
    const cartLink = document.querySelector('a[href="checkout.html"]');
    if (!cartLink) return;

    const parentDiv = cartLink.parentElement;
    parentDiv.style.position = 'relative';

    // Create and attach Badge element
    const badge = document.createElement('span');
    badge.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge';
    badge.style.display = 'none';
    cartLink.appendChild(badge);

    // Create and attach Mini-Cart Panel element
    const miniCart = document.createElement('div');
    miniCart.className = 'mini-cart-panel';
    miniCart.innerHTML = `
        <h6 class="fw-bold mb-3 border-bottom pb-2">Your Cart</h6>
        <div class="mini-cart-items mb-3"></div>
        <div class="d-flex justify-content-between fw-bold mb-3 border-top pt-2">
            <span>Total:</span>
            <span class="cart-total">USD 0.00</span>
        </div>
        <a href="checkout.html" class="btn btn-dark w-100 rounded-pill py-2 btn-sm fw-semibold">Proceed to Checkout</a>
    `;
    parentDiv.appendChild(miniCart);

    // Toggle Mini-Cart panel on icon click
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        miniCart.classList.toggle('show');
    });

    // Close mini-cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!parentDiv.contains(e.target)) {
            miniCart.classList.remove('show');
        }
    });

    // Inject "Add to Cart" buttons into each product card dynamically
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card) => {
        const body = card.querySelector('.card-body') || card;
        
        const titleEl = card.querySelector('.card-title') || card.querySelector('p');
        const priceEl = card.querySelector('.sale-price');
        
        if (!titleEl || !priceEl) return;

        const productName = titleEl.textContent.trim();
        const priceValue = parseFloat(priceEl.textContent.replace('USD', '').trim());

        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-outline-dark btn-sm rounded-pill w-100 mt-2 fw-semibold add-to-cart-btn';
        addBtn.type = 'button';
        addBtn.textContent = 'Add to Cart';
        body.appendChild(addBtn);

        addBtn.addEventListener('click', () => {
            const currentCount = cart.filter(item => item.name === productName).length;

            if (currentCount < MAX_LIMIT) {
                cart.push({ name: productName, price: priceValue });
                updateCartUI();
            }

            const updatedCount = cart.filter(item => item.name === productName).length;
            if (updatedCount >= MAX_LIMIT) {
                addBtn.textContent = 'Limit reached';
                addBtn.disabled = true;
                addBtn.classList.remove('btn-outline-dark');
                addBtn.classList.add('btn-secondary');
            }
        });
    });

    // Update Badge, List, Totals using reduce(), and Button States
    function updateCartUI() {
        if (cart.length > 0) {
            badge.style.display = 'inline-block';
            badge.textContent = cart.length;
        } else {
            badge.style.display = 'none';
        }

        const itemsContainer = miniCart.querySelector('.mini-cart-items');
        itemsContainer.innerHTML = '';

        if (cart.length === 0) {
            itemsContainer.innerHTML = '<p class="text-muted small text-center mb-0">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const row = document.createElement('div');
                row.className = 'd-flex justify-content-between align-items-center mb-2 small';
                row.innerHTML = `
                    <span class="text-truncate me-2" style="max-width: 160px;">${item.name}</span>
                    <span class="fw-semibold text-nowrap">USD ${item.price.toFixed(2)}</span>
                    <button class="btn btn-sm text-danger p-0 ms-2 remove-item" data-index="${index}" title="Remove">&times;</button>
                `;
                itemsContainer.appendChild(row);
            });
        }

        // Calculate total price using reduce()
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        miniCart.querySelector('.cart-total').textContent = `USD ${total.toFixed(2)}`;

        // Attach Remove Handlers
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                const removedItemName = cart[index].name;
                
                cart.splice(index, 1);
                updateCartUI();

                // Re-enable corresponding product button if below limit
                productCards.forEach(card => {
                    const titleEl = card.querySelector('.card-title') || card.querySelector('p');
                    if (titleEl && titleEl.textContent.trim() === removedItemName) {
                        const addBtn = card.querySelector('.add-to-cart-btn');
                        const currentCount = cart.filter(item => item.name === removedItemName).length;
                        if (addBtn && currentCount < MAX_LIMIT) {
                            addBtn.textContent = 'Add to Cart';
                            addBtn.disabled = false;
                            addBtn.classList.remove('btn-secondary');
                            addBtn.classList.add('btn-outline-dark');
                        }
                    }
                });
            });
        });
    }

    updateCartUI();
});