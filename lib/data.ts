export const SITE = {
  name: "Spatial Alphabet",
  url: "https://www.spatialalphabet.com",
  tagline: "AI-Enabled Geospatial & Engineering Solutions",
  email: "info@spatialalphabet.com",
  phone: "+1 (817) 231-0158",
  phoneHref: "tel:+18172310158",
  linkedin: "https://www.linkedin.com/company/spatial-alphabet-int-inc/",
  offices: {
    keller: {
      label: "HQ — KELLER, TX, USA",
      city: "Keller",
      region: "TX",
      country: "US",
      coords: "32.9346° N, 97.2517° W",
      lat: 32.9346,
      lng: -97.2517,
    },
    hyderabad: {
      label: "ODC — HYDERABAD, TELANGANA, INDIA",
      city: "Hyderabad",
      region: "Telangana",
      country: "IN",
      coords: "17.3850° N, 78.4867° E",
      lat: 17.385,
      lng: 78.4867,
    },
  },
} as const;

export type ProcessStep = { num: string; title: string; desc: string };

export type Service = {
  slug: string;
  name: string;
  navName: string;
  promise: string;
  tags: string;
  tools: string[];
  heroImg: string;
  heroAlt: string;
  sideImg: string;
  sideAlt: string;
  problemTitle: string;
  problem: string;
  deliver: { title: string; desc: string }[];
  process: ProcessStep[];
  industries: string[];
  metaTitle: string;
  metaDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: "integrated-engineering-services",
    name: "Integrated Engineering Services",
    navName: "Integrated Engineering Services",
    promise:
      "Telecom, power line, and electrical utility network engineering — delivered first-time-right for overhead utility construction.",
    tags: "PLS-CADD · PLS-POLE · AUTOCAD · OCALC PRO · SPIDA CALC",
    tools: ["PLS-CADD", "PLS-POLE", "AutoCAD", "O-Calc Pro", "SPIDA Calc", "MicroStation"],
    heroImg: "/assets/gen/sag-profile.png",
    heroAlt: "Transmission line sag profile with lattice structures and clearance envelope",
    sideImg: "/assets/gen/contour-blueprint.png",
    sideAlt: "Survey contour plan with traverse stations and benchmarks",
    problemTitle: "Design backlogs don't wait for hiring cycles.",
    problem:
      "Grid modernization, storm hardening, fiber build-outs, and joint-use demand leave utilities and telecoms carrying engineering backlogs their in-house teams can't clear. We give you an integrated engineering bench — telecom, power line, and electrical utility design — that works to your standards, your templates, and your QC checklist, and delivers packages your engineers approve on first review.",
    deliver: [
      {
        title: "Telecom Engineering",
        desc: "Pole loading analysis, fiber network design (HLD/LLD), and permitting for wireline and wireless build-outs.",
      },
      {
        title: "Power Line Systems",
        desc: "Transmission and distribution line engineering using PLS-CADD and PLS-POLE.",
      },
      {
        title: "Electrical Utility Network Design",
        desc: "AutoCAD-based existing and proposed engineering design drawings for overhead utility construction.",
      },
    ],
    process: [
      { num: "01", title: "Standards intake", desc: "We absorb your design standards, assembly units, and QC criteria before the first structure is modeled." },
      { num: "02", title: "Pilot circuit", desc: "One feeder, line section, or fiber route designed end-to-end, reviewed against your acceptance checklist." },
      { num: "03", title: "Scaled delivery", desc: "Hyderabad execution with US engineering oversight — throughput that flexes with your program." },
      { num: "04", title: "Approval & handoff", desc: "Deliverables arrive construction-ready, with QC evidence attached. Zero rework is the spec." },
    ],
    industries: ["Electrical Utilities", "Telecommunications", "Transportation"],
    metaTitle: "Integrated Engineering Services | Spatial Alphabet",
    metaDescription:
      "Telecom engineering, power line systems (PLS-CADD/PLS-POLE), and AutoCAD electrical utility network design for overhead utility construction — first-time-right.",
  },
  {
    slug: "bim",
    name: "BIM",
    navName: "BIM",
    promise: "Scan to BIM, scan to CAD, and paper to CAD — accurate, coordinated models from any source.",
    tags: "AUTODESK REVIT · NAVISWORKS · AUTOCAD · SCAN-TO-BIM",
    tools: ["Autodesk Revit", "Navisworks", "AutoCAD", "Scan-to-BIM", "Point-cloud processing"],
    heroImg: "/assets/gen/bim-iso.png",
    heroAlt: "Isometric BIM wireframe with a highlighted floor plate and coordinated MEP runs",
    sideImg: "/assets/gen/pointcloud-building.png",
    sideAlt: "Laser-scan point cloud of a building facade for scan-to-BIM",
    problemTitle: "Clashes found in the field cost 100x what they cost in the model.",
    problem:
      "Every uncoordinated model, every out-of-date drawing, and every paper archive ships its problems downstream — as RFIs, change orders, and schedule slip. We convert reality into accurate digital models: point clouds into BIM, scans into CAD, and paper into structured drawings, coordinated to the standard your project requires.",
    deliver: [
      {
        title: "Scan to BIM",
        desc: "As-built Revit models from laser scans and point clouds for renovation, retrofit, and facility management.",
      },
      {
        title: "Scan to CAD",
        desc: "2D and 3D CAD deliverables generated from reality-capture data, to your layer and template standards.",
      },
      {
        title: "Paper to CAD",
        desc: "Legacy drawings and paper archives digitized into clean, editable, structured CAD.",
      },
    ],
    process: [
      { num: "01", title: "Scope & standards", desc: "LOD, naming, templates, and coordinate system agreed up front." },
      { num: "02", title: "Pilot package", desc: "One level, zone, or drawing set converted to prove the workflow." },
      { num: "03", title: "Model production", desc: "Dual-shore modeling with scheduled QC on every batch." },
      { num: "04", title: "Delivery & audit", desc: "Coordinated model or CAD set, QC evidence, and clean handoff to your team." },
    ],
    industries: ["Government & Public Sector", "Transportation", "Oil & Gas"],
    metaTitle: "BIM — Scan to BIM, Scan to CAD, Paper to CAD | Spatial Alphabet",
    metaDescription:
      "Scan to BIM, scan to CAD, and paper to CAD — accurate Revit and AutoCAD deliverables from point clouds, scans, and legacy drawings.",
  },
  {
    slug: "ai-powered-geospatial",
    name: "AI-Powered Geospatial",
    navName: "AI-Powered Geospatial",
    promise:
      "LiDAR, LULC, and utility mapping plus high-volume vectorization — location data made decision-ready.",
    tags: "ESRI ARCGIS · QGIS · FME · POSTGIS · LIDAR · AWS · AZURE",
    tools: ["Esri ArcGIS", "QGIS", "FME", "PostGIS", "LiDAR pipelines", "AWS", "Azure"],
    heroImg: "/assets/gen/lidar-corridor.png",
    heroAlt: "Classified LiDAR point cloud of a transmission corridor with conductors and vegetation returns",
    sideImg: "/assets/gen/terrain-hillshade.png",
    sideAlt: "Hillshade terrain model with hypsometric tint, contour lines, and a surveyed route",
    problemTitle: "Terabytes of spatial data. Not one decision made faster.",
    problem:
      "Utilities, agencies, and infrastructure owners sit on years of imagery, LiDAR, and legacy records that never become answers. We close that gap: raw capture turned into classified, attributed, decision-ready geospatial data — QC'd against your spec, not ours.",
    deliver: [
      {
        title: "LiDAR Mapping",
        desc: "Point-cloud classification, feature extraction, and asset mapping at corridor scale.",
      },
      {
        title: "LULC Mapping",
        desc: "Land-use / land-cover classification and change detection from multi-source imagery.",
      },
      {
        title: "Utility Mapping",
        desc: "Network mapping and connectivity-clean utility data — electric, gas, water, and telecom.",
      },
      {
        title: "Vectorization",
        desc: "High-volume raster-to-vector and digitization with 100% first-time-right delivery.",
      },
    ],
    process: [
      { num: "01", title: "Audit", desc: "We inventory your data sources, formats, and target systems, and define the acceptance spec together." },
      { num: "02", title: "Pilot", desc: "A bounded slice — one county, one corridor, one dataset — delivered to production standard." },
      { num: "03", title: "Production", desc: "Dual-shore teams scale the validated workflow, with QC gates on every batch." },
      { num: "04", title: "Sustain", desc: "Documented workflows, update cycles, and support so the data stays decision-ready." },
    ],
    industries: ["Electrical Utilities", "Oil & Gas", "Government & Public Sector", "Transportation"],
    metaTitle: "AI-Powered Geospatial — LiDAR, LULC, Utility Mapping | Spatial Alphabet",
    metaDescription:
      "LiDAR mapping, LULC classification, utility mapping, and high-volume vectorization — location data made decision-ready. Esri ArcGIS, QGIS, FME, PostGIS.",
  },
  {
    slug: "application-development",
    name: "Application Development",
    navName: "Application Development",
    promise: "Desktop GIS customizations, web platforms, and mobile apps — built for field-to-office workflows.",
    tags: "ESRI · QGIS · C# · PYTHON · REACT · CLOUD-NATIVE",
    tools: ["C#", "Python", ".NET", "React", "Esri SDKs", "QGIS plugins", "AWS", "Azure"],
    heroImg: "/assets/gen/vector-map-dark.png",
    heroAlt: "Dark-theme web map application with a routed corridor between two points",
    sideImg: "/assets/gen/city-grid-night.png",
    sideAlt: "Aerial night view of a city street grid",
    problemTitle: "Off-the-shelf software wasn't built for your field workflow.",
    problem:
      "Generic tools force your crews to work around the software instead of through it. We build the applications your workflow actually needs — desktop GIS extensions, map-first web platforms, and offline-capable mobile apps — engineered by people who understand both software and spatial data.",
    deliver: [
      {
        title: "Desktop (ESRI, QGIS customizations)",
        desc: "ArcGIS Pro add-ins, QGIS plugins, and geoprocessing tools that automate your desktop workflow.",
      },
      {
        title: "Web Apps",
        desc: "Map-centric web platforms — dashboards, viewers, and workflow tools — built cloud-native.",
      },
      {
        title: "Mobile Apps",
        desc: "Offline-capable field collection and inspection apps with survey-grade GPS and clean sync.",
      },
    ],
    process: [
      { num: "01", title: "Discovery", desc: "We map the workflow, the users, and the systems the application must live between." },
      { num: "02", title: "Prototype", desc: "A working slice in weeks — real data, real devices, real feedback before full build." },
      { num: "03", title: "Build & integrate", desc: "Iterative delivery with automated testing, staged releases, and your team in the loop." },
      { num: "04", title: "Operate", desc: "Cloud deployment, monitoring, and a support path that doesn't end at launch." },
    ],
    industries: ["Electrical Utilities", "Oil & Gas", "Transportation", "Government & Public Sector"],
    metaTitle: "Geospatial Application Development | Spatial Alphabet",
    metaDescription:
      "Desktop GIS customizations (ESRI, QGIS), map-first web platforms, and offline mobile apps — built for field-to-office workflows.",
  },
  {
    slug: "big-data-analytics",
    name: "Big Data Analytics",
    navName: "Big Data Analytics",
    promise: "AI/ML automation, product development, and custom software solutions at production scale.",
    tags: "TENSORFLOW · ML PIPELINES · AUTOMATION · CUSTOM BUILD",
    tools: ["TensorFlow", "Python", "ML pipelines", "Data engineering", "Systems integration"],
    heroImg: "/assets/gen/data-heatmap.png",
    heroAlt: "Spatial density heatmap rendered over a coordinate grid",
    sideImg: "/assets/gen/annotation-tiles.png",
    sideAlt: "Aerial imagery tiles with AI annotation bounding boxes",
    problemTitle: "Models and reports are only as good as the data discipline behind them.",
    problem:
      "AI programs stall on the unglamorous work: pipeline reliability, labeling at scale, and the connective software nobody wants to own. That work is exactly what we're built for — automation, products, and custom systems delivered under the same QC protocol as our engineering work.",
    deliver: [
      {
        title: "Automation with AI/ML",
        desc: "Machine-learning models and automated pipelines for detection, extraction, and prediction at scale.",
      },
      {
        title: "Product Development",
        desc: "End-to-end product builds — from concept and data pipeline to a maintained, shipping application.",
      },
      {
        title: "Custom Software Solutions",
        desc: "Connective software, integrations, and workflow automation built around how your teams already work.",
      },
    ],
    process: [
      { num: "01", title: "Map the gap", desc: "We document the current workflow and quantify what the gap actually costs." },
      { num: "02", title: "Pilot / prototype", desc: "A measured slice with published metrics — you evaluate before we scale." },
      { num: "03", title: "Build & scale", desc: "Iterative delivery with layered QC and drift monitoring." },
      { num: "04", title: "Support", desc: "Documentation, training, and a maintenance path sized to the system." },
    ],
    industries: ["Electrical Utilities", "Government & Public Sector", "Transportation", "Oil & Gas"],
    metaTitle: "Big Data Analytics, AI/ML & Custom Software | Spatial Alphabet",
    metaDescription:
      "AI/ML automation, product development, and custom software solutions at production scale — pipelines, analytics, and connective systems.",
  },
  {
    slug: "talent-acquisition",
    name: "Talent Acquisition",
    navName: "Talent Acquisition",
    promise: "Staff augmentation, workforce planning, and executive search — production-tested GIS and engineering talent.",
    tags: "STAFF AUGMENTATION · RPO · EXECUTIVE SEARCH · US + INDIA",
    tools: ["Staff augmentation", "Strategic workforce planning", "Executive search", "RPO", "Employer branding"],
    heroImg: "/assets/gen/network-graph.png",
    heroAlt: "Two connected talent network clusters representing US and India teams",
    sideImg: "/assets/gen/globe-timezones.png",
    sideAlt: "Globe wireframe with an arc linking the Keller and Hyderabad offices",
    problemTitle: "The talent you need exists. Finding it verified is the hard part.",
    problem:
      "Every GIS resume says ArcGIS; few candidates survive a real production test. Because we run production teams in these exact disciplines, we screen candidates against real work — not keyword matches — and support the full hiring lifecycle from sourcing to executive search to RPO.",
    deliver: [
      { title: "Staff Augmentation", desc: "Production-tested professionals embedded in your team, on your tools, under your management." },
      { title: "Strategic Workforce Planning", desc: "Long-term capacity planning — training pipelines and bench depth aligned to your roadmap." },
      { title: "Employer Branding", desc: "Positioning and outreach that make your roles visible to the candidates worth hiring." },
      { title: "Active Candidate Sourcing", desc: "Targeted sourcing of GIS, engineering, and software talent across the US and India." },
      { title: "Executive Search", desc: "Discreet, senior-level search for leadership and specialist roles." },
      { title: "Recruitment Process Outsourcing (RPO)", desc: "We run all or part of your recruiting function as a managed, measurable service." },
    ],
    process: [
      { num: "01", title: "Profile", desc: "We define the role against real deliverables — tools, standards, and output expectations." },
      { num: "02", title: "Screen & test", desc: "Candidates complete production-style work samples reviewed by our own leads." },
      { num: "03", title: "Deploy", desc: "Placement or team stand-up with onboarding support and a defined ramp plan." },
      { num: "04", title: "Retain", desc: "Check-ins, performance reviews, and backfill guarantees that protect your program." },
    ],
    industries: ["Electrical Utilities", "Telecommunications", "Oil & Gas", "Government & Public Sector"],
    metaTitle: "Talent Acquisition — Staffing, RPO, Executive Search | Spatial Alphabet",
    metaDescription:
      "Staff augmentation, strategic workforce planning, employer branding, candidate sourcing, executive search, and RPO — production-tested GIS and engineering talent.",
  },
];
export type Industry = {
  slug: string;
  name: string;
  line: string;
  img: string;
  alt: string;
  help: { title: string; desc: string }[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "electrical-utilities",
    name: "Electrical Utilities",
    line: "Design-ready data and engineering for T&D networks — from pole loading to full corridor design.",
    img: "/assets/ind-utilities.png",
    alt: "High-voltage transmission corridor at dusk",
    help: [
      { title: "T&D line engineering", desc: "PLS-CADD corridor design, structure spotting, and sag-tension packages your engineers approve first pass." },
      { title: "Pole loading & make-ready", desc: "O-Calc and SPIDA analysis at program scale for joint use, fiber, and 5G attachment demand." },
      { title: "Network GIS & mapping", desc: "Connectivity-clean network data — conversion, migration, and as-built reconciliation." },
    ],
  },
  {
    slug: "telecommunications",
    name: "Telecommunications",
    line: "Fiber network design, pole attachment engineering, and permitting for wireline and wireless build-outs.",
    img: "/assets/ind-urban.png",
    alt: "Dense urban network aerial view",
    help: [
      { title: "Fiber network design", desc: "HLD and LLD fiber design, route planning, and construction-ready drawing packages." },
      { title: "Pole loading & make-ready", desc: "Attachment analysis and make-ready engineering for fiber and small-cell deployment." },
      { title: "Permitting support", desc: "Permit-ready documentation that keeps build schedules moving." },
    ],
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    line: "Pipeline routing, integrity data, and as-built records you can defend.",
    img: "/assets/ind-oilgas.png",
    alt: "Pipeline facility aerial view",
    help: [
      { title: "Pipeline GIS & alignment sheets", desc: "Centerline management, stationing, and alignment-sheet generation kept current with construction." },
      { title: "Integrity data management", desc: "HCA/MCA analysis support and inspection data structured for regulatory defense." },
      { title: "As-built records", desc: "Field-to-record reconciliation that survives an audit." },
    ],
  },
  {
    slug: "transportation",
    name: "Transportation",
    line: "Rail and roadway corridors surveyed, modeled, and kept current.",
    img: "/assets/ind-transport.png",
    alt: "Rail corridor aerial view",
    help: [
      { title: "Corridor mapping", desc: "LiDAR classification and asset extraction along rail and roadway corridors." },
      { title: "Linear referencing", desc: "Milepost and LRS data management that keeps every system pointing at the same asset." },
      { title: "Asset inventories", desc: "Signals, signs, crossings, and structures inventoried and condition-tagged." },
    ],
  },
  {
    slug: "government-public-sector",
    name: "Government & Public Sector",
    line: "Cadastral, parcel, and land-records modernization at county-to-state scale.",
    img: "/assets/ind-gov.png",
    alt: "Cadastral parcel map capture",
    help: [
      { title: "Parcel & cadastral mapping", desc: "Parcel fabric migration, deed research, and boundary QC at county-to-state scale." },
      { title: "Land-records modernization", desc: "Digitization and structuring of legacy records into searchable, connected systems." },
      { title: "Public-facing maps", desc: "Viewers and open-data portals citizens can actually use." },
    ],
  },
];
export type Article = {
  slug: string;
  date: string;
  dateISO: string;
  title: string;
  metaTitle: string;
  tag: string;
  img: string;
  imgAlt: string;
  description: string;
  readingTime: string;
  body: { h?: string; p: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "what-zero-rework-actually-costs",
    date: "07 / 2026",
    dateISO: "2026-07-14",
    title: "What zero rework actually costs to build — and what it saves you",
    metaTitle: "What Zero Rework Costs — and Saves",
    tag: "QUALITY",
    img: "/assets/gen/qc-scatter.png",
    imgAlt: "Statistical control chart with tightening quality limits over time",
    description:
      "Zero rework isn't a slogan — it's an investment in training, QC gates, and measurement. Here's what it takes to build and what it returns.",
    readingTime: "5 min read",
    body: [
      {
        p: "Every services firm claims quality. Very few can tell you what their rework rate actually is, because very few measure it. We do — it's the number our whole delivery model is built around, and driving it to zero costs real money before it saves any.",
      },
      {
        h: "The cost side",
        p: "First-time-right delivery starts before the first deliverable. Every analyst and designer who joins our Hyderabad ODC goes through structured training on the client's standards before touching production data — weeks of investment before a single billable unit ships. Then every batch passes through layered QC: self-check, peer review, and an independent QC pass against the acceptance spec. On paper, that's overhead. A cheaper shop would skip it and quote you a lower rate.",
      },
      {
        h: "The savings side",
        p: "The economics flip the moment you count the full cycle. A deliverable that fails client review doesn't just cost the fix — it costs the review that caught it, the re-review that clears it, the schedule slip while it loops, and the erosion of trust that makes every future delivery reviewed harder. Utilities we work with have historically budgeted 15–30% of program cost for revision cycles. When deliverables pass first review, that budget line simply disappears.",
      },
      {
        h: "Why most firms don't do it",
        p: "Because the costs are theirs and the savings are yours. A vendor billing time and materials has no structural incentive to eliminate rework — revision cycles are revenue. Fixed-scope, first-time-right delivery only makes sense if you're confident enough in your QC to absorb the risk. That confidence has to be built, batch by measured batch.",
      },
      {
        p: "That's also why we lead with pilots. A scoped pilot lets you audit our first-time-right claim against your own acceptance criteria before committing program budget. If the QC protocol is real, it shows up in the pilot. Ours does.",
      },
    ],
  },
  {
    slug: "classifying-400-miles-of-lidar",
    date: "06 / 2026",
    dateISO: "2026-06-09",
    title: "Classifying 400 miles of LiDAR: our QC checklist",
    metaTitle: "LiDAR Classification QC Checklist",
    tag: "GEOSPATIAL",
    img: "/assets/gen/rail-corridor-scan.png",
    imgAlt: "LiDAR cross-section of a rail corridor showing ballast, rails, and catenary",
    description:
      "The QC checklist we run on corridor LiDAR classification — calibration, gold sets, sampling rates, and the failure modes that slip past automated checks.",
    readingTime: "6 min read",
    body: [
      {
        p: "Corridor LiDAR projects fail quietly. The point cloud looks classified, the deliverable ships, and three months later a design team finds vegetation coded as conductor in span 1,847. On a recent 400-mile transmission corridor program, our QC checklist is what stood between us and that failure mode. Here's what's on it.",
      },
      {
        h: "1. Calibrate before you classify",
        p: "Before production begins, every classifier works the same gold-standard segment — a representative mile with known-correct classification, built jointly with the client. Nobody touches production tiles until their gold-set output matches spec. This one step removes the biggest source of drift: honest disagreement about what the spec means.",
      },
      {
        h: "2. Automate the checks machines are good at",
        p: "Scripted checks run on every tile: class-code completeness, height-above-ground outliers, isolated-point noise, seamline consistency between adjacent tiles and adjacent operators. Automation catches the mechanical failures fast — but it cannot catch a plausible-looking wrong answer, which is why it's the start of QC, not the end.",
      },
      {
        h: "3. Sample like you mean it",
        p: "Independent QC reviews a defined sample of every operator's daily output — higher rates for new operators and complex terrain, never zero for anyone. Every error found is logged by type, span, and operator. The error log is the real product of QC: it tells you where the spec is ambiguous and who needs recalibration before errors compound across hundreds of miles.",
      },
      {
        h: "4. Close the loop weekly",
        p: "Error patterns feed a weekly calibration review. Spec ambiguities get resolved in writing; the gold set gets amended; operators re-test on the amended set. Classification quality on mile 400 should be better than mile 4 — if it isn't, your QC is decoration.",
      },
      {
        p: "None of this is exotic. It's discipline, applied consistently at scale — which is exactly what most LiDAR programs are missing.",
      },
    ],
  },
  {
    slug: "dual-shore-playbook",
    date: "05 / 2026",
    dateISO: "2026-05-12",
    title: "The dual-shore playbook: one team across 11.5 time zones",
    metaTitle: "The Dual-Shore Delivery Playbook",
    tag: "OPERATIONS",
    img: "/assets/gen/globe-timezones.png",
    imgAlt: "Globe wireframe with an arc linking Texas and Hyderabad",
    description:
      "How we run US leadership in Keller and production in Hyderabad as one team — the handoff cadence, the standards pipeline, and what the overlap hours are for.",
    readingTime: "5 min read",
    body: [
      {
        p: "Keller, Texas and Hyderabad, India are 11.5 time zones apart. Run naively, that gap produces the offshore experience everyone dreads: questions that wait a day for answers, work that drifts from spec overnight, and a client who feels like they're managing two vendors. Run deliberately, the same gap becomes the model's biggest advantage: your program moves while you sleep.",
      },
      {
        h: "The handoff is the product",
        p: "Every Hyderabad production day ends with a structured handoff: what shipped, what's blocked, what needs a US-side decision. Keller leadership works those decisions during the US day and returns answers before Hyderabad opens. The result is a 24-hour work cycle where blockers live for hours, not days. The handoff document isn't bureaucracy — it's the mechanism that makes two shores behave like one team.",
      },
      {
        h: "Standards flow one way; questions flow the other",
        p: "US leadership owns client standards, acceptance criteria, and the QC bar. Hyderabad owns execution and throughput. That division is strict on purpose: production teams never guess at intent, and ambiguity always routes to the shore that talks to the client. Most offshore quality failures are really standards failures — someone guessed. Our model is built so nobody has to guess.",
      },
      {
        h: "What the overlap hours are for",
        p: "There's a short daily window when both shores are awake. We spend it on exactly two things: calibration on anything ambiguous, and escalations that need live conversation. Status updates don't get meetings — they're in the handoff. Protecting the overlap for judgment calls is what keeps an 11.5-hour offset from costing a single day of schedule.",
      },
      {
        p: "Clients experience the result as a simple thing: one accountable partner, US-facing leadership, and deliverables that arrive faster than a single-shore team could produce them. The machinery underneath is the playbook above, run every single day.",
      },
    ],
  },
];

