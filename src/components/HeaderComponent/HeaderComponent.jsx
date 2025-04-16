import { Row, Col, Badge } from "antd";

import react from "react";
import {
  WrapperHeader,
  TextWrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeaderSmall,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { Input } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  console.log("user", user);

  return (
    <div>
      <WrapperHeader>
        <Col span={5}>
          <TextWrapperHeader>MY SHOP</TextWrapperHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            bordered={false}
            placeholder="Tìm kiếm"
            size="large"
            textButton="Tìm kiếm"
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <WrapperHeaderAccout>
            <UserOutlined style={{ fontSize: "30px" }} />

            {user?.name ? (
              <div  style={{ cursor: "pointer" }}>{user.name}</div>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall>
                  Đăng nhập/ Đăng ký
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccout>
          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "#fff" }}
              />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};
export default HeaderComponent;
