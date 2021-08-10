$('.promo__slider').slick({
    prevArrow: '<button class="slider__btn promo__slider-btn promo__slider-btn--prev"><img src="img/icons/arrows/arrow-left.png"></button>',
    nextArrow: '<button class="slider__btn promo__slider-btn promo__slider-btn--next"><img src="img/icons/arrows/arrow-right.png"></button>',
    dots: true,
    //appendArrows: $('.promo__arrows'),
    responsive: [
        {
            //breakpoint: ,
            settings: {
                1700: {
                    dots: false,
                }
            }
        },
        {
            //breakpoint: ,
            settings: {

            }
        }
    ]
});