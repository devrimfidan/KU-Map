// Define map
const myMap = L.map('map');

// Define icon
const coffeeCup = L.icon({
  iconUrl: 'https://taniarascia.github.io/coffee/images/coffee.png',
  shadowUrl: '',
  iconSize: [35, 65]
});

// Define basemap
const myBasemap = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
  maxZoom: 17,
    attribution:
      '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });

// Add basemap to map id
myBasemap.addTo(myMap);

// Set center of the map
myMap.setView([41.2041, 29.0743], 16);

// Make an XMLHttpRequest to the JSON data
const request = new XMLHttpRequest();
request.open('GET', 'https://devrimfidan.github.io/coffee/js/map.json', true);

request.onload = function () {
  // begin accessing JSON data here
  const data = JSON.parse(this.response);

  // Reduce neighborhoods down to how many they are, and count them
  const neighborhoodCount = data.cafes.reduce((sums, cafe) => {
    sums[cafe.neighborhood] = (sums[cafe.neighborhood] || 0) + 1;
    return sums;
  }, {});

  // Create a sidebar
  const sidebar = document.getElementById('neighborhoods');
  const h3 = document.createElement("h3");
  h3.innerHTML = "Neighborhood Count";
  sidebar.appendChild(h3);

  // Print all neighborhoods in sidebar
  for (let neighborhood in neighborhoodCount) {
    const p = document.createElement("p");
    p.innerHTML = `<b>${neighborhood}</b> : ${neighborhoodCount[neighborhood]}`;
    sidebar.appendChild(p);
  }

  // Print cafe markers
  const cafes = data.cafes.map(cafe => {
    console.log(cafe.name);

    L.marker([cafe.lat, cafe.long], {
      icon: coffeeCup
    }).bindPopup(`
        <h2>${cafe.name}</h2>
        <p><b>Neighborhood:</b> ${cafe.neighborhood}</p>
        <p><b>Ambiance:</b> ${cafe.ambiance}</p>
        <p><b>Flavor:</b> ${cafe.flavor}</p>
        <p><b>Comments:</b> ${cafe.comments}</p>
    `).openPopup().addTo(myMap);
  });
}

request.send();
