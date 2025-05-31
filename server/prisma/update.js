import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
    await prisma.problem.update({
        where: { slug: 'sum-of-even' },
        data: {
            description: `## Sum of Even Numbers

Given an array of integers, return the sum of all even numbers in the array.

### Input Format
- First line: \`N\` (number of elements)  
- Second line: \`N\` space-separated integers

### Output Format
- A single integer — the **sum of even numbers**

### Constraints
- \`1 ≤ N ≤ 10^5\`  
- \`-10^9 ≤ arr[i] ≤ 10^9\`
### Example

**Input**
\`\`\`
5
1 2 3 4 5
\`\`\`

**Output**
\`\`\`
6
\`\`\`
`,
codeSnippet: `int sumOfEven(arr):\n     ##Implementation goes here\n`
        }
    });
    console.log("Problem updated successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })