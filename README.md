# Retinal Disease Classifier

A deep learning project for multi-label classification of retinal diseases from fundus photographs using convolutional neural networks and transfer learning.

## Overview

This project uses the RFMiD (Retinal Fundus Multi-Disease Image Dataset) to build a CNN-based classifier that can detect up to 45 different retinal conditions from a single fundus image. The model leverages transfer learning with ResNet50 pre-trained on ImageNet.

## Dataset

- **Source**: RFMiD Dataset
- **Training Images**: 1,920 retinal fundus photographs
- **Diseases**: 45 different retinal conditions including Diabetic Retinopathy (DR), Age-related Macular Degeneration (ARMD), Macular Hole (MH), and others
- **Format**: Multi-label classification (images can have multiple diseases simultaneously)

## Project Structure
```
Retinal-Disease-Classifier/
├── data/
│   ├── raw/                    # Original dataset
│   └── processed/              # Preprocessed numpy arrays
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_data_preprocessing.ipynb
│   ├── 03_model_training.ipynb
│   └── 04_model_evaluation.ipynb
├── models/                     # Saved trained models
├── results/                    # Training plots and evaluation results
└── README.md
```

## Technical Details

**Model Architecture:**
- Base: ResNet50 (pre-trained on ImageNet, frozen)
- Custom layers: Global Average Pooling → Dense(256, ReLU) → Dropout(0.5) → Dense(45, Sigmoid)
- Total parameters: ~24M (536K trainable)

**Training:**
- Input size: 512×512×3 RGB images
- Optimizer: Adam (learning_rate=0.001)
- Loss: Binary cross-entropy
- Batch size: 32
- Epochs: 10
- Train/Val split: 80/20

**Performance:**
- Validation AUC: 0.87 (macro-average)
- Average per-disease AUC: 0.58
- Best performing diseases: ST (0.97), MYA (0.81), TD (0.78)

## Key Findings

- Transfer learning with frozen ResNet50 features provided strong baseline performance
- Severe class imbalance (some diseases with only 1-6 examples) limits performance on rare conditions
- Model performs well on common diseases (DR, MYA) but struggles with rare diseases
- No overfitting observed - training and validation metrics closely aligned

## Requirements
```
tensorflow==2.20.0
numpy
pandas
matplotlib
seaborn
scikit-learn
pillow
jupyter
```

## Usage

1. **Data Exploration**: `notebooks/01_data_exploration.ipynb`
   - Analyze dataset distribution
   - Examine multi-label patterns
   - Study disease co-occurrences

2. **Preprocessing**: `notebooks/02_data_preprocessing.ipynb`
   - Load and resize images to 512×512
   - Normalize pixel values (0-1 range)
   - Create train/validation split

3. **Training**: `notebooks/03_model_training.ipynb`
   - Build model with transfer learning
   - Train on preprocessed data
   - Save trained model

4. **Evaluation**: `notebooks/04_model_evaluation.ipynb`
   - Generate predictions on validation set
   - Calculate per-disease AUC scores
   - Visualize performance metrics

## Future Improvements

- Fine-tune ResNet layers for better performance
- Implement data augmentation to address class imbalance
- Experiment with different architectures (EfficientNet, DenseNet)
- Optimize per-disease decision thresholds
- Apply class weighting to improve rare disease detection

## Author

Ananth Kini

## Acknowledgments

- Dataset: RFMiD (Retinal Fundus Multi-Disease Image Dataset)
- Pre-trained model: ResNet50 from TensorFlow/Keras