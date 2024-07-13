const redis = require('redis');
const config = require('../config/redis');
const logger = require('../utils/logger');

class RedisService {
    constructor() {
        this.client = redis.createClient(config);
        this.client.on('error', (err) => logger.error('Redis Client Error', err));
        this.client.on('connect', () => logger.info('Redis Client Connected'));
    }

    async connect() {
        await this.client.connect();
    }

    async set(key, value, expiration = null) {
        if (expiration) {
            await this.client.setEx(key, expiration, value);
        } else {
            await this.client.set(key, value);
        }
    }

    async get(key) {
        return await this.client.get(key);
    }

    async hSet(key, field, value) {
        await this.client.hSet(key, field, value);
    }

    async hGetAll(key) {
        return await this.client.hGetAll(key);
    }

    async lPush(key, ...elements) {
        await this.client.lPush(key, elements);
    }

    async lRange(key, start, stop) {
        return await this.client.lRange(key, start, stop);
    }

    async sAdd(key, ...members) {
        await this.client.sAdd(key, members);
    }

    async sMembers(key) {
        return await this.client.sMembers(key);
    }

    async zAdd(key, score, member) {
        await this.client.zAdd(key, { score, value: member });
    }

    async zRange(key, min, max) {
        return await this.client.zRange(key, min, max);
    }

    async disconnect() {
        await this.client.quit();
    }

    async publish(channel, message) {
        await this.client.publish(channel, message);
    }

    async subscribe(channel, callback) {
        const subscriber = this.client.duplicate();
        await subscriber.connect();
        await subscriber.subscribe(channel, (message) => {
            callback(message);
        });
    }
}

module.exports = new RedisService();