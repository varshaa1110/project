import React from 'react';
import { FileText, Zap, Download, Star, Palette, Users, Award } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const CVfyLogo: React.FC = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
        <div className="text-white font-bold text-xl">CV</div>
      </div>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-white font-bold text-xs">fy</div>
      </div>
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-gray-800 bg-clip-text text-transparent">
      CVfy
    </span>
  </div>
);

const HomePage: React.FC = () => {
  const { setCurrentStep } = useResume();

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: 'ATS-Friendly Templates',
      description: 'Choose from 8+ professionally designed templates optimized for applicant tracking systems',
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: 'Smart Builder',
      description: 'Build your resume in minutes with our intelligent form and real-time preview',
    },
    {
      icon: <Download className="w-8 h-8 text-purple-600" />,
      title: 'Multiple Formats',
      description: 'Download your resume in PDF, PNG, JPEG, or JPG formats',
    },
    {
      icon: <Palette className="w-8 h-8 text-indigo-600" />,
      title: 'Customizable Design',
      description: 'Change templates anytime and customize colors to match your style',
    },
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      title: 'Profile Pictures',
      description: 'Add professional photos to make your resume stand out',
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: 'Industry Specific',
      description: 'Templates designed for different industries and career levels',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <CVfyLogo />
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-gray-800 bg-clip-text text-transparent block">
              Resume
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Build ATS-friendly resumes that get noticed by recruiters. 
            Choose from 8+ professional templates and customize to your needs.
          </p>
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold 
                     hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 
                     shadow-lg hover:shadow-xl"
          >
            Start Building Now
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                       border border-gray-100 hover:border-gray-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex justify-center items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 text-lg mb-2">
            "The best resume builder I've ever used. Got me interviews within days!"
          </p>
          <p className="text-sm text-gray-500">- Sarah Johnson, Marketing Manager at Tech Corp</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;