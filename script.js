let cart = [];

// تابع برای بارگذاری محصولات از فایل JSON
async function loadProducts() {
    const response = await fetch('products.json');
    const products = await response.json();
    const productList = document.querySelector('.product-list');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;
        productDiv.addEventListener('click', () => showProductDetail(product));
        productList.appendChild(productDiv);
    });
}

// تابع برای نمایش جزئیات محصول
function showProductDetail(product) {
    const detailSection = document.getElementById('product-detail');
    document.getElementById('detail-image').src = product.image;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-description').textContent = product.description;
    document.getElementById('detail-price').textContent = product.price;
    document.getElementById('quantity').value = 1; // تنظیم مقدار پیش‌فرض تعداد
    detailSection.style.display = 'flex';
}

// تابع برای بستن بخش جزئیات محصول
document.getElementById('close-detail').addEventListener('click', () => {
    document.getElementById('product-detail').style.display = 'none';
});

// تابع برای اضافه کردن محصول به سبد خرید
document.getElementById('add-to-cart-button').addEventListener('click', () => {
    const productName = document.getElementById('detail-name').textContent;
    const productPrice = document.getElementById('detail-price').textContent;
    const quantity = parseInt(document.getElementById('quantity').value);

    if (quantity < 1) {
        alert("تعداد باید حداقل ۱ باشد!");
        return;
    }

    const product = { name: productName, price: productPrice, quantity: quantity };
    cart.push(product);
    updateCartCount();
    alert(`${productName} (${quantity} عدد) به سبد خرید اضافه شد!`);
    document.getElementById('product-detail').style.display = 'none'; // بستن صفحه جزئیات
});

// تابع برای به‌روزرسانی تعداد آیتم‌های سبد خرید
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// تابع برای نمایش سبد خرید
document.getElementById('view-cart-button').addEventListener('click', viewCart);

function viewCart() {
    const cartDetail = document.getElementById('cart-detail');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} - ${item.price} (${item.quantity} عدد)</span>
            <button onclick="removeFromCart(${index})">حذف</button>
        `;
        cartItems.appendChild(li);
    });

    cartDetail.style.display = 'flex';
}

// تابع برای حذف آیتم از سبد خرید
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    viewCart();
}

// تابع برای بستن بخش سبد خرید
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-detail').style.display = 'none';
});

// تابع برای ارسال سفارش از طریق واتساپ
document.getElementById('send-order-button').addEventListener('click', sendOrderViaWhatsApp);

function sendOrderViaWhatsApp() {
    if (cart.length === 0) {
        alert('سبد خرید شما خالی است!');
        return;
    }

    const phoneNumber = "989391179404"; // شماره واتساپ شما
    let message = "سلام، من می‌خوام محصولات زیر رو سفارش بدم:\n\n";

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.price} (${item.quantity} عدد)\n`;
    });

    message += "\nلطفاً راهنمایی کنید.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// بارگذاری محصولات هنگام لود صفحه
window.onload = loadProducts;