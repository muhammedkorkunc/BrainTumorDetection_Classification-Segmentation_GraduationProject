"""
================================================================================
NeuroScan AI — Brain Tumor Classification & Segmentation System
Author: Muhammed Emin Korkunç
Degree: B.Sc. Computer Engineering, Fatih Sultan Mehmet Vakıf University
Contact: muhammedemin.korkunc@gmail.com
LinkedIn: linkedin.com/in/muhammed-emin-korkunç-100ba2215
GitHub: github.com/muhammedkorkunc

Copyright (c) 2026 Muhammed Emin Korkunç. All Rights Reserved.
Unauthorized copying, modification, or distribution is strictly prohibited.
================================================================================
"""

import os
import io
import base64
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
import torch.nn as nn
import cv2

app = Flask(__name__)
CORS(app)

# Config
MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')
CLASSIFICATION_MODEL_PATH = os.path.join(MODELS_DIR, 'classification_model.pth')
SEGMENTATION_MODEL_PATH = os.path.join(MODELS_DIR, 'segmentation_model.pth')

IMAGE_SIZE = 256
DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
CLASS_NAMES = ['glioma', 'meningioma', 'notumor', 'pituitary']

print(f"Using device: {DEVICE}")


# Classification CNN
class CNNModel(nn.Module):
    def __init__(self, num_classes=4):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1), nn.ReLU(), nn.BatchNorm2d(32),
            nn.MaxPool2d(2), nn.Dropout2d(0.1),

            nn.Conv2d(32, 64, kernel_size=3, padding=1), nn.ReLU(), nn.BatchNorm2d(64),
            nn.MaxPool2d(2), nn.Dropout2d(0.1),

            nn.Conv2d(64, 128, kernel_size=3, padding=1), nn.ReLU(), nn.BatchNorm2d(128),
            nn.MaxPool2d(2), nn.Dropout2d(0.15),

            nn.Conv2d(128, 256, kernel_size=3, padding=1), nn.ReLU(), nn.BatchNorm2d(256),
            nn.MaxPool2d(2), nn.Dropout2d(0.15),

            nn.Conv2d(256, 512, kernel_size=3, padding=1), nn.ReLU(), nn.BatchNorm2d(512),
            nn.MaxPool2d(2), nn.Dropout2d(0.2)
        )
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d((1, 1)),
            nn.Flatten(),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


# U-Net blocks
class DoubleConv(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(DoubleConv, self).__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, 3, 1, 1, bias=False),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, 3, 1, 1, bias=False),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
        )

    def forward(self, x):
        return self.conv(x)


class UNET(nn.Module):
    def __init__(self, in_channels=3, out_channels=1, features=[64, 128, 256, 512]):
        super(UNET, self).__init__()
        self.ups = nn.ModuleList()
        self.downs = nn.ModuleList()
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)

        # Encoder
        for feature in features:
            self.downs.append(DoubleConv(in_channels, feature))
            in_channels = feature

        # Decoder
        for feature in reversed(features):
            self.ups.append(nn.ConvTranspose2d(feature * 2, feature, kernel_size=2, stride=2))
            self.ups.append(DoubleConv(feature * 2, feature))

        self.bottleneck = DoubleConv(features[-1], features[-1] * 2)
        self.final_conv = nn.Conv2d(features[0], out_channels, kernel_size=1)

    def forward(self, x):
        skip_connections = []
        for down in self.downs:
            x = down(x)
            skip_connections.append(x)
            x = self.pool(x)

        x = self.bottleneck(x)
        skip_connections = skip_connections[::-1]

        for idx in range(0, len(self.ups), 2):
            x = self.ups[idx](x)
            skip_connection = skip_connections[idx // 2]
            if x.shape != skip_connection.shape:
                x = torch.nn.functional.interpolate(x, size=skip_connection.shape[2:])
            concat_skip = torch.cat((skip_connection, x), dim=1)
            x = self.ups[idx + 1](concat_skip)

        return self.final_conv(x)


classification_model = None
segmentation_model = None


def load_models():
    global classification_model, segmentation_model

    if os.path.exists(CLASSIFICATION_MODEL_PATH):
        print(f"Loading classification model: {CLASSIFICATION_MODEL_PATH}")
        classification_model = CNNModel(num_classes=4).to(DEVICE)
        classification_model.load_state_dict(torch.load(CLASSIFICATION_MODEL_PATH, map_location=DEVICE))
        classification_model.eval()
        print("Classification model loaded")
    else:
        print(f"Classification model not found: {CLASSIFICATION_MODEL_PATH}")

    if os.path.exists(SEGMENTATION_MODEL_PATH):
        print(f"Loading segmentation model: {SEGMENTATION_MODEL_PATH}")
        segmentation_model = UNET(in_channels=3, out_channels=1).to(DEVICE)
        segmentation_model.load_state_dict(torch.load(SEGMENTATION_MODEL_PATH, map_location=DEVICE))
        segmentation_model.eval()
        print("Segmentation model loaded")
    else:
        print(f"Segmentation model not found: {SEGMENTATION_MODEL_PATH}")


def preprocess_for_classification(image: Image.Image) -> torch.Tensor:
    image = image.resize((IMAGE_SIZE, IMAGE_SIZE))
    img_array = np.array(image).astype(np.float32)

    if len(img_array.shape) == 2:
        img_array = np.stack([img_array] * 3, axis=-1)
    elif img_array.shape[2] == 4:
        img_array = img_array[:, :, :3]

    # ImageNet normalization
    mean = np.array([0.485, 0.456, 0.406])
    std = np.array([0.229, 0.224, 0.225])
    img_array = img_array / 255.0
    img_array = (img_array - mean) / std

    img_tensor = torch.from_numpy(img_array).permute(2, 0, 1).unsqueeze(0).float()
    return img_tensor.to(DEVICE)


def preprocess_for_segmentation(image: Image.Image) -> torch.Tensor:
    image = image.resize((IMAGE_SIZE, IMAGE_SIZE))
    img_array = np.array(image)

    if len(img_array.shape) == 2:
        img_array = cv2.cvtColor(img_array, cv2.COLOR_GRAY2RGB)
    elif img_array.shape[2] == 4:
        img_array = cv2.cvtColor(img_array, cv2.COLOR_RGBA2RGB)

    # CLAHE enhancement
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    lab = cv2.cvtColor(img_array, cv2.COLOR_RGB2LAB)
    lab[:, :, 0] = clahe.apply(lab[:, :, 0])
    img_array = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)

    img_array = img_array.astype(np.float32) / 255.0
    img_tensor = torch.from_numpy(img_array).permute(2, 0, 1).unsqueeze(0).float()
    return img_tensor.to(DEVICE)


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'classification_model_loaded': classification_model is not None,
        'segmentation_model_loaded': segmentation_model is not None,
        'device': DEVICE
    })


