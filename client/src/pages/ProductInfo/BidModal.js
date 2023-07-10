import { Form, Input, Modal, message } from 'antd';
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/loadersSlice';
import { PlaceNewBid } from '../../apicalls/products';
import { AddNotification } from '../../apicalls/notifications';

const BidModal = ({
    showBidModal,
    setShowBidModal,
    product,
    reloadData,
}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.users);

    const formRef = useRef();

    const rules = [{
        required:true,
        message:"required",
    }]

    const onFinish = async(values)=>{
        try{
            dispatch(setLoading(true))
            const response = await PlaceNewBid({
                ...values,
                product:product._id,
                seller:product.seller._id,
                buyer:user._id,
            })
            dispatch(setLoading(false));
            
            if(response?.success){

                message.success('Bid Added Successfully');

                // send notification to seller:
                await AddNotification({
                    title:"New Bid Has been Placed",
                    message:`A new bid has been placed as your product : ${product.name} by ${user.name} for ${values.bidAmount}$`,
                    user:product.seller._id,
                    onClick:'/profile',
                    read:false,
                });

                reloadData();
                setShowBidModal(false);
            }
            else{
                throw new Error(response.message)
            }
        }
        catch(error){
            message.error(error.message);
            dispatch(setLoading(false));
            
        }
    }

  return (
    <Modal open={showBidModal}
    onCancel={()=>setShowBidModal(false)}
    centered
    width={600}
    onOk={()=>{
        formRef.current.submit();
    }}
    >

    <div className="flex flex-col gap-5">

        <h1 className='text-2xl font-semibold text-orange-700 text-center'>
            New Bid
        </h1>

        <Form layout='vertical' ref={formRef} onFinish={onFinish}>
            <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
                <Input />
            </Form.Item>


            <Form.Item label="Message" name="message" rules={rules}>
                <Input.TextArea />
            </Form.Item>

            <Form.Item label="Mobidle Number" name="mobile" rule={rules}>
                <Input type='number' />
            </Form.Item>


        </Form>



    </div>
    


    </Modal>

  )
}

export default BidModal;
