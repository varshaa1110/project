import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto text-black" id="resume-content">
      {/* Header */}
      <div className="text-center border-b-2 border-blue-600 pb-6 mb-6">
        <div className="flex items-center justify-center gap-6 mb-4">
          {data.personalInfo.profileImage && (
            <img
              src={data.personalInfo.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-3 border-blue-200"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.personalInfo.location}
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {data.personalInfo.website}
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            WORK EXPERIENCE
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                  <p className="text-gray-700 font-medium">{exp.company}, {exp.location}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.description && (
                <p className="text-gray-700 leading-relaxed mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.school}, {edu.location}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-sm text-gray-600">
                  {formatDate(edu.graduationDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-gray-600 text-sm">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;