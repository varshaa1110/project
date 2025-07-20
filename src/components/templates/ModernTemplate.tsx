import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillBarWidth = (level: string) => {
    switch (level) {
      case 'Beginner': return '25%';
      case 'Intermediate': return '50%';
      case 'Advanced': return '75%';
      case 'Expert': return '100%';
      default: return '50%';
    }
  };

  return (
    <div className="bg-white max-w-4xl mx-auto text-black" id="resume-content">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="flex items-center gap-6 mb-4">
          {data.personalInfo.profileImage && (
            <img
              src={data.personalInfo.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            {data.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {data.personalInfo.phone}
              </div>
            )}
          </div>
          <div className="space-y-2">
            {data.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {data.personalInfo.website}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <div className="w-8 h-1 bg-blue-600 mr-4"></div>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Experience */}
            {data.experience.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                  <div className="w-8 h-1 bg-blue-600 mr-4"></div>
                  Work Experience
                </h2>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-6 pl-4 border-l-2 border-blue-200">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-blue-700 font-semibold">{exp.company}</p>
                      <p className="text-gray-600 text-sm">{exp.location}</p>
                      <p className="text-gray-500 text-sm">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                  <div className="w-8 h-1 bg-blue-600 mr-4"></div>
                  Education
                </h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4 pl-4 border-l-2 border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-700 font-semibold">{edu.school}</p>
                    <p className="text-gray-600 text-sm">{edu.location}</p>
                    <p className="text-gray-500 text-sm">{formatDate(edu.graduationDate)}</p>
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                <div className="w-8 h-1 bg-blue-600 mr-4"></div>
                Skills
              </h2>
              <div className="space-y-4">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-800 font-medium">{skill.name}</span>
                      <span className="text-gray-600 text-sm">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: getSkillBarWidth(skill.level) }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;