import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const domainCases = [
  {
    title: "Visual Studio – AST Tree & Call Graph",
    businessCase:
      "Enable code navigation, refactoring, and IntelliSense through static analysis.",
    dsAlgo: "Abstract Syntax Tree (tree) and call graph (graph) construction.",
    codeSnippet: `const callGraph = {};
ast.functions.forEach(fn => {
  callGraph[fn.name] = fn.calls;
});`,
    image: "/VSCodeImg.png",
    efficiency: "AST parse: O(N); graph edges: O(F+C).",
    buildingStory:
      "Leveraged compiler techniques to power developer productivity features.",
    connection:
      "Code structures enable smart IDE experiences and maintainability.",
    inference:
      "Static code models are essential for modern development tooling.",
  },
  {
    title: "GitHub – Commit DAG & Merge Base",
    businessCase:
      "Support branching, merging, and history traversal in distributed version control.",
    dsAlgo: "Commit DAG; lowest common ancestor via BFS for merge base.",
    codeSnippet: `function findMergeBase(a, b) {
  const visited = new Set();
  const queue = [a, b];
  while (queue.length) {
    const c = queue.shift();
    if (visited.has(c)) return c;
    visited.add(c);
    queue.push(...c.parents);
  }
}`,
    image: "/GitHub.png",
    efficiency: "LCA find: O(N) traversal; Space: O(N).",
    buildingStory:
      "Implemented DAG-based commit graph underpinning Git’s collaboration model.",
    connection: "Version history DAG supports branching and merging at scale.",
    inference:
      "Graph-based versioning is foundational to modern software collaboration.",
  },
  {
    title: "Exchange Server – Message Queues",
    businessCase:
      "Ensure ordered, reliable mail delivery and back-pressure control in the transport pipeline.",
    dsAlgo:
      "FIFO queue with retry scheduling; O(1) enqueue/dequeue operations.",
    codeSnippet: `const queue = [];
function processQueue() {
  while (queue.length) {
    const msg = queue.shift();
    if (deliver(msg)) continue;
    scheduleRetry(msg);
    queue.push(msg);
  }
}`,
    image: "/MessageQueue.png",
    efficiency: "Enqueue/dequeue: O(1); retry adds constant overhead.",
    buildingStory:
      "Built resilient pipelines using queues to decouple transport components.",
    connection:
      "Message queues enable scalable, fault-tolerant architectures across distributed services.",
    inference:
      "Simple queues form the backbone of reliable enterprise messaging.",
  },
  {
    title: "System Center – Dependency DAG + Topological Sort",
    businessCase:
      "Model service dependencies to orchestrate alerts and remediation in correct order.",
    dsAlgo:
      "Directed acyclic graph for dependencies; topological sort for sequencing.",
    codeSnippet: `function topoSort(graph) {
      const inDegree = {};
  Object.keys(graph).forEach(node => (inDegree[node] = 0));
  Object.values(graph).forEach(neighbors => neighbors.forEach(n => inDegree[n]++));
  const queue = Object.keys(inDegree).filter(n => inDegree[n] === 0);
  const order = [];
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    graph[u].forEach(v => {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
      });
      }
      return order;
      }`,
    image: "/TopologicalSort.png",
    efficiency: "Topological sort: O(N+E); Space: O(N+E).",
    buildingStory:
      "Encoded complex service topologies to drive automated monitoring workflows.",
    connection:
      "DAGs capture dependencies critical for root-cause analysis in large systems.",
    inference:
      "Graph algorithms underpin effective service orchestration and alerting.",
  },
  {
    title: "Dynamics 365 – Logistics Assignment & Capacity",
    businessCase:
      "Optimize product-to-warehouse assignments minimizing cost under capacity constraints.",
    dsAlgo:
      "Hungarian algorithm (O(n^3)) for assignment; Knapsack DP for capacity.",
    codeSnippet: `// Pseudocode outline
const assignment = hungarian(costMatrix);
const capacityOk = knapsackDP(items, capacity);`,
    image: "/Knapsack.png",
    efficiency: "Hungarian: O(n^3); Knapsack: O(nW).",
    buildingStory:
      "Integrated classical operations-research methods into ERP workflows.",
    connection:
      "Combines assignment and knapsack to solve real-world supply-chain problems.",
    inference:
      "Algorithmic planning drives measurable cost savings in logistics.",
  },
  {
    title: "SQL Server – B+Tree Indexes",
    businessCase:
      "Accelerate data retrieval and range queries on large tables by maintaining balanced on-disk indexes.",
    dsAlgo: "B+Tree data structure; search, insert, delete in O(log n) time.",
    codeSnippet: `function searchBTree(node, key) {
  let i = 0;
  while (i < node.keys.length && key > node.keys[i]) i++;
  if (node.isLeaf) return node.pointers[i];
  return searchBTree(node.children[i], key);
  }`,
    image: "/B+Tree.png",
    efficiency:
      "Search/insert/delete: O(log n) I/O operations; Space: O(n) pages.",
    buildingStory:
      "Adopted from classic database theory to ensure predictable query performance.",
    connection:
      "Indexes underlie SQL performance, directly impacting every data-driven application.",
    inference:
      "B+Trees remain the industry standard for scalable database indexing.",
  },

  {
    title: "Copilot for Excel – Smart Data Analysis",
    businessCase:
      "Enable non-technical business users to analyze and visualize data without writing formulas or code, reducing errors and accelerating insights. Users can generate complex formulas, pivot tables, and charts with simple natural language prompts.",
    dsAlgo:
      "Tabular dataset (2D arrays), SQL-like query parsing for natural language to structured queries, Prompt-to-code generation using LLMs, AST parsing for formula/program validation.",
    codeSnippet: `def handle_prompt(prompt, sheet_data):
    # LLM translates prompt → operation spec
    spec = llm_call(prompt, context=sheet_data.columns)
    
    if spec.type == "formula":
        sheet.update(spec.cell, spec.formula)
    elif spec.type == "pivot":
        pivot = build_pivot(sheet_data, spec.rows, 
                          spec.cols, spec.values)
        sheet.insert(pivot)
    elif spec.type == "python":
        result = exec_python(spec.code, sheet_data)
        sheet.insert(result)`,
    image: "/Copilaot1.png",
    efficiency:
      "Time: O(1) LLM call + O(n·m) for table operations. Space: Same as workbook size. Human time saved—minutes to seconds.",
    buildingStory:
      "Copilot enhances Excel into an interactive analytics tool, bridging the gap between human intent and technical execution, enabling democratization of data insights without deep technical knowledge.",
    connection:
      "Part of Microsoft 365 Copilot suite spanning Outlook, Word, PowerPoint, Teams. Embeds AI directly into everyday workflows, keeping humans in the loop.",
    inference:
      "LLM-driven interface redefines user interaction with spreadsheets—faster, more accurate, accessible. Algorithmic backbone ensures reliable performance; LLM enables natural creativity.",
  },
  {
    title: "Copilot in Teams – Meeting Intelligence",
    businessCase:
      "Address information overload in meetings by handling complex data across chat, audio, and shared files. Provides real-time transcription, highlights, action items, and business intelligence.",
    dsAlgo:
      "Time-indexed transcript sequences, extracted event/action lists, speaker diarization clustering, and transformer-based speech-to-text and summarization models.",
    codeSnippet: `def process_meeting(audio_stream):
    transcript = asr(audio_stream)  # (t, speaker, text)
    segments = speaker_diarize(transcript)
    tasks = []
    for seg in segments:
        for sentence in seg.text.split('.'):
            if is_action_item(sentence):
                tasks.append((seg.speaker, sentence))
    summary = llm_summarize(transcript.text)
    return Transcript(text=transcript.text), 
           Summary(summary), Tasks(tasks)`,
    image: "/Copilot2.png",
    efficiency:
      "ASR + diarization: real-time, summarization <2s per 30min call. Saves ~26 minutes daily per user.",
    buildingStory:
      "Built an audio pipeline converting spoken dialogue to structured info. Semantic models identify key decisions and tasks, making Copilot an effective meeting assistant.",
    connection:
      "Complements Excel/Outlook Copilot—integrated across workflows. Fuses ASR, NLU, and transformer summarization in Microsoft 365 ecosystem.",
    inference:
      "Multi-model pipeline converts raw voice data to actionable insights. Data structures like ordered transcripts plus algorithmic summarization enhance productivity dramatically.",
  },
];

