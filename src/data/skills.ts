export type SkillGroup = { name: string; items: string[] };

/** Complete Technical Skills section from the published résumé. */
export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'SQL', 'Java', 'JavaScript', 'C++', 'C', 'R', 'MATLAB'] },
  { name: 'AI / ML', items: ['TensorFlow', 'Scikit-learn', 'XGBoost', 'SHAP', 'NLTK', 'VADER', 'OpenCV'] },
  { name: 'Data Science & Analytics', items: ['Pandas', 'NumPy', 'Matplotlib', 'Jupyter', 'PySpark', 'Power BI', 'Tableau'] },
  { name: 'Frameworks & Libraries', items: ['Flask', 'Node.js', 'Express.js', 'Streamlit', 'PyMuPDF'] },
  { name: 'Data Platforms', items: ['Databricks', 'Snowflake', 'PostgreSQL', 'MongoDB', 'SQLite'] },
  { name: 'APIs & SDKs', items: ['Google Gemini API', 'Zoom Video SDK', 'Zoom Realtime Media Streams API', 'REST APIs'] },
  { name: 'Developer Tools', items: ['Docker', 'Git', 'GitHub Actions', 'ServiceNow'] },
];
