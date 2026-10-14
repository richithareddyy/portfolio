import type { ImageMetadata } from 'astro';
import codeatlasImpact from '../assets/projects/codeatlas-impact.png';
import codeatlasGraph from '../assets/projects/codeatlas-graph.png';
import codeatlasChanges from '../assets/projects/codeatlas-changes.png';
import triageDemo from '../assets/projects/triage-demo.webp';
import researchDemo from '../assets/projects/research-demo.webp';
import meetingDemo from '../assets/projects/meeting-demo.webp';
import streamboxHome from '../assets/projects/streambox-home.webp';
import triageShapPriority from '../assets/projects/triage-shap-priority.png';
import triageShapResolution from '../assets/projects/triage-shap-resolution.png';
import parkingCurrent from '../assets/projects/parking-current.jpeg';
import causewayRecovery from '../assets/projects/causeway-estimator-recovery.png';
import causewayItt from '../assets/projects/causeway-itt-effects.png';
import causewaySensitivity from '../assets/projects/causeway-sensitivity.png';
import gridcastModels from '../assets/projects/gridcast-model-comparison.png';
import gridcastCalibration from '../assets/projects/gridcast-interval-calibration.png';
import gridcastConditions from '../assets/projects/gridcast-error-conditions.png';

export type Link = { label: string; href: string };

/** A result plus the condition it was measured under. */
export type Metric = { value: string; label: string; qualifier?: string };

export type Decision = { heading: string; body: string; tradeoff: string };

export type DataTable = { caption: string; columns: string[]; rows: string[][]; note?: string };

