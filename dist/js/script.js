$(function () {

    $('.burger-btn').on('click', function () {
    $('.burger-btn').toggleClass('burger-btn--active');
    $('.header__bottom').toggleClass('header__bottom--active');
});

$('.header__menu-link').on('click', function () {
    $('.header__bottom').removeClass('header__bottom--active');
    $('.burger-btn').removeClass('burger-btn--active');
});

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

    $('.price-list__add-btn').on('click', function () {
    $(this).toggleClass('price-list__add-btn--active');
});

$('.prices-accordion__item-summary').on('click', function () {
    $(this).parent().siblings().removeClass('prices-accordion__item--active');
    $(this).parent().siblings().find('.prices-accordion__item-details').slideUp('300');
    $(this).next().slideToggle('300');
    $(this).parent().toggleClass('prices-accordion__item--active');
});

    $('.tab').on('click', function(e){
    e.preventDefault();

    $($(this).siblings()).removeClass('tab--active');
    $('.tabs-content').removeClass('tabs-content--active');

    $(this).addClass('tab--active');
    $($(this).attr('href')).addClass('tabs-content--active');
});

    function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();

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

$('.reviews-section__slider').slick({
    slidesToShow: 3,
    prevArrow: '<button class="slider__btn"><img src="img/icons/arrows/arrow-left.png"></button>',
    nextArrow: '<button class="slider__btn"><img src="img/icons/arrows/arrow-right.png"></button>',
    appendArrows: $('.reviews-section__slider-buttons'),
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

$('.promotion-section__slider').slick({
    slidesToShow: 1,
    prevArrow: '<button class="slider__btn promotion-section__slider-btn  promotion-section__slider-btn--prev"><img src="img/icons/arrows/arrow-left.png"></button>',
    nextArrow: '<button class="slider__btn promotion-section__slider-btn  promotion-section__slider-btn--next"><img src="img/icons/arrows/arrow-right.png"></button>',
    responsive: [
        {
            //breakpoint: ,
            settings: {

            }
        },
    ]
});

    $("a[href^='#']").not('.tab').click(function(){
    const href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(href).offset().top+"px"}); // плавный скролл по ссылкам
    return false;
});

    $('.filter-style').styler();
});



