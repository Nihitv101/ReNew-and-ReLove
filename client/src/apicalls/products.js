import { axiosInstace } from "./axiosInstance";

export const AddProduct = async (payload)=>{
    try{
        const response = await axiosInstace.post('/api/products/add-product',payload);
        return response.data;
    }
    catch(error){
        return error.message;
    }

}

// get Products:

export const GetProducts = async(filters)=>{
    try{
        console.log('getproducts rourte', filters);
        const response = await axiosInstace.post('/api/products/get-products', filters);
        return response.data;
    }
    catch(error){
        return error.message;
    }
}


// edit product:

export const EditProduct = async(id, payload)=>{
    try{
        const response = await axiosInstace.put(`/api/products/edit-product/${id}`,payload)
        return response.data;

    }
      catch(error){
        return error.message;
    }
}



// Delete Product:


export const DeleteProduct = async(id)=>{
    try{
        const response = await axiosInstace.delete(`/api/products/delete-product/${id}`)
        return response.data;
    }
    catch(error){
        return error.message;
    }
}



// Upload product image:
export const UploadProductImage = async(payload)=>{
    try{

        const response = await axiosInstace.post('/api/products/upload-image-to-product', payload);

        return response.data;


    }
    catch(error){
        return error.message;
    }

}



// update product:

export const UpdateProductStatus = async(id, status)=>{
    try{
        const response = await axiosInstace.put(`/api/products/update-product-status/${id}`,{status});

        return response.data;
        

    }
    catch(error){
        return error.message;
    }

}


export const GetProductbyId = async(id)=>{
    try{
        const response = await axiosInstace.get(`/api/products/get-product-by-id/${id}`);
        return response.data;

    }
    catch(error){
        return error.message;
    }
}




// Place new bids

export const PlaceNewBid = async (payload)=>{
    try{
        const response = await axiosInstace.post('/api/bids/place-new-bid', payload);
        return response.data;
    }
    catch(error){
        return error.message;
    }
}


// Get All Bids:


export const GetAllBids = async (filters)=>{
    try{
        const response = await axiosInstace.post('/api/bids/get-all-bids', filters);
        return response.data;
    }
    catch(error){
        return error.message;
    }
}
