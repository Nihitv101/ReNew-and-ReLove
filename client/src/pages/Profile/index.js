import React from 'react';
import { Tabs} from 'antd';
import Products from './Products';

import UserBids from './UserBids';
import { useSelector } from 'react-redux';




const Profile = () => {


    const {user} = useSelector(state=>state.users);


  return (
    <div>
        <Tabs defaultActiveKey='1'>
        
            <Tabs.TabPane tab="Products" key='1'>
                <Products />   
            </Tabs.TabPane>
            <Tabs.TabPane tab="Bids" key='2'>
                <UserBids />
            </Tabs.TabPane>
            <Tabs.TabPane tab="General" key='3'>
                <div className='flex flex-col w-1/3 gap-8'>
                    <h1 className=' text-gray-800 text-2xl flex justify-between'>
                        Name: <b className='text-2xl'>{user.name}</b>
                    </h1>
                    <h1 className='text-gray-800 text-2xl flex justify-between'>
                        Email: <b className='text-2xl'>{user.email}</b>
                    </h1>
                </div>
            </Tabs.TabPane>

        </Tabs>
    </div>
  )
}

export default Profile;
