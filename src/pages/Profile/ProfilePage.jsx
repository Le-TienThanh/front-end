import react, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Flex, Upload } from "antd";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, rests, access_token);
  });
  const { data, isLoading, isSuccess, isError } = mutation;
  useEffect(() => {
    // setEmail(user?.email);
    // setName(user?.name);
    // setPhone(user?.phone);
    // setAddress(user?.address);
    // setAvatar(user?.avatar);

    setEmail(user.email || "");
    setName(user.name || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
    setAvatar(user.avatar || "");
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thông tin thành công!");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error("Cập nhật thất bại!");
    }
  }, [isSuccess, isError]);
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    console.log("res", res);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangeAvatar = async (filelist) => {
    const file = filelist[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isLoading}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
              value={name}
              onChange={handleOnChangeName}
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
              onChange={handleOnChangeEmail}
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
              onChange={handleOnChangePhone}
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
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Directory</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                alt="avatar"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  marginTop: "10px",
                  objectFit: "cover",
                }}
              />
            )}
            {/* <InputForm
              style={{ marginBottom: "5px", margin: "5px 0", width: "300px" }}
              value={avatar}
              onChange={handleOnChangeAvatar}
              id="avatar"
            /> */}
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
              onChange={handleOnChangeAddress}
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
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
