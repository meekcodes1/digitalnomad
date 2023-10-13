# Import the dependencies.
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, text, and_, inspect
from datetime import datetime, timedelta

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///digitalnomad/Resources/nomad_destinations.sqlite")

inspector = inspect(engine)
print(inspector.get_table_names())
# Reflect the tables from the database
Base = automap_base()
Base.prepare(engine, reflect=True)

for class_name in Base.classes:
    print(class_name)


nomad = Base.classes.nomad_destinations
print(nomad)

# #################################################
# # Flask Setup
# #################################################
app = Flask(__name__)

# #################################################
# # Flask Routes
# #################################################
@app.route("/")
def welcome():
     """List all available api routes."""
     return (
         f"Available Routes:<br/>"
         f"<br/>"
         f"/api/v1.0/destinations<br/>"
         f"/api/v1.0/stations<br/>"
         f"/api/v1.0/tobs<br/>"
         f"/api/v1.0/start_date<br/>"
         f"/api/v1.0/start_date/end_date<br/>"
     )

@app.route("/api/v1.0/destinations")
def destinations():
    conn = engine.connect()
    session = Session(engine)
    all_destinations_query = text("SELECT DISTINCT long_slug FROM nomad_destinations")
    all_destinations = conn.execute(all_destinations_query).fetchall()

    session.close()

    destinations = []
    for row in all_destinations:
        destination_dict = {}
        destination_dict["long_slug"] = row['long_slug']
        destinations.append(destination_dict)
    
    return jsonify(destinations)

if __name__ == "__main__":
    app.run(debug=True)
