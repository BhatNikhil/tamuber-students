
var directionsService;
var map;
var infowindow;
var marker;
var showDirections = true;

function initMap() {
  // Initialize Direction Services  
  directionsService = new google.maps.DirectionsService;

  // Create a map.
  map = new google.maps.Map(document.getElementById('mapid'), {
    zoom: 15,
    center: {lat: 30.6185, lng: -96.3365},
    mapTypeControl: false
  });

}

function initMapWithMarker(lat, lng, startPoint) {
  // var mapEl = $('#map');
  // var optimized = mapEl.data('test-env'); //so that marker elements show up for testing
  //alert(optimized);
  var myLatLng = {lat: lat, lng: lng};
  map = new google.maps.Map(document.getElementById('mapid'), {
    zoom: 16,
    center: {lat: lat, lng: lng},
    mapTypeControl: false
  });
  
  
  
  var address = ""
  //get human-readable address from given coordinates
  $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyAD5o_wun4okt9SRxSFULafNoDBGGoq4Ac", function(data, status){
      var contentString = '<h3>'+startPoint+"</h3>"
      if(data.status == "OK") {
        address = data.results[0].formatted_address
        contentString = contentString + "<p>Closest address: "+address+"</p>"
      }
      
      infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 250
      });
        
      marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: startPoint,
        optimized: false
      });
      //alert(marker.optimized);
      if (!marker.optimized) { //make markers show up as dom elements so we can test them with cucumber
        var myoverlay = new google.maps.OverlayView();

        myoverlay.draw = function () {
          this.getPanes().markerLayer.id = 'markers';
        };
  
        myoverlay.setMap(map);
      }
     // marker.MarkerOptions.optimized = false;
      
      marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
     
      google.maps.event.trigger(marker, 'click', {
        latLng: new google.maps.LatLng(0, 0)
      });
  });
    
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  directionsDisplay.setMap(map);

}
function removeDirections() {
  directionsDisplay.setMap(null);
}
function calcRoute(lat, lng) {
  if (showDirections == false) {
    showDirections = !showDirections;
    directionsDisplay.setMap(null);
    return;
  }
  
 
  var start = {
    lat: 0,
    lng: 0
  };
  
  if (navigator.geolocation) {
    directionsDisplay.setMap(map)
    navigator.geolocation.getCurrentPosition(function(position) {
      start = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        
        var end = {
            lat: lat,
            lng: lng
        };

        var request = {
          origin: start,
          destination: end,
          travelMode: 'WALKING'
        };
        directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(result);
            infowindow.close()
          }
        });
        
      }, function() {
            alert('Directions to pickup point not available');
          });
  } 
  else {
    alert("Directions to pickup point not available")
  }
  showDirections = !showDirections;
  
}


function calculateAndDisplayRoute(request) {
  
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  var startPoint;
  var endPoint;

	var service_callback = function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	}

  //var jsonData = JSON.parse(request);
	for (var i = 0, parts = [], max = 22; i < request.length; i = i+max) {
		parts.push(request.slice(i, i + max + 1));
		//console.log(parts);
	}
	
  for (var i = 0; i < parts.length; i++) {
		//	var counter = parts[i];
		/*if (i === 0) {
			startPoint = new google.maps.LatLng(counter.lat, counter.lng);
			continue;
		}
		if (i === parts.length - 1) {
			endPoint = new google.maps.LatLng(counter.lat, counter.lng);
			continue;
		}
		waypts.push({
			location: new google.maps.LatLng(counter.lat, counter.lng),
			stopover: false
		});*/
		var waypts = [];
		for (var j = 0; j < parts[i].length - 1; j++) {
			waypts.push({
				location : new google.maps.LatLng(parts[i][j].lat, parts[i][j].lng),
				stopover : false
			});
			//console.log(parts[i][j].lng);
		}
		console.log(waypts);
		var service_opts = {
			origin: new google.maps.LatLng(parts[i][0].lat, parts[i][0].lng),
			destination: new google.maps.LatLng(parts[i][parts[i].length-1].lat, parts[i][parts[i].length-1].lng),
			waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: 'BICYCLING'
		};
		directionsService.route(service_opts, service_callback);
	}
}

