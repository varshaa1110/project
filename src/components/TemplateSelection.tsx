import React from 'react';
import { ArrowLeft, ArrowRight, Palette, Briefcase, Sparkles, Building, GraduationCap, Lightbulb } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { templates } from '../data/templates';

const TemplateSelection: React.FC = () => {
  const { setCurrentStep, selectedTemplate, setSelectedTemplate } = useResume();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'classic':
        return <Briefcase className="w-6 h-6" />;
      case 'modern':
        return <Palette className="w-6 h-6" />;
      case 'traditional':
        return <Building className="w-6 h-6" />;
      case 'creative':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Briefcase className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'classic':
        return 'from-blue-600 to-blue-800';
      case 'modern':
        return 'from-teal-600 to-teal-800';
      case 'traditional':
        return 'from-gray-600 to-gray-800';
      case 'creative':
        return 'from-purple-600 to-purple-800';
      default:
        return 'from-blue-600 to-blue-800';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'classic':
        return 'Professional designs perfect for corporate and business roles';
      case 'modern':
        return 'Contemporary layouts ideal for tech and startup environments';
      case 'traditional':
        return 'Conservative formats for formal industries like law and finance';
      case 'creative':
        return 'Unique designs for creative professionals and designers';
      default:
        return 'Professional resume templates';
    }
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof templates>);

  const handleNext = () => {
    if (selectedTemplate) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a template that matches your industry and personal style. All templates are ATS-friendly and can be changed anytime.
          </p>
        </div>

        {/* Category Sections */}
        {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
          <div key={category} className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(category)} text-white`}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 capitalize">{category} Templates</h3>
              </div>
              <p className="text-gray-600 max-w-xl mx-auto">
                {getCategoryDescription(category)}
              </p>
            </div>

            {/* Templates Grid for this category */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {categoryTemplates.map((template) => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => setSelectedTemplate(template)}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 
                     transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedTemplate}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
              selectedTemplate
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface TemplateCardProps {
  template: any;
  isSelected: boolean;
  onSelect: () => void;
  getCategoryColor: (category: string) => string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect, getCategoryColor }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
               cursor-pointer border-2 overflow-hidden ${
                 isSelected
                   ? 'border-blue-500 ring-4 ring-blue-100 transform scale-105'
                   : 'border-gray-200 hover:border-gray-300'
               }`}
      onClick={onSelect}
    >
      {/* Template Preview */}
      <div className={`h-40 bg-gradient-to-br ${getCategoryColor(template.category)} p-4 text-white relative`}>
        <div className="flex items-center justify-between mb-3">
          <div className="w-4 h-4 bg-white/30 rounded-full"></div>
          {isSelected && (
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-white/40 rounded w-3/4"></div>
          <div className="h-1.5 bg-white/30 rounded w-1/2"></div>
          <div className="h-1.5 bg-white/30 rounded w-2/3"></div>
          <div className="mt-3 space-y-1">
            <div className="h-1 bg-white/25 rounded w-full"></div>
            <div className="h-1 bg-white/25 rounded w-4/5"></div>
            <div className="h-1 bg-white/25 rounded w-3/4"></div>
          </div>
        </div>
        
        {/* ATS Badge */}
        <div className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium">ATS</span>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h4>
        <p className="text-gray-600 text-sm mb-2">{template.description}</p>
        <p className="text-xs text-gray-500">{template.preview}</p>
      </div>
    </div>
  );
};

export default TemplateSelection;