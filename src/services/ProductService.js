import axios from "axios";

export const getAllProduct = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all`
    );
    return response.data;
  };