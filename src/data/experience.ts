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
      'Designed and built ZoomLens, an assistant inside Zoom that privately describes or explains whatever is on the shared screen, so a participant can catch up without interrupting the presenter.',
      'Wrote the Node.js WebSocket server and made privacy a server guarantee: each connection is bound to one participant with no broadcast path, verified by seven isolation tests, including ten participants asking at once.',
      'Built screen capture from the meeting’s Realtime Media Streams feed, keeping a decodable H.264 clip in memory and turning it into a still with ffmpeg only on request, in 25 to 110 ms.',
      'Added per-participant rate limits and daily caps that a reload cannot reset, plus a clearly labeled fallback to the participant’s own display while the meeting stream is unavailable.',
    ],
    tech: ['Node.js', 'Zoom Apps SDK', 'Zoom Realtime Media Streams API', 'Claude'],
    link: { label: 'ZoomLens case study', href: '/work/zoom-lens' },
  },
  {
    title: 'Deskside Support Intern',
    org: 'ASU Media and Immersive eXperience (MIX) Center',
    place: 'Mesa, AZ',
    dates: 'May 2026 – Aug 2026',
    points: [
      'Set up and maintained Windows, macOS, and Linux machines with Jamf Pro, hardware diagnostics, and enterprise software deployment tools.',
      'Worked support incidents through ServiceNow and wrote up recurring issues with their fixes, so IT teams could troubleshoot them faster.',
    ],
    tech: ['ServiceNow', 'Jamf Pro'],
  },
  {
    title: 'Research Assistant',
    org: 'Anurag University',
    place: 'Hyderabad, India',
    dates: 'Aug 2023 – May 2025',
    points: [
      'Audited datasets from 5+ departments in Excel (Power Query, VLOOKUP, pivot tables), tracing and correcting inconsistent records so reports were accurate.',
      'Standardized how shared files were organized across SharePoint and Google Workspace, cutting the time to find information by 20%.',
    ],
    tech: ['Excel', 'SharePoint'],
  },
];
