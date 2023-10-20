let data; // Declare the data variable in a broader scope

// Fetch data from the Flask API
fetch('http://localhost:5000/get_data')
  .then(response => response.json())
  .then(receivedData => {
    // Assign the received data to the global data variable
    data = receivedData;
    // Handle the data received from the Flask API
    console.log(data);
    // Populate the dropdown with the data and initialize
    populateDropdown(data);
    populateMap(data);
    barMap(data);
    make_plot(data);
    init();
  })
  .catch(error => {
    console.error('Error:', error);
  });

  function barMap(chart) {
    let labels2 = ['Ericeira', 'Battle-Creek', 'Houston', 'Tucson', 'Los-Angeles', 'Lubbock'];
    let data2 = [96, 70, 69, 67, 66, 64];
    let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF', '#AC5353', '#CFD4D8'];
    let myChart2 = document.getElementById("myChart2").getContext('2d');
    let chart2 = new Chart(myChart2, {
        type: 'bar',
        data: {
            labels: labels2,
            datasets: [{
                data: data2,
                backgroundColor: colors2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Mbps'
                    }
                }
            },
            plugins: {
                title: {
                    text: "Top 6 cities by Internet Speed",
                    display: true
                },
                legend: {
                  display: false
              }}
        }
    });
}

  // Plotly Map
  function populateMap(input) {
  
    dict = {};
  
    // For each row, iterate over all of the rows (i by j) to average the internet speed by country
    for(let i = 0; i < input.length; i++) {
      sumCountry = 0;
      countryCount = 0;

      for(let j = 0; j < input.length; j++) {
        if(input[i]['country'] == input[j]['country']) {
          sumCountry = sumCountry + input[j]['internet_speed'];
          countryCount = countryCount + 1;
        }
      }
      dict[input[i]['country']] = Math.round((sumCountry / countryCount)*100)/100;
    }
  
    // heatmap data
    let data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: Object.keys(dict),
        z: Object.values(dict),
        colorscale: [
          [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
          [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
          [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']
        ],
        colorbar: {
          title: 'Mbps',
          thickness: 20},
        autocolorscale: false,
        reversescale: true
    }];
  
    // heatmap layout
    let layout = {
      title: 'Average Internet Speed By Country (Mbps)',
      autosize: false,
      width: 1000,
      height: 600,
      geo: {
          projection: {
              type: 'robinson'
          }
      }
    };
    // Plot the results
    Plotly.newPlot("heatmap", data, layout, {showLink: false});
    };

  function make_plot(data){
      //scatter plot
          var scatter_plot = [{
              x: data.map(row => row.cost_for_nomad_in_usd),
              y: data.map(row => row.region),
              mode: 'markers+text',
              marker: {
                  size: 10,
              },
              type: 'scatter',
              name: "Digital Nomads"
          }];
          var layout = {
              title: 'Cost for Digital Nomads Based on Regions',
              xaxis: {title: "Cost(USD)"},
              yaxis: {automargin: true}
          };
          Plotly.newPlot('plot',scatter_plot,layout);
    };

function populateDropdown(data) {
  data.sort((a, b) => a.name.localeCompare(b.name));
  let dropdown = d3.select("#selDataset");
  dropdown.html("");
  data.forEach(function (dataObject) {
    // Concatenate 'name' and 'country' for the option values
    dropdown.append("option").text(dataObject.name + ", " + dataObject.country).property("value", dataObject.name + ", " + dataObject.country);
  });
}

function optionChanged(selectedValue) {
  console.log("Selected value: " + selectedValue);
  update_MetaData(selectedValue);
}

function init() {
  if (data && data.length > 0) {
    optionChanged(data[0].name + ", " + data[0].country);
  }
}

function update_MetaData(selectedValue) {
  let selectedSample = data.find(sample => sample.name + ", " + sample.country === selectedValue);
  let MetadataDiv = d3.select("#sample-metadata");
  MetadataDiv.html("");
  
  MetadataDiv.append("p").html(`<b>Region:</b> ${selectedSample.region}`);
  MetadataDiv.append("p").html(`<b>Population:</b> ${selectedSample.population}`);
  MetadataDiv.append("p").html(`<b>Humidity:</b> ${selectedSample.humidity}%`);
  MetadataDiv.append("p").html(`<b>Temperature:</b> ${Math.round(selectedSample.temperatureF)} F`);
  MetadataDiv.append("p").html(`<b>Nomad Reviews:</b>`);
  MetadataDiv.append("p").html(`${selectedSample.descriptionFromReview}`);
  
  console.log("Metadata updated");
}