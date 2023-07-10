import { Button, Divider, Form, Input, message } from 'antd';
import React, { useEffect } from 'react'
import { LoginUser } from '../../apicalls/users';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loadersSlice';







const rules = [
  {
      required:true,
      message:"Required",

  }
]


const Login = () => {

  const dispatch = useDispatch();

  
  const {loading} = useSelector(state=>state.loaders);

  

  const navigate = useNavigate();

  const onFinish = async(values) => {
  
    try{

      dispatch(setLoading(true));
      const response = await LoginUser(values);
      dispatch(setLoading(false));
      
      if(response?.success){
        message.success(response.message);
        localStorage.setItem('token', response?.data);
        window.location.href = '/';
      }
      else{
        throw new Error(response.message);
      }

    }
    catch(error){
      dispatch(setLoading(false));
      message.error(error.message);
    }

  };


  useEffect(()=>{
    if(localStorage.getItem('token')){
          navigate('/');
    }
  },[])

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-3 rounded w-[450px]">
        <h1 className="my-2">
        <div className='my-4'>
          <span className="text-2xl">Login</span>

        </div>

          <hr />
        </h1>

          <Form layout="vertical" onFinish={onFinish}>


            <Form.Item label="Email" name="email" rules={rules}>
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={rules}>
              <Input placeholder="Name" type="password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Login
            </Button>

            <p className="text-center mt-5 text-md ">
              Not A Member ?{" "}
              <Link to="/register" className="text-gray-700">
                Register Here
              </Link>
            </p>
          </Form>

      </div>
    </div>
  )
}

export default Login;
