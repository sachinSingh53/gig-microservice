import {elasticSearchClient} from '../elasticsearch.js'

async function gigsSearchBySellerId(searchQuery,isActive){

    const queryList = [
        {
            query_string: {
                fields: ['sellerId'],
                query: `*${searchQuery}*`
            }
        },
        {
            term:{
                //this is for active gigs
                active: isActive
            }
        }
    ];
   
    const result = await elasticSearchClient.search({
        index: 'gigs',
        query:{
            bool:{
                must: [...queryList]
            }
        },
    })

    return {
        total: result.hits.total.value,
        hits: result.hits.hits
    }
}

export{gigsSearchBySellerId}