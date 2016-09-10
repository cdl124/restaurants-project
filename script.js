/*global google*/
// MAP DISPLAY ***********************
var map;
var infowindow;
function initMap(maxPriceLevel, radius, zoom, openNow) {
  var CodeFellows = {lat: 47.618217, lng: -122.351832};
  map = new google.maps.Map(document.getElementById('map'), {
    center: CodeFellows,
    zoom: 16
  });
  var marker=new google.maps.Marker({
    position:CodeFellows,
    icon:'./lib/images/cf.png'
  });

  marker.setMap(map);
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: CodeFellows,
    radius: 300,
    types: ['restaurant', 'cafe','bakery', 'meal_takeaway', 'food', 'point_of_interest','bar'],
    openNow: true,
    maxPriceLevel: 4
    // Can add maxPrice: 1,2,3,etc. via the 'submit' event listener? MaxPriceLevel:1-4
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);


      $('.restaurants').append('<tr><td>'+ (i + 1) + ' : ' +results[i].name + ' ' + results[i].vicinity + '</td></tr>');
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
    var nameLocation = place.name + ' ' +place.vicinity + 'Rated' + place.rating;
    infowindow.setContent(nameLocation);
    // infowindow.setContent(place.vicinity);
    infowindow.open(map, this);
  });
}

document.getElementById('search'),addEventListener('submit', function(event){
  var maxPriceLevel = $('input[name="maxPriceLevel"]:checked').val();
  var radius = $('input[name="radius"]:checked').val();
  var zoom = $('input[name="zoom"]:checked').val();
  var openNow = $('input[name="openNow"]:checked').val();

  initMap(maxPriceLevel, radius, zoom, openNow);
});

// Rating
var Rater = {
  r1:0,
  r2:0,
  r3:0,
  r4:0,
  r5:0,
  totalVote:0,
  avg:0
};

// Avg Rating Function
var avgRating = function(){
  var weightedSum = (Rater.r1*1)+(Rater.r2*2)+(Rater.r3*3)+(Rater.r4*4)+(Rater.r5*5);
  var weightedAvg = weightedSum/(Rater.totalVote);
  Rater.avg = weightedAvg;
};

// Rating: Mouse over/out events
var berryBlank = '../lib/images/strawberry.png';
var berryHover = '../lib/images/cf.png';

$('#r1').mouseover(function(){
  $('#r1').attr('src', berryHover);
}).mouseout(function(){
  $('#r1').attr('src',berryBlank);
});


$('#r2').mouseover(function(){
  $('#r1').attr('src', berryHover);
  $('#r2').attr('src', berryHover);
}).mouseout(function(){
  $('#r1').attr('src', berryBlank);
  $('#r2').attr('src', berryBlank);
});

$('#r3').mouseover(function(){
  $('#r1').attr('src', berryHover);
  $('#r2').attr('src', berryHover);
  $('#r3').attr('src', berryHover);
}).mouseout(function(){
  $('#r1').attr('src', berryBlank);
  $('#r2').attr('src', berryBlank);
  $('#r3').attr('src', berryBlank);
});


$('#r4').mouseover(function(){
  $('#r1').attr('src', berryHover);
  $('#r2').attr('src', berryHover);
  $('#r3').attr('src', berryHover);
  $('#r4').attr('src', berryHover);
}).mouseout(function(){
  $('#r1').attr('src', berryBlank);
  $('#r2').attr('src', berryBlank);
  $('#r3').attr('src', berryBlank);
  $('#r4').attr('src', berryBlank);
});


$('#r5').mouseover(function(){
  $('#r1').attr('src', berryHover);
  $('#r2').attr('src', berryHover);
  $('#r3').attr('src', berryHover);
  $('#r4').attr('src', berryHover);
  $('#r5').attr('src', berryHover);
}).mouseout(function(){
  $('#r1').attr('src', berryBlank);
  $('#r2').attr('src', berryBlank);
  $('#r3').attr('src', berryBlank);
  $('#r4').attr('src', berryBlank);
  $('#r5').attr('src', berryBlank);
});

//rate choice event
function rateChoice() {
  var avgRate = Math.floor(Rater.avg);
  $('.rateTitle').remove();
  $('#rateDiv').html('<h3 class="rateTitle">You rate this restaurant '+avgRate+'/5</h3>');
}

// Rating: Click Events
$('#r1').on('click', function(){
  Rater.r1++;
  Rater.totalVote++;
  avgRating();
  console.log(Rater);
  rateChoice();
});

$('#r2').on('click', function(){
  Rater.r2++;
  Rater.totalVote++;
  avgRating();
  console.log(Rater);
  rateChoice();
});

$('#r3').on('click', function(){
  Rater.r3++;
  Rater.totalVote++;
  avgRating();
  console.log(Rater);
  rateChoice();
});

$('#r4').on('click', function(){
  Rater.r4++;
  Rater.totalVote++;
  avgRating();
  console.log(Rater);
  rateChoice();
});

$('#r5').on('click', function(){
  Rater.r5++;
  Rater.totalVote++;
  avgRating();
  console.log(Rater);
  rateChoice();
});
