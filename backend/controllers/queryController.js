import query from '../models/query.js';

export const postQuery = async (request, response) => {

    console.log(request)

    const queries = {
        userIdentity: request.body.userIdentity,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        query_id: request.body.query_id,
        query: request.body.query,
        replies: request.body.replies,
        likes: request.body.likes,
        dislikes: request.body.dislikes
    };
    const checkQueries = new query(queries);
    try {
        console.log(queries);
        await checkQueries.save();
        response.status(201).json(checkQueries);
        console.log('added successfully');
    }
    catch (error) {
        response.status(409).json({ message: error.message });
        console.log(error.message);
    }
};


export const getQuery = async (request, response) =>{
    try{
        const queries = await query.find();
        response.status(201).json(queries);
    }
    catch(error){
        response.status(409).json({ message: error.message });
        console.log(error,message);
    }
}