var mapKey = require('../.env').mapKey;

function Location() {
  this.center;
}

Location.prototype.codeAddress = function (address) {
  return $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+mapKey).then(function(response) {
    return response.results[0].geometry.location;
  });
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
