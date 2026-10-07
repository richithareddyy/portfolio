export type Link = { label: string; href: string };

export type Metric = { value: string; label: string };

export type Section = { heading: string; body: string[] };

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  year: string;
  context?: string;
  stack: string[];
  links: Link[];
  problem: string;
  built: string[];
  approach: Section[];
  metrics?: Metric[];
  metricsNote?: string;
  interesting: string;
  limitations?: string[];
};

export const zoomLens = {
  slug: 'zoom-lens',
  title: 'Zoom Lens',
  kicker: 'Zoom Fellowship · ASU Next Lab',
  year: '2026 – present',
  oneLiner:
    'An AI assistant inside Zoom that privately helps participants understand what is being shared on screen.',
  summary:
    'Zoom Lens runs inside a live meeting and tells one participant what is on the screen someone else is sharing, without anyone else knowing they asked.',
  problem: [
    'Somebody is presenting a spreadsheet, a chart, a slide, a paper, or a page of code. You looked away for a minute, joined late, or the material is just outside what you know.',
    'Normally there are two options: interrupt and ask the presenter to go back, or sit there and hope it becomes clear. Zoom Lens adds a third option that costs nobody else anything.',
  ],
  howItWorks:
    'You open Zoom Lens from the Apps panel while the meeting is running. It appears as a narrow strip down the side of your window with three actions.',
  modes: [
    {
      id: 'describe',
      name: 'Describe',
      timing: '≈ 6 s',
      what: 'What the screen says.',
      body: 'Looks at whatever is being shared at that moment and gives a plain summary. It names what the content actually is and reports the real numbers and headings instead of describing it vaguely.',
    },
    {
      id: 'explain',
      name: 'Explain',
      timing: '≈ 10 s',
      what: 'What the content means.',
      body: 'Explains what the shape of a chart implies, why a diagram is laid out the way it is, or what a piece of code is for. It takes longer because it reasons further about the content.',
    },
    {
      id: 'follow-up',
      name: 'Follow-up',
      timing: 'one question',
      what: 'Ask about the answer.',
      body: 'Ask one question about the answer you just got, so if something is still unclear you do not have to start over.',
    },
  ],
  privacy: {
    intro:
      'Answers come back only to the person who asked. Nobody else in the meeting sees that you asked, there is no indication in the room, and the person sharing their screen is never told.',
    whyServer:
      'That guarantee is enforced on the server, not in the panel. Anything enforced in the panel could be changed by whoever is running it.',
    rules: [
      {
        title: 'One recipient per message',
        body: 'Every message the server sends names exactly one recipient.',
      },
      {
        title: 'No broadcast path',
        body: 'There is no way for the server to send anything to the whole meeting.',
      },
      {
        title: 'Replies must match a request',
        body: 'A reply is refused outright unless it matches a request that session actually made.',
      },
    ],
  },
  status: {
    built: [
      'Runs inside a live Zoom meeting, opened from the Apps panel',
      'Describe, Explain, and Follow-up interactions on shared-screen content',
      'Generative AI responses that report actual content: numbers, headings, structure',
      'Participant-specific request handling: each response returns only to the requester',
      'Server-side privacy enforcement: single-recipient messages, no broadcast, request matching',
    ],
    caveat: {
      title: 'How the screen is captured today',
      body: 'Zoom Lens does not yet take the video feed directly from the meeting. That requires a capability enabled on the Zoom account. Until then the system reads the display instead, which produces the same result for anyone in the meeting but is not the architecture it will ship with.',
    },
    exploring: [
      'Direct capture of the shared screen from the meeting feed',
      'Continuous screen understanding, rather than on-demand snapshots',
      'Reasoning over the transcript and the screen together',
      'Accessibility support',
    ],
  },
  ethics: [
    'The person sharing is not notified. That is deliberate, not an oversight: the reason someone would use Zoom Lens is that they do not want to interrupt or admit they lost track, and a notification would remove that.',
    'It is still a real asymmetry, and whether it is acceptable is a judgement for people to make, not something the code can settle.',
  ],
  engineering: [
    {
      title: 'Zoom integration',
      body: 'Built on Zoom APIs and SDKs as an in-meeting app, so it lives where the problem happens instead of in a separate tool.',
    },
    {
      title: 'Shared-screen understanding',
      body: 'Turns arbitrary shared content — charts, spreadsheets, slides, papers, code — into a specific answer, not a generic caption.',
    },
    {
      title: 'Two response modes',
      body: 'Describe and Explain trade latency for depth (about 6 s vs. about 10 s) because they answer different questions.',
    },
    {
      title: 'Participant-specific responses',
      body: 'Each request is tied to the session that made it, and its answer is delivered only to that participant.',
    },
    {
      title: 'Privacy as a server invariant',
      body: 'Privacy is not a UI setting. The server cannot address more than one person and refuses replies it did not ask for.',
    },
    {
      title: 'Accessibility potential',
      body: 'The same capability could describe shared content to participants who cannot see it. This is a direction being explored, not a shipped feature.',
    },
  ],
  stack: ['Zoom APIs & SDKs', 'Generative AI'],
} as const;

