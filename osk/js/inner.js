$(document).ready(function(){

    var tabContainers = $('.tabs-frame > div'); 
    tabContainers.hide().filter('.second-tab').show();

    $('div#object-tabs .navigation a').click(function () {
        tabContainers.hide(); 
        tabContainers.filter(this.hash).show(); 
        $('div#object-tabs .navigation a').removeClass('active'); 
        $(this).toggleClass('active'); 
        return false;
    }).filter('.second-tab').click();

    $('.js-carousel').bxSlider({
        minSlides: 3,
        maxSlides: 6,
        slideWidth: 313,
        nextSelector: '.js-carousel-btn-r',
        prevSelector: '.js-carousel-btn-l',
        slideMargin: 0,
        pager: false
    });
    // $(".carousel-button-right").on('click', function(){ 
    //     var carusel = $(this).parents('.carousel');
    //     right_carusel(carusel);
    //     return false;
    // });

    // $(".carousel-button-left").on('click', function(){ 
    //     var carusel = $(this).parents('.carousel');
    //     left_carusel(carusel);
    //     return false;
    // });

    // function left_carusel(carusel){
    //    var block_width = $(carusel).find('.carousel-block').outerWidth();
    //    var block_width_preview = $(carusel).find('.preview').outerWidth();

    //    $(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-items")); 
    //    $(carusel).find(".carousel-items").css({"left":"-"+block_width+"px"});
    //    $(carusel).find(".carousel-items .carousel-block").eq(-1).remove();    
    //    $(carusel).find(".carousel-items").animate({left: "0px"}, 200); 
    // }

    // function right_carusel(carusel){
    //     var block_width = $(carusel).find('.carousel-block').outerWidth();
    //     var block_width_preview = $(carusel).find('.preview').outerWidth();

    //    $(carusel).find(".carousel-items").animate({left: "-"+ block_width +"px"}, 500, 'easeOutExpo', function(){
    //       $(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-items")); 
    //       $(carusel).find(".carousel-items .carousel-block").eq(0).remove(); 
    //       $(carusel).find(".carousel-items").animate({left: "0px"}, 200); 
    //    });

    // }

    // $("#object-slider").sliderkit({
    //       shownavitems:2,
    //       panelbtnshover:false,
    //       auto:false,
    //       circular:true,
    //       navscrollatend:true,
    //       delaycaptions:true
    // });


    // // Modal window
    // $('body').on('click', '.js-ico-apartments .ico', function(){
    //     var gallery = '.'+$(this).attr('data-id');
    //     $(gallery).modal().open();

    //     $(".themodal-overlay .sliderkit").sliderkit({
    //         panelbtnshover:false,
    //         auto:false,
    //         circular:true,
    //         navscrollatend:true,
    //         counter:true
    //     });
    // });


    // Gallery counter 

    $('.js-ico-apartments').each(function () {

        var ico = $(this).find('.ico'),
            countItem = $(this).find('.inlinedata').size();

        ico.text(countItem);

    });

    $('.js-ico-apartments .ico').click(function() {
        $('body').addClass('height-auto');
        
        $.fancybox.open( $(this).parent().find('.inlinedata').get(), {
            closeBtn: false,
            nextEffect: 'fade',
            prevEffect: 'fade',
            padding: 0,
            margin: [20, 60, 20, 60],
            fitToView: true,
            width: '100%',
            height: '100%',
            autoSize: true,
            helpers: { 
                title : { type : 'outside' }
            }, // helpers
            beforeShow : function() {
            this.title = (this.title ? '' + this.title + '' : '') + '<span>' + (this.index + 1) + ' / ' + this.group.length + '</span>';
            },
            afterShow: function() {
                $('.fancybox-wrap').swipe({
                    swipe : function(event, direction) {
                        if (direction === 'left' || direction === 'up') {
                            $.fancybox.prev( direction );
                        } else {
                            $.fancybox.next( direction );
                        }
                    }
                });

            },

            afterLoad : function() {
            }
        });
    });

// Callback modal window

    $('.js-modal-open').click(function () {
        $('body').find('.modal-layout').removeClass('g-hidden');
        return false;
    });
    $('.js-modal-close').click(function () {
        $('.modal-layout').addClass('g-hidden');
    });


});



