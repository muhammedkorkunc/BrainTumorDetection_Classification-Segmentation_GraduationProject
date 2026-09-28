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

import React, { useState } from 'react';
import { Brain, Scan, Shield, Zap, Download } from 'lucide-react';
import Header from '@/components/Header';
import ImageUpload from '@/components/ImageUpload';
import AnalysisResults from '@/components/AnalysisResults';
import TumorInfoSection from '@/components/TumorInfoSection';
import SegmentationSection from '@/components/SegmentationSection';
import { Button } from '@/components/ui/button';
import { analyzeImage, validateImage } from '@/lib/modelService';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [classification, setClassification] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [segmentationMask, setSegmentationMask] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    const validation = validateImage(file);
    if (!validation.valid) {
      toast({
        title: 'Invalid Image',
        description: validation.error,
        variant: 'destructive',
      });
      return;
    }
    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
    
    setClassification(null);
    setConfidence(null);
    setSegmentationMask(null);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setClassification(null);
    setConfidence(null);
    setSegmentationMask(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(selectedImage);
      
      setClassification(result.classification.class);
      setConfidence(result.classification.confidence);
      setSegmentationMask(result.segmentation.maskBase64);
      
      toast({
        title: 'Analysis Complete',
        description: `Detected: ${result.classification.class} with ${result.classification.confidence.toFixed(1)}% confidence`,
      });
    } catch (error) {
      toast({
        title: 'Analysis Failed',
        description: 'There was an error processing your image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Graduation Project - AI-Powered Diagnosis
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Brain Tumor Detection &<br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Segmentation System</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Upload an MRI brain scan for instant AI-powered classification and segmentation. 
              Identify Glioma, Meningioma, Pituitary tumors, or confirm healthy brain tissue.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-sm border border-border">
                <Scan className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Deep Learning Classification</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-sm border border-border">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-foreground">Instant Segmentation</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-sm border border-border">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-foreground">98% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="analysis" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Scan className="w-5 h-5 text-primary" />
                Upload MRI Scan
              </h2>
              <ImageUpload
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onClear={handleClear}
              />
              
              {selectedImage && (
                <div className="mt-6">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Scan className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        Analyze Scan
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Classification Results */}
      {(classification || isAnalyzing) && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <AnalysisResults
              classification={classification}
              confidence={confidence}
              segmentationMask={segmentationMask}
              isLoading={isAnalyzing}
            />
          </div>
        </section>
      )}

      {/* Detailed Tumor Information */}
      {classification && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <TumorInfoSection tumorType={classification} />
          </div>
        </section>
      )}

      {/* Segmentation Results with Download */}
      {classification && segmentationMask && imagePreview && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SegmentationSection
              originalImage={imagePreview}
              segmentationMask={segmentationMask}
              tumorType={classification}
            />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">NeuroScan AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Graduation Project 2024 • For Educational Purposes Only
            </p>
            <p className="text-xs text-muted-foreground">
              Medical data sourced from National Cancer Institute, Mayo Clinic, and peer-reviewed literature. Not for clinical diagnosis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
