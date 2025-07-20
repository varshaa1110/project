import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Home, Layout, FileText, Eye } from 'lucide-react';

const ProgressIndicator: React.FC = () => {
  const { currentStep } = useResume();

  const steps = [
    { id: 0, name: 'Welcome', icon: <Home className="w-5 h-5" /> },
    { id: 1, name: 'Template', icon: <Layout className="w-5 h-5" /> },
    { id: 2, name: 'Details', icon: <FileText className="w-5 h-5" /> },
    { id: 3, name: 'Preview', icon: <Eye className="w-5 h-5" /> },
  ];

  if (currentStep === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentStep === step.id
                  ? 'bg-blue-100 text-blue-700'
                  : currentStep > step.id
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  currentStep === step.id
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : currentStep > step.id
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-gray-300'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </div>
                <span className="font-medium hidden sm:block">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 transition-all duration-200 ${
                  currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;