from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Configure MongoDB URI
app.config['MONGO_URI'] = 'mongodb://localhost:27017/project3'
mongo = PyMongo(app)

@app.route('/get_data')
def get_data():
    # Access the 'nomads' collection
    data_collection = mongo.db.nomads

    # Find all documents in the collection
    result = data_collection.find()

    # Convert ObjectId to str for JSON serialization
    data = [doc for doc in result]
    for doc in data:
        doc['_id'] = str(doc['_id'])

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
