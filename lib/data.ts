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

export type ServiceItem = { title: string; desc: string };
export type ServiceGroup = { title: string; intro?: string; items: ServiceItem[]; img?: string; imgAlt?: string };

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
  groups: ServiceGroup[];
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
      "Engineering, geospatial technology, and digital solutions combined to carry telecom, utility, and infrastructure projects from structural feasibility through construction-ready design to regulatory approval.",
    tags: "PLS-CADD · PLS-POLE · SPIDACALC · O-CALC PRO · AUTOCAD · REVIT",
    tools: ["PLS-CADD", "PLS-POLE", "SPIDAcalc", "O-Calc Pro", "AutoCAD", "Katapult Pro", "Autodesk Revit"],
    heroImg: "/assets/gen/sag-profile.png",
    heroAlt: "PLS-CADD transmission line sag and clearance profile",
    sideImg: "/assets/client/pla-workflow.png",
    sideAlt: "Pole Loading Analysis workflow, from field survey to certified report",
    problemTitle: "Design, permitting, and modelling — usually handed between disconnected vendors.",
    problem:
      "Spatial Alphabet operates this pipeline end to end, on one team and one dataset: pole loading analysis establishes structural feasibility, fiber and power line design turn that feasibility into a construction-ready package, and permitting clears the regulatory path to construction — with BIM and CAD digitization carrying the same rigor into modelling and drafting.",
    groups: [
      {
        title: "Telecom Engineering",
        intro: "Pole Loading Analysis, Fiber Network Design (HLD/LLD), and Permitting.",
        img: "/assets/client/fiber-hld-lld.png",
        imgAlt: "HLD-to-LLD fiber design flow and construction-ready outputs",
        items: [
          { title: "Pole Loading Analysis (PLA)", desc: "Structural pass/fail analysis for telecom attaches, electric utilities, and municipalities under NESC, GO95, or ASCE loading — from GPS/Katapult field capture through PLS-CADD/PLS-POLE, IKE, SPIDAcalc, and O-Calc Pro modelling to a certified report with make-ready cost estimation." },
          { title: "Fiber Network Design (HLD/LLD)", desc: "High-Level Design sets route, topology, hub siting, and fiber-count sizing; Low-Level Design delivers pole-by-pole staking, splice diagrams, slack-loop placement, and a full bill of materials — one authoritative construction-ready package." },
          { title: "Permitting", desc: "The full approvals sequence — pole-attachment and right-of-way applications, make-ready coordination with pole owners, and tracking every application through to Notice to Proceed (NTP)." },
        ],
      },
      {
        title: "Power Line Systems",
        intro: "Transmission and distribution engineering on PLS-CADD and PLS-POLE, plus AutoCAD network design.",
        img: "/assets/client/pls-cadd-profile.png",
        imgAlt: "PLS-CADD profile view: sag-tension and clearance modelling across a distribution line",
        items: [
          { title: "Transmission & Distribution Line Engineering (PLS-CADD & PLS-POLE)", desc: "Terrain modelling, alignment optimization, structure spotting, and conductor sag/tension/clearance analysis under wind, temperature, and ice — with structural modelling of poles, cross-arms, insulators, foundations, and guys against ANSI O5.1 and ASCE." },
          { title: "Electrical Utility Network Design (AutoCAD)", desc: "GPS field survey data converted into engineering-ready AutoCAD drawings — poles, overhead and underground lines, transformers, anchors, and junction boxes — as Exhibit Drawings for approvals and Construction Drawings for field crews." },
          { title: "Engineering Design Drawings for Overhead Construction", desc: "Standardized construction packages — pole hole details, anchor locations, offsets, clearances, framing, and cross-sections — drafted to approved utility standards and QC-reviewed before release." },
        ],
      },
      {
        title: "BIM",
        intro: "Data-rich 3D models integrating graphical, engineering, and asset information across the project lifecycle.",
        img: "/assets/client/construction-drawing.png",
        imgAlt: "AutoCAD construction drawing detail for overhead utility work",
        items: [
          { title: "Scan to BIM", desc: "Point-cloud and laser-scan survey data converted into structured, information-rich Autodesk Revit models for 3D modelling, infrastructure visualization, and multi-discipline coordination." },
          { title: "Scan to CAD", desc: "Scanned survey data translated into accurate 2D/3D CAD drawings, carrying the same accuracy standards applied across every Spatial Alphabet CAD deliverable." },
          { title: "Paper to CAD", desc: "Legacy paper drawings and records digitized into clean, editable CAD — preserving original design intent while making historical infrastructure records usable in modern workflows." },
        ],
      },
    ],
    process: [
      { num: "01", title: "Standards intake", desc: "We absorb your design standards, assembly units, and QC criteria before the first structure is modeled." },
      { num: "02", title: "Pilot circuit", desc: "One feeder, line section, or fiber route delivered end-to-end against your acceptance checklist." },
      { num: "03", title: "Scaled delivery", desc: "Hyderabad execution with US engineering oversight — throughput that flexes with your program." },
      { num: "04", title: "Approval & handoff", desc: "Deliverables arrive construction-ready, with QC evidence attached. Zero rework is the spec." },
    ],
    industries: ["Electrical Utilities", "Telecommunications", "Transportation"],
    metaTitle: "Integrated Engineering Services | Spatial Alphabet",
    metaDescription:
      "Telecom engineering (PLA, fiber HLD/LLD, permitting), power line systems on PLS-CADD/PLS-POLE, AutoCAD network design, and BIM — one accountable team.",
  },
  {
    slug: "ai-powered-geospatial",
    name: "AI Powered — Geospatial",
    navName: "AI Powered — Geospatial",
    promise:
      "GeoAI-driven processing that reconciles heterogeneous spatial data into a single, authoritative, decision-ready dataset — the data engine behind every mapping, analytics, and application deliverable.",
    tags: "GEOAI · ESRI ARCGIS · QGIS · FME · POSTGIS · LIDAR",
    tools: ["Esri ArcGIS", "QGIS", "FME", "PostGIS", "GeoAI / Computer Vision", "LiDAR", "QField", "Grafana"],
    heroImg: "/assets/hero-corridor.png",
    heroAlt: "LiDAR point-cloud corridor render",
    sideImg: "/assets/client/conflation-workflow.png",
    sideAlt: "GeoAI conflation engine reconciling field, CAD, GIS, and imagery data into one authoritative dataset",
    problemTitle: "Field GPS, as-built CAD, legacy GIS, and imagery that never agree.",
    problem:
      "Spatial Alphabet takes field GPS surveys, as-built CAD drawings, legacy GIS geodatabases, and satellite or drone imagery and reconciles them into one authoritative dataset through GeoAI-driven feature matching — spatial proximity analysis combined with computer-vision and machine-learning similarity scoring — followed by geometry snapping, rubber-sheeting, attribute reconciliation, and topology validation. On a live flood-monitoring initiative, we conflated rainfall, weather-station, DEM terrain, and flood-zone data into a single geodatabase feeding an automated SMS/WhatsApp/push alerting pipeline.",
    groups: [
      {
        title: "Core geospatial capabilities",
        intro: "Every capability feeds one authoritative, decision-ready dataset.",
        img: "/assets/client/geo-capabilities.png",
        imgAlt: "Core geospatial capabilities: data conflation, application development, and web mapping",
        items: [
          { title: "LiDAR Mapping", desc: "High-density point-cloud capture from airborne, drone, or terrestrial LiDAR for terrain modelling, NESC vegetation-encroachment analysis, and utility corridor mapping — feeding pole loading and make-ready." },
          { title: "LULC Mapping", desc: "AI-assisted Land Use / Land Cover classification from satellite and aerial imagery — tracking vegetation, built-up areas, water bodies, and terrain change over time for route planning, environmental review, and siting." },
          { title: "Utility Mapping", desc: "Poles, conductors, underground lines, and substations mapped into GIS-ready datasets for asset management, network planning, and permitting support." },
          { title: "Vectorization", desc: "Raster imagery, scanned drawings, and legacy maps converted into structured, editable vector GIS layers through GeoAI feature matching, geometry snapping, and topology validation." },
        ],
      },
    ],
    process: [
      { num: "01", title: "Audit", desc: "We inventory your data sources, formats, and target systems, and define the acceptance spec together." },
      { num: "02", title: "Pilot", desc: "A bounded slice — one county, one corridor, one dataset — delivered to production standard." },
      { num: "03", title: "Conflation", desc: "GeoAI feature matching, snapping, and reconciliation into one authoritative dataset, QC-reviewed." },
      { num: "04", title: "Sustain", desc: "Documented workflows, update cycles, and support so the data stays decision-ready." },
    ],
    industries: ["Electrical Utilities", "Telecommunications", "Oil & Gas", "Government & Public Sector"],
    metaTitle: "AI Powered — Geospatial | Spatial Alphabet",
    metaDescription:
      "GeoAI data conflation plus LiDAR, LULC, and utility mapping and vectorization — heterogeneous spatial data reconciled into one authoritative, decision-ready dataset.",
  },
  {
    slug: "application-development",
    name: "Application Development",
    navName: "Application Development",
    promise:
      "Custom, production-grade applications across desktop, web, and mobile — every surface built on a shared API, geoprocessing, and spatial-database backbone so data stays consistent no matter which application a user opens.",
    tags: "REACT · NEXT.JS · ARCGIS SDK · FLUTTER · FASTAPI · AWS/AZURE",
    tools: ["React", "Next.js", "ArcGIS Maps SDK", "Flutter", "React Native", "FastAPI", "Django REST", "GraphQL", "Docker/Kubernetes", "AWS/Azure"],
    heroImg: "/assets/gen/vector-map-dark.png",
    heroAlt: "Dark-theme web map application with a routed corridor between two points",
    sideImg: "/assets/client/appdev-architecture.png",
    sideAlt: "GIS application development architecture — end-to-end geospatial application stack",
    problemTitle: "Off-the-shelf GIS software wasn't built for how your teams actually work.",
    problem:
      "Every engagement is scoped across three delivery surfaces, chosen to match how a specific user group works: field crews need offline-capable mobile apps, engineering teams need desktop tools that integrate directly with CAD and structural-analysis software, and stakeholders need browser-based portals and dashboards accessible from anywhere — all on one shared API, geoprocessing, and spatial-database backbone.",
    groups: [
      {
        title: "Delivery surfaces & platform",
        intro: "One shared backbone under desktop, web, and mobile.",
        img: "/assets/client/appdev-architecture.png",
        imgAlt: "Shared architecture underlying desktop, web, and mobile application builds",
        items: [
          { title: "Desktop (ESRI, QGIS Customizations)", desc: "Native ArcGIS Pro add-ins (ArcGIS Pro SDK, .NET, Python) and QGIS plugins that automate geoprocessing, batch validation, and format conversion via ArcPy — integrating directly with PLS-CADD, PLS-POLE, SPIDAcalc, and O-Calc Pro APIs, extending to 3D digital-twin authoring." },
          { title: "Web Apps", desc: "Enterprise-grade interactive web applications and dashboards built with React, Next.js, and the ArcGIS Maps SDK for JavaScript — including PWA offline patterns, AI copilot interfaces, and in-browser 3D digital-twin viewers with CesiumJS and WebGL." },
          { title: "Mobile Apps", desc: "Offline-capable field apps built with Flutter, React Native, and the ArcGIS Maps SDK for Native Apps, with high-accuracy GNSS, AR overlays for buried/overhead assets, and on-device AI (TensorFlow Lite, Core ML) that flags defects the moment a photo is captured." },
          { title: "Big Data Analytics", desc: "Large-scale processing and analytics pipelines over infrastructure and geospatial datasets, surfaced through ArcGIS Dashboards and executive reporting — pattern detection and predictive insight, not static reports." },
          { title: "Automation with AI/ML", desc: "On-device and cloud AI/ML for defect detection, GeoAI feature matching and classification during conflation, and automated QA/QC — cutting manual review across the engineering and geospatial pipelines." },
          { title: "Product Development", desc: "End-to-end product builds — architecture, UX, and deployment — hosted on Docker/Kubernetes and AWS/Azure with CI/CD delivery." },
          { title: "Custom Software Solutions", desc: "Bespoke software tailored to your workflows and integrations, built on the same FastAPI/Django REST, GraphQL, and Node.js backend shared across every Spatial Alphabet product." },
        ],
      },
    ],
    process: [
      { num: "01", title: "Discovery", desc: "We map the workflow, the users, and the systems the application must live between." },
      { num: "02", title: "Prototype", desc: "A working slice in weeks — real data, real devices, real feedback before full build." },
      { num: "03", title: "Build & integrate", desc: "Iterative delivery on a shared API/geoprocessing/spatial-DB backbone, with automated testing." },
      { num: "04", title: "Operate", desc: "Cloud deployment, monitoring, and a support path that doesn't end at launch." },
    ],
    industries: ["Electrical Utilities", "Telecommunications", "Government & Public Sector", "Transportation"],
    metaTitle: "Geospatial Application Development | Spatial Alphabet",
    metaDescription:
      "Desktop (ESRI/QGIS), web, and mobile apps plus big-data analytics, AI/ML automation, product development, and custom software — one shared spatial backbone.",
  },
  {
    slug: "talent-acquisition",
    name: "Talent Acquisition",
    navName: "Talent Acquisition",
    promise:
      "End-to-end recruitment across the US and India, closing the gap between scarce niche technical talent and the specialized hiring most agencies can't handle.",
    tags: "US + INDIA · AI MATCHING · ATS PIPELINE · RPO · EXECUTIVE SEARCH",
    tools: ["LinkedIn", "Naukri", "GitHub", "ATS-integrated pipeline", "AI candidate matching", "Technical assessments"],
    heroImg: "/assets/gen/globe-timezones.png",
    heroAlt: "Globe wireframe with an arc linking the Keller and Hyderabad offices",
    sideImg: "/assets/client/hiring-cycle.png",
    sideAlt: "The five-stage hiring cycle behind every placement, from requisition to onboarding",
    problemTitle: "The talent you need isn't sitting on job boards.",
    problem:
      "Spatial Alphabet closes four hiring gaps generic recruiters routinely miss: niche talent that requires domain-fluent recruiters (GIS, AI/ML, engineering); time-to-fill that stalls projects and burns budget; the cost of a mis-hire, which runs to a multiple of salary; and the absence of a true US–India bridge for sourcing India-based talent while managing US compliance and time-zone overlap.",
    groups: [
      {
        title: "Technology-Driven Recruiting",
        intro: "AI-assisted sourcing and a continuously refreshed pipeline of 500+ active candidates.",
        img: "/assets/client/talent-banner.jpg",
        imgAlt: "Spatial Alphabet Talent Acquisition — end-to-end recruitment across the US and India",
        items: [
          { title: "AI candidate matching", desc: "Best-fit profiles surfaced from the pipeline in minutes rather than days, with multi-channel active sourcing across LinkedIn, Naukri, GitHub, and referral networks." },
          { title: "ATS-integrated pipeline", desc: "Full visibility into candidate stage, feedback, and timeline, with standardized role-specific technical assessments before client submission." },
          { title: "Cross-timezone coordination", desc: "Video interviews and delivery coordinated across US and India time zones." },
        ],
      },
      {
        title: "Our four-stage vetting process",
        intro: "Every candidate clears four stages before reaching your inbox.",
        items: [
          { title: "1 — Skills & Technical Screening", desc: "A role-specific technical assessment validating hands-on capability, not just resume claims." },
          { title: "2 — Domain Knowledge Assessment", desc: "A deep-dive interview on tools, frameworks, and real project experience in the specific domain." },
          { title: "3 — Behavioural & Culture Fit", desc: "A structured interview assessing communication, ownership, and team fit." },
          { title: "4 — Reference & Background Verification", desc: "Prior-employer references and credential verification before any profile is shared." },
        ],
      },
      {
        title: "Service lines",
        intro: "Engagement models spanning 12+ hiring domains from GIS & Engineering to AI/ML and Cloud & DevOps.",
        items: [
          { title: "Staff Augmentation", desc: "Vetted specialists — GIS, AI/ML, engineering, full-stack — extending your team via our Hyderabad ODC under Retainer, Fixed Bid, Contract-to-Hire, or Staff Aug models." },
          { title: "Strategic Workforce Planning", desc: "Planning hiring pipeline and capacity ahead of project need across 12+ hiring domains." },
          { title: "Employer Branding", desc: "Positioning your roles and teams to attract scarce, niche technical talent in competitive markets." },
          { title: "Active Candidate Sourcing", desc: "Multi-channel outreach feeding a continuously refreshed pipeline of 500+ active candidates." },
          { title: "Executive Search", desc: "Leadership-level hiring run through the same structured screening and reference verification as every placement." },
          { title: "Recruitment Process Outsourcing (RPO)", desc: "A fully managed, outsourced hiring function delivered as a single dedicated engagement." },
        ],
      },
    ],
    process: [
      { num: "01", title: "Requisition", desc: "We define the role against real deliverables — tools, standards, and output expectations." },
      { num: "02", title: "Source & screen", desc: "AI matching plus the four-stage vetting process, with duplicates checked before submission." },
      { num: "03", title: "Interview & offer", desc: "Client interviews, offer discussion, and negotiation support to final select." },
      { num: "04", title: "Onboard & review", desc: "Pre-joining, onboarding, and a final hiring review — with backfill guarantees." },
    ],
    industries: ["Electrical Utilities", "Telecommunications", "Oil & Gas", "Government & Public Sector"],
    metaTitle: "Talent Acquisition — Staffing, RPO, Executive Search | Spatial Alphabet",
    metaDescription:
      "End-to-end US + India recruitment: AI candidate matching, four-stage vetting, staff augmentation, workforce planning, executive search, and RPO.",
  },
];
export type Industry = {
  slug: string;
  name: string;
  line: string;
  img: string;
  alt: string;
  caption: string;
  narrative: string[];
  help: { title: string; desc: string }[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "electrical-utilities",
    name: "Electrical Utilities",
    line: "Pole loading, PLS-CADD/PLS-POLE T&D engineering, AutoCAD network design, and LiDAR vegetation monitoring for a grid in the middle of a global super-cycle.",
    img: "/assets/ind-utilities.png",
    alt: "High-voltage transmission corridor at dusk",
    caption: "Transmission and distribution networks — the structural and clearance work behind a global grid super-cycle.",
    narrative: [
      "Grid infrastructure is in the middle of a global super-cycle: aging transmission and distribution networks are being rebuilt at the same time they must absorb record renewable capacity and surging demand from data centres and electrification. Spatial Alphabet supports utilities through exactly this build-out — with Pole Loading Analysis, PLS-CADD/PLS-POLE transmission and distribution engineering, AutoCAD network design, and LiDAR-based vegetation-clearance monitoring.",
      "Because Spatial Alphabet already runs a Hyderabad Offshore Development Center alongside its Texas headquarters, it is structurally positioned to deliver in US hours, Middle East/UK overlap, and India-domestic — capturing a $1.5 trillion global cycle from a single team, without standing up separate regional operations.",
    ],
    help: [
      { title: "Pole Loading Analysis", desc: "NESC/GO95/ASCE pass-fail analysis at program scale, with make-ready identification and certified reports." },
      { title: "T&D engineering", desc: "PLS-CADD/PLS-POLE line design and AutoCAD network drawings your engineers approve first pass." },
      { title: "Vegetation monitoring", desc: "LiDAR-based encroachment analysis against NESC clearance thresholds along the corridor." },
    ],
  },
  {
    slug: "telecommunications",
    name: "Telecommunications",
    line: "Pole Loading Analysis, HLD/LLD fiber network design, and permitting-through-make-ready for accelerating fiber and 5G build-out.",
    img: "/assets/ind-urban.png",
    alt: "Dense urban network aerial view",
    caption: "Dense urban corridors — the fiber and 5G networks behind global connectivity build-out.",
    narrative: [
      "Fiber and 5G build-out is accelerating on every continent, driven by government subsidy programmes racing to close rural connectivity gaps and by AI/data-centre demand pulling fiber capacity toward hyperscale sites. Spatial Alphabet's Pole Loading Analysis, HLD/LLD fiber network design, and permitting-through-make-ready workflow map directly onto this wave of construction.",
      "The same bottleneck shows up in every market — the US and UK closing last-mile gaps, India connecting its last unconnected villages, the Middle East building 5G corridors from scratch: subsidy dollars and licenses are released faster than networks can be structurally engineered, staked, and permitted. That is the layer Spatial Alphabet operates in, run locally in each market.",
    ],
    help: [
      { title: "Pole Loading Analysis", desc: "Structural analysis for telecom attaches, with make-ready identification and certified reports." },
      { title: "Fiber design (HLD/LLD)", desc: "Route, topology, and fiber-count sizing through pole-by-pole staking, splice diagrams, and BOM." },
      { title: "Permitting & make-ready", desc: "Attachment and ROW applications tracked through to Notice to Proceed." },
    ],
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    line: "Corridor mapping, LiDAR-based encroachment monitoring, and legacy-drawing digitization for record-pace pipeline and midstream expansion.",
    img: "/assets/ind-oilgas.png",
    alt: "Pipeline facility aerial view",
    caption: "Corridor mapping and encroachment monitoring — capability built to extend from utility and telecom work into pipeline corridors.",
    narrative: [
      "Even as power grids electrify, pipeline and midstream infrastructure is being expanded at record pace to move gas to LNG export terminals and gas-fired power plants feeding data-centre demand. Spatial Alphabet's corridor mapping, LiDAR-based encroachment monitoring, and legacy-drawing digitization are directly transferable to this build-out.",
      "US shale-linked pipeline expansion, Gulf state megaprojects, UK institutional asset transfers, and India's National Gas Grid all reduce to the same three services: corridor mapping, encroachment monitoring, and legacy-asset digitization. This is where our electrical-utility and telecom track record points next — the same Hyderabad-and-Texas delivery model, built to extend into pipeline corridors the moment a first reference project closes the gap.",
    ],
    help: [
      { title: "Corridor mapping", desc: "Centerline and corridor data captured, structured, and kept current with construction." },
      { title: "Encroachment monitoring", desc: "LiDAR-based analysis of vegetation and third-party encroachment along the route." },
      { title: "Legacy digitization", desc: "Paper and legacy records converted into structured, defensible as-built data." },
    ],
  },
  {
    slug: "transportation",
    name: "Transportation",
    line: "Utility-conflict mapping and legacy-drawing digitization for road, rail, and freight corridors that constantly intersect utility and telecom networks.",
    img: "/assets/ind-transport.png",
    alt: "Rail corridor aerial view",
    caption: "Utility-conflict mapping — the corridor knowledge that keeps highway, rail, and freight projects from stalling.",
    narrative: [
      "Road, rail, and freight infrastructure is being rebuilt worldwide at a scale that constantly intersects utility and telecom corridors — meaning every highway widening, rail electrification, or freight-corridor project needs the same utility-conflict mapping and legacy-drawing digitization Spatial Alphabet already applies to electrical and telecom clients.",
      "Almost none of it can be built without first knowing what utility and telecom infrastructure already occupies the corridor — routinely the reason projects stall. That is the exact problem Spatial Alphabet already solves, approached from the other direction: capability being extended into the sector as the reference project is won.",
    ],
    help: [
      { title: "Utility-conflict mapping", desc: "Existing utility and telecom infrastructure mapped along the corridor before design starts." },
      { title: "Corridor LiDAR", desc: "Classification and asset extraction along rail and roadway corridors." },
      { title: "Legacy digitization", desc: "Legacy drawings converted into structured, usable corridor records." },
    ],
  },
  {
    slug: "government-public-sector",
    name: "Government & Public Sector",
    line: "GIS asset mapping, GeoAI data conflation, and real-time monitoring dashboards — backed by a live flood-monitoring deployment.",
    img: "/assets/ind-gov.png",
    alt: "Cadastral parcel map capture",
    caption: "Real-time monitoring dashboards — proven on a live flood-monitoring platform on an open-source QGIS/PostGIS/QField/Grafana stack.",
    narrative: [
      "Governments at every level are treating geospatial data as core public infrastructure — the platform underneath permitting, asset management, disaster response, and smart-city programmes. Spatial Alphabet's GIS asset mapping, GeoAI data conflation, and real-time monitoring dashboards sit squarely inside this shift.",
      "Unlike Oil & Gas and Transportation, this is not capability being extended into a new market — Spatial Alphabet already has a live, working system: a real-time flood monitoring and field data collection platform for Hyderabad on QGIS, PostGIS, QField mobile capture, and Grafana dashboards, conflating rainfall, terrain, and flood-zone data into a single geodatabase that drives automated public alerts.",
    ],
    help: [
      { title: "GIS asset mapping", desc: "Parcel, utility, and public-asset data structured for permitting and asset management." },
      { title: "GeoAI data conflation", desc: "Heterogeneous sources reconciled into one authoritative, decision-ready geodatabase." },
      { title: "Monitoring dashboards", desc: "Real-time QField/Grafana dashboards and automated public alerting, proven in production." },
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

export const LOGOS = [
  { name: "Sonata Software", src: "/assets/logos/sonata.png" },
  { name: "7EVN Network", src: "/assets/logos/7evn.png" },
  { name: "ComTek", src: "/assets/logos/comtek.png" },
  { name: "Tiger Analytics", src: "/assets/logos/tiger-analytics.png" },
  { name: "Tech Mahindra", src: "/assets/logos/tech-mahindra.png" },
  { name: "Shaft Software Solutions", src: "/assets/logos/shaft.jpeg" },
  { name: "NAM Technologies", src: "/assets/logos/nam-technologies.jpeg" },
];

export const HERO_SLIDES = [
  {
    title: "Integrated Engineering Services",
    sub: "Telecom, power line, and utility network engineering plus BIM — from structural feasibility to construction-ready design and permitting.",
    tags: "PLS-CADD · PLS-POLE · SPIDACALC · AUTOCAD · REVIT",
    img: "/assets/ind-utilities.png",
    alt: "Transmission and distribution corridor at dusk",
    href: "/services/integrated-engineering-services",
  },
  {
    title: "AI Powered — Geospatial",
    sub: "GeoAI conflation plus LiDAR, LULC, and utility mapping — heterogeneous spatial data reconciled into one authoritative dataset.",
    tags: "GEOAI · ESRI ARCGIS · QGIS · FME · POSTGIS · LIDAR",
    img: "/assets/hero-corridor.png",
    alt: "LiDAR point-cloud corridor render",
    href: "/services/ai-powered-geospatial",
  },
  {
    title: "Application Development",
    sub: "Desktop, web, and mobile applications on one shared API, geoprocessing, and spatial-database backbone.",
    tags: "REACT · NEXT.JS · ARCGIS SDK · FLUTTER · AWS/AZURE",
    img: "/assets/gen/vector-map-dark.png",
    alt: "Dark-theme web map application",
    href: "/services/application-development",
  },
  {
    title: "Talent Acquisition",
    sub: "End-to-end US + India recruitment — AI candidate matching, four-stage vetting, staffing, executive search, and RPO.",
    tags: "US + INDIA · AI MATCHING · ATS PIPELINE · RPO",
    img: "/assets/gen/globe-timezones.png",
    alt: "Globe wireframe linking the Keller and Hyderabad offices",
    href: "/services/talent-acquisition",
  },
];

export const SERVICE_OPTIONS = [
  "Integrated Engineering Services",
  "AI Powered — Geospatial",
  "Application Development",
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
