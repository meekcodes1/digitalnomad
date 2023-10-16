from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

# Import the dependencies.
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, text, and_
from datetime import datetime, timedelta

from flask import Flask, jsonify

Base = declarative_base()

class NomadDestinations(Base):
    __tablename__ = 'nomad_destinations'

    # Define your columns here
    id = Column(Integer, primary_key=True, autoincrement=True)
    region = Column(String)
    population = Column(String)
    descriptionFromReview = Column(String)
    slug = Column(String)
    short_slug = Column(String)
    long_slug = Column(String, unique=True)
    users_count = Column(String)
    users_count_est = Column(String)
    users_count_been = Column(String)
    users_count_been_est = Column(String)
    boost = Column(String)
    last_2_year_growth = Column(String)
    name = Column(String)
    air_quality_now = Column(String)
    air_quality = Column(String)
    latitude = Column(String)
    longitude = Column(String)
    country = Column(String)
    country_code = Column(String)
    country_slug = Column(String)
    state_code = Column(String)
    state = Column(String)
    internet_speed = Column(String)
    air_quality_score = Column(String)
    air_quality_now_score = Column(String)
    humidity = Column(String)
    rank = Column(String)
    temperatureC = Column(String)
    temperatureF = Column(String)
    temperatureC_feels_like = Column(String)
    temperatureF_feels_like = Column(String)
    cost_for_nomad_in_usd = Column(String)
    cost_for_expat_in_usd = Column(String)
    cost_for_local_in_usd = Column(String)
    cost_for_family_in_usd = Column(String)
    total_score = Column(String)
    overall_score = Column(String)
    cost_score = Column(String)
    internet_score = Column(String)
    leisure_quality = Column(String)
    safety_level = Column(String)
# Database Setup
engine = create_engine("sqlite:///Resources/nomad_db.db")

# Create tables
Base.metadata.create_all(engine)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Now you can work with the NomadDestinations class and perform database operations

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
    all_destinations_query = text("SELECT DISTINCT long_slug FROM nomad_destinations")
    all_destinations = conn.execute(all_destinations_query).fetchall()

    conn.close()

    destinations = []
    for row in all_destinations:
        destination_dict = {}
        destination_dict["long_slug"] = row['long_slug']
        destinations.append(destination_dict)
    
    return jsonify(destinations)

if __name__ == "__main__":
    app.run(debug=True)