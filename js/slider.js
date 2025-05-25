
// كود JavaScript للسلايدر (slider.js)
document.addEventListener('DOMContentLoaded', function() {
    // العناصر الأساسية
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 ثواني لكل شريحة
    
    // تهيئة السلايدر
    function initSlider() {
        if (slides.length === 0) return;
        
        // إظهار الشريحة الأولى
        showSlide(currentIndex);
        
        // بدء التبديل التلقائي
        startSlideShow();
    }
    
    // عرض شريحة معينة
    function showSlide(index) {
        // التأكد من أن المؤشر ضمن النطاق الصحيح
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        
        // إخفاء جميع الشرائح
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });
        
        // إزالة التنشيط من جميع النقاط
        dots.forEach(dot => dot.classList.remove('active'));
        
        // عرض الشريحة المطلوبة
        slides[currentIndex].classList.add('active');
        slides[currentIndex].style.opacity = '1';
        slides[currentIndex].style.zIndex = '2';
        
        // تنشيط النقطة المقابلة
        dots[currentIndex].classList.add('active');
        
        // إضافة تأثيرات للعناصر
        animateSlideContent();
    }
    
    // التبديل إلى الشريحة التالية
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // التبديل إلى الشريحة السابقة
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // بدء العرض التلقائي
    function startSlideShow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // إيقاف العرض التلقائي
    function pauseSlideShow() {
        clearInterval(slideInterval);
    }
    
    // إضافة تأثيرات للعناصر داخل الشريحة
    function animateSlideContent() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        
        const title = activeSlide.querySelector('.slide-title');
        const text = activeSlide.querySelector('.slide-text');
        const button = activeSlide.querySelector('.slide-btn');
        
        // إعادة تعيين الحركات
        title.style.animation = 'none';
        text.style.animation = 'none';
        button.style.animation = 'none';
        
        // إعادة الحركات بعد فترة بسيطة
        setTimeout(() => {
            title.style.animation = 'fadeInDown 1s ease forwards';
            text.style.animation = 'fadeInUp 1s ease forwards';
            button.style.animation = 'zoomIn 1s ease forwards';
        }, 50);
    }
    
    // أحداث النقر على الأزرار
    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseSlideShow();
        setTimeout(startSlideShow, 10000); // استئناف بعد 10 ثواني
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseSlideShow();
        setTimeout(startSlideShow, 10000); // استئناف بعد 10 ثواني
    });
    
    // أحداث النقر على النقاط
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            pauseSlideShow();
            setTimeout(startSlideShow, 10000); // استئناف بعد 10 ثواني
        });
    });
    
    // إيقاف العرض التلقائي عند تركيز المؤشر على السلايدر
    const slider = document.querySelector('.slider-container');
    slider.addEventListener('mouseenter', pauseSlideShow);
    slider.addEventListener('mouseleave', startSlideShow);
    
    // تهيئة السلايدر
    initSlider();
    
    // دعم Swipe للأجهزة التي تعمل باللمس


let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // مسح لليسار - التالي
            nextSlide();
        } else if (touchEndX > touchStartX + 50) {
            // مسح لليمين - السابق
            prevSlide();
        }
    }
});