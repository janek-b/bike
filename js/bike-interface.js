var Bike = require('../js/bike.js').bikeModule;
var Location = require('../js/location.js').locationModule;

var displayStolenBikes = function(bikes) {
  $("#bikeData").empty();
  bikes.forEach(function(bike) {
    $("#bikeData").append("<tr>" +
    "<td>"+bike["title"]+"</td>"+
    "<td>"+bike["serial"]+"</td>"+
    "<td>"+bike["manufacturer"]+"</td>"+
    "<td>"+bike["location"]+"</td>"+
    "<td>"+bike["date"]+"</td>"+
    "</tr>");
  });
}

var displayLocations = function(location) {
  var wait = setTimeout(function() {
    updateMap(location.addresses, location.center);
  }, 1000)
}

$(function() {
  var bikeObject = new Bike();
  var locationObject = new Location();
  $("#getBikesBtn").click(function() {
    var locationString = $("#location").val();
    locationObject.getLatLng(locationString);
    $("#location").val("");
    bikeObject.getStolenBikes(locationString, displayStolenBikes, locationObject, displayLocations);
  })
})
