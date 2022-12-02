const { createClient:createRedisClient } = require("redis");

const {REDIS_URL} = require("../config");

const redisClient = createRedisClient({
    url:REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

module.exports = redisClient;