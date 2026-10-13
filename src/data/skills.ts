export type SkillGroup = { name: string; items: string[] };

// From the résumé, plus tools the projects use that the résumé doesn't list yet.
export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'Rust', 'Java', 'C++', 'C', 'R', 'MATLAB'] },
  {
    name: 'AI / ML',
    items: [
      'Claude API',
      'Google Gemini API',
      'Scikit-learn',
      'XGBoost',
      'LightGBM',
      'PyTorch',
      'SHAP',
      'EconML',
      'DoubleML',
      'TensorFlow',
      'NLTK',
      'VADER',
      'OpenCV',
    ],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'GraphQL', 'WebSockets', 'Zoom Apps SDK', 'Zoom Realtime Media Streams API', 'Zoom Video SDK'],
  },
  { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Neo4j', 'SQLite', 'Snowflake', 'Databricks'] },
  {
    name: 'Data & analytics',
    items: ['Pandas', 'NumPy', 'SciPy', 'statsmodels', 'PySpark', 'Matplotlib', 'Jupyter', 'Streamlit', 'Power BI', 'Tableau'],
  },
  { name: 'Infrastructure & tools', items: ['Docker', 'Git', 'GitHub Actions', 'pytest', 'ffmpeg', 'ServiceNow'] },
];
