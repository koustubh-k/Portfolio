# portfolio-content.md
# Single source of truth for all portfolio content.

# 1. HERO / IDENTITY
name: "Koustubh Kulkarni"
title: "Software Engineer"
tagline: "I engineer reliable, scalable systems - from backend APIs to applied AI and ML."
location: "Bangalore, India"
availability: "Open to Opportunities"
profile_photo: "/assets/profile.jpeg"

# 2. ABOUT / BIO
bio: |
  Computer Science undergraduate at KLE Technological University (CGPA 8.7/10),
  graduating 2026. I've interned at NVIDIA and KPMG, building everything from
  virtual camera systems and HDR pipelines to Agentic AI systems and LLM-powered
  products. I thrive at the intersection of backend engineering and applied AI -
  designing systems that are fast, reliable, and actually useful.

  Outside work: ACM ICPC Regionalist, CodeChef 3-star, and a competitive problem
  solver with 500+ DSA problems solved. I care about clean architecture, clear
  thinking, and shipping things that matter.

interests:
  - Applied AI & LLMs
  - Backend Systems
  - Distributed Architectures
  - Computer Vision

# 3. EXPERIENCE
experience:
  - company: "KPMG"
    role: "Digital Lighthouse Intern"
    location: "Bangalore, India"
    duration: "Jan 2026 - Present"
    logo: ""
    highlights:
      - "Engineered Agentic AI systems using LangChain & RAG integrated with Snowflake for enterprise data retrieval."
      - "Built a modular LLM Presentation Generator with LangGraph and pptxGenJs - workflow-orchestrated, cost-optimized inference."
      - "Trained in enterprise-scale Java, Spring Boot, and cloud-native application design."

  - company: "NVIDIA"
    role: "Project Intern"
    location: "Hubli / Remote"
    duration: "Aug 2024 - Jun 2025"
    logo: ""
    highlights:
      - "Built virtual camera systems using VirtIO for real-time streaming between Linux and Android VMs, reducing streaming latency by 30% via optimized QEMU and FFmpeg pipelines."
      - "Developed an HDR reconstruction pipeline using a dual-branch U-Net for multi-exposure image fusion, trained on 60K+ SDR and IR images."

# 4. PROJECTS
projects:
  - name: "CreekPay"
    tagline: "Blockchain BNPL Platform"
    description: |
      AI-powered P2P Buy Now Pay Later system with AI-driven e-KYC, ML-based
      credit scoring, and real-time credit evaluation. Won 2nd place at Hack Karnataka
      among 100+ teams.
    stack: ["FastAPI", "PostgreSQL", "OCR", "Machine Learning", "Blockchain"]
    role: "Led AI/ML development and backend architecture in a 3-member team."
    github: "https://github.com/koustubhkulkarni/creekpay"
    live: ""
    badge: "Hack Karnataka 2nd Place"
    year: "2025"

  - name: "FinMitraAI"
    tagline: "AI Financial Advisor"
    description: |
      LLM-powered financial advisor delivering personalised investment insights
      with 85% accuracy. Processes 1,000+ financial data points in real-time via
      market analytics pipelines.
    stack: ["Python", "FastAPI", "LangChain", "Groq APIs"]
    role: "Full-stack solo build - LLM integration, backend, and pipeline design."
    github: "https://github.com/koustubhkulkarni/finmitraai"
    live: ""
    badge: ""
    year: "2025"

  - name: "Synk-App"
    tagline: "Real-Time Chat Application"
    description: |
      Secure WebSocket-based messaging platform with JWT authentication,
      persistent MongoDB storage, concurrent session handling, and scalable
      backend event management.
    stack: ["Node.js", "Socket.IO", "MongoDB", "JWT"]
    role: "Solo build - architecture, backend, and auth system."
    github: "https://github.com/koustubhkulkarni/synk-app"
    live: ""
    badge: ""
    year: "2025"

# 5. GITHUB PROJECTS SYNC
# mode:
# - pinned_only: display only pinned repos from your GitHub profile
# - pinned_plus_manual: pinned repos + names listed in manual_repo_names
# - manual_only: show only repos listed in manual_repo_names
github_projects:
  mode: "pinned_only"
  manual_repo_names: []
  exclude_repo_names: []
  max_items: 6

