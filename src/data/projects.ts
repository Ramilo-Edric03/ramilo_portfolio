export interface PipelineStep {
  name: string;
  description: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  images?: ProjectImage[];
  problem: string;
  solution: string;
  pipeline: PipelineStep[];
  stack: string[];
  primaryAction: {
    label: string;
    href: string;
    external: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
    external: boolean;
  };
}

export const projects: Project[] = [
  {
    slug: "aws-web-architecture",
    title: "AWS Web App Architecture Design",
    category: "Cloud infrastructure",
    status: "Specification complete",
    summary: "Production-ready AWS infrastructure specification designed for high availability and fault tolerance. Distributes compute traffic across two availability zones using public load balancers, auto-scaling private EC2 fleets, and isolated RDS database subnets.",
    images: [
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/aws-architecture-design/architecture-diagram.png?updatedAt=1790689648177",
        alt: "AWS Web App Architecture Diagram",
        caption: "Multi-AZ VPC architecture across public and private subnets",
      }
    ],
    problem: "Single-zone deployments go offline when an availability zone fails, cannot scale compute automatically, and risk exposing database layers to the public internet.",
    solution: "Configured a two-tier AWS network across two availability zones, placing load balancers in public subnets and auto-scaling EC2 instances in private subnets with CloudWatch monitoring.",
    pipeline: [
      {
        name: "Route 53 DNS",
        description: "Routes incoming domain traffic to the application endpoints with health checks.",
      },
      {
        name: "Application Load Balancer",
        description: "Receives HTTPS traffic across two public subnets and distributes requests across EC2 instances.",
      },
      {
        name: "Auto-scaling EC2 fleet",
        description: "Runs application compute in private subnets, scaling instance count based on CPU load.",
      },
      {
        name: "Multi-AZ database",
        description: "Keeps primary data in an isolated subnet with synchronous replication to a standby replica.",
      },
    ],
    stack: [
      "AWS VPC",
      "Application Load Balancer",
      "EC2 Auto Scaling",
      "IAM",
      "Amazon RDS",
      "Amazon CloudWatch",
    ],
    primaryAction: {
      label: "Request architecture document",
      href: "mailto:edric.ramilo191@gmail.com?subject=Request%20Architecture%20Document%20-%20AWS%20Web%20App%20Design",
      external: false,
    },      
  },
  {
    slug: "share-your-secret",
    title: "Share-Your-Secret",
    category: "Serverless app",
    status: "Production architecture",
    summary: "Zero-knowledge secret-sharing web application built on AWS serverless services. Encrypts sensitive credentials in the browser using the Web Crypto API with AES-256-GCM before transport, storing ciphertext in DynamoDB with single-read purge and automated 24-hour TTL expiration.",
    images: [
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/share-your-secret/image1?updatedAt=1790693926751",
        alt: "Share-Your-Secret Application Interface",
        caption: "Secret entry and client-side encryption setup",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/share-your-secret/image2?updatedAt=1790693937518",
        alt: "Share-Your-Secret Application Interface",
        caption: "One-time link generation with client-side key",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/share-your-secret/image3?updatedAt=1790693947477",
        alt: "Share-Your-Secret Application Interface",
        caption: "Recipient decryption interface before payload purge",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/share-your-secret/image6?updatedAt=1790693990882",
        alt: "Share-Your-Secret Application Interface",
        caption: "Decrypted secret view and immediate DynamoDB purge",
      },
    ],
    problem: "Sharing credentials and API keys in chat tools leaves plaintext passwords in message logs and search histories.",
    solution: "Encrypts secrets in the browser using the Web Crypto API with AES-GCM before sending them to AWS Lambda. DynamoDB stores the ciphertext, deletes it after the first read, and uses a 24-hour TTL for unread secrets.",
    pipeline: [
      {
        name: "Browser encryption",
        description: "Generates an AES-256-GCM key in the browser and encrypts the secret before it leaves the client.",
      },
      {
        name: "Lambda API",
        description: "Stores the ciphertext in DynamoDB without ever receiving the decryption key.",
      },
      {
        name: "Single-read purge",
        description: "Deletes the record from DynamoDB on the first read request so it cannot be viewed twice.",
      },
      {
        name: "TTL cleanup",
        description: "DynamoDB removes unread secrets after 24 hours automatically.",
      },
    ],
    stack: [
      "AWS Lambda",
      "Amazon DynamoDB",
      "Web Crypto API",
      "AES-GCM",
      "Node.js",
      "Python",
    ],
    primaryAction: {
      label: "Request demo",
      href: "mailto:edric.ramilo191@gmail.com?subject=Request%20Workflow%20Demo%20-%20ShareYourSecret",
      external: false,
    },
  },
  {
    slug: "openkitchen",
    title: "OpenKitchen",
    category: "Browser automation",
    status: "Internship project",
    summary: "Tool to replace repetitive manual web scraping workflows. Translates plain English instructions into structured JSON execution steps via the Gemini API, drives browser automation in Playwright, and exports formatted tables to Excel via ExcelJS.",
    images: [
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/openkitchen/Screenshot%202026-09-29%20194400.png?updatedAt=1790689648129",
        alt: "OpenKitchen landing page and product demo",
        caption: "Landing page showcasing core features and workflow demo",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/openkitchen/Screenshot%202026-09-29%20194423.png?updatedAt=1790689648144",
        alt: "Chat interface and automation event stream dashboard",
        caption: "Chat interface and dashboard with event streaming and execution replay",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/openkitchen/Screenshot%202026-09-29%20194503.png?updatedAt=1790689648075",
        alt: "Headed Chrome browser running Playwright automation",
        caption: "Headed Chrome browser executing live Playwright automation",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/openkitchen/Screenshot%202026-09-29%20194431.png?updatedAt=1790689648192",
        alt: "Parsed DOM tree and extracted automation results",
        caption: "Extracted DOM inspection and top scraping results",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/openkitchen/Screenshot%202026-09-29%20194538.png?updatedAt=1790689648204",
        alt: "Excel spreadsheet report generated with ExcelJS",
        caption: "Generated Excel report exported via ExcelJS",
      },
    ],
    problem: "Repetitive data entry and manual web scraping take hours for operations teams without developer support.",
    solution: "Parses user instructions into task steps with the Gemini API, runs them in Playwright, and exports the scraped data to Excel files using ExcelJS.",
    pipeline: [
      {
        name: "Prompt input",
        description: "User submits an automation task in plain English.",
      },
      {
        name: "Gemini API parsing",
        description: "Converts the plain text request into structured JSON steps.",
      },
      {
        name: "Playwright engine",
        description: "Opens a headed browser, navigates to the target page, and collects the requested data.",
      },
      {
        name: "DOM parsing",
        description: "Normalizes raw HTML nodes into structured JSON records using Gemini.",
      },
      {
        name: "Excel export",
        description: "Formats scraped records and writes them to an Excel spreadsheet with ExcelJS.",
      },
    ],
    stack: [
      "Playwright",
      "Google Gemini API",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "ExcelJS",
    ],
    primaryAction: {
      label: "Request workflow demo",
      href: "mailto:edric.ramilo191@gmail.com?subject=Request%20Workflow%20Demo%20-%20OpenKitchen",
      external: false,
    },
  },
  {
    slug: "respobilis",
    title: "RespoBilis",
    category: "Disaster coordination",
    status: "Capstone project",
    summary: "Municipal disaster coordination platform built as a capstone project for emergency teams in Tanauan City, Batangas. Synchronizes distress reports and responder dispatches in real time using Supabase websockets, calculating driving paths via OSRM to navigate road obstacles.",
    images: [
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/respobilis/image40.png?updatedAt=1790689648339",
        alt: "RespoBilis landing page and public assistance portal",
        caption: "Landing page and public assistance portal",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/respobilis/image89.png?updatedAt=1790689648745",
        alt: "Resident reporting dashboard",
        caption: "Resident dashboard for reporting incidents and tracking assistance status",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/respobilis/image83.png?updatedAt=1790689648717",
        alt: "Incident review details with location map and assigned team",
        caption: "Detailed incident review showing location coordinates, photos, and team status",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/respobilis/image86.png?updatedAt=1790689648531",
        alt: "Field responder dashboard with dispatch queue and navigation",
        caption: "Field responder dashboard displaying active dispatches and navigation routes",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/respobilis/image80.png",
        alt: "Administrative dashboard with response statistics",
        caption: "Central admin dashboard tracking city-wide response metrics",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/respobilis/image27.png?updatedAt=1790689648849",
        alt: "Announcement creation form for system-wide broadcasts",
        caption: "Broadcast creator for system-wide public alerts",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/respobilis/image13.png?updatedAt=1790689648323",
        alt: "Real-time incident monitoring table filtered by status",
        caption: "Incident monitoring view tracking active, in-progress, and approval-pending requests",
      },
    ],
    problem: "Response teams in Tanauan City, Batangas lacked a shared system to track incidents and find the fastest routes during disasters.",
    solution: "Built a web app using Supabase for live incident tracking and OSRM for calculating road routes between dispatchers and field responders.",
    pipeline: [
      {
        name: "Incident report",
        description: "Dispatchers log active requests with location coordinates and priority level.",
      },
      {
        name: "Realtime sync",
        description: "Supabase broadcasts incident updates to all connected field responder screens instantly.",
      },
      {
        name: "Route calculation",
        description: "OSRM evaluates the local road network and returns the shortest driving path.",
      },
      {
        name: "Field navigation",
        description: "Responders view the calculated route and incident details on their mobile devices.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "OSRM routing",
    ],
    primaryAction: {
      label: "Request capstone documentation",
      href: "mailto:edric.ramilo191@gmail.com?subject=Request%20Capstone%20Documentation%20-%20RespoBilis",
      external: false,
    },
  },
  {
    slug: "apt-connect",
    title: "apt.connect",
    category: "Property management",
    status: "Deployed",
    summary: "Full-stack property management application built for landlords to oversee residential buildings, units, and leases. Manages monthly billing ledgers, tracks maintenance work orders through resolution, and generates downloadable PDF payment receipts.",
    images: [
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/aptconnect/1749654129449.jpg?updatedAt=1790689564780",
        alt: "apt.connect landing page and property management platform overview",
        caption: "Public landing page introducing the property management platform",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/aptconnect/1749654149011.jpg?updatedAt=1790689564858",
        alt: "Property owner dashboard displaying property analytics and payment trends",
        caption: "Landlord dashboard with property metrics, payment trends, and occupancy stats",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/aptconnect/1749654158364.jpg?updatedAt=1790689565233",
        alt: "Property management list showing occupancy status",
        caption: "Property listings view for managing buildings, units, and tenant assignments",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/aptconnect/1749654169184.jpg?updatedAt=1790689564842",
        alt: "Property unit list showing occupancy status ",
        caption: "Unit listings view for managing unit details and tenant assignments",
      },
      {
        src: "https://ik.imagekit.io/fxzzjqc0u/project-images/aptconnect/1749654190558.jpg?updatedAt=1790689564977",
        alt: "Landlord payment history table with transaction logs and export options",
        caption: "Payment history ledger with manual payment recording and PDF report export",
      },   
    ],
    problem: "Managing apartments with paper ledgers and chat messages leads to missed rent payments and unresolved maintenance requests.",
    solution: "Built a web portal with monthly billing schedules, maintenance ticket tracking, and announcement feeds backed by a MySQL database.",
    pipeline: [
      {
        name: "JWT authentication",
        description: "Verifies landlord session tokens on protected Express API routes.",
      },
      {
        name: "REST API routing",
        description: "Processes CRUD operations for properties, units, leases, and maintenance logs.",
      },
      {
        name: "PDF generation engine",
        description: "Compiles payment ledger data into downloadable transaction reports.",
      },
      {
        name: "MySQL persistence",
        description: "Stores normalized property records, occupancies, and billing histories.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "Tailwind CSS",
    ],
    primaryAction: {
      label: "Open live demo",
      href: "https://aptconnect-dev2.vercel.app/",
      external: true,
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
