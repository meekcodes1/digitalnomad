Project 3: Analysis of Digital Nomad Cities
-----
API: https://rapidapi.com/emir12/api/nomad-list-cities/
-----
Proposal: 
- Analyze the viability and attractiveness of various digital nomad cities
- Use the dataset to create visualizations on: internet speed, weather, cost of living, and other factors.
-----
Team Members (Group 6):
1. Mykolas Daugirdas
2. Angel Conde
3. Rebecca Daaleman
4. Patrick Moon
5. Moises Contreras
-----
Instructions:
To start up the dashboard:
1. Create a database in MongoDB called "project3".
2. Create a collection called "nomads" within "project3" database.
3. Import digitalnomad_json.json to the collection.
4. Run app_mongo.py.
5. Open index.html.
-----
Files in this repository:
1. static folder
  - css > "style.css" contains the styling for index.html
  - js > index_script.js contains the javascript code for the main dashboard
  - js > map_script.js contains the javascript code for the leaflet map
2. "Nomad Analysis.pptx" is the background slide deck
3. "app_mongo.py" runs the flask app
4. "digitalnomad_json.json" is the json file used to populate the MongoDB collection
5. "digitalnomad_setup.ipynb" generates the JSON file mentioned above
6. "index.html" contains the html code for the dashboard
7. "map.html" contains the html code for the leaflet map
8. "safety_bar_graph.png" contains a bar graph image used in the main dashboard
-----
Resources:
1. https://plotly.com/javascript/choropleth-maps/
2. https://www.chartjs.org/docs/latest/charts/bar.html
3. https://plotly.com/javascript/line-and-scatter/#data-labels-hover
4. HTML from module 14 challenge as a baseline
5. Javascript from module 15 challenge as a baseline
6. Connecting to MongoDB - Instructor Eli covered this in class
7. Nomad data API - https://rapidapi.com/emir12/api/nomad-list-cities/
8. Specify decimal points in Javascript - https://www.w3schools.com/jsref/jsref_tofixed.asp
9. Color scale RGB codes - https://www.rapidtables.com/web/color/RGB_Color.html
10. ChatGPT for debugging code
11. Digital Nomad definition - https://en.wikipedia.org/wiki/Digital_nomad
