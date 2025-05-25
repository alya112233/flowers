
// كود JavaScript لإدارة سلة التسوق
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const minusBtns = document.querySelectorAll('.quantity-btn.minus');
    const plusBtns = document.querySelectorAll('.quantity-btn.plus');
    const removeBtns = document.querySelectorAll('.remove-btn');
    const applyDiscountBtn = document.querySelector('.apply-discount');
    const discountInput = document.querySelector('.discount-input input');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // أكواد الخصم الصالحة
    const validDiscounts = {
        'FLOWER10': 10, // خصم 10%
        'BATOLA20': 20  // خصم 20%
    };
    
    // تحديث الكمية
    function updateQuantity(input, change) {
        let newValue = parseInt(input.value) + change;
        if (newValue < 1) newValue = 1;
        input.value = newValue;
        updateItemTotal(input);
        updateCartSummary();
    }
    
    // تحديث الإجمالي للعنصر
    function updateItemTotal(quantityInput) {
        const cartItem = quantityInput.closest('.cart-item');
        const price = parseFloat(cartItem.querySelector('.product-price').textContent);
        const quantity = parseInt(quantityInput.value);
        const totalElement = cartItem.querySelector('.product-total');
        
        const total = price * quantity;
        totalElement.textContent = total.toFixed(0) + ' ر.س';
    }
    
    // إزالة عنصر من السلة
    function removeItem(btn) {
        if (confirm('هل أنت متأكد من إزالة هذا المنتج من السلة؟')) {
            const cartItem = btn.closest('.cart-item');
            cartItem.remove();
            updateCartSummary();
            
            // إذا لم يعد هناك عناصر، عرض السلة الفارغة
            if (document.querySelectorAll('.cart-item').length === 0) {
                showEmptyCart();
            }
        }
    }
    
    // عرض حالة السلة الفارغة
    function showEmptyCart() {
        // يمكنك إضافة كود هنا لعرض رسالة السلة الفارغة
        alert('سلة التسوق فارغة');
    }
    
    // تحديث ملخص السلة
    function updateCartSummary() {
        let subtotal = 0;
        const items = document.querySelectorAll('.cart-item');
        
        items.forEach(item => {
            const itemTotal = parseFloat(item.querySelector('.product-total').textContent);
            subtotal += itemTotal;
        });
        
        const shipping = subtotal > 200 ? 0 : 25;
        const discount = calculateDiscount(subtotal);
        const total = subtotal + shipping - discount;
        
        // تحديث DOM
        document.querySelector('.subtotal').textContent = subtotal.toFixed(0) + ' ر.س';
        document.querySelector('.shipping').textContent = shipping.toFixed(0) + ' ر.س';
        document.querySelector('.discount-amount').textContent = discount > 0 ? '-' + discount.toFixed(0) + ' ر.س' : '0 ر.س';
        document.querySelector('.total').textContent = total.toFixed(0) + ' ر.س';
        
        // تحديث عدد العناصر في أيقونة السلة
        updateCartIcon(items.length);
    }
    
    // حساب الخصم
    function calculateDiscount(subtotal) {
        const discountCode = localStorage.getItem('discountCode');
        if (discountCode && validDiscounts[discountCode]) {
            return (subtotal * validDiscounts[discountCode]) / 100;
        }
        return 0;
    }
    
    // تحديث أيقونة السلة في الهيدر
    function updateCartIcon(count) {
        document.querySelector('.cart-count').textContent = count;
    }
    
    // تطبيق كود الخصم
    function applyDiscount() {
        const code = discountInput.value.trim();
        
        if (validDiscounts[code]) {
            localStorage.setItem('discountCode', code);
            discountInput.classList.remove('error');
            updateCartSummary();
            alert('تم تطبيق الخصم بنجاح!');
        } else {
            discountInput.classList.add('error');
            alert('كود الخصم غير صالح');
        }
    }
    
    // إضافة الأحداث
    minusBtns.forEach(btn => {
        btn.


addEventListener('click', function() {
            const input = this.nextElementSibling;
            updateQuantity(input, -1);
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            updateQuantity(input, 1);
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
            updateItemTotal(this);
            updateCartSummary();
        });
    });
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            removeItem(this);
        });
    });
    
    applyDiscountBtn.addEventListener('click', applyDiscount);
    discountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyDiscount();
    });
    
    checkoutBtn.addEventListener('click', function(e) {
        if (document.querySelectorAll('.cart-item').length === 0) {
            e.preventDefault();
            alert('سلة التسوق فارغة، يرجى إضافة منتجات قبل إتمام الشراء');
        }
    });
    
    // تحديث الملخص عند التحميل
    updateCartSummary();
})
