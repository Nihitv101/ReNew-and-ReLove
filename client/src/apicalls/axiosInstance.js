import axios from 'axios';


export const axiosInstace = axios.create({
    headers:{
        authorization : `Bearer ${localStorage.getItem('token')}`,
    }
})
