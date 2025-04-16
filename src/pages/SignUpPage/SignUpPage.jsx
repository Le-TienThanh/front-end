import React, { useEffect, useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Image } from "antd";
import imageLogo from "../../assets/img/logo-login.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();
  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;
  useEffect(() => {
    if(isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if(isError) {
      message.error();
    }

  }, [isSuccess, isError]);
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleSignUp = () => {
    setIsSigningUp(true);
    mutation.mutate(
      { email, password, confirmPassword },
      {
        onSuccess: (data) => {
          console.log("Đăng ký thành công", data);
          setIsSigningUp(false);
        },
        onError: (error) => {
          console.error("Lỗi đăng ký", error);
          setIsSigningUp(false);
        },
      }
    );
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
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
          <p style={{ fontSize: "15px" }}>Đăng ký và tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              style={{
                zIndex: "10",
                position: "absolute",
                top: "4px",
                right: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
              onClick={() => setIsShowPassword(!isShowPassword)} // Toggle trạng thái hiển thị mật khẩu
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
          <div style={{ position: "relative", marginTop: "10px" }}>
            <span
              style={{
                zIndex: "10",
                position: "absolute",
                top: "4px",
                right: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)} // Toggle trạng thái hiển thị mật khẩu
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="confirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword}
            />
          </div>
          {data?.status === "ERR" && <span style = {{color:"red", fontSize : "20px"}} >{data?.message}</span>}

          <Loading isLoading={isSigningUp}>
            <Button
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
              style={{
                background:
                  !email || !password || !confirmPassword
                    ? "#ccc"
                    : "rgb(255, 57, 69)",
                color: "#fff",
                height: "48px",
                width: "100%",
                border: "1px solid",
                fontWeight: "500",
                margin: "26px 0 10px",
              }}
            >
              Đăng ký
            </Button>
          </Loading>

          <p style={{ fontSize: "15px" }}>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
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
export default SignUpPage;
