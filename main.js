(function($) {
    "use strict";
    
    // Прелоадер
    $(window).on('load', function() {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function() {
                $(this).remove();
            });
        }
    });
    
    // Плавна прокрутка для навігації
    $('a.nav-link[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
                return false;
            }
        }
    });
    
    // Активація навігаційних посилань при прокрутці
    $(window).on('scroll', function() {
        var scrollDistance = $(window).scrollTop();
        
        // Показати/приховати кнопку "Вгору"
        if (scrollDistance > 300) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
        
        // Підсвічування активного пункту меню
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.nav-item a.active').removeClass('active');
                $('.nav-item a').eq(i).addClass('active');
            }
        });
    }).scroll();
    
    // Кнопка "Вгору"
    $('.back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
    
    // Ініціалізація слайдера для головного банера
    if ($('.hero-slider').length) {
        $('.hero-slider').owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                }
            },
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ]
        });
    }
    
    // Ініціалізація слайдера для відгуків
    if ($('.testimonials-slider').length) {
        $('.testimonials-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }
    
    // Ініціалізація лічильників
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    }
    
    // Ініціалізація галереї
    if ($('.gallery-container').length) {
        $('.gallery-container').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
    
    // Валідація форми запису на прийом
    $('#appointmentForm').submit(function(e) {
        e.preventDefault();
        
        var form = $(this);
        var formData = form.serialize();
        
        // Тут можна додати AJAX запит для відправки даних форми
        
        // Симуляція успішної відправки
        $('#appointmentModal').modal('hide');
        
        // Показати повідомлення про успішний запис
        setTimeout(function() {
            alert('Дякуємо за ваш запит! Наш адміністратор зв\'яжеться з вами найближчим часом.');
            form[0].reset();
        }, 500);
    });
    
    // Валідація форми зворотного зв'язку
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        var form = $(this);
        var formData = form.serialize();
        
        // Тут можна додати AJAX запит для відправки даних форми
        
        // Симуляція успішної відправки
        setTimeout(function() {
            alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
            form[0].reset();
        }, 500);
    });
    
    // Фіксована шапка при прокрутці
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('fixed-top');
            $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
        } else {
            $('.navbar').removeClass('fixed-top');
            $('body').css('padding-top', '0');
        }
    });
    
    // Анімація при прокрутці
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        });
        wow.init();
    }
    
    // Фільтрація галереї
    if ($('.gallery-filter').length) {
        $('.gallery-filter li').on('click', function() {
            $('.gallery-filter li').removeClass('active');
            $(this).addClass('active');
            
            var selector = $(this).attr('data-filter');
            $('.gallery-container').isotope({
                filter: selector
            });
            return false;
        });
    }
    
    // Ініціалізація datepicker для форми запису
    if ($('.datepicker').length) {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            startDate: new Date()
        });
    }
    
    // Ініціалізація timepicker для форми запису
    if ($('.timepicker').length) {
        $('.timepicker').timepicker({
            minuteStep: 15,
            showMeridian: false
        });
    }
    
    // Відкриття модального вікна запису на прийом при кліку на кнопку
    $('.btn-appointment').on('click', function() {
        $('#appointmentModal').modal('show');
    });
    
    // Ініціалізація маски для телефону
    if ($('input[type="tel"]').length) {
        $('input[type="tel"]').mask('+38 (099) 999-99-99');
    }
    
    // Функція для обробки помилок завантаження зображень
    $('img').on('error', function() {
        $(this).attr('src', 'images/placeholder.jpg');
    });
    
})(jQuery);