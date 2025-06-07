import React, { useState } from 'react';
import { motion } from 'framer-motion';

const domainCases = [
  {
    title: "Project Astra: Universal AI Assistant",
    summary: "A general-purpose AI assistant that goes beyond simple prompts—it sees, listens, remembers, and reacts in real time.",
    details: {
      "Business Case": "Integration of AI into daily workflows and life, enhancing productivity and accessibility.",
      "Implementation": "Uses Gemini 2.5 Pro model, integrated with vision and audio APIs, deployed on edge and cloud.",
      "Technologies": ["Graph-based knowledge representation", "Transformer-based LLMs", "Real-time processing", "Edge computing"],
      "Impact": "Sets new standards for human-AI interaction and assistance in both consumer and enterprise markets."
    }
  },
  {
    title: "AI Mode in Search",
    summary: "Transforming search into a conversational, task-oriented interface with structured, cited answers.",
    details: {
      "Business Case": "Enhanced search experience with conversational AI and task completion capabilities.",
      "Implementation": "Integrates Project Mariner for agentic capabilities and Gemini LLMs for answer generation.",
      "Technologies": ["Semantic search", "Query fan-out", "Agentic task completion", "Real-time data integration"],
      "Impact": "Redefines information retrieval making it more interactive and efficient."
    }
  },
  {
    title: "Digital Twin for Logistics",
    summary: "Real-time digital twin of distribution networks for package tracking and optimization.",
    details: {
      "Business Case": "Optimization of logistics operations through digital simulation and real-time tracking.",
      "Implementation": "Uses Google Cloud's AI and analytics tools with real-time sensor data integration.",
      "Technologies": ["Route optimization algorithms", "Simulation modeling", "Real-time analytics", "IoT integration"],
      "Impact": "Enhances supply chain efficiency and transparency."
    }
  }
];

const DomainCase = ({ caseData, isExpanded, onToggle }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black-200 rounded-xl p-6 backdrop-blur-lg border border-black-300"
    >
      <div 
        className="cursor-pointer flex justify-between items-center"
        onClick={onToggle}
      >
        <h3 className="text-xl font-semibold text-purple">{caseData.title}</h3>
        <span className="text-2xl">{isExpanded ? '−' : '+'}</span>
      </div>
      
      <p className="text-white-200 mt-2">{caseData.summary}</p>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {Object.entries(caseData.details).map(([key, value]: [string, any]) => (
            <div key={key} className="mb-4">
              <h4 className="text-white font-semibold mb-2">{key}</h4>
              {Array.isArray(value) ? (
                <ul className="list-disc list-inside space-y-1">
                  {value.map((item, idx) => (
                    <li key={idx} className="text-white-300">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-white-300">{value}</p>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const DomainInterest = () => {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  return (
    <section id="domain-interest" className="py-20">
      <h2 className="heading mb-12">
        Domain <span className="text-purple">Interest</span>
      </h2>
      <div className="space-y-6">
        {domainCases.map((caseData, index) => (
          <DomainCase
            key={index}
            caseData={caseData}
            isExpanded={expandedCase === index}
            onToggle={() => setExpandedCase(expandedCase === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default DomainInterest; 