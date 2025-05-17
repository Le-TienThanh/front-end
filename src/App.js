import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import * as UserService from "./services/UserService";

import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./redux/slides/userSlide";
import Loading from "./components/LoadingComponent/Loading";
export function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);
  // const fetchApi = async () => {
  //   const res = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/product/get-all`
  //   );
  //   return res.data;
  // };
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log("query", query);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };
  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     try {
  //       const currentTime = new Date();
  //     const { decoded } = handleDecoded();
  //     let storageRefreshToken = localStorage.getItem("refresh_token");
  //     const refreshToken = JSON.parse(storageRefreshToken);
  //     const decodedRefreshToken = jwtDecode(refreshToken);
  //     if (decoded?.exp < currentTime.getTime() / 1000) {
  //       if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
  //         const data = await UserService.refreshToken(refreshToken);
  //         config.headers["token"] = `Bearer ${data?.access_token}`;
  //       } else {
  //         dispatch(resetUser())
  //       }
  //     }

        
  //     } catch (error) {
  //       console.log(error);

        
  //     }
      
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  UserService.axiosJWT.interceptors.request.use(
  async (config) => {
    try {
      const currentTime = new Date();
      const { decoded } = handleDecoded();

      const storageRefreshToken = localStorage.getItem("refresh_token");

      if (!storageRefreshToken || !isJsonString(storageRefreshToken)) {
        dispatch(resetUser());
        return config;
      }

      const refreshToken = JSON.parse(storageRefreshToken);

      // Kiểm tra nếu không phải string thì không decode
      if (typeof refreshToken !== "string") {
        dispatch(resetUser());
        return config;
      }

      let decodedRefreshToken = null;

      try {
        decodedRefreshToken = jwtDecode(refreshToken);
      } catch (error) {
        console.error("Invalid refresh token:", error);
        dispatch(resetUser());
        return config;
      }

      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }

      return config;
    } catch (err) {
      console.error("Interceptor error:", err);
      return Promise.reject(err);
    }
  },
  (error) => Promise.reject(error)
);

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storageRefreshToken);

    const res = await UserService.getDetailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
        refreshToken: refreshToken,
      })
    );
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const ischeckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}
export default App;