export const projects: Project[] = [
  {
    slug: 'codeatlas',
    title: 'CodeAtlas',
    kicker: 'Static analysis · Developer tools',
    year: '2026',
    summary:
      'A change-impact analyzer for Rust repositories that shows which functions, modules, and tests a change can reach, and cites the source line behind every step.',
    stack: ['Rust', 'tree-sitter', 'Neo4j', 'GraphQL', 'SvelteKit', 'TypeScript', 'Cytoscape.js', 'GitHub Actions'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/CodeAtlas' }],
    problem:
      'Before merging a change you want to know what it can break and which tests to run. Most tools either guess from name similarity or give an answer you cannot check. Impact analysis is only useful if each result can be traced back to code.',
    built: [
      'A Rust analyzer that parses repositories with tree-sitter, rebuilds the module tree the way the compiler does, and resolves every call site using Rust scoping and visibility rules.',
      'A Neo4j code graph with bounded queries for callers, callees, transitive dependents, paths, and the tests that reach a symbol.',
      'Git-diff impact: compare two revisions, classify each symbol as added, removed, modified, or moved, and list affected code and tests to run.',
      'A GraphQL API and a SvelteKit workspace with graph, impact, changes, architecture, and cycle views.',
    ],
    approach: [
      {
        heading: 'Label uncertainty instead of guessing',
        body: [
          'Every call site is classified as resolved, ambiguous, unresolved, or external. Only resolved calls become CALLS edges; ambiguous ones keep their candidates and a reason, and are followed only on request and reported as possible.',
        ],
      },
      {
        heading: 'Evidence on every result',
        body: [
          'An impact result is a chain of facts — test_checkout calls checkout (line 16), which calls authorize (line 5) — so a reviewer can verify each hop.',
        ],
      },
      {
        heading: 'Measure test selection against reality',
        body: [
          'A probe command makes functions panic one at a time, runs the real test suite, and records which tests fail. Selection is then scored against that ground truth instead of assumed to work.',
        ],
      },
      {
        heading: 'Incremental indexing',
        body: [
          'Re-indexing parses only changed files and writes only the graph difference in one transaction. Tests check that the result matches a full index property by property.',
        ],
      },
    ],
    metrics: [
      { value: '3.6 s', label: 'full index of tokio (808 files, ~163k LOC)' },
      { value: '81–89%', label: 'test-selection precision on fixture projects' },
      { value: '83–100%', label: 'test-selection recall on fixture projects' },
      { value: '181 + 31', label: 'Rust and web tests in GitHub CI' },
    ],
    metricsNote:
      'Precision and recall are measured with fault injection on small fixture projects. On ripgrep, macro-generated tests and generic dispatch limit recall; the README documents this.',
    interesting:
      'It is honest about what static analysis cannot see. Benchmarking tokio also exposed a resolver bug — glob-import cycles recomputed exponentially — which was fixed to run in polynomial time.',
    limitations: [
      'Only Rust is analyzed; macro_rules! bodies and #[cfg] are not expanded.',
      'No general type inference, so calls on some receivers are reported as ambiguous.',
    ],
  },
  {
    slug: 'reddit-data-pipeline',
    title: 'Reddit Data ETL Pipeline',
    kicker: 'Data engineering',
    year: '2026',
    summary:
      'A five-stage pipeline that loads Reddit-format archives into PostgreSQL and accounts for every rejected record.',
    stack: ['Python', 'PostgreSQL', 'SQL', 'Docker', 'GitHub Actions'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/reddit-data-pipeline' }],
    problem:
      'Large archive dumps contain malformed lines, duplicates, and records whose parents never appear. Loading them naively either fails on constraints or silently stores bad data.',
    built: [
      'A streaming extract → validate → stage → merge → check pipeline for subreddits, authors, submissions, and comments.',
      'Per-line validation with every rejection stored alongside its source line number and reason.',
      'Set-based deduplication and referential checks, idempotent upserts, and 13 post-load data-quality checks.',
    ],
    approach: [
      {
        heading: 'Bulk path designed around PostgreSQL',
        body: [
          'Rows stream through COPY into unlogged staging tables. In bulk mode, foreign keys and secondary indexes are dropped during the load and rebuilt afterward, then validated in a single pass so integrity is still guaranteed.',
        ],
      },
      {
        heading: 'Narrow merge',
        body: [
          'One window-function pass over narrow columns finds only the rows that must not load — superseded duplicates and orphans — and the upsert anti-joins against that small set.',
        ],
      },
      {
        heading: 'Safe to re-run',
        body: [
          'An advisory lock prevents concurrent runs, interrupted runs are marked failed and their constraints restored, and upserts apply only strictly newer data.',
        ],
      },
    ],
    metrics: [
      { value: '18.9M', label: 'lines screened in a full benchmark run' },
      { value: '18.71M', label: 'clean rows loaded into PostgreSQL' },
      { value: '584 → 345 s', label: 'end-to-end run time after optimization' },
      { value: '49', label: 'automated tests on every push' },
    ],
    metricsNote:
      'Benchmark input is generated data with deliberately injected defects (111,408 invalid, 21,826 duplicate, 53,793 orphaned records); every count matched the generator’s manifest.',
    interesting:
      'The counts reconcile exactly: lines read equals staged plus invalid, and staged equals duplicates plus orphans plus accepted. The merge step alone dropped from 267 s to 102 s.',
  },
  {
    slug: 'streambox',
    title: 'StreamBox',
    kicker: 'Full-stack · Backend concurrency',
    year: '2022',
    summary:
      'A web-based streaming platform whose backend stays consistent when many users write to the same data at once.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Docker'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/ott-platform' }],
    problem:
      'Double-clicks, multiple tabs, retried heartbeats, and two admins editing the same title all create race conditions: duplicate list entries, rewound playback, wrong rating averages, lost edits.',
    built: [
      'A 24-endpoint Express REST API with JWT authentication, five MongoDB collections, and a vanilla JavaScript front end.',
      'Catalog browsing, full-text search, watchlists, resumable playback with HTTP range streaming, reviews, and an admin interface.',
    ],
    approach: [
      {
        heading: 'Concurrency by design',
        body: [
          'Unique compound indexes and idempotent upserts prevent duplicates; rating totals are updated in one atomic aggregation-pipeline write; playback heartbeats apply only if newer than the stored value; admin edits use optimistic locking and return 409 on conflict.',
        ],
      },
      {
        heading: 'Verified, not assumed',
        body: [
          'A load test runs concurrent clients with writes concentrated on a few hot titles, then checks the database for duplicates and incorrect totals.',
        ],
      },
    ],
    metrics: [
      { value: '51,633', label: 'requests in a 100-user load test' },
      { value: '≈ 3,440/s', label: 'requests per second, single Node process' },
      { value: '0', label: 'errors, duplicates, or incorrect totals' },
      { value: '24', label: 'automated race-condition tests' },
    ],
    metricsNote: 'Load test run on a development laptop with MongoDB in Docker; results depend on hardware.',
    interesting:
      'Each race condition has a specific mechanism — indexes, atomic updates, timestamps, version checks — and a test that would catch it regressing.',
  },
  {
    slug: 'ticket-triage',
    title: 'Support Ticket Triage',
    kicker: 'Machine learning · Explainability',
    year: '2026',
    summary:
      'Predicts support-ticket priority and resolution time, and explains each prediction in terms an agent can act on.',
    stack: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'NLTK', 'VADER', 'PySpark', 'Flask', 'Streamlit', 'Docker'],
    links: [
      { label: 'GitHub', href: 'https://github.com/richithareddyy/ticket-triage' },
      { label: 'Live demo', href: 'https://richithareddyy-ticket-triage-demostreamlit-app-3uubea.streamlit.app' },
    ],
    problem:
      'Triage depends on both what a ticket says and who sent it. A useful model has to be accurate and also explain its output, so an agent can trust or override it.',
    built: [
      'An ML pipeline on 20,000 synthetic support tickets comparing Logistic Regression, Random Forest, and XGBoost.',
      'NLTK text features with VADER sentiment, a PySpark feature job with a parity test against the pandas version, and SHAP per-prediction explanations.',
      'A Dockerized Flask REST API and a Streamlit interface.',
    ],
    approach: [
      {
        heading: 'Stacked text model for readable explanations',
        body: [
          'Feeding raw TF-IDF columns into XGBoost made SHAP explanations dominated by absent words. A linear text model now compresses the text into a few out-of-fold scores, and the tree model learns how they interact with ticket metadata.',
        ],
      },
      {
        heading: 'Tested end to end',
        body: [
          'Tests confirm grouped SHAP contributions add up exactly to the model output. The Spark parity test caught a real rounding difference between Spark and NumPy.',
        ],
      },
    ],
    metrics: [
      { value: '0.705', label: 'macro-F1 on priority (XGBoost)' },
      { value: '12.2 h', label: 'resolution-time MAE, down from a 24.4 h baseline' },
      { value: '15–40 ms', label: 'API response with SHAP explanations' },
      { value: '25', label: 'automated tests' },
    ],
    metricsNote: 'Trained and evaluated on synthetic tickets; results describe that dataset, not a real support queue.',
    interesting:
      'The model design changed to make explanations useful, not just to improve a score.',
  },
];

export type MinorProject = {
  title: string;
  summary: string;
  stack: string[];
  links: Link[];
};

export const otherWork: MinorProject[] = [
  {
    title: 'Research Paper Summarizer',
    summary:
      'Load a PDF, DOI, or arXiv link to get structured summaries, chat with the paper, compare papers, and export notes and citations.',
    stack: ['Python', 'Streamlit', 'Gemini API', 'PyMuPDF'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/Researchpaper_summerizer' }],
  },
  {
    title: 'Meeting Insights',
    summary:
      'Turns a meeting transcript into action items, decisions, and open questions, with a visible redaction step before anything is sent to the model.',
    stack: ['Python', 'Streamlit', 'Gemini API'],
    links: [
      { label: 'GitHub', href: 'https://github.com/richithareddyy/zoom-meeting-insights' },
      { label: 'Live demo', href: 'https://richithareddyy-zoom-meeting-insights-app-gr5imo.streamlit.app' },
    ],
  },
  {
    title: 'Smart Parking',
    summary:
      'Estimates parking-space occupancy by comparing a camera image against an empty reference, with custom space layouts and lane recommendations.',
    stack: ['MATLAB'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/Smart-Parking-App' }],
  },
];
