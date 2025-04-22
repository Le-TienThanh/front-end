import axios from "axios";
export const axiosJwt = axios.create();
axiosJwt.interceptors.request.use(
  (config) => {
    // Kiểm tra xem URL endpoint có hợp lệ không
    if (!config.url || !config.url.includes('/user/get-details/')) {
      console.log("Invalid URL:", config.url);
      // Hủy request nếu URL không hợp lệ
      return Promise.reject(new Error("Invalid URL"));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data
  );
  return response.data;
};

export const signupUser = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return response.data;
};

export const getDetailsUser = async (id, access_token) => {
  const response = await axiosJwt.get(
    `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};


export const refreshToken = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const logoutUser = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/log-out`
  );
  return response.data;
};
export const updateUser = async (id, data, access_token) => {
  const response = await axiosJwt.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return response.data;
};
