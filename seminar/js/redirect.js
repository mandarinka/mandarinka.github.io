$(document).ready(function () {

var windowWidth = $(window).width();

if (windowWidth < 700) {
    window.location.href = "../../seminar-markup/src/index-mobile.html";
};

$(window).resize(function () {
    windowWidth = $(window).width();
    if (windowWidth < 700) {
        window.location.href = "../../seminar-markup/src/index-mobile.html";
    };
});

});