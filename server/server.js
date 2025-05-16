import express from 'express'
import prisma from './exports/prisma.js'
import fs from 'fs'
import axios from 'axios'
import { loadTestCases } from './helpers/loadTestCases.js'
const app = express()
const port = 3000

app.use(express.json())

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' })
})

app.post('/submit', async (req, res) => {
  const {problemId , solutionCode} = req.body;

  if(!problemId || !solutionCode)
    return res.json({
      success: "false",
      message: "Problem ID and solution code are required"
    })

  const problem = await prisma.problem.findFirst({
    where:{
      id: problemId
    }
  })
  
  if(!problem)
    return res.json({
      success: "false",
      message: "Problem does not exists"
    })
  
  let fullCode = fs.readFileSync(`${process.env.PATH_TO_PROBLEMS}/${problem.slug}/boilerplateFullCode`, 'utf8').replace('##USER_CODE##', solutionCode);
  console.log('Full code:', fullCode);
  const testCases = loadTestCases(problem.slug);
  
  const submissions = testCases.map(tc => ({
    source_code: fullCode,
    language_id: 54, // C++
    stdin: tc.input,
    expected_output: tc.output,
    cpu_time_limit: 2,
    memory_limit: 128000,
    callback_url: process.env.CALLBACK_URL,
  }));
  
  let response = null;
  try {
    response = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      { submissions },
      {
        headers: {
          'X-Auth-Token': process.env.JUDGE0_API_KEY,
          'Content-Type': 'application/json'
        },
        params: {
          base64_encoded: false,
        }
      }
    );
    console.log('Judge0 response:', response.data);
    res.json({
      success: "true",
      message: "Code submitted successfully",
    })

  } catch (error) {
    console.error('Error submitting code:', error);
  }

  
})

app.put('/judge0/callback', async (req, res) => {
  try {
    const body = req.body;

    console.log('Judge0 callback received:', body);

    // Judge0 may use `token` instead of `submission_id`
    const submissionId = body.token || body.submission_id;
    const status = body.status;

    if (!submissionId || !status) {
      return res.status(400).json({ error: 'Missing token/submission_id or status' });
    }

    // You can now update the submission status in your DB
    // Example:
    // await prisma.submission.update({ where: { id: submissionId }, data: { status } });

    res.status(200).json({ message: 'Callback received successfully' });
  } catch (error) {
    console.error('Error handling Judge0 callback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
