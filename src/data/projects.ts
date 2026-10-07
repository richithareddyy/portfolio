export type Link = { label: string; href: string };

/** A result plus the condition it was measured under. */
export type Metric = { value: string; label: string; qualifier?: string };

export type Decision = { heading: string; body: string };

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  /** One sentence used in previews and page metadata. */
  summary: string;
  /** One sentence for previews. */
  problemShort: string;
  problem: string;
  /** What I built, phrased from the résumé. */
  contribution: string;
  status: string;
  outcome: string;
  /** At most four; shown in previews. */
  tags: string[];
  stack: string[];
  links: Link[];
  /** The first one or two are shown in previews. */
  metrics: Metric[];
  evaluationNote?: string;
  architecture: { stages: string[]; note?: string };
  built: string[];
  decisions: Decision[];
  limitations: string[];
  next?: string[];
};

export const zoomLens = {
  slug: 'zoom-lens',
  title: 'Zoom Lens',
  kicker: 'Zoom Fellowship · ASU Next Lab',
  year: '2026 – present',
  /** Demo recording. Put the file in public/ and set the path, e.g. '/zoom-lens-demo.mp4'. */
  demoVideo: null as string | null,
  demoPoster: null as string | null,
  oneLiner:
    'An AI assistant inside Zoom that privately helps a participant understand what is being shared on screen.',
  problemShort:
    'When you lose the thread of a shared chart, spreadsheet, slide, paper, or code, the usual options are to interrupt the presenter or stay lost. Zoom Lens lets you ask privately instead.',
  problem: [
    'Someone is presenting a spreadsheet, a chart, a slide, a paper, or a page of code. You looked away, joined late, or the material is outside what you know.',
    'The usual options are to interrupt and ask the presenter to go back, or to wait and hope it becomes clear. Zoom Lens adds a third option: ask privately, without interrupting the presenter or other participants.',
  ],
  role: 'Zoom Fellow, ASU Next Lab',
  status: 'Working prototype',
  contribution:
    'Built the prototype on Zoom APIs/SDKs and generative AI: the Describe, Explain, and Follow-up interactions, and participant-specific request handling that returns each response only to the requester.',
  outcome:
    'A working in-meeting app, opened from the Zoom Apps panel, that answers questions about the shared screen for one participant at a time.',
  howItWorks:
    'Zoom Lens opens from the Apps panel during a meeting and appears as a narrow panel beside the meeting window with three actions.',
  modes: [
    {
      name: 'Describe',
      timing: '≈ 6 s',
      what: 'What the screen says.',
      body: 'Summarizes what is being shared, naming the content type and reporting the actual numbers and headings.',
    },
    {
      name: 'Explain',
      timing: '≈ 12 s',
      what: 'What the content means.',
      body: 'Explains what a chart implies, why a diagram is laid out as it is, or what a piece of code is for.',
    },
    {
      name: 'Follow-up',
      timing: '≈ 3 s',
      what: 'One question about the last answer.',
      body: 'Asks a single question about the previous answer, so you do not have to start over.',
    },
  ],
  timingNote: 'Times are the estimates the app displays while it works.',
  delivery: {
    summary:
      'Answers are routed only to the participant who asked. Other participants do not see the request or the answer, and the presenter is not notified.',
    rules: [
      { title: 'One recipient per message', body: 'Every message the server sends is addressed to exactly one session.' },
      { title: 'No broadcast path', body: 'The server has no way to send a message to the whole meeting.' },
      {
        title: 'Replies must match a request',
        body: 'A reply is refused unless it matches a request that the same session made.',
      },
    ],
    whyServer:
      'These rules are enforced on the server rather than in the panel, because anything enforced in the panel could be changed by whoever is running it.',
    scope:
      'This controls who sees answers inside the meeting. It is not, by itself, an end-to-end privacy guarantee: the captured screen is still processed by a generative AI model to produce each answer.',
  },
  capture: {
    current:
      'Zoom Lens does not yet take the video feed directly from the meeting. That needs a capability enabled on the Zoom account. Until then it reads the requesting participant’s display, which gives the same result for content shared in the meeting but is not the architecture it will ship with.',
    consequence:
      'Because it reads the local display, an answer can mention anything visible on that screen, not only the shared content. In testing, a Describe answer also listed browser tabs and participant names that were on screen.',
  },
  decisions: [
    {
      heading: 'Enforce delivery on the server',
      body: 'Recipient rules live where the person running the panel cannot change them.',
    },
    {
      heading: 'Two answer depths',
      body: 'Describe and Explain answer different questions, so Explain is allowed to take longer (about 12 s versus 6 s).',
    },
    {
      heading: 'One follow-up, tied to the last answer',
      body: 'A follow-up is scoped to the previous response instead of starting a new conversation.',
    },
  ],
  tradeoff: [
    'The person sharing is not notified. This is deliberate: people use Zoom Lens because they do not want to interrupt or admit they lost track, and a notification would remove that.',
    'It is still an asymmetry, and whether it is acceptable is a judgement for people to make, not something the code can settle.',
  ],
  progress: {
    built: [
      'Runs inside a live Zoom meeting, opened from the Apps panel',
      'Describe, Explain, and Follow-up on shared-screen content',
      'Participant-specific delivery: each answer returns only to the requester',
      'Server-side recipient rules: single recipient, no broadcast, request matching',
    ],
    notYet: 'Capture directly from the meeting feed. It currently reads the participant’s display.',
    exploring: [
      'Direct capture from the meeting feed',
      'Continuous screen understanding instead of on-demand snapshots',
      'Reasoning over the transcript and the screen together',
      'Accessibility support',
    ],
  },
  tags: ['Zoom APIs & SDKs', 'Generative AI'],
} as const;