@app.route('/api/classify', methods=['POST'])
def classify():
    if classification_model is None:
        return jsonify({'error': 'Classification model not loaded'}), 503

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    try:
        image_file = request.files['image']
        image = Image.open(image_file).convert('RGB')
        img_tensor = preprocess_for_classification(image)

        with torch.no_grad():
            outputs = classification_model(img_tensor)
            probabilities = torch.softmax(outputs, dim=1)[0]
            predicted_class_idx = torch.argmax(probabilities).item()
            confidence = probabilities[predicted_class_idx].item() * 100

        probs_dict = {CLASS_NAMES[i]: float(probabilities[i].item() * 100) for i in range(len(CLASS_NAMES))}

        return jsonify({
            'class': CLASS_NAMES[predicted_class_idx],
            'confidence': confidence,
            'probabilities': probs_dict
        })

    except Exception as e:
        print(f"Classification error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/segment', methods=['POST'])
def segment():
    if segmentation_model is None:
        return jsonify({'error': 'Segmentation model not loaded'}), 503

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    try:
        image_file = request.files['image']
        image = Image.open(image_file).convert('RGB')
        original_size = image.size
        img_tensor = preprocess_for_segmentation(image)

        with torch.no_grad():
            output = segmentation_model(img_tensor)
            output = torch.sigmoid(output)
            mask = (output > 0.5).float()

        mask_np = mask[0, 0].cpu().numpy()
        mask_np = (mask_np * 255).astype(np.uint8)
        mask_resized = cv2.resize(mask_np, original_size, interpolation=cv2.INTER_NEAREST)

        mask_image = Image.fromarray(mask_resized)
        buffer = io.BytesIO()
        mask_image.save(buffer, format='PNG')
        mask_base64 = f"data:image/png;base64,{base64.b64encode(buffer.getvalue()).decode()}"

        return jsonify({
            'maskBase64': mask_base64,
            'originalDimensions': {'width': original_size[0], 'height': original_size[1]}
        })

    except Exception as e:
        print(f"Segmentation error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    try:
        image_file = request.files['image']
        image_bytes = image_file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        original_size = image.size
        results = {}

        if classification_model is not None:
            img_tensor = preprocess_for_classification(image)
            with torch.no_grad():
                outputs = classification_model(img_tensor)
                probabilities = torch.softmax(outputs, dim=1)[0]
                predicted_class_idx = torch.argmax(probabilities).item()
                confidence = probabilities[predicted_class_idx].item() * 100

            results['classification'] = {
                'class': CLASS_NAMES[predicted_class_idx],
                'confidence': confidence,
                'probabilities': {CLASS_NAMES[i]: float(probabilities[i].item() * 100) for i in range(len(CLASS_NAMES))}
            }
        else:
            results['classification'] = None

        if segmentation_model is not None:
            img_tensor = preprocess_for_segmentation(image)
            with torch.no_grad():
                output = segmentation_model(img_tensor)
                output = torch.sigmoid(output)
                mask = (output > 0.5).float()

            mask_np = mask[0, 0].cpu().numpy()
            mask_np = (mask_np * 255).astype(np.uint8)
            mask_resized = cv2.resize(mask_np, original_size, interpolation=cv2.INTER_NEAREST)

            mask_image = Image.fromarray(mask_resized)
            buffer = io.BytesIO()
            mask_image.save(buffer, format='PNG')
            mask_base64 = f"data:image/png;base64,{base64.b64encode(buffer.getvalue()).decode()}"

            results['segmentation'] = {
                'maskBase64': mask_base64,
                'originalDimensions': {'width': original_size[0], 'height': original_size[1]}
            }
        else:
            results['segmentation'] = None

        return jsonify(results)

    except Exception as e:
        print(f"Analysis error: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("\n" + "=" * 50)
    print("Brain MRI Analysis Server")
    print("=" * 50)
    print(f"Models dir: {MODELS_DIR}")
    
    load_models()
    
    print("\nServer running on http://localhost:5000\n")
    app.run(host='0.0.0.0', port=5000, debug=True)
