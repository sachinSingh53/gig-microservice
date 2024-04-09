// import{verifyGatewayRequest} from '../../9-jobber-shared/src/gateway-middleware.js'
// import { buyerRoutes } from './routes/buyer.js';
// import { healthRoutes } from './routes/health.js';
// import { sellerRoutes } from './routes/seller.js';

const BUYER_BASE_URL = '/api/v1/gig';




const appRoutes = (app)=>{
    // app.use('',healthRoutes());
    // app.use(BUYER_BASE_URL,verifyGatewayRequest,buyerRoutes());
    // app.use(SELLER_BASE_URL,verifyGatewayRequest,sellerRoutes());
}

export{appRoutes};