fetch('http://localhost:5000/get_data')
  .then(response => response.json())
  .then(data => {
    // Handle the data received from the Flask API
    console.log(data); // You can replace this with your own logic
  })
  .catch(error => {
    console.error('Error:', error);
  });