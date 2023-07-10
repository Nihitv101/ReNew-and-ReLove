import { axiosInstace } from "./axiosInstance";

// we will create the api call here for users:


export const RegisterUser = async(payload)=>{
    console.log(payload);
    try{
        const response = await axiosInstace.post("/api/users/register", payload);
        return response.data;
    }
    catch(error){
        return error.message;
    }

}



// login useer;

export const LoginUser = async (payload)=>{
    try{
        const response = await axiosInstace.post('/api/users/login', payload);
        return response.data;
    }
    catch(error){
        return error.message;
    }
}


export const GetCurrentUser = async ()=>{
    try{
        const response = await axiosInstace.get('/api/users/get-current-user');
        return response.data;
    }
    catch(error){
        return error.message;
    }
}


// get all users:

export const GetAllUsers = async()=>{
    try{
        const response = await axiosInstace.get('/api/users/get-users');
        return response.data;

    }
    catch(error){
        return error.message;
    }
}


// Update user roles:
export const UpdateUserStatus = async (id, status)=>{
    try{
        const response = await axiosInstace.put(`/api/users/update-user-status/${id}`, {status});

        return response.data;

    }
    catch(error){
        return error.message;
    }
}