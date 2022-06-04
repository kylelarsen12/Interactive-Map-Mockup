//Leaflet stuff
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

/*
-Need code for:
        -finding user location
        -taking user location and searching for nearby businesses
        -Add marker for user location
        -Add markers for businesses
        -Add popups when businesses are hovered over/clicked

        api key: fsq3XcDK8dkjWj4yZXVUYXClvuc0vwuw9oaPk6X3rbyf0/I=
*/
