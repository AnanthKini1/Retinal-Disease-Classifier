from flask import Flask, request, jsonify, render_template
import os
from tensorflow import keras
from src.predict import load_model, predict
import pandas as pd
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Model and label data imports
model_path = 'models/retinal_disease_classifier.keras'  
model = keras.models.load_model(model_path)
train_labels = pd.read_csv("data/raw/Training_Set/RFMiD_Training_Labels.csv")
disease_names = train_labels.columns[2:47].tolist()

# Test Route
@app.route('/')
def home():
    return "Flask is working!"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route for disease prediction
@app.route('/predict', methods=['POST'])
def predict_disease():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Only PNG, JPG, JPEG allowed'}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    
    results = predict(filepath, model, disease_names, top_k=5)
    
    os.remove(filepath)
    
    return jsonify({'predictions': results})
    

if __name__ == '__main__':
    app.run(debug=True)