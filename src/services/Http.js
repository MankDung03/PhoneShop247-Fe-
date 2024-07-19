import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_API } from "../shared/constants/app";
import { store } from "../redux-setup/store";
import { loggedOut } from "../redux-setup/reducers/auth";
import { refreshToken } from "./Api";
import { updateCustomerToken } from "../redux-setup/reducers/auth";
const Http = axios.create({
  withCredentials:true,
    baseURL: BASE_API,
});
Http.interceptors.request.use(async function (config) {
  console.log(config);
    // Làm gì đó trước khi request dược gửi đi
    const Auth=store.getState().Auth;
    const token=Auth.login.currentCustomer?.accessToken;
    // if(token){
    //     const decoded = jwtDecode(token);
    //     if(decoded.exp< new Date()/1000){
    //         // store.dispatch(loggedOut());
    //         console.log(`dasdasd`);
    //         if(config.url.indexOf("/customer/refreshtoken")>=0) return config;
    //         const data= (await refreshToken()).data;
    //         const newAccessToken=data.accessToken;
    //         const newRefreshToken=data.refreshToken;
    //         store.dispatch(updateCustomerToken({newAccessToken,newRefreshToken}));
    //         config.headers["token"]=`Bearer ${newAccessToken} `;
    //         return config;
    //     }
    // }


    config.headers["token"]=`Bearer ${token} `;
    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  });

  Http.interceptors.response.use(
    async (response)=>{
      
      if(response.data.message==="Token Expired"){
        if(response.config.url.indexOf("/customer/refreshtoken")>=0) return response;
            const data= (await refreshToken()).data;
            const newAccessToken=data.accessToken;
            const newRefreshToken=data.refreshToken;
            store.dispatch(updateCustomerToken({newAccessToken,newRefreshToken}));
            response.config.headers["token"]=`Bearer ${newAccessToken} `;
            
            return Http(response.config);
          }
      return response;
     
    },
    async (error)=>{
 
      if(error.response.data=="Dirty Token"){
        store.dispatch(loggedOut());
        alert("Tai khoan het han hoac dang nhap boi tai khoan khac");
      }
      return Promise.reject(error);
    },
  )
export default Http;