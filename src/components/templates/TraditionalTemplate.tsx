import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TraditionalTemplateProps {
  data: ResumeData;
}

const TraditionalTemplate: React.FC<TraditionalTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto text-black" id="resume-content">
      {/* Header */}
      <div className="text-center border-b-4 border-gray-800 pb-6 mb-8">
        <div className="flex items-center justify-center gap-8 mb-4">
          {data.personalInfo.profileImage && (
            <img
              src={data.personalInfo.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              {data.personalInfo.email && (
                <div className="flex items-center justify-center gap-1">
                  <Mail className="w-4 h-4" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center justify-center gap-1">
                  <Phone className="w-4 h-4" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.personalInfo.location}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center justify-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Professional Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
                <p className="text-gray-700 font-semibold">{exp.company} | {exp.location}</p>
                <p className="text-gray-600 text-sm">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
              {exp.description && (
                <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4 text-center">
              <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
              <p className="text-gray-700 font-semibold">{edu.school} | {edu.location}</p>
              <p className="text-gray-600">{formatDate(edu.graduationDate)}</p>
              {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-center">
                <span className="text-gray-700 font-medium">{skill.name}</span>
                <div className="text-gray-600 text-sm">({skill.level})</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TraditionalTemplate;