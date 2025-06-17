// import express from 'express';
// import achievementService from '../service/achievementService';

// const achievementRouter = express.Router();

// achievementRouter.get('/user/:email', async (req, res) => {
//     try {
//         const achievements = await achievementService.getAchievementsByUser(req.params.email);
//         res.json(achievements);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch achievements.' });
//     }
// });
// // test

// achievementRouter.get('/', async (req, res) => {
//     try {
//         const achievements = await achievementService.getAllAchievements();
//         res.json(achievements);
//     } catch (error) {
//         console.error('Error in GET /achievements:', error);
//         res.status(500).json({ error: 'Failed to fetch achievements.' });
//     }
// });

// export { achievementRouter };