export type Job = {
  slug: string;
  title: string;
  office: string;
  type: string;
  blurb: string;
  skills: string[];
};

export const JOBS: Job[] = [
  {
    slug: "gis-analyst-developer",
    title: "GIS Analyst / Developer",
    office: "Hyderabad, India",
    type: "Full-time",
    blurb:
      "Produce and automate GIS deliverables across utility, government, and transportation programs — ArcGIS, QGIS, FME, and Python scripting against real production specs.",
    skills: ["Esri ArcGIS", "QGIS", "FME", "Python", "PostGIS"],
  },
  {
    slug: "pls-cadd-engineering-designer",
    title: "PLS-CADD Engineering Designer",
    office: "Hyderabad, India",
    type: "Full-time",
    blurb:
      "Model transmission and distribution lines in PLS-CADD, run pole loading in O-Calc Pro and SPIDA Calc, and deliver construction-ready design packages for US utilities.",
    skills: ["PLS-CADD", "O-Calc Pro", "SPIDA Calc", "AutoCAD", "NESC"],
  },
  {
    slug: "bim-revit-modeler",
    title: "BIM / Revit Modeler",
    office: "Hyderabad, India",
    type: "Full-time",
    blurb:
      "Build architectural, structural, and MEP models at LOD 200–400 and drive clash-free coordination in Navisworks for US infrastructure projects.",
    skills: ["Autodesk Revit", "Navisworks", "MEP", "Scan-to-BIM"],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    office: "Hyderabad, India",
    type: "Full-time",
    blurb:
      "Design and productionize ML models for feature extraction, change detection, and annotation QA on large geospatial datasets.",
    skills: ["Python", "TensorFlow", "Computer vision", "ML pipelines"],
  },
  {
    slug: "talent-acquisition-specialist",
    title: "Talent Acquisition Specialist",
    office: "Keller, TX / Hyderabad, India",
    type: "Full-time",
    blurb:
      "Source and screen GIS, engineering design, and software candidates against production-tested work samples for client placements and internal teams.",
    skills: ["Technical recruiting", "GIS/AEC talent", "Screening design"],
  },
];

