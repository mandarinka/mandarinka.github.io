/* Yandex Map */


/*
не используем, т.к. инициализация происходит при подгрузке api
параметр &onload=init
*/
/*
ymaps.ready(init);
*/
var myMap, 
    myPlacemark;

function init(){ 
    myMap = new ymaps.Map ("map-canvas", {
        center: [51.52916379, 46.00267150],
        zoom: 15,
        behaviors: ["default"],
        type: 'yandex#map'
    }); 
    myMap.behaviors.enable("ruler");
    
    myPlacemark = new ymaps.Placemark([51.52916379, 46.00267150], {
        hintContent: 'ООО «Инфо-Эксперт»',
        balloonContent: 'ООО «Инфо-Эксперт»'
    });
    
    myMap.geoObjects.add(myPlacemark);

    myMap.controls.add("mapTools")
        .add("zoomControl")
        .add("typeSelector");
}

/* end Yandex map */