export type Visual = { kind: 'image'; src: ImageMetadata; alt: string; caption: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tier: 'featured' | 'more';
  year: string;
  role: string;
  contribution: string;
  /** Strongest supported result, or the current status when there is no result yet. */
  result: { headline: string; qualifier?: string };
  tech: string[];
  demo?: string;
  /** Product or landing page, as opposed to an interactive demo. */
  site?: string;
  github?: string;
  caseStudy: boolean;
  /** ZoomLens shows its product site and the Reddit pipeline its interactive diagram instead. */
  visual?: Visual;
  gallery?: Visual[];

  // Featured projects on the homepage
  hook?: string;
  story?: { label: string; text: string }[];

  // Case-study content
  status?: string;
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
    title: 'ZoomLens',
    summary:
      'An AI assistant inside Zoom that privately explains whatever someone is sharing on screen: a spreadsheet, a chart, a slide, a paper, or code.',
    tier: 'featured',
    year: '2026 – present',
    role: 'Zoom Fellow, ASU Next Lab',
    contribution:
      'Built it end to end in Node.js: the in-meeting panel on the Zoom Apps SDK, a WebSocket server that addresses every answer to the one participant who asked, screen capture and H.264 decoding, and Claude vision prompts for Describe, Explain, questions and follow-ups.',
    result: {
      headline: 'Working prototype in live Zoom meetings',
      qualifier: 'Captures the participant’s display for now, not the meeting feed',
    },
    tech: ['Node.js', 'Zoom Apps SDK', 'Zoom Realtime Media Streams API', 'WebSockets', 'Claude', 'ffmpeg'],
    hook: 'You join a meeting late, someone is sharing a dense chart, and you would rather not interrupt everyone to ask what it means.',
    story: [
      {
        label: 'The experience',
        text: 'Open ZoomLens from the Apps panel, press Describe or Explain, or type a question about the shared screen. Only you see the answer, and the presenter is never interrupted.',
      },
      {
        label: 'How it works',
        text: 'A panel built on the Zoom Apps SDK talks to a Node.js WebSocket server. On each request the server captures one still of the screen, sends it to Claude with instructions for that kind of question, and returns the answer.',
      },
      {
        label: 'The hard part',
        text: 'Privacy is enforced on the server, not the panel: each connection is bound to one participant, there is no broadcast path, and seven isolation tests run against the real server.',
      },
      {
        label: 'Status',
        text: 'Working prototype in live Zoom meetings. For now it captures the asking participant’s display, not the meeting’s screen-share stream.',
      },
    ],
    site: 'https://zoomlens.vercel.app/',
    github: gh('ZoomLens'),
    caseStudy: true,
  },
  {
    slug: 'causeway',
    title: 'CauseWay',
    summary:
      'A causal study of a randomized e-mail experiment, then a test of how well observational methods recover its answer once randomization is taken away.',
    tier: 'featured',
    year: '2026',
    role: 'Solo project',
    contribution:
      'Built a Python package that estimates the experiment’s effects, constructs observational samples from it by rejection sampling, and scores IPW, matching, outcome regression, cross-fitted AIPW, and Double ML against the randomized answer.',
    result: {
      headline: 'Naive comparison overstated the effect by about half',
      qualifier: '200 constructed samples per scenario, from a 64,000-customer experiment',
    },
    tech: ['Python', 'statsmodels', 'EconML', 'DoubleML'],
    hook: 'A company e-mails its best customers and sees them spend more. Did the e-mail cause that, or would they have bought anyway?',
    story: [
      {
        label: 'The setup',
        text: 'A randomized experiment with 64,000 customers gives the true answer: the Mens e-mail raised two-week spend by $0.77 per customer. Then the randomization is removed on purpose, in a documented way, to see what observational methods recover.',
      },
      {
        label: 'The test',
        text: 'Seven estimators, from a naive comparison to cross-fitted AIPW and Double ML, are scored against the experimental answer over 200 constructed samples in each of three scenarios.',
      },
      {
        label: 'What held up',
        text: 'With every confounder observed, weighting and AIPW land within Monte Carlo error, while the naive comparison overstates the effect by about half. Hide one confounder and every method stays biased by 14 to 47% on spend, even though the usual refutation tests still pass.',
      },
    ],
    github: gh('CauseWay'),
    caseStudy: true,
    visual: {
      kind: 'image',
      src: causewayRecovery,
      alt: 'Heatmap of mean bias for eight estimators across three selection scenarios: weighting and AIPW near zero when confounders are observed, every estimator biased when one is hidden.',
      caption: 'Mean bias of each estimator over 200 constructed samples per scenario. Figure from the repository.',
    },
    gallery: [
      {
        kind: 'image',
        src: causewayItt,
        alt: 'Intention-to-treat effects of the Mens and Womens e-mails on spend, visits, and conversions, with 95% intervals.',
        caption: 'Effects of assignment to each e-mail in the randomized experiment, with 95% intervals.',
      },
      {
        kind: 'image',
        src: causewaySensitivity,
        alt: 'Sensitivity summaries for scenarios A and C: robustness values, E-values, and Rosenbaum gamma rise when a confounder is hidden.',
        caption: 'Sensitivity summaries with every confounder observed (A) and with one hidden (C).',
      },
    ],
    status: 'Complete; lint and tests run in GitHub Actions',
    problem:
      'Does a promotional e-mail make customers spend more, or do companies simply e-mail the customers who would have bought anyway? Observational data cannot separate the two. A randomized experiment can, and it also gives a known answer to test observational methods against.',
    constraints: [
      'The experiment identifies the effect of being assigned an e-mail, not of receiving or opening one; neither was recorded.',
      'About 99% of customers spent nothing in the two-week window, so spend estimates are noisy.',
      'Each observational estimate has to be compared with the benchmark for its own estimand, ATE or ATT.',
    ],
    built: [
      'Data pipeline that verifies the source checksum, runs schema, balance, and domain checks, and stops on any failure',
      'Experimental estimates with randomization tests, bootstrap intervals, and Holm adjustment',
      'Three selection scenarios: moderate, strong, and one with a hidden confounder',
      'Hand-written cross-fitted AIPW and DML orthogonal score, checked against EconML and DoubleML',
      'Causal-forest heterogeneity tests, targeting-policy evaluation, refutation tests, and E-value, Rosenbaum, and omitted-variable sensitivity analysis',
    ],
    stack: ['Python', 'NumPy', 'pandas', 'SciPy', 'statsmodels', 'Scikit-learn', 'EconML', 'DoubleML', 'Matplotlib', 'pytest', 'GitHub Actions'],
    challenges: [
      'Naive subsampling to create confounding shifts the covariate distribution and biases even an estimator that knows the true propensity, so selection uses RCT rejection sampling, checked with an oracle IPW first.',
      'Telling estimator bias from simulation noise: every bias is reported with its Monte Carlo standard error over 200 draws per cell.',
      'Staying honest after seeing the data: the benchmark and the heterogeneity, robustness, and sensitivity plans were committed before their results.',
    ],
    tables: [
      {
        caption: 'Mean bias of the spend estimate, % of each estimator’s own benchmark (200 draws per cell)',
        columns: ['Estimator', 'Mens A', 'Mens B', 'Mens C', 'Womens A', 'Womens B', 'Womens C'],
        rows: [
          ['Naive difference', '+48%', '+70%', '+48%', '+57%', '+75%', '+57%'],
          ['Outcome regression (OLS)', '−4%', '−4%', '+14%', '+10%', '+23%', '+34%'],
          ['IPW (ATE)', '+0%', '−2%', '+18%', '+0%', '+2%', '+46%'],
          ['AIPW (cross-fitted)', '+1%', '+1%', '+19%', '+1%', '+3%', '+47%'],
          ['DML (gradient boosting)', '+0%', '+1%', '+19%', '+7%', '+1%', '+46%'],
          ['IPW (ATT)', '+1%', '−0%', '+18%', '−3%', '−6%', '+43%'],
          ['1:1 matching (ATT)', '−12%', '−9%', '−4%', '+20%', '+57%', '+13%'],
        ],
        note: 'A: moderate selection on observed covariates. B: twice as strong. C: as A, with recency hidden from the analyst.',
      },
    ],
    decisions: [
      {
        heading: 'Rejection sampling, not naive subsampling',
        body: 'Customers are kept from each randomized pair with a probability that depends on their history. That preserves the covariate distribution, and the full pair still supplies the true answer.',
        tradeoff: 'The selection rule is smooth and logistic by design; real selection may be stronger, nonlinear, or driven by things nobody recorded.',
      },
      {
        heading: 'Freeze the benchmark before estimating',
        body: 'The scenarios and scoring rules were committed in configs/benchmark/v1.toml before any observational estimate was computed.',
        tradeoff: 'Results that look odd afterward are reported as they are rather than fixed by changing the setup.',
      },
      {
        heading: 'Write the estimators, then check them',
        body: 'Cross-fitted AIPW and the DML orthogonal score are implemented directly and tested against EconML and DoubleML.',
        tradeoff: 'More code to maintain than calling the libraries, in exchange for knowing exactly what each estimate does.',
      },
    ],
    evaluation: {
      method: [
        'Part I: differences in means for each e-mail against no e-mail, with 95% intervals, Holm-adjusted p-values, and randomization tests.',
        'Part II: 200 constructed samples per scenario, scoring each estimator’s bias, RMSE, and interval coverage against its estimand’s experimental benchmark.',
        'Heterogeneity: one of six pre-specified tests found variation, and model-based targeting did not beat sending everyone the Mens e-mail.',
        'Tests use synthetic fixtures and reference calculations; CI runs Ruff, a dependency check, and pytest.',
      ],
      metrics: [
        { value: '+$0.77', label: 'two-week spend per customer from the Mens e-mail', qualifier: '95% CI $0.49 to $1.05' },
        { value: '+48%, +57%', label: 'naive overstatement of the effect', qualifier: 'moderate selection, Mens and Womens' },
        { value: '0–3%', label: 'IPW and AIPW bias with every confounder observed', qualifier: 'within Monte Carlo error' },
        { value: '14–47%', label: 'bias on spend with one confounder hidden', qualifier: 'weighting, regression, AIPW, and DML' },
      ],
      evidence: [
        { label: 'Findings report', href: ghPath('CauseWay', 'docs/findings.md') },
        { label: 'Design record', href: ghPath('CauseWay', 'docs/design.md') },
        { label: 'Frozen benchmark spec', href: ghPath('CauseWay', 'configs/benchmark/v1.toml') },
        { label: 'Estimator tests', href: ghPath('CauseWay', 'tests/test_estimators.py') },
        { label: 'CI workflow', href: ghPath('CauseWay', '.github/workflows/ci.yml') },
      ],
    },
    limitations: [
      'One retailer, one campaign, 2008; customer behavior and e-mail practice have changed since.',
      'Part II shows what estimators recover when assumptions hold or fail by construction. It cannot certify those assumptions on real observational data.',
      'The outcome window is two weeks, with no cost or margin data, so nothing here speaks to profit.',
    ],
  },
  {
    slug: 'gridcast',
    title: 'GridCast',
    summary: 'Day-ahead forecasts of New England electricity demand, with calibrated intervals and a close look at where the models fail.',
    tier: 'featured',
    year: '2026',
    role: 'Solo project',
    contribution:
      'Built a forecasting study that backtests six models on 24-hour paths, selects one on validation only, and evaluates its accuracy and prediction intervals on a reserved 2024 test year.',
    result: { headline: '705 MW test MAE, 22% below the seasonal baseline', qualifier: 'LightGBM on hourly ISNE demand, 2024 test year' },
    tech: ['Python', 'LightGBM', 'PyTorch', 'statsmodels'],
    hook: 'Tomorrow’s hourly electricity demand has to be forecast today, and the hours that matter most, the extreme ones, are where forecasts tend to fail.',
    story: [
      {
        label: 'Protocol',
        text: 'Six models, from seasonal naive to LightGBM and an LSTM, forecast 24-hour paths using only data that would have been reported by 00:00 UTC. One model is chosen on 2023 validation folds, and the 2024 test year stays closed until then.',
      },
      {
        label: 'Result',
        text: 'LightGBM reached a 705.2 MW test MAE, 22.3% below the daily seasonal baseline, and its 95% intervals covered 93.8% of hours.',
      },
      {
        label: 'Where it breaks',
        text: 'During extreme demand that coverage falls to 84.5%, and a simpler harmonic model had lower validation error than LightGBM in those hours.',
      },
    ],
    github: gh('GridCast'),
    caseStudy: true,
    visual: {
      kind: 'image',
      src: gridcastModels,
      alt: 'Bar charts of validation MAE and RMSE for six models: naive highest, LightGBM and LSTM lowest.',
      caption: 'Validation MAE and RMSE for the six models. Figure from the repository.',
    },
    gallery: [
      {
        kind: 'image',
        src: gridcastCalibration,
        alt: 'Prediction-interval coverage by operating condition on the test year, falling below nominal during extreme demand.',
        caption: 'Interval coverage by operating condition on the 2024 test year.',
      },
      {
        kind: 'image',
        src: gridcastConditions,
        alt: 'Forecast errors across weekdays, weekends, holidays, peak hours, extreme demand, and extreme temperatures.',
        caption: 'Errors by operating condition; the groups overlap.',
      },
    ],
    status: 'Complete; CI checks tests, saved results, and the README',
    problem:
      'How accurately can tomorrow’s hourly electricity demand be forecast, how uncertain are those forecasts, and when does a model actually beat a strong seasonal baseline? An average error hides the hours that matter most to a grid.',
    constraints: [
      'Each forecast is made at 00:00 UTC for the next 24 hours, and demand is reported an hour late, so the newest usable hour is two hours old.',
      'Observed weather never enters a predictor, since it would not be known at forecast time.',
      'The test year stays closed until the model, tree count, and thresholds are fixed on earlier data.',
    ],
    built: [
      'Data pipeline for EIA-930 demand and NOAA temperature, with source checksums and validation',
      'Six models: naive, daily and weekly seasonal naive, harmonic regression with AR(1) errors, LightGBM, and an LSTM',
      'Nine expanding monthly validation folds, then monthly refits through the test year',
      'Prediction intervals from rolling 90-day residuals, computed separately for each horizon',
      'Anomaly flags for hours outside the 95% interval, grouped into episodes',
    ],
    stack: ['Python', 'pandas', 'NumPy', 'LightGBM', 'PyTorch', 'statsmodels', 'Matplotlib', 'Jupyter', 'pytest', 'GitHub Actions'],
    challenges: [
      'Leakage is easy in time series: every feature, early-stopping window, and threshold may only use labels that would already have been reported.',
      'Daylight-saving gaps, repeated autumn hours, and leap days all have to survive the move from local hour-ending timestamps to UTC interval starts.',
      'Good average accuracy can hide poor coverage during extreme demand, so errors and intervals are reported by operating condition.',
    ],
    tables: [
      {
        caption: 'Validation results, nine monthly folds (January to September 2023)',
        columns: ['Model', 'MAE (MW)', 'RMSE (MW)', 'WAPE', 'MASE'],
        rows: [
          ['LightGBM', '723.7', '1,019.2', '5.60%', '0.539'],
          ['LSTM', '751.9', '1,043.4', '5.82%', '0.560'],
          ['Daily seasonal naive', '924.3', '1,288.9', '7.15%', '0.689'],
          ['Harmonic regression', '1,008.5', '1,283.8', '7.80%', '0.752'],
          ['Weekly seasonal naive', '1,438.3', '1,987.1', '11.13%', '1.072'],
          ['Naive', '2,515.5', '3,003.1', '19.46%', '1.876'],
        ],
        note: 'Harmonic regression had the lowest validation MAE during extreme demand (1,415.5 MW).',
      },
      {
        caption: 'Prediction intervals on the 2024 test year',
        columns: ['Nominal', 'Coverage', 'Mean width (MW)', 'Extreme-demand coverage'],
        rows: [
          ['50%', '51.25%', '1,152.2', '25.15%'],
          ['80%', '78.85%', '2,268.5', '58.19%'],
          ['95%', '93.84%', '3,939.9', '84.50%'],
        ],
      },
    ],
    decisions: [
      {
        heading: 'Predict a correction to the seasonal baseline',
        body: 'LightGBM and the LSTM forecast the difference from the daily seasonal naive forecast. LightGBM works from lags, rolling summaries, calendar features, and the horizon; the LSTM encodes the last available week.',
        tradeoff: 'The lowest average error does not mean the best under stress: harmonic regression did better during extreme demand.',
      },
      {
        heading: 'Select on validation, test once',
        body: 'Validation fixes the model and tree count before calibration or test outcomes are opened, and only the selected model and the predeclared daily baseline are scored on 2024.',
        tradeoff: 'No retuning after seeing the test year, even where it might have helped.',
      },
      {
        heading: 'Intervals from recent residuals',
        body: 'Intervals use the last 90 days of absolute residuals for each horizon, counting only residuals whose labels have been reported.',
        tradeoff: 'Serial dependence and drift rule out a distribution-free coverage guarantee, and coverage drops during extreme demand.',
      },
    ],
    evaluation: {
      method: [
        'Validation: nine expanding monthly folds, January to September 2023, selecting by overall MAE.',
        'Final test: 2024, with monthly refits on labels already reported and hyperparameters frozen.',
        'Paired model comparisons use daily MAE differences with HAC intervals and Holm-adjusted p-values.',
        'Tests change future data and corrupt saved evidence to check that leakage and stale results are rejected.',
      ],
      metrics: [
        { value: '705.2 MW', label: 'test MAE (LightGBM)', qualifier: '907.8 MW for daily seasonal naive' },
        { value: '22.3%', label: 'lower MAE than the seasonal baseline', qualifier: '2024 test year' },
        { value: '93.8%', label: 'coverage of the 95% interval', qualifier: '84.5% during extreme demand' },
        { value: '541', label: 'flagged hours in 175 episodes', qualifier: 'unusual against the forecast, not verified outages' },
      ],
      evidence: [
        { label: 'Results summary', href: ghPath('GridCast', 'reports/results/summary.json') },
        { label: 'Reliability findings', href: ghPath('GridCast', 'reports/reliability_findings.md') },
        { label: 'Leakage tests', href: ghPath('GridCast', 'tests/test_leakage.py') },
        { label: 'Interval code', href: ghPath('GridCast', 'src/gridcast/uncertainty.py') },
        { label: 'CI workflow', href: ghPath('GridCast', '.github/workflows/ci.yml') },
      ],
    },
    limitations: [
      'One region, a small model search, and one neural training seed do not show that any model family is better in general.',
      'Three weather stations stand in for a six-state grid, and operational weather forecasts are not used.',
      'The data are retrospective and may have been revised since they were first published.',
      'There is no ground truth for reading flagged hours as outages or failures.',
    ],
  },
  {
    slug: 'codeatlas',
    title: 'CodeAtlas',
    summary:
      'Static analysis for Rust that traces which functions, modules, and tests a code change can affect, with the source line behind each step.',
    tier: 'more',
    year: '2026',
    role: 'Solo project',
    contribution:
      'Built a Rust analyzer that labels each call site by whether it can be resolved, then answers change-impact queries from a Neo4j call graph.',
    result: { headline: '3.6 s to index tokio', qualifier: '808 files, ~163k LOC, release build on one machine' },
    tech: ['Rust', 'tree-sitter', 'Neo4j', 'GraphQL'],
    hook: 'Before merging a change, you want to know what it can break and which tests to run, and you want an answer you can check.',
    story: [
      {
        label: 'Architecture',
        text: 'A tree-sitter analyzer rebuilds the module tree and resolves calls with Rust’s scoping and visibility rules. Each call site is labeled resolved, ambiguous, or unresolved, and the call graph is stored in Neo4j and queried through GraphQL.',
      },
      {
        label: 'Benchmark',
        text: 'Indexes tokio (808 files, about 163k lines) in 3.6 s on one machine. Test selection reached 83 to 100% recall on small fixture projects; unexpanded macros limit it on large crates.',
      },
    ],
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
    summary: 'A PostgreSQL ETL pipeline that loads 18.9M Reddit-format records and accounts for every line it rejects.',
    tier: 'more',
    year: '2026',
    role: 'Solo project',
    contribution:
      'Built a five-stage pipeline (extract, validate, stage, merge, check) with per-line rejection records, set-based deduplication, and 13 post-load quality checks.',
    result: {
      headline: '18.9M lines reconciled exactly; 584 s cut to 345 s',
      qualifier: 'Generated data with injected defects, one machine',
    },
    tech: ['Python', 'PostgreSQL', 'SQL', 'Docker'],
    hook: 'Archive dumps are full of malformed lines, duplicates, and records whose parents never show up. A naive load either crashes or quietly stores bad data.',
    story: [
      {
        label: 'Scale',
        text: '18,897,027 lines (5.9 GB of NDJSON) streamed in constant memory, with malformed lines, duplicates, and orphaned records injected at a 1% rate.',
      },
      {
        label: 'Pipeline',
        text: 'Extract, validate, bulk-load with COPY, merge in one set-based deduplication pass, then rebuild constraints and run 13 quality checks. Every rejected line keeps its source line and reason.',
      },
      {
        label: 'Result',
        text: 'Every count reconciled with the generator’s manifest, and a full run dropped from 584 s to 345 s. Measured on generated data on one machine.',
      },
    ],
    github: gh('reddit-data-pipeline'),
    caseStudy: true,
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
    demo: 'https://ott-platform-azon.onrender.com/',
    github: gh('ott-platform'),
    caseStudy: true,
    visual: {
      kind: 'image',
      src: streamboxHome,
      alt: 'StreamBox home page: a featured series with Play and More info buttons, a Most watched row of poster art, and a banner offering a live demo without an account.',
      caption: 'StreamBox home page. Screenshot of the live demo.',
    },
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
    github: gh('research-paper-summarizer'),
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
    caseStudy: false,
    visual: {
      kind: 'image',
      src: parkingCurrent,
      alt: 'Synthetic parking-lot sample showing 18 marked spaces, some occupied.',
      caption: 'Sample input image from the repository, not a detection result.',
    },
  },
];

