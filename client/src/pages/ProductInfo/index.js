import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";
import { GetAllBids, GetProductbyId } from "../../apicalls/products";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message } from "antd";
import moment from 'moment';
import BidModal from "./BidModal";



const ProductInfo = () => {

  const {user} = useSelector(state=>state.users);
  


  const [showBidModal, setShowBidModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImgeIndex] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetProductbyId(id);
      dispatch(setLoading(false));

      if (response?.success) {
        // console.log("respones", response);
        const bidsResponse = await GetAllBids({product:id});

        setProduct({
          ...response.data,
          bids:bidsResponse.data,
        });
    
        // console.log('prod', product);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div className="grid grid-cols-2 gap-5 mt-5">
        {/* Images */}


        <div  className="flex flex-col gap-5">
            <img src={product?.images[selectedImageIndex]} alt=""  className="w-full h-96 object-cover rounded-md" />

            <div className="flex gap-5">
              {product?.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer " +
                      (selectedImageIndex === index
                        ? "border-2 border-green-700 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImgeIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>

            <hr />

            
            <div>
              <h1 className="text-gray-600">Added On</h1>
              <span className="text-gray-600">
                {moment(product.createdAt).format("MMM D , YYYY hh:mm A")}
              </span>
            </div>
            
        </div>

        {/* Details */}


        <div className="flex flex-col gap-3">
             <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>


            <hr />

            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>$ {product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span> {product.billAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Purchased Year</span>
                <span>
                    {moment().subtract(product.age , 'years').format("YYYY")} ({product.age} years ago)
                </span>
              </div>
            </div>

            <hr />



            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span> {product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span className="">{product.seller.email}</span>
              </div>
            </div>

            <hr />


            <div className="flex flex-col">


              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
                    <Button onClick={()=>{setShowBidModal(!showBidModal)}} disabled={product.seller._id === user._id} >
                        New Bid
                    </Button>
              </div>

    
              {product.showBidsOnProductPage &&
                product.bids.map((bid) => {
                  return (
                    <div className="border border-gray-300 border-solid p-3 rounded mt-5">
                      <div className="flex justify-between text-gray-700">
                        <span>Name</span>
                        <span> {bid.buyer.name}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Bid Amount</span>
                        <span> $ {bid.bidAmount}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Bid Place On</span>
                        <span>
                          {" "}
                          {moment(bid.createdAt).format("MMM D , YYYY hh:mm A")}
                        </span>
                      </div>
                    </div>
                  );
                })}




            </div>
            


            

        </div>


        {showBidModal && <BidModal 
        showBidModal={showBidModal} 
        setShowBidModal={setShowBidModal}
        reloadData={getData}
        product={product}
          /> }

      </div>
    )
  );
};

export default ProductInfo;
