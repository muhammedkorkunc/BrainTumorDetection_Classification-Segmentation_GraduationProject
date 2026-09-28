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
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  Stethoscope, 
  TrendingUp, 
  Brain,
  BookOpen,
  HeartPulse,
  Microscope,
  Pill,
  Users,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TumorData {
  name: string;
  overview: string;
  detailedDescription: string;
  prevalence: {
    percentage: string;
    demographics: string;
    ageGroup: string;
  };
  causes: string[];
  riskFactors: string[];
  symptoms: {
    early: string[];
    advanced: string[];
  };
  diagnosis: string[];
  treatmentOptions: {
    primary: string[];
    secondary: string[];
    emerging: string[];
  };
  prognosis: {
    general: string;
    survivalRates: string;
    factors: string[];
  };
  livingWith: string[];
  sources: string[];
}

const tumorDatabase: Record<string, TumorData> = {
  glioma: {
    name: 'Glioma',
    overview: 'Gliomas are tumors that originate from glial cells, the supportive tissue of the brain. They represent the most common type of primary malignant brain tumor and can range from low-grade (slow-growing) to high-grade (aggressive) forms.',
    detailedDescription: 'Glial cells are essential for maintaining the health and function of neurons in the central nervous system. When these cells undergo abnormal growth, they form gliomas. The World Health Organization (WHO) classifies gliomas into grades I through IV, with grade IV glioblastoma being the most aggressive form. Gliomas can occur in any part of the brain or spinal cord, and their symptoms depend largely on their location and rate of growth. These tumors arise from different types of glial cells, including astrocytes (astrocytomas), oligodendrocytes (oligodendrogliomas), and ependymal cells (ependymomas).',
    prevalence: {
      percentage: 'Accounts for approximately 33% of all brain tumors and 80% of malignant brain tumors',
      demographics: 'Slightly more common in males than females (ratio 1.4:1)',
      ageGroup: 'Most common in adults aged 45-65, though can occur at any age',
    },
    causes: [
      'Genetic mutations in glial cells leading to uncontrolled growth',
      'Inherited genetic syndromes (neurofibromatosis, Li-Fraumeni syndrome)',
      'Random DNA changes during cell division',
      'Chromosomal abnormalities including IDH mutations and 1p/19q codeletion',
    ],
    riskFactors: [
      'Previous radiation therapy to the head',
      'Family history of gliomas or genetic syndromes',
      'Age (risk increases with age)',
      'Exposure to certain industrial chemicals',
      'Compromised immune system',
    ],
    symptoms: {
      early: [
        'Persistent headaches, especially in the morning',
        'Seizures (often the first symptom)',
        'Subtle memory or concentration problems',
        'Mild personality or mood changes',
        'Nausea without clear cause',
      ],
      advanced: [
        'Progressive cognitive decline',
        'Vision changes or loss',
        'Speech difficulties (aphasia)',
        'Motor weakness or paralysis',
        'Balance and coordination problems',
        'Severe personality changes',
      ],
    },
    diagnosis: [
      'MRI with contrast enhancement (primary imaging modality)',
      'CT scan for initial assessment',
      'MR spectroscopy for metabolic analysis',
      'PET scan to assess tumor activity',
      'Stereotactic biopsy for tissue diagnosis',
      'Molecular testing (IDH, MGMT, 1p/19q status)',
    ],
    treatmentOptions: {
      primary: [
        'Surgical resection (maximal safe removal)',
        'Radiation therapy (external beam, stereotactic radiosurgery)',
        'Chemotherapy (Temozolomide is standard for high-grade gliomas)',
      ],
      secondary: [
        'Tumor treating fields (TTFields) for glioblastoma',
        'Bevacizumab for recurrent glioblastoma',
        'Carmustine wafers (Gliadel) implanted during surgery',
      ],
      emerging: [
        'Immunotherapy and checkpoint inhibitors',
        'CAR-T cell therapy (clinical trials)',
        'Targeted molecular therapies',
        'Vaccine-based approaches',
      ],
    },
    prognosis: {
      general: 'Prognosis varies significantly based on tumor grade, location, and molecular characteristics',
      survivalRates: 'Low-grade gliomas: 10-15+ years; High-grade (glioblastoma): median survival 15-18 months with treatment',
      factors: [
        'Tumor grade and histological type',
        'IDH mutation status (better prognosis if mutated)',
        'MGMT promoter methylation (better response to chemotherapy)',
        'Extent of surgical resection',
        'Patient age and performance status',
      ],
    },
    livingWith: [
      'Regular MRI monitoring every 2-3 months initially',
      'Cognitive rehabilitation therapy',
      'Anti-seizure medications if needed',
      'Psychological support and counseling',
      'Physical and occupational therapy',
      'Palliative care integration for symptom management',
    ],
    sources: [
      'National Cancer Institute (cancer.gov)',
      'Mayo Clinic (mayoclinic.org)',
      'American Brain Tumor Association (abta.org)',
      'WHO Classification of CNS Tumors',
    ],
  },
  meningioma: {
    name: 'Meningioma',
    overview: 'Meningiomas develop from the meninges, the protective membranes that surround the brain and spinal cord. They are the most common primary brain tumor, and the vast majority (approximately 80-90%) are benign and slow-growing.',
    detailedDescription: 'Meningiomas arise from arachnoid cap cells in the meninges and typically grow inward, pressing on the brain or spinal cord rather than invading it. They are classified by the WHO into three grades: Grade I (benign), Grade II (atypical), and Grade III (anaplastic/malignant). Most meningiomas are discovered incidentally during imaging for other conditions. While they can occur anywhere along the meninges, common locations include the cerebral convexities, parasagittal region, sphenoid wing, and posterior fossa. Their symptoms depend primarily on their location and size.',
    prevalence: {
      percentage: 'Accounts for approximately 37% of all primary brain tumors',
      demographics: 'Two to three times more common in women than men, possibly due to hormonal factors',
      ageGroup: 'Peak incidence between ages 40-70, rare in children',
    },
    causes: [
      'Sporadic genetic mutations in meningeal cells',
      'Loss of chromosome 22 (NF2 gene) in many cases',
      'Hormonal influences (estrogen and progesterone receptors present)',
      'Neurofibromatosis type 2 (genetic syndrome)',
    ],
    riskFactors: [
      'Prior radiation exposure to the head',
      'Neurofibromatosis type 2',
      'Female sex and hormonal factors',
      'Obesity',
      'Age (risk increases with age)',
    ],
    symptoms: {
      early: [
        'Gradual onset of headaches',
        'Subtle vision changes',
        'Mild hearing loss (if near auditory nerve)',
        'Memory difficulties',
        'Often asymptomatic (discovered incidentally)',
      ],
      advanced: [
        'Seizures',
        'Weakness in limbs',
        'Significant vision loss or double vision',
        'Speech difficulties',
        'Personality changes',
        'Loss of smell (anosmia)',
      ],
    },
    diagnosis: [
      'MRI with gadolinium contrast (shows characteristic "dural tail" sign)',
      'CT scan showing calcifications',
      'Cerebral angiography for surgical planning',
      'Biopsy for grading (if surgery not immediately planned)',
      'Hormone receptor testing',
    ],
    treatmentOptions: {
      primary: [
        'Observation with serial imaging for small, asymptomatic tumors',
        'Surgical resection (often curative for Grade I)',
        'Stereotactic radiosurgery (Gamma Knife, CyberKnife)',
      ],
      secondary: [
        'Fractionated radiation therapy for larger tumors',
        'Embolization before surgery to reduce blood supply',
        'Hormone therapy (investigational)',
      ],
      emerging: [
        'Targeted therapies for atypical and malignant types',
        'Somatostatin receptor-targeted treatments',
        'Clinical trials for recurrent meningiomas',
      ],
    },
    prognosis: {
      general: 'Excellent prognosis for Grade I meningiomas; more guarded for higher grades',
      survivalRates: 'Grade I: 10-year survival >90%; Grade II: 5-year survival ~80%; Grade III: median survival 2-3 years',
      factors: [
        'Tumor grade (most important factor)',
        'Completeness of surgical resection',
        'Tumor location and accessibility',
        'Patient age and overall health',
        'Ki-67 proliferation index',
      ],
    },
    livingWith: [
      'Regular surveillance MRI (annually for stable tumors)',
      'Monitoring for recurrence, especially after incomplete resection',
      'Management of residual neurological deficits',
      'Support groups for brain tumor patients',
      'Generally excellent quality of life after treatment',
    ],
    sources: [
      'National Cancer Institute (cancer.gov)',
      'Mayo Clinic (mayoclinic.org)',
      'American Association of Neurological Surgeons (aans.org)',
      'European Association of Neuro-Oncology (EANO)',
    ],
  },
  pituitary: {
    name: 'Pituitary Tumor (Pituitary Adenoma)',
    overview: 'Pituitary tumors develop in the pituitary gland, a pea-sized organ at the base of the brain that controls hormone production. Most pituitary tumors are benign adenomas that can cause problems through hormone overproduction or by pressing on nearby structures.',
    detailedDescription: 'The pituitary gland, often called the "master gland," produces hormones that regulate many body functions including growth, metabolism, reproduction, and stress response. Pituitary adenomas are classified as functioning (hormone-secreting) or non-functioning, and by size as microadenomas (<10mm) or macroadenomas (≥10mm). Functioning adenomas cause specific syndromes depending on which hormone is overproduced: prolactinomas (prolactin), acromegaly/gigantism (growth hormone), Cushing\'s disease (ACTH), or hyperthyroidism (TSH). Non-functioning adenomas typically present with symptoms of mass effect.',
    prevalence: {
      percentage: 'Accounts for approximately 17% of primary brain tumors; found in up to 20% of autopsies',
      demographics: 'Equal distribution between males and females overall; prolactinomas more common in women',
      ageGroup: 'Most commonly diagnosed between ages 30-60',
    },
    causes: [
      'Spontaneous genetic mutations in pituitary cells',
      'Multiple Endocrine Neoplasia type 1 (MEN1) syndrome',
      'Carney complex',
      'Familial isolated pituitary adenoma (FIPA)',
    ],
    riskFactors: [
      'Family history of MEN1 or other genetic syndromes',
      'No clearly established environmental risk factors',
      'Most cases occur sporadically without identifiable risk factors',
    ],
    symptoms: {
      early: [
        'Headaches',
        'Vision changes (especially peripheral vision loss)',
        'Fatigue and weakness',
        'Menstrual irregularities or infertility in women',
        'Decreased libido or erectile dysfunction in men',
      ],
      advanced: [
        'Severe visual field defects (bitemporal hemianopia)',
        'Hormonal syndromes (Cushing\'s, acromegaly)',
        'Hypopituitarism (deficiency of multiple hormones)',
        'Galactorrhea (abnormal milk production)',
        'Pituitary apoplexy (sudden hemorrhage - emergency)',
      ],
    },
    diagnosis: [
      'MRI of the sella turcica (pituitary region)',
      'Comprehensive hormone panel (prolactin, GH, IGF-1, ACTH, cortisol, TSH, FSH, LH)',
      'Visual field testing (perimetry)',
      'Dynamic hormone testing for specific syndromes',
      'Genetic testing if familial syndrome suspected',
    ],
    treatmentOptions: {
      primary: [
        'Medication (dopamine agonists for prolactinomas - often first-line)',
        'Transsphenoidal surgery (through the nose/sinuses)',
        'Observation for small, non-functioning incidentalomas',
      ],
      secondary: [
        'Radiation therapy (stereotactic or conventional)',
        'Somatostatin analogs for growth hormone-secreting tumors',
        'Hormone replacement therapy for hypopituitarism',
      ],
      emerging: [
        'Temozolomide for aggressive pituitary tumors',
        'Targeted molecular therapies',
        'Novel medical therapies for resistant cases',
      ],
    },
    prognosis: {
      general: 'Excellent prognosis for most pituitary adenomas; considered benign with high cure rates',
      survivalRates: 'Life expectancy generally normal with appropriate treatment; malignant pituitary carcinoma is extremely rare (<0.2%)',
      factors: [
        'Tumor size and invasiveness',
        'Hormone type secreted',
        'Completeness of surgical resection',
        'Response to medical therapy',
        'Presence of cavernous sinus invasion',
      ],
    },
    livingWith: [
      'Lifelong hormone level monitoring',
      'Hormone replacement therapy if needed',
      'Regular MRI surveillance',
      'Ophthalmology follow-up for visual field monitoring',
      'Excellent quality of life with proper management',
      'Support from endocrinology specialists',
    ],
    sources: [
      'National Cancer Institute (cancer.gov)',
      'Pituitary Society (pituitarysociety.org)',
      'Endocrine Society (endocrine.org)',
      'Mayo Clinic (mayoclinic.org)',
    ],
  },
  notumor: {
    name: 'No Tumor Detected',
    overview: 'The AI analysis of your MRI scan has not detected the presence of a brain tumor. This is a positive finding, though it is important to follow up with healthcare professionals for comprehensive evaluation.',
    detailedDescription: 'The classification model has analyzed the MRI image and determined that the scan does not show characteristics consistent with glioma, meningioma, or pituitary tumors. However, this automated analysis has limitations and should not replace professional medical evaluation. MRI scans can be performed for various reasons including headaches, seizures, or routine screening, and a negative tumor finding addresses only one aspect of brain health.',
    prevalence: {
      percentage: 'N/A - This indicates absence of tumor findings',
      demographics: 'N/A',
      ageGroup: 'N/A',
    },
    causes: [],
    riskFactors: [],
    symptoms: {
      early: [],
      advanced: [],
    },
    diagnosis: [
      'This scan suggests no tumor is present',
      'Continue with any recommended follow-up imaging',
      'Discuss results with your healthcare provider',
      'Additional tests may be needed based on symptoms',
    ],
    treatmentOptions: {
      primary: [
        'No tumor-specific treatment required based on this finding',
      ],
      secondary: [
        'Address any underlying symptoms with your physician',
        'Follow recommended health maintenance schedules',
      ],
      emerging: [],
    },
    prognosis: {
      general: 'Excellent - no abnormalities detected by the classification model',
      survivalRates: 'N/A - Normal finding',
      factors: [
        'Overall brain health',
        'Continued monitoring if symptoms persist',
      ],
    },
    livingWith: [
      'Maintain regular health check-ups',
      'Report any new or persistent neurological symptoms to your doctor',
      'Follow a healthy lifestyle for brain health',
      'Consider follow-up imaging if recommended by your physician',
    ],
    sources: [
      'American Academy of Neurology (aan.com)',
      'National Institute of Neurological Disorders and Stroke (ninds.nih.gov)',
    ],
  },
};

