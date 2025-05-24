import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Tabs, TabList, Tab, TabPanel } from "../components/ui/tabs";
import { Tooltip } from "../components/ui/tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Dropdown } from "../components/ui/dropdown";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";

const mockProblem = {
  title: "Find Words Containing Character",
  difficulty: "Easy",
  tags: ["Array", "String"],
  description: `You are given a 0-indexed array of strings \`words\` and a character \`x\`.

Return an array of indices representing the words that contain the character \`x\`.

Note that the returned array may be in any order.

**Example 1:**

Input: words = ["leet","code"], x = "e"
Output: [0,1]
Explanation: "e" occurs in both words: "leet", and "code". Hence, we return indices 0 and 1.

**Example 2:**

Input: words = ["abc","bcd","aaaa","cbc"], x = "a"
Output: [0,2]
Explanation: "a" occurs in "abc", and "aaaa". Hence, we return indices 0 and 2.

**Example 3:**

Input: words = ["abc","bcd","aaaa","cbc"], x = "z"
Output: []
Explanation: "z" does not occur in any of the words. Hence, we return an empty array.`,
  examples: [
    { input: 'words = ["leet","code"], x = "e"', output: "[0,1]" },
    { input: 'words = ["abc","bcd","aaaa","cbc"], x = "a"', output: "[0,2]" },
    { input: 'words = ["abc","bcd","aaaa","cbc"], x = "z"', output: "[]" },
  ],
  constraints: [
    "1 <= words.length <= 50",
    "1 <= words[i].length <= 50",
    "x is a lowercase English letter.",
    "words[i] consists only of lowercase English letters."
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
  const [timer, setTimer] = useState(0); // Start from 0
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
    setTimerActive(false); // Stop timer on submit
  };
  const handleResign = () => {
    setOutput("You resigned. Better luck next time!");
    setVerdict("Wrong Answer");
    setTimerActive(false); // Stop timer on resign
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
        <div className="flex items-center gap-8">
          {mockPlayers.map((p, i) => (
            <motion.div key={p.username} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
              <span className="font-bold text-base">{p.username}</span>
              <span className="text-xs text-purple-400">ELO: {p.elo}</span>
            </motion.div>
          ))}
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
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-[#A594F9]">2942.</span> {mockProblem.title}
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-[#A594F9]/20 text-[#A594F9]">{mockProblem.difficulty}</span>
                    {mockProblem.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">{tag}</span>
                    ))}
                  </div>
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 text-base leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc ml-5 text-sm" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      code: ({node, ...props}) => <code className="bg-neutral-800 px-1 rounded text-[#A594F9]" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                    }}
                  >
                    {mockProblem.description}
                  </ReactMarkdown>
                  <div className="mb-2 mt-4">
                    <div className="font-semibold mb-1 text-white">Examples:</div>
                    {mockProblem.examples.map((ex, i) => (
                      <div key={i} className="bg-neutral-800 rounded p-2 mb-1 text-xs">
                        <div><span className="text-[#A594F9]">Input:</span> {ex.input}</div>
                        <div><span className="text-green-300">Output:</span> {ex.output}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold mb-1 text-white">Constraints:</div>
                    <ul className="list-disc ml-5 text-xs">
                      {mockProblem.constraints.map((c, i) => (
                        <li key={i}><span className="bg-neutral-800 px-2 py-0.5 rounded text-[#A594F9]">{c}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Right: Editor & Output (vertical resizable) */}
        <ResizablePanel defaultSize={60} minSize={30} maxSize={80} className="md:w-1/2 w-full">
          <ResizablePanelGroup direction="vertical" className="h-full flex-1">
            {/* Code Editor */}
            <ResizablePanel defaultSize={60} minSize={20} maxSize={90} className="h-full">
              <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-col gap-2 h-full">
                <div className="flex items-center gap-2 mb-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Dropdown
                      value={lang}
                      onChange={setLang}
                      options={languages}
                      className="bg-[#18181b] border border-neutral-800 rounded px-4 py-2 text-base text-neutral-300 focus:outline-none min-w-[180px] shadow-md transition-colors duration-150 hover:border-[#A594F9] focus:border-[#A594F9]"
                    />
                    {verdict && (
                      <Tooltip content={verdict === "Accepted" ? "All test cases passed!" : "Try again or check your code."}>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${verdict === "Accepted" ? "bg-green-700 text-green-200" : "bg-red-700 text-red-200"}`}>
                          {verdict}
                        </span>
                      </Tooltip>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSubmit} className="bg-[#A594F9] text-white hover:bg-[#b3a0e6] px-6 py-2 text-base font-semibold rounded-md">Submit</Button>
                    <Dialog open={resignDialogOpen} onOpenChange={setResignDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#101010] text-white hover:bg-neutral-900 px-6 py-2 text-base font-semibold rounded-md">Resign</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure you want to resign?</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            onClick={handleResign}
                            className="bg-[#101010] text-white hover:bg-[#232323] border-none shadow-none"
                          >
                            Yes, Resign
                          </Button>
                          <DialogClose asChild>
                            <Button className="bg-[#A594F9] text-white hover:bg-[#b3a0e6] border-none shadow-none">Cancel</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="flex-1 min-h-[200px]">
                  <MonacoEditor
                    height="100%"
                    width="100%"
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
                <div className="flex gap-2 mt-2 justify-end">
                </div>
              </motion.div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/* Output/Console */}
            <ResizablePanel defaultSize={40} minSize={10} maxSize={80}>
              <Tabs value={tab} onChange={setTab} className="mt-2 h-full">
                <TabList>
                  <Tab value="testcases" selectedClassName="border-[#A594F9] text-[#A594F9] bg-neutral-900">Testcases</Tab>
                  <Tab value="output" selectedClassName="border-[#A594F9] text-[#A594F9] bg-neutral-900">Test Results</Tab>
                </TabList>
                <TabPanel value="testcases">
                  <Card className="bg-neutral-900/80 h-full">
                    <CardContent>
                      <div className="space-y-2">
                        {mockProblem.examples.map((ex, i) => (
                          <div key={i} className="bg-neutral-800 rounded p-2 text-xs">
                            <div><span className="text-purple-300">Input:</span> {ex.input}</div>
                            <div><span className="text-green-300">Expected Output:</span> {ex.output}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabPanel>
                <TabPanel value="output">
                  <Card className="bg-neutral-900/80 h-full">
                    <CardContent>
                      <pre className="text-xs text-green-300 whitespace-pre-wrap">{output || "Output will appear here after you submit."}</pre>
                    </CardContent>
                  </Card>
                </TabPanel>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
