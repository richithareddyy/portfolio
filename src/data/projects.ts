import type { ImageMetadata } from 'astro';
import zoomLensMeeting from '../assets/projects/zoom-lens-meeting.webp';
import codeatlasImpact from '../assets/projects/codeatlas-impact.png';
import codeatlasGraph from '../assets/projects/codeatlas-graph.png';
import codeatlasChanges from '../assets/projects/codeatlas-changes.png';
import triageDemo from '../assets/projects/triage-demo.webp';
import researchDemo from '../assets/projects/research-demo.webp';
import meetingDemo from '../assets/projects/meeting-demo.webp';
import triageShapPriority from '../assets/projects/triage-shap-priority.png';
import triageShapResolution from '../assets/projects/triage-shap-resolution.png';
import parkingCurrent from '../assets/projects/parking-current.jpeg';

export type Link = { label: string; href: string };

/** A result plus the condition it was measured under. */
export type Metric = { value: string; label: string; qualifier?: string };

export type Decision = { heading: string; body: string; tradeoff: string };

export type DataTable = { caption: string; columns: string[]; rows: string[][]; note?: string };

export type Visual =
  | { kind: 'image'; src: ImageMetadata; alt: string; caption: string }
  | { kind: 'diagram'; id: 'etl'; caption: string }
  | { kind: 'output'; id: 'streambox-loadtest'; caption: string };

export type Project = {
  slug: string;
  title: string;
  /** One-sentence value statement. */
  summary: string;
  tier: 'featured' | 'more';
  year: string;
  /** Shown on cards and case studies. */
  role: string;
  contribution: string;
  /** Strongest supported result, or current status when there is no result. */
  result: { headline: string; qualifier?: string };
  /** Up to four, shown on cards. */
  tech: string[];
  demo?: string;
  github?: string;
  caseStudy: boolean;
  visual: Visual;
  gallery?: Visual[];

  /** One sentence used on compact rows. */
  problemShort?: string;

  // Case-study content
  status?: string;
  /** What makes the project technically hard. */
  challenges?: string[];
  tables?: DataTable[];
  problem?: string;
  constraints?: string[];
  built?: string[];
  stack?: string[];
  decisions?: Decision[];
  evaluation?: { method: string[]; metrics: Metric[]; evidence: Link[] };
  limitations?: string[];
  next?: string[];
};

const gh = (repo: string) => `https://github.com/richithareddyy/${repo}`;
const ghPath = (repo: string, path: string) => `https://github.com/richithareddyy/${repo}/blob/main/${path}`;
const ghTree = (repo: string, path: string) => `https://github.com/richithareddyy/${repo}/tree/main/${path}`;

