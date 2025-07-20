import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, Trash2, User, Briefcase, GraduationCap, Award, Camera } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Experience, Education, Skill } from '../types/resume';

const ResumeForm: React.FC = () => {
  const { setCurrentStep, resumeData, updateResumeData } = useResume();
  const [activeSection, setActiveSection] = useState('personal');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateResumeData({
          personalInfo: { ...resumeData.personalInfo, profileImage: result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    updateResumeData({
      experience: [...resumeData.experience, newExp],
    });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    updateResumeData({
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    updateResumeData({
      experience: resumeData.experience.filter(exp => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
    };
    updateResumeData({
      education: [...resumeData.education, newEdu],
    });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    updateResumeData({
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    updateResumeData({
      education: resumeData.education.filter(edu => edu.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
    };
    updateResumeData({
      skills: [...resumeData.skills, newSkill],
    });
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    updateResumeData({
      skills: resumeData.skills.map(skill =>
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    updateResumeData({
      skills: resumeData.skills.filter(skill => skill.id !== id),
    });
  };

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { id: 'experience', name: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'education', name: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'skills', name: 'Skills', icon: <Award className="w-5 h-5" /> },
  ];

  const isFormValid = () => {
    return (
      resumeData.personalInfo.fullName &&
      resumeData.personalInfo.email &&
      resumeData.experience.length > 0 &&
      resumeData.education.length > 0
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Fill Your Details</h2>
          <p className="text-lg text-gray-600">Complete each section to build your resume</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {section.icon}
                {section.name}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            {/* Personal Information */}
            {activeSection === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                
                {/* Profile Picture Upload */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {resumeData.personalInfo.profileImage ? (
                        <img
                          src={resumeData.personalInfo.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: { ...resumeData.personalInfo, fullName: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: { ...resumeData.personalInfo, email: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: { ...resumeData.personalInfo, phone: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: { ...resumeData.personalInfo, location: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={resumeData.personalInfo.website}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: { ...resumeData.personalInfo, website: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) =>
                        updateResumeData({
                          personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    value={resumeData.summary}
                    onChange={(e) => updateResumeData({ summary: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write a brief summary of your professional background and goals..."
                  />
                </div>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900">Work Experience</h3>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </button>
                </div>
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Experience {index + 1}</h4>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                        placeholder="Job Title"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="Company"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        placeholder="Location"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex gap-2">
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          disabled={exp.current}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                          className="rounded"
                        />
                        Currently working here
                      </label>
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
                {resumeData.experience.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No work experience added yet. Click "Add Experience" to get started.</p>
                  </div>
                )}
              </div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900">Education</h3>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Education
                  </button>
                </div>
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Education {index + 1}</h4>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="Degree/Certification"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                        placeholder="School/Institution"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                        placeholder="Location"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="month"
                        value={edu.graduationDate}
                        onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                        placeholder="GPA (optional)"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
                {resumeData.education.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No education added yet. Click "Add Education" to get started.</p>
                  </div>
                )}
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900">Skills</h3>
                  <button
                    onClick={addSkill}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                        placeholder="Skill name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, { level: e.target.value as Skill['level'] })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {resumeData.skills.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No skills added yet. Click "Add Skill" to get started.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              disabled={!isFormValid()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isFormValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Preview
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;