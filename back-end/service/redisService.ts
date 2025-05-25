import { createClient } from 'redis';

class RedisService {
    private client: any;

    constructor() {
        const redisUrl = process.env.REDIS_URL;
        const redisPassword = process.env.REDIS_PASSWORD;
        const redisPort = process.env.REDIS_PORT || '6380';

        if (!redisUrl || !redisPassword) {
            throw new Error('Redis configuration missing: REDIS_URL and REDIS_PASSWORD are required');
        }

        this.client = createClient({
            password: redisPassword,
            socket: {
                host: redisUrl,
                port: parseInt(redisPort),
                tls: true,
                servername: redisUrl
            }
        });

        this.client.on('error', (err: any) => {
            console.error('Redis Client Error:', err);
        });

        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });
    }

    async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    async disconnect() {
        if (this.client.isOpen) {
            await this.client.disconnect();
        }
    }

    async get(key: string) {
        await this.connect();
        return await this.client.get(key);
    }

    async set(key: string, value: string, ttl?: number) {
        await this.connect();
        if (ttl) {
            return await this.client.setEx(key, ttl, value);
        }
        return await this.client.set(key, value);
    }

    async del(key: string) {
        await this.connect();
        return await this.client.del(key);
    }

    async exists(key: string) {
        await this.connect();
        return await this.client.exists(key);
    }
}

export default new RedisService();