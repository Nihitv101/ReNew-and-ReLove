import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/loadersSlice";



const rules = [
    {
        required:true,
        message:"Required",

    }
]

const Register = () => {

  const {loading} = useSelector(state=>state.loaders);

  const dispatch = useDispatch();
  

  const navigate = useNavigate();


  const onFinish = async(values) => {
  
    try{
      dispatch(setLoading(true));
      const response = await RegisterUser(values);
      dispatch(setLoading(false));


      if(response?.success){
        navigate('/login')
        message.success(response.message);
      }
      else{

        dispatch(setLoading(false));
        throw new Error(response.message);
      }

    }
    catch(error){
      message.error(error.message);
    }

  };



  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[])




  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-3 rounded w-[450px]">
        <h1 className="my-2">
          <span className="text-2xl">Register</span>
          <Divider />
        </h1>



          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={rules}>
              <Input placeholder="Name" type="text" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={rules}>
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={rules}>
              <Input placeholder="Name" type="password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Register
            </Button>

            <p className="text-center mt-5 text-lg ">
              Already Have an Account ?{" "}
              <Link to="/login" className="text-gray-700 text-lg">
                Login
              </Link>
            </p>
          </Form>

      </div>
    </div>
  );
};

export default Register;
