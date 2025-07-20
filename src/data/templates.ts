import { Template } from '../types/resume';

export const templates: Template[] = [
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    description: 'ATS-friendly traditional design perfect for corporate roles',
    preview: 'Clean, scannable layout optimized for applicant tracking systems',
    category: 'classic',
  },
  {
    id: 'classic-executive',
    name: 'Classic Executive',
    description: 'Premium traditional layout for senior positions',
    preview: 'Sophisticated design with elegant typography and clear hierarchy',
    category: 'classic',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean contemporary design with ATS compatibility',
    preview: 'Minimalist layout with strategic use of color and white space',
    category: 'modern',
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    description: 'Contemporary design optimized for tech industry',
    preview: 'Modern layout with subtle tech-inspired elements',
    category: 'modern',
  },
  {
    id: 'traditional-formal',
    name: 'Traditional Formal',
    description: 'Conservative design for traditional industries',
    preview: 'Formal layout perfect for law, finance, and government roles',
    category: 'traditional',
  },
  {
    id: 'traditional-academic',
    name: 'Traditional Academic',
    description: 'Scholarly design for academic and research positions',
    preview: 'Academic-focused layout with emphasis on publications and research',
    category: 'traditional',
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Stylish design for creative professionals',
    preview: 'Eye-catching layout showcasing creativity while maintaining readability',
    category: 'creative',
  },
  {
    id: 'creative-marketing',
    name: 'Creative Marketing',
    description: 'Dynamic design for marketing and media professionals',
    preview: 'Vibrant layout that demonstrates marketing flair and creativity',
    category: 'creative',
  },
];