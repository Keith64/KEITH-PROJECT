//set map options
var mylatlng = {lat: 39.84418, lng: -100.92688};
var mapOptions = {
    center: mylatlng,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
//create Map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
//creat a Directions service object
var directionsService = new google.maps.DirectionsService();

//DirectionsRenderer object
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the directionsRenderer to the map
 directionsDisplay.setMap(map);

 //function
 function calcRoute() {
     var request = {
         origin: document.getElementById("from").Value,
         destination: document.getElementById("to").Value,
         travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, AND TRANSIT
         unitSystem: google.maps.UnitsSystem.IMPERIAL
     }
     //Pass the request to the route method
     directionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
           //get distance and time
           const output = document.querySelector('#output');
           output.innerHTML = "<div class='alert-info'> From: " + document.getElementById("from").value + " .<br />To: " + document.getElementById("to").value + " .<br /> Driving distance <i class='fas fa-road'></i>:" + result.routes[0].legs[0].distance.text + " .<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + " . </div>";

           //display the route
           directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({routes: []});
            //center map in America
            map.setCenter(mylatlng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance. </div>";
        }
     });
     

 }
 // create 
 var options = {
     types: ['(cities)']
 }
 var input1 = document.getElementById('from');
 var autocomplete1 = new google.maps.places.Autocomplete(input1, options)

 var input2 = document.getElementById('to');
 var autocomplete2 = new google.maps.places.Autocomplete(input2, options)
