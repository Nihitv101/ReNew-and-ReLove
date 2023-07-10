import { Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { setLoading } from "../../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBids } from "../../../apicalls/products";
import moment from "moment";


const UserBids = ({

}) => {

    const {user} = useSelector(state=>state.users);

    const [bidsData , setBidsData] = useState([]);

    const dispatch = useDispatch();

    const getData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await GetAllBids({
          buyer: user._id,
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
        title:"Product",
        dataIndex:"product",
        render:(text, record)=>{
            return record.product.name;
        }
    },
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      }
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return <div>
            <p>{record.seller.name}</p>
        </div>
      },
    },
    {
      title: "Offered Price",
      dataIndex: "offeredPrice",
      render:(text, record)=>{
        return record.product.price;
      }
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
        getData();
    },[])


  return (


    <div className="flex gap-3 flex-col">
        <Table columns={columns} dataSource={bidsData} />
    </div>


  )
}

export default UserBids;
