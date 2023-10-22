// create the map
var map = L.map('map').setView([38.69705, -75.40481], 17);
		L.tileLayer('https://api.mapbox.com/styles/v1/awade/ciwfrwqxi005a2plkxlp57guc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXdhZGUiLCJhIjoiY2l3Zm40NG45MDBoaTJ0bGZtdm02M3hqYiJ9.dIN38TBNzm608XzgV8posA', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
		    minZoom: 3,
        maxZoom: 18,
		    //id: 'your.mapbox.project.id',
		    //accessToken: 'pk.eyJ1IjoiZmFya3RhbCIsImEiOiJjaXRvbXdjdHQwMDN3Mm9xcTRzNXUxNHN3In0.iBqoN-_dtyjDEK5E3gK6ZQ'
		}).addTo(map);

// Add icon
//var myIcon = L.divIcon({className: 'c-icon c-icon__red',iconSize: [30, 30],iconAnchor: [0, 0],popupAnchor: [15, 0]});

// ,{icon: myIcon}

// display markers
    var markers = [];
    var marker1 = L.marker([38.69705, -75.40481],{title:"marker_1"}).addTo(map).bindPopup("Art Display");
    markers.push(marker1);
    var marker2 = L.marker([38.6976, -75.406],{title:"marker_2"}).addTo(map).bindPopup("Human Resources");
    markers.push(marker2);
    var marker3 = L.marker([38.69709, -75.407],{title:"marker_3"}).addTo(map).bindPopup("Language Center");
    markers.push(marker3);

    console.log(markers);

// animate marker zoom and coordinates
map.on('popupopen', function(centerMarker) {
        var cM = map.project(centerMarker.popup._latlng);
        cM.y -= centerMarker.popup._container.clientHeight/2
        map.setView(map.unproject(cM),30, {animate: true});
    });

// open popup
function markerFunction(id){
    for (var i in markers){
        var markerID = markers[i].options.title;
      
      //console.log( markerID );
      //console.log(id);
        if (markerID == id){
            markers[i].openPopup();
            //console.log(markerID + id);
        };
    }
}
$("a").click(function(){
  markerFunction($(this)[0].id);
  $('a').removeClass("j-is-highlight");
  $(this).addClass("j-is-highlight");
});

// open sub menus
$('h2').click(function (e) {
  $(this).next( ".c-nav__sub").toggleClass('j-is-open');
  $(this).closest( ".c-nav__item").toggleClass('j-is-active');
});