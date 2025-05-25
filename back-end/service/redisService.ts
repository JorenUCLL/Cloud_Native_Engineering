import { createClient } from 'redis';

class RedisService {
    private client: any;

    constructor() {
        const redisHost = process.env.REDIS_HOST;
        const redisPassword = process.env.REDIS_PASSWORD;
        const redisPort = process.env.REDIS_PORT || '6380';
        const redisUseTLS = process.env.REDIS_USE_TLS === 'true';

        if (!redisHost || !redisPassword) {
            throw new Error('Redis configuration missing: REDIS_HOST and REDIS_PASSWORD are required');
        }

        this.client = createClient({
            password: redisPassword,
            socket: redisUseTLS ? {
                host: redisHost,
                port: parseInt(redisPort),
                tls: true,
                servername: redisHost
            } : {
                host: redisHost,
                port: parseInt(redisPort)
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
            await this.client.quit();
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

const redisService = new RedisService();

const get = async (key: string): Promise<string | null> => {
    try {
        return await redisService.get(key);
    } catch (error) {
        console.error(`Redis GET error for key ${key}:`, error);
        return null;
    }
};

const set = async (key: string, value: string, ttl?: number): Promise<void> => {
    try {
        if (ttl) {
            await redisService.set(key, value, ttl);
        } else {
            await redisService.set(key, value);
        }
    } catch (error) {
        console.error(`Redis SET error for key ${key}:`, error);
    }
};

const del = async (key: string): Promise<void> => {
    try {
        await redisService.del(key);
    } catch (error) {
        console.error(`Redis DEL error for key ${key}:`, error);
    }
};

const exists = async (key: string): Promise<boolean> => {
    try {
        const result = await redisService.exists(key);
        return result === 1;
    } catch (error) {
        console.error(`Redis EXISTS error for key ${key}:`, error);
        return false;
    }
};

const disconnect = async (): Promise<void> => {
    try {
        await redisService.disconnect();
        console.log('Redis disconnected');
    } catch (error) {
        console.error('Redis disconnect error:', error);
    }
};

export default {
    get,
    set,
    del,
    exists,
    disconnect
};