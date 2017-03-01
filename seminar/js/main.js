$(document).ready(function() {

/* pseudo placeholder */

var formField = $(".js-placeholder");
// var formSelect = $(".js-custom-select");

formField.blur(function () {
	var fieldVal = $(this).val();

	if (fieldVal.length > 0) {
		$(this).next(".pseudo-placeholder").hide();
	} else {
		$(this).next(".pseudo-placeholder").show();
	}
});

/* reviews carousel */

if (typeof ($.fn.bxSlider) != 'undefined') { // проверка на подключение библиотеки bxSlider
    $('.js-bx-slider').bxSlider({
        pager: false
    });
}



/* anchor */
$('.js-move-to').on('click', function () {
    var target = $(this).attr("data-target");
    $('html, body').animate({scrollTop: $(target).offset().top}, 800);
});


// высота блока с заголовком
if ($(window).height() > 700) {
    $('.header-wr').css('min-height', $(window).height());
}



$(window).resize(function () {
    if ($(window).height() > 700) {
        $('.header-wr').css('min-height', $(window).height());
    }
});

/* показ формы */

var showForm = true;

function getWindowWidth () {
    var windowWidth = $(window).width();
        
    if (windowWidth > 1200 || windowWidth == 1200) {
        showForm = true;
    } else{
        showForm = false;
    }
    return showForm;
}
getWindowWidth();

$(window).resize(function () {
    getWindowWidth();
});

$('.js-show-form').click(function () {
    $('.seminar-place, .js-show-form').fadeOut();
    if(showForm == false){
        $('.seminar-description').fadeOut();
    } else {
        $('.seminar-description').fadeIn();
    }
    $('.js-form').fadeIn();         
});

$('.js-close-form').click(function () {
    $('.js-form').fadeOut();
    $('.seminar-place, .js-show-form').fadeIn();
    if(showForm == false){
        $('.seminar-description').fadeIn();
    } 
});

/* select */

$(".js-custom-select").select2({
    placeholder: "Откуда вы узнали про семинар?",
    minimumResultsForSearch: -1
});

/* seminar photo */
if (typeof ($.fn.fotorama) != 'undefined') { 

// 1. Initialize fotorama manually.
var $fotoramaDiv = $('.js-fotorama').fotorama({
    width: 600,
    maxwidth: '100%',
    allowfullscreen: true,
    nav: false,
    margin: 50,
    fit: 'scaledown',
    arrows: 'always'
});

// 2. Get the API object.
var fotorama = $fotoramaDiv.data('fotorama');

$('.js-fotorama').on('fotorama:ready', function (e, fotorama) {
    var block = $(this).find(".fotorama__stage");
    $("<div class='fotorama-counter'></div>").insertAfter(block);
    $('.fotorama-counter').text('Фото ' + (fotorama.activeIndex + 1) + ' из ' + fotorama.size);

});

$('.js-fotorama').on('fotorama:show', function (e, fotorama) {
    if ($(this).find('.fotorama-counter').length > 0) {
        $(this).find('.fotorama-counter').remove();
    }
    var block = $(this).find(".fotorama__stage");
    $("<div class='fotorama-counter'></div>").insertAfter(block);
    $('.fotorama-counter').text('Фото ' + (fotorama.activeIndex + 1) + ' из ' + fotorama.size);
});

$('.js-show-gallery').click(function () {
    fotorama.requestFullScreen()
});

}
/* end seminar photo */

var $fixedItem = $('.js-infographics .infographics-bg');
var $lastItem = $('.js-infographics .infographics-item.last');
var offsetItemTop = 100;// top: 250px для bg
var posItem = $fixedItem.offset().top - offsetItemTop;
var posLastItem = $lastItem.offset().top + 100;

$(window).scroll(function () {
    var posScroll = $(window).scrollTop();

    if (showForm == true) {

        if ((posScroll > posItem || posScroll == posItem) && posScroll < posLastItem) {
            $fixedItem.addClass('fixed');
        } else{
            $fixedItem.removeClass('fixed');
        }
    } else{
        $fixedItem.removeClass('fixed');
    }

});



/* end */
});