export type DownloadItem = {
  title: string;
  img: string;
  kind: string;
  desc: string;
  pending: boolean;
};

export const DOWNLOADS: DownloadItem[] = [
  { img: "/assets/gen/lidar-corridor.png", title: "Spatial Alphabet Capability Deck", kind: "PDF · DECK", desc: "Company overview, service lines, delivery model, and QC protocol in one briefing document.", pending: true },
  { img: "/assets/gen/terrain-hillshade.png", title: "AI-Powered Geospatial — One-Pager", kind: "PDF · SERVICE", desc: "Scope, tools, and delivery standards for geospatial data services.", pending: true },
  { img: "/assets/gen/sag-profile.png", title: "Engineering Design — One-Pager", kind: "PDF · SERVICE", desc: "T&D design, pole loading, and make-ready capabilities at a glance.", pending: true },
  { img: "/assets/gen/bim-iso.png", title: "BIM Modeling — One-Pager", kind: "PDF · SERVICE", desc: "Modeling standards, LOD range, and coordination workflow summary.", pending: true },
  { img: "/assets/gen/annotation-tiles.png", title: "Big Data & AI Annotation — One-Pager", kind: "PDF · SERVICE", desc: "Annotation accuracy protocol and pipeline capabilities.", pending: true },
  { img: "/assets/gen/rail-corridor-scan.png", title: "Case Study — Utility Corridor Program", kind: "PDF · CASE STUDY", desc: "How a 400-mile LiDAR classification program shipped with zero rework.", pending: true },
  { img: "/assets/gen/parcel-map.png", title: "Case Study — Parcel Modernization", kind: "PDF · CASE STUDY", desc: "County land-records modernization from paper archive to parcel fabric.", pending: true },
  { img: "/assets/gen/contour-blueprint.png", title: "Pilot Program Brief", kind: "PDF · PROGRAM", desc: "How a scoped pilot works: timeline, deliverables, and evaluation criteria.", pending: true },
];

