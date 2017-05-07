$(".hideForAtime").click(function() {
    var el = $(this);
    el.prev().toggleClass("hide");
})

function initMap() {
    var position = { lat: 53.932761, lng: 27.433571 };
    var zoomValue = $(window).width()<400 ? 13:15; 

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomValue,
        center: position
    });
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
}

$("#copy").click(function() {
    alert("Ссылка скопирована!")
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(document.URL).select();
    document.execCommand("copy");
    $temp.remove();
})
