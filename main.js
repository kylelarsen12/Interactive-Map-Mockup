/*Leaflet stuff
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);
*/

/*
-Need code for:
        -finding user location
        -taking user location and searching for nearby businesses
        -Add marker for user location
        -Add markers for businesses
        -Add popups when businesses are hovered over/clicked

        api key: fsq3XcDK8dkjWj4yZXVUYXClvuc0vwuw9oaPk6X3rbyf0/I=


*/

//create map object
let myMap = {
  coords: [],
  localBusinesses: [],
  map: {},
  markers: {},

  buildMap() {
    this.map = L.map("map", {
      center: this.coords,
      zoom: 14,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);

    let userMarker = L.marker(this.coords);
    userMarker.addTo(this.map).bindPopup("<p>This is you</p>").openPopup();
  },
};

//Get user location
async function getCoords() {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return [pos.coords.latitude, pos.coords.longitude];
}

//Build map
window.onload = async () => {
  let userCoords = await getCoords();
  myMap.coords = userCoords;
  myMap.buildMap();
};

//Get user selection for business type and add markers
let userChoice = document.getElementById("options").value;
console.log(userChoice);
