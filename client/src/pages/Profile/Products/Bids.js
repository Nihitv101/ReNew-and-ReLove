import { Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { setLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { GetAllBids } from "../../../apicalls/products";
import moment from "moment";


const Bids = ({
    showBidModal,
    setShowBidModal,
    selectedProduct,
}) => {

    const [bidsData , setBidsData] = useState([]);

    const dispatch = useDispatch();

    const getData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await GetAllBids({
          product: selectedProduct._id,
        });
        dispatch(setLoading(false));
        if (response?.success) {

          setBidsData(response.data);
        }
      } catch (error) {
        dispatch(setLoading(false));
        message.error(error.message);
      }
    };

    
  const columns = [
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return <div>
            <p>{record.buyer.name}</p>
        </div>
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];
  


    useEffect(()=>{

        if(selectedProduct){
            getData();
        }

    },[selectedProduct])


  return (
    <Modal title="Bids"
    open={showBidModal}
    onCancel={()=> setShowBidModal(false)}
    centered
    width={1500}

    >

<div className="flex gap-3 flex-col">

        <h1 className="text-xl text-gray-500">
          Product Name: {selectedProduct.name}
        </h1>

        <Table columns={columns} dataSource={bidsData} />
      </div>


    </Modal>
  )
}

export default Bids;
