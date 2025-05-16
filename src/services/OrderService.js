import axios from "axios";
import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
  
  const response = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};

export const getOrderByUserId = async (id, access_token) => {
  
  const response = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`,
    
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};

export const getDetailsOrder = async (id, access_token) => {
  
  const response = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`,
    
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};

export const cancelOrder = async (id, access_token) => {
  
  const response = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/order/cancel-order/${id}`,
    
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};

