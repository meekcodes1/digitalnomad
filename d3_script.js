// Fetch data from the Flask API
fetch('http://localhost:5000/get_data')
  .then(response => response.json())
  .then(data => {
    // Handle the data received from the Flask API
    console.log(data); // You can replace this with your own logic

    // Populate the dropdown with the data
    populateDropdown(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


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
  