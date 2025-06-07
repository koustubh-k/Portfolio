export const navItems = [
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Domain Interest", link: "#domain-interest" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "About Me",
    description: "Computer Science Engineering Student from KLE Technological University, passionate about full-stack development and AI technologies.",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh] justify-center",
    imgClassName: "w-full h-full",
    titleClassName: "justify-center",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Education",
    description: "B.E. in Computer Science and Engineering from KLE Technological University, Hubli",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Certifications",
    description: "Full-Stack Web Development (Udemy), Machine Learning Algorithms (Udemy), Javascript and Node.js (Scalar)",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },  
  
  
];

export const skillCategories = {
  "Languages": [
    "C/C++",
    "Python",
    "JavaScript",
    "HTML+CSS"
  ],
  "Web Development Tools": [
    "Node.js",
    "VS Code",
    "Git",
    "GitHub",
    "Linux",
    "Postman",
    "Convex",
    "Tailwind CSS"
  ],
  "Frameworks": [
    "React.js",
    "Express",
    "Next.js"
  ],
  "Cloud & Databases": [
    "MongoDB",
    "Firebase",
    "PostgreSQL"
  ],
  "Relevant Coursework": [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Object Oriented Programming",
    "Database Management System",
    "Software Engineering"
  ],
  "Areas of Interest": [
    "Web Design and Development",
    "Artificial Intelligence",
    "Cloud Computing"
  ],
  "Soft Skills": [
    "Problem Solving",
    "Self-learning",
    "Presentation",
    "Adaptability"
  ]
};

export const projects = [
  {
    id: 1,
    title: "StreamFlix",
    des: "Netflix-inspired streaming platform with authentication and personalized recommendations using TMDB API.",
    details: [
      "Designed a dynamic and responsive movie browsing experience using real-time movie data from the TMDB API.",
      "Implemented Firebase Authentication and Firestore database for user login and personalized content.",
      "Technology Used: React, Firebase Auth, Firestore, TMDB API."
    ],
    img: "/stream_flix.png",
    iconLists: ["/react.svg", "/firebase.svg", "/ts.svg", "/tmdb.svg"],
    link: "https://stream-flix-cyan.vercel.app/",
  },
  {
    id: 3,
    title: "Eraser - Collaborative Whiteboard",
    des: "A web-based collaborative whiteboard application for real-time sketching and note-taking.",
    details: [
      "Implemented a feature-rich online whiteboard with real-time collaboration.",
      "Technology Used: Next.js, Tailwind CSS, Convex, React, TypeScript."
    ],
    img: "/Eraser.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/convex.svg", "/react.svg"],
    link: "https://eraser-clone-eta.vercel.app/",
  },
  {
    id: 2,
    title: "Real-time Chat App",
    des: "Multi-room chat application with real-time messaging capabilities using Socket.io.",
    details: [
      "Built a real-time chat platform supporting multiple chat rooms with multiple users per room.",
      "Implemented live messaging using WebSocket communication powered by Socket.io.",
      "Technology Used: Node.js, Express.js, React, Socket.io."
    ],
    img: "/chatApp.jpg",
    iconLists: ["/node.svg", "/express.svg", "/react.svg", "/socket.svg"],
    link: "https://chat-app-basic-nine.vercel.app/",
  },
  {
    id: 4,
    title: "Facial Emotion Recognition",
    des: "Vision Transformer deep-learning model for facial emotion recognition and engagement analysis.",
    details: [
      "Implemented Vision Transformer (ViT) for facial emotion recognition using a Kaggle dataset.",
      "Utilized k-means clustering for unsupervised engagement level analysis.",
      "Developed using Python, PyTorch/TensorFlow for deep learning model training."
    ],
    img: "/FER.png",
    iconLists: ["/python.svg", "/pytorch.svg", "/opencv.svg", "/numpy.svg"],
    link: "https://github.com/yourusername/emotion-recognition",
  },
];

export const experience = [
  {
    id: 1,
    company: "Nvidia",
    title: "LDR to HDR Image Reconstruction(Nvidia Project Internship)",
    description: "Developed a deep learning system at Nvidia to convert LDR images to HDR. Trained neural networks to enhance image details and brightness, focusing on highlight recovery and visual quality improvement. Technologies: Python, PyTorch, OpenCV, NumPy.",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    company: "Nvidia",
    title: "Camera Virtualization for AAOS(Nvidia Project Internship)",
    description: "Implemented camera virtualization in Android Automotive OS at Nvidia using Linux and Android VMs. Developed virtual camera service and enabled efficient video transmission using V4L2, UDP streaming, and FFmpeg.",
    thumbnail: "/exp2.svg",
  }
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
