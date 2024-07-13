require('dotenv').config();

module.exports = {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    retryStrategy: (times) => Math.min(times * 50, 2000)
};