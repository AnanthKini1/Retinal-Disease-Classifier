# RetiScan

An AI-powered web application for automated retinal disease detection from fundus photographs. Built with deep learning (ResNet50 transfer learning) and deployed with a modern Flask web interface.

## 🚀 Live Demo

[Link to deployed app - (http://retiscan-production.up.railway.app)]

## 📋 Overview

RetiScan uses convolutional neural networks to analyze retinal fundus images and identify potential eye diseases. The system can detect up to 45 different retinal conditions including Diabetic Retinopathy, Macular Degeneration, and other vision-threatening diseases.

**Key Features:**
- Multi-label disease classification (detects multiple conditions simultaneously)
- Real-time image analysis through web interface
- Transfer learning with ResNet50 for accurate predictions
- Clean, modern UI with instant results

## 🎯 Dataset

- **Source**: RFMiD (Retinal Fundus Multi-Disease Image Dataset)
- **Training Images**: 1,920 retinal fundus photographs
- **Disease Categories**: 45 different retinal conditions
- **Challenge**: Severe class imbalance (some diseases with only 1-6 examples)

## 🏗️ Project Structure
```
RetiScan/
├── app.py                      # Flask application
├── src/
│   └── predict.py              # Prediction logic
├── templates/
│   └── index.html              # Web interface
├── static/
│   ├── css/
│   │   └── styles.css          # Styling
│   └── js/
│       └── script.js           # Frontend logic
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_data_preprocessing.ipynb
│   ├── 03_model_training.ipynb
│   └── 04_model_evaluation.ipynb
├── models/                     # Trained model (excluded from repo)
├── results/                    # Training visualizations
└── requirements.txt
```

## 🧠 Model Architecture

**Base Model:** ResNet50 (pre-trained on ImageNet, frozen)

**Custom Layers:**
```
ResNet50 (frozen) 
→ Global Average Pooling 
→ Dense(256, ReLU) 
→ Dropout(0.5) 
→ Dense(45, Sigmoid)
```

**Parameters:**
- Total: ~24M parameters
- Trainable: 536K parameters (2%)
- Input: 512×512×3 RGB images

## 📊 Performance

- **Validation AUC**: 0.87 (macro-average during training)
- **Average per-disease AUC**: 0.58
- **Top performing diseases**: 
  - Optociliary Shunt (ST): 0.97 AUC
  - Myopia (MYA): 0.81 AUC
  - Tilted Disc (TD): 0.78 AUC

**Note:** Performance varies significantly across diseases due to class imbalance. Common diseases (DR, MYA, ODC) show strong performance, while rare diseases with few training examples are less reliable.

## 🛠️ Tech Stack

**Backend:**
- Python 3.12
- Flask (web framework)
- TensorFlow/Keras (deep learning)
- NumPy, Pandas (data processing)

**Frontend:**
- HTML5, CSS3, JavaScript
- Responsive design
- Futuristic UI with animated background

**ML Pipeline:**
- scikit-learn (train/val splitting, metrics)
- PIL/Pillow (image processing)
- Transfer learning with ResNet50

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/RetiScan.git
cd RetiScan
```

2. **Create virtual environment:**
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Download the trained model:**
[Instructions for downloading model from Google Drive/host]

5. **Run the application:**
```bash
python app.py
```

6. **Open in browser:**
```
http://127.0.0.1:5000
```

## 🎨 Usage

1. Open RetiScan in your browser
2. Click "Choose File" and select a retinal fundus image
3. Click "Analyze Image"
4. View top 3 predicted diseases with confidence percentages
5. See the uploaded image preview alongside results

## 📈 Training Process

**Data Preprocessing:**
- Resized images to 512×512 pixels
- Normalized pixel values to 0-1 range
- 80/20 train/validation split (1,536/384 images)

**Training Configuration:**
- Optimizer: Adam (lr=0.001)
- Loss: Binary cross-entropy
- Batch size: 32
- Epochs: 10
- No overfitting observed

## 🔮 Future Improvements

- [ ] Fine-tune ResNet layers for domain-specific features
- [ ] Implement data augmentation (rotation, zoom, flip)
- [ ] Add class weighting to handle imbalance
- [ ] Experiment with EfficientNet/DenseNet architectures
- [ ] Deploy with confidence intervals/uncertainty estimates
- [ ] Add explainability features (Grad-CAM visualizations)

## ⚠️ Limitations

- Model performance varies by disease prevalence
- Not validated for clinical use - **for educational purposes only**
- Rare diseases (<10 training examples) may have unreliable predictions
- Model trained on specific image quality/format from RFMiD dataset

## 📝 Project Development

This project was developed as a learning exercise in:
- End-to-end machine learning pipeline development
- Transfer learning for medical imaging
- Multi-label classification problems
- Web application development with Flask
- Handling severe class imbalance

## 👨‍💻 Author

**Ananth Kini**
- Freshman Computer Science Student, UC Irvine
- [LinkedIn](your-linkedin)
- [GitHub](your-github)

## 🙏 Acknowledgments

- **Dataset**: RFMiD (Retinal Fundus Multi-Disease Image Dataset)
- **Pre-trained Model**: ResNet50 from TensorFlow/Keras
- **Inspiration**: Addressing the need for accessible retinal disease screening tools

## 📄 License

This project is for educational purposes. The RFMiD dataset has its own terms of use.

---

**Disclaimer:** RetiScan is a student project and educational tool. It is NOT intended for medical diagnosis or clinical decision-making. Always consult qualified healthcare professionals for medical advice.