export const projects: Project[] = [
  {
    slug: 'zoom-lens',
    title: 'Zoom Lens',
    summary: 'An assistant inside Zoom that privately explains a shared screen to the participant who asks.',
    tier: 'featured',
    year: '2026 – present',
    role: 'Zoom Fellow, ASU Next Lab',
    contribution:
      'Built the prototype on Zoom APIs/SDKs and Claude: Describe, Explain, and Follow-up actions, with participant-specific request pipelines in Python that return each answer only to the requester.',
    result: {
      headline: 'Working prototype in live Zoom meetings',
      qualifier: 'Captures the participant’s display for now, not the meeting feed',
    },
    tech: ['Python', 'Zoom Video SDK', 'Zoom Realtime Media Streams API', 'Claude'],
    caseStudy: true,
    visual: {
      kind: 'image',
      src: zoomLensMeeting,
      alt: 'Zoom Lens in a live Zoom meeting: a paper is shared on screen, and the Zoom Lens panel on the right shows a Describe answer naming the paper, its authors, and its venue, with an Ask a follow-up box and the note Only you see your answers.',
      caption: 'Zoom Lens answering in a live meeting. Screenshot of the prototype.',
    },
  },
  {
    slug: 'codeatlas',
    title: 'CodeAtlas',
    summary:
      'Change-impact analysis for Rust: which functions, modules, and tests a change can reach, with the source line behind each step.',
    tier: 'featured',
    year: '2026',
    role: 'Solo project',
    contribution:
      'Built a Rust analyzer that labels each call site by whether it can be resolved, then answers change-impact queries from a Neo4j call graph.',
    result: { headline: '3.6 s to index tokio', qualifier: '808 files, ~163k LOC, release build on one machine' },
    tech: ['Rust', 'tree-sitter', 'Neo4j', 'GraphQL'],
    github: gh('CodeAtlas'),
    caseStudy: true,
    visual: {
      kind: 'image',
      src: codeatlasImpact,
      alt: 'CodeAtlas impact view: a changed trait method, the five symbols it can affect, and the source lines connecting each one.',
      caption: 'Impact view on the project’s change-impact fixture. Screenshot from the repository.',
    },
    gallery: [
      {
        kind: 'image',
        src: codeatlasGraph,
        alt: 'CodeAtlas graph view showing callers of RegexMatcherBuilder::build in ripgrep, with test callers drawn dashed.',
        caption: 'Callers of RegexMatcherBuilder::build in ripgrep; tests are dashed.',
      },
      {
        kind: 'image',
        src: codeatlasChanges,
        alt: 'CodeAtlas changes view comparing two Git revisions, listing changed symbols and the code and tests that depend on them.',
        caption: 'Git diff impact between two revisions of the pr-impact fixture.',
      },
    ],
    status: 'All planned milestones complete; open source',
    problem:
      'Before merging a change you want to know what it can break and which tests to run. Tools that match names by similarity give answers you cannot check.',
    constraints: [
      'Rust only, without full type inference, so some calls cannot be resolved with certainty.',
      'Every result needs to be traceable to specific source lines.',
      'Re-indexing large repositories has to stay fast when little has changed.',
    ],
    built: [
      'Analyzer that rebuilds the module tree as the compiler does and resolves calls with Rust scoping and visibility rules',
      'Neo4j code graph with bounded queries for callers, callees, dependents, paths, and tests that reach a symbol',
      'Git-diff impact between two revisions, with the tests to run',
      'GraphQL API and SvelteKit workspace with graph, impact, changes, architecture, and cycle views',
    ],
    stack: ['Rust', 'tree-sitter', 'Neo4j', 'GraphQL', 'SvelteKit', 'TypeScript', 'Cytoscape.js', 'GitHub Actions'],
    challenges: [
      'Resolving Rust names without the compiler: module trees from mod declarations and #[path], use-tree flattening, re-exports, aliases, glob imports, shadowing, and visibility.',
      'Method calls need the receiver’s type, inferred from parameters, fields, constructor calls, ? and builder chains, without full type inference.',
      'Trait dispatch means a change to one method can reach every implementation and caller.',
      'Incremental re-indexing must produce exactly the graph a full index would; tests compare the two property by property.',
      'Glob-import cycles made lookups exponential on tokio until the resolver was changed to run in polynomial time.',
    ],
    tables: [
      {
        caption: 'Indexing and query benchmarks',
        columns: ['', 'CodeAtlas', 'ripgrep', 'tokio'],
        rows: [
          ['Rust files / non-blank LOC', '130 / 20,943', '110 / 50,953', '808 / 163,157'],
          ['Symbols', '1,405', '3,536', '9,554'],
          ['Call resolution rate', '58.3%', '76.3%', '40.4%'],
          ['Analysis, fresh process', '177 ms', '329 ms', '918 ms'],
          ['Full index (analysis + write)', '361 ms', '890 ms', '3.61 s'],
          ['Re-index, nothing changed', '68 ms', '128 ms', '434 ms'],
          ['Callers query, depth 1 / 3 (median)', '1.7 / 2.7 ms', '1.6 / 3.3 ms', '2.1 / 1.7 ms'],
          ['Peak memory of the analysis', '28 MB', '46 MB', '101 MB'],
        ],
        note: 'Medians of 5 runs on one machine (Apple M5, 10 logical CPUs, macOS, release build, Neo4j 5.26 Community in Docker).',
      },
      {
        caption: 'Test-selection quality against fault injection',
        columns: ['Repository', 'Precision', 'Recall'],
        rows: [
          ['test-impact fixture', '0.864', '0.826'],
          ['change-impact fixture', '0.813', '1.000'],
          ['simple-repo fixture', '0.889', '1.000'],
          ['ripgrep, resolved calls only', '0.182', '0.047'],
          ['ripgrep, ambiguous calls included', '0.130', '0.228'],
        ],
        note: 'Fixtures are small projects written for this evaluation. On ripgrep, 716 of 1,195 tests are generated by macros that CodeAtlas does not expand, which caps recall.',
      },
    ],
    decisions: [
      {
        heading: 'Label uncertainty instead of guessing',
        body: 'Each call site is resolved, ambiguous, unresolved, or external. Only resolved calls become edges; ambiguous ones keep their candidates and are followed only on request.',
        tradeoff:
          'On generic-heavy code, resolved calls alone miss tests. On ripgrep, including ambiguous calls raised recall among visible tests from 19.3% to 93.7% at lower precision.',
      },
      {
        heading: 'An evidence chain for every result',
        body: 'An impact result is a chain of facts with file and line, such as: test_checkout calls checkout (line 16), which calls authorize (line 5).',
        tradeoff: 'Results are only as complete as the graph; a dependency static analysis misses is reported as missing, not inferred.',
      },
      {
        heading: 'Incremental indexing',
        body: 'Re-indexing parses only changed files and writes only the graph difference in one transaction. Tests check the result matches a full index.',
        tradeoff: 'Incremental state is local to one machine, so indexing from two machines falls back to full writes.',
      },
      {
        heading: 'Score test selection with fault injection',
        body: 'A probe command makes one function panic at a time, runs the real test suite, and records which tests fail. Selection is scored against that.',
        tradeoff: 'Probing executes the repository’s code, so it should run only on trusted repositories.',
      },
    ],
    evaluation: {
      method: [
        'Indexing: codeatlas bench, medians of 5 runs on one machine (Apple M5, release build, Neo4j 5.26 in Docker).',
        'Test selection: panic-on-entry probes on small fixture projects, compared with the tests CodeAtlas selected.',
        'These are separate evaluations: tokio was used for indexing speed, the fixtures for selection quality.',
      ],
      metrics: [
        { value: '3.6 s', label: 'full index of tokio', qualifier: '808 files, ~163k LOC' },
        { value: '83–100%', label: 'test-selection recall', qualifier: 'small fixture projects' },
        { value: '81–89%', label: 'test-selection precision', qualifier: 'small fixture projects' },
        { value: '181 + 31', label: 'Rust and web tests in CI' },
      ],
      evidence: [
        { label: 'Benchmark method', href: ghPath('CodeAtlas', 'benchmarks/README.md') },
        { label: 'Benchmark results', href: ghTree('CodeAtlas', 'benchmarks/results') },
        { label: 'Test-selection results (ripgrep)', href: ghTree('CodeAtlas', 'benchmarks/test-impact') },
        { label: 'Impact analysis notes', href: ghPath('CodeAtlas', 'docs/impact-analysis.md') },
        { label: 'CI workflow', href: ghPath('CodeAtlas', '.github/workflows/ci.yml') },
      ],
    },
    limitations: [
      'macro_rules! bodies and #[cfg] are not expanded, which limits resolution on large crates.',
      'On ripgrep, macro-generated tests and generic dispatch keep static selection a starting point, not a replacement for running the suite.',
    ],
    next: ['Expand macro_rules! and cfg macros', 'Measure explanation quality with real local models'],
  },
  {
    slug: 'reddit-data-pipeline',
    title: 'Reddit Data ETL Pipeline',
    summary: 'Loads Reddit-format archives into PostgreSQL and accounts for every rejected record.',
    tier: 'featured',
    year: '2026',
    role: 'Solo project',
    contribution:
      'Built a five-stage pipeline (extract, validate, stage, merge, check) with per-line rejection records, set-based deduplication, and 13 post-load quality checks.',
    result: {
      headline: '18.9M lines reconciled exactly; 584 s cut to 345 s',
      qualifier: 'Generated data with injected defects, one machine',
    },
    tech: ['Python', 'PostgreSQL', 'SQL', 'Docker'],
    github: gh('reddit-data-pipeline'),
    caseStudy: true,
    visual: {
      kind: 'diagram',
      id: 'etl',
      caption: 'Diagram of the pipeline stages and benchmark record counts.',
    },
    status: 'Complete; tests run in GitHub Actions',
    problem:
      'Archive dumps contain malformed lines, duplicates, and records whose parents never appear. A naive load either fails on constraints or silently stores bad data.',
    constraints: [
      'Inputs are large, so memory use has to stay constant while streaming.',
      'Every rejected line must be traceable to its source line and reason.',
      'Re-running a load must not duplicate or regress data.',
    ],
    built: [
      'Streaming extraction from plain, gzip, and Zstandard files, with per-line validation',
      'Set-based deduplication, referential checks, and idempotent upserts',
      'Thirteen post-load data-quality checks and per-run audit records',
    ],
    stack: ['Python', 'PostgreSQL', 'SQL', 'Docker', 'GitHub Actions'],
    challenges: [
      '18.9M lines (5.9 GB of NDJSON) have to stream through in constant memory.',
      'Every line must land in exactly one place (loaded, invalid, duplicate, or orphaned) with counts that reconcile.',
      'Loading fast without giving up referential integrity: constraints are dropped for speed, then rebuilt and validated.',
      'Runs must be safe to repeat or to interrupt partway through.',
    ],
    tables: [
      {
        caption: 'Where every line went (generated benchmark data)',
        columns: ['Entity', 'Lines read', 'Invalid', 'Duplicates', 'Orphaned', 'Loaded'],
        rows: [
          ['subreddits', '60,594', '506', '88', '0', '60,000'],
          ['authors', '1,838,137', '15,109', '3,028', '0', '1,820,000'],
          ['submissions', '2,504,640', '16,369', '2,737', '5,534', '2,480,000'],
          ['comments', '14,493,656', '79,424', '15,973', '48,259', '14,350,000'],
          ['total', '18,897,027', '111,408', '21,826', '53,793', '18,710,000'],
        ],
        note: 'Each count matched the generator’s manifest of injected defects.',
      },
      {
        caption: 'Run time by phase (345 s total)',
        columns: ['Phase', 'Time'],
        rows: [
          ['Parse, validate, and COPY to staging', '97 s'],
          ['Deduplicate, integrity-check, and upsert', '137 s'],
          ['Rebuild 7 secondary indexes', '34 s'],
          ['Re-add and validate 5 foreign keys', '15 s'],
          ['Quality checks', '61 s'],
        ],
      },
    ],
    decisions: [
      {
        heading: 'Drop and rebuild constraints for bulk loads',
        body: 'On an empty database, foreign keys and secondary indexes are dropped during the load, then rebuilt and validated in one pass.',
        tradeoff: 'This only applies to the first load; later runs switch to incremental mode and keep constraints in place.',
      },
      {
        heading: 'Narrow, set-based merge',
        body: 'One window-function pass finds only the rows that must not load (superseded duplicates and orphans), and the upsert anti-joins against that small set.',
        tradeoff: 'The merge depends on entities loading in parent-first order, so a missing parent file turns its children into orphans.',
      },
      {
        heading: 'Safe to re-run',
        body: 'An advisory lock blocks concurrent runs, interrupted runs are marked failed with constraints restored, and upserts apply only strictly newer data.',
        tradeoff: 'Only one run can proceed at a time.',
      },
    ],
    evaluation: {
      method: [
        'Full-scale run into an empty database: 18,897,027 lines (5.9 GB NDJSON) of generated data with a 1% defect rate.',
        'Docker limited to 10 CPUs and 8 GB on an Apple Silicon Mac with an SSD.',
        'Counts compared with the generator’s manifest of injected defects.',
      ],
      metrics: [
        { value: '584 → 345 s', label: 'end-to-end run time', qualifier: 'merge step 267 → 102 s' },
        { value: '18.71M', label: 'clean rows loaded', qualifier: 'every count matched the manifest' },
        { value: '13 / 13', label: 'quality checks passed' },
        { value: '49', label: 'automated tests on every push' },
      ],
      evidence: [
        { label: 'Benchmark details (README)', href: `${gh('reddit-data-pipeline')}#benchmark` },
        { label: 'Integration tests', href: ghPath('reddit-data-pipeline', 'tests/test_pipeline_integration.py') },
        { label: 'CI workflow', href: ghPath('reddit-data-pipeline', '.github/workflows/ci.yml') },
      ],
    },
    limitations: [
      'Benchmark numbers come from generated data, not a real Reddit dump.',
      'Runtime depends on hardware and input characteristics.',
    ],
  },
  {
    slug: 'streambox',
    title: 'StreamBox',
    summary: 'A streaming web app whose backend stays consistent when many users write to the same data.',
    tier: 'more',
    year: '2024',
    role: 'Solo project',
    contribution:
      'Built a 24-endpoint Express REST API with JWT auth and five MongoDB collections, using atomic updates and optimistic locking.',
    result: { headline: '0 errors or duplicates in 51,633 requests', qualifier: '100 concurrent users, development laptop' },
    tech: ['Node.js', 'Express.js', 'MongoDB'],
    github: gh('ott-platform'),
    caseStudy: true,
    visual: { kind: 'output', id: 'streambox-loadtest', caption: 'Load-test output reported in the project README.' },
    status: 'Open source; runs locally with Docker',
    problem:
      'Double-clicks, multiple tabs, retried heartbeats, and two admins editing one title create race conditions: duplicate list entries, rewound playback, wrong rating averages, and lost edits.',
    constraints: [
      'Writes from many sessions can hit the same title at once.',
      'Playback heartbeats can arrive late or out of order.',
    ],
    built: [
      'Catalog browsing, full-text search, watchlists, resumable playback, reviews, and an admin interface',
      'HTTP range streaming with short-lived, title-scoped stream tokens',
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Docker'],
    problemShort: 'Double-clicks, multiple tabs, and concurrent edits cause duplicate entries, rewound playback, and wrong totals.',
    decisions: [
      {
        heading: 'Unique indexes with idempotent upserts',
        body: 'A unique compound index on {user, title} plus upserts prevents duplicate list entries, reviews, and progress records.',
        tradeoff: 'A request that loses an insert race gets a duplicate-key error that has to be handled as already exists.',
      },
      {
        heading: 'Ordered heartbeats',
        body: 'Each playback update carries the client’s timestamp and applies only if newer than the stored value.',
        tradeoff: 'Correct ordering depends on client-reported time.',
      },
      {
        heading: 'Optimistic locking for admin edits',
        body: 'Edits include the version that was read; a stale edit matches nothing and returns 409 Conflict.',
        tradeoff: 'The second admin has to reload and reapply their change.',
      },
    ],
    evaluation: {
      method: [
        '100 concurrent clients for 15 seconds, with writes concentrated on 10 titles to force contention.',
        'Afterward the database is checked for duplicates and incorrect totals.',
        'Single Node process with MongoDB in Docker on a development laptop.',
      ],
      metrics: [
        { value: '51,633', label: 'requests in 15 s (≈ 3,440/s)', qualifier: 'development laptop' },
        { value: '0', label: 'errors, duplicates, or incorrect totals' },
        { value: '24', label: 'automated race-condition tests' },
      ],
      evidence: [
        { label: 'Load-test script', href: ghPath('ott-platform', 'scripts/load-test.js') },
        { label: 'Concurrency tests', href: ghPath('ott-platform', 'test/concurrency.test.js') },
      ],
    },
    limitations: [
      'No video files are included; playback needs media supplied by whoever runs it.',
      'The login rate limiter is in memory, so several instances would need a shared store.',
    ],
  },
  {
    slug: 'ticket-triage',
    title: 'Support Ticket Triage',
    summary: 'Predicts support-ticket priority and resolution time, and explains each prediction.',
    tier: 'more',
    year: '2026',
    role: 'Solo project',
    contribution:
      'Built an ML pipeline comparing three models, with NLTK and VADER text features, SHAP explanations, and a Dockerized Flask API.',
    result: { headline: 'Macro-F1 0.705; MAE 12.2 h vs. 24.4 h baseline', qualifier: '20,000 synthetic tickets' },
    tech: ['Python', 'XGBoost', 'SHAP', 'Flask'],
    demo: 'https://richithareddyy-ticket-triage-demostreamlit-app-3uubea.streamlit.app',
    github: gh('ticket-triage'),
    caseStudy: true,
    visual: {
      kind: 'image',
      src: triageDemo,
      alt: 'Ticket Triage live demo: a sample feature-request ticket scored Low priority with 95% confidence, 3.7 days expected resolution, and an on-track 168-hour SLA.',
      caption: 'Live demo scoring a sample feature-request ticket. Screenshot of the demo.',
    },
    gallery: [
      {
        kind: 'image',
        src: triageShapPriority,
        alt: 'Bar chart of mean absolute SHAP values for the priority model; text-signal probabilities and customer tier rank highest.',
        caption: 'Global SHAP importance for the priority model. Plot from the repository.',
      },
      {
        kind: 'image',
        src: triageShapResolution,
        alt: 'Bar chart of mean absolute SHAP values for the resolution-time model.',
        caption: 'Global SHAP importance for the resolution-time model.',
      },
    ],
    status: 'Open source; live demo on Streamlit Community Cloud',
    problem:
      'Triage depends on what a ticket says and who sent it. A useful model needs to be accurate and to explain its output, so an agent can trust or override it.',
    constraints: [
      'Real ticket datasets with resolution times are proprietary, so training uses synthetic tickets with a known causal structure.',
      'Explanations have to be meaningful to an agent, not just mathematically exact.',
    ],
    built: [
      'Comparison of Logistic Regression, Random Forest, and XGBoost',
      'NLTK text features with VADER sentiment, and a PySpark feature job',
      'SHAP per-prediction explanations served through a Flask API and a Streamlit interface',
    ],
    stack: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'NLTK', 'VADER', 'PySpark', 'Flask', 'Streamlit', 'Docker'],
    problemShort: 'A triage model has to be accurate and explain itself, so an agent can trust or override it.',
    decisions: [
      {
        heading: 'Stacked text model for readable explanations',
        body: 'Raw TF-IDF columns made SHAP explanations dominated by absent words. A linear text model now compresses text into a few out-of-fold scores that XGBoost combines with metadata.',
        tradeoff: 'Explanations come at two levels (SHAP on the final model, term weights behind the text score) instead of one.',
      },
      {
        heading: 'Test the explanations and the features',
        body: 'A test confirms grouped SHAP contributions add up to the model output, and a parity test compares the PySpark and pandas features.',
        tradeoff: 'The parity test runs in Docker with Java, which makes the full suite slower; it caught a real rounding difference between Spark and NumPy.',
      },
    ],
    evaluation: {
      method: [
        'Held-out synthetic test set of 3,000 tickets; models trained on the same split.',
        'Baselines: majority class for priority, median for resolution time.',
        'The generator adds label noise on purpose, so a score near 1.0 would suggest leakage.',
      ],
      metrics: [
        { value: '0.705', label: 'macro-F1 on priority', qualifier: 'majority baseline 0.130' },
        { value: '12.2 h', label: 'resolution-time MAE', qualifier: 'median baseline 24.4 h' },
        { value: '15–40 ms', label: 'API response with SHAP', qualifier: 'once warm' },
        { value: '25', label: 'automated tests' },
      ],
      evidence: [{ label: 'Results and method (README)', href: `${gh('ticket-triage')}#results` }],
    },
    limitations: ['Results are on synthetic data and are not evidence of performance on a real support queue.'],
  },
  {
    slug: 'research-paper-summarizer',
    title: 'Research Paper Summarizer',
    summary: 'Summarize, question, and compare academic papers from a PDF, DOI, or arXiv link.',
    tier: 'more',
    year: '2025',
    role: 'Solo project',
    contribution:
      'Built a Streamlit app that parses papers with PyMuPDF and TF-IDF (no LLM parsing) and uses Gemini for five summary styles and paper chat, with model fallback.',
    result: { headline: 'Live demo available', qualifier: 'AI features use the host’s Gemini API quota' },
    tech: ['Python', 'Streamlit', 'Gemini API', 'PyMuPDF'],
    demo: 'https://researchpapersummerizer-3bmsmrmm7glsxfeavslfb6.streamlit.app/',
    github: gh('Researchpaper_summerizer'),
    problemShort: 'Reading, questioning, and comparing long academic papers takes time, and citations are tedious to format.',
    caseStudy: false,
    visual: {
      kind: 'image',
      src: researchDemo,
      alt: 'Research Paper Summarizer live demo with Attention Is All You Need loaded: paper metadata, analysis tabs, and a generated technical summary.',
      caption: 'Live demo with a sample paper and a generated summary. Screenshot of the demo.',
    },
  },
  {
    slug: 'meeting-insights',
    title: 'Meeting Insights',
    summary: 'Turns a meeting transcript into action items, decisions, and open questions.',
    tier: 'more',
    year: '',
    role: 'Solo project',
    contribution:
      'Built a Streamlit prototype that redacts emails and phone numbers, then makes one structured Gemini call and exports the results as JSON.',
    result: { headline: 'Prototype with a live demo', qualifier: 'Works from uploaded transcripts; live Zoom capture is not connected' },
    tech: ['Python', 'Streamlit', 'Gemini API'],
    demo: 'https://richithareddyy-zoom-meeting-insights-app-gr5imo.streamlit.app',
    github: gh('zoom-meeting-insights'),
    problemShort: 'After a meeting, action items, owners, and decisions are buried in a long transcript.',
    caseStudy: false,
    visual: {
      kind: 'image',
      src: meetingDemo,
      alt: 'Meeting Insights live demo with the sample WebVTT transcript loaded, redaction options enabled, and the Analyze meeting button.',
      caption: 'Live demo with the sample transcript and redaction settings. Screenshot of the demo.',
    },
  },
  {
    slug: 'smart-parking',
    title: 'Smart Parking',
    summary: 'Estimates parking-space occupancy by comparing a camera image with an empty reference.',
    tier: 'more',
    year: '',
    role: 'Solo project',
    contribution:
      'Built a MATLAB app for marking spaces, estimating occupancy per space and lane, recommending a lane, and exporting results to CSV.',
    result: { headline: 'MATLAB prototype', qualifier: 'No real-world accuracy benchmark yet' },
    tech: ['MATLAB'],
    github: gh('Smart-Parking-App'),
    problemShort: 'Knowing which spaces in a lot are free, using a single fixed camera.',
    caseStudy: false,
    visual: {
      kind: 'image',
      src: parkingCurrent,
      alt: 'Overhead photo of a parking lot with 18 marked spaces, some occupied.',
      caption: 'Sample input image from the repository, not a detection result.',
    },
  },
];

