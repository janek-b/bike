var Bike = require('../js/bike.js').bikeModule;
var Location = require('../js/location.js').locationModule;

var bikeObject = new Bike();

var displayStolenBikes = function(bikes) {
  $("#bikeData").empty();
  bikes.forEach(function(bike) {
    $("#bikeData").append("<tr>" +
    "<td>"+bike["title"]+"<span data-id='"+bike["id"]+"' class='label label-primary details pull-right'>Details</span></td>"+
    "<td>"+bike["serial"]+"</td>"+
    "<td>"+bike["manufacturer"]+"</td>"+
    "<td>"+bike["location"]+"</td>"+
    "<td>"+bike["date"]+"</td>"+
    "</tr>");
    $("#bikeData .details").last().click(function() {
      bikeObject.getBikeDetails($(this).attr("data-id"), displayModal)
    });
  });
  $("#tableSection").slideDown();
  resetBtn();
}



var displayModal = function(bikeDetails) {
  $("#bikeImg").html("<img src='"+bikeDetails.img+"'>");
  $("#bikeTitle").text(bikeDetails.title);
  $("#bikeDescription").text(bikeDetails.description);
  $("#bikeManufacturer").text(bikeDetails.manufacturer);
  $("#bikeModel").text(bikeDetails.model);
  $("#bikeYear").text(bikeDetails.year);
  $("#bikeColor").text(bikeDetails.color);
  $("#bikeSerial").text(bikeDetails.serial);
  $("#bikeLocation").text(bikeDetails.location);
  $("#bikeDate").text(bikeDetails.date);
  $("#detailsModal").modal();
}

var displayLocations = function(location) {
  // var wait = setTimeout(function() {
    updateMap(location);
  // }, 1000)
}

var resetBtn = function() {
  $("#nextPage").html('<span class="glyphicon glyphicon-menu-right"></span>');
  $("#previousPage").html('<span class="glyphicon glyphicon-menu-left"></span>');
  $("#getBikesBtn").html('<span class="glyphicon glyphicon-search"></span>');
}

$(function() {
  var count = 1;
  var locationObject = new Location();
  var locationString = "";
  $("#getBikesBtn").click(function() {
    $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    locationString = $("#location").val();
    locationObject.getLatLng(locationString);
    $("#location").val("");
    bikeObject.getStolenBikes(locationString, count, displayStolenBikes, locationObject, displayLocations);
  });

  $("#nextPage").click(function() {
    count ++;
    $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    bikeObject.getStolenBikes(locationString, count, displayStolenBikes, locationObject, displayLocations);

  })

  $("#previousPage").click(function() {
    if (count > 1) {
      count --;
      $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
      bikeObject.getStolenBikes(locationString, count, displayStolenBikes, locationObject, displayLocations);
    }
  })

  $("#collapseTable").click(function() {
    $("#tableSection").slideToggle();
  })
})
