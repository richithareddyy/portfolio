export type SkillGroup = { name: string; items: string[] };

/** Technical skills from the résumé, grouped by area. Rust and GraphQL are added from CodeAtlas, Neo4j and WebSockets from the projects. */
export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'Rust', 'Java', 'C++', 'C', 'R', 'MATLAB'] },
  {
    name: 'AI / ML',
    items: ['Claude API', 'Google Gemini API', 'Scikit-learn', 'XGBoost', 'SHAP', 'TensorFlow', 'NLTK', 'VADER', 'OpenCV'],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'GraphQL', 'WebSockets', 'Zoom Apps SDK', 'Zoom Realtime Media Streams API', 'Zoom Video SDK'],
  },
  { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Neo4j', 'SQLite', 'Snowflake', 'Databricks'] },
  { name: 'Data & analytics', items: ['Pandas', 'NumPy', 'PySpark', 'Matplotlib', 'Jupyter', 'Streamlit', 'Power BI', 'Tableau'] },
  { name: 'Infrastructure & tools', items: ['Docker', 'Git', 'GitHub Actions', 'ffmpeg', 'ServiceNow'] },
];
