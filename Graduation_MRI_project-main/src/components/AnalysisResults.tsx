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
import { Brain, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResultsProps {
  classification: string | null;
  confidence: number | null;
  segmentationMask: string | null;
  isLoading: boolean;
}

const classificationColors: Record<string, { bg: string; text: string; icon: string }> = {
  glioma: { bg: 'bg-destructive/10', text: 'text-destructive', icon: 'text-destructive' },
  meningioma: { bg: 'bg-warning/10', text: 'text-warning', icon: 'text-warning' },
  pituitary: { bg: 'bg-primary/10', text: 'text-primary', icon: 'text-primary' },
  notumor: { bg: 'bg-success/10', text: 'text-success', icon: 'text-success' },
};

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  classification,
  confidence,
  segmentationMask,
  isLoading,
}) => {
  const colorScheme = classification ? classificationColors[classification.toLowerCase()] : null;

  if (isLoading) {
    return (
      <div className="w-full space-y-6 animate-fade-in">
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 animate-pulse" />
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-scan-line" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground font-medium">Processing MRI scan...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!classification) {
    return (
      <div className="w-full bg-card rounded-xl p-8 shadow-card text-center">
        <Brain className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis Yet</h3>
        <p className="text-muted-foreground">Upload an MRI scan to begin analysis</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Classification Result */}
      <div className={cn("rounded-xl p-6 shadow-card", colorScheme?.bg || 'bg-card')}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {classification.toLowerCase() === 'notumor' ? (
              <CheckCircle className={cn("w-8 h-8", colorScheme?.icon)} />
            ) : (
              <AlertCircle className={cn("w-8 h-8", colorScheme?.icon)} />
            )}
            <div>
              <p className="text-sm text-muted-foreground">Classification Result</p>
              <h3 className={cn("text-2xl font-bold capitalize", colorScheme?.text)}>
                {classification === 'notumor' ? 'No Tumor Detected' : classification}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Confidence</p>
            <p className={cn("text-2xl font-bold", colorScheme?.text)}>
              {confidence?.toFixed(1)}%
            </p>
          </div>
        </div>
        
        {/* Confidence Bar */}
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              classification.toLowerCase() === 'notumor' ? 'bg-success' :
              classification.toLowerCase() === 'glioma' ? 'bg-destructive' :
              classification.toLowerCase() === 'meningioma' ? 'bg-warning' : 'bg-primary'
            )}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Segmentation Result */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Segmentation Mask</h3>
        </div>
        <div className="aspect-square max-h-64 w-full bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
          {segmentationMask ? (
            <img
              src={segmentationMask}
              alt="Segmentation mask"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-center p-4">
              <Brain className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                Segmentation mask will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
