var mapKey = require('../.env').mapKey;

function Bike() {
}

Bike.prototype.getStolenBikes = function (location, count, displayStolenBikes, locationObject, displayLocations) {
  $.get('http://bikeindex.org/api/v3/search?page=' + count+'&per_page=25&location='+location+'&distance=10&stolenness=proximity').then(function(response) {
    var output = [];
    response.bikes.forEach(function(bike) {
      var stolenBike = {};
      stolenBike["title"] = bike.title;
      stolenBike["id"] = bike.id;
      stolenBike["serial"] = bike.serial;
      stolenBike["manufacturer"] = bike.manufacturer_name;
      stolenBike["location"] = bike.stolen_location;
      stolenBike["date"] = moment(bike.date_stolen, "X").format("MMMM DD YYYY");
      locationObject.addAddress(bike.stolen_location, displayLocations);
      output.push(stolenBike);
    })
    displayStolenBikes(output);
    // displayLocations(locationObject);
  })
};

Bike.prototype.getBikeDetails = function (id, displayModal) {
  $.get('http://bikeindex.org/api/v3/bikes/'+id).then(function(response) {
    var bikeDetails = {};
    bikeDetails["title"] = response.bike.title;
    bikeDetails["serial"] = response.bike.serial;
    bikeDetails["manufacturer"] = response.bike.manufacturer_name;
    bikeDetails["model"] = response.bike.frame_model;
    bikeDetails["year"] = response.bike.year;
    bikeDetails["color"] = response.bike.frame_colors;
    bikeDetails["img"] = response.bike.large_img;
    bikeDetails["location"] = response.bike.stolen_location;
    bikeDetails["date"] = moment(response.bike.date_stolen, "X").format("MMMM DD YYYY");
    bikeDetails["description"] = response.bike.description;

    displayModal(bikeDetails);
  })
};

exports.bikeModule = Bike;
