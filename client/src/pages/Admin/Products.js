import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/products";

import moment from "moment";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));

      const response = await GetProducts(null);
      if (response?.message) {
        setProducts(response.data);
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
      return error.message;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onStatusUpdate = async(id, status) => {

    try{
        dispatch(setLoading(true));
        const response = await UpdateProductStatus(id, status);
        dispatch(setLoading(false));

        if(response?.success){
            message.success(response.message);
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


  };

  const columns = [
    {
      title:"Image",
      dataIndex:"image",
      render:(text, record)=>{
        return <img src={record?.images?.length > 0 ? record.images[0]: ""} alt="" className='w-20 h-20 object-cover rounded-md' />
         
      }
    },
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record)=>{
        return record.status.toUpperCase();
      }
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">

            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "approved");
                }}
              >
                Approve
              </span>
            )}

            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "rejected");
                }}
              >
                Reject
              </span>
            )}


            {status === "approved" && (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "blocked");
                }}
              >
                Block
              </span>
            )}

            {status === "blocked" && (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "approved");
                }}
              >
                Unblock
              </span>
            )}





          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={products}></Table>
    </div>
  );
};

export default Products;
