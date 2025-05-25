import redis from "../exports/redis.js";

export async function setSubmissionForUser(submissionId, submissionData) {
    const key = `J0_TOKENS:${submissionId}`;
    await redis.hset(key, submissionData);
    await redis.expire(key, 60); // expire in 40 seconds
    return;
}

export async function getSubmissionForUser(submissionId) {
    const key = `J0_TOKENS:${submissionId}`;
    const submissionData = await redis.hgetall(key);
    if (Object.keys(submissionData).length === 0) {
        return null; // No submission found
    }
    return submissionData;
}