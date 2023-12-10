let input = document.querySelector(".search-input");
let button = document.querySelector(".search-button");

let apiKey = "at_tckY5QJwTTDNyya6qRVLW4Gm48H5u";

function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng);
}

var map = L.map("map", {
  zoomControl: false,
  attributionControl: false,
  icon: "./images/icon-location.svg",
});

var myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(successFunction);
// } else {
//   alert(
//     "It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it."
//   );
// }

function successFunction(link) {
  //   var lat = position.coords.latitude; // user real time location | we need the user's public ip address not the location
  //   var lng = position.coords.longitude; // user real time location | we need the user's public ip address not the location
  //   console.log(lat + " " + lng);
  //   map.setView([lat, lng], 13);
  //   var marker = L.marker([lat, lng]).addTo(map);

  //   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   }).addTo(map);

  //   user public ip address
  fetch(link)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      map.setView([data.location.lat, data.location.lng], 14);
      var marker = L.marker([data.location.lat, data.location.lng], {
        icon: myIcon,
      }).addTo(map);
      document.querySelector(".ip-address").innerText = data.ip;
      document.querySelector(
        ".location"
      ).innerText = `${data.location.city}, ${data.location.country}`;
      document.querySelector(".timezone").innerText =
        "UTC " + data.location.timezone;
      document.querySelector(".isp").innerText = data.isp;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    });
}
successFunction(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_7u2xnUrdmqB1mHQfDc3kdexFcgFyw"
);
button.onclick = (e) => {
  e.preventDefault();
  successFunction(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_7u2xnUrdmqB1mHQfDc3kdexFcgFyw&ipAddress=${input.value.trim()}&domain=${input.value.trim()}`
  );
  input.value = "";
};