interface TumorInfoSectionProps {
  tumorType: string;
}

const TumorInfoSection: React.FC<TumorInfoSectionProps> = ({ tumorType }) => {
  const data = tumorDatabase[tumorType.toLowerCase()];
  
  if (!data) return null;

  const isNoTumor = tumorType.toLowerCase() === 'notumor';
  const accentColor = isNoTumor ? 'text-success' : 'text-primary';
  const bgColor = isNoTumor ? 'bg-success/10' : 'bg-primary/10';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4", bgColor)}>
          <BookOpen className={cn("w-5 h-5", accentColor)} />
          <span className={cn("font-medium", accentColor)}>Medical Information</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Understanding {data.name}
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Comprehensive information sourced from trusted medical institutions including the National Cancer Institute, Mayo Clinic, and peer-reviewed research.
        </p>
      </div>

      {/* Overview Card */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0", bgColor)}>
            {isNoTumor ? (
              <Shield className={cn("w-7 h-7", accentColor)} />
            ) : (
              <Brain className={cn("w-7 h-7", accentColor)} />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{data.overview}</p>
          </div>
        </div>
        <p className="text-foreground leading-relaxed">{data.detailedDescription}</p>
      </div>

      {!isNoTumor && (
        <>
          {/* Prevalence Section */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Prevalence & Demographics</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Occurrence Rate</p>
                <p className="text-foreground font-medium">{data.prevalence.percentage}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Demographics</p>
                <p className="text-foreground font-medium">{data.prevalence.demographics}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Age Distribution</p>
                <p className="text-foreground font-medium">{data.prevalence.ageGroup}</p>
              </div>
            </div>
          </div>

          {/* Causes & Risk Factors */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Microscope className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Causes</h3>
              </div>
              <ul className="space-y-3">
                {data.causes.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Risk Factors</h3>
              </div>
              <ul className="space-y-3">
                {data.riskFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Signs & Symptoms</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-warning" />
                  Early Symptoms
                </h4>
                <ul className="space-y-2">
                  {data.symptoms.early.map((symptom, idx) => (
                    <li key={idx} className="text-muted-foreground pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-warning">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive" />
                  Advanced Symptoms
                </h4>
                <ul className="space-y-2">
                  {data.symptoms.advanced.map((symptom, idx) => (
                    <li key={idx} className="text-muted-foreground pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-destructive">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Treatment Options */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Pill className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Treatment Options</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-muted/50">
                <h4 className="font-semibold text-foreground mb-4">Primary Treatments</h4>
                <ul className="space-y-2">
                  {data.treatmentOptions.primary.map((treatment, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-muted/50">
                <h4 className="font-semibold text-foreground mb-4">Secondary Treatments</h4>
                <ul className="space-y-2">
                  {data.treatmentOptions.secondary.map((treatment, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>
              {data.treatmentOptions.emerging.length > 0 && (
                <div className="p-6 rounded-xl bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-4">Emerging Therapies</h4>
                  <ul className="space-y-2">
                    {data.treatmentOptions.emerging.map((treatment, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {treatment}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Prognosis */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Prognosis & Outlook</h3>
            </div>
            <div className="space-y-4">
              <p className="text-foreground">{data.prognosis.general}</p>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Survival Statistics</p>
                <p className="text-foreground font-medium">{data.prognosis.survivalRates}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Factors Affecting Prognosis:</p>
                <div className="flex flex-wrap gap-2">
                  {data.prognosis.factors.map((factor, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Living With / Follow-up */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            {isNoTumor ? 'Recommended Follow-Up' : 'Living With This Condition'}
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.livingWith.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="bg-muted/30 rounded-2xl p-6 border border-border">
        <p className="text-sm font-medium text-foreground mb-3">Medical Information Sources:</p>
        <div className="flex flex-wrap gap-2">
          {data.sources.map((source, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-full bg-background text-muted-foreground text-sm border border-border">
              {source}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          <strong>Important:</strong> This information is provided for educational purposes only and should not replace professional medical advice. 
          Always consult qualified healthcare providers for diagnosis, treatment decisions, and medical care.
        </p>
      </div>
    </div>
  );
};

export default TumorInfoSection;
