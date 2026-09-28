/**
 * ============================================================================
 * NeuroScan AI — Brain Tumor Classification & Segmentation System
 * Author: Muhammed Emin Korkunç
 * Degree: B.Sc. Computer Engineering, Fatih Sultan Mehmet Vakıf University
 * Contact: muhammedemin.korkunc@gmail.com
 * LinkedIn: linkedin.com/in/muhammed-emin-korkunç-100ba2215
 * GitHub: github.com/muhammedkorkunc
 * 
 * Copyright (c) 2026 Muhammed Emin Korkunç. All Rights Reserved.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 * ============================================================================
 */

const API_BASE = 'http://localhost:5000';

export interface ClassificationResult {
  class: 'glioma' | 'meningioma' | 'notumor' | 'pituitary';
  confidence: number;
  probabilities: {
    glioma: number;
    meningioma: number;
    notumor: number;
    pituitary: number;
  };
}

export interface SegmentationResult {
  maskBase64: string;
  originalDimensions: {
    width: number;
    height: number;
  };
}

export interface AnalysisResult {
  classification: ClassificationResult;
  segmentation: SegmentationResult;
}

export async function checkBackendHealth(): Promise<{
  status: string;
  classification_model_loaded: boolean;
  segmentation_model_loaded: boolean;
  device: string;
}> {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    if (!response.ok) throw new Error('Backend not responding');
    return response.json();
  } catch {
    throw new Error('Backend server not running. Start it with: python backend/app.py');
  }
}

async function classifyImage(imageFile: File): Promise<ClassificationResult> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE}/api/classify`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Classification failed' }));
    throw new Error(error.error || 'Classification failed');
  }
  return response.json();
}

async function segmentImage(imageFile: File): Promise<SegmentationResult> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE}/api/segment`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Segmentation failed' }));
    throw new Error(error.error || 'Segmentation failed');
  }
  return response.json();
}

export async function analyzeImage(imageFile: File): Promise<AnalysisResult> {
  console.log('Analyzing:', imageFile.name);

  await checkBackendHealth();

  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Analysis failed' }));
    throw new Error(error.error || 'Analysis failed');
  }

  const result = await response.json();

  if (!result.classification) throw new Error('Classification model not loaded');
  if (!result.segmentation) throw new Error('Segmentation model not loaded');

  return {
    classification: result.classification,
    segmentation: result.segmentation,
  };
}

// Run models in parallel (alternative)
export async function analyzeImageSeparate(imageFile: File): Promise<AnalysisResult> {
  const [classification, segmentation] = await Promise.all([
    classifyImage(imageFile),
    segmentImage(imageFile),
  ]);
  return { classification, segmentation };
}

export function validateImage(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Upload a valid image (PNG, JPG, JPEG)' };
  }
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be under 10MB' };
  }
  return { valid: true };
}
