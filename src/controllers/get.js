import {StatusCodes} from 'http-status-codes'
import { getGigById, getSellerGigs, getSellerInactiveGigs } from '../services/gig-service.js';
const getGig = async (req, res) => {
    const gig =  await getGigById(req.params.gigId);
    res.status(StatusCodes.OK).json({
        message:'get gig by id',
        gig
    })
}

const sellerGigs = async(req,res)=>{
    const gigs = await getSellerGigs(req.params.sellerId);
    res.status(StatusCodes.OK).json({
        message:'seller gigs',
        gigs
    })
}

const sellerInactiveGigs = async(req,res)=>{
    const gigs = getSellerInactiveGigs(req.params.sellerId);
    res.status(StatusCodes.OK).json({
        message:'seller gigs',
        gigs
    })
}



export{
    getGig,
    sellerGigs,
    sellerInactiveGigs
};