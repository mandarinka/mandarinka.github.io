$(document).ready(function(){
    $('.gallery').each(function(){
        var g = $(this),
            inner = g.find('.gallery__inner'),
            items = g.find('.gallery__item'),
            current = items.index(g.find('.active')),
            btnPrev = g.find('.gallery__prev'),
            btnNext = g.find('.gallery__next'),
            innerLeft = 0;

        setWidth();

        setActive();

        $(window).resize(setActive);

        if (items.length > 1) {
            items.click(function(){
                var a = $(this),
                    next = (!a.hasClass('active')) ? items.index(this) : current + 1;


                next = (next >= items.length) ? 0 : next;
                collapse(current);
                current = next;
                expand(next);

                var offset = items.eq(next).position().left;

                inner.stop().animate({
                    marginLeft:innerLeft - offset
                },500,'easeOutExpo');
            });

            btnPrev.click(function () {
                var a = $(this).find('.gallery__item.active'),
                    nextMax = -(items.length);
                    next = current - 1;

                next = (next >= items.length|| next < nextMax) ? 0 : next;

                collapse(current);

                if (next == nextMax) {
                    a.find('span').show().animate({
                        opacity:1
                    },400);
                }

                current = next;
                expand(next);

                var offset = items.eq(next).position().left;

                inner.stop().animate({
                    marginLeft:innerLeft - offset
                },500,'easeOutExpo');
            });

            btnNext.click(function () {
                var a = $(this).find('.gallery__item.active'),
                    next = current + 1;

                next = (next >= items.length) ? 0 : next;

                collapse(current);
                current = next;
                expand(next);

                var offset = items.eq(next).position().left;
                inner.stop().animate({
                    marginLeft:innerLeft - offset
                },500,'easeOutExpo');

            });
        };


        function expand(next) {
            var a = items.eq(next),
                img = (!a.hasClass('video')) ? a.find('img') : a.find('iframe'),
                oldW = a.width(),
                w = a.attr('data-width')*1,
                h = a.attr('data-height')*1;

            a.addClass('active');
            img.stop().animate({
                width:w,
                height:h,
                marginTop:(211-h)/2
            },500,'easeOutExpo');
            a.find('span').show().animate({
                opacity:1
            },400);
        };

        function collapse(prev) {
            var a = items.eq(prev),
                img = (!a.hasClass('video')) ? a.find('img') : a.find('iframe'),
                oldW = img.width(),
                oldH = img.height(),
                w = getWidth(a,211);

            a.css({zIndex:1});
            img.stop().animate({
                width:w,
                height:211,
                marginTop:0,
                marginLeft:0
            },500,'easeOutExpo',function(){
                a.css('z-index','');
                if (a.hasClass('video')) {
                    a.html(a.html());
                };
            });
            a.find('span').animate({
                opacity:0
            },400,function(){
                $(this).hide();
            });
            a.removeClass('active');

        };

        function setActive() {
            var a = items.eq(current),
                img = (!a.hasClass('video')) ? a.find('img') : a.find('iframe'),
                oldW = a.width(),
                w = a.attr('data-width')*1,
                h = a.attr('data-height')*1;

            img.css({
                width:w,
                height:h,
                marginTop:(211-h)/2
            });
            a.find('span').show();

            var windowWidth = $(window).width();
            windowWidth = (windowWidth>980)? windowWidth : 980;
            // 780(content width) + 130(.gallery__inner.active margin)
            innerLeft = parseInt((windowWidth - 910)/2);

            inner.css({
                marginLeft:innerLeft - a.position().left
            });

        };

        function setWidth() {
            var innerCount = items.length;
            var itemWidth = items.width();
            var innerWidth = itemWidth*innerCount + 100*innerCount;
            inner.width(innerWidth);
        };

        function getWidth(img,h) {
            var imgW = img.attr('data-width')*1,
                imgH = img.attr('data-height')*1;

            return parseInt(h/imgH * imgW);
        };
    });
});
