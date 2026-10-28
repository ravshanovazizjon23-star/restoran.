// Savatdagi mahsulotlarni saqlash massivi
let cart = [];

// Savatga taom qo'shish funksiyasi
function addToCart(title, price) {
    cart.push({ title, price });
    updateCartUI();
}

// Savat interfeysini yangilash
function updateCartUI() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    // Agar savat bo'sh bo'lsa
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-msg">Siz hali hech narsa tanlamadingiz.</p>';
        totalPriceEl.textContent = '0 so\'m';
        return;
    }

    // Savatni tozalab qayta hosil qilish
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        
        const itemRow = document.createElement("div");
        itemRow.className = "cart-item";
        itemRow.innerHTML = `
            <span>${item.title}</span>
            <span>${item.price.toLocaleString()} so'm 
            <i class="fa-solid fa-trash" style="color:#ee5253; cursor:pointer; margin-left:10px;" onclick="removeFromCart(${index})"></i></span>
        `;
        cartContainer.appendChild(itemRow);
    });

    totalPriceEl.textContent = total.toLocaleString() + " so'm";
}

// Savatdan o'chirish
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Buyurtma berish tugmasi bosilganda
function sendOrder() {
    const phone = "+998901234567";

    if (cart.length === 0) {
        alert("Savat bo'sh! Iltimos, avval menudan taom tanlang.");
        return;
    }

    let itemsText = cart.map(i => i.title).join(", ");
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const isConfirmed = confirm(
        `Buyurtmangiz:\n- ${itemsText}\n\nJami: ${total.toLocaleString()} so'm.\n\nQo'ng'iroq qilib tasdiqlaysizmi?`
    );

    if (isConfirmed) {
        window.location.href = `tel:${phone}`;
    }
}