export type Role = {
  title: string;
  org: string;
  orgDetail?: string;
  place: string;
  dates: string;
  current?: boolean;
  points: string[];
  /** Tools named for this role in the résumé; used by the Data Lab connection map. */
  tech: string[];
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
      'Selected from 200+ applicants for a Zoom-sponsored fellowship, building the Zoom Lens prototype described above.',
      'Built a Node.js WebSocket server that routes each answer only to the participant who asked, without interrupting the presenter, and verified the isolation with automated tests.',
    ],
    tech: ['Node.js', 'Zoom Apps SDK', 'Zoom Realtime Media Streams API', 'Claude'],
    link: { label: 'Zoom Lens case study', href: '/work/zoom-lens' },
  },
  {
    title: 'Deskside Support Intern',
    org: 'ASU Media and Immersive eXperience (MIX) Center',
    place: 'Mesa, AZ',
    dates: 'May 2026 – Aug 2026',
    points: [
      'Provisioned and maintained Windows, macOS, and Linux endpoints with Jamf Pro, hardware diagnostics, and enterprise software deployment tools.',
      'Managed incidents in ServiceNow and documented recurring issues and fixes for IT teams.',
    ],
    tech: ['ServiceNow', 'Jamf Pro'],
  },
  {
    title: 'Research Assistant',
    org: 'Anurag University',
    place: 'Hyderabad, India',
    dates: 'Aug 2023 – May 2025',
    points: [
      'Audited datasets across 5+ departments in Excel (Power Query, VLOOKUP, pivot tables), correcting inconsistent records for reporting.',
      'Reorganized shared files across SharePoint and Google Workspace, cutting information retrieval time by 20%.',
    ],
    tech: ['Excel', 'SharePoint'],
  },
];
