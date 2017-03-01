// Set markers image

var defaultIcon = 'images/map/marker2.png',
    newIcon = 'images/map/marker3.png',
    resaleIcon = 'images/map/marker4.png',
    commercialIcon = 'images/map/marker2.png',
    activeIcon = 'images/map/marker1.png';

// Set places

var places = [
    {
        photo: "images/map/photo-marker1.jpg",
        title : "Элитый комплекс «Алые паруса 1»", 
        address: "Мельничная улица, д. 14 А",
        icon_type: newIcon,
        lat: 51.5623565969923, 
        lng: 45.999367624511706
    },
    {
        photo: "images/map/photo-marker2.jpg",
        title : "Близнецы на блинова", 
        address: "Ул. Блинова, д. 17",
        icon_type: newIcon,
        lat: 51.5314951, 
        lng: 46.060134800000014
    },
    {
        photo: "images/map/photo-marker3.jpg",
        title : "Элитый комплекс «Алые паруса 2»", 
        address: "Ул. Вавилова, д. 50",
        icon_type: resaleIcon,
        lat: 51.536483005565906, 
        lng: 46.004908195678695
    },
    {
        photo: "images/map/photo-marker1.jpg",
        title : "Элитый комплекс «Алые паруса 3»", 
        address: "Ул. Мичурина, д. 62",
        icon_type: resaleIcon,
        lat: 51.52753962409535, 
        lng: 46.01919900531004
    },
    {
        photo: "images/map/photo-marker2.jpg",
        title : "Элитый комплекс «Алые паруса 4»", 
        address: "Ул. Рахова, д. 195",
        icon_type: commercialIcon,
        lat: 51.543716515195214, 
        lng: 46.021387687866195
    },
    {
        photo: "images/map/photo-marker3.jpg",
        title : "Элитый комплекс «Алые паруса 5»", 
        address: "Шелковичная улица, д. 128",
        icon_type: commercialIcon,
        lat: 51.538378242856645, 
        lng: 45.98276387805174
    }
];


var map,
    html = null,
    infoWindow = null,
    arrMarkers = [];


function mapInit(){

    var centerCoord = new google.maps.LatLng(51.533333, 46.016666999999984); 
    var mapOptions = {
        zoom: 12,
        center: centerCoord,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    google.maps.event.addListener(map, "click", function () {

            infoWindow.close();

            for (var i=0; i<arrMarkers.length; i++) {

               arrMarkers[i].setIcon(arrMarkers[i].myDefaultIcon);

            };

    });

    // Set markers
    setMarkers(map, places);

    // Custom infoWindow
    infoWindow = new InfoBubble({
        map: map,
        content: html,
        position: new google.maps.LatLng(-35, 151),
        shadowStyle: 0,
        padding: 0,
        backgroundColor: '#fff',
        borderRadius: 0,
        minHeight: 255, 
        maxHeight: 255,
        minWidth: 273,
        maxWidth: 273,
        arrowSize: 13,
        borderWidth: 3,
        borderColor: '#21B1AF',
        disableAutoPan: false,
        hideCloseButton: true,
        arrowPosition: 49,
        backgroundClassName: 'marker-bubble',
        arrowStyle: 0,
        enableEventPropagation: true
      });

// open .modal-layout

    google.maps.event.addListener(infoWindow, 'domready', function() {
        $('.js-modal-open').click(function () {
            $('body').find('.modal-layout').removeClass('g-hidden');
            return false;
        });
    });
};


function setMarkers(map, markers) {

    for (var i = 0; i < markers.length; i++) {

        var places = markers[i];

        var placesLatLng = new google.maps.LatLng(places.lat, places.lng);

        var markerCallback = "<a href=\"javascript:void(0);\" class=\"callback marker__callback js-modal-open\"></a>",
            markerPhoto = "<a href=\"object.html\"><img src=\"" + places.photo + "\" alt=\""+ places.title +"\" class=\"marker__photo\"></a>",
            markerTitle = "<p class=\"marker__title\"><a href=\"object.html\"><span>"+ places.title +"</span></a></p>",
            markerText = "<p class=\"marker__address\">"+ places.address +"</p>",
            markerHtml = markerCallback + markerPhoto + markerTitle + markerText;

        var marker = new google.maps.Marker({
            position: placesLatLng,
            map: map,
            title: places.title,
            icon: places.icon_type,
            html: markerHtml,
            myDefaultIcon: places.icon_type
        });

        google.maps.event.addListener(marker, "click", function () {

            for (var i=0; i<arrMarkers.length; i++) {

               arrMarkers[i].setIcon(arrMarkers[i].myDefaultIcon);

            };

            this.setIcon(activeIcon);
            infoWindow.setContent(this.html);
            infoWindow.open(map, this);

        });

        arrMarkers.push(marker);

    };

};