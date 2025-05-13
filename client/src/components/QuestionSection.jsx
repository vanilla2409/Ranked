

import ReactMarkdown from 'react-markdown';

export default function QuestionSection({
  title = 'Problem Title',
  description = `
# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

**Example:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
\`\`\`
`
}) {
  return (
    <div className="bg-gray-800 p-4 rounded space-y-4 text-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
}
