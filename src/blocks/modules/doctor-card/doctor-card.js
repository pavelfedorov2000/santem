$('.doctor-card__like-btn').on('click', function () {
    $(this).parent().toggleClass('doctor-card--favorite');
    var likes = $(this).find('.doctor-card__like-num').text();
    console.log(likes);
    if ($(this).parent().hasClass('doctor-card--favorite')) {
        likes -= 1;
    } else {
        likes += 1;
    }
}); 