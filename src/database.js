
import mongoose from 'mongoose'
import{winstonLogger} from '../../9-jobber-shared/src/logger.js';
import config from './config.js';

const log = winstonLogger('Gig Database Server','debug');

const databaseConnection = async ()=>{
    try {
        await mongoose.connect(`${config.DATABASE_URL}`);
        log.info('gig-service is successfully connected to database');
    } catch (error) {
        log.log('error','GigService databaseConnection() error',error);
    }
}

export {databaseConnection};