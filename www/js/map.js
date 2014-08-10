var map;
var wellington = new google.maps.LatLng(-41.2864603, 174.776236);
var tioTioRoad = new google.maps.LatLng(-41.3224820, 174.827880);

var endIcon = new google.maps.MarkerImage(
	'img/gmap_end_icon.png',
	new google.maps.Size(26,42),
	new google.maps.Point(0,0),
	new google.maps.Point(13,42)
);

var startIcon = new google.maps.MarkerImage(
	'img/gmap_start_icon.png',
	new google.maps.Size(26,42),
	new google.maps.Point(0,0),
	new google.maps.Point(13,42)
);

function createMarkers(coords, userLocation) {	
	// if we have a user location then we will route to Tio Tio Road
	// else we will just show Tio Tio Road location
	if (coords) {
		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
		var travel = {
			origin : userLocation,
			destination : tioTioRoad,
			travelMode : google.maps.DirectionsTravelMode.DRIVING
		};
		directionsDisplay.setMap(map);
		directionsService.route(
			travel,
			function (result, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
					// change start and end markers to different colour
					var leg = result.routes[ 0 ].legs[ 0 ];
					var start = new google.maps.Marker({
						position: userLocation,
						map: map,
						icon: startIcon,
					});
					var end = new google.maps.Marker({
						position: leg.end_location,
						map: map,
						icon: endIcon,
						title: 'Timea Toth - Make-up artist'
					});
				}
				else {
					console.log("Could not get directions");
				}
			}
		);
	}
	else {
		var marker = new google.maps.Marker({
			map: map,
			icon: endIcon,
			position: tioTioRoad,
			title: 'Timea Toth - Make-up artist'
		});
	}
}

function locationSuccess(position) {
	var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	createMarkers(true, location);	
}

function locationError(error) {
	// User didn't allow or something else went wrong, just show tio tio road
	createMarkers(false, tioTioRoad);
}

function initialise() {
	
	var mapOptions = {
		center: tioTioRoad,    
		zoom: 14,   
		scrollwheel: false,  
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles : [{featureType: 'all', stylers: [{saturation: -100}, {gamma: 0.0}]}]
	};
	
	var mapcanvas = document.getElementById('map-canvas');
	map = new google.maps.Map(mapcanvas,mapOptions);
	
	// Now check for geolocation support and call create map function
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
	}
	else {
		// geolocation is not available, again just show tio tio road
		createMarkers(false, tioTioRoad);
	}
	return;
}

window.onload = initialise;
