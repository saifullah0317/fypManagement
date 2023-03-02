import ideas from '../models/IdeasModel.js';
import Ideas from '../models/IdeasModel.js';

export const postIdea = async (request, response) => {
    const ideas = {
        Idea_Title: request.body.title,
        Description: request.body.desc,
        Posted_By: request.body.postedBy,
        Lock: request.body.lock,
        groupId: request.body.groupId,
        Status: request.body.status,
        Supervisor: request.body.supervisor,
        Co_Supervisor: request.body.coSupervisor,
        Posted_On: request.body.postedOn,
        Updated_By: request.body.updatedBy,
        Updated_On: request.body.updatedOn,
    };
    //console.log(ideas);
    const checkIdeas = new Ideas(ideas);
    try {
        console.log(ideas);
        await checkIdeas.save();
        response.status(201).json(checkIdeas);
        console.log('added successfully');
    }
    catch (error) {
        response.status(409).json({ message: error.message });
        console.log(error.message);
    }
};


export const getIdeas = async (request, response) => {
    try {
        const ideas = await Ideas.find();;
        response.status(201).json(ideas);
    }
    catch (error) {
        response.status(409).json({ message: error.message });
        console.log(error, message);
    }
}

export const editAdminFields = async (request, response) => {
    try {
        await Ideas.updateOne({ _id: request.body._id },
            {
                $set:
                {
                    Co_Supervisor: request.body.Co_Supervisor,
                    Supervisor: request.body.Supervisor,
                    Status: request.body.Status
                }
            });
    } catch (error) {
        response.status(409).json({ message: error.message });
    }









    // console.log("sjsj", request.body._id);
    // try {
    //      Ideas.updateOne({ _id: request.body._id },
    //         {
    //             $set:
    //             {
    //                 Supervisor: request.body.Supervisor,
    //                 Co_Supervisor: request.body.Co_Supervisor,
    //                 Status: request.body.Status,
    //             }
    //         });
    //         // console.log(ideaObj);
    //         // await Ideas.save();
    //         // response.status(201).json(ideas);
    // }
    // catch (error) {
    //     response.status(409).json({ message: error.message });
    //     console.log(error, message);
    // }
}