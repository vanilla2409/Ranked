import fs from 'fs'
import dotenv from 'dotenv';

dotenv.config();

export function loadTestCases(problemSlug) {
  const dir = `${process.env.PATH_TO_PROBLEMS}/${problemSlug}/testcases`;
  const inputs = fs.readdirSync(`${dir}/inputs`);

  return inputs.map((file) => {
    const testName = file.replace('.in', '');
    return {
      input: fs.readFileSync(`${dir}/inputs/${testName}.in`, 'utf8'),
      expected_output: fs.readFileSync(`${dir}/outputs/${testName}.out`, 'utf8'),
    };
  });
}

// const response = loadTestCases('sum-of-even');
// console.log(response);