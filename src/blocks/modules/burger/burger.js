$('.burger-btn').on('click', function () {
    $('.burger-btn').toggleClass('burger-btn--active');
    $('.header__bottom').toggleClass('header__bottom--active');
});

$('.header__menu-link').on('click', function () {
    $('.header__bottom').removeClass('header__bottom--active');
    $('.burger-btn').removeClass('burger-btn--active');
});