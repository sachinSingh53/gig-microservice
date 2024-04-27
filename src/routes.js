import{verifyGatewayRequest} from '../../9-jobber-shared/src/gateway-middleware.js'
import { gigRoutes } from "./routes/gig.js";
const BASE_PATH = '/api/v1/gig';

const appRoutes = (app)=>{
    app.use(BASE_PATH,verifyGatewayRequest,gigRoutes());
    // app.use(BASE_PATH,gigRoutes());
}

export{appRoutes};