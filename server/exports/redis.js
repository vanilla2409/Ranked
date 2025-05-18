import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = new Redis();

export default redisClient;

