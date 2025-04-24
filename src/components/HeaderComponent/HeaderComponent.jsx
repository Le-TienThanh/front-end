import { Row, Col, Badge, Popover, Button } from "antd";

import react, { useEffect, useState } from "react";
import {
  WrapperHeader,
  TextWrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { Input } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { click } from "@testing-library/user-event/dist/click";
import { Content } from "antd/es/layout/layout";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("")
  const handleLogout = async () => {
    setLoading(true);
    await UserService.loginUser();
    dispatch(resetUser());
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);
  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {/* chuyen huong trang sang profile-user */}
    </div>
  );

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
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img
                src = {userAvatar}
                alt="avatar"
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                />

              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              

              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
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
          </Loading>
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
