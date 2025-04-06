import React, { useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Image } from "antd";
import imageLogo from "../../assets/img/logo-login.png"
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"; 

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
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
          display: 'flex',
          
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào,</h1>
          <p style={{fontSize: '15px'}}>Đăng nhập và tạo tài khoản</p>
          <InputForm style={{marginBottom: '10px'}} placeholder = "abc@gmail.com" />
          <div style={{position: 'relative'}} >
          <span
              style={{
                zIndex: "10",
                position: "absolute",
                top: "4px",
                right: "8px",
                cursor: "pointer",
                fontSize: '15px',
                
              }}
              onClick={() => setIsShowPassword(!isShowPassword)} // Toggle trạng thái hiển thị mật khẩu
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm  placeholder = "password" type = {isShowPassword ? "text" : "password"} />



          </div>





          
          <Button
            style={{
              background: "rgb(255, 57, 69)",
              color: "#fff",
              height: "48px",
              width: "100%",
              border: "1px solid",
              fontWeight: "500",
              margin: '26px 0 10px'
            }}
          >
            Đăng nhập
          </Button>
          <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
          <p>Chưa có tài khoản? <WrapperTextLight>Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview = {false} alt="image-logo" height= "203px" width="203px" />
        <h4 style={{fontSize: '20px', color: 'rgb(255, 0, 0)'}} >Mua sắm tại <span style={{fontSize:'30px', color: 'rgb(11, 116, 229)'}}>MY SHOP</span></h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};
export default SignInPage;
