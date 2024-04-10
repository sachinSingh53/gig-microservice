import { databaseConnection } from "./database.js"
import { start } from "./server.js";
import express from 'express';
const app = express();

const init = async()=>{
    await databaseConnection();
    return await start(app);
    // start(app);
}



const gigChannel = await init();


export{gigChannel};