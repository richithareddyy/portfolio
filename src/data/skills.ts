export type SkillGroup = { name: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    name: 'Languages',
    items: ['Python', 'SQL', 'Java', 'JavaScript', 'TypeScript', 'Rust', 'C++', 'C', 'R', 'MATLAB'],
  },
  {
    name: 'ML & data libraries',
    items: ['TensorFlow', 'Scikit-learn', 'XGBoost', 'SHAP', 'NLTK', 'VADER', 'OpenCV', 'PySpark', 'pandas', 'tree-sitter'],
  },
  {
    name: 'APIs & SDKs',
    items: ['Google Gemini API', 'Zoom Video SDK', 'Zoom Realtime Media Streams API', 'GraphQL'],
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Neo4j', 'SQLite'],
  },
  {
    name: 'Frameworks',
    items: ['Flask', 'Node.js', 'Express.js', 'SvelteKit', 'Streamlit'],
  },
  {
    name: 'Tools & platforms',
    items: ['Docker', 'Git', 'GitHub Actions', 'JWT', 'ServiceNow'],
  },
];
