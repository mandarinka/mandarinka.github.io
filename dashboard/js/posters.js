'use strict';

(function () {
  var posters = document.querySelector('.js-posters');
  posters.addEventListener('click', function (event) {
    var target = event.target;
    var targetn = event;
    // console.log(target.tagName.toLowerCase());
    if (target.tagName.toLowerCase() !== 'img') return;

    initMobileNavigation(target);
  });
  function initMobileNavigation(node) {
    var _node$dataset = node.dataset,
        id = _node$dataset.id,
        type = _node$dataset.type;


    if (id) {
      if (type == 'megogo') {
        //console.log('showMegogoVideo');
        MobileNavigation.showMegogoVideo(id);
        return;
      }
      //console.log('showTVChannel');
      MobileNavigation.showTVChannel(id);
    }
  }
})();

$(document).ready(function () {
  if (typeof $.fn.slick != 'undefined') {
    $('.js-slider').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 2500
    });
  }
});