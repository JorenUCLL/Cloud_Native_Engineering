import { createClient } from 'redis';

const redisClient = createClient({
    socket: process.env.REDIS_USE_TLS === 'true' ? {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT || '6380'),
        tls: true
    } : {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT || '6380')
    },
    password: process.env.REDIS_PASSWORD
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Azure Redis Cache');
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
};

export default redisClient;