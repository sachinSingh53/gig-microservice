import { addDataToIndex, deleteIndexedData, getIndexedData, updateIndexedData } from "../elasticsearch.js"
import { gigsSearchBySellerId } from "./search-service.js";
import {GigModel} from '../models/gig.schema.js'
import{publishDirectMessage} from '../queues/gig-producer.js'
import {gigChannel} from '../app.js'

const getGigById = async(gigId)=>{
    const gig = getIndexedData('gigs',gigId);
    return gig;
}

const getSellerGigs = async(sellerId)=>{
    const gigs = await gigsSearchBySellerId(`${sellerId}`,true);
    let resultHits = [];

    for(let item of gigs.hits){
        resultHits.push(item._score);
    }
    return resultHits;
}
const getSellerInactiveGigs = async(sellerId)=>{
    const gigs = await gigsSearchBySellerId(`${sellerId}`,false);
    let resultHits = [];

    for(let item of gigs.hits){
        resultHits.push(item._score);
    }
    return resultHits;
}

const createGig = async(gigData)=>{
    const createdGig = await GigModel.create(gigData);
    // ?. is an optional chaining
    if(createdGig){
        //this will channge _id to id
        const data = createdGig.toJSON?.();
        message = {
            type: 'update-gig-count',
            gigSellerId: `${data.sellerId}`,
            count:1
        }
        await publishDirectMessage(
            gigChannel,
            'jobber-seller-updates',
            'user-seller',
            JSON.stringify(message),
            'details sent to userService'
        )
        await addDataToIndex('gigs',`${data.id}`,data);
    }

    return createdGig
}
const deleteGig = async(gigId, sellerId)=>{
    await GigModel.findByIdAndDelete(gigId);
    await deleteIndexedData('gigs',gigId);
    const message = {
        gigSellerId:sellerId,
        count:-1,
        type:'update-gig-count'
    }
    publishDirectMessage(
        gigChannel,
        'jobber-seller-updates',
        'user-seller',
        JSON.stringify(message),
        'details sent to userService'
    )


}

const updateGig = async(gigId,gigData)=>{
    const document = await GigModel.findOneAndUpdate(
        {_id:gigId},
        {
            $set:{
                title: gigData.title,
                description: gigData.description,
                categories: gigData.categories,
                subCategories: gigData.subCategories,
                tags: gigData.tags,
                price: gigData.price,
                coverImage: gigData.coverImage,
                expectedDelivery: gigData.expectedDelivery,
                basicTitle: gigData.basicTitle,
                basicDescription: gigData.basicDescription
            }
        },
        { new: true}
    )

    if(document){
        const data = document.toJSON?.();
        await updateIndexedData('gigs',`${data.id}`,data);
    }
}
const updateActiveGigProp = async(gigId,isActive)=>{
    const document = await GigModel.findOneAndUpdate(
        {_id:gigId},
        {
            $set:{
                active:isActive
            }
        },
        { new: true}
    )

    if(document){
        const data = document.toJSON?.();
        await updateIndexedData('gigs',`${data.id}`,data);
    }
}


async function updateGigReview(data) {
    const ratingTypes = {
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
    };
    const ratingKey = ratingTypes[`${data.rating}`];
    const gig = await GigModel.updateOne(
        { _id: data.gigId },
        {
            $inc: {
                ratingsCount: 1,
                ratingSum: data.rating,
                /*  
                    The values inside the square brackets are template literals,which allow for string interpolation.
                    This means that ${ratingKey} is replaced by the value of the ratingKey variable,
                    forming a dynamic property key.
                */ 
                [`ratingCategories.${ratingKey}.value`]: data.rating,
                [`ratingCategories.${ratingKey}.count`]: 1,
            }
        },
        {new:true,upsert:true}
    ).exec();
    if(gig){
        const data = document.toJSON?.();
        await updateIndexedData('gigs',`${data.id}`,data);
    }
};





export{
    getGigById,
    getSellerGigs,
    getSellerInactiveGigs,
    createGig,
    deleteGig,
    updateGig,
    updateActiveGigProp,
    updateGigReview
}