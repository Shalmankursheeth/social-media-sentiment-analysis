from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Add this line
import csv
import joblib
import os
import numpy as np  # Import NumPy for array manipulation

app = Flask(__name__)
CORS(app)

# Load your machine learning model
premodel = joblib.load('machine/tfidf.pkl')
model = joblib.load('machine/logistic_regression_model.pkl')

# CSV file to store the data
csv_filename = 'machine/userdata.csv'

# Check if the CSV file exists; if not, create it with headers
if not os.path.exists(csv_filename):
    with open(csv_filename, 'w', newline='') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(['Original_Text', 'Prediction'])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/saveData', methods=['POST'])
def save_data():
    if request.method == 'POST':
        try:
            data = request.get_json()
            original_text = data.get('originalPostText')

            # Transform the user input using the pre-fitted vectorizer
            user_input_vectorized = premodel.transform(original_text)

            # Ensure the user_input_vectorized is a 2D array
            if isinstance(user_input_vectorized, np.ndarray) and user_input_vectorized.ndim == 1:
                user_input_vectorized = user_input_vectorized.reshape(1, -1)

            print("Original Text:", original_text)
            print("User Input Vectorized Shape:", user_input_vectorized.shape)
            print("User Input Vectorized:", user_input_vectorized)

            # Perform prediction using the loaded model
            prediction = model.predict(user_input_vectorized)[0]

            print("Prediction:", prediction)

            # Save the data to the CSV file
            with open(csv_filename, 'a', newline='') as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerow([original_text, prediction])

            return jsonify({'prediction': prediction, 'status': 'success'})

        except Exception as e:
            print("Error:", e)
            return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
