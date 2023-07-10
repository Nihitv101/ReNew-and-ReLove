import React, { useState } from "react";

import { Button, Upload, message } from "antd";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/loadersSlice";
import { EditProduct, UploadProductImage } from "../../../apicalls/products";

const Images = ({ selectedProduct, setShowProductForm, getData }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [images, setImages] = useState(selectedProduct.images);

  const [showPreview, setShowPreview] = useState(true);

  const upload = async () => {
    try {
      dispatch(setLoading(true));
      // upload image to cloudinary

      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);

      dispatch(setLoading(false));

      if (response?.success) {
        message.success(response.message);
        setImages([...images,response.data]);
        setShowPreview(false);
        getData();
        setFile(null);
        // setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };


  const deleteImage = async(image)=>{
    try{
        const updatedImageArray = images.filter((img)=> img != image);
        const updatedProduct = {...selectedProduct, images:updatedImageArray};
        const response = await EditProduct(selectedProduct._id, updatedProduct);

        if(response?.success){
            message.success(response.message);
            setImages(updatedImageArray);
            setFile(null);
            getData();
        }
        else{
            throw new Error(response.message)
        }
        
    }
    catch(error){
        dispatch(setLoading(false));
        message.error(error.message);
    }
  }

  return (
    <div>

    <div className="flex gap-5 mb-6">
          {images.map((image) => {
            return (
              <div className="flex gap-3 border-solid border-gray-400 rounded p-5 items-end">
                <img className="h-20 w-2- object-cover" src={image} alt="" />
                <i
                className="ri-delete-bin-line cursor-pointer"
                onClick={() => deleteImage(image)}
              ></i>
              </div>
            );
          })}
        </div>


      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        fileList={file ? [file]:[]}
        showUploadList={showPreview}
      >


        <Button type="dashed">Upload Image</Button>
      </Upload>

      <div className="flex justify-end gap-3 mt-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>

        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
