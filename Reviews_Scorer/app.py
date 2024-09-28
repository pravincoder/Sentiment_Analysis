from flask import Flask, request, jsonify,send_file
from flask_cors import CORS
import logging
from crew import score_reviews
import pandas as pd
from helper import to_json
app = Flask(__name__)

CORS(app)

# Config the logger
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

@app.route('/score_reviews', methods=['POST'])
def score_reviews_route():
    if 'file' not in request.files:
        return jsonify({'error': 'No file present in the request'}), 400
    file = request.files['file']
    if file.filename.endswith('.csv'):
        try:
            # Read the CSV file into a DataFrame
            data = pd.read_csv(file)
            data = to_json(data)
        except Exception as e:
            logging.error(f"Error reading CSV: {e}")
            return jsonify({'error': 'Error reading CSV file'}), 500
    elif file.filename.endswith('.xlsx'):
        try:
            # Read the Excel file into a DataFrame
            data = pd.read_excel(file)
            data = to_json(data)
        except Exception as e:
            logging.error(f"Error reading XLSX: {e}")
            return jsonify({'error': 'Error reading Excel file'}), 500
    else:
        return jsonify({'error': 'Unsupported file format. Only CSV and XLSX are allowed.'}), 400
    logging.info("Data read successfully")
    # Score the reviews
    result = score_reviews(data)

    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(debug=True)