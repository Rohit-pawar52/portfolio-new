// ---------------------------------------------------------------------------
// All website content lives in this file. Edit text here; you never need to
// touch the components. Everything below comes from the resume
// (public/Mukesh_Pawar_Resume.pdf).
//
// Lines marked "TODO" are details the resume does not include. While a value
// is null, the site simply hides it. Fill it in and it appears automatically.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mukesh Pawar",
  initials: "MP",
  role: "DevOps Engineer",
  roleAccent: "DevSecOps Engineer", // shown in gradient next to the role
  location: "Gurugram, Haryana, India",
  yearsExperience: "8", // total IT experience
  devopsYears: "5+", // DevOps experience: April 2021 – present (Reliance, Talent Pull, Pearce)
  // One-line intro for the hero
  intro:
    "5+ years in DevOps and 8 years in IT, automating Azure cloud infrastructure with Terraform, Docker and CI/CD pipelines for secure, scalable, enterprise-grade delivery.",
  resumeFile: "/Mukesh_Pawar_Resume.pdf",
};

export const contact = {
  email: "mukeshpawar74403@gmail.com",
  phone: "+91 7440374125",
  whatsapp: "917440374125", // digits only, used for wa.me links
  linkedin: "https://www.linkedin.com/in/mukesh-pawar-2b621230b",
  // TODO: add your GitHub profile URL, e.g. "https://github.com/your-username"
  github: null,
};

// Tool names that scroll in the strip under the hero
export const coreStack = [
  "Azure DevOps",
  "Terraform",
  "Docker",
  "Kubernetes",
  "Azure Pipelines",
  "GitHub Actions",
  "Azure Key Vault",
  "Azure Virtual Machines",
  "Prometheus & Grafana",
  "Azure CLI",
  "Azure Repos",
  "Git & GitHub",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "Azure Cloud Engineer with 8 years of IT experience, including 5+ years of expertise in Azure DevOps and cloud-native technologies. Skilled in designing, deploying, and managing secure, scalable, and high-performance cloud infrastructures for enterprise-grade applications.",
    "Proven track record in driving automation through Infrastructure as Code (IaC) and developing robust CI/CD pipelines to accelerate delivery and enhance system reliability. Adept at optimizing cloud environments for cost efficiency, performance, and security, while ensuring compliance and operational excellence.",
  ],
  // Small terminal-style line shown in About
  motto: "Automate the infrastructure. Eliminate the drift. Ship reliably.",
  glance: [
    { label: "Location", value: "Gurugram, Haryana" },
    { label: "Current company", value: "Pearce Services Global" },
    { label: "DevOps experience", value: "5+ years", highlight: true },
    { label: "Total IT experience", value: "8 years" },
    { label: "Focus", value: "Azure DevOps, IaC, CI/CD, DevSecOps" },
    { label: "Education", value: "BE Electronics & Communication, RGPV" },
  ],
  stats: [
    { value: 5, suffix: "+", label: "Years in DevOps" },
    { value: 8, suffix: "", label: "Years in IT" },
    { value: 40, suffix: "%", label: "Less incident response time" },
    { value: 2, suffix: "", label: "Cloud certifications" },
  ],
  // Focus-area cards. color: accent | blue | amber | coral   icon: cloud | pipeline | container | monitor
  focusAreas: [
    {
      title: "Cloud & Infrastructure as Code",
      color: "accent",
      icon: "cloud",
      text: "Terraform-driven provisioning on Azure: Virtual Machines, Key Vault and Azure CLI, with consistent, repeatable Dev, QA and Production environments.",
    },
    {
      title: "CI/CD & Release Automation",
      color: "blue",
      icon: "pipeline",
      text: "Multi-stage pipelines with Azure DevOps, Azure Pipelines, Azure Repos and GitHub Actions, replacing manual deployments with fast, error-free releases.",
    },
    {
      title: "Containers & Orchestration",
      color: "amber",
      icon: "container",
      text: "Docker-based containerized applications and microservices deployed on Kubernetes for portability, scalability and fault tolerance.",
    },
    {
      title: "Observability & Reliability",
      color: "coral",
      icon: "monitor",
      text: "Prometheus and Grafana monitoring and alerting, auto-scaling, load balancing and DevOps best practices that cut incident response time by 40%.",
    },
  ],
};

