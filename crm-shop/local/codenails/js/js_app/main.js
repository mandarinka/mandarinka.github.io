'use strict';
var $doc = $(document);
$doc.ready(function () {
    if (typeof ($.fn.slick) != 'undefined') {
        $('.js-slider').slick({
            dots: true,
			arrows: false,
            appendDots: $('.js-slider-dots')
        });
    }
    if (typeof ($.fn.mask) != 'undefined') {
		$('input[type="phone"]').mask('+7 (999) 999-99-99', {placeholder: '+7 (___) ___-__-__'});
	}
	if (typeof ($.fn.styler) != 'undefined') {
		$('.styler').styler();
	}
});

$doc.
	on('change', '.js-file-upload', function () {
		var data = $(this).data(),
			fieldSelector = data.field,
			previewSelector = data.preview,
			errorSelector = data.error,
			maxWidth = data.width,
			maxHeight = data.height;

		previewFile(previewSelector, fieldSelector, errorSelector, maxWidth, maxHeight);
	})
	.on('change', '.js-upload-css', function () {
		var data = $(this).data(),
			inputSelector = data.input,
			textSelector = data.name,
			errorSelector = data.error;

		previewCss(inputSelector, textSelector, errorSelector);
	})
	.on('click', '.js-next-slide', function () {
		$('.js-slider').slick('slickNext');
	})
	.on('click', '.js-toggle-upload-bg', function() {
		var container = $(this).data('uploadBlock');
		if($(this).prop('checked')) {
			$(container).addClass('is-visible');
		} else {
			$(container).removeClass('is-visible');
		}
	})
	.on('click', '.js-toggle-logo', function () {
		var container = $(this).data('target'),
			containerNext = $(this).siblings('.js-toggle-logo').data('target');
		$(this).closest('.step').find('.upload-container').removeClass('is-visible');
		$(container).addClass('is-visible');
		$(containerNext).removeClass('is-visible');
	})
	.on('click', '.js-select-currency', function() {
		$(this).parent().find('.js-select-currency').removeClass('active');
		$(this).addClass('active');
	})
	.on('click', '.js-close-master', function() {
		$(this).closest('.modal').addClass('animated fadeOut').removeClass('is-open');
		$('#app').removeClass('is-blur');
		$('body').removeClass('ov-h');
	})
	.on('click', '.js-skip-step', function() {
		$(this).closest('.onboarding-container').addClass('animated fadeOut is-hidden');
		$(this).closest('.modal-content').removeClass('is-onboarding');
		$('.settings-master').addClass('animated fadeIn is-visible');
	})
	.on('click', '.js-next-step', function() {
		var	activeBlock = $(this).parents().find('.step.active'),
			nextBlock = activeBlock.data('nextStep'),
			nextBtnText = activeBlock.data('btnText'),
			closeBtnText = activeBlock.data('btnTextClose');

			if(!nextBlock) {
				$(this).closest('.modal').addClass('animated fadeOut is-done');
				$('#app').removeClass('is-blur');
				return;
			}

			$(activeBlock).removeClass('active');
			$(nextBlock).addClass('active');

			if(closeBtnText) {
				$(this).siblings('.btn').text(closeBtnText);
			}

			if(nextBtnText) {				
				$(this).text(nextBtnText);
			}
	})
	.on('click', '.js-tab', function () {
		if($(this).hasClass('active')) return;

		var data = $(this).data(),
			target = data.target,
			title = data.title;

		$('.js-tab').removeClass('active');
		$('.js-admin-tabs .admin-tab').removeClass('active');
		$('.js-admin-tabs .admin-tab').filter(target).addClass('active');
		$('.js-tab-title').text(title);
		$(this).addClass('active');

	})
	.on('click', '.js-toggle-box', function () {
		var target = $(this).data('target');
		$(this).toggleClass('active');
		$(target).toggleClass('animated fadeIn hide pt10');
	})
	.on('click', '.js-select-photo', function (e) {
		var $target = $(e.target),
			tagName = $target.prop('tagName').toLowerCase(),
			$elements = $(this).find('.product-photo-block');

		if($target.hasClass('product-photo') || tagName == 'img') {
            $elements.removeClass('active');
            $target.closest('.product-photo-block').addClass('active');
		}
    })
	.on('click', '.js-insert-input', function () {
		var newInput = '<input class="input input-link">';
		$(this).closest('div').append(newInput);
    })
	.on('click', '.js-add-param', function(){
		var $param = $(this).prev('.content').clone().removeClass('hide');
		$param.find('input').val('');
		$(this).before($param);
	})
	.on('click', '.js-remove-el', function () {
		var countEl = $(this).closest('.js-params').find('.product-param').length,
			$container = $(this).closest('.js-params');
		if(countEl == 1){
			var $param = $(this).closest('.content').clone().addClass('hide');
			$param.find('input').val('');
			$container.prepend($param);
		}
		$(this).closest('.content').remove();
    })
	.on('click', '.js-select-page .pages-block-item', function () {
		$(this).closest('.js-select-page').find('.pages-block-item').removeClass('active');
		$(this).addClass('active');
    })
	.on('click', '.js-toggle-btn', function () {
		var target = $(this).data('target');
		$(target).toggleClass('animated fadeIn hide');
	})
	.on('click', '.js-toggle-modal', function () {
		var target = $(this).data('target');
		$(target).addClass('animated fadeIn is-open');
		$('#app').addClass('is-blur');
		$('body').addClass('ov-h');
	})
	.on('click', '.js-close-modal', function () {
		$(this).closest('.modal').removeClass('animated fadeIn is-open');
		$('#app').removeClass('is-blur');
		$('body').removeClass('ov-h');
	})
	.on('click', function (e) {
		var $target = $(e.target);
		if($target.hasClass('modal')) {
			//console.log(target);
			$target.removeClass('animated fadeIn is-open');
			$('#app').removeClass('is-blur');
			$('body').removeClass('ov-h');
		}
	})
	.on('click', '.js-toggle-block', function () {
		var data = $(this).data(),
			newText = data.textBtn,
			target = data.toggle,
			curText = $(this).text();

		$(this)
			.data('textBtn', curText)
			.html(newText)
			.toggleClass('active');

		$(target).slideToggle();
	})
	.on('click', '.js-delete-el', function () {
		var target= $(this).data('target');
		console.log(target);
		$(target).remove();
	})
	// .on('click', '.js-rename-el', function () {
	// 	var input = $(this).closest('.section-panel').find('.js-enter-title'),
	// 		label = input.siblings('.section-name-block');
	// 	input.removeClass('hide').focus();
	// 	label.addClass('hide');
	// })
	.on('blur', '.js-enter-title', function () {
		var label = $(this).siblings('.section-name-block'),
			labelText = $(this).val();

		if(!labelText) {
			$(this).addClass('hide');
			label.removeClass('hide');
			return;
		}

		$(this).addClass('hide');
		label.text(labelText).removeClass('hide');
	})
	.on('click', '.js-edit-el', function () {
		var data = $(this).data(),
			modal = data.modal,
			target = data.target;

		$(modal)
			.addClass('animated fadeIn is-open')
			.find('.btn')
			.data('target', target);

		$('#app').addClass('is-blur');
		$('body').addClass('ov-h');
	})
	.on('click', '.js-cancel-changes', function () {
		console.log($(this).data('target'));
	})
	.on('click', '.js-save-changes', function () {
		console.log($(this).data('target'));
	})
	.on("blur", '.js-input-price', function () {
		var inputVal = Number($(this).val());

		if(isNaN(inputVal)){
			$(this).val(0);
			return;
		}
		$(this).val(inputVal);
	})
	.on('change', '.js-add-photo', function () {
		var data = $(this).data(),
			inputSelector = data.input,
			containerSelector = data.container,
			cloneSelector = data.template,
			errorSelector = data.error,
			maxWidth = data.width,
			maxHeight = data.height;

		addPhoto(inputSelector, containerSelector, cloneSelector, errorSelector, maxWidth, maxHeight);
	})
	.on('click', '.js-toggle-field', function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');

		var toggleBlockState = $(this).data('state');
		console.log(toggleBlockState);

		if(!toggleBlockState) {
			$('.js-subsection-fileds').removeClass('animated fadeIn').addClass('hide');
			return;
		}
		$('.js-subsection-fileds').addClass('animated fadeIn').removeClass('hide');
	})
	.on("change keyup input", '.js-field-sorting', function () {
		if (this.value.match(/[^1-9]+/g)) {
			this.value = this.value.replace(/[^1-9]+/g, '');
		}
	});



