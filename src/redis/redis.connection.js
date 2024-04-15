
import { winstonLogger } from '../../../9-jobber-shared/src/logger.js';
import { createClient } from 'redis';
import config from '../config.js';

const log = winstonLogger('redisConnection', 'debug');

const client = createClient({ url: `${config.REDIS_HOST}` });

const redisConnect = async () => {
    try {
        await client.connect();
        log.info(`gigServiceRedisConnection: ${await client.ping()}`);
        cacheError()
    } catch (error) {
        log.log('error', 'gigService redisConnect() method: ', error);
    }

}

const cacheError = () => {
    client.on('error', (error) => {
        console.log(error);
    })
};

export{
    redisConnect,
    client
}