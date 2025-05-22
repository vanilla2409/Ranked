import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Tabs, TabList, Tab, TabPanel } from "../components/ui/tabs";
import { Tooltip } from "../components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const mockProblem = {
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ],
};

const mockPlayers = [
  { username: "Alice", elo: 1420 },
  { username: "Bob", elo: 1380 },
];

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
];

export default function BattlePage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(languages[0].value);
  const [tab, setTab] = useState("output");
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState(null); // null | 'Accepted' | 'Wrong Answer'
  const [timer, setTimer] = useState(900); // 15 min

  // Timer logic
  React.useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = () => {
    setOutput("Test cases passed!\nAll outputs correct.");
    setVerdict("Accepted");
  };
  const handleResign = () => {
    setOutput("You resigned. Better luck next time!");
    setVerdict("Wrong Answer");
  };

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#101010] text-white flex flex-col">
      {/* Top bar: Timer & Players */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800 bg-[#18181b]">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-4">
          <span className="text-lg font-mono bg-black/60 px-3 py-1 rounded">⏰ {formatTime(timer)}</span>
        </motion.div>
        <div className="flex items-center gap-8">
          {mockPlayers.map((p, i) => (
            <motion.div key={p.username} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
              <span className="font-bold text-base">{p.username}</span>
              <span className="text-xs text-purple-400">ELO: {p.elo}</span>
            </motion.div>
          ))}
        </div>
        <Button
          className="bg-black text-white hover:bg-neutral-900 border-none shadow-none px-6 py-2 text-base font-semibold rounded-md"
          onClick={() => navigate("/dashboard")}
        >
          Exit
        </Button>
      </div>
      {/* Split screen */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-auto">
        {/* Left: Problem Card */}
        <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="md:w-1/2 w-full">
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
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => <p className="text-sm mb-2" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc ml-5 text-xs" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                  code: ({node, ...props}) => <code className="bg-neutral-800 px-1 rounded text-purple-300" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                }}
              >
                {mockProblem.description}
              </ReactMarkdown>
              <div className="mb-2">
                <div className="font-semibold mb-1">Examples:</div>
                {mockProblem.examples.map((ex, i) => (
                  <div key={i} className="bg-neutral-800 rounded p-2 mb-1 text-xs">
                    <div><span className="text-purple-300">Input:</span> {ex.input}</div>
                    <div><span className="text-green-300">Output:</span> {ex.output}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="font-semibold mb-1">Constraints:</div>
                <ul className="list-disc ml-5 text-xs">
                  {mockProblem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Right: Editor & Output */}
        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="md:w-1/2 w-full flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <select
              className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-sm text-white focus:outline-none"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {languages.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
            {verdict && (
              <Tooltip content={verdict === "Accepted" ? "All test cases passed!" : "Try again or check your code."}>
                <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${verdict === "Accepted" ? "bg-green-700 text-green-200" : "bg-red-700 text-red-200"}`}>
                  {verdict}
                </span>
              </Tooltip>
            )}
          </div>
          <div className="flex-1 min-h-[200px] max-h-[350px]">
            <MonacoEditor
              height="100%"
              language={lang}
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
          <Tabs value={tab} onChange={setTab} className="mt-2">
            <TabList>
              <Tab value="output">Output</Tab>
              <Tab value="console">Console</Tab>
            </TabList>
            <TabPanel value="output">
              <Card className="bg-neutral-900/80">
                <CardContent>
                  <pre className="text-xs text-green-300 whitespace-pre-wrap">{output || "Output will appear here after you submit."}</pre>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value="console">
              <Card className="bg-neutral-900/80">
                <CardContent>
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap">Console output (mocked)</pre>
                </CardContent>
              </Card>
            </TabPanel>
          </Tabs>
          <div className="flex gap-2 mt-2 justify-end">
            <Button onClick={handleSubmit} className="bg-purple-700 hover:bg-purple-800">Submit</Button>
            <Button onClick={handleResign} className="bg-red-700 hover:bg-red-800">Resign</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
