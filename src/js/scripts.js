$(document).ready(function() {
    $('.objects-block__images').slick({
        arrows: true,
        dots: true
    });

    $('.objects-tabs__item').click(function(e) {
        var block = $(this).attr('data-block');
        $('.objects-tabs__item--active').removeClass('objects-tabs__item--active');
        $(this).addClass('objects-tabs__item--active');

        $('.objects-block--active').removeClass('objects-block--active');
        $(block).addClass('objects-block--active');
    });

    // form

    $('.tel-input').inputmask({ "mask": "+7 (999) 999-99-99", "placeholder": "_", showMaskOnHover: false, showMaskOnFocus: true });

    $('.calc-form__file').click(function(e) {
        e.preventDefault();
        $('.calc-form__file-input').click();
    });

    $('.calc-form__file-input').on('change', function(event, files, label) {
        var fileName = document.getElementsByClassName("calc-form__file-input")[0].files[0].name;
        var fileSize = document.getElementsByClassName("calc-form__file-input")[0].files[0].size;

        var name = fileName.substr(0, fileName.lastIndexOf('.'));
        var fileType = fileName.substr(fileName.lastIndexOf('.') + 1).toUpperCase();

        fileSize = Math.round(fileSize / 1000);
        var sizeType = 'Кб';
        if (fileSize > 1000) {
            sizeType = 'Мб';
            fileSize = Math.round(fileSize / 1000);
        }

        $('.calc-form__file').html(name + '<span> (' + fileType + ', ' + fileSize + ' ' + sizeType + ')</span>');
    });

    initMap();

    // modal

    $('.modal').click(function() {
        $('.modal').removeClass('modal--active');
    });

    $('.modal__content').click(function(e) {
        e.stopPropagation();
    });

    $('.open-modal').click(function(e) {
        e.preventDefault();
        var title = $(this).attr('data-title');
        $('.modal .calc-form__title').text(title);
        $('.modal').addClass('modal--active');
    });

    $('.modal__close').click(function(e) {
        e.preventDefault();
        $(this).parents('.modal').removeClass('modal--active');
    });
});

function initMap() {
    ymaps.ready(function () {
        myMap = new ymaps.Map('map', {
            center: [55.908481, 37.414947],
            zoom: 16,
            controls: ['zoomControl']
        });

        var newcoord = myMap.getGlobalPixelCenter();

        if (window.innerWidth < 992) {
            newcoord[0] -= 200;

            if (window.innerWidth < 768) {
                newcoord[0] += 200;
            }

            //myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier']);
        }
        else {
            newcoord[0] -= 67;
        }
        myMap.setGlobalPixelCenter(newcoord);

        var myPlacemark = new ymaps.Placemark([55.908481, 37.414947], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/mark.svg',
            iconImageSize: [70, 70],
            iconImageOffset: [-35, -35]
        });

        myMap.geoObjects.add(myPlacemark);

        myMap.behaviors.disable('scrollZoom');
    });
}
