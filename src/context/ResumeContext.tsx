import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, Template } from '../types/resume';

interface ResumeContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template) => void;
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  resetResume: () => void;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    profileImage: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  const resetResume = () => {
    setCurrentStep(0);
    setSelectedTemplate(null);
    setResumeData(defaultResumeData);
  };

  return (
    <ResumeContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedTemplate,
        setSelectedTemplate,
        resumeData,
        updateResumeData,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};