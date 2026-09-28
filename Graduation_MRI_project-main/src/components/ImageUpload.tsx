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
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage, onClear }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleClear = () => {
    setPreview(null);
    onClear();
  };

  return (
    <div className="w-full">
      {!selectedImage ? (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300",
            isDragOver 
              ? "border-primary bg-medical-blue-light scale-[1.02]" 
              : "border-border bg-card hover:border-primary hover:bg-medical-blue-light/50"
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className={cn(
              "p-4 rounded-full mb-4 transition-all duration-300",
              isDragOver ? "bg-primary" : "bg-medical-blue-light"
            )}>
              <Upload className={cn(
                "w-8 h-8 transition-colors duration-300",
                isDragOver ? "text-primary-foreground" : "text-primary"
              )} />
            </div>
            <p className="mb-2 text-lg font-semibold text-foreground">
              {isDragOver ? "Drop your MRI scan here" : "Upload MRI Brain Scan"}
            </p>
            <p className="text-sm text-muted-foreground">
              Drag and drop or click to browse
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Supports: PNG, JPG, JPEG (Max 10MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </label>
      ) : (
        <div className="relative w-full rounded-xl overflow-hidden shadow-elevated bg-card animate-fade-in">
          <div className="aspect-square max-h-80 w-full flex items-center justify-center bg-muted/50 p-4">
            <img
              src={preview || ''}
              alt="Uploaded MRI scan"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-3 right-3"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground truncate max-w-xs">
                  {selectedImage.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