export const featured = projects.filter((p) => p.tier === 'featured');
export const more = projects.filter((p) => p.tier === 'more');
export const caseStudies = projects.filter((p) => p.caseStudy);

/** Zoom Lens case-study details that do not fit the shared shape. */
export const zoomLens = {
  role: 'Zoom Fellow, ASU Next Lab (a fellowship in partnership with Zoom)',
  /** Demo recording. Put the file in public/ and set the path, e.g. '/zoom-lens-demo.mp4'. */
  demoVideo: null as string | null,
  problem: [
    'Someone is presenting a spreadsheet, a chart, a slide, a paper, or a page of code. You looked away, joined late, or the material is outside what you know.',
    'The usual options are to interrupt the presenter or to wait and hope it becomes clear. Zoom Lens adds a third: ask privately, without interrupting the presenter or other participants.',
  ],
  constraints: [
    'Asking must not interrupt the meeting or signal anything to the room.',
    'Recipient rules must hold even if someone modifies the panel.',
    'Capturing the shared screen directly from the meeting feed needs a capability that is not yet enabled on the Zoom account.',
  ],
  howItWorks:
    'Zoom Lens opens from the Apps panel during a meeting and appears as a narrow panel beside the meeting window with three actions.',
  modes: [
    { name: 'Describe', label: 'Describe screen', estimate: '≈ 6 s', body: 'Summarizes what is shared, naming the content type and reporting the actual numbers and headings.' },
    { name: 'Explain', label: 'Explain this', estimate: '≈ 12 s', body: 'Explains what a chart implies, why a diagram is laid out as it is, or what a piece of code is for.' },
    { name: 'Follow-up', label: 'Ask a follow-up…', estimate: '≈ 3 s', body: 'One question about the previous answer, so you do not have to start over.' },
  ],
  timingContext:
    'The times are the typical waits the prototype’s panel displayed while working, for example “This usually takes about 6 seconds.” They are interface estimates, not results from a formal benchmark.',
  interaction: [
    'Open Zoom Lens from the Apps panel during a meeting. It appears as a narrow panel beside the meeting window, visible only to you.',
    'Choose Describe screen or Explain this. The answer appears in the panel, marked “Only you see your answers.”',
    'Type one follow-up about that answer, or run Describe or Explain again when the shared content changes.',
  ],
  ai: [
    'Each action sends the captured screen to Claude with a different job.',
    'Describe reports what is on screen, naming the content type and quoting real numbers and headings instead of describing them vaguely.',
    'Explain reasons about what the content means, such as what a chart’s shape implies or what a piece of code is for, so it is allowed to take longer.',
    'Follow-up is scoped to the previous answer, so a question like “why does that matter?” has context.',
  ],
  boundaries: {
    covered: [
      'Other participants do not see that you asked, or the answer.',
      'Nothing appears in the meeting, and the presenter is not notified.',
      'The server has no broadcast path and refuses replies that do not match a request.',
    ],
    notCovered: [
      'The captured screen is sent to Claude to produce each answer.',
      'The capture includes whatever is on the participant’s display, not only the shared content.',
    ],
  },
  challenges: [
    'A meeting app is shared by everyone in the meeting, but each answer must reach exactly one person.',
    'The panel runs on the participant’s machine, so it cannot be trusted to enforce who sees what.',
    'Direct capture from the meeting feed is not enabled on the account, so the prototype needs a working capture path now without treating it as the final design.',
    'Answers have to be specific enough to help and fast enough to use while the meeting continues.',
  ],
  delivery: {
    rules: [
      { title: 'One recipient per message', body: 'Every message the server sends is addressed to exactly one session.' },
      { title: 'No broadcast path', body: 'The server has no way to send a message to the whole meeting.' },
      { title: 'Replies must match a request', body: 'A reply is refused unless it matches a request that the same session made.' },
    ],
  },
  decisions: [
    {
      heading: 'Enforce answer delivery on the server',
      body: 'Recipient rules live on the server, where the person running the panel cannot change them. Other participants do not see the request or the answer.',
      tradeoff:
        'This controls who sees answers inside the meeting. It is not an end-to-end privacy guarantee: the captured screen is still sent to Claude to produce each answer.',
    },
    {
      heading: 'Read the participant’s display for now',
      body: 'Until direct meeting-feed capture is enabled, the prototype captures the requesting participant’s display.',
      tradeoff:
        'This is not the same as capturing the meeting feed. An answer can mention anything visible on that screen; in testing, a Describe answer also listed browser tabs and participant names that were on screen.',
    },
    {
      heading: 'Do not notify the presenter',
      body: 'People use Zoom Lens because they do not want to interrupt or admit they lost track, and a notification would remove that.',
      tradeoff: 'It is a real asymmetry, and whether it is acceptable is a judgement for people to make, not something the code can settle.',
    },
  ],
  progress: {
    built: [
      'Runs inside a live Zoom meeting, opened from the Apps panel',
      'Describe, Explain, and Follow-up on shared-screen content',
      'Each answer returns only to the requester',
      'Server-side recipient rules: single recipient, no broadcast, request matching',
    ],
    notYet: ['Capture directly from the meeting feed'],
    exploring: [
      'Continuous screen understanding instead of on-demand snapshots',
      'Reasoning over the transcript and the screen together',
      'Accessibility support',
    ],
  },
} as const;

