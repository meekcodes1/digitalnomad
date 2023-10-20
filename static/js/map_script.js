let CenterCoords = [26.8173686,25.5869105]; //Egypt
let mapZoomLevel = 3;
let myMap;

// Create the createMap function.
function createMap(CityData) {
// Create the tile layer that will be the background of our map.
let backgroundMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// Create a baseMaps object to hold the map layer.
let BaseMaps = {
  "Street Map": backgroundMap
};
// Create an overlayMaps object to hold the Earthquakes layer.
let overlayMaps = {
  "Cities": CityData
};
// Create the map object with options.
myMap = L.map("map", {
    center: CenterCoords,
    zoom: mapZoomLevel,
    layers: [backgroundMap, CityData]
})
// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(BaseMaps, overlayMaps).addTo(myMap);
createLegend();
}

function createLegend() {
  // Create a legend to display information about Earthquake depths.
      let legend = L.control({
        position: "bottomright"
      });
  
      legend.onAdd = function () {
        let div = L.DomUtil.create("div", "legend");
        div.innerHTML = [
          "<h3>Legend" + "</h3>",
          "<table>",
          "<th>" + "Color" + "</th>",
          "<th>" + "Overall Score" + "</th>",
          "<tr>",
          "<td class='lessthan25'>" + "</td>",
          "<td style='text-align: center;'>" +"< 2.5" + "</td>",
          "</tr>",
          "<tr>",
          "<td class='lessthan35'>" + "</td>",
          "<td style='text-align: center;'>" +"2.5 - 3.5" + "</td>",
          "</tr>",
          "<tr>",
          "<td class='greaterthan35'>" + "</td>",
          "<td style='text-align: center;'>" +"3.5 +" + "</td>",
          "</tr>",
          "</table>"
        ].join("");
        return div;
      };
    
  // Add the info legend to the map.
      legend.addTo(myMap);
    }

// Create the createMarkers function.
function createMarkers(response) {
  let All_CityMarkers = [];

  // Loop through the response data and create a marker for each city.
  response.forEach(city => {
    let longitude = city.longitude;
    let latitude = city.latitude;
    let city_name = city.name;
    let country_name = city.country
    let overall_score = Number(city.overall_score).toFixed(2)
    let internet_speed = city.internet_speed;
    let air_quality_score = Number(city.air_quality_now_score).toFixed(2)
    let safety_level_score = Number(city.safety_level).toFixed(2)
    let leisure_quality = Number(city.leisure_quality).toFixed(2)
    let cost_for_nomad = city.cost_for_nomad_in_usd
    let city_url = 'https://en.wikipedia.org/wiki/' + city.name

    let color = "";
    if (overall_score < 2.5) {
      color = "rgb(255,0,0)";
    }
    else if (overall_score < 3.5) {
      color = "rgb(255,255,0)";
    }
    else {
      color = "rgb(0,255,0)";
    }

    let CityMarker = L.circle([latitude, longitude], {
      fillOpacity: 0.6,
      color: 'black',
      weight: 1,
      fillColor: color,
      radius: 50000
    }).bindPopup(
      // Populate the popup content as needed
      // You can access city properties like: city.propertyName
      "<b>City Name: </b>" + city_name
      + "<br>" +
      "<b>Country: </b>" + country_name
      + "<br>" +
      "<b>Internet Speed: </b>" + internet_speed + " MB/s"
      + "<br>" +
      "<b>Air Quality Score: </b>" + air_quality_score
      + "<br>" +
      "<b>Safety Level Score: </b>" + safety_level_score
      + "<br>" +
      "<b>Leisure Quality: </b>" + leisure_quality
      + "<br>" +
      "<b>Cost for Nomad: </b>" + cost_for_nomad + " USD"
      + "<br>" +
      "<br>" +
      "<a href=" + city_url + " target=_blank>" + "City Wikipedia page" + "</a>"
    );

    All_CityMarkers.push(CityMarker);
  });

  // Create the map with the markers.
  createMap(L.layerGroup(All_CityMarkers));
}

d3.json('http://localhost:5000/get_data').then(createMarkers);