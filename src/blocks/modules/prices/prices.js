$('.price-list__add-btn').on('click', function () {
    $(this).toggleClass('price-list__add-btn--active');
});

$('.prices-accordion__item-summary').on('click', function () {
    $(this).parent().siblings().removeClass('prices-accordion__item--active');
    $(this).parent().siblings().find('.prices-accordion__item-details').slideUp('300');
    $(this).next().slideToggle('300');
    $(this).parent().toggleClass('prices-accordion__item--active');
});