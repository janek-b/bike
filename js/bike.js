var mapKey = require('../.env').mapKey;

function Bike() {
}

Bike.prototype.getStolenBikes = function (location, displayStolenBikes, locationObject, displayLocations) {
  $.get('http://bikeindex.org/api/v3/search?page=1&per_page=25&location='+location+'&distance=10&stolenness=proximity').then(function(response) {
    var output = [];
    response.bikes.forEach(function(bike) {
      var stolenBike = {};
      stolenBike["title"] = bike.title;
      stolenBike["serial"] = bike.serial;
      stolenBike["manufacturer"] = bike.manufacturer_name;
      stolenBike["location"] = bike.stolen_location;
      stolenBike["date"] = moment(bike.date_stolen, "X").format("MMMM DD YYYY");
      locationObject.addAddress(bike.stolen_location);
      output.push(stolenBike);
    })
    displayStolenBikes(output);
    displayLocations(locationObject);
  })
};

exports.bikeModule = Bike;
