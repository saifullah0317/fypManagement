import axios from 'axios';


const URL = 'http://localhost:8080';

// Api Calls are asynchronus requests.


export const addIdea = async (data) => {
    try {
        return await axios.post(`${URL}/viewIdeas/postIdea`, data);
    }
    catch (error) {
        console.log('Error while calling Post Idea API.', error);
    }
};


export const getIdeas = async () => {
    try {
        return await axios.get(`${URL}/viewIdeas`);
    }
    catch (error) {
        console.log("Error while calling Get Idea Api.", error);
    }
};

export const editFieldsForAdmin = async (data) => {
    try {
        console.log(data);
        return await axios.put(`${URL}/viewIdeas`, data);
    }
    catch (error) {
        console.log("Error while calling Put Idea Api.", error);
    }
};
export const postQueries = async (data) => {
    try{
        console.log(data)
        return await axios.post(`${URL}/postQuery`, data);
    }
    catch(error){
        console.log('Error while calling Post Idea API.', error);
    }
};

export const getQueries = async () => {
    try{
        return await axios.get(`${URL}/viewQuery`);
    }
    catch(error){
        console.log("Error while calling Query Api.", error);
    }
};