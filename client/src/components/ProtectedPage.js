// only the logged in /authorized user can accesss this page:

import { Avatar, Badge, message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/loadersSlice";
import { setUser } from "../redux/usersSlice";
import Notifications from "./Notifications";
import {
  GetAllNotifications,
  ReadAllNotifications,
} from "../apicalls/notifications";

const ProtectedPage = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // console.log(user);

  const dispatch = useDispatch();

  // const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      dispatch(setLoading(true));

      const response = await GetCurrentUser();

      dispatch(setLoading(false));

      if (response?.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
    } else {
      navigate("/login");
    }
  }, []);

  // Notification Section

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();

      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    user && (
      <div>
        {/* heder */}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
           ReNew & ReLove
          </h1>

          <div className="bg-white py-2 px-5 rounded flex gap-2 items-center">
            <span
              className="underline cursor-pointer"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
            <div className="flex flex-col gap-2 mr-4">
              <p>{user.name}</p>
              <p className="font-bold uppercase">{user.role}</p>
            </div>
            </span>

            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
              className="cursor-pointer"
            >
              <Avatar
                shape="circle"
                icon={<i className="ri-notification-3-line"></i>}
              />
            </Badge>

            <div className="flex items-center cursor-pointer  gap-2" onClick={() => {
                  localStorage.removeItem("token");
                  message.success("Logout Successfull");
                  navigate("/login");
                }}
 >

              <i
                className="ri-logout-box-line ml-10 text-lg font-bold"
              ></i>
              Logout
            </div>


          </div>
        </div>

        <div className="p-5">{children}</div>

        {/* modal pop up open logic */}

        {
          <Notifications
            notifications={notifications}
            reloadNotifications={getNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
        }
      </div>
    )
  );
};

export default ProtectedPage;
