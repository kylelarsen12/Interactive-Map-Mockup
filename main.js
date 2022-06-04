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

    //user location map marker
    let userMarker = L.marker(this.coords);
    userMarker
      .addTo(this.map)
      .bindPopup("<p><strong>Your Location</strong></p>")
      .openPopup();
  },

  //markers for businesses
  addBusinessMarkers() {
    for (var i = 0; i < this.businesses.length; i++) {
      this.markers = L.marker([this.businesses[i].lat, this.businesses[i].long])
        .bindPopup(`<p>${this.businesses[i].name}</p>`)
        .addTo(this.map);
    }
  },
};

//use foursquare places api to get local data
async function getFoursquare(userChoice) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3XcDK8dkjWj4yZXVUYXClvuc0vwuw9oaPk6X3rbyf0/I=",
    },
  };
  let numResults = 5;
  let latitude = myMap.coords[0];
  let longitude = myMap.coords[1];
  let response = await fetch(
    `https://api.foursquare.com/v3/places/search?&query=${userChoice}&limit=${numResults}&ll=${latitude}%2C${longitude}`,
    options
  );
  let data = await response.text();
  let parsedData = JSON.parse(data);
  let businesses = parsedData.results;
  return businesses;
}

//Take data from foursquare array
function getBusinessData(data) {
  let localBusinesses = data.map((element) => {
    let location = {
      name: element.name,
      lat: element.geocodes.main.latitude,
      long: element.geocodes.main.longitude,
    };
    return location;
  });
  return localBusinesses;
}

//Get user location
async function getCoords() {
  let position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return [position.coords.latitude, position.coords.longitude];
}

//Build map
window.onload = async () => {
  let userCoords = await getCoords();
  myMap.coords = userCoords;
  myMap.buildMap();
};

//take data from submit button and create map markers with it
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();
  let userChoice = document.getElementById("options").value;
  let locationType = await getFoursquare(userChoice);
  myMap.businesses = getBusinessData(locationType);
  myMap.addBusinessMarkers();
});
