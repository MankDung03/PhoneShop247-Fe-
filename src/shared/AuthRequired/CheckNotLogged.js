import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const CheckNotLogged=(OriginComponent)=>{
    function ExtendsComponent(){
        const logged=useSelector (({Auth})=>Auth.login.logged);
        return logged
        ? <OriginComponent/>
        : <Navigate to="/"/>
    }
    return ExtendsComponent;
}
export default CheckNotLogged;