import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/products";

import moment from "moment";
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";

const Users = () => {

  const [users, setUsers] = useState([]);
  


  const dispatch = useDispatch();

  const getData = async () => {
    try {

      dispatch(setLoading(true));

      const response = await GetAllUsers(null);
      if (response?.message) {
        setUsers(response.data);
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
        const response = await UpdateUserStatus(id, status);
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
      title: "Users",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render:(text, record)=>{
        return record.role.toUpperCase();
      }
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record)=>{
        return record.status.toUpperCase();
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">

            {status === "active" && (
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
                  onStatusUpdate(_id, "active");
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
      <Table columns={columns} dataSource={users}></Table>
    </div>
  );
};

export default Users;
