import react, { Fragment, useEffect, useState } from "react";

import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Flex, message, Spin, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { success, error} from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import {UploadOutlined} from "@ant-design/icons"
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [isUpdating, setUpdating] = useState(false);
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, rests, access_token);
  });
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError } = mutation;
  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      success("Cập nhật thành công")
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      error("Cập nhật thất bại");
    }
  }, [isError, isSuccess]);
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    console.log("res", res);
  };
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0];
    if(!file.url && !file.preview){
      file.preview = await getBase64(file.originFileObj)
    }
    setAvatar(file.preview)
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      phone,
      name,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>

      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Name</WrapperLabel>
          <InputForm
            style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
            value={name}
            onChange={handleOnchangeName}
            id="name"
          />
          <Flex gap="small" wrap>
            <Button
              onClick={handleUpdate}
              style={{
                color: "rgb(26,148,255)",
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Cập nhật
            </Button>
          </Flex>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="email">Email</WrapperLabel>
          <InputForm
            style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
            value={email}
            onChange={handleOnchangeEmail}
            id="email"
          />
          <Flex gap="small" wrap>
            <Button
              onClick={handleUpdate}
              style={{
                color: "rgb(26,148,255)",
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Cập nhật
            </Button>
          </Flex>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
          <InputForm
            style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
            value={phone}
            onChange={handleOnchangePhone}
            id="phone"
          />
          <Flex gap="small" wrap>
            <Button
              onClick={handleUpdate}
              style={{
                color: "rgb(26,148,255)",
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Cập nhật
            </Button>
          </Flex>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="address">Address</WrapperLabel>
          <InputForm
            style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
            value={address}
            onChange={handleOnchangeAddress}
            id="address"
          />
          <Flex gap="small" wrap>
            <Button
              onClick={handleUpdate}
              style={{
                color: "rgb(26,148,255)",
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Cập nhật
            </Button>
          </Flex>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
          <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
            <Button icon = {<UploadOutlined/>}>Select File</Button>

          </WrapperUploadFile>
          {avatar && (
            <img
            src = {avatar}
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "50%",
              objectFit: "cover"

            }}
            alt="avatar"
            />
          )}
          <Flex gap="small" wrap>
            <Button
              onClick={handleUpdate}
              loading = {isLoading}
              style={{
                color: "rgb(26,148,255)",
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Cập nhật
            </Button>
          </Flex>
        </WrapperInput>
      </WrapperContentProfile>
    </div>
  );
};
export default ProfilePage;
