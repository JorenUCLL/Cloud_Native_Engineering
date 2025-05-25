import { Request, Response, NextFunction } from 'express';
import redisService from '../service/redisService';

export function cacheMiddleware(ttlSeconds: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const key = req.originalUrl;
        try {
            const cached = await redisService.get(key);
            if (cached) {
                res.setHeader('X-Cache', 'HIT');
                return res.json(JSON.parse(cached));
            }
            // Intercept response to cache it
            const originalJson = res.json.bind(res);
            res.json = (body: any) => {
                redisService.set(key, JSON.stringify(body), ttlSeconds);
                return originalJson(body);
            };
            next();
        } catch (error) {
            next();
        }
    };
}