import { Tabs } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useSelector } from "react-redux";

import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";


const Admin = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.users);

  useEffect(()=>{
    if(user.role !== 'admin'){
      navigate('/');
    }
  },[])






  return (
    <div>
        <Tabs>

            <Tabs.TabPane tab='Products' key="1">
                <Products />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Users' key="2">
              <Users />
            </Tabs.TabPane>

        </Tabs>
    </div>
  )
}

export default Admin;









