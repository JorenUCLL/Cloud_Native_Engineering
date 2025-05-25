import { Request, Response, NextFunction } from 'express';
import redisService from '../service/redisService';

export const cacheMiddleware = (ttl: number = 300) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const key = `cache:${req.originalUrl}`;
            const cachedData = await redisService.get(key);

            if (cachedData) {
                console.log('Cache hit for:', key);
                return res.json(JSON.parse(cachedData));
            }

            
            const originalJson = res.json;

            
            res.json = function(data: any) {
                redisService.set(key, JSON.stringify(data), ttl).catch(console.error);
                return originalJson.call(this, data);
            };

            next();
        } catch (error) {
            console.error('Cache middleware error:', error);
            next();
        }
    };
};