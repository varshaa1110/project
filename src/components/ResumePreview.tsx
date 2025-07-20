import React from 'react';
import { ArrowLeft, Download, RotateCcw, FileImage, FileText, Image } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import TraditionalTemplate from './templates/TraditionalTemplate';

const ResumePreview: React.FC = () => {
  const { setCurrentStep, selectedTemplate, resumeData, resetResume } = useResume();

  const renderTemplate = () => {
    if (!selectedTemplate) return null;

    switch (selectedTemplate.category) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'traditional':
        return <TraditionalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      default:
        return <ClassicTemplate data={resumeData} />;
    }
  };

  const downloadResume = (format: 'pdf' | 'png' | 'jpeg' | 'jpg' = 'pdf') => {
    if (format === 'pdf') {
      window.print();
    } else {
      // For image formats, we'll use html2canvas
      const element = document.getElementById('resume-content');
      if (element) {
        import('html2canvas').then(html2canvas => {
          html2canvas.default(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
          }).then(canvas => {
            const link = document.createElement('a');
            link.download = `resume.${format}`;
            link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`);
            link.click();
          });
        });
      }
    }
  };

  const [showDownloadOptions, setShowDownloadOptions] = React.useState(false);

  const downloadOptions = [
    { format: 'pdf' as const, icon: <FileText className="w-4 h-4" />, label: 'PDF', description: 'Best for applications' },
    { format: 'png' as const, icon: <Image className="w-4 h-4" />, label: 'PNG', description: 'High quality image' },
    { format: 'jpeg' as const, icon: <FileImage className="w-4 h-4" />, label: 'JPEG', description: 'Compressed image' },
    { format: 'jpg' as const, icon: <FileImage className="w-4 h-4" />, label: 'JPG', description: 'Compressed image' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Preview Your Resume</h2>
          <p className="text-lg text-gray-600">Review your resume and download in your preferred format</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setCurrentStep(2)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Edit Details
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </button>
            
            {showDownloadOptions && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-200 z-10">
                {downloadOptions.map((option) => (
                  <button
                    key={option.format}
                    onClick={() => {
                      downloadResume(option.format);
                      setShowDownloadOptions(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {option.icon}
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={resetResume}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </button>
        </div>

        {/* Resume Preview */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
            {renderTemplate()}
          </div>
        </div>

        {/* Template Info */}
        {selectedTemplate && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Using <span className="font-semibold text-gray-900">{selectedTemplate.name}</span> template
            </p>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-content, #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .container, .max-w-4xl {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .bg-gradient-to-br {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;