var Bike = require('../js/bike.js').bikeModule;
var Location = require('../js/location.js').locationModule;

var bikeObject = new Bike();

var displayStolenBikes = function(bikes) {
  $("#bikeData").empty();
  bikes.forEach(function(bike) {
    $("#bikeData").append("<tr>" +
    "<td>"+bike["title"]+"<button type='button' class='btn btn-xs btn-primary pull-right' data-toggle='modal' data-target='#detailsModal' data-id='"+bike["id"]+"'>Get Details</button></td>"+
    "<td>"+bike["serial"]+"</td>"+
    "<td>"+bike["manufacturer"]+"</td>"+
    "<td>"+bike["location"]+"</td>"+
    "<td>"+bike["date"]+"</td>"+
    "</tr>");
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
}

var resetBtn = function() {
  $("#nextPage").html('<span class="glyphicon glyphicon-menu-right"></span>');
  $("#previousPage").html('<span class="glyphicon glyphicon-menu-left"></span>');
  $("#getBikesBtn").html('<span class="glyphicon glyphicon-search"></span>');
}

var displayChart = function(bikeData) {
  Highcharts.chart('chart', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Bike thefts per day'
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Number of Bike thefts'
      },
      min: 0
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'Bike Thefts',
      data: bikeData
    }]
  });
}

$(function() {
  var count = 1;
  var locationObject = new Location();
  var locationString = "";

  var update = function() {
    bikeObject.getStolenBikes(locationString, count).done(function(output) {
      var locations = output.map(location => location.location).map(locationObject.codeAddress);
      Promise.all(locations).then(addresses => {
        var zipped = output.map((bike, i) => [bike.id, addresses[i]]);
        updateMap(zipped, locationObject.center);
      });
      displayStolenBikes(output);
    });
    bikeObject.getStolenDate(locationString).done(function(output){
      var test = Object.entries(output)
      displayChart(test);
    })
  }

  $("#getBikesBtn").click(function() {
    $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    locationString = $("#location").val();
    locationObject.getLatLng(locationString);
    $("#location").val("");
    update();
  });

  $("#nextPage").click(function() {
    count ++;
    $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
    update();
  })

  $("#previousPage").click(function() {
    if (count > 1) {
      count --;
      $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
      update();
    }
  })

  $("#collapseTable").click(function() {
    $("#tableSection").slideToggle();
  })

  $("#detailsModal").on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var bikeId = button.data('id');
    bikeObject.getBikeDetails(bikeId).done(function(details) {
      displayModal(details);
    })
  })
})
