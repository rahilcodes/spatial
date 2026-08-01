export const SITE = {
  name: "Spatial Alphabet",
  url: "https://www.spatialalphabet.com",
  tagline: "AI-Enabled Geospatial & Engineering Solutions",
  email: "info@spatialalphabet.com",
  phone: "+1 (817) 231-0158",
  phoneHref: "tel:+18172310158",
  linkedin: "https://www.linkedin.com/company/spatial-alphabet",
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
    slug: "ai-powered-geospatial",
    name: "AI-Powered Geospatial Solutions",
    navName: "AI-Powered Geospatial",
    promise:
      "Location data managed, visualized, and made decision-ready — from raw capture to location-based decision tools.",
    tags: "ESRI ARCGIS · QGIS · FME · POSTGIS · AWS · AZURE · LIDAR",
    tools: ["Esri ArcGIS", "QGIS", "FME", "PostGIS", "AWS", "Azure", "LiDAR pipelines", "TensorFlow"],
    heroImg: "/assets/gen/lidar-corridor.png",
    heroAlt: "Classified LiDAR point cloud of a transmission corridor with conductors and vegetation returns",
    sideImg: "/assets/gen/terrain-hillshade.png",
    sideAlt: "Hillshade terrain model with hypsometric tint, contour lines, and a surveyed route",
    problemTitle: "Terabytes of spatial data. Not one decision made faster.",
    problem:
      "Utilities, agencies, and infrastructure owners sit on years of imagery, LiDAR, CAD files, and legacy records that never become answers. The data exists — it just isn't structured, classified, or served in a form anyone can act on. We close that gap: we take spatial data in whatever state it's in and return it managed, validated, and wired into the tools your teams actually use.",
    deliver: [
      {
        title: "Geodatabase design & migration",
        desc: "Enterprise geodatabase architecture, schema design, and clean migration from shapefiles, CAD, and paper archives.",
      },
      {
        title: "LiDAR classification & feature extraction",
        desc: "Point-cloud classification, vectorization, and asset extraction at corridor scale — QC'd against your spec, not ours.",
      },
      {
        title: "Data conversion & digitization",
        desc: "High-volume conversion with 100% first-time-right delivery, from raster capture to structured, attributed features.",
      },
      {
        title: "Web maps, dashboards & decision tools",
        desc: "ArcGIS Online / Enterprise apps and custom web mapping that put current, trusted data in front of field and office teams.",
      },
      {
        title: "AI-assisted spatial analytics",
        desc: "Machine-learning models for change detection, asset condition, and network analysis — trained on your data, validated by our QC.",
      },
    ],
    process: [
      { num: "01", title: "Audit", desc: "We inventory your data sources, formats, and target systems, and define the acceptance spec together." },
      { num: "02", title: "Pilot", desc: "A bounded slice — one county, one corridor, one dataset — delivered to production standard in one to three weeks." },
      { num: "03", title: "Production", desc: "Dual-shore teams scale the validated workflow, with QC gates on every batch before it reaches you." },
      { num: "04", title: "Sustain", desc: "Documented workflows, update cycles, and support — so the data stays decision-ready after handoff." },
    ],
    industries: ["Electrical Utilities", "Oil & Gas", "Government", "Urban Planning"],
    metaTitle: "AI-Powered Geospatial Solutions | Spatial Alphabet",
    metaDescription:
      "GIS data management, LiDAR classification, and AI-assisted spatial analytics delivered first-time-right — Esri ArcGIS, QGIS, FME, PostGIS.",
  },
  {
    slug: "engineering-design",
    name: "Engineering Design",
    navName: "Engineering Design",
    promise: "Transmission and distribution line design for electrical utilities, delivered first-time-right.",
    tags: "PLS-CADD · AUTOCAD · MICROSTATION · OCALC PRO · SPIDA CALC",
    tools: ["PLS-CADD", "AutoCAD", "MicroStation", "O-Calc Pro", "SPIDA Calc"],
    heroImg: "/assets/gen/sag-profile.png",
    heroAlt: "Transmission line sag profile with lattice structures and clearance envelope",
    sideImg: "/assets/gen/contour-blueprint.png",
    sideAlt: "Survey contour plan with traverse stations and benchmarks",
    problemTitle: "Design backlogs don't wait for hiring cycles.",
    problem:
      "Grid modernization, storm hardening, and joint-use demand have utilities carrying design backlogs their in-house teams can't clear. Contract engineers are expensive and inconsistent. We give you a design bench that works to your standards, your templates, and your QC checklist — and delivers work your engineers approve on first review.",
    deliver: [
      {
        title: "Transmission & distribution line design",
        desc: "PLS-CADD modeling, structure spotting, sag-tension analysis, and full corridor design packages.",
      },
      {
        title: "Pole loading analysis",
        desc: "O-Calc Pro and SPIDA Calc structural analysis for make-ready, joint use, and NESC compliance.",
      },
      {
        title: "Make-ready engineering",
        desc: "Attachment surveys, clearance resolution, and construction-ready make-ready packages for fiber and 5G programs.",
      },
      {
        title: "As-built & records updates",
        desc: "Field-to-office reconciliation that keeps your GIS and design records matching what's actually on the pole.",
      },
    ],
    process: [
      { num: "01", title: "Standards intake", desc: "We absorb your design standards, assembly units, and QC criteria before the first structure is modeled." },
      { num: "02", title: "Pilot circuit", desc: "One feeder or line section designed end-to-end, reviewed against your acceptance checklist." },
      { num: "03", title: "Scaled delivery", desc: "Hyderabad execution with US engineering oversight — throughput that flexes with your program." },
      { num: "04", title: "Approval & handoff", desc: "Deliverables arrive construction-ready, with QC evidence attached. Zero rework is the spec." },
    ],
    industries: ["Electrical Utilities", "Infrastructure", "Transportation"],
    metaTitle: "Engineering Design — T&D Line Design | Spatial Alphabet",
    metaDescription:
      "PLS-CADD transmission and distribution design, O-Calc and SPIDA pole loading, and make-ready engineering for electrical utilities — first-time-right.",
  },
  {
    slug: "bim-modeling",
    name: "BIM Modeling",
    navName: "BIM Modeling",
    promise: "Clash-free architectural, structural, and MEP coordination models for US infrastructure projects.",
    tags: "AUTODESK REVIT · 3D COORDINATION · MEP",
    tools: ["Autodesk Revit", "Navisworks", "3D coordination", "MEP modeling", "Scan-to-BIM"],
    heroImg: "/assets/gen/bim-iso.png",
    heroAlt: "Isometric BIM wireframe with a highlighted floor plate and coordinated MEP runs",
    sideImg: "/assets/gen/pointcloud-building.png",
    sideAlt: "Laser-scan point cloud of a building facade for scan-to-BIM",
    problemTitle: "Clashes found in the field cost 100× what they cost in the model.",
    problem:
      "Every uncoordinated model ships its problems to the job site, where they become RFIs, change orders, and schedule slip. We build and coordinate architectural, structural, and MEP models to the LOD your contract requires — and we resolve the clashes before anyone pours concrete.",
    deliver: [
      {
        title: "Architectural, structural & MEP modeling",
        desc: "Revit models built to LOD 200–400 from drawings, point clouds, or design intent — to your template and standards.",
      },
      {
        title: "Clash detection & 3D coordination",
        desc: "Navisworks-driven coordination cycles with documented clash resolution, not just clash reports.",
      },
      {
        title: "Scan-to-BIM",
        desc: "As-built models from laser scans for renovation, retrofit, and facility management programs.",
      },
      {
        title: "Shop & fabrication support",
        desc: "Model-derived sheets and schedules that keep detailers, fabricators, and field crews on one geometry.",
      },
    ],
    process: [
      { num: "01", title: "Scope & standards", desc: "BIM execution plan review — LOD, naming, templates, and coordination cadence agreed up front." },
      { num: "02", title: "Pilot package", desc: "One level, one zone, or one discipline modeled and coordinated to prove the workflow." },
      { num: "03", title: "Model production", desc: "Dual-shore modeling with scheduled coordination cycles and clash-resolution logs." },
      { num: "04", title: "Delivery & audit", desc: "Clash-free federated model, QC evidence, and clean handoff to your VDC team." },
    ],
    industries: ["Infrastructure", "Government", "Urban Planning"],
    metaTitle: "BIM Modeling & 3D Coordination | Spatial Alphabet",
    metaDescription:
      "Revit BIM modeling, clash detection, and MEP coordination for US infrastructure projects. LOD 200–400, scan-to-BIM, clash-free delivery.",
  },
  {
    slug: "application-development",
    name: "Application Development",
    navName: "Application Development",
    promise: "Mobile GPS apps, web platforms, and custom geospatial software — cloud-native from day one.",
    tags: "C# · PYTHON · ML · CLOUD-NATIVE",
    tools: ["C#", "Python", ".NET", "React", "PostGIS", "AWS", "Azure", "Machine learning"],
    heroImg: "/assets/gen/vector-map-dark.png",
    heroAlt: "Dark-theme web map application with a routed corridor between two points",
    sideImg: "/assets/gen/city-grid-night.png",
    sideAlt: "Aerial night view of a city street grid",
    problemTitle: "Off-the-shelf software wasn't built for your field workflow.",
    problem:
      "Generic tools force your crews to work around the software instead of through it. We build the applications your workflow actually needs — field data collection, inspection, asset management, map-first web platforms — engineered by people who understand both software and spatial data.",
    deliver: [
      {
        title: "Mobile GPS & field apps",
        desc: "Offline-capable collection and inspection apps with survey-grade GPS integration and clean sync to your systems of record.",
      },
      {
        title: "Web platforms & portals",
        desc: "Map-centric web applications — dashboards, viewers, and workflow tools — built cloud-native on AWS or Azure.",
      },
      {
        title: "Custom geospatial software",
        desc: "Processing pipelines, automation tools, and integrations that connect GIS, design, and enterprise systems.",
      },
      {
        title: "ML-powered features",
        desc: "Detection, extraction, and prediction models embedded where your users work — not in a separate data-science silo.",
      },
    ],
    process: [
      { num: "01", title: "Discovery", desc: "We map the workflow, the users, and the systems the application must live between." },
      { num: "02", title: "Prototype", desc: "A working slice in weeks — real data, real devices, real feedback before full build." },
      { num: "03", title: "Build & integrate", desc: "Iterative delivery with automated testing, staged releases, and your team in the loop." },
      { num: "04", title: "Operate", desc: "Cloud deployment, monitoring, and a support path that doesn't end at launch." },
    ],
    industries: ["Electrical Utilities", "Oil & Gas", "Transportation", "Government"],
    metaTitle: "Geospatial Application Development | Spatial Alphabet",
    metaDescription:
      "Custom mobile GPS apps, web mapping platforms, and geospatial software in C#, Python, and cloud-native stacks — built for field-to-office workflows.",
  },
  {
    slug: "big-data-analytics-ai-annotation",
    name: "Big Data, Analytics & AI Annotation",
    navName: "Big Data & AI Annotation",
    promise: "Enterprise data pipelines, AI annotation services, and advanced visualization at production scale.",
    tags: "TENSORFLOW · ML PIPELINES · ADVANCED VISUALIZATION",
    tools: ["TensorFlow", "Python", "ML pipelines", "Data engineering", "Advanced visualization"],
    heroImg: "/assets/gen/data-heatmap.png",
    heroAlt: "Spatial density heatmap rendered over a coordinate grid",
    sideImg: "/assets/gen/annotation-tiles.png",
    sideAlt: "Aerial imagery tiles with AI annotation bounding boxes",
    problemTitle: "Models are only as good as the data discipline behind them.",
    problem:
      "AI programs stall on the unglamorous work: labeling at scale, pipeline reliability, and data quality nobody wants to own. That work is exactly what we're built for. Our annotation teams work under the same QC protocol as our engineering deliverables — measured, audited, and first-time-right.",
    deliver: [
      {
        title: "AI training-data annotation",
        desc: "Image, LiDAR, and geospatial feature labeling with documented accuracy rates and multi-pass QC.",
      },
      {
        title: "Enterprise data pipelines",
        desc: "Ingestion, transformation, and validation pipelines that make large, messy datasets dependable.",
      },
      {
        title: "Analytics & advanced visualization",
        desc: "Decision dashboards and spatial analytics that turn pipeline output into operational answers.",
      },
      {
        title: "Model support services",
        desc: "Ground-truth validation, edge-case mining, and continuous labeling loops for models in production.",
      },
    ],
    process: [
      { num: "01", title: "Spec & gold set", desc: "We formalize the labeling spec and build a gold-standard set to calibrate annotators and QC." },
      { num: "02", title: "Pilot batch", desc: "A measured batch with published accuracy metrics — you audit before we scale." },
      { num: "03", title: "Scaled annotation", desc: "Hyderabad production teams with layered QC sampling and drift monitoring." },
      { num: "04", title: "Feedback loop", desc: "Error analysis and spec refinement cycles that improve both the labels and the model." },
    ],
    industries: ["Electrical Utilities", "Urban Planning", "Transportation", "Government"],
    metaTitle: "Big Data, Analytics & AI Annotation | Spatial Alphabet",
    metaDescription:
      "AI training-data annotation, enterprise data pipelines, and advanced visualization at production scale — with documented accuracy and multi-pass QC.",
  },
  {
    slug: "talent-acquisition",
    name: "Talent Acquisition & Workforce Partnership",
    navName: "Talent Acquisition",
    promise: "Certified GIS, PLS-CADD, Revit, AI, and full-stack professionals — US and India, ready to deploy.",
    tags: "US + INDIA STAFFING · TEAM SCALING",
    tools: ["GIS staffing", "PLS-CADD designers", "Revit modelers", "AI/ML engineers", "Full-stack developers"],
    heroImg: "/assets/gen/network-graph.png",
    heroAlt: "Two connected talent network clusters representing US and India teams",
    sideImg: "/assets/gen/globe-timezones.png",
    sideAlt: "Globe wireframe with an arc linking the Keller and Hyderabad offices",
    problemTitle: "The talent you need exists. Finding it verified is the hard part.",
    problem:
      "Every GIS résumé says ArcGIS; few candidates survive a real production test. Because we run production teams in these exact disciplines, we screen candidates against real work — not keyword matches. You get professionals we would put on our own projects.",
    deliver: [
      {
        title: "Direct placement",
        desc: "Certified GIS analysts, PLS-CADD designers, Revit modelers, AI/ML engineers, and full-stack developers — US and India.",
      },
      {
        title: "Staff augmentation",
        desc: "Production-tested professionals embedded in your team, on your tools, under your management.",
      },
      {
        title: "Dedicated offshore teams",
        desc: "A named team in our Hyderabad ODC, trained on your standards and scaled on your schedule.",
      },
      {
        title: "Workforce partnership",
        desc: "Long-term capacity planning — training pipelines and bench depth aligned to your program roadmap.",
      },
    ],
    process: [
      { num: "01", title: "Profile", desc: "We define the role against real deliverables — tools, standards, and output expectations." },
      { num: "02", title: "Screen & test", desc: "Candidates complete production-style work samples reviewed by our own leads." },
      { num: "03", title: "Deploy", desc: "Placement or team stand-up with onboarding support and a defined ramp plan." },
      { num: "04", title: "Retain", desc: "Check-ins, performance reviews, and backfill guarantees that protect your program." },
    ],
    industries: ["Electrical Utilities", "Oil & Gas", "Government", "Infrastructure"],
    metaTitle: "GIS & Engineering Talent Acquisition | Spatial Alphabet",
    metaDescription:
      "Production-tested GIS, PLS-CADD, Revit, AI, and full-stack professionals — direct placement, staff augmentation, and dedicated offshore teams.",
  },
  {
    slug: "general-software",
    name: "General Software Solutions",
    navName: "General Software",
    promise: "Fully custom software, integrations, and productivity systems built around how you already work.",
    tags: "CUSTOM BUILD · SYSTEMS INTEGRATION",
    tools: ["Custom development", "Systems integration", "Workflow automation", "API development"],
    heroImg: "/assets/gen/flow-integration.png",
    heroAlt: "Systems integration diagram with services connected through a central hub",
    sideImg: "/assets/gen/qc-scatter.png",
    sideAlt: "Quality control chart with tightening control limits over time",
    problemTitle: "Your workflow shouldn't bend to fit your software.",
    problem:
      "Between the big platforms sit the gaps: the spreadsheet everyone hates, the double entry between two systems, the report that takes a day to build by hand. We build the connective software that closes those gaps — scoped tightly, delivered fast, and maintained like it matters.",
    deliver: [
      {
        title: "Custom business applications",
        desc: "Purpose-built tools for the workflows that off-the-shelf software ignores.",
      },
      {
        title: "Systems integration",
        desc: "APIs and middleware that make your GIS, ERP, and operational systems share one version of the truth.",
      },
      {
        title: "Workflow automation",
        desc: "Automation of repetitive reporting, processing, and data-movement tasks — hours back, errors out.",
      },
      {
        title: "Modernization",
        desc: "Legacy tools rebuilt on maintainable, cloud-ready foundations without disrupting operations.",
      },
    ],
    process: [
      { num: "01", title: "Map the gap", desc: "We document the current workflow and quantify what the gap actually costs." },
      { num: "02", title: "Scope tight", desc: "A fixed, bounded first release — the smallest build that removes the pain." },
      { num: "03", title: "Build & ship", desc: "Short iterations with working software in your hands from the first weeks." },
      { num: "04", title: "Support", desc: "Documentation, training, and a maintenance path sized to the tool." },
    ],
    industries: ["Government", "Infrastructure", "Oil & Gas", "Urban Planning"],
    metaTitle: "Custom Software & Integrations | Spatial Alphabet",
    metaDescription:
      "Custom business applications, systems integration, and workflow automation — connective software built around how your teams already work.",
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
    line: "Design-ready data for T&D networks — from pole loading to full corridor design.",
    img: "/assets/ind-utilities.png",
    alt: "High-voltage transmission corridor at dusk",
    help: [
      { title: "T&D line design", desc: "PLS-CADD corridor design, structure spotting, and sag-tension packages your engineers approve first pass." },
      { title: "Pole loading & make-ready", desc: "O-Calc and SPIDA analysis at program scale for joint use, fiber, and 5G attachment demand." },
      { title: "Network GIS", desc: "Connectivity-clean network data — conversion, migration, and as-built reconciliation." },
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
    slug: "government",
    name: "Government",
    line: "Cadastral, parcel, and land-records modernization at county-to-state scale.",
    img: "/assets/ind-gov.png",
    alt: "Cadastral parcel map capture",
    help: [
      { title: "Parcel & cadastral mapping", desc: "Parcel fabric migration, deed research, and boundary QC at county-to-state scale." },
      { title: "Land-records modernization", desc: "Digitization and structuring of legacy records into searchable, connected systems." },
      { title: "Public-facing maps", desc: "Viewers and open-data portals citizens can actually use." },
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
    slug: "infrastructure",
    name: "Infrastructure",
    line: "BIM coordination that keeps horizontal and vertical builds clash-free.",
    img: "/assets/ind-infra.png",
    alt: "BIM coordination model screen capture",
    help: [
      { title: "BIM modeling & coordination", desc: "Revit models at LOD 200–400 with documented clash resolution before construction." },
      { title: "Scan-to-BIM", desc: "As-built models from point clouds for retrofit and facility management." },
      { title: "Program data management", desc: "One geometry, one truth — across designers, fabricators, and field crews." },
    ],
  },
  {
    slug: "urban-planning",
    name: "Urban Planning",
    line: "Zoning, land-use, and growth scenarios grounded in accurate basemaps.",
    img: "/assets/ind-urban.png",
    alt: "City basemap aerial view",
    help: [
      { title: "Basemap development", desc: "Accurate, current basemaps as the foundation for every planning decision." },
      { title: "Zoning & land-use data", desc: "Structured, queryable zoning layers replacing PDF archives." },
      { title: "Growth scenario analysis", desc: "Spatial analytics for infrastructure demand, density, and development impact." },
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
    title: "AI-Powered Geospatial Solutions",
    sub: "Data management, visualization, and location-based decision tools — decision-ready from day one.",
    tags: "ESRI ARCGIS · QGIS · FME · POSTGIS · AWS · AZURE",
    img: "/assets/hero-corridor.png",
    alt: "LiDAR point-cloud corridor render",
    href: "/services/ai-powered-geospatial",
  },
  {
    title: "Engineering Design",
    sub: "Transmission and distribution line design for electrical utilities — first-time-right, every time.",
    tags: "PLS-CADD · AUTOCAD · MICROSTATION · OCALC PRO · SPIDA CALC",
    img: "/assets/ind-utilities.png",
    alt: "Transmission and distribution corridor design view",
    href: "/services/engineering-design",
  },
  {
    title: "BIM Modeling",
    sub: "Clash-free architectural, structural, and MEP coordination models for US infrastructure projects.",
    tags: "AUTODESK REVIT · 3D COORDINATION · MEP",
    img: "/assets/ind-infra.png",
    alt: "BIM coordination model",
    href: "/services/bim-modeling",
  },
  {
    title: "Big Data, Analytics & AI Annotation",
    sub: "Enterprise data pipelines, AI annotation services, and advanced visualization at production scale.",
    tags: "TENSORFLOW · ML PIPELINES · ADVANCED VISUALIZATION",
    img: "/assets/ind-urban.png",
    alt: "Urban basemap analysis",
    href: "/services/big-data-analytics-ai-annotation",
  },
  {
    title: "Application Development",
    sub: "Mobile GPS apps, web platforms, and custom geospatial software — cloud-native from day one.",
    tags: "C# · PYTHON · ML · CLOUD-NATIVE",
    img: "/assets/ind-transport.png",
    alt: "Surveyed rail corridor",
    href: "/services/application-development",
  },
];

export const SERVICE_OPTIONS = [
  "AI-Powered Geospatial Solutions",
  "Engineering Design",
  "BIM Modeling",
  "Application Development",
  "Big Data, Analytics & AI Annotation",
  "Talent Acquisition & Workforce Partnership",
  "General Software Solutions",
  "Pilot program / general inquiry",
];
