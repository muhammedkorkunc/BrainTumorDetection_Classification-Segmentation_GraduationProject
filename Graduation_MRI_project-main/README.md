# NeuroScan AI — Brain Tumor Classification & Segmentation (MRI) 🧠⚕️

A deep learning–based system that analyzes **brain MRI** images to:
- **Detect and classify tumors** into **4 classes**: *Glioma, Meningioma, Pituitary, No Tumor*
- **Segment (localize) tumor regions** pixel-by-pixel with a U-Net–based model
- Provide an end-to-end **web application** for real-time inference (**React frontend + Flask backend**)

> ⚠️ **Medical Disclaimer**  
> This project is for educational/research purposes and **does not replace professional medical diagnosis**. Always consult qualified healthcare professionals.

---

## Table of Contents
- [Project Summary](#project-summary)
- [Key Features](#key-features)
- [Models](#models)
- [Datasets](#datasets)
- [Results](#results)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Run the Web App (Quickstart)](#run-the-web-app-quickstart)
- [API Endpoints](#api-endpoints)
- [Training / Notebooks](#training--notebooks)
- [Project Structure](#project-structure)
- [Reproducibility Notes](#reproducibility-notes)
- [Limitations & Future Work](#limitations--future-work)

---

## Project Summary

Brain tumor detection from MRI is time-consuming and prone to human error when performed manually.  
This graduation project develops a **two-stage deep learning pipeline**:

1. **Classification (CNN)**  
   A custom CNN (trained **from scratch**, not transfer learning) classifies MRI slices into four categories:
   - Glioma
   - Meningioma
   - Pituitary tumor
   - No Tumor

2. **Segmentation (U-Net)**  
   A U-Net encoder–decoder model performs **binary tumor mask prediction** (pixel-wise segmentation) to visually localize tumor regions.

The final deliverable includes a **web application** named **NeuroScan AI** for uploading MRI images and receiving:
- Predicted tumor class + confidence
- Probability distribution across classes
- Segmentation mask and overlay visualization

---

## Key Features
- ✅ **4-class MRI tumor classification** (Glioma / Meningioma / Pituitary / No Tumor)
- ✅ **High test performance** (see Results)
- ✅ **Tumor segmentation** with U-Net
- ✅ **Web-based deployment** (React + Flask)
- ✅ **Confidence scores + per-class probabilities**
- ✅ **Mask visualization** (overlay & mask-only)
- ✅ Modular inference endpoints (`/health`, `/classify`, `/segment`, `/analyze`)

---

## Models

### 1) Multi-Class Classifier (Custom CNN)
**VGG-style** progressive convolution blocks:
- Feature channels: **32 → 64 → 128 → 256 → 512**
- BatchNorm + ReLU + MaxPool
- Progressive Dropout in deeper blocks
- AdaptiveAvgPool(1,1) + FC head (512→256→4 logits)

Training highlights:
- Input size: **256×256×3**
- Loss: **CrossEntropyLoss** (+ class weights to address imbalance)
- Optimizer: **Adam**
- LR scheduler: ReduceLROnPlateau

### 2) Segmentation Model (U-Net)
A standard **U-Net** with skip connections:
- Encoder: 64→128→256→512
- Bottleneck: 1024
- Decoder: transposed conv upsampling + skip concatenation
- Output: **1-channel binary mask**

Loss:
- **Dice + BCE** combined loss (stable gradients + class imbalance robustness)

---

## Datasets

### Classification (4-class)
Aggregated large-scale dataset of **~43,687 MRI images** compiled from multiple open sources (Hugging Face + Kaggle).  
Split strategy (as used in the report):
- Train: **70%**
- Val: **10%**
- Test: **20%**

### Segmentation
**LGG Brain MRI Segmentation** dataset (Kaggle):
- ~3,929 image-mask pairs (slice-level)
- Train/Val split (report): ~85% / 15%

> Note: Segmentation training in this project was performed primarily on **glioma** segmentation data; multi-class segmentation can be explored as future work.

---

## Results

### Final Multi-Class Classification (4-class)
**Test Accuracy:** **99.03%**  
**Weighted Precision/Recall/F1:** **~99.03%**  

Per-class metrics (final model):
- **Glioma**: Precision ~98.77%, Recall ~99.15%, F1 ~98.96%
- **Meningioma**: Precision ~98.73%, Recall ~98.42%, F1 ~98.58%
- **Pituitary**: Precision ~99.63%, Recall **100.00%**, F1 ~99.82%
- **No Tumor**: Precision ~99.17%, Recall ~98.84%, F1 ~99.00%

> Particularly notable: the system achieves **very strong performance across all classes** with low inter-class confusion.  
(Full confusion matrix and detailed values are documented in the project report.)

### Segmentation (U-Net)
- Best Validation Loss: **~0.1253**
- Dice Coefficient: **~0.87**
- IoU (Jaccard): **~0.78**
- Pixel Accuracy: **~96.5%**

---

## System Architecture

**Client (React / Vite)**
- Upload MRI image (PNG/JPG/JPEG)
- Displays: class prediction, confidence bar, probability distribution
- Segmentation: overlay & mask-only view

**Server (Flask + PyTorch)**
- Loads trained `.pth` weights
- Preprocesses input
  - Classification: resize → normalize (ImageNet stats) → CNN → softmax
  - Segmentation: resize → CLAHE → U-Net → sigmoid → threshold → mask encode

Communication:
- REST API (multipart upload)
- Returns JSON + base64 mask for segmentation results

---

## Installation

> The exact directory names may differ depending on your repo structure; adjust paths accordingly.

### Requirements
- Python **3.10+**
- Node.js **18+**
- (Optional) CUDA-capable GPU for faster inference/training

### Backend (Flask)
```bash
cd backend

python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

pip install -r requirements.txt
````

### Frontend (React)

```bash
cd frontend
npm install
```

---

## Run the Web App (Quickstart)

### 1) Start Backend

```bash
cd backend
source .venv/bin/activate
python app.py
# or
flask run --host 0.0.0.0 --port 5000
```

### 2) Start Frontend

```bash
cd frontend
npm run dev
```

Open:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5000`

---

## API Endpoints

> Prefix may be `/api` depending on implementation.

### Health Check

**GET** `/api/health`
Returns:

* Server status
* Whether models are loaded
* Device (cpu/cuda)

### Classify

**POST** `/api/classify`
Body: `multipart/form-data` with `file`

Returns:

* predicted class
* confidence
* probabilities for 4 classes

### Segment

**POST** `/api/segment`
Body: `multipart/form-data` with `file`

Returns:

* base64 PNG mask
* original dimensions

### Analyze (Combined)

**POST** `/api/analyze`
Runs both classification + segmentation in one call.

Example `curl`:

```bash
curl -X POST \
  -F "file=@sample_mri.jpg" \
  http://localhost:5000/api/analyze
```

---

## Training / Notebooks

This repository includes notebooks for training:

* `graduation-project-mc-classifier(5).ipynb`
  Multi-class classifier training and evaluation (confusion matrix, per-class metrics)

* `graduation-project-segmentation(5).ipynb`
  U-Net training with Dice+BCE loss and qualitative mask outputs

> Training was performed using an P100 GPU environment (as documented). CPU training is possible but slower.

---

## Project Structure

A typical structure (adapt to your repo):

```
.
├─ backend/
│  ├─ app.py
│  ├─ models/
│  │  ├─ classification_model.pth
│  │  └─ segmentation_model.pth
│  ├─ requirements.txt
│  └─ ...
├─ frontend/
│  ├─ src/
│  ├─ package.json
│  └─ ...
├─ notebooks/
│  ├─ graduation-project-mc-classifier(5).ipynb
│  └─ graduation-project-segmentation(5).ipynb
├─ docs/
│  ├─ Graduation Project Final Report.pdf
│  └─ BitirmePoster_Tr.pdf
└─ README.md
```

---

## Reproducibility Notes

* Input images are resized to **256×256**
* Classification normalization uses **ImageNet mean/std**
* Segmentation uses **CLAHE** for visibility enhancement
* For best reproducibility, keep the same dataset split strategy and preprocessing pipeline.

---

## Limitations & Future Work

* **2D slice-level** analysis only (no 3D volumetric context)
* Single-modality MRI focus (multi-sequence fusion like T2/FLAIR can improve robustness)
* Segmentation is trained on **LGG/glioma** segmentation data; multi-class segmentation is an extension target
* Clinical deployment requires additional validation and regulatory processes

Potential improvements:

* Attention U-Net / U-Net++ for better boundaries
* Explainable AI (Grad-CAM) for interpretability
* 3D MRI volumes for tumor volume estimation
* Larger & more diverse clinical datasets

---

