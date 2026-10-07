export type SkillGroup = { name: string; items: string[]; note?: string };

/** Grouped by how they were used in the projects on this site. */
export const skills: SkillGroup[] = [
  {
    name: 'Applied AI & ML',
    items: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'NLTK', 'PySpark', 'Google Gemini API'],
  },
  {
    name: 'Backend & data',
    items: ['SQL', 'PostgreSQL', 'Neo4j', 'MongoDB', 'GraphQL', 'Flask', 'Node.js', 'Express.js'],
  },
  {
    name: 'Systems & tooling',
    items: ['Rust', 'tree-sitter', 'Docker', 'GitHub Actions', 'Git'],
  },
  {
    name: 'Frontend',
    items: ['TypeScript', 'JavaScript', 'SvelteKit', 'Streamlit'],
  },
  {
    name: 'Also used',
    items: ['Java', 'C++', 'C', 'R', 'MATLAB', 'TensorFlow', 'OpenCV', 'SQLite'],
  },
];