export const TRUSTED_BY = [
  "Pacific Electric & Gas",
  "Nam Technologies",
  "SPI Inc",
  "UDC Inc",
  "SONATA Software",
  "The ComTek",
];

export const HERO_SLIDES = [
  {
    title: "Integrated Engineering Services",
    sub: "Telecom, power line, and electrical utility network engineering — first-time-right, every time.",
    tags: "PLS-CADD · PLS-POLE · AUTOCAD · OCALC PRO · SPIDA CALC",
    img: "/assets/ind-utilities.png",
    alt: "Transmission and distribution corridor at dusk",
    href: "/services/integrated-engineering-services",
  },
  {
    title: "AI-Powered Geospatial",
    sub: "LiDAR, LULC, and utility mapping plus high-volume vectorization — location data made decision-ready.",
    tags: "ESRI ARCGIS · QGIS · FME · POSTGIS · LIDAR · AWS",
    img: "/assets/hero-corridor.png",
    alt: "LiDAR point-cloud corridor render",
    href: "/services/ai-powered-geospatial",
  },
  {
    title: "BIM",
    sub: "Scan to BIM, scan to CAD, and paper to CAD — accurate, coordinated models from any source.",
    tags: "AUTODESK REVIT · NAVISWORKS · AUTOCAD · SCAN-TO-BIM",
    img: "/assets/ind-infra.png",
    alt: "BIM coordination model",
    href: "/services/bim",
  },
  {
    title: "Big Data Analytics",
    sub: "AI/ML automation, product development, and custom software solutions at production scale.",
    tags: "TENSORFLOW · ML PIPELINES · AUTOMATION · CUSTOM BUILD",
    img: "/assets/ind-urban.png",
    alt: "Urban basemap analysis",
    href: "/services/big-data-analytics",
  },
  {
    title: "Application Development",
    sub: "Desktop GIS customizations, web platforms, and mobile apps — built for field-to-office workflows.",
    tags: "ESRI · QGIS · C# · PYTHON · REACT · CLOUD-NATIVE",
    img: "/assets/ind-transport.png",
    alt: "Surveyed rail corridor",
    href: "/services/application-development",
  },
];

export const SERVICE_OPTIONS = [
  "Integrated Engineering Services",
  "BIM",
  "AI-Powered Geospatial",
  "Application Development",
  "Big Data Analytics",
  "Talent Acquisition",
  "Pilot program / general inquiry",
];

export const MISSION =
  "To be a trusted leader in IT-managed services, empowering businesses to achieve their goals through innovative technology (Geospatial, Cybersecurity, and AI), seamless support, and comprehensive solutions.";

export const VISION =
  "To deliver reliable, innovative, and customized IT-managed services that enable businesses to thrive in a digital-first world.";

export const CORE_VALUES: { title: string; desc: string }[] = [
  { title: "Employee Well-Being", desc: "Our people come first — a healthy, supported team is what makes first-time-right delivery repeatable." },
  { title: "Honesty", desc: "Straight answers on scope, timelines, and fit — even when the honest answer is no." },
  { title: "Integrity", desc: "We hold every deliverable to the same standard, on both shores, whether or not anyone is watching." },
  { title: "Teamwork", desc: "US leadership and Hyderabad execution operate as one accountable team across every engagement." },
  { title: "Accountability", desc: "We own the outcome. QC evidence travels with every deliverable, and we stand behind it." },
];
