export type Role = {
  title: string;
  org: string;
  orgDetail?: string;
  place: string;
  dates: string;
  current?: boolean;
  points: string[];
  link?: { label: string; href: string };
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
      'Building Zoom Lens, a prototype in-meeting assistant that describes and explains shared-screen content for one participant without interrupting the presenter.',
      'Implemented Describe, Explain, and Follow-up on Zoom APIs/SDKs and generative AI, with request handling that returns each answer only to the requester.',
    ],
    link: { label: 'Zoom Lens case study', href: '/work/zoom-lens' },
  },
  {
    title: 'Deskside Support Intern',
    org: 'ASU Media and Immersive eXperience (MIX) Center',
    place: 'Mesa, AZ',
    dates: 'May 2026 – Aug 2026',
    points: [
      'Resolved hardware, software, network, and account issues across classrooms and offices, full time.',
      'Tracked incidents and documented fixes in ServiceNow, and worked with IT on recurring issues.',
    ],
  },
  {
    title: 'Research Assistant',
    org: 'Anurag University',
    place: 'Hyderabad, India',
    dates: 'Aug 2023 – May 2025',
    points: [
      'Validated structured datasets and academic records across 5+ departments for consistent reporting.',
      'Reorganized digital filing and retrieval, cutting information access time by 20%.',
    ],
  },
];
