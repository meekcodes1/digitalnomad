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
    init();
  })
  .catch(error => {
    console.error('Error:', error);
  });

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
  // Use the 'data' variable to find and update metadata.
  let selectedSample = data.find(sample => sample.name + ", " + sample.country === selectedValue);
  let MetadataDiv = d3.select("#sample-metadata");
  MetadataDiv.html("");
  
  // Display only the "country" key
  MetadataDiv.append("p").html(`<b>Region:</b> ${selectedSample.region}`);
  MetadataDiv.append("p").html(`<b>Population:</b> ${selectedSample.population}`);
  MetadataDiv.append("p").html(`<b>Humidity:</b> ${selectedSample.humidity}%`);
  MetadataDiv.append("p").html(`<b>Temperature:</b> ${Math.round(selectedSample.temperatureF)} F`);
  MetadataDiv.append("p").html(`<b>Nomad Reviews:</b>`);
  MetadataDiv.append("p").html(`${selectedSample.descriptionFromReview}`);
  
  console.log("Metadata updated");
}