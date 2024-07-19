import { useEffect, useState } from "react";
import { getOrdersCustomer } from "../../services/Api";
import { useParams } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
const OrderDetails=()=>{
    const [order,setOrder]=useState([]);
    const {id}=useParams();
    useEffect(()=>{
        getOrdersCustomer(id)
        .then(({data})=>setOrder(data.newItems))
        .catch((error)=>console.log(error));
    },[]);
    return(
        <>
        {/*	Order Details	*/}
<div id="my-cart">
  <div className="row">
    <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
      Thông tin sản phẩm
    </div> 
    <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Số lượng</div> 
    <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>    
  </div>  
  <form method="post">
   {
    order.map((item,index)=>
        <div className="cart-item row">
    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
      <img src={getImageProduct(item.image)} />
      <h4>{item.name}</h4>
    </div> 
    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
      <p>{item.qty}</p>
    </div> 
    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{item.price}đ</b></div>    
  </div>  
    )
   }
 
    <div className="row">
      <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">	
      </div> 
      <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div> 
      <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>88.970.000đ</b></div>
    </div>
  </form>
</div>
{/*	End Order Details	*/}

        </>
    )
}
export default OrderDetails;