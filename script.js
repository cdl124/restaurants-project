
// MAP DISPLAY ***********************
var map;
var infowindow;
function initMap(maxPriceLevel, radius) {
  var CodeFellows = {lat: 47.6235481, lng: -122.33621199999999};
  map = new google.maps.Map(document.getElementById('map'), {
    center: CodeFellows,
    zoom: 16
  });
  var marker=new google.maps.Marker({
    position:CodeFellows,
    icon:'images/cf.png'
  });

  marker.setMap(map);
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: CodeFellows,
    radius: 500,
    types: ['restaurant', 'cafe','bakery', 'meal_takeaway', 'food', 'point_of_interest','bar'],
    openNow: true,
    maxPriceLevel: 1
    // Can add maxPrice: 1,2,3,etc. via the 'submit' event listener? MaxPriceLevel:1-4
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);

// BEGIN code that's gonna get replaced

  $('.restaurants').append('<tr><td>'+ (i + 1) + ' : ' +results[i].name + ' ' + results[i].vicinity + '</td></tr>');
    // $('.restaurants').append('<td>'+ results[i].vicinity +'</td></tr>');

// END code that's gonna get replaced
    }
  }
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    var nameLocation = place.name + ' ' +place.vicinity + " Rated" + place.rating;
    infowindow.setContent(nameLocation);
    // infowindow.setContent(place.vicinity);
    infowindow.open(map, this);
  });
}


document.getElementById('search'),addEventListener('click', function (event) {
var maxPriceLevel = $('input[name="maxPriceLevel"]:checked').val();
var radius = $('input[name="radius"]:checked').val();

  // var maxPriceLevel = event.target.maxPriceLevel.value;
  // var radius = event.target.radius.value;

 
initMap(maxPriceLevel, radius);
});
  // google.maps.event.addListener(button, 'click', function() {