# 6. SKILLS
skills:
  - category: "Languages"
    items: ["Python", "C/C++", "Java", "JavaScript", "TypeScript", "SQL"]

  - category: "Frameworks & APIs"
    items: ["FastAPI", "Spring Boot", "Node.js", "Express", "React", "Next.js", "REST APIs", "Docker", "MCP"]

  - category: "AI & Data"
    items: ["PyTorch", "OpenCV", "LangChain", "LangGraph", "RAG", "Vector DBs", "PostgreSQL", "MongoDB", "Snowflake", "Machine Learning"]

# 7. EDUCATION
education:
  - institution: "KLE Technological University"
    degree: "B.E. Computer Science"
    score: "CGPA: 8.7 / 10"
    duration: "2022 - 2026"
    logo: ""

certifications: []

# 8. ACHIEVEMENTS
achievements:
  - "ACM ICPC Regionalist (2025)"
  - "CodeChef 3-star - 400+ DSA problems solved"
  - "Hack Karnataka - 2nd Place among 100+ teams"
  - "WiDS Datathon - Top 100 Global"

# 9. CONTACT & SOCIAL
email: "kulkarni.k2004@gmail.com"
phone: "+91-8660708395"
website: "https://koustubh.dev"
linkedin: "https://www.linkedin.com/in/koustubh-kulkarni-35625a1aa/"
github: "https://github.com/koustubh-k"
twitter: ""
show_contact_form: true

# 10. RESUME
resume_file: "/assets/Koustubh_Kulkarni_Resume.pdf"
show_resume_button: true

# 11. UI COPY (all user-facing text)
ui:
  nav_links:
    - label: "About"
      href: "#about"
    - label: "Experience"
      href: "#experience"
    - label: "Projects"
      href: "#projects"
    - label: "Skills"
      href: "#skills"
    - label: "Contact"
      href: "#contact"

  section_titles:
    about: "About"
    experience: "Experience"
    projects: "Projects"
    skills: "Skills"
    education: "Education"
    achievements: "Achievements"
    contact: "Contact"

  labels:
    resume_button: "Resume"
    view_projects_button: "View Projects"
    download_resume_button: "Download Resume"
    featured_projects_label: "Featured Builds"
    github_button: "GitHub"
    github_repositories_label: "GitHub Repositories"
    role_prefix: "Role"
    no_repo_description: "No description added for this repository yet."
    repository_button: "Repository"
    live_button: "Live"
    certifications_label: "Certifications"
    send_message_button: "Send Message"
    sending_message_button: "Sending..."
    terminal_title: "Terminal"
    terminal_command: "$ npm run build-the-future"
    terminal_description: "Building reliable software from backend APIs to applied AI systems."
    footer_edit_note: "Edit portfolio-content.md to update anything here."
    footer_built_by_prefix: "Built by"
    name_label: "Name"
    email_label: "Email"
    message_label: "Message"
    pinned_repo_token_hint: "Pinned repositories could not be loaded. Add GITHUB_TOKEN to enable reliable pinned repo sync."
    contact_submit_success: "Message sent successfully. Thanks for reaching out."
    contact_submit_error: "Something went wrong. Please try again."
    contact_required_fields_error: "Name, email, and message are required."
    contact_invalid_email_error: "Please provide a valid email address."
    contact_service_unavailable_error: "Email service is not configured yet. Set RESEND_API_KEY to enable contact notifications."
    contact_invalid_payload_error: "Invalid request payload."
    contact_email_send_error: "Unable to send email right now. Please try again."

# 12. DESIGN TOKENS
theme:
  accent_primary: "#7F5AF0"
  accent_secondary: "#2CB67D"
  accent_glow: "#7F5AF0"
  bg_base: "#0F0E17"
  bg_surface: "#1A1A2E"
  bg_surface_2: "#16213E"
  text_primary: "#FFFFFE"
  text_secondary: "#A7A9BE"
  font_heading: "'Space Grotesk', sans-serif"
  font_body: "'Inter', sans-serif"
  font_mono: "'Fira Code', monospace"
  border_radius: "12px"
  animation_speed: "medium"