/**
 * Показ загружаемой картинки.
 *
 * @param {string} previewSelector - Селектор блока для превью картинки
 * @param {string} inputSelector - Селектор инпута
 * @param {string} errorSelector - Селектор блока для сообщений об ошибках
 * @param {number} maxWidth - Максимальная ширина картинки
 * @param {number} maxHeight - Максимальная высота картинки
 */
function previewFile(previewSelector, inputSelector, errorSelector, maxWidth, maxHeight) {
	var preview = document.querySelector(previewSelector),
		input = document.querySelector(inputSelector),
		file = document.querySelector(inputSelector).files[0],
		errorBlock = document.querySelector(errorSelector),
    	regex = new RegExp('([а-яА-ЯёЁa-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$'),
		reader  = new FileReader();

	reader.onloadend = function (e) {
		// console.log('reader.result', reader);
		if (regex.test(input.value.toLowerCase())) {
			var image = new Image();
			image.src = e.target.result;

	        image.onload = function () {
	            var height = this.height;
	            var width = this.width;

	            if (height > maxHeight || width > maxWidth) {
	                errorBlock.textContent = 'Некорректный размер изображения';
	                if(preview) {
                        preview.removeAttribute('style');
                    }
	                return;
	            }

	            errorBlock.textContent = '';
	            if(preview) {
                    preview.style.backgroundImage = 'url(' + reader.result + ')';
                }
	        };

		} else {
	        errorBlock.textContent = 'Пожалуйста, выберите корректное изображение';
	        if(preview) {
                preview.removeAttribute('style');
            }
	    }
	};

	if (file) {
		reader.readAsDataURL(file);
	} else {
		if(preview) {
            preview.removeAttribute('style');
        }
		errorBlock.textContent = '';
		console.log('empty');
	}
}

