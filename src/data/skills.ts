export type SkillGroup = { name: string; items: string[] };

/** Grouped from the résumé and existing project evidence. Additional skills remain available in the expanded list. */
export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'Rust', 'TypeScript', 'SQL', 'MATLAB', 'JavaScript', 'Java', 'C++'] },
  { name: 'AI / ML', items: ['Claude', 'Scikit-learn', 'XGBoost', 'SHAP', 'Google Gemini API', 'NLTK', 'VADER'] },
  { name: 'Data', items: ['PostgreSQL', 'Neo4j', 'MongoDB', 'PySpark', 'SQLite', 'Pandas', 'NumPy'] },
  { name: 'Backend', items: ['Node.js', 'Express.js', 'Flask', 'Streamlit', 'REST APIs', 'Zoom Video SDK', 'Zoom Realtime Media Streams API'] },
  { name: 'Frontend', items: ['SvelteKit', 'Cytoscape.js'] },
  { name: 'Infrastructure / tools', items: ['Docker', 'GitHub Actions', 'Git'] },
];
