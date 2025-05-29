import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Tooltip } from "../components/ui/tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";
import ReactMarkdown from "react-markdown";
import mockData from "../../problems/mockData.json";


function parseExamplesAndConstraints(description) {
  
  const exampleRegex = /\*\*Input\*\*\s*```([\s\S]*?)```\s*\*\*Output\*\*\s*```([\s\S]*?)```/g;
  const examples = [];
  let match;
  while ((match = exampleRegex.exec(description))) {
    examples.push({
      input: match[1].trim(),
      output: match[2].trim(),
    });
  }
  // Extract constraints section
  const constraintsRegex = /#### Constraints([\s\S]*?)(?=####|$)/;
  const constraintsMatch = description.match(constraintsRegex);
  let constraints = [];
  if (constraintsMatch) {
    constraints = constraintsMatch[1]
      .split(/\n|\r/)
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(line => line.length > 0);
  }
  return { examples, constraints };
}

const desc = mockData.matchDetails.problem.description;
const { examples, constraints } = parseExamplesAndConstraints(desc);

const mockProblem = {
  title: mockData.matchDetails.problem.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
  difficulty: "Easy", // No difficulty in mockData, set default or parse if added
  tags: [], // No tags in mockData, set empty or parse if added
  description: desc,
  examples,
  constraints,
};

const mockPlayers = mockData.matchDetails.players.map(username => ({ username, elo: 1400 }));

const languages = [
  // { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" }
  // { label: "C++", value: "cpp" },
];

export default function BattlePage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(languages[0].value);
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState(null); 
  const [timer, setTimer] = useState(0); 
  const [timerActive, setTimerActive] = useState(true);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [resignDialogOpen, setResignDialogOpen] = useState(false);

  // Timer logic
  React.useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleSubmit = () => {
    setOutput("Test cases passed!\nAll outputs correct.");
    setVerdict("Accepted");
    setTimerActive(false); 
  };
  const handleResign = () => {
    setOutput("You resigned. Better luck next time!");
    setVerdict("Wrong Answer");
    setTimerActive(false); 
    setResignDialogOpen(false);
  };
  const handleExit = () => {
    setExitDialogOpen(false);
    navigate("/dashboard");
  };

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#101010] text-white flex flex-col">
      {/* Top bar: Timer & Players */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-[#18181b]">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-4">
          <span className="text-lg font-mono bg-black/60 px-3 py-1 rounded">⏰ {formatTime(timer)}</span>
        </motion.div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-8">
            {mockPlayers.map((p, i) => (
              <motion.div key={p.username} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
                <span className="font-bold text-base">{p.username}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Split screen */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-auto">
        {/* Left: Problem Card */}
        <ResizablePanel defaultSize={40} minSize={20} maxSize={70} className="md:w-1/2 w-full">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="h-full">
            <Card className="h-full bg-neutral-900/80">
              <CardHeader>
                <CardTitle>{mockProblem.title}</CardTitle>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-700/30 text-purple-300">{mockProblem.difficulty}</span>
                  {mockProblem.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">{tag}</span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none text-white">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-fuchsia-700">
                    Problem Statement
                  </h2>
                  {/* Only show the main description, not the markdown examples/constraints */}
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 text-base leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc ml-5 text-sm" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      code: ({node, ...props}) => <code className="bg-neutral-800 px-1 rounded text-[#A594F9]" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                    }}
                  >
                    {mockProblem.description.replace(/#### Input Format[\s\S]*$/m, '').trim()}
                  </ReactMarkdown>
                  {/* Input Format */}
                  {mockProblem.description.includes('#### Input Format') && (
                    <div className="mb-2 mt-4">
                      <div className="font-semibold mb-1 text-white">Input Format:</div>
                      <ReactMarkdown>{
                        (mockProblem.description.match(/#### Input Format([\s\S]*?)(?=####|$)/) || [])[1]?.trim() || ''
                      }</ReactMarkdown>
                    </div>
                  )}
                  {/* Output Format */}
                  {mockProblem.description.includes('#### Output Format') && (
                    <div className="mb-2 mt-4">
                      <div className="font-semibold mb-1 text-white">Output Format:</div>
                      <ReactMarkdown>{
                        (mockProblem.description.match(/#### Output Format([\s\S]*?)(?=####|$)/) || [])[1]?.trim() || ''
                      }</ReactMarkdown>
                    </div>
                  )}
                  {/* Constraints */}
                  {mockProblem.constraints.length > 0 && (
                    <div className="mb-2 mt-4">
                      <div className="font-semibold mb-1 text-white">Constraints:</div>
                      <ul className="list-disc ml-5 text-xs">
                        {mockProblem.constraints.map((c, i) => (
                          <li key={i}><span className="bg-neutral-800 px-2 py-0.5 rounded text-[#A594F9]">{c}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Examples */}
                  {mockProblem.examples.length > 0 && (
                    <div className="mb-2 mt-4">
                      <div className="font-semibold mb-1 text-white">Examples:</div>
                      {mockProblem.examples.map((ex, i) => (
                        <div key={i} className="bg-neutral-800 rounded p-2 mb-1 text-xs">
                          <div><span className="text-[#A594F9]">Input:</span> {ex.input}</div>
                          <div><span className="text-green-300">Output:</span> {ex.output}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Right: Editor only, full height */}
        <ResizablePanel defaultSize={60} minSize={20} maxSize={90} className="md:w-1/2 w-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2 justify-center w-full">
              <span className="bg-[#18181b] border border-neutral-800 rounded px-4 py-2 text-base text-neutral-300 min-w-[120px] font-mono text-center">Python</span>
              {verdict && (
                <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${verdict === "Accepted" ? "bg-green-700 text-green-200" : "bg-red-700 text-red-200"}`}>
                  {verdict === "Accepted" ? "Accepted" : "Rejected"}
                </span>
              )}
            </div>
            <div className="flex-1 min-h-[200px]">
              <MonacoEditor
                height="100%"
                width="100%"
                language="python"
                value={code}
                theme="vs-dark"
                options={{
                  fontSize: 16,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                }}
                onChange={setCode}
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
