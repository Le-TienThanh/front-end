import React, { useEffect, useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Image, message } from "antd";
import imageLogo from "../../assets/img/logo-login.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as messageSignIn from "../../components/Message/Message";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;
  useEffect(() => {
    if(isSuccess){
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token);
        console.log("Decoded JWT:", decoded);
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token);

        }
      }

    }

  }, [isSuccess])
  
  const handleGetDetailsUser = async(id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({...res?.data, access_token: token}));
    console.log("res", res);
  }
  
  console.log("mutation", mutation);

  const handleSignIn = () => {
    setIsSigningIn(true);
    mutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Đăng nhập thành công", data);
          setIsSigningIn(false);
        },
        onError: (error) => {
          console.error("Lỗi đăng nhập", error);
          setIsSigningIn(false);
        },
      }
    );
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "0px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào,</h1>
          <p style={{ fontSize: "15px" }}>Đăng nhập vào trang web</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)} // Toggle trạng thái hiển thị mật khẩu
              style={{
                zIndex: "10",
                position: "absolute",
                top: "4px",
                right: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color:"red", fontSize : "20px"}}>{data?.message}</span>
          )}

          {/* <Button
            disabled={!email || !password}
            onClick={handleSignIn}
            style={{
              background: !email || !password ? "#ccc" : "rgb(255, 57, 69)",
              color: "#fff",
              height: "48px",
              width: "100%",
              border: "1px solid",
              fontWeight: "500",
              margin: "26px 0 10px",
            }}
          >
            Đăng nhập
          </Button> */}
          <Loading isLoading={isSigningIn}>
            <Button
              disabled={!email || !password || isSigningIn}
              onClick={handleSignIn}
              style={{
                background: !email || !password ? "#ccc" : "rgb(255, 57, 69)",
                color: "#fff",
                height: "48px",
                width: "100%",
                border: "1px solid",
                fontWeight: "500",
                margin: "26px 0 10px",
                cursor: isSigningIn ? "not-allowed" : "pointer",
              }}
            >
              {isSigningIn ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Loading>

          <p>
            <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          </p>
          <p style={{ fontSize: "15px" }}>
            Chưa có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="image-logo"
            height="203px"
            width="203px"
          />
          <h4 style={{ fontSize: "20px", color: "rgb(255, 0, 0)" }}>
            Mua sắm tại{" "}
            <span style={{ fontSize: "30px", color: "rgb(11, 116, 229)" }}>
              MY SHOP
            </span>
          </h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};
export default SignInPage;