export const featured = projects.filter((p) => p.tier === 'featured');
export const more = projects.filter((p) => p.tier === 'more');
export const caseStudies = projects.filter((p) => p.caseStudy);

/** ZoomLens case-study details that do not fit the shared shape. */
export const zoomLens = {
  role: 'Zoom Fellow, ASU Next Lab (a fellowship in partnership with Zoom)',
  /** Demo recording. Put the file in public/ and set the path, e.g. '/zoom-lens-demo.mp4'. */
  demoVideo: null as string | null,
  problem: {
    intro: 'During a screen share, people often:',
    points: [
      'join late, after the explanation has started',
      'miss part of it while answering a message',
      'face a chart, spreadsheet or diagram outside what they know',
      'need one thing clarified, not the whole talk repeated',
      'would rather not interrupt the presenter in front of everyone',
    ],
    close: 'ZoomLens gives them a private way to understand what is on screen right now.',
  },
  steps: [
    {
      title: 'Ask',
      body: 'Open ZoomLens from the Apps panel during a meeting. Press Describe screen or Explain this, or type a question. The panel knows which meeting and which participant it belongs to through the Zoom Apps SDK.',
      files: ['public/panel.js'],
    },
    {
      title: 'Capture',
      body: 'At that moment the server takes one still of the shared screen: the latest frame of the meeting’s screen-share stream, decoded with ffmpeg, or, while that stream is unavailable, the asking participant’s own display. Every answer says which source it used.',
      files: ['framebuffer.js', 'decode.js', 'screen.js'],
    },
    {
      title: 'Understand',
      body: 'The image and the request go to Claude with instructions for that kind of request: describe what is there, explain what it means, answer a question, or follow up on the previous answer.',
      files: ['answer.js'],
    },
    {
      title: 'Answer',
      body: 'The answer is sent to the one session that asked. Nobody else in the meeting sees the question or the answer, and the presenter is not notified.',
      files: ['relay.js'],
    },
  ],
  modes: [
    { name: 'Describe', label: 'Describe screen', estimate: '≈ 6 s', body: 'What is on screen, naming the kind of content and quoting the real numbers and headings.' },
    { name: 'Explain', label: 'Explain this', estimate: '≈ 12 s', body: 'What it means: what a chart implies, why a diagram is laid out as it is, what a piece of code is for.' },
    { name: 'Question', label: 'Ask about the shared screen…', estimate: '≈ 7 s', body: 'Any question about what is on screen, answered from the image.' },
    { name: 'Follow-up', label: 'Ask a follow-up…', estimate: '≈ 3 s', body: 'A question about the previous answer, which is sent along so the answer has context.' },
  ],
  timingContext:
    'Times are what the panel’s waiting state is set to expect, not results from a benchmark.',
  built: [
    {
      title: 'The panel inside Zoom',
      body: 'Runs in the Zoom client, reads the meeting and participant identity through the Zoom Apps SDK, talks to the server over a WebSocket, shows how long each kind of request usually takes, and keeps a short thread for follow-ups.',
      files: ['public/panel.js'],
    },
    {
      title: 'A server that answers one person at a time',
      body: 'Every WebSocket connection is bound to one participant. A single function is the only way a message leaves the server, and it takes a session, not a socket, so there is no broadcast path. A reply is refused unless that session made the request.',
      files: ['relay.js'],
    },
    {
      title: 'Screen capture from the meeting stream',
      body: 'Handling for Zoom’s Realtime Media Streams webhooks, including the signed URL validation; an in-memory H.264 buffer that always holds a decodable clip; and decoding to a still image with ffmpeg only when someone asks, which took 25 to 110 ms in testing.',
      files: ['index.js', 'framebuffer.js', 'decode.js'],
    },
    {
      title: 'Prompts per kind of request',
      body: 'Separate instructions and reasoning effort for describe, explain, questions and follow-ups. Follow-ups carry the previous answer for scope, and every prompt tells the model to ignore ZoomLens’s own panel in the image.',
      files: ['answer.js'],
    },
    {
      title: 'Limits that a reload cannot reset',
      body: 'A minimum gap between one participant’s questions and a daily cap, counted per participant rather than per connection. The panel says how long to wait instead of failing silently.',
      files: ['relay.js'],
    },
    {
      title: 'Zoom sign-in and stream control',
      body: 'OAuth authorization-code sign-in with refresh-token rotation, used to start the meeting’s media stream through Zoom’s REST API.',
      files: ['zoom-auth.js', 'refresh-token.js', 'start-rtms.js'],
    },
    {
      title: 'Tests for the privacy claim',
      body: 'Seven isolation cases run against the real server, including ten participants asking at the same moment. The protection was deliberately broken to confirm the tests fail when it does.',
      files: ['test-isolation.js'],
    },
  ],
  decisions: [
    {
      heading: 'Enforce privacy on the server, not in the panel',
      problem: 'Every participant runs their own copy of the panel, so anything the panel enforces can be changed by whoever runs it.',
      decision: 'Bind each connection to one participant, make a session-addressed send the only way out of the server, and refuse replies that match no request from that session.',
      why: 'A modified panel still cannot receive someone else’s answer. It covers who sees answers inside the meeting; the image itself still goes to Claude.',
    },
    {
      heading: 'Keep a decodable clip, not single frames',
      problem: 'Shared screens arrive as H.264, where only a keyframe is a whole picture and every other packet is a change to it. A single packet usually cannot be decoded.',
      decision: 'Buffer the latest parameter sets plus everything since the latest keyframe, capped by size, and decode with ffmpeg only when someone asks.',
      why: 'An image is ready within about a tenth of a second, without decoding video nobody asked about. Building it surfaced two bugs: keyframes split across several units were cut to their last piece, and data arriving in chunks broke wherever a boundary fell between two.',
    },
    {
      heading: 'Fall back, and say so',
      problem: 'Reading the meeting’s media stream needs a capability that is not delivering on the account: starting the stream succeeds, but no video arrives.',
      decision: 'Try sources in order of how close they are to the real thing (the meeting stream, then the participant’s own display, then a recording) and label every answer with the source it used.',
      why: 'The product works and can be demonstrated now, and no one mistakes a display capture for the meeting feed. The cost is that a display capture sees everything on that screen, not only the shared content.',
    },
    {
      heading: 'Count limits per person, not per connection',
      problem: 'Every question costs money and several seconds, and nothing stopped someone pressing the button repeatedly or reopening the panel to start again.',
      decision: 'A cooldown and a daily cap keyed on the participant’s identity, checked last so a refused request reveals nothing else.',
      why: 'Reloading does not reset the count, and a second genuine question a few seconds later gets a clear wait time instead of a silent failure.',
    },
  ],
  stack: [
    { name: 'Node.js, Express', use: 'Server, Zoom webhooks, and serving the panel' },
    { name: 'WebSockets (ws)', use: 'One connection per participant, answers addressed to one session' },
    { name: 'Zoom Apps SDK', use: 'The panel inside the Zoom client, and who is asking' },
    { name: 'Zoom Realtime Media Streams', use: 'Screen-share video from the meeting' },
    { name: 'Zoom OAuth and REST API', use: 'Signing in and starting the media stream' },
    { name: 'ffmpeg', use: 'H.264 video to one still image' },
    { name: 'Claude API', use: 'Reading the image and writing the answer' },
    { name: 'HTML, CSS, JavaScript', use: 'The panel interface, with no framework' },
  ],
  progress: {
    built: [
      'Runs inside a live Zoom meeting, opened from the Apps panel',
      'Describe, Explain, typed questions and follow-ups',
      'Each answer reaches only the person who asked',
      'Isolation and rate limits covered by automated tests',
    ],
    notYet: [
      'The meeting’s media stream is not delivering on the current Zoom account, so answers come from the asking participant’s display, which can include anything else on it, such as browser tabs or names.',
      'It runs from a laptop for now; permanent hosting is planned but not done.',
      'Isolation is proven by automated tests against the real server, not yet by several people in one live meeting.',
      'Closing and reopening the panel loses the conversation, so a follow-up after that has no context.',
      'Answers take seconds, and the screen image goes to a third-party model without filtering.',
      'The presenter is not told that someone is asking. That is deliberate, and it is the main open question for ethical review.',
      'There is no formal evaluation of answer quality yet.',
    ],
    exploring: [
      'Continuous screen understanding instead of on-demand snapshots',
      'Reasoning over the transcript and the screen together',
      'Accessibility support',
    ],
  },
} as const;

