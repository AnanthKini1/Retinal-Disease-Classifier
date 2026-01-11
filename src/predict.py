import numpy as np
from tensorflow import keras
from PIL import Image

def load_model():
    """Load the trained model"""
    model = keras.models.load_model('../models/retinal_disease_classifier.keras')
    return model

def preprocess_image(image_path):
    """Preprocess image for model input"""
    img = Image.open(image_path)
    img = img.resize((512, 512), Image.Resampling.LANCZOS)
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  
    return img_array

def predict(image_path, model, disease_names, top_k=3):
    """Make prediction and return top k diseases"""
    img_array = preprocess_image(image_path)
    predictions = model.predict(img_array)[0]
    
    top_indices = np.argsort(predictions)[-top_k:][::-1]
    results = [
        {
            'disease': disease_names[i],
            'probability': float(predictions[i]),
            'percentage': f"{predictions[i]*100:.1f}%"
        }
        for i in top_indices
    ]
    return results