/**
 * Кастомизация обычного селекта, для отображения загрузки css файлоф.
 *
 * @param {string} inputSelector - Селектор инпута
 * @param {string} fileNameSelector - Селектор блока для вывода названия загруженного файла
 * @param {string} errorSelector - Селектор блока для вывода сообщений об ошибках
 */
function previewCss (inputSelector, fileNameSelector, errorSelector) {
	var file = document.querySelector(inputSelector).files[0],
		fileNameBlock = document.querySelector(fileNameSelector),
		errorBlock = document.querySelector(errorSelector),
		regex = new RegExp('([а-яА-ЯёЁa-zA-Z0-9\s_\\.\-:])+(.css)$');

	if(!file) {
		fileNameBlock.textContent = '';
		errorBlock.textContent = '';
		return;
	}

	if(regex.test(file.name.toLowerCase())){
		errorBlock.textContent = '';
		fileNameBlock.textContent = file.name;
	} else {
		errorBlock.textContent = 'Пожалуйста, выберите корректный тип файла (.css)';
		fileNameBlock.textContent = '';
	}
}

/**
 * Добавление фото товара
 *
 * @param {string} inputSelector - Селектор инпута
 * @param {string} containerSelector - Селектор контейнера для вставки блока с фото
 * @param {string} cloneSelector - Селектор блока, разметка которого будет взата за основу для вставки нового фото
 * @param {string} errorSelector - Селектор контейнера для вставки блока с фото
 * @param {number} maxWidth - Максимальная ширина фото
 * @param {number} maxHeight - Максимальная высота фото
 */

function addPhoto(inputSelector, containerSelector, cloneSelector, errorSelector, maxWidth, maxHeight) {
	var input = document.querySelector(inputSelector),
		container = document.querySelector(containerSelector),
		errorBlock = document.querySelector(errorSelector),
		photoBlock = container.querySelector(cloneSelector).cloneNode(true),
		photo = photoBlock.querySelector('.product-photo img'),
		file = input.files[0],
		regex = new RegExp('([а-яА-ЯёЁa-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$'),
		reader  = new FileReader();

	photoBlock.classList.remove('active');

	reader.onloadend = function (e) {
		console.log('reader.result', reader);
		if(!regex.test(input.value.toLowerCase())) {
			console.log('fail');
			errorBlock.textContent = 'Пожалуйста, выберите корректное изображение';
			return;
		}

		var image = new Image();
		image.src = e.target.result;

		image.onload = function () {
			var height = this.height;
			var width = this.width;

			if (height > maxHeight || width > maxWidth) {
				errorBlock.textContent = 'Некорректный размер изображения';
				return;
			}

			errorBlock.textContent = '';
			photo.src = image.src;
			container.appendChild(photoBlock);
		};
	};

	if (file) {
		reader.readAsDataURL(file);
	} else {
		errorBlock.textContent = '';
		console.log('empty');
	}

}