import { databaseConnection } from "./database.js"
import { start } from "./server.js";
import express from 'express';
const app = express();

const init = async()=>{
    databaseConnection();
    // return await start(app);
    start(app);
}


init();
// const userChannel = await init();

// export{userChannel};