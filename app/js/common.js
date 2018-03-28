function initMap() {
    var elem = document.getElementsByClassName('map')[0];
    var options = {
        zoom: 17,
        center: {lat: 45.500753, lng: -122.670792}
    };
    var Mymap = new google.maps.Map(elem, options);
}

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        autoplay: true,
        loop: true,
        items: 4,
        stopOnHover : true,
        smartSpeed:2000,
        autoplayTimeout:4000,
        margin: 30,
        responsive :{
            0 : {
                items: 1,
            },
            992 : {
                items: 2,
            },
            1200 : {
                items: 4,
            }
        }
    });
});

$(".owl-carousel .item").hover(function(){
    $(".btn-hover", this).removeClass("hidden");
    $(".btn-hover", this).addClass("visible");
},function(){
    $(".btn-hover", this).removeClass("visible");
    $(".btn-hover", this).addClass("hidden");
 });
