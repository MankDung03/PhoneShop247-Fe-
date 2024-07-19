import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../services/Api";
import { updateSuccess } from "../../redux-setup/reducers/auth";

const Customer = ()=>{
    const customer = useSelector(({Auth})=>Auth.login.currentCustomer)
    const [inputsCustomer,setInputsCustomer] = useState(customer);
    const [alertUpdate,setAlertUpdate]=useState(false);
    const [alertCls, setAlertCls]=useState("");
    const dispatch=useDispatch();
    const changeInputsCustomer=(e)=>{
      const {name,value}=e.target;
      return setInputsCustomer({...inputsCustomer,[name]:value});
    }
    const clickUpdate=(e)=>{
      e.preventDefault();
      updateCustomer(inputsCustomer)
      .then(({data})=>{
        dispatch(updateSuccess(inputsCustomer));
        setAlertUpdate("Cap nhat thong tin thanh cong");
        setAlertCls("success")

      })
      .catch(({response})=>{
        if(response.data==="Phone number exists")
          setAlertUpdate("So dien thoai da ton tai");
          setAlertCls("danger");
      })
    }
    return(
        <>
        <div id="customer">
{
  alertUpdate
  &&(
    <div className={`alert alert-${alertCls} text-center`}>{alertUpdate}</div>
  )
}
  <h3 className="text-center">Thông tin chi tiết</h3>
  <form method="post">
    <div className="row">
      <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
        <input onChange={changeInputsCustomer} placeholder="Họ và tên (bắt buộc)" type="text" name="fullName" className="form-control" required value={inputsCustomer.fullName || ""} />
      </div>
      <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
        <input placeholder="Mật khẩu (bắt buộc)" type="password" name="pass" className="form-control" required value="123456" disabled />
      </div>
      <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
        <input placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" required disabled  value={inputsCustomer.email || ""} />
      </div>
      <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
        <input  onChange={changeInputsCustomer} placeholder="Số điện thoại (bắt buộc)" type="text" name="phone" className="form-control" required  value={inputsCustomer.phone || ""} />
      </div>
      <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
        <input  onChange={changeInputsCustomer} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" name="address" className="form-control" required  value={inputsCustomer.address || ""}/>
      </div>
    </div>
  </form>
  <div className="row">
    <div className="by-now col-lg-6 col-md-6 col-sm-12">
      <a onClick={clickUpdate} href="#">
        <b>Cập nhật ngay</b>
      </a>
    </div>
    <div className="by-now col-lg-6 col-md-6 col-sm-12">
      <a href="/">
        <b>Quay về trang chủ</b>
      </a>
    </div>
  </div>
</div>

        </>
    )
}
export default Customer;