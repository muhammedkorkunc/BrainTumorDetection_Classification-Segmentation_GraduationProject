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

import React, { useCallback, useState } from 'react';
import { Download, Maximize2, Layers, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SegmentationSectionProps {
  originalImage: string;
  segmentationMask: string;
  tumorType: string;
}

const SegmentationSection: React.FC<SegmentationSectionProps> = ({
  originalImage,
  segmentationMask,
  tumorType,
}) => {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = segmentationMask;
    link.download = `tumor-segmentation-${tumorType}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Segmentation mask downloaded');
  }, [segmentationMask, tumorType]);

  const isNoTumor = tumorType.toLowerCase() === 'notumor';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
          <Layers className="w-5 h-5" />
          <span className="font-medium">Segmentation Results</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Tumor Segmentation Mask
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isNoTumor 
            ? 'The segmentation model did not detect any tumor regions in the MRI scan.'
            : 'The segmentation model has identified and outlined the tumor region in your MRI scan. The highlighted area shows the detected tumor boundaries.'}
        </p>
      </div>

      {/* Image Comparison */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Original Image */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Original MRI Scan</h3>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-border bg-black/90">
              <img 
                src={originalImage} 
                alt="Original MRI scan" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Segmentation Result */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">Segmentation Mask</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOverlay(!showOverlay)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                {showOverlay ? 'Show Mask Only' : 'Show Overlay'}
              </Button>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-border bg-black/90">
              {showOverlay && (
                <img 
                  src={originalImage} 
                  alt="Original MRI scan" 
                  className="w-full h-auto object-contain"
                />
              )}
              <img 
                src={segmentationMask} 
                alt="Segmentation mask overlay" 
                className={cn(
                  "w-full h-auto object-contain",
                  showOverlay && "absolute inset-0 mix-blend-screen opacity-80"
                )}
              />
              {!isNoTumor && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-gradient-to-r from-red-500 to-yellow-500" />
                    <span className="text-sm text-foreground">Detected tumor region</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Download Segmentation Results</h3>
            <p className="text-muted-foreground">
              Save the segmentation mask for your records or to share with your healthcare provider.
            </p>
          </div>
          <Button 
            onClick={handleDownload}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground min-w-[200px]"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Mask
          </Button>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Model Architecture</p>
          <p className="text-foreground font-medium">U-Net with ResNet Encoder</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Segmentation Type</p>
          <p className="text-foreground font-medium">Binary Tumor Mask</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Output Format</p>
          <p className="text-foreground font-medium">PNG with Transparency</p>
        </div>
      </div>
    </div>
  );
};

export default SegmentationSection;
