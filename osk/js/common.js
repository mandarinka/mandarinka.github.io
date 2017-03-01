$(document).ready(function(){

// Init Google Map

    mapInit();


// Map

    $(window).resize(function() {
        var windowHeight = $(window).height();
        var mapHeight = windowHeight - 146;
        $('#map-canvas').css('min-height', mapHeight);
    });

    $(window).resize();

// Range object

    $( ".slider-range" ).slider({
        range: true,
        min: 1,
        max: 5,
        values: [ 2, 4 ],
        slide: function( event, ui ) {
        $( ".amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });

    $( ".amount" ).val( "$" + $( ".slider-range" ).slider( "values", 0 ) + " - $" + $( ".slider-range" ).slider( "values", 1 ) );


    $('.js-ui-slider').slider({
        min: 0,
        max: 1000,
        step: 10,
        stop: function(event, ui) {
            $(this).prev( ".filter__result" ).val(ui.value);
        },
        slide: function(event, ui){
            $(this).prev( ".filter__result" ).val(ui.value);
        }
    });

    $('.js-ui-cost').slider({
        min: 0,
        max: 10000000,
        step: 5000,
        stop: function(event, ui) {
            $(this).prev( ".filter__result" ).val(ui.value);
        },
        slide: function(event, ui){
            $(this).prev( ".filter__result" ).val(ui.value);
        }
    });

    $(".filter__result").change(function(){
            
        var value = $(this).val();

        $(this).next(".slide").slider("value", value);
    });

// фильтрация ввода в поля
    $('.filter input').keypress(function(event){
        var key, keyChar;
        if(!event) var event = window.event;
        
        if (event.keyCode) key = event.keyCode;
        else if(event.which) key = event.which;
    
        if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
        keyChar=String.fromCharCode(key);
        
        if(!/\d/.test(keyChar)) return false;
    
    });


// Tabs

    var tabContainers = $('.tab-wr > div'); 
    tabContainers.hide().filter(':first').show();;

    $('div#tabs .tab-navigation a').click(function () {
        tabContainers.hide(); 
        tabContainers.filter(this.hash).show(); 
        $('div#tabs .tab-navigation a').removeClass('active'); 
        $(this).addClass('active'); 
        return false;
    }).filter(':first').click();



// Label 

    $('.label-city').filter(':first').addClass('active');
    $('.label-city').click(function() {
        $('.label-city').removeClass('active');
        $(this).addClass('active');
    });



// Cataloque nav
    $('.js-type-nav a').filter(':first').addClass('active');
    $('.js-type-nav a').click(function () {

        var typeCataloque = $(this).attr('data-type');

        $('.js-type-nav a').removeClass('active');
        $(this).addClass('active');
        
        if(typeCataloque > 0){
            $('.cataloque-items').removeClass('cataloque-items--standart');
            $('.cataloque-items').addClass('cataloque-items--modified');
        } else {
            $('.cataloque-items').removeClass('cataloque-items--modified');
            $('.cataloque-items').addClass('cataloque-items--standart');
        }
    });

// Callback modal window

    $('.js-modal-open').click(function () {
        $('body').find('.modal-layout').removeClass('g-hidden');
        return false;
    });
    $('.js-modal-close').click(function () {
        $('.modal-layout').addClass('g-hidden');
    });


// Validation

    function validateForm () {

        $('.js-validate-form .form__input, .js-validate-form .form__textarea').off().blur( function(){

            var id = $(this).attr('id');
            var val = $(this).val();

            switch(id){
                case 'name':
                    var rv_name = /^[a-zA-Zа-яА-Я]+$/;

                    if(val.length > 2 && val != '' && rv_name.test(val)){

                        $(this).prev().removeClass('form__error');
                        $(this).prev().addClass('form__valid');
                        $(this).next('.form__error-box').removeClass('active');
                        $(this).next('.form__error-box').text('');

                    } else {

                        $(this).prev().removeClass('form__valid');
                        $(this).prev().addClass('form__error');
                        $(this).next('.form__error-box').addClass('active');
                        $(this).next('.form__error-box').html('Пожалуйста, представьтесь');

                    }
                break;

                case 'phone':
                    var rv_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

                    if(val != '' && rv_phone.test(val)){

                        $(this).prev().removeClass('form__error');
                        $(this).prev().addClass('form__valid');
                        $(this).next('.form__error-box').removeClass('active');
                        $(this).next('.form__error-box').text('');

                    } else{

                        $(this).prev().removeClass('form__valid');
                        $(this).prev().addClass('form__error');
                        $(this).next('.form__error-box').addClass('active');
                        $(this).next('.form__error-box').html('Пожалуйста, укажите контактный телефон');

                    };
                break;

                case 'message':

                    if(val != '' && val.length < 5000){

                        $(this).prev().removeClass('form__error');
                        $(this).prev().addClass('form__valid');
                        $(this).next('.form__error-box').removeClass('active');
                        $(this).next('.form__error-box').text('');

                    } else{

                        $(this).prev().removeClass('form__valid');
                        $(this).prev().addClass('form__error');
                        $(this).next('.form__error-box').addClass('active');
                        $(this).next('.form__error-box').html('Пожалуйста, напишите сообщение');

                    };
                break;

            };

        });
    };

    function validateFormSub () {

        var form = $('.form'),
            fieldName = form.find("#name"),
            fieldPhone = form.find("#phone"),
            fieldMessage = form.find("#message"),
            fieldNameVal = fieldName.val(),
            fieldPhoneVal = fieldPhone.val(),
            fieldMessageVal = fieldMessage.val(),
            rv_name = /^[a-zA-Zа-яА-Я]+$/,
            rv_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, 
            rv_name = /^[a-zA-Zа-яА-Я]+$/;


        if (fieldNameVal.length > 2 && fieldNameVal != '' && rv_name.test(fieldNameVal)) {
            fieldName.prev().removeClass('form__error');
            fieldName.prev().addClass('form__valid');
            fieldName.next('.form__error-box').removeClass('active');
            fieldName.next('.form__error-box').text('');

        } else {

            fieldName.prev().removeClass('form__valid');
            fieldName.prev().addClass('form__error');
            fieldName.next('.form__error-box').addClass('active');
            fieldName.next('.form__error-box').html('Пожалуйста, представьтесь');

        };

        if(fieldPhoneVal != '' && rv_phone.test(fieldPhoneVal)){

            fieldPhone.prev().removeClass('form__error');
            fieldPhone.prev().addClass('form__valid');
            fieldPhone.next('.form__error-box').removeClass('active');
            fieldPhone.next('.form__error-box').text('');

        } else{

            fieldPhone.prev().removeClass('form__valid');
            fieldPhone.prev().addClass('form__error');
            fieldPhone.next('.form__error-box').addClass('active');
            fieldPhone.next('.form__error-box').html('Пожалуйста, укажите контактный телефон');

        };

        if(fieldMessageVal != '' && fieldMessageVal.length < 5000){

            fieldMessage.prev().removeClass('form__error');
            fieldMessage.prev().addClass('form__valid');
            fieldMessage.next('.form__error-box').removeClass('active');
            fieldMessage.next('.form__error-box').text('');

        } else{

            fieldMessage.prev().removeClass('form__valid');
            fieldMessage.prev().addClass('form__error');
            fieldMessage.next('.form__error-box').addClass('active');
            fieldMessage.next('.form__error-box').html('Пожалуйста, напишите сообщение');

        };

    };

    validateForm();

    $('.js-validate-form .form__submit').click(function(e){

        e.preventDefault();
        validateFormSub();

    });

// Placeholder IE
    var ua = navigator.userAgent;
    if (ua.search(/MSIE/) > 0) {
        $('body, html').find("input[type='text']").each(function() {
            var tp = $(this).attr("placeholder");
            $(this).attr('value',tp).css('color','#cbcbcb');
        }).focusin(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == val) {
                $(this).attr('value','').css('color','#cbcbcb');
            }
        }).focusout(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == "") {
                $(this).attr('value', val).css('color','#cbcbcb');
            }
        });
        $("body, html").find("textarea").each(function() {
            var tp = $(this).attr("placeholder");
            $(this).attr('value',tp).css('color','#999');
        }).focusin(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == val) {
                $(this).attr('value','').css('color','#333');
            }
        }).focusout(function() {
            var val = $(this).attr('placeholder');
            if($(this).val() == "") {
                $(this).attr('value', val).css('color','#999');
            }
        });
        $("body, html").submit(function() {
            $(this).find("input[type='text']").each(function() {
                var val = $(this).attr('placeholder');
                if($(this).val() == val) {
                    $(this).attr('value','');
                }
            });
            $(this).find("textarea").each(function() {
                var val = $(this).attr('placeholder');
                if($(this).val() == val) {
                    $(this).attr('value','');
                }
            });
        });
    }
});
