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
import { Brain, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl gradient-medical">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">NeuroScan AI</h1>
              <p className="text-xs text-muted-foreground">MRI Brain Tumor Analysis</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#analysis"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Analysis
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Github className="w-5 h-5 text-secondary-foreground" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
