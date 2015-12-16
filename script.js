
// MAP DISPLAY ***********************
var map;
var infowindow;
function initMap() {
  var CodeFellows = {lat: 47.6235481, lng: -122.33621199999999};
  map = new google.maps.Map(document.getElementById('map'), {
    center: CodeFellows,
    zoom: 15
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

     //  var $search = $('#searchResults');
     //  // console.log('---', $search);
     // $search.append("<tr id='name'>")
     // $('#name').append('<td id="rest">');
     //  // var local = [],
     // for (var j= 0; j<results.length; j++) {
     //  $('.restaurant').append(results[i].name);
     // }
  results.forEach(function(result) {
        $('.restaurants').append(results[i].name);
      })
    $('#rest' + results[i + 1] + '').results[i].name;
  console.log(results[i].name);

      // results.forEach(function(result) {
      //   $('.restaurants').append(result.name[i]);
        // $('#rest1').append(result.name[0]);
        // console.log('---', results[i]);

     //      // $search.append.(<td>)(result.name)
     //  });

      // TODO: use the results information to populate form
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
//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//   });
// }
