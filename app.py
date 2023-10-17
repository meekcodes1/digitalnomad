from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine, func, desc, text, and_

# Create a Flask application
app = Flask(__name__)

# Define your SQLAlchemy ORM models and setup
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
engine = create_engine("sqlite:///digitalnomad/Resources/nomad_db.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# Define Flask routes
@app.route("/")
def welcome():
    """List all available API routes."""
    return "Welcome to the Nomad Destinations API!"

@app.route("/api/v1.0/destinations")
def destinations():
    # Create a session within the Flask context
    with app.app_context():
        session = Session()
        query = text("SELECT * from nomad_destinations")
        results = session.execute(query).all()
        session.close()

        # Convert results to a JSON format
        destinations = []
        for row in results:
            destination_dict = {
                "long_slug": row.long_slug,
                "region": row.region,
                # Add more fields as needed
            }
            destinations.append(destination_dict)

    return jsonify(destinations)

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
