$('.doctors-section__slider').slick({
    slidesToShow: 5,
    prevArrow: '<button class="slider__btn"><img src="img/icons/arrows/arrow-left.png"></button>',
    nextArrow: '<button class="slider__btn"><img src="img/icons/arrows/arrow-right.png"></button>',
    appendArrows: $('.doctors-section__slider-arrows'),
    responsive: [
        {
            //breakpoint: ,
            settings: {

            }
        },
        {
            //breakpoint: ,
            settings: {

            }
        }
    ]
});

$('.district-doctors__slider').slick({
    slidesToShow: 4,
    prevArrow: '<button class="slider__btn district-doctors__slider-btn district-doctors__slider-btn--prev"><img src="img/icons/arrows/arrow-left.png"></button>',
    nextArrow: '<button class="slider__btn district-doctors__slider-btn district-doctors__slider-btn--next"><img src="img/icons/arrows/arrow-right.png"></button>',
    variableWidth: true,
    responsive: [
        {
            //breakpoint: ,
            settings: {

            }
        },
        {
            //breakpoint: ,
            settings: {

            }
        }
    ]
});