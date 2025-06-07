import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = {
  "Programming Languages": [
    "C/C++",
    "Python",
    "JavaScript",
    "TypeScript",
    "HTML+CSS"
  ],
  "Web Development Tools": [
    "VS Code",
    "Git",
    "GitHub",
    "Linux",
    "Postman",
    "Tailwind CSS"
  ],
  "Frameworks": [
    "Node.js",
    "React.js",
    "Express",
    "Next.js"
  ],
  "Cloud & Databases": [
    "MongoDB",
    "Firebase",
    "PostgreSQL",
    "ConvexDb"
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

const SkillCard = ({ category, skills }: { category: string; skills: string[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black-200 rounded-xl p-6 backdrop-blur-lg border border-black-300"
    >
      <h3 className="text-xl font-semibold mb-4 text-purple">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-black-300 text-white px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <h2 className="heading mb-12">
        Technical <span className="text-purple">Skills</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <SkillCard key={category} category={category} skills={skills} />
        ))}
      </div>
    </section>
  );
};

export default Skills; 