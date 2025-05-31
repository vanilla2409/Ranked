import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";
import ReactMarkdown from "react-markdown";
import axios from "../lib/axios";
import FindingMatchPage from "./FindingMatch";
import { LuSwords } from "react-icons/lu";



function BattlePage({ matchDetails }) {
  const navigate = useNavigate();
  const [code, setCode] = useState(matchDetails.problem.codeSnippet);
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("Accepted"); 
  const [timer, setTimer] = useState(0); 
  const [timerActive, setTimerActive] = useState(true);
  const [resignDialogOpen, setResignDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [resultDialogTitle, setResultDialogTitle] = useState("");
  const [resultDialogMessage, setResultDialogMessage] = useState("");
  const [resultDialogElo, setResultDialogElo] = useState(null);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  }


  // Timer logic
  React.useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleSubmit = () => {
    console.log(editorRef.current.getValue());
    setOutput("Test cases passed!\nAll outputs correct.");
    setVerdict("Accepted");
    setTimerActive(false); 

    // Simulate three cases:
    // 1. First to solve (win)
    // 2. Solved after opponent (lose)
    // 3. Wrong answer
    // For demo, randomize the case. Replace with real logic as needed.
    const random = Math.random();
    if (code.includes("correct_solution")) { // Simulate correct solution
      if (random < 0.5) { // First to solve
        setResultDialogTitle("Congratulations you won!");
        setResultDialogMessage("You were the first one to solve the problem statement.");
        setResultDialogElo(25); // random elo gained
      } else { // Solved after opponent
        setResultDialogTitle("You solved the problem, but lost");
        setResultDialogMessage("You solved the problem statement but unfortunately you lost as the opponent solved earlier than you.");
        setResultDialogElo(-18); // random elo deducted
      }
    } else { // Wrong answer
      setResultDialogTitle("Sorry, try again.");
      setResultDialogMessage("");
      setResultDialogElo(null);
    }
    setResultDialogOpen(true);
  };
  const handleResign = () => {
    setOutput("You resigned. Better luck next time!");
    setVerdict("Wrong Answer");
    setTimerActive(false); 
  };
  const handleExit = () => {
    navigate("/dashboard");
  };

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#101010] text-white flex flex-col">
      {/* Top bar: Timer & Players */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-fuchsia-700 bg-[#181022]">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-4">
          <span className="text-lg font-mono bg-black/60 px-3 py-1 rounded">⏰ {formatTime(timer)}</span>
        </motion.div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-8">
            <span className="font-bold text-2xl">{matchDetails.players[0]}</span>
            <LuSwords className="text-fuchsia-600 text-3xl mx-2" />
            <span className="font-bold text-2xl">{matchDetails.players[1]}</span>
          </div>
        </div>
      </div>
      {/* Split screen */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-auto">
        {/* Left: Problem Card */}
        <ResizablePanel defaultSize={40} minSize={20} maxSize={70} className="md:w-1/2 w-full">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="h-full">
            <Card className="h-full bg-[#181022] border-fuchsia-700">
              <CardHeader>
                <CardTitle>{matchDetails.problem.slug}</CardTitle>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-700/30 text-purple-300">{matchDetails.difficulty || 'Easy'}</span>
                  {matchDetails.tags?.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">{tag}</span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none text-white">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-fuchsia-700">
                    Problem Statement
                  </h2>
                  <div className="prose prose-invert mb-4">
                    <ReactMarkdown>
                    {matchDetails.problem.description}
                    </ReactMarkdown>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Right: Editor only, full height */}
        <ResizablePanel defaultSize={60} minSize={20} maxSize={90} className="md:w-1/2 w-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2 justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="bg-[#232136] border border-fuchsia-700 rounded px-4 py-2 text-base text-white min-w-[120px] font-mono text-center">Python</span>
                {/* Show verdict label only if code is correct */}
                {code.includes("correct_solution") && (
                  <span className="ml-2 px-2 py-1 rounded text-md font-semibold bg-green-700 text-green-200">
                    Accepted, all test cases passed
                  </span>
                )}
                {/* Show rejected label if code is not correct and output is set */}
                {!code.includes("correct_solution") && output && (
                  <span className="ml-2 px-2 py-1 rounded text-md font-semibold bg-red-700 text-red-200">
                    Rejected, try again
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSubmit} className="bg-fuchsia-600 text-white hover:bg-fuchsia-700 px-6 py-2 text-base font-semibold rounded-md">Submit</Button>
                <Dialog open={resignDialogOpen} onOpenChange={setResignDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-slate-900 border border-red-500 text-red-500 cursor-pointer hover:bg-neutral-900 px-6 py-2 text-base font-semibold rounded-md">Resign</Button>
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
                language="python"
                value={code}
                theme="vs-dark"
                onMount={handleEditorDidMount}
                options={{
                  fontSize: 16,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                }}
                onChange={setCode}
              />
            </div>
            <ResultDialog
              open={resultDialogOpen}
              onClose={() => setResultDialogOpen(false)}
              title={resultDialogTitle}
              message={resultDialogMessage}
              eloChange={resultDialogElo}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function ResultDialog({ open, onClose, title, message, eloChange }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#181022] border-fuchsia-700 text-white">
        <DialogHeader className="flex flex-col items-center justify-center text-center w-full">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="text-center my-4">
          <div className="text-lg mb-2">{message}</div>
          {eloChange !== null && (
            <div className={`text-lg font-semibold ${eloChange > 0 ? 'text-green-400' : 'text-red-400'}`}>{eloChange > 0 ? `+${eloChange} ELO` : `${eloChange} ELO`}</div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white w-full">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MainBattlePage() {
  const [matchDetails, setMatchDetails] = useState({
    "matchId": "52fa5208-c54c-4bfd-84f7-a476e1a6e489",
    "players": [
        "luffy",
        "roronoa"
    ],
    "createdAt": 1748628025957,
    "status": "pending",
    "problem": {
        "id": "ea148cb6-ed5e-4fa6-8873-02096a1cc8c5",
        "slug": "sum-of-even",
        "description": "## Sum of Even Numbers\n\nGiven an array of integers, return the sum of all even numbers in the array.\n\n### Input Format\n- First line: `N` (number of elements)  \n- Second line: `N` space-separated integers\n\n### Output Format\n- A single integer — the **sum of even numbers**\n\n### Constraints\n- `1 ≤ N ≤ 10^5`  \n- `-10^9 ≤ arr[i] ≤ 10^9`\n### Example\n\n**Input**\n```\n5\n1 2 3 4 5\n```\n\n**Output**\n```\n6\n```\n",
        "codeSnippet": "int sumOfEven(arr):\n     ##Implementation goes here\n"
    }
});
  const [isPolling, setIsPolling] = useState(false);
  const [pollingError, setPollingError] = useState(null);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const maxAttempts = 30; // Maximum number of polling attempts (e.g., 30 * 2s = 60s)
  const pollingInterval = 2000; // Poll every 2 seconds

  // useEffect(() => {
  //   const startMatchmaking = async () => {
  //     try {
  //       const res = await axios.get('/find-match');
  //       if (res.data.success) {
  //         console.log("Matchmaking started successfully");
  //         setIsPolling(true);
  //       } else {
  //         console.error("Failed to start matchmaking:", res.data);
  //         setPollingError("Failed to start matchmaking. Please try again.");
  //       }
  //     } catch (err) {
  //       console.error("Error in find-match:", err);
  //       setPollingError("Error starting matchmaking. Please try again.");
  //     }
  //   };
  //   startMatchmaking();
  // }, []);

  // useEffect(() => {
  //   if (!isPolling) return;

  //   let isCancelled = false;
  //   let attempts = pollingAttempts; 

  //   const pollStatus = async () => {
  //     while (!isCancelled && attempts < maxAttempts) {
  //       try {
  //         const res = await axios.get('/status-fm');
  //         console.log("Polling result:", res.data);

  //         if (res.data.success && res.data.matchDetails) {
  //           setMatchDetails(res.data.matchDetails);
  //           setIsPolling(false);
  //           return; // Exit polling on success
  //         } else {
  //           console.log("Match not found yet, continuing to poll...");
  //         }

  //         attempts += 1;
  //         setPollingAttempts(attempts); // Update state after increment
  //       } catch (err) {
  //         console.error("Polling error:", err);
  //         setPollingError("Error checking match status. Retrying...");
  //       }

  //       if (attempts >= maxAttempts) {
  //         setIsPolling(false);
  //         setPollingError("No match found after maximum attempts. Please try again.");
  //         return;
  //       }

  //       // Wait before the next poll
  //       await new Promise((resolve) => setTimeout(resolve, pollingInterval));
  //     }
  //   };

  //   pollStatus();

  //   return () => {
  //     isCancelled = true;
  //   };
  // }, [isPolling]); 

  if (pollingError) {
    return (
      <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">
        <div className="text-red-400">{pollingError}</div>
      </div>
    );
  }

  if (!matchDetails) {
    return <FindingMatchPage attempts={pollingAttempts} maxAttempts={maxAttempts} />;
  }

  return <BattlePage matchDetails={matchDetails} />;
}