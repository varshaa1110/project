import React from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import HomePage from './components/HomePage';
import TemplateSelection from './components/TemplateSelection';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import ProgressIndicator from './components/ProgressIndicator';

const ResumeBuilderContent: React.FC = () => {
  const { currentStep } = useResume();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <HomePage />;
      case 1:
        return <TemplateSelection />;
      case 2:
        return <ResumeForm />;
      case 3:
        return <ResumePreview />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <ProgressIndicator />
      <div className={currentStep > 0 ? 'pt-20' : ''}>
        {renderCurrentStep()}
      </div>
    </div>
  );
};

function App() {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
}

export default App;