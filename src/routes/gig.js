import express from 'express';
import { gig as createGig } from '../controllers/create.js';
import { gigUpdate, gigUpdateActive } from '../controllers/update.js';
import { gigDelete } from '../controllers/delete.js';
import { getGig, sellerGigs, sellerInactiveGigs } from '../controllers/get.js';

const router = express.Router();

const gigRoutes = ()=>{
    router.get('/:gigId',getGig);
    router.get('/seller/:sellerId',sellerGigs);
    router.get('/seller/pause/:sellerId',sellerInactiveGigs);
    router.post('/create',createGig);
    router.put('/:gigId',gigUpdate);
    router.put('/active/:gigId',gigUpdateActive);
    router.delete('/:gigId/:sellerId',gigDelete);
    return router;
}

export{gigRoutes}