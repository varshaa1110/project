import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Star } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillStars = (level: string) => {
    switch (level) {
      case 'Beginner': return 1;
      case 'Intermediate': return 2;
      case 'Advanced': return 3;
      case 'Expert': return 4;
      default: return 2;
    }
  };

  return (
    <div className="bg-white max-w-4xl mx-auto text-black" id="resume-content">
      <div className="grid md:grid-cols-3">
        {/* Left Sidebar */}
        <div className="bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              {data.personalInfo.profileImage ? (
                <img
                  src={data.personalInfo.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold">
                  {data.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName}</h1>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">CONTACT</h2>
            <div className="space-y-3 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {data.personalInfo.location}
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="break-all">Website</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">SKILLS</h2>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < getSkillStars(skill.level)
                              ? 'text-yellow-400 fill-current'
                              : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 p-8">
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 relative">
                ABOUT ME
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600"></div>
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 relative">
                EXPERIENCE
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600"></div>
              </h2>
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative mb-6">
                  {/* Timeline dot */}
                  <div className="absolute -left-4 top-2 w-3 h-3 bg-purple-600 rounded-full"></div>
                  {index < data.experience.length - 1 && (
                    <div className="absolute -left-3.5 top-5 w-0.5 h-full bg-purple-200"></div>
                  )}
                  
                  <div className="pl-6">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.jobTitle}</h3>
                      <p className="text-purple-700 font-semibold mb-1">{exp.company}</p>
                      <p className="text-gray-600 text-sm mb-2">
                        {exp.location} • {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 relative">
                EDUCATION
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600"></div>
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-purple-700 font-semibold">{edu.school}</p>
                  <p className="text-gray-600 text-sm">
                    {edu.location} • {formatDate(edu.graduationDate)}
                  </p>
                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;