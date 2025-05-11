import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search, limit) => {
  let response = {};
  if(search?.length > 0) {
    response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else{
    response = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`
  );
  }
 
  return response.data;
};

export const createProduct = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return response.data;
};
export const getDetailsProduct = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-details/${id}`
  );
  return response.data;
};
export const updateProduct = async (id, access_token, data) => {
  const response = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};
export const deleteProduct = async (id, access_token, data) => {
  const response = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
    
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};
export const deleteManyProduct = async (data, access_token) => {
  const response = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/delete-many`,data,
    
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};
export const getAllTypeProduct = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`
  );
  return response.data;
};
export const getProductType = async (type) => {
  if(type) {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}`
    );
    return response.data;
  }
};

