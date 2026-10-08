export type SkillGroup = { name: string; items: string[] };

/** Taken from the résumé, limited to what the projects on this site demonstrate. The résumé has the full list. */
export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'Java', 'C++', 'MATLAB'] },
  { name: 'Applied AI & ML', items: ['Scikit-learn', 'XGBoost', 'SHAP', 'NLTK', 'VADER'] },
  {
    name: 'Backend & APIs',
    items: ['Flask', 'Node.js', 'Express.js', 'REST APIs', 'Streamlit', 'Claude', 'Google Gemini API', 'Zoom Video SDK', 'Zoom Realtime Media Streams API'],
  },
  { name: 'Databases & data engineering', items: ['PostgreSQL', 'MongoDB', 'SQLite', 'PySpark', 'Pandas', 'NumPy'] },
  { name: 'Developer tools', items: ['Docker', 'Git', 'GitHub Actions'] },
];
