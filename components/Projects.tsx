import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/data';


const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-black-200 rounded-xl overflow-hidden backdrop-blur-lg border border-black-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={project.img}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2 text-purple">{project.title}</h3>
        <p className="text-white-200 mb-4">{project.des}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.iconLists.map((icon: string, idx: number) => (
            <div
              key={idx}
              className="border border-white/[0.3] rounded-lg bg-[#1a1a1a] w-8 h-8 flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
            >
              <Image 
                src={icon} 
                alt={`tech-${idx}`} 
                width={20}
                height={20}
                className="w-5 h-5"
                style={{
                  filter: "brightness(0) invert(1)"
                }}
              />
            </div>
          ))}
        </div>
        <ul className="list-disc list-inside space-y-2 mb-4">
          {project.details.map((detail: string, idx: number) => (
            <li key={idx} className="text-sm text-white-300">{detail}</li>
          ))}
        </ul>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          View Project
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <h2 className="heading mb-12">
        <span className="text-purple">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects; 