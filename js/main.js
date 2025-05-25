// كود JavaScript للوظائف الأساسية

document.addEventListener('DOMContentLoaded', function() {
    // تنشيط القائمة عند التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // إضافة تأثيرات للبطاقات عند التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-item, .product-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // تهيئة العناصر قبل التحريك
    const initAnimateElements = function() {
        const elements = document.querySelectorAll('.category-item, .product-card');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // تشغيله مرة واحدة عند التحميل
    };
    
    initAnimateElements();
    
    // تنشيط القائمة المنسدلة للهواتف
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('open');
        });
    }
    
    // إضافة رسالة ترحيبية
    setTimeout(() => {
        console.log('%cمرحباً بك في موقع بتلة فلاورز!', 'color: #e83e8c; font-size: 16px; font-weight: bold;');
    }, 1000);
});
// كود JavaScript للإعلان العائم
document.addEventListener('DOMContentLoaded', function() {
    const floatingAd = document.querySelector('.floating-ad');
    const closeAdBtn = document.querySelector('.close-ad');
    
    if (!floatingAd) return;
    
    // إغلاق الإعلان
    closeAdBtn.addEventListener('click', function() {
        gsap.to(floatingAd, {
            duration: 0.5,
            opacity: 0,
            y: 50,
            ease: "power2.in",
            onComplete: () => {
                floatingAd.style.display = 'none';
            }
        });
        
        // تخزين في localStorage لتجنب إظهاره مرة أخرى
        localStorage.setItem('adClosed', 'true');
    });
    
    // التحقق مما إذا كان المستخدم قد أغلق الإعلان من قبل
    if (localStorage.getItem('adClosed'))
         {
        floatingAd.style.display = 'none'
    }
     else {
        // عرض الإعلان بعد تأخير
        setTimeout(() => {
            floatingAd.style.display = 'block';
        }, 5000);
    }
    
    // تأثيرات GSAP للإعلان
    gsap.from(floatingAd, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
        delay: 2
    });
});