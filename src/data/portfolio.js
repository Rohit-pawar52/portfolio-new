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
  role: "DevOps Engineer | DevSecOps Engineer",
  location: "Gurugram",
  yearsExperience: "8", // shown on the photo badge in the hero
  // One-line intro for the hero, taken from the resume summary
  intro:
    "Azure Cloud Engineer with 8 years of IT experience, including 4.8 years of expertise in Azure DevOps and cloud-native technologies.",
  resumeFile: "/Mukesh_Pawar_Resume.pdf",
};

export const contact = {
  email: "mukeshpawar74403@gmail.com",
  phone: "+91 7440374125",
  linkedin: "https://www.linkedin.com/in/mukesh-pawar-2b621230b",
  // TODO: add your GitHub profile URL, e.g. "https://github.com/your-username"
  github: null,
};

// Short tool list shown in the strip under the hero
export const coreStack = [
  "Azure DevOps",
  "Terraform",
  "Docker",
  "Kubernetes",
  "Azure Key Vault",
  "GitHub Actions",
  "Prometheus",
  "Grafana",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "Azure Cloud Engineer with 8 years of IT experience, including 4.8 years of expertise in Azure DevOps and cloud-native technologies. Skilled in designing, deploying, and managing secure, scalable, and high-performance cloud infrastructures for enterprise-grade applications.",
    "Proven track record in driving automation through Infrastructure as Code (IaC) and developing robust CI/CD pipelines to accelerate delivery and enhance system reliability. Adept at optimizing cloud environments for cost efficiency, performance, and security, while ensuring compliance and operational excellence.",
  ],
  highlights: [
    { value: "8 yrs", label: "IT experience" },
    { value: "4.8 yrs", label: "Azure DevOps & cloud-native" },
    { value: "40%", label: "Less incident response time with Prometheus & Grafana monitoring" },
  ],
};

export const experience = [
  {
    company: "Pearce Services Global Private Limited",
    // TODO: the resume does not list your job title at Pearce. Add it here.
    role: null,
    location: "Gurugram",
    period: "October 2025 – Present",
    points: [
      "Automated end-to-end cloud infrastructure provisioning using Terraform (Infrastructure as Code) to ensure consistent, scalable, and repeatable deployments across Development, QA, and Production environments.",
      "Designed and implemented CI/CD pipelines using Azure DevOps and Azure Pipelines, reducing manual intervention and enabling faster, reliable application deployments.",
      "Built and deployed containerized applications using Docker, improving application portability, scalability, and environment consistency.",
      "Improved system reliability and performance by applying DevOps best practices including auto-scaling, load balancing, and infrastructure optimization.",
    ],
  },
  {
    company: "Talent Pull & Infrastructure Pvt Ltd",
    // TODO: the resume does not list your job title or location at Talent Pull. Add them here.
    role: null,
    location: null,
    period: "June 2025 – October 2025",
    points: [
      "Automated cloud infrastructure provisioning using Terraform (IaC) to deliver consistent, secure, and version-controlled deployments across development, QA, and production environments.",
      "Configured Prometheus and Grafana for monitoring and alerting, enhancing system observability and reducing incident response time by 40%.",
      "Containerized and deployed applications using Docker, improving application portability, scalability, and deployment consistency across multiple environments.",
      "Developed and optimized CI/CD pipelines to automate build, test, and deployment processes, reducing manual effort and accelerating software releases.",
    ],
  },
  {
    company: "Reliance Industries Ltd.",
    role: "DevOps Engineer",
    location: "Raipur, Chhattisgarh",
    period: "April 2021 – March 2025",
    points: [
      "Automated end-to-end cloud infrastructure provisioning using Terraform (IaC), ensuring highly consistent, reliable, and repeatable deployments across Dev, QA, and Production environments.",
      "Built and deployed containerized applications using Docker, enabling scalable, portable, and fault-tolerant solutions across diverse environments.",
      "Improved infrastructure resilience and scalability by applying DevOps best practices to optimize performance, reduce downtime, and enhance operational workflows.",
      "Enhanced deployment efficiency by replacing manual workflows with fully automated CI/CD processes, reducing configuration drift and ensuring rapid, error-free releases.",
    ],
  },
  {
    company: "Pratap Technocrat Pvt Ltd",
    role: "Network Support Engineer",
    // TODO: the resume does not list a location for Pratap Technocrat. Add it here if you want it shown.
    location: null,
    period: "June 2018 – May 2019",
    points: [
      "Set up customized internet solutions for both residential and commercial clients, ensuring high-speed and reliable network connectivity tailored to specific requirements.",
      "Offered end-to-end technical support, efficiently diagnosing and resolving connectivity issues, network outages, and performance slowdowns to minimize disruptions.",
      "Addressed network inefficiencies by optimizing configurations and implementing upgrades to meet changing customer demands and maintain peak performance.",
    ],
  },
];

// Grouped from "Core Skills" plus the tools named in your experience and projects.
// icon names: cloud, pipeline, container, monitor, git (see components/Skills.jsx)
export const skills = [
  {
    category: "Cloud",
    icon: "cloud",
    items: ["Azure Cloud Computing", "Azure Virtual Machines (VMs)", "Azure CLI", "Azure Key Vault"],
  },
  {
    category: "CI/CD & DevOps",
    icon: "pipeline",
    items: ["Azure DevOps", "Azure Pipelines", "Azure Repos", "GitHub Actions", "CI/CD Pipelines"],
  },
  {
    category: "Infrastructure as Code & Containers",
    icon: "container",
    items: ["Terraform", "Docker", "Kubernetes"],
  },
  {
    category: "Monitoring & Observability",
    icon: "monitor",
    items: ["Prometheus", "Grafana"],
  },
  {
    category: "Version Control",
    icon: "git",
    items: ["Git", "GitHub"],
  },
];

export const projects = [
  {
    title: "Terraform Module Library",
    description:
      "Developed reusable Terraform modules for Azure resources to enable scalable infrastructure deployment.",
    tech: ["Terraform", "Azure"],
    github: null, // TODO: add the GitHub repo URL
    live: null,
  },
  {
    title: "Dockerized Microservices Platform",
    description:
      "Built and containerized microservices using Docker and deployed them on Kubernetes with CI/CD integration.",
    tech: ["Docker", "Kubernetes", "CI/CD"],
    github: null, // TODO: add the GitHub repo URL
    live: null,
  },
  {
    title: "CI/CD Pipeline Automation",
    description:
      "Designed multi-stage pipelines using Azure DevOps and GitHub Actions for automated testing and deployment.",
    tech: ["Azure DevOps", "GitHub Actions"],
    github: null, // TODO: add the GitHub repo URL
    live: null,
  },
  {
    title: "Monitoring System",
    description:
      "Implemented Prometheus and Grafana dashboards with alerting for infrastructure and application metrics.",
    tech: ["Prometheus", "Grafana"],
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
    issuer: "Oracle",
    url: null, // TODO: add your own Oracle badge link
  },
  {
    name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    url: null, // TODO: add your own Microsoft Learn credential link
  },
];
