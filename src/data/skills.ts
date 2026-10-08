export type SkillGroup = { name: string; items: string[] };

/** From the résumé, grouped by how they were used in the projects on this site. */
export const skills: SkillGroup[] = [
  {
    name: 'Applied AI & ML',
    items: ['Python', 'Scikit-learn', 'XGBoost', 'SHAP', 'NLTK', 'VADER'],
  },
  {
    name: 'APIs & SDKs',
    items: ['Google Gemini API', 'Claude', 'Zoom Video SDK', 'Zoom Realtime Media Streams API'],
  },
  {
    name: 'Data',
    items: ['SQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'PySpark', 'Pandas', 'NumPy'],
  },
  {
    name: 'Backend & apps',
    items: ['Flask', 'Node.js', 'Express.js', 'Streamlit', 'PyMuPDF', 'JavaScript'],
  },
  {
    name: 'Tooling',
    items: ['Docker', 'Git', 'GitHub Actions'],
  },
  {
    name: 'Also used',
    items: ['Java', 'C++', 'C', 'R', 'MATLAB', 'TensorFlow', 'OpenCV', 'Matplotlib', 'Jupyter', 'Databricks', 'Snowflake', 'Power BI', 'Tableau', 'ServiceNow'],
  },
];