export const experience = [
  {
    company: "Pearce Services Global Private Limited",
    // TODO: the resume does not list your job title at Pearce. Add it here.
    role: null,
    location: "Gurugram",
    period: "October 2025 – Present",
    color: "accent",
    points: [
      "Automated end-to-end cloud infrastructure provisioning using Terraform (Infrastructure as Code) to ensure consistent, scalable, and repeatable deployments across Development, QA, and Production environments.",
      "Designed and implemented CI/CD pipelines using Azure DevOps and Azure Pipelines, reducing manual intervention and enabling faster, reliable application deployments.",
      "Built and deployed containerized applications using Docker, improving application portability, scalability, and environment consistency.",
      "Improved system reliability and performance by applying DevOps best practices including auto-scaling, load balancing, and infrastructure optimization.",
      "Streamlined release processes by replacing manual deployment workflows with fully automated CI/CD pipelines, enabling faster and error-free software delivery.",
    ],
    tech: ["Terraform", "Azure DevOps", "Azure Pipelines", "Docker", "GitHub", "CI/CD"],
  },
  {
    company: "Talent Pull & Infrastructure Pvt Ltd",
    // TODO: the resume does not list your job title or location at Talent Pull. Add them here.
    role: null,
    location: null,
    period: "June 2025 – October 2025",
    color: "blue",
    points: [
      "Automated cloud infrastructure provisioning using Terraform (IaC) to deliver consistent, secure, and version-controlled deployments across development, QA, and production environments.",
      "Configured Prometheus and Grafana for monitoring and alerting, enhancing system observability and reducing incident response time by 40%.",
      "Containerized and deployed applications using Docker, improving application portability, scalability, and deployment consistency across multiple environments.",
      "Developed and optimized CI/CD pipelines to automate build, test, and deployment processes, reducing manual effort and accelerating software releases.",
    ],
    tech: ["Terraform", "Docker", "Prometheus", "Grafana", "CI/CD"],
  },
  {
    company: "Reliance Industries Ltd.",
    role: "DevOps Engineer",
    location: "Raipur, Chhattisgarh",
    period: "April 2021 – March 2025",
    color: "amber",
    points: [
      "Automated end-to-end cloud infrastructure provisioning using Terraform (IaC), ensuring highly consistent, reliable, and repeatable deployments across Dev, QA, and Production environments.",
      "Built and deployed containerized applications using Docker, enabling scalable, portable, and fault-tolerant solutions across diverse environments.",
      "Streamlined deployment processes by eliminating manual tasks and configuration drift through standardized, automated pipelines.",
      "Improved infrastructure resilience and scalability by applying DevOps best practices to optimize performance, reduce downtime, and enhance operational workflows.",
      "Enhanced deployment efficiency by replacing manual workflows with fully automated CI/CD processes, reducing configuration drift and ensuring rapid, error-free releases.",
    ],
    tech: ["Terraform", "Docker", "CI/CD", "Azure"],
  },
  {
    company: "Pratap Technocrat Pvt Ltd",
    role: "Network Support Engineer",
    // TODO: the resume does not list a location for Pratap Technocrat. Add it here if you want it shown.
    location: null,
    period: "June 2018 – May 2019",
    color: "coral",
    points: [
      "Set up customized internet solutions for both residential and commercial clients, ensuring high-speed and reliable network connectivity tailored to specific requirements.",
      "Offered end-to-end technical support, efficiently diagnosing and resolving connectivity issues, network outages, and performance slowdowns to minimize disruptions.",
      "Addressed network inefficiencies by optimizing configurations and implementing upgrades to meet changing customer demands and maintain peak performance.",
    ],
    tech: ["Networking", "Troubleshooting", "Technical Support"],
  },
];

// Skill groups. icon: cloud | pipeline | container | monitor | git
export const skills = [
  {
    category: "Cloud",
    icon: "cloud",
    items: ["Azure Cloud Computing", "Azure Virtual Machines (VMs)", "Azure CLI", "Azure Key Vault", "Oracle Cloud Infrastructure"],
  },
  {
    category: "CI/CD & DevOps",
    icon: "pipeline",
    items: ["Azure DevOps", "Azure Pipelines", "Azure Repos", "GitHub Actions", "CI/CD Pipelines"],
  },
  {
    category: "IaC & Containers",
    icon: "container",
    items: ["Terraform", "Docker", "Kubernetes"],
  },
  {
    category: "Monitoring & Observability",
    icon: "monitor",
    items: ["Prometheus", "Grafana", "Alerting"],
  },
  {
    category: "Version Control",
    icon: "git",
    items: ["Git", "GitHub", "Azure Repos"],
  },
];

// category is used by the filter tabs. art picks the illustration: modules | containers | pipeline | monitoring
export const projects = [
  {
    title: "Terraform Module Library",
    category: "Infrastructure",
    art: "modules",
    description:
      "Developed reusable Terraform modules for Azure resources to enable scalable infrastructure deployment.",
    tech: ["Terraform", "Azure", "IaC"],
    github: null, // TODO: add the GitHub repo URL
    live: null,
  },
  {
    title: "Dockerized Microservices Platform",
    category: "Containers",
    art: "containers",
    description:
      "Built and containerized microservices using Docker and deployed them on Kubernetes with CI/CD integration.",
    tech: ["Docker", "Kubernetes", "CI/CD"],
    github: null, // TODO: add the GitHub repo URL
    live: null,
  },
  {
    title: "CI/CD Pipeline Automation",
    category: "CI/CD",
    art: "pipeline",
    description:
      "Designed multi-stage pipelines using Azure DevOps and GitHub Actions for automated testing and deployment.",
    tech: ["Azure DevOps", "GitHub Actions", "Automated Testing"],
    github: null, // TODO: add the GitHub repo URL
    live: null,
  },
  {
    title: "Monitoring System",
    category: "Observability",
    art: "monitoring",
    description:
      "Implemented Prometheus and Grafana dashboards with alerting for infrastructure and application metrics.",
    tech: ["Prometheus", "Grafana", "Alerting"],
    github: null, // TODO: add the GitHub repo URL
    live: null,
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering in Electronics & Communication",
    institution: "LNCT Indore, RGPV Bhopal",
    year: "2016",
  },
];

export const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2025 Foundations Associate",
    short: "OCI Foundations", // short label for the hero badge
    issuer: "Oracle",
    url: null, // TODO: add your own Oracle badge link
  },
  {
    name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    short: "AZ-900",
    issuer: "Microsoft",
    url: null, // TODO: add your own Microsoft Learn credential link
  },
];
