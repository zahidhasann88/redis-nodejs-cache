const redisService = require('./services/redisService');
const logger = require('./utils/logger');

async function main() {
    try {
        await redisService.connect();

        // String operations
        await redisService.set('mykey', 'Hello from Redis');
        const value = await redisService.get('mykey');
        logger.info('String operation:', { key: 'mykey', value });

        // Hash operations
        await redisService.hSet('user:1', 'name', 'John Doe');
        await redisService.hSet('user:1', 'email', 'john@example.com');
        await redisService.hSet('user:1', 'age', '30');
        const user = await redisService.hGetAll('user:1');
        logger.info('Hash operation:', { key: 'user:1', value: user });

        // List operations
        await redisService.lPush('mylist', 'item1', 'item2', 'item3');
        const list = await redisService.lRange('mylist', 0, -1);
        logger.info('List operation:', { key: 'mylist', value: list });

        // Set operations
        await redisService.sAdd('myset', 'member1', 'member2', 'member3');
        const setMembers = await redisService.sMembers('myset');
        logger.info('Set operation:', { key: 'myset', value: setMembers });

        // Sorted Set operations
        await redisService.zAdd('leaderboard', 100, 'player1');
        await redisService.zAdd('leaderboard', 200, 'player2');
        await redisService.zAdd('leaderboard', 150, 'player3');
        const leaderboard = await redisService.zRange('leaderboard', 0, -1);
        logger.info('Sorted Set operation:', { key: 'leaderboard', value: leaderboard });

        // Expiration
        await redisService.set('session_key', 'session_data', 60);
        logger.info('Expiration set on session_key for 60 seconds');

        // Pub/Sub
        await redisService.subscribe('news-channel', (message) => {
            logger.info('Received message:', message);
        });

        await redisService.publish('news-channel', 'Hello, subscribers!');

    } catch (error) {
        logger.error('Error in main function:', error);
    } finally {
        await redisService.disconnect();
    }
}

main();