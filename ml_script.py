import joblib
import sys
import json

# Load your machine learning model
premodel = joblib.load('machine/tfidf.pkl')
model = joblib.load('machine/logistic_regression_model.pkl')

def predict_offensive(text):
    # Preprocess the text using the loaded preprocessor model
    preprocessed_text = premodel.transform([text])

    # Make a prediction using the loaded machine learning model
    prediction = model.predict(preprocessed_text)

    # Convert the prediction to a human-readable label
    label = 'Offensive' if prediction == 1 else 'Not Offensive'

    return label

def perform_prediction(input_data):
    # Perform prediction using the loaded model
    prediction = predict_offensive(input_data['text'])

    # Return the result in a format similar to Flask
    return {'prediction': prediction}

if __name__ == "__main__":
    # Read input from Node.js
    input_data = json.loads(sys.stdin.readline())

    # Perform prediction using the perform_prediction function
    result = perform_prediction(input_data)

    # Send the result back to Node.js
    sys.stdout.write(json.dumps(result))
    sys.stdout.flush()
