
// كود JavaScript لصفحات المصادقة
document.addEventListener('DOMContentLoaded', function() {
    // عناصر مشتركة
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const passwordStrengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // تبديل عرض كلمة المرور
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.closest('.input-with-icon').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // تحقق من قوة كلمة المرور (لصفحة التسجيل)
    if (registerForm) {
        const passwordInput = document.getElementById('registerPassword');
        
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // تحقق من الطول
            if (password.length >= 8) strength++;
            
            // تحقق من وجود أحرف كبيرة
            if (/[A-Z]/.test(password)) strength++;
            
            // تحقق من وجود أرقام
            if (/[0-9]/.test(password)) strength++;
            
            // تحقق من وجود رموز خاصة
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            // تحديث واجهة المستخدم
            passwordStrengthBars.forEach((bar, index) => {
                bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : '#eee';
            });
            
            // تحديث النص
            const strengthMessages = ['ضعيفة', 'متوسطة', 'قوية', 'قوية جدًا'];
            strengthText.textContent ='قوة كلمة المرور:${strengthMessages[strength - 1] ||ضعيفة}';
            strengthText.style.color = getStrengthColor(strength);
        });
        
        function getStrengthColor(strength) {
            const colors = ['#ff5252', '#ffb74d', '#4caf50', '#2e7d32'];
            return colors[strength - 1] || '#ff5252';
        }
    }
    
    // إرسال نموذج التسجيل
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // تحقق من تطابق كلمة المرور
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('كلمة المرور غير متطابقة');
                return;
            }
            
            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            alert('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
            window.location.href = 'login.html';
        });
    }
    
    // إرسال نموذج تسجيل الدخول
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            alert('تم تسجيل الدخول بنجاح!');
            window.location.href = 'account.html';
        });
    }
    
    // إرسال نموذج استعادة كلمة المرور
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود لإرسال البريد الإلكتروني
            alert('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.');


window.location.href = 'login.html';
        });
    }
});