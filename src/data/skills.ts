export type SkillGroup = { name: string; items: string[] };

// Tools the projects and current role actually use, not everything ever touched.
export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'SQL', 'JavaScript'] },
  {
    name: 'Data science & ML',
    items: ['pandas', 'NumPy', 'statsmodels', 'scikit-learn', 'XGBoost', 'LightGBM', 'PyTorch', 'SHAP', 'EconML', 'DoubleML'],
  },
  { name: 'Applied AI & backend', items: ['Claude API', 'Gemini API', 'Node.js', 'WebSockets', 'Flask', 'Zoom Apps SDK', 'Zoom Realtime Media Streams API'] },
  { name: 'Data & infrastructure', items: ['PostgreSQL', 'Docker', 'GitHub Actions', 'pytest'] },
];
