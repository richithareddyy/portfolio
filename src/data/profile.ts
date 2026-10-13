export const profile = {
  name: 'Richitha Rekula',
  graduation: 'Expected May 2027',
  location: 'Tempe, AZ',
  email: 'richitharekula@gmail.com',
  links: {
    github: 'https://github.com/richithareddyy',
    linkedin: 'https://www.linkedin.com/in/richitha-rekula',
    resume: '/Richitha_Rekula_Resume.pdf',
  },
  description:
    'Data science and applied AI portfolio of Richitha Rekula: Zoom Lens, causal inference, forecasting, and the engineering behind them. M.S. Data Science student at Arizona State University and Zoom Fellow at ASU Next Lab.',
} as const;

export const education = [
  {
    school: 'Arizona State University',
    place: 'Tempe, AZ',
    degree: 'Master of Science in Data Science, Analytics and Engineering',
    dates: 'Expected May 2027',
    gpa: '3.78 / 4.0',
  },
  {
    school: 'Anurag University',
    place: 'Hyderabad, India',
    degree: 'Bachelor of Technology in Artificial Intelligence and Machine Learning',
    dates: 'Aug 2021 – May 2025',
    gpa: '3.53 / 4.0',
  },
] as const;
