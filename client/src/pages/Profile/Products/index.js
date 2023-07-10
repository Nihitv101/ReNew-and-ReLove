import { Button, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import ProductsForm from './ProductsForm';

import {useDispatch, useSelector} from 'react-redux'
import { setLoading } from '../../../redux/loadersSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';

import moment from 'moment';
import Bids from './Bids';


const Products = () => {

  const [showBids, setShowBids] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [showProductForm, setShowProductForm] = useState(false);

    const dispatch = useDispatch();

    const {user} = useSelector(state=>state.users);





    const getData = async()=>{
      try{
        dispatch(setLoading(true));

        const response = await GetProducts({
          seller:user._id
        });
        if(response?.message){
          setProducts(response.data);

        }
        dispatch(setLoading(false));


      }
      catch(error){
        dispatch(setLoading(false));
        message.error(error.message);
        return error.message;

      }
    }

  
    const deleteProduct = async(id)=>{
      try{
        dispatch(setLoading(true));
        const response = await DeleteProduct(id);
        dispatch(setLoading(false));
        if(response?.success){
          message.success(response.message);
          getData();
        }
        else{
          message.error(response.message);
        }
      }
      catch(error){
        dispatch(setLoading(false));
        message.error(error.message);
      }
    }




    const columns = [
      {
        title:"Image",
        dataIndex:"image",
        render:(text, record)=>{
          return <img src={record?.images?.length > 0 ? record.images[0]: ""} alt="" className='w-20 h-20 object-cover rounded-md' />
           
        }
      },
      {
        title:"Name",
        dataIndex:'name',
      },
      {
        title:"Price",
        dataIndex:"price",
      },
      {
        title:"Category",
        dataIndex:"category",
      },
      {
        title:"Age",
        dataIndex:"age",
      },
      {
        title:"Status",
        dataIndex:"status",
      },
      {
        title:"Added On",
        dataIndex:"createdAt",
        render:(text,record)=> moment(record.createdAt).format('DD-MM-YYYY hh:mm A')
      },
      {
        title:"Action",
        dataIndex:'action',
        render:(text, record)=>{
         return (
                   
         <div className='flex gap-4 items-center'>
            <i class="ri-delete-bin-line" onClick={()=>{
              deleteProduct(record._id)
              
            }}></i>
            <i class="ri-pencil-line" onClick={()=>{
              setSelectedProduct(record);
              setShowProductForm(true);
            }} ></i>

            <span className='underline' onClick={()=>{
              setSelectedProduct(record);
              setShowBids(true)
            }}>
              Show Bids
            </span>
         </div>

         ) 
        }
      }

    ]
    useEffect(()=>{
      getData();
    },[])


  return (
    <div>
        <div className="flex justify-end">
            <Button type="default" className='m-3' onClick={()=>{
              setSelectedProduct(null);
              setShowProductForm(true);

            }}>Add Product</Button>
        </div>

        <Table columns={columns} dataSource={products} />

        { showProductForm && <ProductsForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} selectedProduct={selectedProduct} getData={getData} />  }


        {showBids && <Bids 
          showBidModal={showBids}
          setShowBidModal={setShowBids}
          selectedProduct={selectedProduct}

         /> }
    </div>
  )
}

export default Products;
