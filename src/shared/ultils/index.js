import { BASE_URL } from "../constants/app";
const data = "Vietpro";
export const getImageProduct = (imageName)=>{
    return `${BASE_URL}/assets/uploads/products/${imageName}`;
}