
// كود JavaScript لصفحة الدفع
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const form = document.getElementById('checkoutForm');
    const steps = document.querySelectorAll('.form-step');
    const stepButtons = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const submitButton = document.querySelector('.submit-order');
    
    let currentStep = 1;
    
    // تهيئة الصفحة
    function initCheckout() {
        showStep(currentStep);
        updateStepIndicator();
        setupPaymentMethods();
    }
    
    // عرض خطوة معينة
    function showStep(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        currentStep = stepNumber;
        updateStepIndicator();
    }
    
    // تحديث مؤشر الخطوات
    function updateStepIndicator() {
        stepButtons.forEach(step => {
            step.classList.remove('active');
            
            if (parseInt(step.dataset.step) <= currentStep) {
                step.classList.add('active');
            }
        });
    }
    
    // إعداد أحداث طرق الدفع
    function setupPaymentMethods() {
        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                updatePaymentDetails();
                updateOrderSummary();
            });
        });
    }
    
    // تحديث تفاصيل الدفع
    function updatePaymentDetails() {
        document.querySelectorAll('.payment-details').forEach(detail => {
            detail.style.display = 'none';
        });
        
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (selectedMethod) {
            const details = selectedMethod.closest('.payment-method').querySelector('.payment-details');
            if (details) {
                details.style.display = 'block';
            }
        }
    }
    
    // تحديث ملخص الطلب
    function updateOrderSummary() {
        // معلومات العميل
        document.getElementById('confirm-name').textContent = 
            '${document.getElementById(firstName).value} ${document.getElementById(lastName).value}';
        document.getElementById('confirm-email').textContent = document.getElementById('email').value;
        document.getElementById('confirm-phone').textContent = document.getElementById('phone').value;
        
        // عنوان الشحن
        const city = document.getElementById('city').options[document.getElementById('city').selectedIndex].text;
        document.getElementById('confirm-address').textContent = 
            '${city}، ${document.getElementById(address).value}';
        
        // طريقة الدفع
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked + label span').textContent;
        document.getElementById('confirm-payment').textContent = selectedMethod;
    }
    
    // التحقق من صحة الخطوة الحالية
    function validateStep(stepNumber) {
        let isValid = true;
        const currentStep = document.getElementById(`step-${stepNumber}`);
        
        // التحقق من الحقول المطلوبة
        const requiredInputs = currentStep.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        // تحقق إضافي للبريد الإلكتروني
        if (stepNumber === 1) {
            const email = document.getElementById('email');
            if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                email.classList.add('error');
                isValid = false;
            }
        }
        
        // تحقق إضافي لبطاقة الائتمان


if (stepNumber === 3 && document.getElementById('creditCard').checked) {
            const cardNumber = document.getElementById('cardNumber');
            const cardExpiry = document.getElementById('cardExpiry');
            const cardCvv = document.getElementById('cardCvv');
            
            if (!cardNumber.value.match(/^\d{16}$/)) {
                cardNumber.classList.add('error');
                isValid = false;
            }
            
            if (!cardExpiry.value.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
                cardExpiry.classList.add('error');
                isValid = false;
            }
            
            if (!cardCvv.value.match(/^\d{3,4}$/)) {
                cardCvv.classList.add('error');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // أحداث النقر على أزرار التالي
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                updateOrderSummary();
                showStep(currentStep + 1);
            } else {
                alert('الرجاء إكمال جميع الحقول المطلوبة بشكل صحيح');
            }
        });
    });
    
    // أحداث النقر على أزرار السابق
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            showStep(currentStep - 1);
        });
    });
    
    // إرسال النموذج
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!document.getElementById('agreeTerms').checked) {
            alert('يجب الموافقة على الشروط والأحكام');
            return;
        }
        
        // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
        alert('تم استلام طلبك بنجاح! سيتم التواصل معك لتأكيد التفاصيل.');
        
        // توجيه المستخدم إلى صفحة التأكيد
        // window.location.href = 'order-confirmation.html';
    });
    
    // تهيئة صفحة الدفع
    initCheckout();
})