const DomainInterest = () => {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const companyOverview = `Microsoft, founded in 1975, is a global leader in software, cloud, gaming, and developer tools. With products like Windows, Azure, Microsoft 365, GitHub, and Xbox, it empowers billions of users worldwide.`;
  const whyWorkHere = `Starting your career at Microsoft offers mentorship, cutting-edge technologies, and global impact opportunities. The structured programs foster innovation and professional growth.`;

  return (
    <section id="domain-interest" className="py-20">
      <div className="mb-12">
        <h2 className="heading text-2xl font-bold">
          DOMAIN: <span className="text-purple">MICROSOFT</span>
        </h2>
        <p className="mt-4 text-base text-gray-200">{companyOverview}</p>
      </div>

      <div className="space-y-8">
        {domainCases.map((cs, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedCase(expandedCase === idx ? null : idx)}
            >
              <h3 className="text-xl font-semibold text-white">{cs.title}</h3>
              <span className="text-2xl text-white">
                {expandedCase === idx ? "−" : "+"}
              </span>
            </div>
            {expandedCase === idx && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-gray-300 space-y-4"
              >
                <p>
                  <strong>
                    1. Business Case:
                    <br />
                  </strong>{" "}
                  {cs.businessCase}
                </p>
                <p>
                  <strong>
                    2. DS/Algo: <br />
                  </strong>{" "}
                  {cs.dsAlgo}
                </p>
                <div>
                  <strong>
                    3. Implementation (Code Snippet): <br />
                  </strong>
                  <pre className="bg-gray-900 p-4 rounded mt-2 overflow-x-auto text-sm text-green-300">
                    {cs.codeSnippet}
                  </pre>
                </div>
                {cs.image && (
                  <div>
                    <strong>
                      4. Model/Diagram: <br />
                    </strong>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* Replace <img> with Next.js <Image /> for optimization */}
                    <Image
                      src={cs.image}
                      alt={`${cs.title} diagram`}
                      width={600}
                      height={400}
                      className="mt-2 rounded"
                    />
                  </div>
                )}
                <p>
                  <strong>
                    5. Efficiency Analysis: <br />
                  </strong>{" "}
                  {cs.efficiency}
                </p>
                <p>
                  <strong>
                    6. Building Story:
                    <br />
                  </strong>{" "}
                  {cs.buildingStory}
                </p>
                <p>
                  <strong>
                    7. Connection & Overall Picture:
                    <br />
                  </strong>{" "}
                  {cs.connection}
                </p>
                <p>
                  <strong>
                    8. Inference:
                    <br />
                  </strong>{" "}
                  {cs.inference}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="heading text-2xl font-bold">
          Why <span className="text-purple">I Wish to Work</span> Here
        </h2>
        <p className="mt-4 text-base text-gray-200">{whyWorkHere}</p>
      </div>
    </section>
  );
};

export default DomainInterest;
