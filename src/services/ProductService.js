import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all`
  );
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
