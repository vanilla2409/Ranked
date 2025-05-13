
import React, { useState } from 'react';
import QuestionSection from '../components/QuestionSection';
import LanguageTabs from '../components/LanguageTabs';
import CodeEditor from '../components/CodeEditor';
import TestCaseViewer from '../components/TestCaseVeiwer';
import ResignModal from '../components/ResignModal';

export default function BattlePage() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('// Write your solution here');
  const [modalOpen, setModalOpen] = useState(false);
  const [output, setOutput] = useState('');  
  const testCases = [
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
  ];

  const handleSubmit = async () => {
    setOutput('Running...');
    try {
      const response = await fetch('/api/test-cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
          testCases,
        }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error running test cases:', error);
      setOutput('Error running test cases');
    }
  };

  const handleResign = () => {
    setModalOpen(true);
  };

  const confirmResign = () => {
    setModalOpen(false);
    setOutput('You resigned.');
  };

  return (
    <div className="flex gap-4 p-4">
      {/* LEFT COLUMN */}
      <div className="w-1/2 space-y-4">
        <QuestionSection />
        <TestCaseViewer cases={testCases} />
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-1/2 flex flex-col space-y-4">
        <LanguageTabs selected={language} onChange={setLanguage} />
        <CodeEditor
          language={language}
          value={code}
          onChange={setCode}
        />
        <div className="flex space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-amber-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            onClick={handleResign}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Resign
          </button>
        </div>
        <div className="bg-gray-800 text-white p-2 rounded h-24 overflow-auto">
          {output}
        </div>
      </div>

      <ResignModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmResign}
      />
    </div>
  );
}
