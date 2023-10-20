// Fetch data from the Flask API
fetch('http://localhost:5000/get_data')
  .then(response => response.json())
  .then(data => {
    // Handle the data received from the Flask API
    console.log(data); // You can replace this with your own logic
    
    // Populate the dropdown with the data
    populateDropdown(data);
    populateMap(data);

  })
  .catch(error => {
    console.error('Error:', error);
  });

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
        [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
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

  // Function to populate the dropdown options
  function populateDropdown(names) {
    let dropdown = d3.select("#selDataset");
    dropdown.html("");  // Clear any existing options (if needed)
    names.forEach(function (dataObject) {
      dropdown.append("option").text(dataObject.long_slug).property("value", dataObject.long_slug);
    });
  }

  function update_MetaData(sampleID) {
    // Find the selected sample data
        let samples = data.metadata;
        let selectedSample = samples.find(sample => sample.id === parseInt(sampleID));
      
    // Get the reference to the metadata div
        let MetadataDiv = d3.select("#sample-metadata")
        MetadataDiv.html("")
    // Append key value pairs to the metadata div
        for (const [key, value] of Object.entries(selectedSample)) {
            MetadataDiv.append("p").text(`${key}: ${value}`);
          }
        console.log("Metadata updated");
    };
  