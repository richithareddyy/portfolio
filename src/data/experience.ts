export type Role = {
  title: string;
  org: string;
  orgDetail?: string;
  place: string;
  dates: string;
  current?: boolean;
  points: string[];
  tags?: string[];
};

export const experience: Role[] = [
  {
    title: 'Zoom Fellow',
    org: 'ASU Next Lab',
    orgDetail: 'in partnership with Zoom',
    place: 'Tempe, AZ',
    dates: 'Aug 2026 – Present',
    current: true,
    points: [
      'Selected for a competitive Zoom-sponsored fellowship. Building Zoom Lens, a prototype AI assistant inside Zoom meetings that privately describes and explains shared-screen content for individual participants, without interrupting the presenter.',
      'Implemented Describe, Explain, and contextual Follow-up on Zoom APIs/SDKs and generative AI, with participant-specific request handling that returns each response only to the requester.',
      'Exploring continuous screen understanding, transcript-and-screen reasoning, and accessibility support.',
    ],
    tags: ['Zoom APIs & SDKs', 'Generative AI'],
  },
  {
    title: 'Deskside Support Intern',
    org: 'ASU Media and Immersive eXperience (MIX) Center',
    place: 'Mesa, AZ',
    dates: 'May 2026 – Aug 2026',
    points: [
      'Full-time role diagnosing and resolving hardware, software, network, and account issues across classrooms and offices.',
      'Tracked incidents and documented resolutions in ServiceNow, and worked with IT on recurring user and system issues.',
    ],
    tags: ['ServiceNow'],
  },
  {
    title: 'Research Assistant',
    org: 'Anurag University',
    place: 'Hyderabad, India',
    dates: 'Aug 2023 – May 2025',
    points: [
      'Validated structured datasets and academic records across 5+ departments, keeping data consistent for reporting.',
      'Reorganized digital filing and retrieval processes, cutting information access time by 20%.',
    ],
  },
];
