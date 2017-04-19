var mapKey = require('../.env').mapKey;

$(function() {
  $.getScript("http://maps.google.com/maps/api/js?key="+mapKey);
  $.getScript("https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js");
  $('#locate').click(locateUser);
  var wait = setTimeout(function() {
    initMap();
  }, 100);

});

function locateUser() {
  if (navigator.geolocation) {
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
  } else {
    alert("Your browser doesn't support the Geolocation API");
  }
}

function geolocationSuccess(position) {
  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom: 16,
    center: userLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
}

function geolocationError(positionError) {
  alert(positionError);
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 45.5230622, lng: -122.6764816}
  });
}

function updateMap(locations) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: locations.center
  });

  var markers = locations.addresses.map(function(location) {
    return new google.maps.Marker({
      position: location
    });
  });

  var marketCluster = new MarkerClusterer(map, markers,
   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}
