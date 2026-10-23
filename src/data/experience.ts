export type Role = {
  title: string;
  org: string;
  orgDetail?: string;
  place: string;
  dates: string;
  current?: boolean;
  points: string[];
  /** Tools named for this role in the résumé. */
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
      'Selected from 200+ applicants for a Zoom-sponsored fellowship at ASU Next Lab.',
      'Designed and built ZoomLens end to end, an AI assistant inside Zoom that privately explains whatever is on the shared screen to the one participant who asked.',
      'Owned its privacy guarantee and the prototype’s honest status: answers stay with the person who asked, verified by seven isolation tests including ten participants at once, with a clearly labeled fallback while the meeting feed is unavailable.',
    ],
    tech: ['Node.js', 'WebSockets', 'Zoom Apps SDK', 'Zoom Realtime Media Streams API', 'Zoom OAuth', 'ffmpeg', 'Claude'],
    link: { label: 'ZoomLens case study', href: '/work/zoom-lens' },
  },
  {
    title: 'Deskside Support Intern',
    org: 'ASU Media and Immersive eXperience (MIX) Center',
    place: 'Mesa, AZ',
    dates: 'May 2026 – Aug 2026',
    points: [
      'Provisioned and maintained Windows, macOS, and Linux machines using Jamf Pro, hardware diagnostics, and enterprise software deployment tools.',
      'Resolved support incidents in ServiceNow and documented recurring issues with their fixes, so IT teams could troubleshoot repeat problems faster.',
    ],
    tech: ['Jamf Pro', 'ServiceNow', 'Windows', 'macOS', 'Linux'],
  },
  {
    title: 'Research Assistant',
    org: 'Anurag University',
    place: 'Hyderabad, India',
    dates: 'Aug 2023 – May 2025',
    points: [
      'Audited and reconciled datasets from 5+ departments with Excel Power Query, VLOOKUP, and pivot tables, tracing and correcting inconsistent records so department reports were accurate.',
      'Standardized file organization across SharePoint and Google Workspace, cutting the time to find information by 20%.',
    ],
    tech: ['Excel', 'Power Query', 'SharePoint', 'Google Workspace'],
  },
];
