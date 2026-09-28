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

import React from 'react';
import { AlertTriangle, Info, TrendingUp, Stethoscope, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TumorInfo {
  name: string;
  description: string;
  prevalence: string;
  symptoms: string[];
  treatment: string;
  prognosis: string;
}

const tumorData: Record<string, TumorInfo> = {
  glioma: {
    name: 'Glioma',
    description: 'Gliomas are tumors that arise from glial cells, which support and protect neurons in the brain. They are the most common type of primary brain tumor.',
    prevalence: 'Accounts for ~33% of all brain tumors',
    symptoms: ['Headaches', 'Seizures', 'Memory problems', 'Personality changes', 'Vision issues'],
    treatment: 'Surgery, radiation therapy, chemotherapy, targeted drug therapy',
    prognosis: 'Varies significantly based on tumor grade and location',
  },
  meningioma: {
    name: 'Meningioma',
    description: 'Meningiomas develop from the meninges, the protective membranes surrounding the brain and spinal cord. Most are benign (non-cancerous).',
    prevalence: 'Most common primary brain tumor (~37%)',
    symptoms: ['Headaches', 'Weakness in limbs', 'Seizures', 'Vision problems', 'Speech difficulties'],
    treatment: 'Observation, surgery, radiation therapy',
    prognosis: 'Generally favorable; most are benign with good outcomes after treatment',
  },
  pituitary: {
    name: 'Pituitary Tumor',
    description: 'Pituitary tumors develop in the pituitary gland at the base of the brain. Most are benign adenomas that can affect hormone production.',
    prevalence: 'Accounts for ~17% of brain tumors',
    symptoms: ['Hormonal imbalances', 'Vision changes', 'Headaches', 'Fatigue', 'Mood changes'],
    treatment: 'Medication, surgery, radiation therapy',
    prognosis: 'Usually excellent; most are benign and treatable',
  },
  notumor: {
    name: 'No Tumor Detected',
    description: 'The MRI scan analysis indicates no tumor presence. However, always consult with a healthcare professional for proper diagnosis.',
    prevalence: 'N/A',
    symptoms: [],
    treatment: 'No treatment required based on this scan',
    prognosis: 'Excellent - no abnormalities detected',
  },
};

interface TumorInfoCardProps {
  tumorType: string | null;
}

const colorSchemes: Record<string, { border: string; bg: string; accent: string }> = {
  glioma: { border: 'border-destructive/30', bg: 'bg-destructive/5', accent: 'text-destructive' },
  meningioma: { border: 'border-warning/30', bg: 'bg-warning/5', accent: 'text-warning' },
  pituitary: { border: 'border-primary/30', bg: 'bg-primary/5', accent: 'text-primary' },
  notumor: { border: 'border-success/30', bg: 'bg-success/5', accent: 'text-success' },
};

const TumorInfoCard: React.FC<TumorInfoCardProps> = ({ tumorType }) => {
  if (!tumorType) {
    return (
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-6 h-6 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Tumor Information</h3>
        </div>
        <p className="text-muted-foreground">
          Analysis results will display detailed information about the detected condition.
        </p>
      </div>
    );
  }

  const info = tumorData[tumorType.toLowerCase()];
  const colors = colorSchemes[tumorType.toLowerCase()];

  if (!info) return null;

  return (
    <div className={cn(
      "rounded-xl border-2 p-6 shadow-card animate-fade-in",
      colors.border,
      colors.bg
    )}>
      <div className="flex items-center gap-3 mb-4">
        {tumorType.toLowerCase() === 'notumor' ? (
          <Shield className={cn("w-7 h-7", colors.accent)} />
        ) : (
          <AlertTriangle className={cn("w-7 h-7", colors.accent)} />
        )}
        <h3 className={cn("text-xl font-bold", colors.accent)}>{info.name}</h3>
      </div>

      <p className="text-foreground mb-6">{info.description}</p>

      <div className="space-y-4">
        {info.prevalence !== 'N/A' && (
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Prevalence</p>
              <p className="text-sm text-muted-foreground">{info.prevalence}</p>
            </div>
          </div>
        )}

        {info.symptoms.length > 0 && (
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Common Symptoms</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {info.symptoms.map((symptom, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Stethoscope className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Treatment Options</p>
            <p className="text-sm text-muted-foreground">{info.treatment}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Prognosis</p>
            <p className="text-sm text-muted-foreground">{info.prognosis}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This information is for educational purposes only. 
          Always consult with qualified healthcare professionals for medical advice and diagnosis.
        </p>
      </div>
    </div>
  );
};

export default TumorInfoCard;
