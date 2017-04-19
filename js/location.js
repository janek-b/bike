var mapKey = require('../.env').mapKey;

function Location() {
  this.addresses = [];
  this.center;
}

Location.prototype.addAddress = function (address, displayLocations) {
  var self = this;
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+mapKey).then(function(response) {
    self.addresses.push(response.results[0].geometry.location);
    displayLocations(self);
  }).fail(function(error) {
    console.log(error.responseJSON.message);
  })
};

Location.prototype.getLatLng = function (address) {
  var self = this;
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+mapKey).then(function(response) {
    self.center = response.results[0].geometry.location;
  }).fail(function(error) {
    console.log(error.responseJSON.message);
  })
};

exports.locationModule = Location;