export const projects: Project[] = [
  {
    slug: 'codeatlas',
    title: 'CodeAtlas',
    kicker: 'Static analysis · Developer tools',
    year: '2026',
    summary:
      'A change-impact analyzer for Rust that shows which functions, modules, and tests a change can reach, with the source line behind each step.',
    problemShort:
      'Before merging a change you want to know what it can break and which tests to run, with answers you can verify.',
    problem:
      'Before merging a change you want to know what it can break and which tests to run. Tools that guess from name similarity give answers you cannot check. Impact analysis is only useful if each result traces back to code.',
    contribution:
      'Built a Rust analyzer that parses repositories with tree-sitter and labels every call site resolved, ambiguous, unresolved, or external, then stores the call graph in Neo4j for change-impact queries through a GraphQL API and SvelteKit UI.',
    status: 'All planned milestones complete; open source',
    outcome: 'Impact and test-selection results with an evidence chain for every step, scored against fault injection.',
    tags: ['Rust', 'tree-sitter', 'Neo4j', 'GraphQL'],
    stack: ['Rust', 'tree-sitter', 'Neo4j', 'GraphQL', 'SvelteKit', 'TypeScript', 'Cytoscape.js', 'GitHub Actions'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/CodeAtlas' }],
    metrics: [
      { value: '3.6 s', label: 'full index of tokio', qualifier: '808 files, ~163k LOC, one machine' },
      { value: '83–100%', label: 'test-selection recall', qualifier: 'small fixture projects' },
      { value: '81–89%', label: 'test-selection precision', qualifier: 'small fixture projects' },
      { value: '181 + 31', label: 'Rust and web tests in CI' },
    ],
    evaluationNote:
      'Test selection is scored against fault injection: functions are made to panic one at a time and the real suite is run. On ripgrep, macro-generated tests and generic dispatch limit recall; the repository documents those numbers too.',
    architecture: {
      stages: ['Ingest', 'Module tree', 'Parse (tree-sitter)', 'Extract', 'Resolve', 'Neo4j graph', 'Impact', 'GraphQL', 'SvelteKit'],
      note: 'The analysis core is a library with no database code; Neo4j handles graph queries and the web workspace.',
    },
    built: [
      'Rust analyzer that rebuilds the module tree the way the compiler does and resolves calls with Rust scoping and visibility rules',
      'Neo4j code graph with bounded queries for callers, callees, dependents, paths, and tests that reach a symbol',
      'Git-diff impact between two revisions, with the tests to run',
      'GraphQL API and SvelteKit workspace with graph, impact, changes, architecture, and cycle views',
    ],
    decisions: [
      {
        heading: 'Label uncertainty instead of guessing',
        body: 'Only resolved calls become CALLS edges. Ambiguous calls keep their candidates and a reason, and are followed only on request.',
      },
      {
        heading: 'Evidence on every result',
        body: 'An impact result is a chain of facts with file and line, such as: test_checkout calls checkout (line 16), which calls authorize (line 5).',
      },
      {
        heading: 'Measure test selection',
        body: 'A probe command injects a panic into one function at a time and records which tests fail, giving ground truth to score selection against.',
      },
      {
        heading: 'Incremental indexing',
        body: 'Re-indexing parses only changed files and writes only the graph difference. Tests check that the result matches a full index.',
      },
    ],
    limitations: [
      'Only Rust is analyzed; macro_rules! bodies and #[cfg] are not expanded.',
      'No general type inference, so calls on some receivers are reported as ambiguous.',
      'Benchmarking tokio exposed a resolver bug (exponential work on glob-import cycles), since fixed to run in polynomial time.',
    ],
    next: ['Expand macro_rules! and cfg macros', 'Measure explanation quality with real local models'],
  },
  {
    slug: 'reddit-data-pipeline',
    title: 'Reddit Data ETL Pipeline',
    kicker: 'Data engineering',
    year: '2026',
    summary: 'A five-stage pipeline that loads Reddit-format archives into PostgreSQL and accounts for every rejected record.',
    problemShort: 'Archive dumps contain malformed lines, duplicates, and orphaned records that either break a load or slip in silently.',
    problem:
      'Large archive dumps contain malformed lines, duplicates, and records whose parents never appear. Loading them naively either fails on constraints or silently stores bad data.',
    contribution:
      'Built an extract, validate, stage, merge, and check pipeline with per-line rejection records, set-based deduplication and referential checks, idempotent upserts, and 13 post-load quality checks.',
    status: 'Complete; tests run in GitHub Actions',
    outcome: 'Counts reconcile exactly on an 18.9M-line benchmark, and a faster bulk path cut run time from 584 s to 345 s.',
    tags: ['Python', 'PostgreSQL', 'SQL', 'Docker'],
    stack: ['Python', 'PostgreSQL', 'SQL', 'Docker', 'GitHub Actions'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/reddit-data-pipeline' }],
    metrics: [
      { value: '584 → 345 s', label: 'end-to-end run time', qualifier: 'generated data, one machine' },
      { value: '18.71M', label: 'clean rows loaded from 18.9M lines', qualifier: 'generated data with injected defects' },
      { value: '49', label: 'automated tests on every push' },
    ],
    evaluationNote:
      'The benchmark uses generated data with deliberately injected defects (111,408 invalid, 21,826 duplicate, 53,793 orphaned). Every count matched the generator’s manifest, and all 13 quality checks passed. Runtime depends on hardware.',
    architecture: {
      stages: ['Extract (plain, gzip, zstd)', 'Validate', 'Stage (COPY, unlogged)', 'Merge (dedupe, orphans, upsert)', 'Check (13 rules)'],
      note: 'Entities load in dependency order, so each child’s referential check is one set-based join against parents already loaded.',
    },
    built: [
      'Streaming extraction and per-line validation, with every rejection stored with its source line and reason',
      'Set-based deduplication, referential checks, and idempotent upserts',
      'Thirteen post-load data-quality checks and per-run audit records',
    ],
    decisions: [
      {
        heading: 'Bulk path designed around PostgreSQL',
        body: 'COPY into unlogged staging tables. In bulk mode, foreign keys and indexes are dropped during the load, then rebuilt and validated in one pass.',
      },
      {
        heading: 'Narrow merge',
        body: 'One window-function pass finds only the rows that must not load (superseded duplicates and orphans), and the upsert anti-joins against that small set. The merge step went from 267 s to 102 s.',
      },
      {
        heading: 'Safe to re-run',
        body: 'An advisory lock blocks concurrent runs, interrupted runs are marked failed with constraints restored, and upserts apply only strictly newer data.',
      },
    ],
    limitations: [
      'Benchmark numbers come from generated data, not a real Reddit dump.',
      'Runtime depends on hardware and input characteristics.',
    ],
  },
  {
    slug: 'streambox',
    title: 'StreamBox',
    kicker: 'Full-stack · Backend concurrency',
    year: '2022',
    summary: 'A streaming platform whose backend stays consistent when many users write to the same data at once.',
    problemShort: 'Double-clicks, multiple tabs, and concurrent edits cause duplicate entries, rewound playback, and wrong totals.',
    problem:
      'Double-clicks, multiple tabs, retried heartbeats, and two admins editing one title all create race conditions: duplicate list entries, rewound playback, wrong rating averages, and lost edits.',
    contribution:
      'Built a 24-endpoint Express REST API with JWT authentication and five MongoDB collections, using atomic updates and optimistic locking to keep concurrent writes consistent.',
    status: 'Open source; runs locally with Docker',
    outcome: 'A 100-user load test finished with 0 errors, duplicates, or incorrect totals.',
    tags: ['Node.js', 'Express.js', 'MongoDB'],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Docker'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/ott-platform' }],
    metrics: [
      { value: '0 errors', label: 'in 51,633 requests (≈ 3,440/s)', qualifier: '100 users, development laptop' },
      { value: '24', label: 'automated race-condition tests' },
    ],
    evaluationNote:
      'The load test runs concurrent clients with writes concentrated on a few titles, then checks the database for duplicates and incorrect totals. Results depend on hardware.',
    architecture: {
      stages: ['Vanilla JS single-page app', 'Express REST API', 'JWT auth', 'MongoDB (5 collections)', 'HTTP range streaming'],
    },
    built: [
      'Catalog browsing, full-text search, watchlists, resumable playback, reviews, and an admin interface',
      'HTTP range streaming with short-lived, title-scoped stream tokens',
    ],
    decisions: [
      {
        heading: 'Unique indexes and upserts',
        body: 'A unique compound index on {user, title} plus idempotent upserts prevents duplicate list entries, reviews, and progress records.',
      },
      { heading: 'Atomic rating updates', body: 'Rating totals and averages update in a single aggregation-pipeline write.' },
      {
        heading: 'Ordered heartbeats',
        body: 'Playback updates apply only if newer than the stored value, so a delayed heartbeat cannot rewind position.',
      },
      { heading: 'Optimistic locking', body: 'Admin edits include the version they read; a stale edit returns 409 Conflict.' },
    ],
    limitations: [
      'No video files are included; playback needs media supplied by whoever runs it.',
      'The login rate limiter is in memory, so several instances would need a shared store.',
    ],
  },
  {
    slug: 'ticket-triage',
    title: 'Support Ticket Triage',
    kicker: 'Machine learning · Explainability',
    year: '2026',
    summary: 'Predicts support-ticket priority and resolution time, and explains each prediction.',
    problemShort: 'A triage model has to be accurate and explain itself, so an agent can trust or override it.',
    problem:
      'Triage depends on what a ticket says and who sent it. A useful model needs to be accurate and to explain its output, so an agent can trust or override it.',
    contribution:
      'Built an ML pipeline comparing Logistic Regression, Random Forest, and XGBoost, with NLTK and VADER text features, SHAP per-prediction explanations, and a Dockerized Flask REST API.',
    status: 'Open source; live demo on Streamlit Community Cloud',
    outcome: 'XGBoost reached macro-F1 0.705 and cut resolution-time error roughly in half against a baseline, on synthetic data.',
    tags: ['Python', 'XGBoost', 'SHAP', 'Flask'],
    stack: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'NLTK', 'VADER', 'PySpark', 'Flask', 'Streamlit', 'Docker'],
    links: [
      { label: 'GitHub', href: 'https://github.com/richithareddyy/ticket-triage' },
      { label: 'Live demo', href: 'https://richithareddyy-ticket-triage-demostreamlit-app-3uubea.streamlit.app' },
    ],
    metrics: [
      { value: '0.705', label: 'macro-F1 on priority', qualifier: '20,000 synthetic tickets' },
      { value: '12.2 h', label: 'resolution-time MAE vs. 24.4 h baseline', qualifier: 'synthetic tickets' },
      { value: '15–40 ms', label: 'API response with SHAP explanations' },
      { value: '25', label: 'automated tests' },
    ],
    evaluationNote: 'Trained and evaluated on synthetic tickets; results describe that dataset, not a real support queue.',
    architecture: {
      stages: ['Tickets', 'PySpark / pandas features', 'Stacked text model + XGBoost', 'SHAP explanations', 'Flask API', 'Streamlit UI'],
      note: 'A parity test checks that the PySpark and pandas feature pipelines produce identical features.',
    },
    built: [
      'Model comparison across Logistic Regression, Random Forest, and XGBoost',
      'NLTK text features with VADER sentiment, and a PySpark feature job',
      'SHAP per-prediction explanations served through a Flask API and a Streamlit interface',
    ],
    decisions: [
      {
        heading: 'Stacked text model for readable explanations',
        body: 'Raw TF-IDF columns made SHAP explanations dominated by absent words. A linear text model now compresses text into a few out-of-fold scores that XGBoost combines with ticket metadata.',
      },
      {
        heading: 'Test the explanations',
        body: 'A test confirms grouped SHAP contributions add up to the model output. The Spark parity test caught a real rounding difference between Spark and NumPy.',
      },
    ],
    limitations: ['Results are on synthetic data and are not evidence of performance on a real support queue.'],
  },
];

export type MinorProject = { title: string; summary: string; stack: string[]; links: Link[] };

export const otherWork: MinorProject[] = [
  {
    title: 'Research Paper Summarizer',
    summary: 'Summarize, question, and compare papers from a PDF, DOI, or arXiv link, and export notes and citations.',
    stack: ['Python', 'Streamlit', 'Gemini API'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/Researchpaper_summerizer' }],
  },
  {
    title: 'Meeting Insights',
    summary: 'Turns a meeting transcript into action items, decisions, and open questions, with a redaction step before analysis.',
    stack: ['Python', 'Streamlit', 'Gemini API'],
    links: [
      { label: 'GitHub', href: 'https://github.com/richithareddyy/zoom-meeting-insights' },
      { label: 'Live demo', href: 'https://richithareddyy-zoom-meeting-insights-app-gr5imo.streamlit.app' },
    ],
  },
  {
    title: 'Smart Parking',
    summary: 'Estimates parking-space occupancy by comparing a camera image with an empty reference.',
    stack: ['MATLAB'],
    links: [{ label: 'GitHub', href: 'https://github.com/richithareddyy/Smart-Parking-App' }],
  },
];
