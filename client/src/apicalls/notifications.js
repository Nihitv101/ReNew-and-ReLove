import { axiosInstace } from "./axiosInstance";



export const AddNotification = async (data)=>{
    try{
        const response = await axiosInstace.post('/api/notifications/notify', data);
        return response.data;
    }
    catch(error){
        return error.message;
    }
}


// Get all notfications by user:
export const GetAllNotifications = async ()=>{
    try{
        const response = await axiosInstace.get('/api/notifications/get-all-notifications');
        return response.data;
    }
    catch(error){
        return error.message;
    }
}


// Delete Notification:
export const DeleteNotification = async(id)=>{
    try{
        const response = await axiosInstace.delete(`/api/notifications/delete-notification/${id}`);
        return response.data;
    }
    catch(error){
        return error.message;
    }
}




// read all notifications by user
export const ReadAllNotifications = async () => {
    try {
      const response = await axiosInstace.put(
        "/api/notifications/read-all-notifications"
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
};



