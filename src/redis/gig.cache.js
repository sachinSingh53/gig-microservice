import { client } from './redis.connection.js';
import{winstonLogger} from '../../../9-jobber-shared/src/logger.js'

const log = winstonLogger('gigCache','debug');

const getUserSelectedGigCategory = async(key)=>{
    try {
        if(!client.isOpen){
            await client.connect();
        }

        const response = await client.GET(key);
        return response;

    } catch (error) {
        log.log('error','gigService gigCache getUserSelectedGigCategory() method error: ',error);
        return {};
    }
}

export{
    getUserSelectedGigCategory
}


