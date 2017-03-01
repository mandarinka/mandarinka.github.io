/**
 * Created by marina on 14.12.2016.
 */
'use strict';
$(document)
    .on('click', '.js-toggle-content', function () {
        $(this).toggleClass('active');
        $(this).next('.mb-toggle-container').toggleClass('open');
    })
    .on('click', '.js-preview-img', function () {
        var data = $(this).data(),
            productImg = data.img.toLowerCase(),
            productImgBig = data.bigImg.toLowerCase(),
            galleryLink = $('.js-product-gallery a'),
            galleryImg = $('.js-product-gallery img');

        galleryLink.attr('href', productImgBig);
        galleryImg.attr('src', productImg);

    })
    .on('click', '.js-quantity-btn', function () {
        var data = $(this).data(),
            action = data.action,
            input = $(data.target),
            inputVal = +input.val();

        if(action == 'decrease') {
            if(inputVal) {
                inputVal--;
                input.val(inputVal);
                if(inputVal == 0) {
                    $(this).addClass('disabled');
                }
            }
        }

        if(action == 'increase') {
            inputVal++;
            input.val(inputVal);
            $(this).parent().find('[data-action="decrease"]').removeClass('disabled');
        }

    })
    .on("change keyup input", '.js-quantity-input', function () {
        if (this.value.match(/[^0-9]+/g)) {
            this.value = this.value.replace(/[^0-9]+/g, '');
        }
    })
    .on("blur", '.js-quantity-input', function () {
        var thisVal = +$(this).val();

        if(thisVal) {
            $(this).parent().find('[data-action="decrease"]').removeClass('disabled');
        } else {
            $(this).val('0');
            $(this).parent().find('[data-action="decrease"]').addClass('disabled');
        }
    })
    .on("click", '.js-modal-btn', function (e) {
       // var $target = $(e.target)
        var actionType = $(this).data('action');
        console.log(actionType);
        if(actionType == 'dismiss' || actionType == 'agree') {
            console.log(actionType);
            $(this).closest('.cn-modal').magnificPopup('close');
        }

        if(actionType == 'disagree'){
            console.log(actionType);
            $(this).closest('.cn-modal').magnificPopup('close');
            $('#evil-popup').magnificPopup();
        }
    });

$(document).ready(function () {
    if(typeof ($.fn.slicknav) != 'undefined') {
        $('.js-mobile-nav').slicknav({
            label: '',
            duplicate: true,
            addintionalMenu: '.js-clone', // селектор блока с доп меню, вставляется после основного меню
            removeClasses: true
        });
    }
    if(typeof ($.fn.magnificPopup) != 'undefined') {
        $('.js-mfp-img').magnificPopup({
            type: 'image',
            gallery:{
                enabled:true
            }
        });

        $('.js-popup-modal').magnificPopup();
    }
    if (typeof ($.fn.mask) != 'undefined') {
        $('input[type="phone"]').mask('+7 (999) 999-99-99', {placeholder: '+7 (___) ___-__-__'});
    }
    if (typeof ($.fn.mCustomScrollbar) != 'undefined') {
        $('.js-custom-scroll').mCustomScrollbar({
            scrollbarPosition: 'outside',
        });
    }
});

var basket = new ShoppingBasket('.js-basket-items', '.js-purchase-amount', '.js-basket-count', '.js-basket-sum');
/**
 * Управление корзиной.
 *
 * @param {string} basketSelector - Селектор блока списка товаров
 * @param {string} amountSelector - Селектор блока для вывода суммы покупки
 * @param {string} topCountSelector - Селектор блока в шапке для вывода количества товаров в корзине
 * @param {string} topSumSelector - Селектор блока в шапке для вывода суммы покупки в корзине
 */
function ShoppingBasket(basketSelector,amountSelector, topCountSelector, topSumSelector) {
    this.el = document.querySelector(basketSelector);

    if(!this.el) return;

    var self = this,
        topCountEl = document.querySelector(topCountSelector),
        topSumtEl = document.querySelector(topSumSelector),
        amountEl = document.querySelector(amountSelector);


    this.el.addEventListener('click', function(evt) {
        var target = evt.target,
            row = target.closest('.table-row'),
            quantityEl = row.querySelector('.input-quantity'),
            btnDecrease = row.querySelector('.btn-decrease'),
            sumEl = row.querySelector('.sum-digit'),
            price = Number(row.querySelector('.unit-price-digit').textContent);

        if (target.matches('.btn-increase')) {
            increase(quantityEl, btnDecrease, sumEl, price);
        }

        if(target.matches('.btn-decrease')) {
            decrease(quantityEl, btnDecrease, sumEl, price);
        }

        if(target.matches('.btn-remove')){
            removeItem(row, quantityEl, sumEl);
        }
    });

    function increase(el, btn, sumEl, price){
        var quantity = el.value,
            inputs = self.el.querySelectorAll('.input-quantity'),
            inputsSum = self.el.querySelectorAll('.sum-digit'),
            amountItems = null,
            sum = null;

        quantity++;
        el.value = quantity;
        btn.classList.remove('disabled');
        sumEl.textContent = price * quantity;

        [].forEach.call(inputs, function (input) {
            amountItems += Number(input.value);
        });
        [].forEach.call(inputsSum, function (inputSum) {
            sum += Number(inputSum.textContent);
        });
        topCountEl.textContent = amountItems;
        amountEl.textContent = sum;
        topSumtEl.textContent = sum;
    }

    function decrease(el, btn, sumEl, price) {
        var quantity = el.value,
            inputs = self.el.querySelectorAll('.input-quantity'),
            inputsSum = self.el.querySelectorAll('.sum-digit'),
            amountItems = null,
            sum = null;

        quantity--;
        // if(quantity < 1) return;
        if(quantity == 1) {
            btn.classList.add('disabled');
        }

        sumEl.textContent = price * quantity;
        el.value = quantity;

        [].forEach.call(inputs, function (input) {
            amountItems += Number(input.value);
        });
        [].forEach.call(inputsSum, function (inputSum) {
            sum += Number(inputSum.textContent);
        });

        topCountEl.textContent = amountItems;
        amountEl.textContent = sum;
        topSumtEl.textContent = sum;
    }

    function removeItem(row, inputEl, sumEl) {
        var quantity = inputEl.value,
            sum = Number(sumEl.textContent),
            sumBasket = Number(amountEl.textContent),
            inputs = self.el.querySelectorAll('.input-quantity'),
            amountItems = null,
            newAmountItems = null,
            newSumBasket = null;

        [].forEach.call(inputs, function (input) {
            amountItems += Number(input.value);
        });

        newAmountItems = amountItems - quantity;
        newSumBasket = sumBasket - sum;

        row.remove();
        topCountEl.textContent = newAmountItems;
        amountEl.textContent = newSumBasket;
        topSumtEl.textContent = newSumBasket;
    }
}