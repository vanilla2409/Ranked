import { updateLeaderboard, getLeaderboard, getUserRank, getUserRating } from "../helpers/leaderboard.js";
import redis from '../exports/redis.js';

async function testLeaderboard() {
    await redis.flushdb();
    const testUsers = Array.from({ length: 10 }, (_, i) => ({
        userId: `user${i + 1}`,
        rating: Math.floor(Math.random() * 3000), // Random rating between 0 and 2999
    }));

    // Update leaderboard with random users
    for (const { userId, rating } of testUsers) {
        await updateLeaderboard(userId, rating);
        console.log(`Updated ${userId} with rating ${rating}`);
    }

    // Get and display the top 5 users
    const topN = 5;
    const leaderboard = await getLeaderboard(topN);
    console.log(`\nTop ${topN} Leaderboard:`);

    for (let i = 0; i < leaderboard.length; i += 2) {
        console.log(`${i / 2 + 1}. ${leaderboard[i]} - ${leaderboard[i + 1]} rating`);
    }

    // Display each user's rank and rating
    console.log('\nUser Ranks and Ratings:');
    for (const { userId } of testUsers) {
        const rank = await getUserRank(userId);
        const rating = await getUserRating(userId);
        console.log(`${userId} - Rank: ${rank}, Rating: ${rating}`);
    }
}

testLeaderboard()
    .then(() => {
        console.log('\nLeaderboard test completed.');
        redis.quit();
    })
    .catch((err) => {
        console.error('Test failed:', err);
        redis.quit();
    });
